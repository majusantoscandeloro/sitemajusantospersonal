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

  if (!program) return null;

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no programa: ${program.title}`
  );
  const whatsappUrl = `https://wa.me/5514996536032?text=${whatsappMessage}`;

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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                <p className="text-3xl font-bold text-primary">{program.price}</p>
                {program.accessPeriod ? (
                  <p className="text-xs text-foreground/50 mt-1">Acesso ao conteúdo por {program.accessPeriod}</p>
                ) : program.title.includes('Mensal') || program.title.includes('Trimestral') ? (
                  <p className="text-xs text-foreground/50 mt-1">Consultoria Online {program.title.includes('Mensal') ? 'Mensal' : 'Trimestral'}</p>
                ) : null}
              </div>
              <Clock className="w-10 h-10 text-primary/50" />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2"
                size="lg"
                disabled={!product}
              >
                <CreditCard className="w-5 h-5" />
                Comprar Agora
              </Button>
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2"
                size="lg"
                disabled={!product || isInCart}
              >
                <ShoppingCart className="w-5 h-5" />
                {isInCart ? 'Já no Carrinho' : 'Adicionar ao Carrinho'}
              </Button>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              <WhatsAppIcon size={20} className="w-5 h-5" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramDetailsModal;
