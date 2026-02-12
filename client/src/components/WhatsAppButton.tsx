import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    // TODO: Substituir pelo número real da imobiliária
    const phoneNumber = "5566999998693"; // Formato: código do país + DDD + número
    const message = encodeURIComponent("Olá, vim pelo site da Souza Construtora e gostaria de mais informações sobre os imóveis disponíveis.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </button>
  );
}
