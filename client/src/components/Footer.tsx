import { Facebook, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Divisória sutil */}
      <div className="h-px bg-background/10" />
      
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="mb-6">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663230153293/vJuIIAkUEQFdyJNv.png" alt="Souza Construtora" className="h-16 w-auto" />
            </div>
            <p className="text-sm text-background/75 leading-relaxed">
              Construindo sonhos há mais de 20 anos. Qualidade, confiança e segurança em cada imóvel.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="font-semibold text-background mb-5 text-sm uppercase tracking-wide">Navegação</h3>
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
            <h3 className="font-semibold text-background mb-5 text-sm uppercase tracking-wide">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Av. Mal. Rondon, 2019<br />Centro, Rondonópolis - MT<br />78700-531</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:contato@construtora.com.br" className="hover:text-background transition-colors">contato@construtora.com.br</a>
              </li>
            </ul>
          </div>

          {/* Faça uma Visita - CTA */}
          <div>
            <h3 className="font-semibold text-background mb-5 text-sm uppercase tracking-wide">Faça uma visita</h3>
            <p className="text-sm text-background/70 leading-relaxed mb-5">
              Agende uma visita e descubra de perto os imóveis que preparamos para transformar seu dia a dia.
            </p>
            <Link href="/imoveis" asChild>
              <a className="inline-block text-sm font-semibold text-background hover:text-background/80 transition-colors">
                Explorar imóveis →
              </a>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 mt-16 pt-8">
          <p className="text-center text-xs text-background/50">
            &copy; {new Date().getFullYear()} Souza Construtora. Todos os direitos reservados. | CRECI.J - 10.249 / MT 19º Região
          </p>
        </div>
      </div>
    </footer>
  );
}
