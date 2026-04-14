import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Clock, CheckCircle2, ShoppingCart, CreditCard } from 'lucide-react';
import { ProgramDetails } from '@/data/programDetails';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/lib/products';
import { trackViewContent } from '@/lib/pixel';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WhatsAppIcon from './icons/WhatsApp';

interface ProgramDetailsModalProps {
  program: ProgramDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProgramDetailsModal = ({ program, open, onOpenChange }: ProgramDetailsModalProps) => {
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const product = program ? getProductById(program.id) : null;
  const isInCart = product ? items.some(item => item.product.id === product.id) : false;

  // Meta Pixel: ViewContent ao abrir detalhes do programa
  useEffect(() => {
    if (open && program && product) {
      trackViewContent(program.title, [product.id], product.price);
    }
  }, [open, program, product]);

  if (!program) return null;

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no programa: ${program.title}`
  );
  const whatsappUrl = `https://wa.me/5514996536032?text=${whatsappMessage}`;

  /** Mesma base visual para os 3 CTAs (antes: os dois primeiros ficavam “finos” em row + size lg). */
  const ctaButtonClass =
    'w-full h-auto min-h-[42px] py-2.5 px-4 rounded-lg font-semibold text-base gap-2 [&_svg]:size-5';

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;

    // Adiciona o produto ao carrinho (se não estiver já)
    if (!isInCart) {
      addItem(product);
    }

    // Fecha o modal
    onOpenChange(false);

    // Redireciona para o checkout
    navigate('/checkout');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;

    // Adiciona o produto ao carrinho
    addItem(product);

    // Fecha o modal
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[min(100vw-2rem,42rem)] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl md:text-3xl font-bold">
            {program.title}
            {program.subtitle && (
              <span className="block text-base font-normal text-foreground/80 mt-1">
                {program.subtitle}
              </span>
            )}
          </DialogTitle>
          <DialogDescription className="text-base text-foreground/70 pt-2 leading-relaxed">
            {program.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Features */}
          {program.features && program.features.length > 0 && (
            <div>
              <h4 className="font-semibold text-lg mb-3">O que está incluído:</h4>
              <ul className="space-y-2">
                {program.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Price */}
          <div className="bg-card/50 rounded-lg p-6 border border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-2 uppercase tracking-wide">Investimento</p>
                <p className="bg-clip-text text-3xl font-bold text-transparent bg-[linear-gradient(90deg,#ff6a4a_0%,#e5487e_100%)]">
                  {program.price}
                </p>
                {program.accessPeriod ? (
                  <p className="text-xs text-foreground/50 mt-1">Acesso ao conteúdo por {program.accessPeriod}</p>
                ) : program.title.includes('Mensal') || program.title.includes('Trimestral') ? (
                  <p className="text-xs text-foreground/50 mt-1">Acompanhamento {program.title.includes('Mensal') ? 'Mensal' : 'Trimestral'}</p>
                ) : null}
              </div>
              <Clock className="w-10 h-10 text-primary/50" />
            </div>
          </div>

          {/* CTA Buttons — largura igual (coluna), altura/padding alinhados ao estilo do WhatsApp */}
          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={handleBuyNow}
              className={ctaButtonClass}
              disabled={!product}
            >
              <CreditCard className="w-5 h-5" />
              Comprar Agora
            </Button>
            <Button
              onClick={handleAddToCart}
              className={ctaButtonClass}
              disabled={!product || isInCart}
            >
              <ShoppingCart className="w-5 h-5" />
              {isInCart ? 'Já no Carrinho' : 'Adicionar ao Carrinho'}
            </Button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex ${ctaButtonClass} border-0 bg-gradient-to-r from-[#ff6a4a] to-[#e5487e] text-primary-foreground shadow-sm transition-[filter] duration-200 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`}
            >
              <WhatsAppIcon size={20} className="size-5 shrink-0" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramDetailsModal;
