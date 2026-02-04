import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Building2, 
  Users, 
  Shield, 
  Heart, 
  Target, 
  Eye, 
  Award,
  Handshake,
  Clock,
  FileCheck,
  Home as HomeIcon,
  CheckCircle2
} from "lucide-react";

export default function Sobre() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/">
                <span className="hover:text-primary transition-colors cursor-pointer">Início</span>
              </Link>
              <span>›</span>
              <span className="text-foreground">Sobre Nós</span>
            </div>
            
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                A <span className="text-primary">Souza</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Conheça a história de uma empresa familiar movida pelo sonho de construir lares, 
                guiada pela qualidade e comprometida com cada família.
              </p>
            </div>
          </div>
        </section>

        {/* História Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Imagem */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80"
                    alt="Família em seu novo lar"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Badge decorativo */}
                <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-6 py-4 rounded-xl shadow-lg hidden md:block">
                  <div className="text-3xl font-bold">20+</div>
                  <div className="text-sm opacity-90">anos de história</div>
                </div>
              </div>
              
              {/* Texto */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Transformamos <span className="text-primary">sonhos</span> em lares
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Cada imóvel que construímos carrega o desejo profundo de proporcionar 
                    segurança, conforto e qualidade de vida. A Souza Construtora nasceu do 
                    sonho de uma família em ajudar outras famílias a realizarem o sonho da 
                    casa própria em Rondonópolis.
                  </p>
                  <p>
                    Há mais de duas décadas, seguimos evoluindo sem perder nossa essência: 
                    o atendimento humanizado e o compromisso com a qualidade. Cada projeto 
                    é pensado com cuidado, atenção aos detalhes e respeito ao investimento 
                    de nossos clientes.
                  </p>
                  <p>
                    Nosso propósito é claro: construir não apenas imóveis, mas histórias. 
                    Histórias de famílias que encontraram seu lugar, de sonhos que se 
                    tornaram realidade, de vidas que ganharam um novo capítulo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="py-12 md:py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">20+</div>
                <div className="text-sm opacity-80">anos de experiência</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-sm opacity-80">imóveis entregues</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">1200+</div>
                <div className="text-sm opacity-80">famílias realizadas</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-80">imóveis regularizados</div>
              </div>
            </div>
          </div>
        </section>

        {/* Missão, Visão e Valores */}
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container">
            {/* Missão e Visão */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Missão */}
              <div className="bg-background rounded-2xl p-8 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Missão</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Construir imóveis de qualidade que transformem o sonho da casa própria 
                  em realidade, oferecendo segurança jurídica, acabamento premium e 
                  atendimento humanizado a cada família de Rondonópolis.
                </p>
              </div>
              
              {/* Visão */}
              <div className="bg-background rounded-2xl p-8 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Visão</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Ser reconhecida como a construtora de maior confiança em Rondonópolis, 
                  referência em qualidade, transparência e compromisso com a realização 
                  de sonhos de famílias da região.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <h3 className="text-2xl md:text-3xl font-bold">Nossos</h3>
                <Heart className="h-8 w-8 text-primary" />
                <h3 className="text-2xl md:text-3xl font-bold text-primary">Valores</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Valor 1 */}
              <div className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Qualidade Garantida</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cada detalhe importa. Utilizamos materiais de primeira linha e 
                  técnicas construtivas que garantem durabilidade e conforto.
                </p>
              </div>

              {/* Valor 2 */}
              <div className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Handshake className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Atendimento Humanizado</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tratamos cada cliente como família. Ouvimos suas necessidades e 
                  acompanhamos toda a jornada até a entrega das chaves.
                </p>
              </div>

              {/* Valor 3 */}
              <div className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Segurança Jurídica</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Todos os nossos imóveis são 100% regularizados, com documentação 
                  completa e transparente para sua tranquilidade.
                </p>
              </div>

              {/* Valor 4 */}
              <div className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Compromisso com Prazos</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Respeitamos o tempo de nossos clientes. Planejamento rigoroso 
                  para entregas dentro do prazo combinado.
                </p>
              </div>

              {/* Valor 5 */}
              <div className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileCheck className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Transparência Total</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Comunicação clara em todas as etapas. Você sempre sabe exatamente 
                  o que está acontecendo com seu investimento.
                </p>
              </div>

              {/* Valor 6 */}
              <div className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Foco na Família</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Entendemos que um lar é muito mais que paredes. É onde memórias 
                  são criadas e sonhos são vividos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pilares */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                Nossos <span className="text-primary">pilares</span> são visíveis aos olhos
              </h2>
            </div>

            {/* Pilar 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 md:mb-24">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                  Realizar Sonhos
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Não construímos apenas casas, construímos o cenário onde sua família 
                  vai criar memórias inesquecíveis. Cada projeto nasce com o desejo de 
                  proporcionar qualidade de vida, conforto e a alegria de estar junto 
                  de quem se ama.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Entendemos que a compra de um imóvel é um dos momentos mais importantes 
                  na vida de uma família, e por isso tratamos cada cliente com o cuidado 
                  e atenção que esse momento merece.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
                    alt="Casa moderna"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Pilar 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 md:mb-24">
              <div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
                    alt="Interior de casa"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                  Qualidade de Vida
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Nossos imóveis são projetados pensando no bem-estar de sua família. 
                  Ambientes funcionais, iluminação natural, ventilação adequada e 
                  acabamentos que fazem a diferença no dia a dia.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Localizações estratégicas em bairros que oferecem infraestrutura 
                  completa: escolas, comércio, áreas de lazer e fácil acesso às 
                  principais vias da cidade.
                </p>
              </div>
            </div>

            {/* Pilar 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                  Segurança e Confiança
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Mais de 20 anos de mercado nos ensinaram que a confiança é 
                  construída com ações, não apenas palavras. Por isso, garantimos 
                  documentação 100% regularizada e total transparência em todas 
                  as negociações.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Nosso CRECI ativo (J-10.249/MT 19ª Região) é a garantia de que 
                  você está negociando com profissionais sérios e comprometidos 
                  com a ética e a legalidade.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80"
                    alt="Fachada de casa"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para encontrar seu <span className="text-primary">novo lar</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nossa equipe está pronta para ajudar você a realizar o sonho da casa própria. 
                Agende uma visita e conheça nossos imóveis de perto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/imoveis">
                  <Button size="lg" className="h-14 px-10 text-base font-semibold shadow-lg">
                    Ver Imóveis Disponíveis
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button size="lg" variant="outline" className="h-14 px-10 text-base font-semibold">
                    Falar com Consultor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
