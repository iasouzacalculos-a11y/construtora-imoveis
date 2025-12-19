import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Background gradient subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/40 via-background to-muted/20 -z-10" />
      
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Subtítulo pequeno e elegante */}
          <p className="text-xs md:text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-4 text-center">
            Seu novo lar espera por você
          </p>

          {/* Título principal forte */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-center leading-tight">
            Pronto para encontrar seu novo imóvel?
          </h2>

          {/* Descrição com micro-copy persuasivo */}
          <p className="text-base md:text-lg text-muted-foreground text-center leading-relaxed mb-8 max-w-xl mx-auto">
            Há mais de 20 anos ajudando famílias a realizarem o sonho da casa própria com segurança e confiança. Nossa equipe está pronta para guiá-lo em cada passo.
          </p>

          {/* Trust signals - micro-copy de credibilidade */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Imóveis regularizados</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Segurança jurídica</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Atendimento humanizado</span>
            </div>
          </div>

          {/* Botões com hierarquia clara */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* Botão primário - ação principal */}
            <Link href="/imoveis" asChild>
              <Button size="lg" className="px-8 h-12 font-semibold">
                Ver imóveis disponíveis
              </Button>
            </Link>
            
            {/* Botão secundário - alternativa */}
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 h-12 font-semibold border-2 hover:bg-muted"
            >
              Falar com um consultor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
