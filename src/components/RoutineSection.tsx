import routineImage from '@/assets/fotos atuais maju/IMG_7211.webp';
import LazyImage from './LazyImage';
import AnimatedSection from './AnimatedSection';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

const RoutineSection = () => {
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="rotina"
      className="border-y border-[#EBE3DE] bg-[#EBE3DE]/40 py-20 md:py-28"
      aria-labelledby="rotina-title"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection animation="slide-up" className="order-2 lg:order-1">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#743B38]">
                Consultoria Personalizada
              </p>
              <h2
                id="rotina-title"
                className="mb-5 font-display text-3xl font-bold text-[#171717] md:text-5xl"
              >
                Quer algo feito especialmente para{' '}
                <span className="text-[#C15847]">você</span>?
              </h2>
              <p className="max-w-lg text-lg leading-relaxed text-[#6F6A68]">
                Para quem busca um acompanhamento mais próximo, a consultoria personalizada vai
                além dos programas prontos. Aqui, o planejamento é desenvolvido considerando seus
                objetivos, rotina, experiência e necessidades individuais.
              </p>
              <ul className="list-gradient-brand mt-8 max-w-md text-[#6F6A68]">
                <li>Planejamento individualizado</li>
                <li>Ajustes de acordo com sua evolução</li>
                <li>Contato e acompanhamento mais próximo</li>
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#consultoria-planos"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('consultoria-planos', 80);
                  }}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#B84F3E] px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-[#A64536]"
                >
                  Ver planos
                </a>
                <a
                  href="https://wa.me/5514996536032?text=Ol%C3%A1%20Maju!%20Tenho%20interesse%20na%20consultoria%20personalizada.%20Pode%20me%20passar%20mais%20informa%C3%A7%C3%B5es%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex min-h-[48px] items-center justify-center text-center"
                >
                  Falar com a Maju
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-left" delay={150} className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
              <div className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                <LazyImage
                  src={routineImage}
                  alt="Maju Santos com notebook — planejamento de treinos"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default RoutineSection;
