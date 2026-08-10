import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Brain,
  Calendar,
  Clock,
  Coffee,
  Dumbbell,
  Gift,
  Heart,
  Loader2,
  MapPin,
  Sparkles,
  Users,
} from 'lucide-react';
import teamMajuFlyer from '@/assets/imagens_site/team_maju.webp';
import {
  EVENTOS_PATH,
  WELLNESS_EVENT,
  WELLNESS_INSCRICAO_PATH,
  WELLNESS_MAX_PEOPLE,
  WELLNESS_MAX_SLOTS,
  WELLNESS_PENDING_CHECKOUT_KEY,
  WELLNESS_PRICE,
  WELLNESS_PRODUCT_ID,
  WELLNESS_REGISTRATION_OPEN,
} from '@/data/wellnessExperience';
import { formatPrice, getProductDisplayName } from '@/lib/products';
import { digitsOnly, isValidWhatsapp, toE164Digits } from '@/lib/phone';
import { comprarProduto, wakeUpBackend } from '@/services/checkout';
import { fetchWellnessCapacity, type WellnessCapacity } from '@/services/wellnessCapacity';
import { trackInitiateCheckout } from '@/lib/pixel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SeoHead from '@/components/SeoHead';
import { PATHS } from '@/config/site';
import { titleWithBrand } from '@/lib/seo';
import { buildWellnessEventJsonLd } from '@/lib/schema';

const activityIcons = {
  dumbbell: Dumbbell,
  coffee: Coffee,
  brain: Brain,
  gift: Gift,
} as const;

const formatPhoneNumberBR = (value: string) => {
  const numbers = digitsOnly(value).slice(0, 11);
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

const WellnessExperience = () => {
  const location = useLocation();
  const isInscricaoRoute = location.pathname === WELLNESS_INSCRICAO_PATH;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    companionName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [capacity, setCapacity] = useState<WellnessCapacity | null>(null);
  const [capacityLoading, setCapacityLoading] = useState(true);

  const loadCapacity = async (options?: { wakeBackend?: boolean; showLoading?: boolean }) => {
    if (options?.showLoading) setCapacityLoading(true);
    const data = await fetchWellnessCapacity({ wakeBackend: options?.wakeBackend });
    setCapacity(data);
    setCapacityLoading(false);
  };

  useEffect(() => {
    if (WELLNESS_REGISTRATION_OPEN) {
      loadCapacity({ wakeBackend: true, showLoading: true });

      const intervalId = window.setInterval(() => {
        loadCapacity({ wakeBackend: false });
      }, 15_000);

      const onVisible = () => {
        if (document.visibilityState === 'visible') {
          loadCapacity({ wakeBackend: false });
        }
      };
      document.addEventListener('visibilitychange', onVisible);

      return () => {
        window.clearInterval(intervalId);
        document.removeEventListener('visibilitychange', onVisible);
      };
    }

    setCapacityLoading(false);
  }, []);

  useEffect(() => {
    if (!isInscricaoRoute) return;
    const timer = window.setTimeout(() => {
      document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [isInscricaoRoute]);

  const isSoldOut = capacity?.isFull ?? false;
  const cannotBook = capacity != null && capacity.remaining < 1;
  const eventFinished = !WELLNESS_REGISTRATION_OPEN;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, whatsapp: formatPhoneNumberBR(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (eventFinished) {
      alert('Este evento já foi finalizado. As inscrições estão encerradas.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim()) {
      alert('Por favor, insira seu nome completo.');
      return;
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    if (!isValidWhatsapp('+55', formData.whatsapp)) {
      alert('Por favor, insira um WhatsApp válido com DDD.');
      return;
    }
    if (cannotBook || isSoldOut) {
      alert('Não há mais vagas disponíveis. Atualize a página e tente novamente.');
      await loadCapacity({ wakeBackend: true });
      return;
    }

    setIsSubmitting(true);

    try {
      const companion = formData.companionName.trim();
      const pending = {
        formData,
        ticketType: 'dupla' as const,
        productId: WELLNESS_PRODUCT_ID,
        event: 'wellness_experience',
      };
      localStorage.setItem(WELLNESS_PENDING_CHECKOUT_KEY, JSON.stringify(pending));

      trackInitiateCheckout(
        [
          {
            product: {
              id: WELLNESS_PRODUCT_ID,
              title: getProductDisplayName(WELLNESS_PRODUCT_ID),
              price: WELLNESS_PRICE,
            },
            quantity: 1,
          },
        ],
        WELLNESS_PRICE,
      );

      const whatsappE164 = toE164Digits('+55', formData.whatsapp);
      const produtoNome = getProductDisplayName(WELLNESS_PRODUCT_ID);

      await comprarProduto({
        productId: WELLNESS_PRODUCT_ID,
        produtoNome,
        email: formData.email.trim(),
        name: formData.name.trim(),
        whatsapp: whatsappE164,
        companionName: companion || undefined,
      });
    } catch {
      setIsSubmitting(false);
      await loadCapacity({ wakeBackend: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] text-[#2b2622]">
      <SeoHead
        title={titleWithBrand('Wellness Experience')}
        description="Uma manhã completa para cuidar do corpo, da mente e das suas conexões. Domingo, 26/07/2026 às 08h no Vixe Club, Av. das Esmeraldas, 2681 — Marília."
        path={isInscricaoRoute ? PATHS.wellnessInscricao : PATHS.wellness}
        robots={isInscricaoRoute ? 'noindex, follow' : 'index, follow'}
        jsonLd={isInscricaoRoute ? undefined : buildWellnessEventJsonLd()}
      />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#d4a574]/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#c9956d]/15 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-[#d4c4b0]/60 bg-[#f5efe6]/90 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="text-center sm:text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8b7355]">
              Team Maju
            </p>
            <p className="font-display text-lg font-semibold text-[#2b2622]">Wellness Experience</p>
          </div>
          <Link
            to={EVENTOS_PATH}
            className="text-sm font-medium text-[#8b5a3c] underline-offset-4 hover:underline"
          >
            Todos os eventos
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <section className="container mx-auto px-4 pb-10 pt-8 md:pt-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-[#c9956d]/50" />
              <Heart className="h-4 w-4 fill-[#b8734a] text-[#b8734a]" />
              <span className="h-px w-12 bg-[#c9956d]/50" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#6b5b4f]">
              Team Maju apresenta
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide text-[#2b2622] md:text-5xl">
              Wellness
            </h1>
            <p className="mt-1 font-display text-5xl italic text-[#b8734a] md:text-6xl">
              Experience
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5c4f44]">
              {WELLNESS_EVENT.pillars.map((pillar, index) => (
                <span key={pillar} className="flex items-center gap-4">
                  {index > 0 && <span className="text-[#c9956d]">•</span>}
                  {pillar}
                </span>
              ))}
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#5c4f44] md:text-lg">
              Uma manhã completa para cuidar do{' '}
              <strong className="font-semibold text-[#b8734a]">corpo</strong>, da{' '}
              <strong className="font-semibold text-[#b8734a]">mente</strong> e das suas{' '}
              <strong className="font-semibold text-[#b8734a]">conexões</strong>.
            </p>

            {eventFinished ? (
              <div className="mx-auto mt-8 inline-flex items-center rounded-full border border-[#e0d2c0] bg-white/90 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-[#8b5a3c]">
                Evento finalizado
              </div>
            ) : (
              !isInscricaoRoute && (
                <Button
                  asChild
                  size="lg"
                  className="mt-8 h-12 rounded-xl bg-[#b8734a] px-8 text-base font-semibold text-white hover:bg-[#a6653f]"
                >
                  <Link to={WELLNESS_INSCRICAO_PATH}>Garanta sua vaga</Link>
                </Button>
              )
            )}
          </div>

          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-[#e0d2c0] bg-white/70 shadow-[0_20px_60px_rgba(139,90,60,0.12)]">
            <img
              src={teamMajuFlyer}
              alt="Flyer do evento Wellness Experience - Team Maju"
              className="h-auto w-full object-cover"
            />
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#e0d2c0] bg-white/80 p-5 text-center shadow-sm">
              <Calendar className="mx-auto mb-3 h-6 w-6 text-[#b8734a]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8b7355]">Data</p>
              <p className="mt-1 font-semibold text-[#2b2622]">{WELLNESS_EVENT.date}</p>
            </div>
            <div className="rounded-2xl border border-[#e0d2c0] bg-white/80 p-5 text-center shadow-sm">
              <Clock className="mx-auto mb-3 h-6 w-6 text-[#b8734a]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8b7355]">Horário</p>
              <p className="mt-1 font-semibold text-[#2b2622]">{WELLNESS_EVENT.time}</p>
            </div>
            <div className="rounded-2xl border border-[#e0d2c0] bg-white/80 p-5 text-center shadow-sm md:col-span-1">
              <MapPin className="mx-auto mb-3 h-6 w-6 text-[#b8734a]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8b7355]">Local</p>
              <p className="mt-1 font-semibold text-[#2b2622]">{WELLNESS_EVENT.location}</p>
              <p className="text-sm text-[#6b5b4f]">({WELLNESS_EVENT.locationSubtitle})</p>
              <p className="mt-1 text-sm font-medium text-[#2b2622]">{WELLNESS_EVENT.address}</p>
              <p className="text-sm text-[#6b5b4f]">{WELLNESS_EVENT.city}</p>
              <a
                href={WELLNESS_EVENT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#b8734a] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a6653f]"
              >
                <MapPin className="h-4 w-4" />
                Ver localização
              </a>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-display text-2xl font-semibold text-[#2b2622] md:text-3xl">
              A programação
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {WELLNESS_EVENT.activities.map((activity) => {
                const Icon = activityIcons[activity.icon];
                return (
                  <div
                    key={activity.label}
                    className="flex flex-col items-center rounded-2xl border border-[#e0d2c0] bg-white/80 px-4 py-6 text-center shadow-sm"
                  >
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-[#d4a574]/40 bg-[#f8f1e8]">
                      <Icon className="h-6 w-6 text-[#b8734a]" />
                    </div>
                    <p className="text-sm font-semibold leading-snug text-[#2b2622]">
                      {activity.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="inscricao" className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-2xl">
            {eventFinished ? (
              <div className="rounded-3xl border border-[#e0d2c0] bg-white/90 p-8 text-center shadow-[0_20px_60px_rgba(139,90,60,0.1)]">
                <Sparkles className="mx-auto mb-3 h-6 w-6 text-[#b8734a]" />
                <p className="font-display text-2xl font-semibold text-[#2b2622]">Evento finalizado</p>
                <p className="mt-3 text-[#6b5b4f]">
                  O Wellness Experience já aconteceu. Obrigada a quem participou — fique de olho nos
                  próximos encontros da Team Maju.
                </p>
                <Button asChild variant="outline" className="mt-6 border-[#e0d2c0]">
                  <Link to={EVENTOS_PATH}>Voltar para Eventos</Link>
                </Button>
              </div>
            ) : (
              <>
            <div className="mb-8 text-center">
              <Sparkles className="mx-auto mb-3 h-6 w-6 text-[#b8734a]" />
              <h2 className="font-display text-3xl font-semibold text-[#2b2622]">
                Garanta sua vaga
              </h2>
              <p className="mt-2 font-display text-xl italic text-[#b8734a]">Vagas limitadas!</p>
              <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-[#e0d2c0] bg-white/80 px-4 py-2 text-sm text-[#5c4f44]">
                {capacityLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-[#b8734a]" />
                    Carregando vagas...
                  </>
                ) : capacity ? (
                  <>
                    <Users className="h-4 w-4 text-[#b8734a]" />
                    {capacity.isFull ? (
                      <span className="font-semibold text-[#b8734a]">Vagas esgotadas</span>
                    ) : (
                      <>
                        Faltam{' '}
                        <span className="font-semibold text-[#b8734a]">{capacity.remaining}</span>
                        {capacity.remaining === 1 ? ' vaga' : ' vagas'}
                        <span className="text-[#8b7355]">
                          {' '}
                          · até {capacity.maxPeople ?? WELLNESS_MAX_PEOPLE} pessoas
                        </span>
                      </>
                    )}
                  </>
                ) : null}
              </div>
              <p className="mt-2 text-xs text-[#8b7355]">
                {WELLNESS_MAX_SLOTS} inscrições · cada uma pode incluir 1 acompanhante (opcional)
              </p>
              <p className="mt-3 text-sm text-[#6b5b4f]">
                Inscrição única de {formatPrice(WELLNESS_PRICE)} — traga quem quiser ou venha só.
              </p>
            </div>

            {isSoldOut ? (
              <div className="rounded-3xl border border-[#e0d2c0] bg-white/90 p-8 text-center shadow-[0_20px_60px_rgba(139,90,60,0.1)]">
                <p className="font-display text-2xl font-semibold text-[#2b2622]">Inscrições encerradas</p>
                <p className="mt-3 text-[#6b5b4f]">
                  Atingimos o limite de {WELLNESS_MAX_SLOTS} inscrições para este evento. Obrigada pelo
                  interesse!
                </p>
              </div>
            ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-[#e0d2c0] bg-white/90 p-6 shadow-[0_20px_60px_rgba(139,90,60,0.1)] md:p-8"
            >
              <div className="rounded-2xl border border-[#e8dccf] bg-[#faf3eb] p-4">
                <p className="font-semibold text-[#2b2622]">Inscrição Wellness Experience</p>
                <p className="mt-1 text-sm text-[#6b5b4f]">
                  {formatPrice(WELLNESS_PRICE)} — você pode levar 1 acompanhante ou vir sozinha(o).
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#2b2622]">
                    Seu nome completo *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nome de quem está se inscrevendo"
                    className="border-[#e0d2c0] bg-white text-[#2b2622] focus-visible:ring-[#b8734a]"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companionName" className="text-[#2b2622]">
                    Nome do acompanhante <span className="font-normal text-[#8b7355]">(opcional)</span>
                  </Label>
                  <Input
                    id="companionName"
                    value={formData.companionName}
                    onChange={(e) =>
                      setFormData({ ...formData, companionName: e.target.value })
                    }
                    placeholder="Deixe em branco se for sozinha(o)"
                    className="border-[#e0d2c0] bg-white text-[#2b2622] focus-visible:ring-[#b8734a]"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#2b2622]">
                    E-mail *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="border-[#e0d2c0] bg-white text-[#2b2622] focus-visible:ring-[#b8734a]"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-[#2b2622]">
                    WhatsApp *
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handlePhoneChange}
                    placeholder="(00) 00000-0000"
                    className="border-[#e0d2c0] bg-white text-[#2b2622] focus-visible:ring-[#b8734a]"
                    inputMode="numeric"
                    maxLength={15}
                    required
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-[#8b7355]">
                    Usaremos este número para confirmar sua inscrição e enviar detalhes do evento.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#e8dccf] bg-[#faf3eb] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#5c4f44]">Total</span>
                  <span className="text-2xl font-bold text-[#b8734a]">{formatPrice(WELLNESS_PRICE)}</span>
                </div>
                <p className="mt-1 text-xs text-[#8b7355]">
                  1 inscrição — com ou sem acompanhante, mesmo valor.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || capacityLoading || cannotBook}
                onMouseEnter={wakeUpBackend}
                onFocus={wakeUpBackend}
                className="mt-6 h-12 w-full rounded-xl bg-[#b8734a] text-base font-semibold text-white hover:bg-[#a6653f] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Redirecionando ao pagamento...
                  </>
                ) : (
                  'Inscrever-se e pagar'
                )}
              </Button>

              <p className="mt-4 text-center text-xs text-[#8b7355]">
                Pagamento seguro via Mercado Pago (PIX, cartão e outros meios).
              </p>
            </form>
            )}
              </>
            )}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <div className="mx-auto max-w-3xl rounded-2xl bg-[#2b2622] px-6 py-8 text-center text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d4a574]">
              Team Maju
            </p>
            <p className="mt-2 font-display text-2xl font-semibold md:text-3xl">
              Você no seu melhor, <span className="text-[#d4a574]">sempre!</span>
            </p>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#e0d2c0] bg-[#efe6da] py-6 text-center text-sm text-[#6b5b4f]">
        <Heart className="mx-auto mb-2 h-4 w-4 fill-[#b8734a] text-[#b8734a]" />
        <p>© {new Date().getFullYear()} Team Maju · Wellness Experience</p>
      </footer>
    </div>
  );
};

export default WellnessExperience;
