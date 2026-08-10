import AnimatedSection from './AnimatedSection';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

const FinalCtaSection = () => {
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="comecar"
      className="theme-navy py-14 md:py-28"
      aria-labelledby="comecar-title"
    >
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-in">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="comecar-title"
              className="font-display text-[1.75rem] font-bold leading-tight text-white md:text-5xl"
            >
              Pronta para começar?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70 md:mt-5 md:text-lg">
              Escolha seu objetivo, encontre o programa ideal e eu deixo seus treinos organizados
              no Majunity GO.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="#programas"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('programas', 80);
                }}
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#B84F3E] px-7 py-3 font-semibold text-white transition-colors hover:bg-[#A64536] sm:w-auto"
              >
                Encontrar meu programa
              </a>
              <a
                href="#rotina"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('rotina', 80);
                }}
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg border border-white/30 px-7 py-3 font-medium text-white transition-colors hover:border-[#C15847] hover:text-[#C15847] sm:w-auto"
              >
                Quero algo personalizado
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FinalCtaSection;
