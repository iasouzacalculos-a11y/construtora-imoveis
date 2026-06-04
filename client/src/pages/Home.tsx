import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Building2, CheckCircle2, Users, MessageCircle, Search, MapPin, Home as HomeIcon, SlidersHorizontal } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useMemo, useState } from "react";

export default function Home() {
  const [, navigate] = useLocation();

  // Filtros do hero
  const [filterNeighborhood, setFilterNeighborhood] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  // Buscar imóveis e bairros
  const { data: propertiesData, isLoading } = trpc.properties.list.useQuery();
  const { data: neighborhoodsData } = trpc.properties.neighborhoods.useQuery();

  const transformProperty = (p: any) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    location: {
      address: p.address,
      city: p.city,
      state: p.state,
      latitude: p.latitude,
      longitude: p.longitude
    },
    features: {
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      area: p.area,
      parking: p.parking || 0
    },
    type: p.type as "apartment" | "house" | "penthouse" | "townhouse",
    image: p.images?.[0]?.imageUrl || "/placeholder-property.jpg",
    gallery: p.images?.map((img: any) => img.imageUrl) || [],
    description: p.description || "",
    status: (p.status || "pronto_para_morar") as "pronto_para_morar" | "em_construcao" | "vendido",
    deliveryDate: p.deliveryDate,
    neighborhood: p.neighborhood || "",
  });

  // Imóveis filtrados pelo hero
  const filteredProperties = useMemo(() => {
    if (!propertiesData) return [];
    return propertiesData
      .filter((p: any) => {
        if (filterNeighborhood && p.neighborhood !== filterNeighborhood) return false;
        if (filterType && p.type !== filterType) return false;
        if (filterPrice) {
          const [min, max] = filterPrice.split("-").map(Number);
          if (max && p.price > max) return false;
          if (p.price < min) return false;
        }
        return true;
      })
      .map(transformProperty);
  }, [propertiesData, filterNeighborhood, filterType, filterPrice]);

  // Imóveis em destaque (sem filtro) para exibir quando não há filtros ativos
  const { prontosParaMorar, emConstrucao } = useMemo(() => {
    if (!propertiesData) return { prontosParaMorar: [], emConstrucao: [] };
    const prontos = propertiesData
      .filter((p: any) => p.status === "pronto_para_morar" && p.featured)
      .map(transformProperty)
      .slice(0, 6);
    const emConstr = propertiesData
      .filter((p: any) => p.status === "em_construcao" && p.featured)
      .map(transformProperty)
      .slice(0, 3);
    return { prontosParaMorar: prontos, emConstrucao: emConstr };
  }, [propertiesData]);

  const hasFilters = filterNeighborhood || filterType || filterPrice;

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filterNeighborhood) params.set("neighborhood", filterNeighborhood);
    if (filterType) params.set("type", filterType);
    if (filterPrice) params.set("price", filterPrice);
    navigate(`/imoveis?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilterNeighborhood("");
    setFilterType("");
    setFilterPrice("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">

        {/* ═══════════════════════════════════════════
            CAMADA 2: HERO + FILTRO INTEGRADO
        ═══════════════════════════════════════════ */}
        <section className="relative min-h-[580px] flex flex-col justify-center py-12">
          {/* Fundo com imagem e gradiente */}
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-property.jpg"
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background/95" />
          </div>

          <div className="container relative z-10">
            {/* Texto da marca ao fundo */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight">
                Encontre seu <span className="text-primary">novo lar</span> em Rondonópolis
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">
                Há mais de 20 anos realizando o sonho da casa própria com qualidade e confiança.
              </p>
            </div>

            {/* Card de filtro em primeiro plano */}
            <div className="max-w-4xl mx-auto bg-background/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-border p-5 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Buscar Imóvel</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {/* Bairro/Localidade */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Bairro / Localidade
                  </label>
                  <select
                    value={filterNeighborhood}
                    onChange={(e) => setFilterNeighborhood(e.target.value)}
                    className="w-full px-3 py-2.5 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Todos os bairros</option>
                    {neighborhoodsData?.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                {/* Tipo */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Tipo de Imóvel</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-3 py-2.5 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Todos os tipos</option>
                    <option value="Casa">Casa</option>
                    <option value="house">Casa</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="apartment">Apartamento</option>
                    <option value="Terreno">Terreno</option>
                    <option value="Comercial">Comercial</option>
                  </select>
                </div>

                {/* Faixa de Preço */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Faixa de Preço</label>
                  <select
                    value={filterPrice}
                    onChange={(e) => setFilterPrice(e.target.value)}
                    className="w-full px-3 py-2.5 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Qualquer preço</option>
                    <option value="0-350000">Até R$ 350.000</option>
                    <option value="350000-500000">R$ 350.000 – R$ 500.000</option>
                    <option value="500000-800000">R$ 500.000 – R$ 800.000</option>
                    <option value="800000-99999999">Acima de R$ 800.000</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="flex-1 h-11 text-base font-semibold gap-2"
                >
                  <Search className="h-4 w-4" />
                  Buscar Imóveis
                </Button>
                {hasFilters && (
                  <Button variant="outline" size="lg" className="h-11" onClick={clearFilters}>
                    Limpar
                  </Button>
                )}
              </div>
            </div>

            {/* Benefícios */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Imóveis regularizados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Segurança jurídica</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Atendimento humanizado</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            STATS
        ═══════════════════════════════════════════ */}
        <section className="py-10 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-1">500+</div>
                <div className="text-xs md:text-sm opacity-80">Imóveis entregues</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-1">99%</div>
                <div className="text-xs md:text-sm opacity-80">de Satisfação de Clientes</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-1">20+</div>
                <div className="text-xs md:text-sm opacity-80">Anos de experiência</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            CAMADA 3: GRID DE IMÓVEIS
        ═══════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="container">

            {/* Imóveis em destaque (prontos para morar) */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600">
                    <HomeIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Prontos para Morar</h3>
                    <p className="text-muted-foreground text-sm">Disponíveis agora — mudança imediata</p>
                  </div>
                </div>
                <Link href="/imoveis?status=pronto_para_morar">
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    Ver todos →
                  </Button>
                </Link>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-[4/3] rounded-xl bg-muted animate-pulse" />
                  ))}
                </div>
              ) : prontosParaMorar.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {prontosParaMorar.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                  <div className="text-center sm:hidden">
                    <Link href="/imoveis?status=pronto_para_morar">
                      <Button variant="outline" size="lg">Ver todos os imóveis prontos</Button>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum imóvel pronto para morar no momento.
                </div>
              )}
            </div>

            {/* Em Construção */}
            {emConstrucao.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Em Construção</h3>
                      <p className="text-muted-foreground text-sm">Reserve agora com condições especiais</p>
                    </div>
                  </div>
                  <Link href="/imoveis?status=em_construcao">
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                      Ver todos →
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {emConstrucao.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Não encontrou o imóvel ideal?
              </h3>
              <p className="text-muted-foreground mb-8">
                Fale com um consultor e receba opções sob medida para você.
              </p>
              <a
                href="https://wa.me/5566999998693?text=Olá,%20vim%20pelo%20site%20da%20Souza%20Construtora%20e%20gostaria%20de%20mais%20informações%20sobre%20os%20imóveis%20disponíveis."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="h-14 px-10 text-base font-semibold gap-2 bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="h-5 w-5" />
                  Falar com um consultor agora
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
