import { Instagram } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsApp';
import TikTokIcon from './icons/TikTok';

const Footer = () => {
  return (
    <footer className="py-16 bg-background border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl font-bold mb-2">
              <span className="text-primary">Maju</span> Santos
            </h3>
            <p className="text-foreground/60 text-sm">
              Personal Trainer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/majusantospersonal/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-card hover:bg-primary text-foreground/70 hover:text-primary-foreground transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.tiktok.com/@majusantospersonal"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-card hover:bg-primary text-foreground/70 hover:text-primary-foreground transition-all duration-300"
              aria-label="TikTok"
            >
              <TikTokIcon size={20} className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/5514996536032"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-card hover:bg-primary text-foreground/70 hover:text-primary-foreground transition-all duration-300"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={20} className="w-5 h-5" />
            </a>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/5514996536032"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2"
          >
            <WhatsAppIcon size={20} className="w-5 h-5" />
            Fale comigo
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 text-center">
          <p className="text-foreground/40 text-sm">
            © 2026 Maju Santos Personal Trainer. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
