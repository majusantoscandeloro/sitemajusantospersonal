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
        min-h-[calc(100svh-72px)]
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
            absolute
            h-full
            w-[108%]
            max-w-none
            object-cover
            object-[50%_35%]
            translate-x-[8%]
            translate-y-[7%]
          "
        />
      </div>

      {/* Gradiente: texto protegido → transição → foto natural */}
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

      {/* Mobile */}
      <div
        className="
          absolute inset-0 md:hidden
          bg-gradient-to-t
          from-[#F5F0ED]
          via-[#F5F0ED]/80
          to-[#F5F0ED]/10
        "
      />

      {/* leve acabamento na base */}
      <div
        className="
          pointer-events-none absolute inset-x-0 bottom-0 h-32
          bg-gradient-to-t from-[#F5F0ED]/60 to-transparent
        "
      />

      {/* Conteúdo */}
      <div
        className="
          relative z-10
          mx-auto flex min-h-[calc(100svh-72px)] max-w-7xl
          items-center
          px-5 py-24
          sm:px-8
          lg:px-10
        "
      >
        <div className="max-w-[470px] lg:-translate-x-8 xl:-translate-x-12">
          <p
            className="
              mb-4
              text-xs font-semibold uppercase
              tracking-[0.38em]
              text-[#182033]/80
              animate-fade-in
            "
          >
            Maju Santos
          </p>

          <h1
            className="
              font-display
              text-[46px] font-bold
              leading-[0.98]
              tracking-[-0.025em]
              text-[#171717]
              animate-fade-in
              sm:text-6xl
              lg:text-[72px]
            "
          >
            Seu corpo.
            <br />
            Sua rotina.
            <br />

            <span className="text-[#C15847]">
              Seu treino.
            </span>
          </h1>

          <p
            className="
              mt-7 max-w-[400px]
              text-base leading-[1.55]
              text-[#343131]
              animate-fade-in
              sm:text-lg
            "
            style={{ animationDelay: '0.15s' }}
          >
            Programas de treino pensados para diferentes objetivos, níveis e
            rotinas. Escolha o seu e treine com tudo organizado no Majunity GO.
          </p>

          <div
            className="
              mt-9 flex flex-col gap-3
              animate-fade-in
              sm:flex-row
            "
            style={{ animationDelay: '0.3s' }}
          >
            <a
              href="#programas"
              onClick={handleScrollClick}
              className="
                inline-flex min-h-[50px]
                items-center justify-center
                rounded-xl
                bg-[#B84F3E]
                px-7
                font-semibold text-white
                shadow-[0_10px_30px_rgba(184,79,62,0.18)]
                transition-all duration-300

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
                inline-flex min-h-[50px]
                items-center justify-center gap-2
                rounded-xl
                border border-[#171717]/15
                bg-white/85
                px-6
                font-medium text-[#171717]
                backdrop-blur-md
                shadow-sm
                transition-all duration-300

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

      {/* Scroll */}
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