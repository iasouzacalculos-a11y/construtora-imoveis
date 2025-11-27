import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container text-center">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">Página não encontrada</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
          <Link href="/">
            <Button size="lg">
              <Home className="h-5 w-5 mr-2" />
              Voltar para Início
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
