import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterOptions } from "@/lib/types";
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";

export default function Properties() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: fetchedProperties, isLoading, error } = trpc.properties.list.useQuery();

  useEffect(() => {
    if (fetchedProperties) {
      // Transformar dados do banco para o formato esperado pelo PropertyCard
      const transformedProperties = fetchedProperties.map((prop: any) => ({
        id: prop.id,
        title: prop.title,
        type: prop.type,
        price: prop.price,
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
        image: prop.mainImageUrl || '/property-placeholder.jpg',
        description: prop.description,
        status: prop.status,
      }));
      setProperties(transformedProperties);
      setLoading(false);
    }
  }, [fetchedProperties, isLoading, error]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.type && property.type !== filters.type) return false;
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;
      if (filters.bedrooms && property.features.bedrooms < filters.bedrooms) return false;
      if (filters.city && !property.location.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
      return true;
    });
  }, [filters, properties]);

  const updateFilter = (key: keyof FilterOptions, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value || undefined }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-6 md:py-8">
        <div className="container">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Nossos Imóveis</h1>
            <p className="text-muted-foreground">
              Encontrados {filteredProperties.length} {filteredProperties.length === 1 ? "imóvel" : "imóveis"}
            </p>
          </div>

          {/* Filtros em layout responsivo */}
          <div className="mb-6">
            {/* Botão para mostrar/ocultar filtros no mobile */}
            <div className="md:hidden mb-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
              </Button>
            </div>

            {/* Filtros - visível no mobile quando expandido, sempre visível no desktop */}
            {(showFilters || window.innerWidth >= 768) && (
              <div className="bg-card border rounded-lg p-4 md:p-6 space-y-4 md:space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filtros
                  </h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Limpar
                  </Button>
                </div>

                {/* Grid de filtros - 1 coluna no mobile, 2 no tablet+ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Quartos */}
                  <div>
                    <Label htmlFor="bedrooms" className="text-sm md:text-base">Quartos (mínimo)</Label>
                    <Select
                      value={filters.bedrooms?.toString() || ""}
                      onValueChange={(value) => updateFilter("bedrooms", value ? parseInt(value) : "")}
                    >
                      <SelectTrigger id="bedrooms" className="mt-2">
                        <SelectValue placeholder="Qualquer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Qualquer</SelectItem>
                        <SelectItem value="1">1+</SelectItem>
                        <SelectItem value="2">2+</SelectItem>
                        <SelectItem value="3">3+</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Faixa de Preço */}
                  <div>
                    <Label className="text-sm md:text-base">Faixa de Preço</Label>
                    <div className="space-y-2 mt-2">
                      <Button
                        variant={filters.minPrice === 0 && filters.maxPrice === 350000 ? "default" : "outline"}
                        className="w-full justify-start text-xs md:text-sm"
                        onClick={() => {
                          updateFilter("minPrice", 0);
                          updateFilter("maxPrice", 350000);
                        }}
                      >
                        Até R$ 350.000
                      </Button>
                      <Button
                        variant={filters.minPrice === 350000 && filters.maxPrice === 500000 ? "default" : "outline"}
                        className="w-full justify-start text-xs md:text-sm"
                        onClick={() => {
                          updateFilter("minPrice", 350000);
                          updateFilter("maxPrice", 500000);
                        }}
                      >
                        R$ 350.000 - R$ 500.000
                      </Button>
                      <Button
                        variant={filters.minPrice === 500000 && filters.maxPrice === 800000 ? "default" : "outline"}
                        className="w-full justify-start text-xs md:text-sm"
                        onClick={() => {
                          updateFilter("minPrice", 500000);
                          updateFilter("maxPrice", 800000);
                        }}
                      >
                        R$ 500.000 - R$ 800.000
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Properties Grid */}
          <div>
            {filteredProperties.length === 0 ? (
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
        </div>
      </main>

      <CTASection />
      <Footer />
    </div>
  );
}
