import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { trpc } from "@/lib/trpc";
import { Home, Clock, AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function AdminFeatured() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();

  // Buscar todos os imóveis
  const { data: properties, isLoading } = trpc.properties.list.useQuery();

  // Mutation para atualizar featured
  const toggleFeatured = trpc.properties.toggleFeatured.useMutation({
    onSuccess: () => {
      utils.properties.list.invalidate();
    },
  });

  // Redirect se não for admin
  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      setLocation("/");
    }
  }, [loading, isAuthenticated, user, setLocation]);

  if (loading || !isAuthenticated || user?.role !== "admin") {
    return null;
  }

  // Separar por status
  const prontosParaMorar = properties?.filter((p: any) => p.status === "pronto_para_morar") || [];
  const emConstrucao = properties?.filter((p: any) => p.status === "em_construcao") || [];

  // Contar quantos estão em destaque
  const featuredProntos = prontosParaMorar.filter((p: any) => p.featured).length;
  const featuredConstrucao = emConstrucao.filter((p: any) => p.featured).length;

  const handleToggle = (propertyId: string, currentFeatured: boolean, status: string) => {
    const isFull = status === "pronto_para_morar" 
      ? featuredProntos >= 3 && !currentFeatured
      : featuredConstrucao >= 3 && !currentFeatured;

    if (isFull) {
      alert("Você já tem 3 imóveis em destaque nesta categoria. Remova um antes de adicionar outro.");
      return;
    }

    toggleFeatured.mutate({ propertyId, featured: !currentFeatured });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gerenciar Imóveis em Destaque</h1>
          <p className="text-muted-foreground">
            Selecione até 3 imóveis por categoria para aparecer na página inicial
          </p>
        </div>

        {/* Prontos para Morar */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600">
                <Home className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Prontos para Morar</CardTitle>
                <CardDescription>
                  {featuredProntos}/3 imóveis em destaque
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center py-4">Carregando...</p>
            ) : prontosParaMorar.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">
                Nenhum imóvel pronto para morar cadastrado
              </p>
            ) : (
              <div className="space-y-3">
                {prontosParaMorar.map((property: any) => (
                  <div
                    key={property.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{property.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {property.address} - R$ {property.price.toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {property.featured && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          Em destaque
                        </span>
                      )}
                      <Switch
                        checked={property.featured}
                        onCheckedChange={() => handleToggle(property.id, property.featured, property.status)}
                        disabled={toggleFeatured.isPending}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Em Construção */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Em Construção</CardTitle>
                <CardDescription>
                  {featuredConstrucao}/3 imóveis em destaque
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center py-4">Carregando...</p>
            ) : emConstrucao.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-muted-foreground mb-4">
                  Nenhum imóvel em construção cadastrado
                </p>
                <p className="text-sm text-muted-foreground">
                  Edite um imóvel existente e altere o status para "Em Construção"
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {emConstrucao.map((property: any) => (
                  <div
                    key={property.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{property.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {property.address} - R$ {property.price.toLocaleString("pt-BR")}
                        {property.deliveryDate && ` • Entrega: ${new Date(property.deliveryDate).toLocaleDateString("pt-BR")}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {property.featured && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          Em destaque
                        </span>
                      )}
                      <Switch
                        checked={property.featured}
                        onCheckedChange={() => handleToggle(property.id, property.featured, property.status)}
                        disabled={toggleFeatured.isPending}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => setLocation("/admin/imoveis")}>
            Voltar para Admin
          </Button>
        </div>
      </div>
    </div>
  );
}
