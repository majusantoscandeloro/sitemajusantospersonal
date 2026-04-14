import { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, ShoppingCart, Plus, Minus, CreditCard } from 'lucide-react';
import LazyImage from './LazyImage';
import { useCart } from '@/context/CartContext';
import { getProductById, formatPrice } from '@/lib/products';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ProgramCardProps {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  duration: string;
  category?: string;
  onClick?: () => void;
}

const levelColors = {
  'Iniciante': 'bg-green-500/50 text-green-300',
  'Intermediário': 'bg-amber-500/50 text-amber-200',
  'Avançado': 'bg-red-500/50 text-red-300',
};

const ProgramCard = memo(({ id, title, subtitle, image, level, duration, category, onClick }: ProgramCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const showOverlayActions = isHovered;
  const { addItem, items, increment, decrement } = useCart();
  const product = getProductById(id);
  const cartItem = items.find((item) => item.product.id === id);
  const isInCart = !!cartItem;

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;

    if (!isInCart) {
      addItem(product);
    }

    navigate('/checkout');
  };

  const categoryBadge =
    category &&
    !category.includes('Iniciante, Intermediário, Avançado') &&
    !category.includes('Intermediário, Avançado') &&
    !category.includes('Iniciante, Intermediário') ? (
      <span className="absolute top-4 left-4 z-[1] px-3 py-1 bg-gradient-to-r from-[#ff6a4a]/95 to-[#e5487e]/95 text-primary-foreground text-xs font-semibold rounded-full">
        {category}
      </span>
    ) : null;

  const metaBadges = (
    <>
      {category && category.includes('Iniciante, Intermediário, Avançado') ? (
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`px-2 py-1 text-xs font-medium rounded ${levelColors['Iniciante']}`}>Iniciante</span>
          <span className={`px-2 py-1 text-xs font-medium rounded ${levelColors['Intermediário']}`}>
            Intermediário
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded ${levelColors['Avançado']}`}>Avançado</span>
        </div>
      ) : category && category.includes('Intermediário, Avançado') ? (
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`px-2 py-1 text-xs font-medium rounded ${levelColors['Intermediário']}`}>
            Intermediário
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded ${levelColors['Avançado']}`}>Avançado</span>
        </div>
      ) : category && category.includes('Iniciante, Intermediário') ? (
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`px-2 py-1 text-xs font-medium rounded ${levelColors['Iniciante']}`}>Iniciante</span>
          <span className={`px-2 py-1 text-xs font-medium rounded ${levelColors['Intermediário']}`}>
            Intermediário
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-3 mb-2">
          <span className={`px-2 py-1 text-xs font-medium rounded ${levelColors[level]}`}>{level}</span>
        </div>
      )}
      <div className="flex items-center gap-1 text-foreground/60 text-sm">
        <Clock className="w-4 h-4" />
        {duration}
      </div>
    </>
  );

  const titleAndMeta = (
    <>
      <h3 className="font-display text-xl md:text-2xl font-bold mb-3 line-clamp-2">
        {title}
        {subtitle && (
          <span className="block text-sm font-normal text-foreground/80 mt-0.5">{subtitle}</span>
        )}
      </h3>
      <div className={cn('mb-4', isMobile && 'mb-0')}>{metaBadges}</div>
      {product && (
        <div className={cn('mb-3', isMobile && 'mb-0')}>
          <p className="bg-clip-text text-2xl font-bold text-transparent bg-[linear-gradient(90deg,#ff6a4a_0%,#e5487e_100%)]">
            {formatPrice(product.price)}
          </p>
        </div>
      )}
    </>
  );

  const actionsBlock = (
    <div onClick={(e) => e.stopPropagation()}>
      {product ? (
        <div className="space-y-2">
          {isInCart ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  decrement(product.id);
                }}
                className="h-10 w-10 flex-shrink-0"
                aria-label="Diminuir quantidade"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="flex-1 text-center font-semibold">{cartItem?.quantity} no carrinho</span>
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  increment(product.id);
                }}
                className="h-10 w-10 flex-shrink-0"
                aria-label="Aumentar quantidade"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <Button
                onClick={handleBuyNow}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-lg py-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label={`Comprar ${title} agora`}
              >
                <CreditCard className="w-4 h-4" aria-hidden="true" />
                Comprar agora
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  addItem(product);
                }}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-lg py-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label={`Adicionar ${title} ao carrinho`}
              >
                <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                Adicionar ao carrinho
              </Button>
            </>
          )}
          <Button
            onClick={onClick}
            className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-lg py-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label={`Ver detalhes do programa ${title}`}
          >
            Ver detalhes
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <Button
          onClick={onClick}
          className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-lg py-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          aria-label={`Ver detalhes do programa ${title}`}
        >
          Ver detalhes
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </Button>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <article
        className="card-program group flex w-[280px] flex-col overflow-hidden rounded-lg border border-border/50 bg-card shadow-sm cursor-pointer"
        onClick={onClick}
        role="article"
        aria-label={`Programa: ${title}`}
      >
        <div className="relative w-full shrink-0 overflow-hidden aspect-[3/4]">
          <LazyImage src={image} alt={`Imagem do programa ${title}`} className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
          {categoryBadge}
        </div>
        <div className="flex min-w-0 flex-col gap-3 border-t border-border/60 bg-card p-4">
          {titleAndMeta}
          {actionsBlock}
        </div>
      </article>
    );
  }

  return (
    <article
      className="card-program group relative aspect-[3/4] w-[280px] cursor-pointer md:w-[320px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="article"
      aria-label={`Programa: ${title}`}
    >
      <div className="absolute inset-0">
        <LazyImage src={image} alt={`Imagem do programa ${title}`} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col p-5">
        {categoryBadge}

        <div className="mt-auto">{titleAndMeta}</div>

        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-5 left-5 right-5 z-10 transition-all duration-300 ${
            showOverlayActions
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-4 opacity-0'
          }`}
        >
          {actionsBlock}
        </div>
      </div>
    </article>
  );
});

ProgramCard.displayName = 'ProgramCard';

export default ProgramCard;
