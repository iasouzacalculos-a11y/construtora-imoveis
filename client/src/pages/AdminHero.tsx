import { useState, useRef } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft, Plus, Trash2, Image, Upload, Link, Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const POSITION_OPTIONS = [
  { value: "center top", label: "Topo" },
  { value: "center center", label: "Centro" },
  { value: "center bottom", label: "Base" },
  { value: "left center", label: "Esquerda" },
  { value: "right center", label: "Direita" },
  { value: "left top", label: "Topo Esq." },
  { value: "right top", label: "Topo Dir." },
  { value: "left bottom", label: "Base Esq." },
  { value: "right bottom", label: "Base Dir." },
];

export default function AdminHero() {
  const [, setLocation] = useLocation();
  const [isUploading, setIsUploading] = useState(false);

  const { user, loading: authLoading } = useAuth({
    redirectOnUnauthenticated: true,
    redirectPath: getLoginUrl(),
  });

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

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <CardTitle>Acesso Restrito</CardTitle>
              <CardDescription>Apenas administradores podem acessar esta página.</CardDescription>
            </CardHeader>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const [showUrlForm, setShowUrlForm] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [durationInput, setDurationInput] = useState("5");
  const [positionInput, setPositionInput] = useState("center center");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: mediaList, isLoading, refetch } = trpc.heroMedia.listAll.useQuery();
  const createMutation = trpc.heroMedia.create.useMutation();
  const uploadMutation = trpc.heroMedia.upload.useMutation();
  const updateMutation = trpc.heroMedia.update.useMutation();
  const deleteMutation = trpc.heroMedia.delete.useMutation();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast.error("Formato não suportado. Use imagem ou vídeo.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Arquivo muito grande. Máximo 10MB.");
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const nextOrder = mediaList ? mediaList.length : 0;
        await uploadMutation.mutateAsync({
          fileName: file.name,
          fileData: base64,
          contentType: file.type,
          duration: parseInt(durationInput) || 5,
          position: positionInput,
          order: nextOrder,
        });
        toast.success("Imagem adicionada ao hero!");
        refetch();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Erro ao fazer upload");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAddUrl = async () => {
    if (!urlInput.trim()) {
      toast.error("Insira uma URL válida");
      return;
    }

    try {
      const nextOrder = mediaList ? mediaList.length : 0;
      await createMutation.mutateAsync({
        mediaUrl: urlInput.trim(),
        mediaType: urlInput.match(/\.(mp4|webm|mov)/i) ? "video" : "image",
        duration: parseInt(durationInput) || 5,
        position: positionInput,
        order: nextOrder,
      });
      toast.success("Mídia adicionada ao hero!");
      setUrlInput("");
      setShowUrlForm(false);
      refetch();
    } catch (error) {
      toast.error("Erro ao adicionar mídia");
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      await updateMutation.mutateAsync({ id, active: !currentActive });
      refetch();
      toast.success(currentActive ? "Mídia desativada" : "Mídia ativada");
    } catch (error) {
      toast.error("Erro ao atualizar");
    }
  };

  const handleUpdateDuration = async (id: string, duration: number) => {
    try {
      await updateMutation.mutateAsync({ id, duration });
      refetch();
    } catch (error) {
      toast.error("Erro ao atualizar duração");
    }
  };

  const handleUpdatePosition = async (id: string, position: string) => {
    try {
      await updateMutation.mutateAsync({ id, position });
      refetch();
      toast.success("Posição atualizada");
    } catch (error) {
      toast.error("Erro ao atualizar posição");
    }
  };

  const handleMoveUp = async (index: number) => {
    if (!mediaList || index === 0) return;
    const currentItem = mediaList[index];
    const prevItem = mediaList[index - 1];
    try {
      await updateMutation.mutateAsync({ id: currentItem.id, order: prevItem.order });
      await updateMutation.mutateAsync({ id: prevItem.id, order: currentItem.order });
      refetch();
    } catch (error) {
      toast.error("Erro ao reordenar");
    }
  };

  const handleMoveDown = async (index: number) => {
    if (!mediaList || index === mediaList.length - 1) return;
    const currentItem = mediaList[index];
    const nextItem = mediaList[index + 1];
    try {
      await updateMutation.mutateAsync({ id: currentItem.id, order: nextItem.order });
      await updateMutation.mutateAsync({ id: nextItem.id, order: currentItem.order });
      refetch();
    } catch (error) {
      toast.error("Erro ao reordenar");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover esta mídia?")) return;
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Mídia removida");
      refetch();
    } catch (error) {
      toast.error("Erro ao remover");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-3xl">
          <Button
            variant="ghost"
            onClick={() => setLocation("/admin")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Admin
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Gerenciar Mídia do Hero
              </CardTitle>
              <CardDescription>
                Adicione imagens que passarão automaticamente no fundo da página inicial. Configure o tempo de exibição e posicionamento de cada uma.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Botões de adicionar */}
              <div className="flex flex-wrap gap-3">
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="gap-2"
                  >
                    {isUploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                    Upload de Imagem
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setShowUrlForm(!showUrlForm)}
                  className="gap-2"
                >
                  <Link className="h-4 w-4" />
                  Adicionar por URL
                </Button>
              </div>

              {/* Formulário de URL */}
              {showUrlForm && (
                <div className="p-4 border rounded-lg space-y-3 bg-muted/30">
                  <div>
                    <label className="text-sm font-medium">URL da Imagem</label>
                    <Input
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium">Tempo de exibição (segundos)</label>
                      <Input
                        type="number"
                        value={durationInput}
                        onChange={(e) => setDurationInput(e.target.value)}
                        min={1}
                        max={60}
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Posicionamento</label>
                      <select
                        value={positionInput}
                        onChange={(e) => setPositionInput(e.target.value)}
                        className="w-full h-9 px-3 border rounded-md text-sm bg-background"
                      >
                        {POSITION_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddUrl} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Adicionar
                    </Button>
                    <Button variant="ghost" onClick={() => setShowUrlForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}

              {/* Configuração padrão para upload */}
              <div className="flex flex-wrap items-center gap-3">
                <label className="text-sm font-medium text-muted-foreground">Padrão para upload:</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={durationInput}
                    onChange={(e) => setDurationInput(e.target.value)}
                    min={1}
                    max={60}
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">seg.</span>
                </div>
                <select
                  value={positionInput}
                  onChange={(e) => setPositionInput(e.target.value)}
                  className="h-9 px-3 border rounded-md text-sm bg-background"
                >
                  {POSITION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lista de mídias */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground">
                  Mídias do Hero ({mediaList?.length || 0})
                </h3>

                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : mediaList && mediaList.length > 0 ? (
                  <div className="space-y-2">
                    {mediaList.map((media, index) => (
                      <div
                        key={media.id}
                        className={`p-3 border rounded-lg ${
                          media.active ? "bg-white" : "bg-muted/50 opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Grip para reordenar */}
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleMoveUp(index)}
                              disabled={index === 0}
                              className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                            >
                              ▲
                            </button>
                            <button
                              onClick={() => handleMoveDown(index)}
                              disabled={index === mediaList.length - 1}
                              className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                            >
                              ▼
                            </button>
                          </div>

                          {/* Thumbnail */}
                          <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0 bg-muted">
                            {media.mediaType === "image" ? (
                              <img
                                src={media.mediaUrl}
                                alt="Hero"
                                className="w-full h-full object-cover"
                                style={{ objectPosition: media.position || "center center" }}
                              />
                            ) : (
                              <video
                                src={media.mediaUrl}
                                className="w-full h-full object-cover"
                                muted
                              />
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground truncate">
                              {media.mediaUrl.split("/").pop()}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                {media.mediaType === "image" ? "Imagem" : "Vídeo"}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Ordem: {index + 1}
                              </span>
                            </div>
                          </div>

                          {/* Ações */}
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleActive(media.id, media.active)}
                              title={media.active ? "Desativar" : "Ativar"}
                            >
                              {media.active ? (
                                <Eye className="h-4 w-4 text-green-600" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(media.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Controles de duração e posição */}
                        <div className="flex flex-wrap items-center gap-3 mt-2 pl-8">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">Tempo:</span>
                            <Input
                              type="number"
                              value={media.duration}
                              onChange={(e) => handleUpdateDuration(media.id, parseInt(e.target.value) || 5)}
                              min={1}
                              max={60}
                              className="w-16 h-7 text-xs"
                            />
                            <span className="text-xs text-muted-foreground">s</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">Posição:</span>
                            <select
                              value={media.position || "center center"}
                              onChange={(e) => handleUpdatePosition(media.id, e.target.value)}
                              className="h-7 px-2 border rounded text-xs bg-background"
                            >
                              {POSITION_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Image className="h-12 w-12 mx-auto mb-3 opacity-40" />
                    <p>Nenhuma mídia adicionada ainda.</p>
                    <p className="text-sm">Faça upload ou adicione uma URL para começar.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
