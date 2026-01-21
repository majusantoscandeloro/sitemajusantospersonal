import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProgramCard from './ProgramCard';
import AnimatedSection from './AnimatedSection';
import ProgramDetailsModal from './ProgramDetailsModal';
import { programDetails } from '@/data/programDetails';

interface Program {
  id: string;
  title: string;
  image: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  duration: string;
  category?: string;
}

interface ProgramCarouselProps {
  title: string;
  programs: Program[];
}

const ProgramCarousel = ({ title, programs }: ProgramCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
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
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = (programId: string) => {
    // Só abre o modal se houver detalhes para este programa
    if (programDetails[programId]) {
      setSelectedProgramId(programId);
      setIsModalOpen(true);
    }
  };

  return (
    <AnimatedSection animation="fade-in" className="relative group/carousel py-4">
      {/* Title */}
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 px-4 md:px-0">
        {title}
      </h2>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:text-primary hover:bg-background transition-all opacity-0 group-hover/carousel:opacity-100 -translate-x-4 group-hover/carousel:translate-x-0 hidden md:flex disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`}
          aria-label="Rolar carrossel para a esquerda"
          aria-disabled={!canScrollLeft}
        >
          <ChevronLeft className="w-6 h-6" aria-hidden="true" />
        </button>

        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:text-primary hover:bg-background transition-all opacity-0 group-hover/carousel:opacity-100 translate-x-4 group-hover/carousel:translate-x-0 hidden md:flex disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`}
          aria-label="Rolar carrossel para a direita"
          aria-disabled={!canScrollRight}
        >
          <ChevronRight className="w-6 h-6" aria-hidden="true" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="carousel-container px-4 md:px-0"
          role="region"
          aria-label={`Carrossel de programas: ${title}`}
          tabIndex={0}
        >
          {programs.map((program) => (
            <div key={program.id} className="carousel-item">
              <ProgramCard 
                {...program} 
                onClick={() => handleCardClick(program.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Program Details Modal */}
      <ProgramDetailsModal
        program={selectedProgramId ? programDetails[selectedProgramId] || null : null}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </AnimatedSection>
  );
};

export default ProgramCarousel;
