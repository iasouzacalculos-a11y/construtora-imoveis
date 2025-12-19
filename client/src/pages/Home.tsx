import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import CTASection from "@/components/CTASection";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { properties } from "@/lib/mockData";
import { Link } from "wouter";
import { Building2, CheckCircle2, Users } from "lucide-react";
import { useState } from "react";

export default function Home() {

  const featuredProperties = properties.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src="/hero-property.jpg"
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Encontre o <span className="text-primary">Imóvel Perfeito</span> para Você
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Imóveis de alto padrão com qualidade e localização privilegiada. Realize o sonho da casa própria com a Souza Construtora.
              </p>
              
              <div className="flex gap-3 mb-8">
                <Link href="/imoveis">
                  <Button size="lg" className="h-12 px-8">
                    Explorar Imóveis
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Mais de 20 anos no mercado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Qualidade garantida</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Atendimento personalizado</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Building2 className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-lg opacity-90">Imóveis Entregues</div>
              </div>
              <div>
                <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <div className="text-4xl font-bold mb-2">1200+</div>
                <div className="text-lg opacity-90">Clientes Satisfeitos</div>
              </div>
              <div>
                <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <div className="text-4xl font-bold mb-2">20+</div>
                <div className="text-lg opacity-90">Anos de Experiência</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Imóveis em Destaque
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conheça nossos imóveis mais procurados com localização privilegiada e acabamento de primeira linha.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/imoveis">
                <Button size="lg" variant="outline">
                  Ver Todos os Imóveis
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
