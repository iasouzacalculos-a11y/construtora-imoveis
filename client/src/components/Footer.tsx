import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";
import { useRef } from "react";
import { MapView } from "./Map";

export default function Footer() {
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    
    // Adicionar marcador na localização da imobiliária
    if (window.google) {
      new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: -16.4652161, lng: -54.6225263 },
        title: "Souza Construtora - Av. Mal. Rondon, 2019",
      });
    }
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Logo e Descrição */}
          <div>
            <div className="mb-4">
              <img src="/logo-souza.jpg" alt="Souza Construtora" className="h-16 w-auto mb-3" />
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

          {/* Navegação e Contato - Lado Esquerdo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-4">Navegação</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" asChild>
                    <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Início
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/imoveis" asChild>
                    <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Imóveis
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/sobre" asChild>
                    <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Sobre Nós
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/contato" asChild>
                    <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Contato
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Av. Mal. Rondon, 2019 - Centro, Rondonópolis - MT, 78700-531</span>
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

          {/* Mapa - Lado Direito */}
          <div className="rounded-lg overflow-hidden border border-border">
            <MapView
              initialCenter={{ lat: -16.4652161, lng: -54.6225263 }}
              initialZoom={17}
              onMapReady={handleMapReady}
              className="w-40 h-40"
            />
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Souza Construtora. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
