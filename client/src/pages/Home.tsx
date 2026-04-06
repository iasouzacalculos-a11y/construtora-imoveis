import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";

import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Building2, CheckCircle2, Users, MessageCircle, Clock, Home as HomeIcon } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useMemo } from "react";

export default function Home() {
  // Buscar imóveis do banco de dados
  const { data: propertiesData, isLoading } = trpc.properties.list.useQuery();

  // Separar imóveis por status
  const { prontosParaMorar, emConstrucao } = useMemo(() => {
    if (!propertiesData) return { prontosParaMorar: [], emConstrucao: [] };
    
    // Transformar dados do banco para o formato esperado pelo PropertyCard
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
      deliveryDate: p.deliveryDate
    });
    
    const prontos = propertiesData
      .filter((p: any) => p.status === "pronto_para_morar" && p.featured)
      .map(transformProperty)
      .slice(0, 3); // Mostrar apenas 3 imóveis em destaque
    
    const emConstr = propertiesData
      .filter((p: any) => p.status === "em_construcao" && p.featured)
      .map(transformProperty)
      .slice(0, 3); // Mostrar apenas 3 imóveis em destaque
    
    return { prontosParaMorar: prontos, emConstrucao: emConstr };
  }, [propertiesData]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Otimizado para conversão */}
        <section className="relative min-h-[600px] md:h-[650px] flex items-center py-12 md:py-0">
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-property.jpg"
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/50" />
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-2xl">
              {/* Título otimizado - máximo 3 linhas no mobile */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Encontre seu <span className="text-primary">novo lar</span> em Rondonópolis com segurança e confiança
              </h1>
              
              {/* Subtítulo */}
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Há mais de 20 anos realizando o sonho da casa própria com qualidade e atendimento humanizado.
              </p>
              
              {/* Botões principais */}
              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/imoveis">
                  <Button size="lg" className="h-14 px-10 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                    Ver imóveis disponíveis
                  </Button>
                </Link>

              </div>

              {/* Benefícios - ícones uniformes, texto menor, mais espaçamento */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Imóveis regularizados</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Segurança jurídica</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Atendimento humanizado</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Números maiores, texto menor, altura reduzida */}
        <section className="py-10 md:py-12 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-1">500+</div>
                <div className="text-xs md:text-sm opacity-80">Imóveis entregues</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-1">1200+</div>
                <div className="text-xs md:text-sm opacity-80">Clientes satisfeitos</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-1">20+</div>
                <div className="text-xs md:text-sm opacity-80">Anos de experiência</div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline de Entregas */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Encontre o Imóvel Ideal para Você
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Escolha entre imóveis prontos para morar ou em construção com previsão de entrega.
              </p>
            </div>

            {/* Prontos para Morar */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600">
                  <HomeIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Prontos para Morar</h3>
                  <p className="text-muted-foreground">Disponíveis agora - Mudança imediata</p>
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-8">Carregando imóveis...</div>
              ) : prontosParaMorar.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {prontosParaMorar.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                  <div className="text-center">
                    <Link href="/imoveis?status=pronto_para_morar">
                      <Button variant="outline" size="lg">
                        Ver todos os imóveis prontos
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum imóvel pronto para morar no momento.
                </div>
              )}
            </div>


          </div>
        </section>

        {/* CTA Final - WhatsApp + Simulador */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Não encontrou o imóvel ideal?
              </h3>
              <p className="text-muted-foreground mb-8">
                Fale com um consultor e receba opções sob medida para você.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5566999998693?text=Olá,%20vim%20pelo%20site%20da%20Souza%20Construtora%20e%20gostaria%20de%20mais%20informações%20sobre%20os%20imóveis%20disponíveis."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    size="lg" 
                    className="h-14 px-10 text-base font-semibold shadow-lg hover:shadow-xl transition-all gap-2 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Falar com um consultor agora
                  </Button>
                </a>

              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
