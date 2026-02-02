import { useState } from "react";
import { useLocation, useParams } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Loader2, Upload, ArrowLeft, X, Lock, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function AdminPropertyImages() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [addingUrl, setAddingUrl] = useState(false);

  const propertyId = params.id as string;

  // Autenticação obrigatória
  const { user, loading: authLoading, isAuthenticated } = useAuth({
    redirectOnUnauthenticated: true,
    redirectPath: getLoginUrl(),
  });

  const { data: property, isLoading, refetch } = trpc.properties.getById.useQuery(propertyId, {
    enabled: isAuthenticated && !!propertyId,
  });
  
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
        const blob = new Blob([await file.arrayBuffer()], { type: file.type });
        const fileData = new File([blob], file.name, { type: file.type });
        
        await uploadMutation.mutateAsync({
          propertyId,
          file: fileData,
        });
      }

      toast.success(`${selectedFiles.length} imagem(ns) enviada(s) com sucesso!`);
      setSelectedFiles([]);
      refetch();
    } catch (error: any) {
      if (error?.data?.code === 'UNAUTHORIZED') {
        toast.error("Você não tem permissão para fazer upload de imagens");
      } else {
        toast.error("Erro ao enviar imagens");
      }
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

    // Validar URL
    try {
      new URL(imageUrl);
    } catch {
      toast.error("URL inválida. Digite uma URL completa (ex: https://...)");
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
    } catch (error: any) {
      if (error?.data?.code === 'UNAUTHORIZED') {
        toast.error("Você não tem permissão para adicionar imagens");
      } else {
        toast.error("Erro ao adicionar imagem. Verifique se a URL é válida.");
      }
      console.error(error);
    } finally {
      setAddingUrl(false);
    }
  };

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

  // Usuário não autenticado
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
                Você precisa fazer login para gerenciar imagens.
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
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              ID: {property.id}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Upload de imagens */}
            <Card>
              <CardHeader>
                <CardTitle>Adicionar Imagens</CardTitle>
                <CardDescription>
                  Adicione imagens por URL ou faça upload de arquivos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Adicionar por URL */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Adicionar por URL</label>
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      placeholder="https://exemplo.com/imagem.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
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
                    Cole a URL de uma imagem (Imgur, Google Drive, etc.)
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Ou
                    </span>
                  </div>
                </div>

                {/* Upload de arquivo */}
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
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
                    <span className="text-xs text-muted-foreground mt-1">
                      JPG, PNG, WebP até 10MB
                    </span>
                  </label>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      {selectedFiles.length} arquivo(s) selecionado(s)
                    </p>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm p-2 bg-muted rounded"
                        >
                          <span className="truncate flex-1">{file.name}</span>
                          <span className="text-xs text-muted-foreground mx-2">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
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
                      <div key={image.id || index} className="relative group">
                        <img
                          src={image.imageUrl}
                          alt={`${property.title} - ${index + 1}`}
                          className="w-full aspect-video object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            #{index + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Nenhuma imagem cadastrada ainda
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Adicione imagens usando o formulário ao lado
                    </p>
                  </div>
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
