import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProgramCard from './ProgramCard';
import AnimatedSection from './AnimatedSection';
import ProgramDetailsModal from './ProgramDetailsModal';
import { programDetails } from '@/data/programDetails';
import { cn } from '@/lib/utils';

interface Program {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  duration: string;
  category?: string;
}

interface ProgramCarouselProps {
  title: string;
  programs: Program[];
  /** Texto opcional abaixo do título da categoria. */
  description?: string;
  /** Oculta o H2 do carrossel (útil quando a seção já tem o título principal). */
  hideTitle?: boolean;
}

const ProgramCarousel = ({
  title,
  programs,
  description,
  hideTitle = false,
}: ProgramCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      checkScrollButtons();
      container.addEventListener('scroll', checkScrollButtons, { passive: true });
      window.addEventListener('resize', checkScrollButtons, { passive: true });
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [programs]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const isNarrow = typeof window !== 'undefined' && window.innerWidth < 768;
      const scrollAmount = isNarrow ? 296 : 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = (programId: string) => {
    if (programDetails[programId]) {
      setSelectedProgramId(programId);
      setIsModalOpen(true);
    }
  };

  const showArrows = canScrollLeft || canScrollRight;
  const centerFew = programs.length <= 3 && !canScrollLeft && !canScrollRight;

  if (programs.length === 0) return null;

  return (
    <AnimatedSection animation="fade-in" className="relative group/carousel py-4">
      {!hideTitle && (
        <div className="mb-6 px-4 md:px-0">
          <h2 className="font-display text-xl font-bold md:text-3xl">{title}</h2>
          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="relative">
        {showArrows && (
          <>
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="absolute left-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-25 md:flex"
              aria-label="Rolar carrossel para a esquerda"
              aria-disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="absolute right-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-25 md:flex"
              aria-label="Rolar carrossel para a direita"
              aria-disabled={!canScrollRight}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          className={cn(
            'carousel-container px-4 md:px-0',
            centerFew && 'justify-center md:justify-start md:pr-8',
            !centerFew && 'pr-10 md:pr-16',
          )}
          role="region"
          aria-label={`Carrossel de programas: ${title}`}
          tabIndex={0}
        >
          {programs.map((program) => (
            <div key={program.id} className="carousel-item">
              <ProgramCard {...program} onClick={() => handleCardClick(program.id)} />
            </div>
          ))}
        </div>
      </div>

      <ProgramDetailsModal
        program={selectedProgramId ? programDetails[selectedProgramId] || null : null}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </AnimatedSection>
  );
};

export default ProgramCarousel;
