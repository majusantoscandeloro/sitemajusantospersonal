import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
}

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder,
  onLoad 
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Fallback: se IntersectionObserver não estiver disponível, carrega imediatamente
    if (typeof IntersectionObserver === 'undefined') {
      setHasIntersected(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.01,
        rootMargin: '50px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (hasIntersected && !isLoaded && !hasError) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setIsLoaded(true);
        onLoad?.();
      };
      img.onerror = () => {
        setHasError(true);
      };
    }
  }, [hasIntersected, src, isLoaded, hasError, onLoad]);

  // Se ainda não intersectou, mostra placeholder
  if (!hasIntersected) {
    return (
      <div ref={containerRef} className={className}>
        <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
          {placeholder && (
            <img 
              src={placeholder} 
              alt="" 
              className="w-full h-full object-cover opacity-50"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      {!isLoaded && !hasError && (
        <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
          {placeholder && (
            <img 
              src={placeholder} 
              alt="" 
              className="w-full h-full object-cover opacity-50"
              aria-hidden="true"
            />
          )}
        </div>
      )}
      {hasError && (
        <div className="w-full h-full bg-muted flex items-center justify-center text-foreground/40">
          <span>Erro ao carregar imagem</span>
        </div>
      )}
      {isLoaded && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-opacity duration-300 opacity-100"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

export default LazyImage;
