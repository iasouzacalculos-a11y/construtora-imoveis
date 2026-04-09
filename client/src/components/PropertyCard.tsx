import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Property } from "@/lib/types";
import { Bath, Bed, Car, MapPin, Maximize, Star, Flame } from "lucide-react";
import { Link } from "wouter";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export default function PropertyCard({ property, featured }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      apartment: "Apartamento",
      house: "Casa",
      penthouse: "Cobertura",
      townhouse: "Sobrado",
    };
    return labels[type] || type;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      available: "Disponível",
      sold: "Vendido",
      reserved: "Reservado",
    };
    return labels[status] || status;
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    if (status === "available") return "default";
    if (status === "reserved") return "secondary";
    return "destructive";
  };

  // Determinar se é exclusivo ou mais procurado (baseado no preço ou índice)
  const isExclusive = property.price > 1000000;
  const isMostWanted = property.price < 500000;

  return (
    <Link href={`/imovel/${property.id}`} asChild>
      <a className="block h-full cursor-pointer no-underline">
        <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full hover:-translate-y-2 hover:border-primary/50">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            
            {/* Badges de status e tipo */}
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant={getStatusVariant(property.status)} className="bg-background/90 backdrop-blur">
                {getStatusLabel(property.status)}
              </Badge>
              <Badge variant="secondary" className="bg-background/90 backdrop-blur">
                {getTypeLabel(property.type)}
              </Badge>
            </div>

            {/* Selo especial - Exclusivo ou Mais procurado */}
            {isExclusive && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-amber-500 text-white border-0 gap-1">
                  <Star className="h-3 w-3" />
                  Exclusivo
                </Badge>
              </div>
            )}
            {isMostWanted && !isExclusive && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-orange-500 text-white border-0 gap-1">
                  <Flame className="h-3 w-3" />
                  Mais procurado
                </Badge>
              </div>
            )}
          </div>
          
          <CardContent className="p-4">
            <div className="mb-3">
              <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors duration-200">{property.title}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span className="line-clamp-1">
                  {property.location.address}, {property.location.city}
                </span>
              </div>
            </div>

            {/* Preço em DESTAQUE - bold + maior */}
            <div className="mb-4">
              <p className="text-2xl md:text-3xl font-bold text-primary">{formatPrice(property.price)}</p>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.features.bedrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.features.bathrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Maximize className="h-4 w-4" />
                <span>{property.features.area}m²</span>
              </div>
              <div className="flex items-center gap-1">
                <Car className="h-4 w-4" />
                <span>{property.features.parking}</span>
              </div>
            </div>
          </CardContent>

    
        </Card>
      </a>
    </Link>
  );
}
