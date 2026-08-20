import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft, Trash2, Lock } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function AdminEditProperty() {
  const params = useParams();
  const propertyId = params?.id as string;
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProperty, setIsLoadingProperty] = useState(true);

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

  const [formData, setFormData] = useState({
    title: "",
    type: "Casa",
    price: "",
    address: "",
    city: "Rondonópolis",
    state: "MT",
    latitude: "",
    longitude: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    parking: "",
    description: "",
    status: "pronto_para_morar",
    deliveryDate: "",
    neighborhood: "",
    whatsappMessage: "",
  });

  const [images, setImages] = useState<Array<{ id: string; imageUrl: string }>>([]);

  // Buscar imóvel existente
  const { data: property } = trpc.properties.getById.useQuery(propertyId);

  useEffect(() => {
    if (property) {
      const deliveryDateStr = property.deliveryDate
        ? property.deliveryDate instanceof Date
          ? property.deliveryDate.toISOString().split('T')[0]
          : String(property.deliveryDate).split('T')[0]
        : "";
      setFormData({
        title: property.title,
        type: property.type,
        price: property.price.toString(),
        address: property.address,
        city: property.city,
        state: property.state,
        latitude: property.latitude.toString(),
        longitude: property.longitude.toString(),
        bedrooms: property.bedrooms?.toString() || "",
        bathrooms: property.bathrooms?.toString() || "",
        area: property.area?.toString() || "",
        parking: property.parking?.toString() || "",
        description: property.description || "",
        status: property.status || "pronto_para_morar",
        deliveryDate: deliveryDateStr,
        neighborhood: property.neighborhood || "",
        whatsappMessage: property.whatsappMessage || "",
      });
      setImages(property.images || []);
      setIsLoadingProperty(false);
    } else if (property === null) {
      toast.error("Imóvel não encontrado");
      setIsLoadingProperty(false);
      setLocation("/admin");
    }
  }, [property, setLocation]);

  const updateMutation = trpc.properties.update.useMutation();
  const deleteImageMutation = trpc.properties.deleteImage.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.title || !formData.type || !formData.price || !formData.address || !formData.city || !formData.state || !formData.latitude || !formData.longitude) {
        toast.error("Preencha todos os campos obrigatórios");
        setIsLoading(false);
        return;
      }

      await updateMutation.mutateAsync({
        id: propertyId,
        title: formData.title,
        type: formData.type,
        price: parseInt(formData.price),
        address: formData.address,
        city: formData.city,
        state: formData.state,
        latitude: formData.latitude,
        longitude: formData.longitude,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
        area: formData.area ? parseInt(formData.area) : undefined,
        parking: formData.parking ? parseInt(formData.parking) : undefined,
        description: formData.description || undefined,
        status: (formData.status as "pronto_para_morar" | "em_construcao" | "vendido") || undefined,
        deliveryDate: formData.deliveryDate || undefined,
        neighborhood: formData.neighborhood || undefined,
        whatsappMessage: formData.whatsappMessage || undefined,
      });

      toast.success("Imóvel atualizado com sucesso!");
      setLocation("/admin");
    } catch (error) {
      console.error("Erro ao atualizar imóvel:", error);
      toast.error("Erro ao atualizar imóvel");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      await deleteImageMutation.mutateAsync({ imageId });
      setImages((prev) => prev.filter((img) => img.id !== imageId));
      toast.success("Imagem removida");
    } catch (error) {
      toast.error("Erro ao remover imagem");
    }
  };

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => setLocation("/admin")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>Editar Imóvel</CardTitle>
              <CardDescription>ID: {propertyId}</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campos Obrigatórios */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground">Campos Obrigatórios *</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Título *</label>
                      <Input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Ex: Casa Granville"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Tipo *</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                      >
                        <option value="Casa">Casa</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Terreno">Terreno</option>
                        <option value="Comercial">Comercial</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Preço (R$) *</label>
                      <Input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Ex: 350000"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Bairro</label>
                      <Input
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleChange}
                        placeholder="Ex: Granville"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-medium">Endereço *</label>
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Ex: Quadra 17, Lote 10"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Cidade *</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Ex: Rondonópolis"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Estado *</label>
                      <Input
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Ex: MT"
                        maxLength={2}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Latitude *</label>
                      <Input
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        placeholder="Ex: -16.4652"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Longitude *</label>
                      <Input
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        placeholder="Ex: -54.6225"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Campos Opcionais */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground">Campos Opcionais</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Quartos</label>
                      <Input
                        name="bedrooms"
                        type="number"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        placeholder="Ex: 2"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Banheiros</label>
                      <Input
                        name="bathrooms"
                        type="number"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        placeholder="Ex: 2"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Área (m²)</label>
                      <Input
                        name="area"
                        type="number"
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="Ex: 82"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Garagem</label>
                      <Input
                        name="parking"
                        type="number"
                        value={formData.parking}
                        onChange={handleChange}
                        placeholder="Ex: 2"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-medium">Descrição</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Descrição detalhada do imóvel..."
                        className="w-full px-3 py-2 border rounded-md"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="pronto_para_morar">Pronto para Morar</option>
                        <option value="em_construcao">Em Construção</option>
                        <option value="vendido">Vendido</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Data de Entrega</label>
                      <Input
                        name="deliveryDate"
                        type="date"
                        value={formData.deliveryDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Mensagem WhatsApp */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-green-600">📱</span> Mensagem WhatsApp
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-xs text-green-700 mb-3">
                      <strong>Mensagem automática gerada:</strong><br />
                      "Olá! Vim pelo site da Souza Construtora e estou interessado no imóvel <em>{formData.title || 'Nome do imóvel'}</em> ({propertyId}). Poderia me passar mais informações?"
                    </p>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Mensagem personalizada (opcional)</label>
                      <p className="text-xs text-muted-foreground mb-2">Se preenchido, substitui a mensagem automática acima.</p>
                      <textarea
                        name="whatsappMessage"
                        value={formData.whatsappMessage}
                        onChange={handleChange}
                        placeholder="Ex: Olá! Tenho interesse na Casa Granville com 2 quartos. Poderia me informar sobre as condições de pagamento?"
                        className="w-full px-3 py-2 border rounded-md text-sm"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Imagens */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground">Imagens ({images.length})</h3>
                  {images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {images.map((img) => (
                        <div key={img.id} className="relative group">
                          <img
                            src={img.imageUrl}
                            alt="Imóvel"
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteImage(img.id)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity gap-1"
                          >
                            <Trash2 className="h-3 w-3" />
                            Remover
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhuma imagem cadastrada</p>
                  )}
                </div>

                {/* Botões */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      "Salvar Alterações"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setLocation("/admin")}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
