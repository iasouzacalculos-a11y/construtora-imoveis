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
  const [showFilters, setShowFilters] = useState(true);
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
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Nossos Imóveis</h1>
            <p className="text-muted-foreground">
              Encontrados {filteredProperties.length} {filteredProperties.length === 1 ? "imóvel" : "imóveis"}
            </p>
          </div>

          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-80 flex-shrink-0`}>
              <div className="sticky top-20 bg-card border rounded-lg p-6 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filtros
                  </h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Limpar
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bedrooms">Quartos (mínimo)</Label>
                    <Select
                      value={filters.bedrooms?.toString() || ""}
                      onValueChange={(value) => updateFilter("bedrooms", value ? parseInt(value) : "")}
                    >
                      <SelectTrigger id="bedrooms">
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

                  <div>
                    <Label>Faixa de Preço</Label>
                    <div className="space-y-2">
                      <Button
                        variant={filters.minPrice === 0 && filters.maxPrice === 350000 ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => {
                          updateFilter("minPrice", 0);
                          updateFilter("maxPrice", 350000);
                        }}
                      >
                        Até R$ 350.000
                      </Button>
                      <Button
                        variant={filters.minPrice === 350000 && filters.maxPrice === 500000 ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => {
                          updateFilter("minPrice", 350000);
                          updateFilter("maxPrice", 500000);
                        }}
                      >
                        R$ 350.000 - R$ 500.000
                      </Button>
                      <Button
                        variant={filters.minPrice === 500000 && filters.maxPrice === 800000 ? "default" : "outline"}
                        className="w-full justify-start"
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
            </aside>

            {/* Properties Grid */}
            <div className="flex-1">
              <div className="mb-4 lg:hidden">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                </Button>
              </div>

              {filteredProperties.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-lg text-muted-foreground mb-4">
                    Nenhum imóvel encontrado com os filtros selecionados.
                  </p>
                  <Button onClick={clearFilters}>Limpar Filtros</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <CTASection />
      <Footer />
    </div>
  );
}
