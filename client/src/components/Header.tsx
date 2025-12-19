import { Button } from "@/components/ui/button";
import { Menu, Phone, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" asChild>
          <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo-souza.jpg" alt="Souza Construtora" className="h-14 w-auto" />
          </a>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" asChild>
            <a className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Início
            </a>
          </Link>
          <Link href="/imoveis" asChild>
            <a className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Imóveis
            </a>
          </Link>
          <Link href="/sobre" asChild>
            <a className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Sobre
            </a>
          </Link>
          <Link href="/contato" asChild>
            <a className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Contato
            </a>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* Telefone - cor cinza, menos destaque */}
          <a 
            href="tel:+551199999999" 
            className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>(11) 9999-9999</span>
          </a>
          
          {/* Botão único azul - com ícone WhatsApp */}
          <Button size="sm" className="hidden md:inline-flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Agendar Visita
          </Button>
          
          {/* Menu mobile */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
