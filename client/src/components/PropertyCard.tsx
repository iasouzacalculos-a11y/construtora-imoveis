import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Property } from "@/lib/types";
import { Bath, Bed, Car, MapPin, Maximize, Star, Flame, Home } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export default function PropertyCard({ property, featured }: PropertyCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

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
      Casa: "Casa",
    };
    return labels[type] || type;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      available: "Disponível",
      sold: "Vendido",
      reserved: "Reservado",
      pronto_para_morar: "Pronto para Morar",
      em_construcao: "Em Construção",
      vendido: "Vendido",
    };
    return labels[status] || status;
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    if (status === "available" || status === "pronto_para_morar") return "default";
    if (status === "reserved" || status === "em_construcao") return "secondary";
    return "destructive";
  };

  const isExclusive = property.price > 1000000;
  const isMostWanted = property.price < 500000;

  return (
    <Link href={`/imovel/${property.id}`} asChild>
      <a className="block h-full cursor-pointer no-underline">
        <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full hover:-translate-y-2 hover:border-primary/50">
          
          {/* Área da imagem com skeleton */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">

            {/* Skeleton animado enquanto carrega */}
            {!imgLoaded && !imgError && (
              <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                <Home className="h-12 w-12 text-muted-foreground/30" />
              </div>
            )}

            {/* Fallback quando imagem falha */}
            {imgError && (
              <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center gap-2">
                <Home className="h-12 w-12 text-muted-foreground/40" />
                <span className="text-xs text-muted-foreground">Imagem indisponível</span>
              </div>
            )}

            {/* Imagem real com lazy loading */}
            {!imgError && (
              <img
                src={property.image}
                alt={property.title}
                loading="lazy"
                decoding="async"
                className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-300 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImgLoaded(true)}
                onError={() => {
                  setImgError(true);
                  setImgLoaded(true);
                }}
              />
            )}

            {/* Badges de status e tipo */}
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              <Badge variant={getStatusVariant(property.status)} className="bg-background/90 backdrop-blur text-xs">
                {getStatusLabel(property.status)}
              </Badge>
              <Badge variant="secondary" className="bg-background/90 backdrop-blur text-xs">
                {getTypeLabel(property.type)}
              </Badge>
            </div>

            {/* Selo especial */}
            {isExclusive && (
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-amber-500 text-white border-0 gap-1 text-xs">
                  <Star className="h-3 w-3" />
                  Exclusivo
                </Badge>
              </div>
            )}
            {isMostWanted && !isExclusive && (
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-orange-500 text-white border-0 gap-1 text-xs">
                  <Flame className="h-3 w-3" />
                  Mais procurado
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="p-4">
            <div className="mb-3">
              <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors duration-200">
                {property.title}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-1">
                  {property.location.address}, {property.location.city}
                </span>
              </div>
            </div>

            {/* Preço em destaque */}
            <div className="mb-4">
              <p className="text-2xl md:text-3xl font-bold text-primary">{formatPrice(property.price)}</p>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {property.features.bedrooms != null && (
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.features.bedrooms}</span>
                </div>
              )}
              {property.features.bathrooms != null && (
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.features.bathrooms}</span>
                </div>
              )}
              {property.features.area != null && (
                <div className="flex items-center gap-1">
                  <Maximize className="h-4 w-4" />
                  <span>{property.features.area}m²</span>
                </div>
              )}
              {property.features.parking != null && (
                <div className="flex items-center gap-1">
                  <Car className="h-4 w-4" />
                  <span>{property.features.parking}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
