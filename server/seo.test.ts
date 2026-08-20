import { describe, it, expect } from "vitest";
import {
  isBotUserAgent,
  injectMeta,
  buildDescription,
  buildPropertyMeta,
  buildNotFoundMeta,
} from "./_core/seo";

const TEMPLATE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Souza Construtora</title>
    <meta name="description" content="Há mais de 20 anos realizando o sonho da casa própria com qualidade e atendimento humanizado. Ver imóveis disponíveis. Imóveis regularizados." />
    <meta property="og:title" content="Souza Construtora - Imóveis em Rondonópolis" />
    <meta property="og:description" content="Há mais de 20 anos realizando o sonho da casa própria." />
    <meta property="og:image" content="/logo-souza.jpg" />
    <meta property="og:type" content="website" />
  </head>
  <body><div id="root"></div></body>
</html>`;

// Imóvel real anunciado: Casa Sunflower, Quadra 19 Lote 30
const CASA_SUNFLOWER = {
  id: "sf-qd19-lt30",
  title: "Casa Sunflower",
  type: "house",
  price: 545000,
  address: "Quadra 19, Lote 30 - Sunflower",
  city: "Rondonópolis",
  state: "MT",
  latitude: "-16.46386110",
  longitude: "-54.59555560",
  bedrooms: 3,
  bathrooms: 2,
  area: 120,
  parking: 2,
  description:
    "Casa ampla no condomínio Sunflower. Excelente acabamento e localização privilegiada.",
  status: "pronto_para_morar",
  neighborhood: null,
  mainImageUrl: "/uploads/sf-qd19-lt30-frente.jpg",
  createdAt: new Date("2026-03-10T14:00:00Z"),
  updatedAt: new Date("2026-07-24T09:00:00Z"),
};

// Imóvel real anunciado: Casa Vila Adriana, R. Espírito Santo 705
const CASA_VILA_ADRIANA = {
  id: "va-qd47-lt10",
  title: "Casa Vila Adriana",
  type: "house",
  price: 340000,
  address: "R. Espírito Santo, 705 - Vila Adriana",
  city: "Rondonópolis",
  state: "MT",
  bedrooms: 2,
  bathrooms: 1,
  area: 75,
  parking: 1,
  description:
    "Casa bem localizada na Vila Adriana. Imóvel com ótimo acabamento e pronto para morar.",
  status: "pronto_para_morar",
  neighborhood: "Vila Adriana",
  mainImageUrl: null,
  createdAt: new Date("2026-03-10T14:00:00Z"),
};

describe("SEO - detecção de robôs", () => {
  it("identifica crawlers conhecidos", () => {
    expect(isBotUserAgent("WhatsApp/2.23.20.0")).toBe(true);
    expect(isBotUserAgent("Mozilla/5.0 (compatible; Googlebot/2.1)")).toBe(true);
    expect(isBotUserAgent("facebookexternalhit/1.1")).toBe(true);
  });

  it("não confunde navegador comum com robô", () => {
    expect(
      isBotUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36"
      )
    ).toBe(false);
    expect(isBotUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) Safari/604.1")).toBe(false);
    expect(isBotUserAgent(undefined)).toBe(false);
  });
});

describe("SEO - Casa Sunflower (sf-qd19-lt30)", () => {
  it("gera título com nome e preço do imóvel", () => {
    const meta = buildPropertyMeta(CASA_SUNFLOWER, CASA_SUNFLOWER.mainImageUrl);
    expect(meta.title).toContain("Casa Sunflower");
    expect(meta.title).toContain("545.000");
    expect(meta.title).toContain("Souza Construtora");
  });

  it("descreve os atributos reais do imóvel", () => {
    const desc = buildDescription(CASA_SUNFLOWER);
    expect(desc).toContain("3 quartos");
    expect(desc).toContain("2 banheiros");
    expect(desc).toContain("2 vagas");
    expect(desc).toContain("120m²");
    expect(desc).toContain("Pronto para morar");
    expect(desc).toContain("Rondonópolis");
    expect(desc.length).toBeLessThanOrEqual(300);
  });

  it("usa a cidade quando o imóvel não tem bairro cadastrado", () => {
    const desc = buildDescription(CASA_SUNFLOWER);
    expect(desc).toContain("Rondonópolis - R$");
    expect(desc).not.toContain("null");
    expect(desc).not.toContain("undefined");
  });

  it("converte a foto do imóvel em URL absoluta", () => {
    const meta = buildPropertyMeta(CASA_SUNFLOWER, CASA_SUNFLOWER.mainImageUrl);
    expect(meta.image).toMatch(/^https:\/\//);
    expect(meta.image).toContain("sf-qd19-lt30-frente.jpg");
  });

  it("aponta a canônica para o domínio próprio, não para o host da requisição", () => {
    const meta = buildPropertyMeta(CASA_SUNFLOWER, null);
    expect(meta.url).toMatch(/^https:\/\//);
    expect(meta.url).toContain("/imovel/sf-qd19-lt30");
    expect(meta.url).not.toContain("localhost");
    expect(meta.url).not.toContain("manus");
  });

  it("injeta as meta tags no HTML substituindo as genéricas", () => {
    const html = injectMeta(TEMPLATE, buildPropertyMeta(CASA_SUNFLOWER, CASA_SUNFLOWER.mainImageUrl));

    expect(html).toContain('lang="pt-BR"');
    expect(html).toContain("Casa Sunflower");
    expect(html).toContain("545.000");
    expect(html).toContain('<link rel="canonical"');
    expect(html).toContain('name="twitter:card"');

    expect(html).not.toContain("<title>Souza Construtora</title>");
    expect(html).not.toContain("Há mais de 20 anos realizando o sonho");
  });

  it("gera JSON-LD válido com preço, endereço e disponibilidade", () => {
    const html = injectMeta(TEMPLATE, buildPropertyMeta(CASA_SUNFLOWER, null));
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();

    const data = JSON.parse(match![1]);
    expect(data["@type"]).toBe("RealEstateListing");
    expect(data.name).toBe("Casa Sunflower");
    expect(data.offers.price).toBe(545000);
    expect(data.offers.priceCurrency).toBe("BRL");
    expect(data.offers.availability).toBe("https://schema.org/InStock");
    expect(data.address.addressLocality).toBe("Rondonópolis");
    expect(data.address.addressRegion).toBe("MT");
    expect(data.numberOfRooms).toBe(3);
    expect(data.floorSize.value).toBe(120);
  });

  it("não marca noindex em imóvel disponível", () => {
    const meta = buildPropertyMeta(CASA_SUNFLOWER, null);
    expect(meta.noindex).toBe(false);
    expect(injectMeta(TEMPLATE, meta)).not.toContain("noindex");
  });
});

describe("SEO - Casa Vila Adriana (va-qd47-lt10)", () => {
  it("usa o bairro quando ele está cadastrado", () => {
    const desc = buildDescription(CASA_VILA_ADRIANA);
    expect(desc).toContain("Vila Adriana, Rondonópolis");
    expect(desc).toContain("2 quartos");
    expect(desc).toContain("1 banheiro");
    expect(desc).not.toContain("1 banheiros");
    expect(desc).not.toContain("1 vagas");
  });

  it("cai para a logo quando o imóvel ainda não tem foto", () => {
    const meta = buildPropertyMeta(CASA_VILA_ADRIANA, null);
    expect(meta.image).toMatch(/^https:\/\//);
    expect(meta.image).toContain("logo-souza.jpg");
  });
});

describe("SEO - imóvel vendido", () => {
  it("marca noindex e SoldOut sem quebrar o link antigo", () => {
    const vendido = buildPropertyMeta({ ...CASA_SUNFLOWER, status: "vendido" }, null);
    expect(vendido.noindex).toBe(true);

    const html = injectMeta(TEMPLATE, vendido);
    expect(html).toContain('name="robots" content="noindex, follow"');

    const data = JSON.parse(
      html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1]
    );
    expect(data.offers.availability).toBe("https://schema.org/SoldOut");
  });
});

describe("SEO - imóvel inexistente", () => {
  it("gera meta de não encontrado com noindex", () => {
    const html = injectMeta(TEMPLATE, buildNotFoundMeta());
    expect(html).toContain("não encontrado");
    expect(html).toContain('name="robots" content="noindex, follow"');
  });
});

describe("SEO - robustez do HTML gerado", () => {
  it("escapa aspas no título sem quebrar o atributo content", () => {
    const comAspas = { ...CASA_SUNFLOWER, title: 'Casa Sunflower "Alto Padrão"' };
    const html = injectMeta(TEMPLATE, buildPropertyMeta(comAspas, null));
    const ogTitle = html.match(/<meta property="og:title" content="([^"]*)"/);

    expect(ogTitle).not.toBeNull();
    expect(ogTitle![1]).toContain("&quot;");
    expect(ogTitle![1]).toContain("Alto Padrão");
  });

  it("escapa o E comercial nos atributos das meta tags", () => {
    const comEComercial = {
      ...CASA_SUNFLOWER,
      description: "Casa com área gourmet & piscina.",
    };
    const html = injectMeta(TEMPLATE, buildPropertyMeta(comEComercial, null));

    const ogDesc = html.match(/<meta property="og:description" content="([^"]*)"/);
    expect(ogDesc).not.toBeNull();
    expect(ogDesc![1]).toContain("&amp;");
    expect(ogDesc![1]).not.toMatch(/&(?!amp;|quot;|#39;|lt;|gt;)/);
  });

  it("preserva o ponto de montagem do React", () => {
    const html = injectMeta(TEMPLATE, buildPropertyMeta(CASA_SUNFLOWER, null));
    expect(html).toContain('<div id="root">');
    expect(html).toContain("<body>");
    expect(html).toContain("</html>");
  });
});

describe("SEO - navegador comum não é afetado", () => {
  it("o template original permanece sem meta tags de imóvel", () => {
    expect(TEMPLATE).toContain("<title>Souza Construtora</title>");
    expect(TEMPLATE).not.toContain("canonical");
    expect(TEMPLATE).not.toContain("ld+json");
    expect(TEMPLATE).not.toContain("Casa Sunflower");
  });
});