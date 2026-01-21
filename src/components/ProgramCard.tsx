import { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, ShoppingCart, Plus, Minus, CreditCard } from 'lucide-react';
import LazyImage from './LazyImage';
import { useCart } from '@/context/CartContext';
import { getProductById, formatPrice } from '@/lib/products';
import { Button } from './ui/button';

interface ProgramCardProps {
  id: string;
  title: string;
  image: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  duration: string;
  category?: string;
  onClick?: () => void;
}

const levelColors = {
  'Iniciante': 'bg-green-500/20 text-green-400',
  'Intermediário': 'bg-yellow-500/20 text-yellow-400',
  'Avançado': 'bg-red-500/20 text-red-400',
};

const ProgramCard = memo(({ id, title, image, level, duration, category, onClick }: ProgramCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { addItem, items, increment, decrement } = useCart();
  const product = getProductById(id);
  const cartItem = items.find((item) => item.product.id === id);
  const isInCart = !!cartItem;

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;

    // Adiciona o produto ao carrinho (se não estiver já)
    if (!isInCart) {
      addItem(product);
    }

    // Redireciona para o checkout para coletar dados do cliente
    navigate('/checkout');
  };

  return (
    <article
      className="card-program group w-[280px] md:w-[320px] aspect-[3/4] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="article"
      aria-label={`Programa: ${title}`}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <LazyImage
          src={image}
          alt={`Imagem do programa ${title}`}
          className="w-full h-full"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        {/* Category Badge */}
        {category && !category.includes('Iniciante, Intermediário, Avançado') && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
            {category}
          </span>
        )}

        {/* Title */}
        <h3 className="font-display text-xl md:text-2xl font-bold mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Meta Info */}
        <div className="mb-4">
          {category && category.includes('Iniciante, Intermediário, Avançado') ? (
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-2 py-1 text-xs font-medium rounded ${levelColors['Iniciante']}`}>
                Iniciante
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded ${levelColors['Intermediário']}`}>
                Intermediário
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded ${levelColors['Avançado']}`}>
                Avançado
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2 py-1 text-xs font-medium rounded ${levelColors[level]}`}>
                {level}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1 text-foreground/60 text-sm">
            <Clock className="w-4 h-4" />
            {duration}
          </div>
        </div>

        {/* Price */}
        {product && (
          <div className="mb-3">
            <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
          </div>
        )}

        {/* Hover Buttons */}
        <div
          className={`transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
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
                  <span className="flex-1 text-center font-semibold">
                    {cartItem?.quantity} no carrinho
                  </span>
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
                    className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
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
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    aria-label={`Adicionar ${title} ao carrinho`}
                  >
                    <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                    Adicionar ao carrinho
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                onClick={onClick}
                className="w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-lg hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label={`Ver detalhes do programa ${title}`}
              >
                Ver detalhes
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={onClick}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label={`Ver detalhes do programa ${title}`}
            >
              Ver detalhes
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
});

ProgramCard.displayName = 'ProgramCard';

export default ProgramCard;
