import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="bg-muted py-20">
      <div className="container">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Subtítulo */}
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
            Seu novo lar espera por você
          </p>

          {/* Título Principal */}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Pronto para Encontrar seu Imóvel?
          </h2>

          {/* Descrição */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            Entre em contato conosco e agende uma visita. Nossa equipe está pronta para ajudar você a realizar o sonho da casa própria.
          </p>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/imoveis" asChild>
              <Button size="lg" className="px-8">
                Ver Imóveis Disponíveis
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8">
              Falar com Consultor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
