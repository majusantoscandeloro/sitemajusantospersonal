import { ChevronDown } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import WhatsAppIcon from './icons/WhatsApp';

/** Mesmo arquivo de `public/hero.webp` (preload no index.html). */
const heroImage = '/hero.webp';

const Hero = () => {
  const { scrollTo } = useSmoothScroll();

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo('programas', 80);
  };

  return (
    <section
      id="inicio"
      className="
        relative isolate overflow-hidden bg-[#F5F0ED]
        pt-16
        min-h-[calc(100svh-64px)]
        md:min-h-[720px] md:pt-0
      "
    >
      {/*
        Mobile: faixa superior dedicada à foto — enquadra o rosto
        (pt-16 no section evita o header fixo cortar a cabeça).
        Desktop: foto só na metade direita.
      */}
      <div
        className="
          relative z-0 h-[min(42vh,320px)] w-full overflow-hidden
          md:absolute md:inset-y-0 md:left-auto md:right-0 md:h-auto md:w-[58%] lg:w-[55%]
        "
      >
        <img
          src={heroImage}
          alt="Maju Santos Personal Trainer"
          fetchPriority="high"
          className="
            absolute inset-0 h-full w-full object-cover
            object-[70%_0%]
            md:object-[62%_28%]
          "
        />

        {/* Fade inferior no mobile (liga foto → creme do texto) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F5F0ED] to-transparent md:hidden"
          aria-hidden
        />

        {/* Fade na borda esquerda da foto (desktop) */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-[#F5F0ED] to-transparent md:block lg:w-36"
          aria-hidden
        />
      </div>

      {/* Conteúdo */}
      <div
        className="
          relative z-10
          mx-auto flex max-w-7xl
          flex-1 flex-col justify-start
          px-5 pb-8 pt-5
          sm:px-8 sm:pb-10
          md:absolute md:inset-0 md:min-h-[720px] md:justify-center md:py-24
          lg:px-10
        "
      >
        <div className="w-full max-w-[440px] pb-[env(safe-area-inset-bottom)] md:max-w-[460px]">
          <p
            className="
              mb-3
              text-[11px] font-semibold uppercase
              tracking-[0.32em]
              text-[#182033]/80
              animate-fade-in
              sm:mb-4 sm:text-xs sm:tracking-[0.38em]
            "
          >
            Maju Santos
          </p>

          <h1
            className="
              font-display
              text-[2.125rem] font-bold
              leading-[1.05]
              tracking-[-0.025em]
              text-[#171717]
              animate-fade-in
              sm:text-5xl
              md:text-6xl
              lg:text-[72px] lg:leading-[0.98]
            "
          >
            Seu corpo.
            <br />
            Sua rotina.
            <br />
            <span className="text-[#C15847]">Seu treino.</span>
          </h1>

          <p
            className="
              mt-4 max-w-[360px]
              text-[0.95rem] leading-[1.5]
              text-[#343131]
              animate-fade-in
              sm:mt-7 sm:max-w-[400px] sm:text-base sm:leading-[1.55]
              md:text-lg
            "
            style={{ animationDelay: '0.15s' }}
          >
            Eu monto programas de treino para diferentes objetivos, níveis e
            rotinas.
          </p>

          <div
            className="
              mt-6 flex flex-col gap-2.5
              animate-fade-in
              sm:mt-9 sm:flex-row sm:gap-3
            "
            style={{ animationDelay: '0.3s' }}
          >
            <a
              href="#programas"
              onClick={handleScrollClick}
              className="
                inline-flex min-h-[48px]
                items-center justify-center
                rounded-xl
                bg-[#B84F3E]
                px-6
                text-[0.95rem] font-semibold text-white
                shadow-[0_10px_30px_rgba(184,79,62,0.18)]
                transition-all duration-300
                sm:min-h-[50px] sm:px-7 sm:text-base

                hover:-translate-y-0.5
                hover:bg-[#A64536]
                hover:shadow-[0_14px_34px_rgba(184,79,62,0.25)]

                focus:outline-none
                focus:ring-2
                focus:ring-[#B84F3E]
                focus:ring-offset-2
              "
            >
              Conheça os programas
            </a>

            <a
              href="https://wa.me/5514910117854"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex min-h-[48px]
                items-center justify-center gap-2
                rounded-xl
                border border-[#171717]/15
                bg-white
                px-6
                text-[0.95rem] font-medium text-[#171717]
                shadow-sm
                transition-all duration-300
                sm:min-h-[50px] sm:bg-white/85 sm:text-base sm:backdrop-blur-md

                hover:-translate-y-0.5
                hover:border-[#B84F3E]/40
                hover:bg-white
                hover:text-[#B84F3E]

                focus:outline-none
                focus:ring-2
                focus:ring-[#B84F3E]
              "
            >
              <WhatsAppIcon size={18} />
              Fale comigo
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 md:block">
        <a
          href="#programas"
          onClick={handleScrollClick}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-full
            text-[#171717]/40
            transition-all
            hover:bg-white/50
            hover:text-[#C15847]
          "
          aria-label="Rolar para programas"
        >
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
