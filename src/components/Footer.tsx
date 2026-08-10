import { Instagram } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import WhatsAppIcon from './icons/WhatsApp';
import TikTokIcon from './icons/TikTok';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!isHomePage) {
      navigate('/');
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="border-t border-border/50 bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand — mesmo comportamento do logo do header */}
          <div className="text-center md:text-left">
            <a
              href="/"
              onClick={handleLogoClick}
              className="inline-block rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label="Ir para o início do site"
            >
              <h3 className="mb-2 font-display text-2xl font-bold">
                <span className="text-[#C15847]">Maju</span>{' '}
                <span className="text-[#171717]">Santos</span>
              </h3>
            </a>
            <p className="text-sm text-foreground/60">Personal Trainer</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/majusantospersonal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-card text-foreground/70 transition-all duration-300 hover:bg-[linear-gradient(90deg,#c85c4b_0%,#743b38_100%)] hover:text-primary-foreground"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@majusantospersonal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-card text-foreground/70 transition-all duration-300 hover:bg-[linear-gradient(90deg,#c85c4b_0%,#743b38_100%)] hover:text-primary-foreground"
              aria-label="TikTok"
            >
              <TikTokIcon size={20} className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/5514910117854"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-card text-foreground/70 transition-all duration-300 hover:bg-[linear-gradient(90deg,#c85c4b_0%,#743b38_100%)] hover:text-primary-foreground"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={20} className="h-5 w-5" />
            </a>
          </div>

          <a
            href="https://wa.me/5514910117854"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex min-h-[44px] items-center gap-2"
          >
            <WhatsAppIcon size={20} className="h-5 w-5" />
            Fale comigo
          </a>
        </div>

        <div className="mt-12 border-t border-border/30 pt-8 text-center">
          <p className="text-sm text-foreground/40">
            © 2026 Maju Santos Personal Trainer. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
