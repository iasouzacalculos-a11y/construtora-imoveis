import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { properties } from "@/lib/mockData";
import { Bath, Bed, Car, Mail, MapPin, Maximize, Phone, User } from "lucide-react";
import { useRoute } from "wouter";
import { toast } from "sonner";

export default function PropertyDetail() {
  const [, params] = useRoute("/imovel/:id");
  const property = properties.find((p) => p.id === params?.id);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Imóvel não encontrado</h1>
            <p className="text-muted-foreground">O imóvel que você procura não existe.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Hero Image */}
          <div className="relative aspect-[21/9] rounded-lg overflow-hidden mb-8">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-background/90 backdrop-blur text-foreground">
                {getTypeLabel(property.type)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">
                    {property.location.address}, {property.location.city} - {property.location.state}
                  </span>
                </div>
                <div className="text-4xl font-bold text-primary mb-6">
                  {formatPrice(property.price)}
                </div>
              </div>

              {/* Features */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Características</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-3 rounded-full mb-2">
                        <Bed className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold">{property.features.bedrooms}</div>
                      <div className="text-sm text-muted-foreground">Quartos</div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-3 rounded-full mb-2">
                        <Bath className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold">{property.features.bathrooms}</div>
                      <div className="text-sm text-muted-foreground">Banheiros</div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-3 rounded-full mb-2">
                        <Maximize className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold">{property.features.area}</div>
                      <div className="text-sm text-muted-foreground">m²</div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-3 rounded-full mb-2">
                        <Car className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold">{property.features.parking}</div>
                      <div className="text-sm text-muted-foreground">Vagas</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Descrição</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Informações Adicionais</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Status</div>
                      <div className="font-medium">
                        {property.status === "available" && "Disponível"}
                        {property.status === "sold" && "Vendido"}
                        {property.status === "reserved" && "Reservado"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Tipo</div>
                      <div className="font-medium">{getTypeLabel(property.type)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Área Total</div>
                      <div className="font-medium">{property.features.area} m²</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Código</div>
                      <div className="font-medium">#{property.id.padStart(6, "0")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Interessado?</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Preencha o formulário abaixo e entraremos em contato com você.
                  </p>

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="name" placeholder="Seu nome" className="pl-10" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="seu@email.com" className="pl-10" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="phone" placeholder="(11) 99999-9999" className="pl-10" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea
                        id="message"
                        placeholder="Gostaria de agendar uma visita..."
                        rows={4}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Enviar Mensagem
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>(11) 9999-9999</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>contato@construtora.com.br</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
