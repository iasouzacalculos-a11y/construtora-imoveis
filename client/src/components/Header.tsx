import { Button } from "@/components/ui/button";
import { Building2, Menu, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity">
            <Building2 className="h-6 w-6" />
            <span>Souza Construtora</span>
          </a>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/">
            <a className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Início
            </a>
          </Link>
          <Link href="/imoveis">
            <a className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Imóveis
            </a>
          </Link>
          <Link href="/sobre">
            <a className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Sobre
            </a>
          </Link>
          <Link href="/contato">
            <a className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Contato
            </a>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>(11) 9999-9999</span>
          </Button>
          <Button size="sm" className="hidden md:inline-flex">
            Agendar Visita
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
