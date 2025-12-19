import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, MessageCircle } from "lucide-react";
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
            href="tel:+551199999999" 
            className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>(11) 9999-9999</span>
          </a>
          
          {/* Botão único azul - desktop */}
          <Button size="sm" className="hidden md:inline-flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Agendar Visita
          </Button>
          
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
                
                <div className="border-t pt-4 mt-4">
                  <a 
                    href="tel:+551199999999" 
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>(11) 9999-9999</span>
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
