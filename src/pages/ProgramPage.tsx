import { Link, useParams } from 'react-router-dom';
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
  ChevronRight,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { Button } from '@/components/ui/button';
import WhatsAppIcon from '@/components/icons/WhatsApp';
import { getCatalogItemBySlug } from '@/data/catalog';
import { MAJUNITY_GO_VALUE_COPY } from '@/data/programDetails';
import { useCart } from '@/context/CartContext';
import { formatPrice, getProductById, isProductAvailable } from '@/lib/products';
import { titleWithBrand } from '@/lib/seo';
import { PATHS, WHATSAPP_NUMBER } from '@/config/site';
import { trackViewContent } from '@/lib/pixel';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProgramPage = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const item = getCatalogItemBySlug(slug);
  const { addItem, items } = useCart();
  const product = item ? getProductById(item.id) : null;
  const isInCart = product ? items.some((i) => i.product.id === product.id) : false;
  const isAvailable = isProductAvailable(product);
  const fullTitle = item
    ? item.subtitle
      ? `${item.title} — ${item.subtitle}`
      : item.title
    : '';

  useEffect(() => {
    if (item && product) {
      trackViewContent(fullTitle, [product.id], product.price);
    }
  }, [item, product, fullTitle]);

  if (!item || !product) {
    return (
      <div className="min-h-screen bg-background">
        <SeoHead
          title={titleWithBrand('Programa não encontrado')}
          description="O programa que você procura não está disponível."
          path={`/programas/${slug}`}
          robots="noindex, follow"
        />
        <Header />
        <main className="container mx-auto px-4 pb-20 pt-28 md:pt-32">
          <h1 className="font-display text-3xl font-bold">Programa não encontrado</h1>
          <p className="mt-3 text-muted-foreground">
            Esse endereço não corresponde a um programa do catálogo.
          </p>
          <Button asChild className="mt-8">
            <Link to={PATHS.programs}>Ver todos os programas</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Vim pelo seu site e tenho interesse no programa: ${fullTitle}`,
  )}`;

  const specs = [
    item.objective && { label: 'Objetivo', value: item.objective, icon: Target },
    (item.detailLevel || item.level) && {
      label: 'Nível recomendado',
      value: item.detailLevel ?? item.level,
      icon: BarChart3,
    },
    item.duration && { label: 'Duração', value: item.duration, icon: CalendarDays },
    item.workoutsPerWeek && {
      label: 'Treinos por semana',
      value: item.workoutsPerWeek,
      icon: Dumbbell,
    },
    item.location && { label: 'Onde treinar', value: item.location, icon: MapPin },
  ].filter(Boolean) as Array<{
    label: string;
    value: string;
    icon: typeof Target;
  }>;

  const handleBuyNow = () => {
    if (!isInCart) addItem(product);
    navigate(PATHS.checkout);
  };

  const seoDescription =
    item.shortDescription ||
    item.description.slice(0, 155) + (item.description.length > 155 ? '…' : '');

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title={titleWithBrand(fullTitle)}
        description={seoDescription}
        path={PATHS.program(slug)}
        ogType="product"
        ogImageAlt={fullTitle}
      />
      <Header />

      <main className="container mx-auto px-4 pb-20 pt-28 md:pt-32">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-foreground/60">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link to={PATHS.home} className="hover:text-primary">
                Início
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="inline h-3.5 w-3.5" />
            </li>
            <li>
              <Link to={PATHS.programs} className="hover:text-primary">
                Programas
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="inline h-3.5 w-3.5" />
            </li>
            <li className="text-foreground font-medium" aria-current="page">
              {item.title}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-2xl border border-border/50 bg-card">
            <img
              src={item.image}
              alt={`Capa do programa ${fullTitle}`}
              className="aspect-[3/4] w-full object-cover"
              width={640}
              height={853}
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C15847]">
              Programa de treino
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold leading-tight md:text-4xl">
              {item.title}
              {item.subtitle && (
                <span className="mt-1 block text-lg font-normal text-foreground/75 md:text-xl">
                  {item.subtitle}
                </span>
              )}
            </h1>

            <p className="mt-5 text-base leading-relaxed text-foreground/80 md:text-lg">
              {item.description}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-foreground/65">
              {MAJUNITY_GO_VALUE_COPY}
            </p>

            <div className="mt-6">
              <p className="bg-clip-text text-3xl font-bold text-transparent bg-[linear-gradient(90deg,#c15847_0%,#743b38_100%)]">
                {formatPrice(item.priceCents)}
              </p>
              {item.priceHint && (
                <p className="mt-0.5 text-sm text-foreground/55">{item.priceHint}</p>
              )}
              {item.accessPeriod && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-foreground/70">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  Acesso: {item.accessPeriod}
                </p>
              )}
            </div>

            {specs.length > 0 && (
              <dl className="mt-8 grid gap-3 sm:grid-cols-2">
                {specs.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border/50 bg-card/50 px-4 py-3"
                  >
                    <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-foreground/50">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {item.features && item.features.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-xl font-bold">O que inclui</h2>
                <ul className="mt-4 space-y-2">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#C15847]"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 space-y-3">
              {!isAvailable ? (
                <p className="rounded-lg border border-border/60 bg-muted/60 px-4 py-3 text-sm font-semibold text-foreground/80">
                  Em breve no app
                </p>
              ) : (
                <>
                  <Button
                    onClick={handleBuyNow}
                    className="h-auto min-h-[48px] w-full gap-2 text-base font-semibold"
                  >
                    <CreditCard className="h-4 w-4" aria-hidden="true" />
                    Comprar agora
                  </Button>
                  {!isInCart && (
                    <Button
                      variant="outline"
                      onClick={() => addItem(product)}
                      className="h-auto min-h-[48px] w-full gap-2 text-base font-semibold"
                    >
                      <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                      Adicionar ao carrinho
                    </Button>
                  )}
                </>
              )}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-base font-semibold transition-colors hover:bg-muted"
              >
                <WhatsAppIcon size={18} className="shrink-0" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProgramPage;
