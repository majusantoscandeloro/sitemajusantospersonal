import resultado from '@/assets/resultados/resultado.jpg';
import resultado1 from '@/assets/resultados/resultado1.jpg';
import resultado2 from '@/assets/resultados/resultado2.jpg';
import resultado3 from '@/assets/resultados/resultado3.jpg';
import resultado4 from '@/assets/resultados/resultado4.jpg';
import resultado5 from '@/assets/resultados/resultado5.jpg';
import resultado6 from '@/assets/resultados/resultado6.jpg';
import resultado7 from '@/assets/resultados/resultado7.jpg';
import resultado8 from '@/assets/resultados/resultado8.jpg';
import resultado9 from '@/assets/resultados/resultado9.jpg';
import resultado10 from '@/assets/resultados/resultado10.jpg';
import resultado11 from '@/assets/resultados/resultado11.jpg';
import LazyImage from './LazyImage';
import AnimatedSection from './AnimatedSection';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

const results = [
  { image: resultado },
  { image: resultado1 },
  { image: resultado2 },
  { image: resultado3 },
  { image: resultado4 },
  { image: resultado5 },
  { image: resultado6 },
  { image: resultado7 },
  { image: resultado8 },
  { image: resultado9 },
  { image: resultado10 },
  { image: resultado11 },
];

const ResultsSection = () => {
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="resultados"
      className="border-b border-[#EBE3DE] bg-[#F5F0ED] py-14 md:py-28"
      aria-labelledby="resultados-title"
    >
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-in" className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#743B38]">
            Prova social
          </p>
          <h2 id="resultados-title" className="font-display text-[1.75rem] font-bold leading-tight text-[#171717] md:text-5xl">
            Resultados que vão além do{' '}
            <span className="text-[#C15847]">treino</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl px-1 text-base text-[#6F6A68] md:text-lg">
            Algumas evoluções de alunas que acompanhei ao longo dos últimos anos.
          </p>
        </AnimatedSection>

        <div className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {results.map((result, index) => (
            <AnimatedSection key={index} animation="scale-in" delay={Math.min(index * 60, 400)}>
              <article className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <LazyImage
                  src={result.image}
                  alt={`Resultado de transformação ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fade-in" className="text-center">
          <a
            href="#programas"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('programas', 80);
            }}
            className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#B84F3E] px-7 py-3 font-semibold text-white transition-colors hover:bg-[#A64536]"
          >
            Encontrar meu programa
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ResultsSection;
