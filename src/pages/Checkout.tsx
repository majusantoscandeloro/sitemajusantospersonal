import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, Loader2 } from 'lucide-react';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { formatPrice, getProductDisplayName } from '@/lib/products';
import { comprarProduto, wakeUpBackend } from '@/services/checkout';
import { getUserProfile, saveUserProfile } from '@/lib/profile';
import { trackInitiateCheckout } from '@/lib/pixel';
import { digitsOnly, isValidWhatsapp, toE164Digits } from '@/lib/phone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LazyImage from '@/components/LazyImage';
import AuthModal from '@/components/AuthModal';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import NoIndexPageSeo from '@/components/NoIndexPageSeo';
import { PATHS } from '@/config/site';

// Lista de países com códigos telefônicos
const countries = [
  { code: '+55', name: 'Brasil', flag: '🇧🇷' },
  { code: '+1', name: 'Estados Unidos', flag: '🇺🇸' },
  { code: '+1', name: 'Canadá', flag: '🇨🇦' },
  { code: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: '+34', name: 'Espanha', flag: '🇪🇸' },
  { code: '+33', name: 'França', flag: '🇫🇷' },
  { code: '+49', name: 'Alemanha', flag: '🇩🇪' },
  { code: '+39', name: 'Itália', flag: '🇮🇹' },
  { code: '+44', name: 'Reino Unido', flag: '🇬🇧' },
  { code: '+52', name: 'México', flag: '🇲🇽' },
  { code: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: '+57', name: 'Colômbia', flag: '🇨🇴' },
  { code: '+51', name: 'Peru', flag: '🇵🇪' },
  { code: '+598', name: 'Uruguai', flag: '🇺🇾' },
];

interface PendingCheckout {
  formData: {
    name: string;
    email: string;
    countryCode: string;
    whatsapp: string;
  };
  programTitle?: string;
  productId?: string;
}

const PENDING_CHECKOUT_KEY = 'maju-santos-pending-checkout';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCart();
  const { user, loading: authLoading } = useAuth();
  const totalPrice = getTotalPrice();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+55',
    whatsapp: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  // Modal de login para o cliente que já tem conta com o e-mail digitado
  // (evita pagar e depois descobrir que não consegue criar conta no Firebase
  // porque o e-mail já existe).
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  // "Acorda" o backend (Render free tier) assim que a página de checkout
  // carrega, para reduzir o tempo de espera até abrir o Mercado Pago ao
  // clicar em "Comprar agora". Fire-and-forget: nunca bloqueia a UI.
  useEffect(() => {
    wakeUpBackend();
  }, []);

  // Buscar perfil do usuário quando logado (apenas para preencher formulário)
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user || authLoading) return;

      setLoadingProfile(true);
      try {
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setFormData((prev) => ({
            ...prev,
            name: profile.name || prev.name,
            email: user.email || prev.email,
            whatsapp: profile.whatsapp || prev.whatsapp,
          }));
        } else if (user.email) {
          setFormData((prev) => ({ ...prev, email: user.email || prev.email }));
        }
      } catch {
        if (user.email) {
          setFormData((prev) => ({ ...prev, email: user.email || prev.email }));
        }
      } finally {
        setLoadingProfile(false);
      }
    };

    loadUserProfile();
  }, [user, authLoading]);

  // Restaurar dados salvos (checkout sem login)
  useEffect(() => {
    if (user) return;
    try {
      const stored = localStorage.getItem(PENDING_CHECKOUT_KEY);
      if (stored) {
        const pending: PendingCheckout = JSON.parse(stored);
        setFormData(pending.formData);
      }
    } catch {
      // ignorar
    }
  }, [user]);

  // Máscara visual para BR (DDD + 9 dígitos). Aplicada apenas quando o DDI
  // selecionado é +55 — para os demais países, mantemos apenas dígitos, sem
  // máscara fixa, para não distorcer formatos internacionais.
  const formatPhoneNumberBR = (value: string): string => {
    const numbers = digitsOnly(value).slice(0, 11);
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (formData.countryCode === '+55') {
      setFormData({ ...formData, whatsapp: formatPhoneNumberBR(raw) });
    } else {
      setFormData({ ...formData, whatsapp: digitsOnly(raw).slice(0, 15) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert('Carrinho vazio. Adicione um programa para continuar.');
      return;
    }

    // Validação: email obrigatório; nome e WhatsApp recomendados
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      alert('Por favor, insira seu e-mail.');
      return;
    }
    if (!emailRegex.test(formData.email.trim())) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    if (!formData.name.trim()) {
      alert('Por favor, insira seu nome.');
      return;
    }
    if (!isValidWhatsapp(formData.countryCode, formData.whatsapp)) {
      alert(
        'Por favor, insira um número de WhatsApp válido (com DDD e sem o código do país, ele é selecionado ao lado).',
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const productId = items[0].product.productId;
      if (!productId) {
        throw new Error('Produto sem ID. Tente novamente.');
      }

      // Checagem proativa: se o cliente NÃO está logado e o e-mail digitado
      // já existe no Firebase, não deixamos seguir para o Mercado Pago.
      // Motivo: depois do pagamento ele tentaria criar conta com o mesmo
      // e-mail e o Firebase recusaria (`auth/email-already-in-use`), o que
      // bloqueia a liberação do acesso. Aqui pedimos para entrar primeiro.
      //
      // Observação: se o projeto tiver "Email enumeration protection"
      // ligado no Firebase, esta API devolve sempre array vazio. Nesse caso
      // o fluxo segue normalmente e a recuperação acontece no AuthModal
      // do /success (que troca para a aba "Entrar" mantendo o e-mail).
      if (!user) {
        try {
          const methods = await fetchSignInMethodsForEmail(
            auth,
            formData.email.trim(),
          );
          if (methods && methods.length > 0) {
            setAuthModalTab('login');
            setShowAuthModal(true);
            setIsSubmitting(false);
            return;
          }
        } catch (err) {
          if (import.meta.env.DEV) {
            console.warn(
              '[checkout] fetchSignInMethodsForEmail falhou (seguindo sem bloquear):',
              err,
            );
          }
        }
      }

      // Salvar dados no localStorage sempre: usados na página de sucesso
      // para montar o link wa.me "envia para si mesmo" com o passo a passo.
      // Também serve como fallback para restaurar o formulário se o cliente
      // voltar antes de concluir o pagamento.
      try {
        const pending: PendingCheckout = {
          formData,
          programTitle: items[0]?.product.title,
          productId,
        };
        localStorage.setItem(PENDING_CHECKOUT_KEY, JSON.stringify(pending));
      } catch {
        // ignorar — não bloquear o checkout por falha de storage
      }

      if (user) {
        try {
          // Salva o WhatsApp em E.164 (apenas dígitos com DDI). Como a
          // máscara visual é só uma escolha de UI por país, padronizar no
          // Firestore evita inconsistências entre web e app.
          await saveUserProfile(user.uid, {
            name: formData.name.trim(),
            whatsapp:
              toE164Digits(formData.countryCode, formData.whatsapp) ||
              formData.whatsapp.trim(),
            email: formData.email.trim(),
          });
        } catch {
          // continuar mesmo se falhar perfil
        }
      }

      // Meta Pixel: InitiateCheckout
      trackInitiateCheckout(items, totalPrice);

      const produtoNome =
        getProductDisplayName(productId) || items[0]?.product.title || '';

      // Normaliza o WhatsApp para E.164 apenas-dígitos (ex.: 5514998836693)
      // ANTES de enviar ao backend. É esse mesmo valor que o backend repassa
      // ao n8n / Evolution API, então precisamos garantir aqui o formato
      // internacional, sem máscara visual, parênteses, espaços ou hífens.
      const whatsappE164 = toE164Digits(formData.countryCode, formData.whatsapp);

      await comprarProduto({
        productId,
        produtoNome,
        uid: user?.uid,
        email: formData.email.trim(),
        name: formData.name.trim(),
        whatsapp: whatsappE164,
      });

      // Redirecionamento feito pelo comprarProduto; se não redirecionou, reabilitar botão
      setIsSubmitting(false);
    } catch {
      setIsSubmitting(false);
    }
  };

  const showFormLoading = authLoading || loadingProfile;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <NoIndexPageSeo title="Checkout" path={PATHS.checkout} />
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-muted-foreground mb-8">
              Adicione programas ao carrinho para continuar
            </p>
            <Button onClick={() => navigate('/cart')} size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Carrinho
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NoIndexPageSeo title="Checkout" path={PATHS.checkout} />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/cart')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Carrinho
          </Button>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-2">
            Preencha seus dados e clique em Comprar agora para ir ao pagamento
          </p>

          {!user && (
            <p className="text-sm text-muted-foreground mt-3">
              Já tem conta?{' '}
              <button
                type="button"
                className="text-primary font-medium hover:underline"
                onClick={() => {
                  setAuthModalTab('login');
                  setShowAuthModal(true);
                }}
              >
                Entrar para continuar
              </button>
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome completo"
                    disabled={showFormLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    readOnly={!!user}
                    disabled={showFormLoading}
                    className={user ? 'bg-muted cursor-not-allowed' : ''}
                  />
                  <p className="text-xs text-muted-foreground">
                    Use o mesmo e-mail para acessar o app após a compra
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp *</Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.countryCode}
                      onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                      disabled={showFormLoading}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Código" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((c) => (
                          <SelectItem key={`${c.code}-${c.name}`} value={c.code}>
                            <span className="flex items-center gap-2">
                              <span>{c.flag}</span>
                              <span>{c.code}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="whatsapp"
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={handlePhoneChange}
                      placeholder={formData.countryCode === '+55' ? '(00) 00000-0000' : 'Somente números'}
                      className="flex-1"
                      maxLength={formData.countryCode === '+55' ? 15 : 15}
                      disabled={showFormLoading}
                      inputMode="numeric"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Digite apenas o número do seu WhatsApp — o código do país é
                    selecionado ao lado.
                  </p>
                </div>

                <Alert className="border-primary/30 bg-primary/5 text-left">
                  <Info className="h-4 w-4 text-primary" />
                  <AlertTitle className="text-foreground">Depois de pagar no Mercado Pago</AlertTitle>
                  <AlertDescription className="text-muted-foreground space-y-2">
                    <p>
                      Em especial no <strong className="text-foreground">PIX</strong>, o site pode não abrir
                      sozinho. No Mercado Pago o botão pode aparecer como{' '}
                      <strong className="text-foreground">«Voltar para [nome da loja]»</strong> (ex.: conta ou
                      razão social cadastrada) — é o mesmo que voltar para este site.
                    </p>
                    <p>
                      Só ali você verá os próximos passos:{' '}
                      <strong className="text-foreground">criar a conta</strong> com o mesmo e-mail da compra e{' '}
                      <strong className="text-foreground">como baixar o app</strong>.
                    </p>
                  </AlertDescription>
                </Alert>

                <Button
                  type="submit"
                  className="w-full min-h-[48px] text-base"
                  size="lg"
                  disabled={isSubmitting || showFormLoading}
                  onMouseEnter={wakeUpBackend}
                  onFocus={wakeUpBackend}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Redirecionando ao pagamento...
                    </>
                  ) : (
                    'Comprar agora'
                  )}
                </Button>
              </form>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 h-fit">
              <h2 className="font-display text-xl font-bold mb-4">Resumo do Pedido</h2>
              <Separator className="mb-4" />
              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    {item.product.image && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <LazyImage
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm line-clamp-2">{item.product.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity}x {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <p className="font-semibold text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <Separator className="mb-4" />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total</span>
                <span className="bg-clip-text text-2xl font-bold text-transparent bg-[linear-gradient(90deg,#ff6a4a_0%,#e5487e_100%)]">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        initialEmail={formData.email.trim()}
        defaultTab={authModalTab}
      />
    </div>
  );
};

export default Checkout;
