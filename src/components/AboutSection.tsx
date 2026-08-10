import aboutImage from '@/assets/fotos atuais maju/IMG_7212.webp';
import LazyImage from './LazyImage';
import AnimatedSection from './AnimatedSection';

const AboutSection = () => {
  return (
    <section
      id="sobre"
      className="bg-[#F5F0ED] py-14 md:py-28"
      aria-labelledby="sobre-title"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <AnimatedSection animation="slide-left" className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:mx-0 lg:max-w-none">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
                <LazyImage
                  src={aboutImage}
                  alt="Maju Santos — Personal Trainer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 -z-10 h-24 w-24 rounded-2xl bg-[#C15847]/12" />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-up" delay={200} className="lg:col-span-7">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#743B38]">
                Sobre mim
              </p>
              <h2
                id="sobre-title"
                className="mb-5 font-display text-[1.75rem] font-bold leading-tight text-[#171717] md:mb-6 md:text-5xl"
              >
                Um pouco sobre mim
              </h2>

              <div className="space-y-4 text-base leading-relaxed text-[#6F6A68] md:text-lg">
                <p>
                  Sou Maria Julia Candeloro dos Santos, Personal Trainer e graduada em Educação
                  Física. Há mais de 6 anos ajudo mulheres a tornarem o treino parte da rotina e a
                  evoluírem com mais confiança, constância e propósito.
                </p>
                <p>
                  Ao longo desses anos, acompanhei diferentes objetivos, níveis e realidades. Foi
                  essa experiência que me permitiu desenvolver programas de treino estruturados
                  para diferentes necessidades — para que mais mulheres tenham acesso a treinos bem
                  planejados e saibam exatamente o que fazer em cada sessão.
                </p>
                <p>
                  Meu objetivo é tornar o treino mais simples de seguir, sem deixar de lado aquilo
                  que realmente importa: estratégia, segurança, consistência e evolução.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <span className="block font-display text-3xl font-bold text-[#C15847] md:text-4xl">
                    +500
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-[#6F6A68]">
                    alunas acompanhadas
                  </span>
                </div>
                <div>
                  <span className="block font-display text-3xl font-bold text-[#C15847] md:text-4xl">
                    6+ anos
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-[#6F6A68]">
                    ajudando mulheres a evoluírem
                  </span>
                </div>
                <div>
                  <span className="block font-display text-3xl font-bold text-[#C15847] md:text-4xl">
                    Mundo inteiro
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-[#6F6A68]">
                    Treine de onde estiver
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
