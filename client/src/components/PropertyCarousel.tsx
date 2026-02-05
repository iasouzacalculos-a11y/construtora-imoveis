import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "./PropertyCard";
import type { Property } from "@/lib/types";

interface PropertyCarouselProps {
  properties: Property[];
}

export default function PropertyCarousel({ properties }: PropertyCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
      }
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  if (properties.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Carregando imóveis...
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Carrossel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>

      {/* Botões de navegação */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-12 w-12 rounded-full bg-background/95 shadow-lg hover:bg-background border-2 hidden md:flex"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Anterior</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-12 w-12 rounded-full bg-background/95 shadow-lg hover:bg-background border-2 hidden md:flex"
        onClick={scrollNext}
        disabled={!canScrollNext}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Próximo</span>
      </Button>

      {/* Indicadores de página */}
      <div className="flex justify-center gap-2 mt-6">
        {properties.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Ir para imóvel ${index + 1}`}
          />
        ))}
      </div>

      {/* Botões de navegação mobile */}
      <div className="flex justify-center gap-4 mt-4 md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={scrollNext}
          disabled={!canScrollNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
