import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, MessageCircle, Calculator } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/imoveis", label: "Imóveis" },
    { href: "/sobre", label: "Sobre" },
    { href: "/contato", label: "Contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" asChild>
          <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo-souza.jpg" alt="Souza Construtora" className="h-14 w-auto" />
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} asChild>
              <a className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                {link.label}
              </a>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Telefone - cor cinza, menos destaque */}
          <a 
            href="tel:+5566999998693" 
            className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>(66) 99999-8693</span>
          </a>
          
          {/* Botão Simular Financiamento - desktop */}
          <a 
            href="https://financingsim-r2l7rmya.manus.space"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" variant="outline" className="hidden md:inline-flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Simular Financiamento
            </Button>
          </a>

          {/* Botão Agendar Visita - desktop */}
          <a 
            href="https://wa.me/5566999998693?text=Olá,%20vim%20pelo%20site%20da%20Souza%20Construtora%20e%20gostaria%20de%20agendar%20uma%20visita."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="hidden md:inline-flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Agendar Visita
            </Button>
          </a>
          
          {/* Menu hambúrguer - mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} asChild>
                    <a 
                      className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </Link>
                ))}
                
                <div className="border-t pt-4 mt-4 flex flex-col gap-2">
                  <a 
                    href="tel:+5566999998693" 
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>(66) 99999-8693</span>
                  </a>
                  <a 
                    href="https://financingsim-r2l7rmya.manus.space"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors py-2"
                    onClick={() => setOpen(false)}
                  >
                    <Calculator className="h-4 w-4" />
                    <span>Simular Financiamento</span>
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
