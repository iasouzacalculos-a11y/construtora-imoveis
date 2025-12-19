import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import CTASection from "@/components/CTASection";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { properties } from "@/lib/mockData";
import { Link } from "wouter";
import { Building2, CheckCircle2, Users, MessageCircle } from "lucide-react";

export default function Home() {
  const featuredProperties = properties.slice(0, 3);

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
              
              {/* Botão principal - MAIOR e mais destacado */}
              <div className="flex gap-3 mb-10">
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

        {/* Featured Properties */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Imóveis em Destaque
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore nossas melhores opções com localização privilegiada, acabamento premium e segurança jurídica garantida.
              </p>
            </div>

            {/* Cards em coluna única no mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/imoveis">
                <Button size="lg" variant="outline" className="h-12 px-8">
                  Ver Todos os Imóveis
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />

        {/* CTA Final - "Não encontrou o imóvel ideal?" */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Não encontrou o imóvel ideal?
              </h3>
              <p className="text-muted-foreground mb-8">
                Fale com um consultor e receba opções sob medida para você.
              </p>
              <Button size="lg" className="h-14 px-10 text-base font-semibold shadow-lg hover:shadow-xl transition-all gap-2">
                <MessageCircle className="h-5 w-5" />
                Falar com um consultor agora
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
