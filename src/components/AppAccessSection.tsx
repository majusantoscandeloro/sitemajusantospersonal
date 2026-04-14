import appMockup from '@/assets/app5_no_bg_clean.png';
import AnimatedSection from './AnimatedSection';

const AppAccessSection = () => {
  return (
    <section
      id="app"
      className="py-16 md:py-24 border-t border-border/40"
      aria-labelledby="app-access-title"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 xl:gap-12 items-center">
          <AnimatedSection
            animation="slide-left"
            className="px-4 md:px-0 w-full min-w-0 lg:justify-self-stretch"
          >
            <div className="w-full min-w-0 flex justify-start">
              <img
                src={appMockup}
                alt="Dois celulares exibindo o aplicativo de treinos: tela de exercício em vídeo e lista de rotina semanal"
                className="h-auto w-auto max-w-full object-contain object-left block"
                loading="lazy"
                decoding="async"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-up" delay={150} className="px-4 md:px-0 min-w-0">
            <div className="text-center lg:text-left lg:pl-2">
              <h2 id="app-access-title" className="font-display text-3xl md:text-5xl font-bold mb-4">
                Acesse tudo pelo{' '}
                <span className="text-gradient">aplicativo</span>
              </h2>
              <div className="text-lg md:text-xl text-foreground/70 leading-relaxed space-y-4 max-w-prose mx-auto lg:mx-0 lg:max-w-none text-left">
                <p>Após adquirir um programa, você recebe acesso completo ao app com:</p>
                <ul className="list-gradient-brand">
                  <li>Rotinas organizadas por dia</li>
                  <li>Vídeos demonstrativos dos exercícios</li>
                  <li>Treinos disponíveis em qualquer lugar</li>
                </ul>
                <p>Tudo de forma simples e prática.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AppAccessSection;
