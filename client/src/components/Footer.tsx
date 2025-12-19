import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="mb-4">
              <img src="/logo-souza.jpg" alt="Souza Construtora" className="h-12 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm text-background/80 leading-relaxed">
              Construindo sonhos e realizando o seu imóvel ideal há mais de 20 anos. Qualidade e confiança Souza.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="font-semibold text-background mb-4">Navegação</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" asChild>
                  <a className="text-sm text-background/70 hover:text-background transition-colors">
                    Início
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/imoveis" asChild>
                  <a className="text-sm text-background/70 hover:text-background transition-colors">
                    Imóveis
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/sobre" asChild>
                  <a className="text-sm text-background/70 hover:text-background transition-colors">
                    Sobre Nós
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contato" asChild>
                  <a className="text-sm text-background/70 hover:text-background transition-colors">
                    Contato
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-background mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Av. Mal. Rondon, 2019 - Centro, Rondonópolis - MT, 78700-531</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>(11) 9999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>contato@construtora.com.br</span>
              </li>
            </ul>
          </div>

          {/* Faça uma Visita */}
          <div>
            <h3 className="font-semibold text-background mb-4">Faça uma visita</h3>
            <p className="text-sm text-background/70 leading-relaxed">
              Agende uma visita e descubra de perto tudo o que preparamos para transformar o seu dia a dia.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <p className="text-center text-sm text-background/60">
            &copy; {new Date().getFullYear()} Souza Construtora. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
