import appMockup from '@/assets/imagens_site/app5_no_bg_clean.webp';
import AnimatedSection from './AnimatedSection';

const AppAccessSection = () => {
  return (
    <section
      id="app"
      className="border-t border-[#EBE3DE] bg-[#F5F0ED] py-16 md:py-24"
      aria-labelledby="app-access-title"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <AnimatedSection
            animation="slide-left"
            className="relative w-full min-w-0 px-4 md:px-0 lg:justify-self-stretch"
          >
            <div className="relative mx-auto flex w-full min-w-0 max-w-[420px] justify-center lg:mx-0 lg:max-w-none lg:justify-start">
              <img
                src={appMockup}
                alt="Dois celulares exibindo o aplicativo Majunity GO: tela de exercício em vídeo e lista de rotina semanal"
                className="block h-auto w-full max-w-full object-contain object-center lg:object-left"
                loading="lazy"
                decoding="async"
              />
              <span
                className="
                  absolute bottom-3 left-1/2 z-10 -translate-x-1/2
                  max-w-[200px]
                  rounded-lg
                  border border-[#C15847]/25
                  bg-white/95
                  px-3.5 py-2
                  text-center text-xs font-semibold leading-snug
                  text-[#743B38]
                  shadow-sm
                  sm:bottom-6 sm:left-6 sm:translate-x-0 sm:text-left sm:text-sm
                  lg:left-6
                "
              >
                Incluso na compra do programa
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-up" delay={150} className="min-w-0 px-4 md:px-0">
            <div className="text-center lg:pl-2 lg:text-left">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#743B38]">
                Seu treino na palma da mão
              </p>
              <h2
                id="app-access-title"
                className="mb-5 font-display text-[1.75rem] font-bold leading-tight md:text-5xl"
              >
                Seu programa completo no{' '}
                <span className="text-gradient">Majunity GO</span>
              </h2>
              <div className="mx-auto max-w-prose space-y-4 text-left text-lg leading-relaxed text-foreground/70 md:text-xl lg:mx-0 lg:max-w-none">
                <p>
                  Depois da compra, eu libero seu programa no Majunity GO. Você abre o aplicativo
                  e encontra tudo organizado para saber exatamente o que fazer em cada treino.
                </p>
                <ul className="list-gradient-brand">
                  <li>Exercícios organizados por sessão</li>
                  <li>Vídeos demonstrativos para acompanhar a execução</li>
                  <li>Séries e repetições já definidas</li>
                  <li>Intervalos de descanso organizados</li>
                  <li>Registro de carga para acompanhar sua evolução</li>
                  <li>Todo o programa disponível pelo celular</li>
                </ul>
                <p className="font-medium text-foreground/85">
                  Sem ficha perdida, sem precisar decorar o treino. Abra o app e comece.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AppAccessSection;
