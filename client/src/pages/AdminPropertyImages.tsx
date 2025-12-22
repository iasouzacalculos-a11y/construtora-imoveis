import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, Upload, ArrowLeft, X } from "lucide-react";
import { toast } from "sonner";

export default function AdminPropertyImages() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [addingUrl, setAddingUrl] = useState(false);

  const propertyId = params.id as string;

  // TODO: Adicionar autenticação no futuro
  // Por enquanto, acesso livre para o proprietário gerenciar

  const { data: property, isLoading, refetch } = trpc.properties.getById.useQuery(propertyId);
  const uploadMutation = trpc.properties.uploadImage.useMutation();
  const addUrlMutation = trpc.properties.addImageByUrl.useMutation();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Selecione pelo menos uma imagem");
      return;
    }

    setUploading(true);

    try {
      for (const file of selectedFiles) {
        await uploadMutation.mutateAsync({
          propertyId,
          file,
        });
      }

      toast.success(`${selectedFiles.length} imagem(ns) enviada(s) com sucesso!`);
      setSelectedFiles([]);
      refetch();
    } catch (error) {
      toast.error("Erro ao enviar imagens");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleAddByUrl = async () => {
    if (!imageUrl.trim()) {
      toast.error("Digite uma URL válida");
      return;
    }

    setAddingUrl(true);

    try {
      await addUrlMutation.mutateAsync({
        propertyId,
        imageUrl: imageUrl.trim(),
      });

      toast.success("Imagem adicionada com sucesso!");
      setImageUrl("");
      refetch();
    } catch (error) {
      toast.error("Erro ao adicionar imagem. Verifique se a URL é válida.");
      console.error(error);
    } finally {
      setAddingUrl(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
            <Button onClick={() => setLocation("/admin")}>
              Voltar ao painel
            </Button>
          </div>
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
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => setLocation("/admin")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao painel
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Gerenciar Imagens</h1>
            <p className="text-muted-foreground">
              {property.title} - {property.address}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Upload de imagens */}
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Imagens</CardTitle>
                <CardDescription>
                  Selecione uma ou mais imagens para fazer upload
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Adicionar por URL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Adicionar por URL</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://exemplo.com/imagem.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddByUrl();
                        }
                      }}
                    />
                    <Button
                      onClick={handleAddByUrl}
                      disabled={addingUrl || !imageUrl.trim()}
                    >
                      {addingUrl ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Adicionando...
                        </>
                      ) : (
                        "Adicionar"
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cole a URL de uma imagem da internet
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Ou
                    </span>
                  </div>
                </div>

                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Clique para selecionar imagens
                    </span>
                  </label>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      {selectedFiles.length} arquivo(s) selecionado(s)
                    </p>
                    <div className="space-y-1">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm p-2 bg-muted rounded"
                        >
                          <span className="truncate">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedFiles(files =>
                                files.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={handleUpload}
                  disabled={selectedFiles.length === 0 || uploading}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Fazer Upload
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Imagens existentes */}
            <Card>
              <CardHeader>
                <CardTitle>Imagens Atuais</CardTitle>
                <CardDescription>
                  {property.images?.length || 0} imagem(ns) cadastrada(s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {property.images && property.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {property.images.map((image: any, index: number) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.imageUrl}
                          alt={`${property.title} - ${index + 1}`}
                          className="w-full aspect-video object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Nenhuma imagem cadastrada ainda
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
