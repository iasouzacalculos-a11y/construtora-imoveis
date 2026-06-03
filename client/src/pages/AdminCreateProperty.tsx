import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { nanoid } from "nanoid";

export default function AdminCreateProperty() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    type: "Casa",
    price: "",
    address: "",
    city: "Rondonópolis",
    state: "MT",
    latitude: "-16.4652",
    longitude: "-54.6225",
    bedrooms: "",
    bathrooms: "",
    area: "",
    parking: "",
    description: "",
    status: "pronto_para_morar",
    deliveryDate: "",
    neighborhood: "",
  });

  const createMutation = trpc.properties.create.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validar campos obrigatórios
      if (!formData.id || !formData.title || !formData.type || !formData.price || 
          !formData.address || !formData.city || !formData.state || 
          !formData.latitude || !formData.longitude) {
        toast.error("Preencha todos os campos obrigatórios");
        setIsLoading(false);
        return;
      }

      await createMutation.mutateAsync({
        id: formData.id,
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
      });

      toast.success("Imóvel criado com sucesso!");
      setLocation("/admin");
    } catch (error) {
      console.error("Erro ao criar imóvel:", error);
      toast.error("Erro ao criar imóvel. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateId = () => {
    const newId = `prop-${nanoid(8)}`;
    setFormData(prev => ({ ...prev, id: newId }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/admin")}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold">Criar Novo Imóvel</h1>
            <p className="text-muted-foreground mt-2">
              Preencha os dados do imóvel. Campos com * são obrigatórios.
            </p>
          </div>

          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Dados do Imóvel</CardTitle>
              <CardDescription>
                Todos os campos opcionais podem ser deixados em branco
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ID */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    ID do Imóvel *
                  </label>
                  <div className="flex gap-2">
                    <Input
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      placeholder="ex: gv-qd17-lt10"
                      required
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={generateId}
                    >
                      Gerar
                    </Button>
                  </div>
                </div>

                {/* Título */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Título *
                  </label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="ex: Casa Granville"
                    required
                  />
                </div>

                {/* Tipo e Preço */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Tipo *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      required
                    >
                      <option>Casa</option>
                      <option>Apartamento</option>
                      <option>Terreno</option>
                      <option>Comercial</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Preço (R$) *
                    </label>
                    <Input
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="ex: 450000"
                      required
                    />
                  </div>
                </div>

                {/* Endereço */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Endereço *
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="ex: Quadra 17, Lote 10"
                    required
                  />
                </div>

                {/* Cidade, Estado */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Cidade *
                    </label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Estado *
                    </label>
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      maxLength={2}
                      required
                    />
                  </div>
                </div>

                {/* Latitude e Longitude */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Latitude *
                    </label>
                    <Input
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      placeholder="ex: -16.4652"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Longitude *
                    </label>
                    <Input
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      placeholder="ex: -54.6225"
                      required
                    />
                  </div>
                </div>

                {/* Quartos, Banheiros, Área, Garagem */}
                <div className="grid grid-cols-4 gap-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Quartos
                    </label>
                    <Input
                      name="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      placeholder="ex: 2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Banheiros
                    </label>
                    <Input
                      name="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      placeholder="ex: 2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Área (m²)
                    </label>
                    <Input
                      name="area"
                      type="number"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="ex: 78"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Garagem
                    </label>
                    <Input
                      name="parking"
                      type="number"
                      value={formData.parking}
                      onChange={handleChange}
                      placeholder="ex: 2"
                    />
                  </div>
                </div>

                {/* Descrição */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descrição detalhada do imóvel..."
                    className="w-full px-3 py-2 border rounded-md bg-background min-h-24"
                  />
                </div>

                {/* Bairro */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Bairro / Localidade
                  </label>
                  <Input
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    placeholder="ex: Granville, Sunflower, Parque Universitário..."
                  />
                </div>

                {/* Status e Data de Entrega */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="pronto_para_morar">Pronto para Morar</option>
                      <option value="em_construcao">Em Construção</option>
                      <option value="vendido">Vendido</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Data de Entrega
                    </label>
                    <Input
                      name="deliveryDate"
                      type="date"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Botões */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Criando...
                      </>
                    ) : (
                      "Criar Imóvel"
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
