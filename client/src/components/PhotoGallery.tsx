import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Home } from "lucide-react";

interface PhotoGalleryProps {
  images: string[];
  title: string;
}

// Componente de imagem com skeleton e lazy loading
function LazyImage({
  src,
  alt,
  className,
  onClick,
}: {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full bg-muted">
      {/* Skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-muted flex items-center justify-center">
          <Home className="h-8 w-8 text-muted-foreground/30" />
        </div>
      )}
      {/* Fallback */}
      {error && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <Home className="h-8 w-8 text-muted-foreground/40" />
        </div>
      )}
      {/* Imagem */}
      {!error && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true); }}
          onClick={onClick}
        />
      )}
    </div>
  );
}

export default function PhotoGallery({ images, title }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mainLoaded, setMainLoaded] = useState(false);
  const [mainError, setMainError] = useState(false);

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setMainLoaded(false);
    setMainError(false);
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setMainLoaded(false);
    setMainError(false);
  };

  const handleThumbnailClick = (index: number) => {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
      setMainLoaded(false);
      setMainError(false);
    }
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-3">
        {/* Large Image Display */}
        <div className="relative bg-muted rounded-lg overflow-hidden aspect-video">
          {/* Skeleton da imagem principal */}
          {!mainLoaded && !mainError && (
            <div className="absolute inset-0 animate-pulse bg-muted flex items-center justify-center">
              <Home className="h-16 w-16 text-muted-foreground/30" />
            </div>
          )}
          {mainError && (
            <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center gap-2">
              <Home className="h-16 w-16 text-muted-foreground/40" />
              <span className="text-sm text-muted-foreground">Imagem indisponível</span>
            </div>
          )}
          {!mainError && (
            <img
              key={images[selectedIndex]}
              src={images[selectedIndex]}
              alt={`${title} - Imagem ${selectedIndex + 1}`}
              loading="eager"
              decoding="async"
              className={`w-full h-full object-cover cursor-pointer hover:opacity-95 transition-all duration-300 ${mainLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setMainLoaded(true)}
              onError={() => { setMainError(true); setMainLoaded(true); }}
              onClick={() => setIsFullscreen(true)}
            />
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm z-10">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Gallery com lazy loading */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === selectedIndex
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <LazyImage
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 hover:bg-white/10 transition-colors p-2 rounded-lg z-[60]"
            aria-label="Fechar galeria"
            type="button"
          >
            <X className="h-8 w-8" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={images[selectedIndex]}
              alt={`${title} - Imagem ${selectedIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 text-white hover:text-gray-300 hover:bg-white/10 transition-colors p-2 rounded-lg z-[60]"
                  aria-label="Imagem anterior"
                  type="button"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 text-white hover:text-gray-300 hover:bg-white/10 transition-colors p-2 rounded-lg z-[60]"
                  aria-label="Próxima imagem"
                  type="button"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/70 px-3 py-1 rounded-full z-[60]">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
