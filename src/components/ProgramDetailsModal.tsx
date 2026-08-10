import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Clock,
  CheckCircle2,
  ShoppingCart,
  CreditCard,
  Target,
  BarChart3,
  CalendarDays,
  Dumbbell,
  MapPin,
  Smartphone,
} from 'lucide-react';
import { MAJUNITY_GO_VALUE_COPY, ProgramDetails } from '@/data/programDetails';
import { useCart } from '@/context/CartContext';
import { formatPrice, getProductById, isProductAvailable } from '@/lib/products';
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
  const isConsultoria = product?.type === 'consultoria';
  const isAvailable = isProductAvailable(product);

  useEffect(() => {
    if (open && program && product) {
      trackViewContent(program.title, [product.id], product.price);
    }
  }, [open, program, product]);

  if (!program) return null;

  const fullTitle = program.subtitle ? `${program.title} — ${program.subtitle}` : program.title;
  const whatsappMessage = encodeURIComponent(
    isConsultoria
      ? `Olá Maju! Vim pelo seu site e tenho interesse na Consultoria VIP "${fullTitle}". Pode me passar mais informações?`
      : `Olá! Vim pelo seu site e tenho interesse no programa: ${program.title}`
  );
  const whatsappUrl = `https://wa.me/5514910117854?text=${whatsappMessage}`;

  const ctaButtonClass =
    'w-full h-auto min-h-[42px] py-2.5 px-4 rounded-lg font-semibold text-base gap-2 [&_svg]:size-5';

  const specs = [
    program.objective && { label: 'Objetivo', value: program.objective, icon: Target },
    program.level && { label: 'Nível recomendado', value: program.level, icon: BarChart3 },
    program.duration && { label: 'Duração', value: program.duration, icon: CalendarDays },
    program.workoutsPerWeek && {
      label: 'Treinos por semana',
      value: program.workoutsPerWeek,
      icon: Dumbbell,
    },
    program.location && { label: 'Onde treinar', value: program.location, icon: MapPin },
  ].filter(Boolean) as Array<{
    label: string;
    value: string;
    icon: typeof Target;
  }>;

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;
    if (!isInCart) addItem(product);
    onOpenChange(false);
    navigate('/checkout');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;
    addItem(product);
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
          {/* Specs — programas prontos */}
          {!isConsultoria && specs.length > 0 && (
            <div>
              <h4 className="font-semibold text-lg mb-3">Sobre o programa</h4>
              <dl className="grid gap-3 sm:grid-cols-2">
                {specs.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex gap-3 rounded-lg border border-border/50 bg-card/40 px-3.5 py-3"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <div className="min-w-0">
                      <dt className="text-xs font-medium uppercase tracking-wide text-foreground/50">
                        {label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium text-foreground/90">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Acesso Majunity GO — frase padrão de valor */}
          {!isConsultoria && (
            <div className="flex gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3.5">
              <Smartphone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="text-sm font-semibold text-foreground">Acesso pelo Majunity GO</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/75">
                  {MAJUNITY_GO_VALUE_COPY}
                </p>
              </div>
            </div>
          )}

          {/* Features */}
          {program.features && program.features.length > 0 && (
            <div>
              <h4 className="font-semibold text-lg mb-3">O que está incluído</h4>
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
                {isConsultoria && program.cardPaymentLabel ? (
                  <>
                    <p className="bg-clip-text text-3xl font-bold text-transparent bg-[linear-gradient(90deg,#c15847_0%,#743b38_100%)]">
                      {program.cardPaymentLabel}
                    </p>
                    <p className="text-xs text-foreground/50 mt-1">no cartão</p>
                    <p className="text-sm text-foreground/65 mt-2">
                      ou {program.price}
                      {program.priceHint ? ` ${program.priceHint}` : ''}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="bg-clip-text text-3xl font-bold text-transparent bg-[linear-gradient(90deg,#c15847_0%,#743b38_100%)]">
                      {product ? formatPrice(product.price) : program.price}
                    </p>
                    {program.accessPeriod ? (
                      <p className="text-xs text-foreground/50 mt-1">
                        {program.accessPeriod.toLowerCase() === 'vitalício'
                          ? 'Acesso vitalício'
                          : `Acesso ao conteúdo por ${program.accessPeriod}`}
                      </p>
                    ) : null}
                  </>
                )}
                {isConsultoria && !program.cardPaymentLabel ? (
                  <p className="text-xs text-foreground/50 mt-1">
                    {program.subtitle === 'Mensal'
                      ? 'Plano mensal'
                      : program.subtitle === 'Semestral'
                        ? 'Plano semestral'
                        : 'Plano trimestral'}
                  </p>
                ) : null}
              </div>
              <Clock className="w-10 h-10 text-primary/50" />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            {!isConsultoria && !isAvailable && (
              <p
                className={`${ctaButtonClass} inline-flex items-center justify-center text-foreground/80 bg-muted/60 border border-border/60`}
                aria-live="polite"
              >
                Em breve no app
              </p>
            )}
            {!isConsultoria && isAvailable && (
              <>
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
              </>
            )}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center ${ctaButtonClass} border-0 bg-gradient-to-r from-[#b84f3e] to-[#743b38] text-primary-foreground shadow-sm transition-[filter] duration-200 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`}
            >
              <WhatsAppIcon size={20} className="size-5 shrink-0" />
              {isConsultoria ? 'Falar comigo no WhatsApp' : 'Falar no WhatsApp'}
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramDetailsModal;
