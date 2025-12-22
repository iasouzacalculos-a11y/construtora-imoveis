import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, Image as ImageIcon, Plus } from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const [, setLocation] = useLocation();
  // TODO: Adicionar autenticação no futuro
  // Por enquanto, acesso livre para o proprietário gerenciar

  const { data: properties, isLoading } = trpc.properties.list.useQuery();



  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-muted-foreground">
              Gerencie os imóveis e suas imagens
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties?.map((property: any) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{property.title}</CardTitle>
                    <CardDescription className="line-clamp-1">
                      {property.address}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{property.images?.length || 0} imagens</span>
                      <span className="font-semibold text-primary">
                        R$ {property.price.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    
                    <Button
                      className="w-full"
                      onClick={() => setLocation(`/admin/imovel/${property.id}/imagens`)}
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Gerenciar Imagens
                    </Button>
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
