import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal, MessageCircle, MapPin } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useSearch } from "wouter";

export default function Properties() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);

  const [filterNeighborhood, setFilterNeighborhood] = useState(params.get("neighborhood") || "");
  const [filterType, setFilterType] = useState(params.get("type") || "");
  const [filterStatus, setFilterStatus] = useState(params.get("status") || "");
  const [filterBedrooms, setFilterBedrooms] = useState(params.get("bedrooms") || "");
  const [filterPriceRange, setFilterPriceRange] = useState(params.get("price") || "");
  const [showFilters, setShowFilters] = useState(false);

  const { data: fetchedProperties, isLoading } = trpc.properties.list.useQuery();
  const { data: neighborhoodsData } = trpc.properties.neighborhoods.useQuery();

  const properties = useMemo(() => {
    if (!fetchedProperties) return [];
    return fetchedProperties.map((prop: any) => ({
      id: prop.id,
      title: prop.title,
      type: prop.type,
      price: prop.price,
      neighborhood: prop.neighborhood || "",
      location: {
        address: prop.address,
        city: prop.city,
        state: prop.state,
        latitude: prop.latitude,
        longitude: prop.longitude,
      },
      features: {
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms,
        area: prop.area,
        parking: prop.parking,
      },
      image: prop.images?.[0]?.imageUrl || prop.mainImageUrl || '/property-placeholder.jpg',
      gallery: prop.images?.map((img: any) => img.imageUrl) || [],
      description: prop.description,
      status: prop.status,
    }));
  }, [fetchedProperties]);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (filterNeighborhood && p.neighborhood !== filterNeighborhood) return false;
      if (filterType && p.type !== filterType) return false;
      if (filterStatus && p.status !== filterStatus) return false;
      if (filterBedrooms && filterBedrooms !== "all") {
        const min = parseInt(filterBedrooms);
        if (!p.features.bedrooms || p.features.bedrooms < min) return false;
      }
      if (filterPriceRange) {
        const [min, max] = filterPriceRange.split("-").map(Number);
        if (p.price < min) return false;
        if (max && p.price > max) return false;
      }
      return true;
    });
  }, [properties, filterNeighborhood, filterType, filterStatus, filterBedrooms, filterPriceRange]);

  const clearFilters = () => {
    setFilterNeighborhood("");
    setFilterType("");
    setFilterStatus("");
    setFilterBedrooms("");
    setFilterPriceRange("");
  };

  const hasFilters = filterNeighborhood || filterType || filterStatus || filterBedrooms || filterPriceRange;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-6 md:py-8">
        <div className="container">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Nossos Imóveis</h1>
            <p className="text-muted-foreground">
              {isLoading ? "Carregando..." : `${filteredProperties.length} ${filteredProperties.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}`}
            </p>
          </div>

          {/* Filtros */}
          <div className="mb-6">
            {/* Botão mobile */}
            <div className="md:hidden mb-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                {hasFilters && <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">!</span>}
              </Button>
            </div>

            <div className={`bg-card border rounded-xl p-4 md:p-6 ${showFilters || typeof window !== 'undefined' && window.innerWidth >= 768 ? 'block' : 'hidden md:block'}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                </h2>
                {hasFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                    Limpar tudo
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Bairro */}
                <div>
                  <Label className="text-xs text-muted-foreground flex items-center gap-1 mb-1.5">
                    <MapPin className="h-3 w-3" /> Bairro
                  </Label>
                  <select
                    value={filterNeighborhood}
                    onChange={(e) => setFilterNeighborhood(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Todos</option>
                    {neighborhoodsData?.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                {/* Tipo */}
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Tipo</Label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Todos</option>
                    <option value="Casa">Casa</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Terreno">Terreno</option>
                    <option value="Comercial">Comercial</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Status</Label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Todos</option>
                    <option value="pronto_para_morar">Pronto para Morar</option>
                    <option value="em_construcao">Em Construção</option>
                  </select>
                </div>

                {/* Quartos */}
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Quartos (mín.)</Label>
                  <Select
                    value={filterBedrooms}
                    onValueChange={(v) => setFilterBedrooms(v === "all" ? "" : v)}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Qualquer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Qualquer</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Preço */}
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Faixa de Preço</Label>
                  <select
                    value={filterPriceRange}
                    onChange={(e) => setFilterPriceRange(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">Qualquer</option>
                    <option value="0-350000">Até R$ 350.000</option>
                    <option value="350000-500000">R$ 350k – R$ 500k</option>
                    <option value="500000-800000">R$ 500k – R$ 800k</option>
                    <option value="800000-99999999">Acima de R$ 800k</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de imóveis */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">
                Nenhum imóvel encontrado com os filtros selecionados.
              </p>
              <Button onClick={clearFilters}>Limpar Filtros</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </main>

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

      <Footer />
    </div>
  );
}
