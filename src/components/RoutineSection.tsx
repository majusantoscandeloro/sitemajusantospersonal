import routineImage from '@/assets/fotos atuais maju/IMG_7211.webp';
import LazyImage from './LazyImage';
import AnimatedSection from './AnimatedSection';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

const RoutineSection = () => {
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="rotina"
      className="border-y border-[#EBE3DE] bg-[#EBE3DE]/40 py-14 md:py-28"
      aria-labelledby="rotina-title"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection animation="slide-up" className="order-2 lg:order-1">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#743B38]">
                Consultoria VIP
              </p>
              <h2
                id="rotina-title"
                className="mb-4 font-display text-[1.75rem] font-bold leading-tight text-[#171717] md:mb-5 md:text-5xl"
              >
                Quer um acompanhamento mais{' '}
                <span className="text-[#C15847]">próximo</span>?
              </h2>
              <p className="max-w-lg text-lg leading-relaxed text-[#6F6A68]">
                Se você deseja um atendimento mais individual, a Consultoria VIP é a opção ideal.
                Ela é indicada para quem quer mais contato comigo, suporte para tirar dúvidas e um
                planejamento mais ajustado à sua rotina, objetivos e evolução.
              </p>
              <ul className="list-gradient-brand mt-8 max-w-md text-[#6F6A68]">
                <li>Mais atenção individual</li>
                <li>Ajustes conforme a sua evolução</li>
                <li>Suporte mais próximo para tirar dúvidas</li>
              </ul>

              <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#6F6A68]">
                Ideal se você quer um acompanhamento mais próximo no dia a dia.
              </p>

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
                  href="https://wa.me/5514910117854?text=Ol%C3%A1%20Maju!%20Tenho%20interesse%20na%20Consultoria%20VIP.%20Pode%20me%20passar%20mais%20informa%C3%A7%C3%B5es%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex min-h-[48px] items-center justify-center text-center"
                >
                  Falar comigo
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
