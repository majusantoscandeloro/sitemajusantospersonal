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
import teamMajuFlyer from '@/assets/imagens_site/team_maju.png';
import {
  EVENTOS_PATH,
  WELLNESS_EVENT,
  WELLNESS_INSCRICAO_PATH,
  WELLNESS_MAX_CAPACITY,
  WELLNESS_PENDING_CHECKOUT_KEY,
  WELLNESS_PRICES,
  WELLNESS_PRODUCT_IDS,
} from '@/data/wellnessExperience';
import { formatPrice, getProductDisplayName } from '@/lib/products';
import { digitsOnly, isValidWhatsapp, toE164Digits } from '@/lib/phone';
import { comprarProduto, wakeUpBackend } from '@/services/checkout';
import { fetchWellnessCapacity, type WellnessCapacity } from '@/services/wellnessCapacity';
import { trackInitiateCheckout } from '@/lib/pixel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

type TicketType = 'individual' | 'dupla';

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
  const [ticketType, setTicketType] = useState<TicketType>('individual');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    companionName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [capacity, setCapacity] = useState<WellnessCapacity | null>(null);
  const [capacityLoading, setCapacityLoading] = useState(true);

  const loadCapacity = async () => {
    const data = await fetchWellnessCapacity();
    setCapacity(data);
    if (!data.canBookDupla && ticketType === 'dupla') {
      setTicketType('individual');
    }
    setCapacityLoading(false);
  };

  useEffect(() => {
    document.title = 'Wellness Experience | Team Maju';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Uma manhã completa para cuidar do corpo, da mente e das suas conexões. Domingo, 26/07/2026 às 08h no Vixe Club, Marília.',
      );
    }
    wakeUpBackend();
    loadCapacity();
    const intervalId = window.setInterval(loadCapacity, 60_000);
    return () => {
      window.clearInterval(intervalId);
      document.title = 'Maju Santos | Personal Trainer - Treinos Personalizados Online';
    };
  }, []);

  useEffect(() => {
    if (!isInscricaoRoute) return;
    const timer = window.setTimeout(() => {
      document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [isInscricaoRoute]);

  useEffect(() => {
    if (capacity && !capacity.canBookDupla && ticketType === 'dupla') {
      setTicketType('individual');
    }
  }, [capacity, ticketType]);

  const price = WELLNESS_PRICES[ticketType];
  const productId = WELLNESS_PRODUCT_IDS[ticketType];
  const isSoldOut = capacity?.isFull ?? false;
  const cannotBookSelectedTicket =
    capacity != null &&
    (ticketType === 'individual' ? !capacity.canBookIndividual : !capacity.canBookDupla);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, whatsapp: formatPhoneNumberBR(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    if (ticketType === 'dupla' && !formData.companionName.trim()) {
      alert('Para inscrição em dupla, informe o nome do acompanhante.');
      return;
    }

    if (cannotBookSelectedTicket || isSoldOut) {
      alert('Não há vagas suficientes para este tipo de inscrição. Atualize a página e tente outra opção.');
      await loadCapacity();
      return;
    }

    setIsSubmitting(true);

    try {
      const pending = {
        formData,
        ticketType,
        productId,
        event: 'wellness_experience',
      };
      localStorage.setItem(WELLNESS_PENDING_CHECKOUT_KEY, JSON.stringify(pending));

      trackInitiateCheckout(
        [{ product: { id: productId, title: getProductDisplayName(productId), price }, quantity: 1 }],
        price,
      );

      const whatsappE164 = toE164Digits('+55', formData.whatsapp);
      const produtoNome = getProductDisplayName(productId);

      await comprarProduto({
        productId,
        produtoNome,
        email: formData.email.trim(),
        name: formData.name.trim(),
        whatsapp: whatsappE164,
        companionName:
          ticketType === 'dupla' ? formData.companionName.trim() : undefined,
      });
    } catch {
      setIsSubmitting(false);
      await loadCapacity();
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] text-[#2b2622]">
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

            {!isInscricaoRoute && (
              <Button
                asChild
                size="lg"
                className="mt-8 h-12 rounded-xl bg-[#b8734a] px-8 text-base font-semibold text-white hover:bg-[#a6653f]"
              >
                <Link to={WELLNESS_INSCRICAO_PATH}>Garanta sua vaga</Link>
              </Button>
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
            <div className="rounded-2xl border border-[#e0d2c0] bg-white/80 p-5 text-center shadow-sm">
              <MapPin className="mx-auto mb-3 h-6 w-6 text-[#b8734a]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8b7355]">Local</p>
              <p className="mt-1 font-semibold text-[#2b2622]">{WELLNESS_EVENT.location}</p>
              <p className="text-sm text-[#6b5b4f]">{WELLNESS_EVENT.city}</p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-display text-2xl font-semibold text-[#2b2622] md:text-3xl">
              O que te espera
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
                        <span className="text-[#8b7355]"> · de {WELLNESS_MAX_CAPACITY}</span>
                      </>
                    )}
                  </>
                ) : null}
              </div>
              <p className="mt-3 text-sm text-[#6b5b4f]">
                Preencha seus dados e finalize o pagamento pelo Mercado Pago.
              </p>
            </div>

            {isSoldOut ? (
              <div className="rounded-3xl border border-[#e0d2c0] bg-white/90 p-8 text-center shadow-[0_20px_60px_rgba(139,90,60,0.1)]">
                <p className="font-display text-2xl font-semibold text-[#2b2622]">Inscrições encerradas</p>
                <p className="mt-3 text-[#6b5b4f]">
                  Atingimos o limite de {WELLNESS_MAX_CAPACITY} pessoas para este evento. Obrigada pelo
                  interesse!
                </p>
              </div>
            ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-[#e0d2c0] bg-white/90 p-6 shadow-[0_20px_60px_rgba(139,90,60,0.1)] md:p-8"
            >
              <div className="space-y-4">
                <Label className="text-sm font-semibold text-[#2b2622]">Tipo de inscrição</Label>
                <RadioGroup
                  value={ticketType}
                  onValueChange={(value) => setTicketType(value as TicketType)}
                  className="grid gap-3 sm:grid-cols-2"
                  disabled={isSubmitting || capacityLoading}
                >
                  <label
                    htmlFor="ticket-individual"
                    className={cn(
                      'flex items-start gap-3 rounded-2xl border p-4 transition-colors',
                      capacity && !capacity.canBookIndividual
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer',
                      ticketType === 'individual'
                        ? 'border-[#b8734a] bg-[#faf3eb]'
                        : 'border-[#e0d2c0] bg-[#fcfaf7] hover:border-[#d4a574]/60',
                    )}
                  >
                    <RadioGroupItem
                      value="individual"
                      id="ticket-individual"
                      className="mt-1 border-[#b8734a] text-[#b8734a]"
                      disabled={capacity != null && !capacity.canBookIndividual}
                    />
                    <div>
                      <p className="font-semibold text-[#2b2622]">Individual</p>
                      <p className="text-sm text-[#6b5b4f]">1 pessoa</p>
                      <p className="mt-1 text-lg font-bold text-[#b8734a]">
                        {formatPrice(WELLNESS_PRICES.individual)}
                      </p>
                    </div>
                  </label>

                  <label
                    htmlFor="ticket-dupla"
                    className={cn(
                      'flex items-start gap-3 rounded-2xl border p-4 transition-colors',
                      capacity && !capacity.canBookDupla
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer',
                      ticketType === 'dupla'
                        ? 'border-[#b8734a] bg-[#faf3eb]'
                        : 'border-[#e0d2c0] bg-[#fcfaf7] hover:border-[#d4a574]/60',
                    )}
                  >
                    <RadioGroupItem
                      value="dupla"
                      id="ticket-dupla"
                      className="mt-1 border-[#b8734a] text-[#b8734a]"
                      disabled={capacity != null && !capacity.canBookDupla}
                    />
                    <div>
                      <p className="flex items-center gap-2 font-semibold text-[#2b2622]">
                        <Users className="h-4 w-4 text-[#b8734a]" />
                        Dupla
                      </p>
                      <p className="text-sm text-[#6b5b4f]">Você + 1 acompanhante</p>
                      {capacity && !capacity.canBookDupla && capacity.remaining === 1 && (
                        <p className="text-xs text-[#b8734a]">Só resta 1 vaga — use individual</p>
                      )}
                      <p className="mt-1 text-lg font-bold text-[#b8734a]">
                        {formatPrice(WELLNESS_PRICES.dupla)}
                      </p>
                    </div>
                  </label>
                </RadioGroup>
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

                {ticketType === 'dupla' && (
                  <div className="space-y-2">
                    <Label htmlFor="companionName" className="text-[#2b2622]">
                      Nome do acompanhante *
                    </Label>
                    <Input
                      id="companionName"
                      value={formData.companionName}
                      onChange={(e) =>
                        setFormData({ ...formData, companionName: e.target.value })
                      }
                      placeholder="Nome da segunda pessoa"
                      className="border-[#e0d2c0] bg-white text-[#2b2622] focus-visible:ring-[#b8734a]"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                )}

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
                  <span className="text-2xl font-bold text-[#b8734a]">{formatPrice(price)}</span>
                </div>
                {ticketType === 'dupla' && (
                  <p className="mt-1 text-xs text-[#8b7355]">
                    Inscrição válida para 2 pessoas no mesmo pagamento.
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || capacityLoading || cannotBookSelectedTicket}
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
