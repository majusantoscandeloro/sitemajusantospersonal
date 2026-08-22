import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, ShoppingCart, CreditCard } from 'lucide-react';
import LazyImage from './LazyImage';
import { useCart } from '@/context/CartContext';
import { getProductById, formatPrice, isProductAvailable } from '@/lib/products';
import { getCatalogItemById } from '@/data/catalog';
import { getCatalogItemPath } from '@/lib/slugs';
import { CONSULTORIA_PRECADASTRO_URL } from '@/config/site';
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
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const product = getProductById(id);
  const catalogItem = getCatalogItemById(id);
  const detailsPath = catalogItem ? getCatalogItemPath(catalogItem) : undefined;
  const isInCart = items.some((item) => item.product.id === id);
  const isConsultoria = product?.type === 'consultoria';
  const isAvailable = isProductAvailable(product);

  // Programas: link real para /programas/:slug (SEO).
  // Consultoria: abre o modal — não há página individual por plano.
  const detailsLink =
    detailsPath && !isConsultoria ? (
      <Link
        to={detailsPath}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-lg border border-border bg-background/80 py-3 text-base font-semibold transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        aria-label={`Ver página do programa ${title}`}
      >
        Ver detalhes
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    ) : (
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-lg py-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        aria-label={`Ver detalhes do programa ${title}`}
      >
        Ver detalhes
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </Button>
    );

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
      <span className="absolute top-4 left-4 z-[1] px-3 py-1 bg-gradient-to-r from-[#b84f3e]/95 to-[#743b38]/95 text-primary-foreground text-xs font-semibold rounded-full">
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
      <h3 className="font-display text-xl md:text-2xl font-bold mb-3">
        {detailsPath ? (
          <Link
            to={detailsPath}
            onClick={(e) => e.stopPropagation()}
            className="hover:text-[#C15847] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {title}
            {subtitle && (
              <span className="block text-sm font-normal text-foreground/80 mt-0.5">{subtitle}</span>
            )}
          </Link>
        ) : (
          <>
            {title}
            {subtitle && (
              <span className="block text-sm font-normal text-foreground/80 mt-0.5">{subtitle}</span>
            )}
          </>
        )}
      </h3>
      <div className={cn('mb-4', isMobile && 'mb-0')}>{metaBadges}</div>
      {product && isAvailable && (
        <div
          className={cn(
            'mb-3',
            isMobile ? 'mb-0' : 'group-hover:hidden',
          )}
        >
          <p className="bg-clip-text text-2xl font-bold text-transparent bg-[linear-gradient(90deg,#c15847_0%,#743b38_100%)]">
            {formatPrice(product.price)}
          </p>
          {catalogItem?.priceHint && (
            <p className="mt-0.5 text-xs text-foreground/55">{catalogItem.priceHint}</p>
          )}
          {catalogItem?.cardPaymentLabel && (
            <p className="mt-2 text-sm text-foreground/65">ou {catalogItem.cardPaymentLabel}</p>
          )}
        </div>
      )}
    </>
  );

  const actionsBlock = (
    <div onClick={(e) => e.stopPropagation()}>
      {product && isConsultoria ? (
        <div className="space-y-2">
          <a
            href={CONSULTORIA_PRECADASTRO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-lg py-3 text-base font-semibold border-0 bg-gradient-to-r from-[#b84f3e] to-[#743b38] text-primary-foreground shadow-sm transition-[filter] duration-200 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label={`Fazer pré-cadastro na ${title}`}
          >
            Fazer pré-cadastro
          </a>
          {detailsLink}
        </div>
      ) : product ? (
        <div className="space-y-2">
          {!isAvailable ? (
            <>
              <p
                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-lg py-3 px-4 text-sm font-semibold text-foreground/80 bg-muted/60 border border-border/60"
                aria-live="polite"
              >
                Em breve no app
              </p>
              {detailsLink}
            </>
          ) : isInCart ? (
            <>
              <p className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-lg py-3 px-4 text-sm font-semibold text-foreground/80 bg-muted/60 border border-border/60">
                Já no carrinho
              </p>
              {detailsLink}
            </>
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
              {detailsLink}
            </>
          )}
        </div>
      ) : (
        detailsLink
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
          <LazyImage
            src={image}
            alt={`Capa do programa ${title}`}
            className="h-full w-full object-cover"
            width={280}
            height={373}
          />
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
      onClick={onClick}
      role="article"
      aria-label={`Programa: ${title}`}
    >
      <div className="absolute inset-0">
        <LazyImage
          src={image}
          alt={`Capa do programa ${title}`}
          className="h-full w-full"
          width={320}
          height={427}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col p-5">
        {categoryBadge}

        <div className="mt-auto">
          {titleAndMeta}

          {/* Sempre visível para teclado; no hover o overlay completo assume as ações */}
          <div className="mt-3 group-hover:hidden" onClick={(e) => e.stopPropagation()}>
            {detailsLink}
          </div>
        </div>

        {/* Ações completas no hover (mouse). Teclado usa “Ver detalhes” → modal. */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            absolute bottom-5 left-5 right-5 z-10
            hidden translate-y-2 opacity-0
            transition-all duration-300
            group-hover:block group-hover:translate-y-0 group-hover:opacity-100
          "
        >
          {actionsBlock}
        </div>
      </div>
    </article>
  );
});

ProgramCard.displayName = 'ProgramCard';

export default ProgramCard;
