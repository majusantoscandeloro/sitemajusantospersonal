import { useState, useRef, useEffect } from 'react';
import { Menu, X, Loader2, LogOut, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useScroll } from '@/hooks/use-scroll';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { useAuth } from '@/context/AuthContext';
import WhatsAppIcon from './icons/WhatsApp';
import CartButton from './CartButton';
import AuthModal from './AuthModal';
import { Button } from './ui/button';

const Header = () => {
  const { isScrolled } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { user, logout, loading: authLoading } = useAuth();

  const navLinks = [
    { label: 'Sobre', href: '#sobre', id: 'sobre' },
    { label: 'Programas', href: '#programas', id: 'programas' },
    { label: 'Para quem', href: '#para-quem', id: 'para-quem' },
    { label: 'Resultados', href: '#resultados', id: 'resultados' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    if (!isHomePage) {
      // Se não estiver na página inicial, navegar para lá primeiro
      navigate('/');
      // Aguardar a navegação e então fazer scroll
      setTimeout(() => {
        scrollTo(id, 80);
      }, 100);
    } else {
      // Se já estiver na página inicial, apenas fazer scroll
      scrollTo(id, 80);
    }
    
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (!isHomePage) {
      // Se não estiver na página inicial, navegar para lá
      navigate('/');
    } else {
      // Se já estiver na página inicial, fazer scroll para o topo
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    
    setIsMobileMenuOpen(false);
  };

  // Fechar menu ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      // Redirecionar para home após logout
      navigate('/');
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alert(error instanceof Error ? error.message : 'Erro ao sair. Tente novamente.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="flex items-center gap-2">
            <span className="font-display text-xl md:text-2xl font-bold tracking-tight">
              <span className="text-primary">Maju</span> Santos
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Menu principal">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-2 py-1"
                aria-label={`Ir para seção ${link.label}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <CartButton />
            
            {/* Auth Controls - Desktop */}
            {!authLoading && (
              <>
                {user ? (
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-foreground/70">
                      Olá, <span className="font-medium text-foreground">{user.email}</span>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm"
                      onClick={() => {
                        // Placeholder para "Minha conta"
                        alert('Funcionalidade em desenvolvimento');
                      }}
                    >
                      <User className="w-4 h-4 mr-1" />
                      Minha conta
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm text-destructive hover:text-destructive"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          Saindo...
                        </>
                      ) : (
                        <>
                          <LogOut className="w-4 h-4 mr-1" />
                          Sair
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                    className="text-sm"
                  >
                    Entrar
                  </Button>
                )}
              </>
            )}
            
            <a
              href="https://wa.me/5514996536032"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              <WhatsAppIcon size={16} className="w-4 h-4" />
              Fale comigo
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <CartButton />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground/80 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-t border-border transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        role="navigation"
        aria-label="Menu mobile"
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-2"
              aria-label={`Ir para seção ${link.label}`}
            >
              {link.label}
            </a>
          ))}
          
          {/* Auth Controls - Mobile */}
          {!authLoading && (
            <>
              {user ? (
                <>
                  <div className="py-2 border-t border-border mt-2">
                    <p className="text-sm text-foreground/70 mb-3">
                      Olá, <span className="font-medium text-foreground">{user.email}</span>
                    </p>
                    <Button
                      variant="ghost"
                      className="w-full justify-start mb-2"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        alert('Funcionalidade em desenvolvimento');
                      }}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Minha conta
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saindo...
                        </>
                      ) : (
                        <>
                          <LogOut className="w-4 h-4 mr-2" />
                          Sair
                        </>
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Entrar
                </Button>
              )}
            </>
          )}
          
          <a
            href="https://wa.me/5514996536032"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-lg font-medium text-primary py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-2"
            aria-label="Abrir WhatsApp em nova aba"
          >
            <WhatsAppIcon size={20} className="w-5 h-5" />
            Fale comigo no WhatsApp
          </a>
        </nav>
      </div>
      
      {/* Auth Modal */}
      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
      />
    </header>
  );
};

export default Header;
