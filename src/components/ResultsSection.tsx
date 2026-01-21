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
import { ArrowUp } from 'lucide-react';
import LazyImage from './LazyImage';
import AnimatedSection from './AnimatedSection';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

const results = [
  { image: resultado, name: 'Aluna', description: 'Transformação real' },
  { image: resultado1, name: 'Aluna', description: 'Transformação real' },
  { image: resultado2, name: 'Aluna', description: 'Transformação real' },
  { image: resultado3, name: 'Aluna', description: 'Transformação real' },
  { image: resultado4, name: 'Aluna', description: 'Transformação real' },
  { image: resultado5, name: 'Aluna', description: 'Transformação real' },
  { image: resultado6, name: 'Aluna', description: 'Transformação real' },
  { image: resultado7, name: 'Aluna', description: 'Transformação real' },
  { image: resultado8, name: 'Aluna', description: 'Transformação real' },
  { image: resultado9, name: 'Aluna', description: 'Transformação real' },
  { image: resultado10, name: 'Aluna', description: 'Transformação real' },
  { image: resultado11, name: 'Aluna', description: 'Transformação real' },
];

const ResultsSection = () => {
  const { scrollTo } = useSmoothScroll();

  const handleScrollToPrograms = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo('programas', 80);
  };

  return (
    <section id="resultados" className="py-20 md:py-32 bg-card/50" aria-labelledby="resultados-title">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-in" className="text-center mb-12">
          <h2 id="resultados-title" className="font-display text-3xl md:text-5xl font-bold mb-4">
            Resultados <span className="text-gradient">Reais</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-xl mx-auto">
            Histórias de transformação das minhas alunas
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {results.map((result, index) => (
            <AnimatedSection 
              key={index}
              animation="scale-in" 
              delay={index * 100}
            >
              <article className="group relative aspect-[3/4] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background">
                <LazyImage
                  src={result.image}
                  alt={`Resultado de transformação de ${result.name} - ${result.description}`}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-foreground">{result.name}</h3>
                  <p className="text-sm text-foreground/70">{result.description}</p>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        {/* Botão para ver programas */}
        <AnimatedSection animation="fade-in" delay={1200} className="text-center">
          <a
            href="#programas"
            onClick={handleScrollToPrograms}
            className="inline-flex items-center gap-2 btn-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Ver programas disponíveis"
          >
            <ArrowUp className="w-5 h-5 rotate-180" aria-hidden="true" />
            Ver Programas Novamente
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ResultsSection;
