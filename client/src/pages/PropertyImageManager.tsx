import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageUpload from "@/components/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PropertyImageManager() {
  const [, params] = useRoute("/imovel/:id/gerenciar-imagens");
  const propertyId = params?.id;
  const [refreshKey, setRefreshKey] = useState(0);

  // Buscar detalhes do imóvel
  const { data: property, isLoading: isLoadingProperty } = trpc.properties.getById.useQuery(
    propertyId || "",
    { enabled: !!propertyId }
  );

  const handleImageUploaded = () => {
    // Atualizar a lista de imagens
    setRefreshKey((prev) => prev + 1);
    toast.success("Imagem adicionada com sucesso!");
  };

  if (!propertyId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Imóvel não encontrado</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoadingProperty) {
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

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Imóvel não encontrado</h1>
            <p className="text-muted-foreground">O imóvel que você procura não existe.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-4xl font-bold mb-2">Gerenciar Imagens</h1>
            <p className="text-lg text-muted-foreground">{property.title}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Adicionar Novas Imagens</CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageUpload propertyId={propertyId} onImageUploaded={handleImageUploaded} />
                </CardContent>
              </Card>

              {/* Current Images */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Imagens Atuais ({property.images?.length || 0})</CardTitle>
                </CardHeader>
                <CardContent>
                  {property.images && property.images.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.images.map((image: any) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.imageUrl}
                            alt="Property"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Nenhuma imagem adicionada ainda. Comece enviando uma!
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Info Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Imóvel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Título</p>
                    <p className="font-medium">{property.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tipo</p>
                    <Badge>{property.type}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Preço</p>
                    <p className="font-medium text-primary">
                      R$ {property.price.toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Localização</p>
                    <p className="font-medium text-sm">
                      {property.address}, {property.city} - {property.state}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <Badge variant={property.status === "available" ? "default" : "secondary"}>
                      {property.status === "available" && "Disponível"}
                      {property.status === "sold" && "Vendido"}
                      {property.status === "reserved" && "Reservado"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
