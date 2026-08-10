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
        min-h-[calc(100svh-64px)]
        md:min-h-[720px]
      "
    >
      {/* Foto */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImage}
          alt="Maju Santos Personal Trainer"
          fetchPriority="high"
          className="
            absolute inset-0 h-full w-full max-w-none object-cover
            object-[62%_12%]
            md:left-auto md:right-0 md:h-full md:w-[108%]
            md:object-[50%_35%]
            md:translate-x-[8%] md:translate-y-[7%]
          "
        />
      </div>

      {/* Gradiente desktop: texto protegido → foto */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(245,240,237,1) 0%,
              rgba(245,240,237,0.98) 10%,
              rgba(245,240,237,0.90) 20%,
              rgba(245,240,237,0.65) 28%,
              rgba(245,240,237,0.30) 35%,
              rgba(245,240,237,0.08) 42%,
              rgba(245,240,237,0) 48%
            )
          `,
        }}
      />

      {/* Mobile: creme forte na base para texto e CTAs legíveis */}
      <div
        className="
          absolute inset-0 md:hidden
          bg-gradient-to-t
          from-[#F5F0ED] from-[36%]
          via-[#F5F0ED]/95 via-[52%]
          to-[#F5F0ED]/20
        "
      />

      {/* Conteúdo — no mobile ancorado na base */}
      <div
        className="
          relative z-10
          mx-auto flex min-h-[calc(100svh-64px)] max-w-7xl
          items-end md:items-center
          px-5 pb-8 pt-20
          sm:px-8 sm:pb-10
          md:py-24
          lg:px-10
        "
      >
        <div className="w-full max-w-[470px] pb-[env(safe-area-inset-bottom)] lg:-translate-x-8 xl:-translate-x-12">
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
              href="https://wa.me/5514996536032"
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

      {/* Scroll — só desktop */}
      <div
        className="
          absolute bottom-5 left-1/2 z-20
          hidden -translate-x-1/2
          md:block
        "
      >
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
