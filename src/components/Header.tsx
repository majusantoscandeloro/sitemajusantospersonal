import { useState, useRef, useEffect } from 'react';
import { Menu, X, Loader2, LogOut, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import WhatsAppIcon from './icons/WhatsApp';
import CartButton from './CartButton';
import AuthModal from './AuthModal';
import { Button } from './ui/button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { user, logout, loading: authLoading } = useAuth();
  const { clearCart } = useCart();

  const navLinks = [
    { label: 'Sobre', href: '#sobre', id: 'sobre', type: 'section' as const },
    { label: 'Programas', href: '#programas', id: 'programas', type: 'section' as const },
    { label: 'Como funciona', href: '#app', id: 'app', type: 'section' as const },
    { label: 'Resultados', href: '#resultados', id: 'resultados', type: 'section' as const },
    { label: 'Consultoria', href: '#rotina', id: 'rotina', type: 'section' as const },
    { label: 'Eventos', href: '/eventos', type: 'route' as const },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof navLinks)[number],
  ) => {
    if (link.type === 'route') {
      e.preventDefault();
      navigate(link.href);
      setIsMobileMenuOpen(false);
      return;
    }

    e.preventDefault();
    
    if (!isHomePage) {
      // Se não estiver na página inicial, navegar para lá primeiro
      navigate('/');
      // Aguardar a navegação e então fazer scroll
      setTimeout(() => {
        scrollTo(link.id, 80);
      }, 100);
    } else {
      // Se já estiver na página inicial, apenas fazer scroll
      scrollTo(link.id, 80);
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

  // Fechar menu ao pressionar ESC + travar scroll do body no mobile
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);

    if (isMobileMenuOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = previous;
      };
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      // Limpar carrinho ao fazer logout
      clearCart();
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
      className="
        fixed inset-x-0 top-0 z-50
        border-b border-[#171717]/[0.05]
        bg-[#F5F0ED]
      "
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-[64px] items-center justify-between md:h-[72px]">
          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="flex items-center gap-2">
            <span className="font-display text-lg font-bold tracking-tight md:text-xl">
              <span className="text-[#C15847]">Maju</span>{' '}
              <span className="text-[#171717]">Santos</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8" role="navigation" aria-label="Menu principal">
            {navLinks.map((link) => {
              const isActive =
                link.type === 'route' && location.pathname.startsWith(link.href);
              return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded px-2 py-1 ${
                  isActive ? 'text-primary' : 'text-foreground/70 hover:text-primary'
                }`}
                aria-label={
                  link.type === 'route'
                    ? `Ir para ${link.label}`
                    : `Ir para seção ${link.label}`
                }
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </a>
            );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <CartButton />
            
            {/* Auth Controls - Desktop */}
            {!authLoading && (
              <>
                {user ? (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm text-[#6F6A68]"
                      onClick={() => navigate('/minha-conta')}
                    >
                      <User className="w-4 h-4 mr-1" />
                      Conta
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm text-[#6F6A68] hover:text-destructive"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <LogOut className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(true)}
                    className="
                      text-sm font-medium
                      text-[#171717]/75
                      transition-colors
                      hover:text-[#C15847]
                    "
                  >
                    Área do aluno
                  </button>
                )}
              </>
            )}
            
            <a
              href="https://wa.me/5514996536032"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#B84F3E] px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#A64536]"
            >
              <WhatsAppIcon size={16} className="w-4 h-4" />
              Fale comigo
            </a>
          </div>

          {/* Mobile: logo + WhatsApp + menu */}
          <div className="md:hidden flex items-center gap-1">
            <a
              href="https://wa.me/5514996536032"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[#B84F3E]"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={22} className="h-5 w-5" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[#171717]/80 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — fundo sólido para legibilidade no iPhone */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 right-0 z-50 border-t border-[#EBE3DE] bg-[#F5F0ED] shadow-[0_18px_40px_rgba(23,23,23,0.12)] transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        role="navigation"
        aria-label="Menu mobile"
      >
        <nav className="container mx-auto flex max-h-[min(80dvh,640px)] flex-col gap-1 overflow-y-auto overscroll-contain px-4 py-5">
          {navLinks.map((link) => {
            const isActive =
              link.type === 'route' && location.pathname.startsWith(link.href);
            return (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className={`rounded-lg px-3 py-3 text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#F5F0ED] ${
                isActive ? 'text-primary' : 'text-[#171717] hover:text-primary'
              }`}
              aria-label={
                link.type === 'route'
                  ? `Ir para ${link.label}`
                  : `Ir para seção ${link.label}`
              }
              aria-current={isActive ? 'page' : undefined}
            >
              {link.label}
            </a>
          );
          })}
          
          <a
            href="/cart"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              navigate('/cart');
            }}
            className="rounded-lg px-3 py-3 text-lg font-medium text-[#171717] hover:text-primary"
          >
            Carrinho
          </a>

          {/* Auth Controls - Mobile */}
          {!authLoading && (
            <>
              {user ? (
                <>
                  <div className="mt-2 border-t border-[#EBE3DE] py-3">
                    <p className="mb-3 px-3 text-sm text-[#6F6A68]">
                      Olá, <span className="font-medium text-[#171717]">{user.email}</span>
                    </p>
                    <Button
                      variant="ghost"
                      className="mb-2 w-full justify-start"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate('/minha-conta');
                      }}
                    >
                      <User className="mr-2 h-4 w-4" />
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
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saindo...
                        </>
                      ) : (
                        <>
                          <LogOut className="mr-2 h-4 w-4" />
                          Sair
                        </>
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-3 text-left text-lg font-medium text-[#6F6A68]"
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Área do aluno
                </button>
              )}
            </>
          )}
          
          <a
            href="https://wa.me/5514996536032"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#B84F3E] px-4 py-3.5 text-lg font-semibold text-white"
            aria-label="Abrir WhatsApp em nova aba"
          >
            <WhatsAppIcon size={20} className="h-5 w-5 shrink-0" />
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
