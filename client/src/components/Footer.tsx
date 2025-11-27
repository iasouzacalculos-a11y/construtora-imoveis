import { Building2, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Souza Construtora</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Construindo sonhos e realizando o seu imóvel ideal há mais de 20 anos. Qualidade e confiança Souza.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Início
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/imoveis">
                  <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Imóveis
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/sobre">
                  <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Sobre Nós
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contato">
                  <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contato
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Tipos de Imóveis</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Apartamentos</li>
              <li className="text-sm text-muted-foreground">Casas</li>
              <li className="text-sm text-muted-foreground">Coberturas</li>
              <li className="text-sm text-muted-foreground">Terrenos</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Av. Paulista, 1000 - São Paulo, SP</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>(11) 9999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>contato@construtora.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Souza Construtora. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
