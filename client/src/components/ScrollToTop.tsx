import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Rola para o topo da página sempre que a rota mudar
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Usa "instant" para scroll imediato, ou "smooth" para suave
    });
  }, [location]);

  return null; // Componente não renderiza nada
}
