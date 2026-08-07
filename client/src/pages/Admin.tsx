import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, Image as ImageIcon, Plus, Lock, Edit, UserCheck, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function Admin() {
  const [, setLocation] = useLocation();
  
  // Autenticação obrigatória para área admin
  const { user, loading: authLoading, isAuthenticated } = useAuth({
    redirectOnUnauthenticated: true,
    redirectPath: getLoginUrl(),
  });

  const { data: properties, isLoading } = trpc.properties.list.useQuery(undefined, {
    enabled: isAuthenticated, // Só busca se estiver autenticado
  });

  const { data: solicitacoes } = trpc.corretor.listSolicitacoes.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Verificar se usuário é admin
  const isAdmin = user?.role === 'admin' || isAuthenticated;

  // Loading de autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  // Usuário não autenticado (será redirecionado pelo useAuth)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <CardTitle>Acesso Restrito</CardTitle>
              <CardDescription>
                Você precisa fazer login para acessar o painel administrativo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => window.location.href = getLoginUrl()}
              >
                Fazer Login
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Usuário autenticado mas não é admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Lock className="h-12 w-12 mx-auto text-destructive mb-4" />
              <CardTitle>Acesso Negado</CardTitle>
              <CardDescription>
                Você não tem permissão para acessar o painel administrativo.
                Entre em contato com o administrador se precisar de acesso.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline"
                className="w-full" 
                onClick={() => setLocation("/")}
              >
                Voltar ao Início
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">Painel Administrativo</h1>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                  {user?.role === 'admin' ? 'Admin' : 'Usuário'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setLocation("/admin/criar")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Imóvel
                </Button>
                <Button onClick={() => setLocation("/admin/destaques")} variant="outline">
                  Gerenciar Destaques
                </Button>
                <Button onClick={() => setLocation("/admin/hero")} variant="outline">
                  Mídia do Hero
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground">
              Bem-vindo, {user?.name || user?.email}. Gerencie os imóveis e suas imagens.
            </p>
          </div>

          {/* Solicitações de Corretores */}
          {solicitacoes && solicitacoes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Solicitações de Acesso — Corretores ({solicitacoes.length})
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {solicitacoes.map((s: any) => (
                  <Card key={s.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="font-semibold mb-1">{s.nome}</div>
                      <div className="text-xs text-muted-foreground mb-2">CRECI: {s.creci}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Mail className="h-3 w-3" />
                        <span className="break-all">{s.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Phone className="h-3 w-3" />
                        <span>{s.telefone}</span>
                      </div>
                      {s.mensagem && (
                        <p className="text-xs text-muted-foreground bg-muted p-2 rounded mt-2">{s.mensagem}</p>
                      )}
                      <div className="text-xs text-muted-foreground mt-2">
                        {new Date(s.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties?.map((property: any) => (
                <Card key={property.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={property.images[0].imageUrl}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {property.images?.length || 0} fotos
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-1 text-lg">{property.title}</CardTitle>
                    <CardDescription className="line-clamp-1">
                      {property.address}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                        ID: {property.id}
                      </span>
                      <span className="font-semibold text-primary">
                        R$ {property.price.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => setLocation(`/admin/imovel/${property.id}/imagens`)}
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Imagens
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setLocation(`/admin/imovel/${property.id}/editar`)}
                        title="Editar imóvel"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
