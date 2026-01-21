import { ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

const Hero = () => {
  const { scrollTo } = useSmoothScroll();

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo('programas', 80);
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Seção principal"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in mt-8 md:mt-12">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SEJAM<br />BEM-VINDAS
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Treinos para diferentes rotinas e objetivos
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a
              href="#programas"
              onClick={handleScrollClick}
              className="btn-primary text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label="Ver programas disponíveis"
            >
              Ver Programas
            </a>
            <a
              href="https://wa.me/5514996536032"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label="Abrir WhatsApp em nova aba"
            >
              Fale comigo no WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a 
          href="#programas" 
          onClick={handleScrollClick}
          className="text-foreground/50 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-full p-2"
          aria-label="Rolar para programas"
        >
          <ChevronDown className="w-8 h-8" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
