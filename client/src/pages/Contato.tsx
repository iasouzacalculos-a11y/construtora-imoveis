import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { 
  Building2, 
  CheckCircle2, 
  ChevronDown, 
  ChevronRight, 
  Clock, 
  Handshake, 
  Mail, 
  MessageSquare, 
  Phone, 
  Send, 
  TrendingUp, 
  Users 
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Contato() {
  // Estado do formulário de contato
  const [contatoForm, setContatoForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });
  const [contatoLoading, setContatoLoading] = useState(false);

  // Estado do FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Mutation para enviar contato
  const sendContactMutation = trpc.contact.sendMessage.useMutation({
    onSuccess: () => {
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      setContatoForm({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
    },
    onError: (error: unknown) => {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
      console.error(error);
    },
  });

  const handleContatoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contatoForm.nome || !contatoForm.email || !contatoForm.telefone || !contatoForm.assunto || !contatoForm.mensagem) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    setContatoLoading(true);
    sendContactMutation.mutate(contatoForm, {
      onSettled: () => setContatoLoading(false),
    });
  };

  const faqItems = [
    {
      pergunta: "Como posso agendar uma visita a um imóvel?",
      resposta: "Você pode agendar uma visita de várias formas: pelo WhatsApp clicando no botão verde no canto da tela, pelo telefone (66) 99999-8693, ou preenchendo o formulário de contato nesta página. Nossa equipe entrará em contato para confirmar o melhor horário para você."
    },
    {
      pergunta: "Quais são as formas de pagamento disponíveis?",
      resposta: "Trabalhamos com diversas formas de pagamento para facilitar a aquisição do seu imóvel: financiamento bancário (Caixa, Banco do Brasil, Bradesco, Itaú), consórcio, pagamento à vista com desconto especial, e parcelamento direto com a construtora. Cada caso é analisado individualmente para encontrar a melhor opção."
    },
    {
      pergunta: "Os imóveis são financiáveis pelo programa Minha Casa Minha Vida?",
      resposta: "Sim! Vários de nossos imóveis se enquadram nas faixas do programa Minha Casa Minha Vida. Nossa equipe pode fazer uma simulação gratuita para verificar se você se enquadra no programa e qual seria o valor das parcelas."
    },
    {
      pergunta: "Vocês fazem permuta de imóveis?",
      resposta: "Sim, avaliamos propostas de permuta. Se você possui um imóvel e deseja trocar por um de nossos empreendimentos, entre em contato conosco para uma avaliação. Analisamos cada caso individualmente para encontrar a melhor solução."
    },
    {
      pergunta: "Qual a documentação necessária para comprar um imóvel?",
      resposta: "Para iniciar o processo de compra, você precisará de: RG e CPF, comprovante de renda (últimos 3 meses), comprovante de residência, certidão de estado civil, e declaração de imposto de renda (se aplicável). Nossa equipe orienta você em todo o processo documental."
    },
    {
      pergunta: "Os imóveis possuem documentação regularizada?",
      resposta: "Sim! Todos os nossos imóveis são 100% regularizados, com escritura, registro em cartório e todas as certidões negativas. Trabalhamos com total transparência e segurança jurídica para que você tenha tranquilidade na sua compra."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
          <div className="container">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-primary transition-colors">Início</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Contato</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Fale <span className="text-primary">Conosco</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Estamos prontos para ajudar você a encontrar o imóvel dos seus sonhos. 
                Entre em contato e nossa equipe responderá em até 24 horas.
              </p>
            </div>
          </div>
        </section>

        {/* Informações de Contato + Formulário */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Coluna Esquerda - Informações */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Informações de Contato
                  </h2>
                  <p className="text-muted-foreground">
                    Escolha o canal de sua preferência para entrar em contato conosco. 
                    Estamos sempre disponíveis para atendê-lo.
                  </p>
                </div>

                {/* Cards de Contato */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-primary/10">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Telefone</h3>
                          <a 
                            href="tel:+5566999998693" 
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            (66) 99999-8693
                          </a>
                          <p className="text-xs text-muted-foreground mt-1">WhatsApp disponível</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-primary/10">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Email</h3>
                          <a 
                            href="mailto:contato@souzaconstrutora.com.br" 
                            className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                          >
                            contato@souzaconstrutora.com.br
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-primary/50 transition-colors sm:col-span-2">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-primary/10">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Horário de Atendimento</h3>
                          <p className="text-sm text-muted-foreground">
                            Seg - Sex: 8h às 18h<br />
                            Sábado: 8h às 12h
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-green-50 dark:bg-green-950/30 rounded-2xl p-6 border-2 border-green-200 dark:border-green-900">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-green-500">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Atendimento Rápido</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Prefere conversar pelo WhatsApp? Clique no botão abaixo!
                      </p>
                      <a
                        href="https://wa.me/5566999998693?text=Olá,%20vim%20pelo%20site%20da%20Souza%20Construtora%20e%20gostaria%20de%20mais%20informações%20sobre%20os%20imóveis%20disponíveis."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-green-500 hover:bg-green-600">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chamar no WhatsApp
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Direita - Formulário */}
              <div>
                <Card className="border-2 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">Envie sua Mensagem</CardTitle>
                    </div>
                    <CardDescription>
                      Preencha o formulário abaixo e entraremos em contato em até 24 horas.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContatoSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome">Nome completo *</Label>
                          <Input
                            id="nome"
                            placeholder="Seu nome"
                            value={contatoForm.nome}
                            onChange={(e) => setContatoForm({ ...contatoForm, nome: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={contatoForm.email}
                            onChange={(e) => setContatoForm({ ...contatoForm, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
                          <Input
                            id="telefone"
                            placeholder="(66) 99999-9999"
                            value={contatoForm.telefone}
                            onChange={(e) => setContatoForm({ ...contatoForm, telefone: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="assunto">Assunto *</Label>
                          <Select
                            value={contatoForm.assunto}
                            onValueChange={(value) => setContatoForm({ ...contatoForm, assunto: value })}
                          >
                            <SelectTrigger id="assunto">
                              <SelectValue placeholder="Selecione o assunto" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="interesse">Interesse em imóvel</SelectItem>
                              <SelectItem value="visita">Agendar visita</SelectItem>
                              <SelectItem value="financiamento">Dúvidas sobre financiamento</SelectItem>
                              <SelectItem value="documentacao">Documentação</SelectItem>
                              <SelectItem value="outro">Outro assunto</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mensagem">Mensagem *</Label>
                        <Textarea
                          id="mensagem"
                          placeholder="Escreva sua mensagem aqui..."
                          rows={5}
                          value={contatoForm.mensagem}
                          onChange={(e) => setContatoForm({ ...contatoForm, mensagem: e.target.value })}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full"
                        disabled={contatoLoading}
                      >
                        {contatoLoading ? (
                          "Enviando..."
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Enviar Mensagem
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 inline mr-1 text-green-500" />
                        Respondemos em até 24 horas úteis
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Corretor Parceiro - Simplificada */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Handshake className="h-4 w-4" />
                  Para Corretores
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  É <span className="text-primary">Corretor de Imóveis</span>?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Temos um portfólio exclusivo de imóveis de qualidade em Rondonópolis. 
                  Entre em contato conosco e conheça as vantagens de trabalhar com a Souza Construtora.
                </p>
              </div>

              {/* Benefícios */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="text-center border-2 hover:border-primary/50 hover:shadow-lg transition-all">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Comissões Atrativas</h3>
                    <p className="text-sm text-muted-foreground">
                      As melhores comissões do mercado com pagamento rápido e transparente
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center border-2 hover:border-primary/50 hover:shadow-lg transition-all">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Portfólio Exclusivo</h3>
                    <p className="text-sm text-muted-foreground">
                      Acesso a imóveis de qualidade com documentação 100% regularizada
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center border-2 hover:border-primary/50 hover:shadow-lg transition-all">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Suporte Dedicado</h3>
                    <p className="text-sm text-muted-foreground">
                      Equipe de apoio para ajudar em todas as etapas da negociação
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* CTA para Corretores */}
              <Card className="border-2 shadow-xl bg-gradient-to-r from-primary/5 to-primary/10">
                <CardContent className="p-8 md:p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary flex items-center justify-center">
                    <Handshake className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Quer ser nosso parceiro?
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    Entre em contato conosco pelo WhatsApp ou telefone e converse diretamente 
                    com nossa equipe sobre as oportunidades de parceria.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://wa.me/5566999998693?text=Olá,%20sou%20corretor%20de%20imóveis%20e%20gostaria%20de%20conhecer%20as%20oportunidades%20de%20parceria."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="lg" className="bg-green-500 hover:bg-green-600 w-full sm:w-auto">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Falar no WhatsApp
                      </Button>
                    </a>
                    <a href="tel:+5566999998693">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto">
                        <Phone className="h-5 w-5 mr-2" />
                        (66) 99999-8693
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Perguntas <span className="text-primary">Frequentes</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tire suas dúvidas sobre nossos imóveis, formas de pagamento e processo de compra.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((item, index) => (
                <Card 
                  key={index} 
                  className={`border-2 cursor-pointer transition-all ${openFaq === index ? 'border-primary shadow-lg' : 'hover:border-primary/50'}`}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between p-5">
                      <h3 className="font-semibold text-left pr-4">{item.pergunta}</h3>
                      <ChevronDown 
                        className={`h-5 w-5 text-primary flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                      />
                    </div>
                    {openFaq === index && (
                      <div className="px-5 pb-5 pt-0">
                        <div className="border-t pt-4">
                          <p className="text-muted-foreground leading-relaxed">{item.resposta}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ainda tem dúvidas?
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Nossa equipe está pronta para ajudar você. Fale conosco pelo WhatsApp 
                e tire todas as suas dúvidas em tempo real.
              </p>
              <a
                href="https://wa.me/5566999998693?text=Olá,%20vim%20pelo%20site%20da%20Souza%20Construtora%20e%20gostaria%20de%20mais%20informações%20sobre%20os%20imóveis%20disponíveis."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Falar no WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
