import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CheckCircle2, FolderOpen, UserPlus, Info, Handshake } from "lucide-react";

export default function Corretor() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    creci: "",
    mensagem: "",
  });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const cadastroMutation = trpc.corretor.solicitarAcesso.useMutation({
    onSuccess: () => {
      setEnviado(true);
      setForm({ nome: "", email: "", telefone: "", creci: "", mensagem: "" });
    },
    onError: () => {
      toast.error("Erro ao enviar solicitação. Tente novamente.");
      setLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.telefone || !form.creci) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    setLoading(true);
    cadastroMutation.mutate(form, {
      onSettled: () => setLoading(false),
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <Handshake className="h-14 w-14 opacity-90" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bem-vindo, Corretor Parceiro!
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Obrigado por fazer parte da nossa rede de parceiros. Aqui você encontra
              tudo que precisa para apresentar nossos imóveis com qualidade e profissionalismo.
            </p>
          </div>
        </section>

        {/* Agradecimento */}
        <section className="py-12 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4">
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Uma mensagem da Souza Construtora</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Valorizamos imensamente a parceria com cada corretor que representa nossos empreendimentos.
                      Sabemos que o seu trabalho é fundamental para levar o sonho da casa própria até as famílias
                      de Rondonópolis. Por isso, preparamos este espaço exclusivo para que você tenha acesso
                      às melhores ferramentas e materiais para o seu dia a dia.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-3">
                      Conte sempre com nossa equipe para tirar dúvidas, agendar visitas e fechar negócios.
                      Juntos, realizamos mais sonhos!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Instruções de Acesso */}
        <section className="py-12">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Banco de Imagens</h2>
              <p className="text-muted-foreground">
                Acesse imagens profissionais dos nossos imóveis sem marca d'água
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 shrink-0">
                      <FolderOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Corretores com acesso</h3>
                      <p className="text-sm text-muted-foreground">
                        Se você já foi aprovado, clique no botão abaixo para acessar
                        o banco de imagens diretamente no Google Drive.
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://drive.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4"
                  >
                    <Button className="w-full gap-2">
                      <FolderOpen className="h-4 w-4" />
                      Acessar Banco de Imagens
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-50 shrink-0">
                      <Info className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Como funciona o acesso</h3>
                      <ol className="text-sm text-muted-foreground space-y-1 mt-1 list-decimal list-inside">
                        <li>Preencha o formulário de cadastro abaixo</li>
                        <li>Nossa equipe analisa sua solicitação</li>
                        <li>Você recebe um convite por e-mail</li>
                        <li>Acesse o Drive com sua conta Google</li>
                        <li>Baixe as imagens que precisar</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Formulário de Cadastro */}
        <section className="py-12 bg-muted/30">
          <div className="container max-w-2xl mx-auto px-4">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <UserPlus className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Solicitar Acesso</h2>
              <p className="text-muted-foreground">
                Ainda não tem acesso ao banco de imagens? Preencha o formulário abaixo
                e nossa equipe entrará em contato para liberar o seu acesso.
              </p>
            </div>

            {enviado ? (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-8 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    Solicitação enviada com sucesso!
                  </h3>
                  <p className="text-green-700">
                    Recebemos seu cadastro e nossa equipe irá analisar em breve.
                    Você receberá um e-mail com o convite de acesso assim que for aprovado.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Formulário de Cadastro</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nome">Nome Completo *</Label>
                        <Input
                          id="nome"
                          placeholder="Seu nome completo"
                          value={form.nome}
                          onChange={(e) => setForm({ ...form, nome: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="creci">CRECI *</Label>
                        <Input
                          id="creci"
                          placeholder="Ex: 12345-MT"
                          value={form.creci}
                          onChange={(e) => setForm({ ...form, creci: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail (Google) *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@gmail.com (usado para liberar acesso ao Drive)"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Use o e-mail da sua conta Google para receber o acesso ao Drive
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="telefone">WhatsApp *</Label>
                      <Input
                        id="telefone"
                        placeholder="(66) 99999-9999"
                        value={form.telefone}
                        onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="mensagem">Observações (opcional)</Label>
                      <textarea
                        id="mensagem"
                        placeholder="Imobiliária que trabalha, região de atuação, etc."
                        value={form.mensagem}
                        onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md text-sm min-h-[80px]"
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Enviando..." : "Enviar Solicitação de Acesso"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
