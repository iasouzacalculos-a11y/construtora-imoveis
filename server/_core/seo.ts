import fs from "fs";
import path from "path";
import type { Express, Request, Response, NextFunction } from "express";
import { getAllProperties, getPropertyById, getPropertyImages } from "../db";

const CANONICAL_ORIGIN = (
  process.env.PUBLIC_SITE_URL || "https://souzaconstrutora.com.br"
).replace(/\/+$/, "");

const BOT_PATTERN =
  /googlebot|bingbot|yandex|duckduckbot|baiduspider|slurp|whatsapp|facebookexternalhit|facebot|twitterbot|telegrambot|linkedinbot|discordbot|slackbot|embedly|pinterest|redditbot|applebot|petalbot|ia_archiver/i;

export function isBotUserAgent(userAgent: string | undefined | null): boolean {
  return BOT_PATTERN.test(userAgent || "");
}

function isBot(req: Request): boolean {
  return isBotUserAgent(req.get("user-agent"));
}

export function escapeAttr(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function absoluteUrl(url: string | null | undefined): string {
  if (!url) return `${CANONICAL_ORIGIN}/logo-souza.jpg`;
  if (/^https?:\/\//i.test(url)) return url;
  return `${CANONICAL_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(price);
}

const STATUS_LABEL: Record<string, string> = {
  pronto_para_morar: "Pronto para morar",
  em_construcao: "Em construção",
  vendido: "Vendido",
};

export function buildDescription(p: any): string {
  const parts: string[] = [];
  if (p.bedrooms) parts.push(`${p.bedrooms} quarto${p.bedrooms > 1 ? "s" : ""}`);
  if (p.bathrooms) parts.push(`${p.bathrooms} banheiro${p.bathrooms > 1 ? "s" : ""}`);
  if (p.parking) parts.push(`${p.parking} vaga${p.parking > 1 ? "s" : ""}`);
  if (p.area) parts.push(`${p.area}m²`);

  const specs = parts.length > 0 ? parts.join(", ") + ". " : "";
  const local = p.neighborhood ? `${p.neighborhood}, ${p.city}` : p.city;
  const status = STATUS_LABEL[p.status] ? `${STATUS_LABEL[p.status]}. ` : "";
  const base = `${specs}${status}${local} - ${formatPrice(p.price)}.`;

  const extra = p.description ? ` ${String(p.description).replace(/\s+/g, " ").trim()}` : "";
  const full = (base + extra).trim();

  return full.length > 300 ? full.slice(0, 297).trimEnd() + "..." : full;
}

export type SeoMeta = {
  title: string;
  description: string;
  image: string;
  url: string;
  noindex?: boolean;
  jsonLd?: object;
};

export function injectMeta(html: string, meta: SeoMeta): string {
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);
  const image = escapeAttr(meta.image);
  const url = escapeAttr(meta.url);

  let out = html;

  out = out.replace(/<html([^>]*)lang="[^"]*"([^>]*)>/i, '<html$1lang="pt-BR"$2>');
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  out = out.replace(
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${description}" />`
  );
  out = out.replace(
    /<meta\s+property="og:title"[^>]*>/i,
    `<meta property="og:title" content="${title}" />`
  );
  out = out.replace(
    /<meta\s+property="og:description"[^>]*>/i,
    `<meta property="og:description" content="${description}" />`
  );
  out = out.replace(
    /<meta\s+property="og:image"[^>]*>/i,
    `<meta property="og:image" content="${image}" />`
  );

  const extraTags = [
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:site_name" content="Souza Construtora" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<link rel="canonical" href="${url}" />`,
    meta.noindex ? `<meta name="robots" content="noindex, follow" />` : "",
    meta.jsonLd
      ? `<script type="application/ld+json">${JSON.stringify(meta.jsonLd).replace(/</g, "\\u003c")}</script>`
      : "",
  ]
    .filter(Boolean)
    .join("\n    ");

  out = out.replace("</head>", `    ${extraTags}\n  </head>`);

  return out;
}

export function buildPropertyMeta(property: any, imageUrl: string | null): SeoMeta {
  const url = `${CANONICAL_ORIGIN}/imovel/${encodeURIComponent(property.id)}`;
  const image = absoluteUrl(imageUrl);
  const description = buildDescription(property);
  const isSold = property.status === "vendido";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description,
    url,
    image,
    datePosted: property.createdAt ? new Date(property.createdAt).toISOString() : undefined,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "BRL",
      availability: isSold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.state,
      addressCountry: "BR",
    },
    ...(property.area
      ? { floorSize: { "@type": "QuantitativeValue", value: property.area, unitCode: "MTK" } }
      : {}),
    ...(property.bedrooms ? { numberOfRooms: property.bedrooms } : {}),
    provider: {
      "@type": "Organization",
      name: "Souza Construtora",
      url: CANONICAL_ORIGIN,
    },
  };

  return {
    title: `${property.title} - ${formatPrice(property.price)} | Souza Construtora`,
    description,
    image,
    url,
    noindex: isSold,
    jsonLd,
  };
}

export function buildNotFoundMeta(): SeoMeta {
  return {
    title: "Imóvel não encontrado | Souza Construtora",
    description:
      "O imóvel que você procura não está mais disponível. Veja outros imóveis da Souza Construtora em Rondonópolis.",
    image: `${CANONICAL_ORIGIN}/logo-souza.jpg`,
    url: `${CANONICAL_ORIGIN}/imoveis`,
    noindex: true,
  };
}

export function registerSeoRoutes(app: Express, getTemplate: (url: string) => Promise<string>) {
  app.get("/robots.txt", (_req: Request, res: Response) => {
    res.type("text/plain").send(
      [
        "User-agent: *",
        "Allow: /",
        "Disallow: /admin",
        "Disallow: /api",
        "",
        `Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`,
        "",
      ].join("\n")
    );
  });

  app.get("/sitemap.xml", async (_req: Request, res: Response) => {
    try {
      const properties = await getAllProperties();

      const staticUrls = [
        { loc: `${CANONICAL_ORIGIN}/`, priority: "1.0", changefreq: "daily" },
        { loc: `${CANONICAL_ORIGIN}/imoveis`, priority: "0.9", changefreq: "daily" },
        { loc: `${CANONICAL_ORIGIN}/sobre`, priority: "0.5", changefreq: "monthly" },
        { loc: `${CANONICAL_ORIGIN}/contato`, priority: "0.5", changefreq: "monthly" },
        { loc: `${CANONICAL_ORIGIN}/corretor`, priority: "0.4", changefreq: "monthly" },
      ];

      const propertyUrls = (properties || [])
        .filter((p: any) => p.status !== "vendido")
        .map((p: any) => ({
          loc: `${CANONICAL_ORIGIN}/imovel/${encodeURIComponent(p.id)}`,
          priority: "0.8",
          changefreq: "weekly",
          lastmod: p.updatedAt ? new Date(p.updatedAt).toISOString().split("T")[0] : undefined,
        }));

      const body = [...staticUrls, ...propertyUrls]
        .map(
          (u: any) =>
            `  <url>\n    <loc>${escapeAttr(u.loc)}</loc>\n` +
            (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : "") +
            `    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
        )
        .join("\n");

      res
        .type("application/xml")
        .send(
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`
        );
    } catch (error) {
      console.error("[SEO] sitemap failed", error);
      res.status(500).type("text/plain").send("sitemap unavailable");
    }
  });

  app.get("/imovel/:id", async (req: Request, res: Response, next: NextFunction) => {
    res.set("Vary", "User-Agent");

    if (!isBot(req)) return next();

    try {
      const property: any = await getPropertyById(req.params.id);
      const template = await getTemplate(req.originalUrl);

      if (!property) {
        return res
          .status(404)
          .set({ "Content-Type": "text/html", Vary: "User-Agent" })
          .end(injectMeta(template, buildNotFoundMeta()));
      }

      let imageUrl: string | null = property.mainImageUrl ?? null;
      if (!imageUrl) {
        const images = await getPropertyImages(property.id);
        imageUrl = images && images.length > 0 ? images[0].imageUrl : null;
      }

      res
        .status(200)
        .set({
          "Content-Type": "text/html",
          "Cache-Control": "public, max-age=300",
          Vary: "User-Agent",
        })
        .end(injectMeta(template, buildPropertyMeta(property, imageUrl)));
    } catch (error) {
      console.error("[SEO] property meta failed", error);
      next();
    }
  });
}

export function readIndexHtml(distPath: string): Promise<string> {
  return fs.promises.readFile(path.resolve(distPath, "index.html"), "utf-8");
}

