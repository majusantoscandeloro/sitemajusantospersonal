import { CalendarDays, Sparkles, Target } from 'lucide-react';
import methodImage from '@/assets/fotos atuais maju/IMG_7214.webp';
import LazyImage from './LazyImage';
import AnimatedSection from './AnimatedSection';

const ContextSection = () => {
  const items = [
    {
      number: '01',
      title: 'Para o seu nível',
      description:
        'Do início à retomada ou à evolução contínua: programas estruturados para quem está começando e para quem já treina.',
      icon: Sparkles,
    },
    {
      number: '02',
      title: 'Para diferentes rotinas',
      description:
        'Opções de duração, frequência e local de treino para encaixar na sua realidade.',
      icon: CalendarDays,
    },
    {
      number: '03',
      title: 'Para objetivos específicos',
      description:
        'Programas focados em hipertrofia, definição, emagrecimento e outros objetivos.',
      icon: Target,
    },
  ];

  return (
    <section id="para-quem" className="bg-[#F5F0ED] py-14 md:py-28" aria-labelledby="para-quem-title">
      <div className="container mx-auto px-4">
        <div className="mb-10 grid grid-cols-1 items-center gap-8 lg:mb-14 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection animation="slide-left">
            <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
              <div className="aspect-[5/4]">
                <LazyImage
                  src={methodImage}
                  alt="Maju Santos planejando treinos com materiais e notebook"
                  className="h-full w-full object-cover object-center"
                  width={1000}
                  height={800}
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={150}>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#743B38]">
                Eu penso cada programa para você evoluir
              </p>
              <h2
                id="para-quem-title"
                className="mb-4 font-display text-[1.75rem] font-bold leading-tight text-[#171717] md:mb-5 md:text-5xl"
              >
                Treino com objetivo e{' '}
                <span className="text-[#C15847]">estratégia</span>
              </h2>
              <p className="text-base leading-relaxed text-[#6F6A68] md:text-xl">
                Eu desenvolvo cada programa com uma proposta clara. Você escolhe de acordo com seu
                objetivo e nível e recebe uma sequência de treinos estruturada para seguir do
                início ao fim.
              </p>
            </div>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.number} animation="scale-in" delay={index * 100}>
                <article className="h-full rounded-2xl border border-[#EBE3DE] bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-display text-2xl font-bold text-[#C15847]/80">
                      {item.number}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F0ED] text-[#C15847]">
                      <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-xl font-semibold text-[#171717]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#6F6A68]">{item.description}</p>
                </article>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContextSection;
