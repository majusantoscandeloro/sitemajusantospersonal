import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ExternalLink, Smartphone, ShoppingBag, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LazyImage from '@/components/LazyImage';
import { useAuth } from '@/context/AuthContext';
import { getUserBilling, subscribeToUserBilling, convertTimestampToDate, type UserBilling } from '@/lib/billing';
import { getProductByProductId, formatPrice } from '@/lib/products';
import { linkPurchasesForUser } from '@/services/linkPurchases';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.majunitygo.app&pcampaignid=web_share';
const APP_STORE_URL = 'https://apps.apple.com/br/app/majunity-go/id6749276894';
const WHATSAPP_HELP =
  'https://wa.me/5514996536032?text=' +
  encodeURIComponent('Olá! Acabei de comprar e preciso de ajuda para acessar o aplicativo Majunity GO.');

const MyAccount = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const [billing, setBilling] = useState<UserBilling | null>(null);
  const [billingLoading, setBillingLoading] = useState(true);
  const [linkingPurchases, setLinkingPurchases] = useState(false);

  // Redireciona para home se não estiver logado (após auth carregar)
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Carrega billing e mantém listener em tempo real
  useEffect(() => {
    if (!user) return;

    let active = true;

    void (async () => {
      try {
        const initial = await getUserBilling(user.uid);
        if (active) {
          setBilling(initial);
          setBillingLoading(false);
        }
      } catch (error) {
        console.error('Erro ao carregar billing:', error);
        if (active) setBillingLoading(false);
      }
    })();

    const unsubscribe = subscribeToUserBilling(user.uid, (data) => {
      setBilling(data);
      setBillingLoading(false);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [user]);

  const product = useMemo(() => {
    if (!billing?.productId) return undefined;
    return getProductByProductId(billing.productId);
  }, [billing?.productId]);

  const expiresAtDate = useMemo(() => convertTimestampToDate(billing?.expiresAt), [billing?.expiresAt]);
  const isExpired = expiresAtDate ? expiresAtDate.getTime() < Date.now() : false;
  const hasActivePurchase = !!billing?.paid && !isExpired;

  const handleRefreshLink = async () => {
    if (!user) return;
    setLinkingPurchases(true);
    try {
      const result = await linkPurchasesForUser(user);
      if (result && result.linked === 0 && !billing?.paid) {
        alert(
          'Não encontramos nenhuma compra para este e-mail.\n\nSe você comprou com outro e-mail, faça logout e crie/entre com a conta usando o mesmo e-mail da compra.'
        );
      }
    } finally {
      setLinkingPurchases(false);
    }
  };

  if (authLoading || (isAuthenticated && billingLoading)) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-16 pt-24 md:pt-28">
        <div className="max-w-3xl mx-auto">
          {/* Saudação */}
          <header className="mb-8 text-center md:text-left">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Minha conta</h1>
            <p className="text-muted-foreground">
              Olá, <span className="text-foreground font-medium">{user.email}</span>
            </p>
          </header>

          {/* Card do produto comprado */}
          {hasActivePurchase && product ? (
            <section className="bg-card border border-primary/30 rounded-lg p-6 md:p-8 mb-6">
              <div className="flex items-center gap-2 text-primary mb-4">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">Acesso liberado</span>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                {product.image && (
                  <div className="w-full md:w-44 aspect-square rounded-lg overflow-hidden bg-muted shrink-0">
                    <LazyImage
                      src={product.image}
                      alt={`Imagem do programa ${product.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <h2 className="font-display text-2xl font-bold">{product.title}</h2>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Valor pago: </span>
                      <span className="font-medium text-foreground">{formatPrice(product.price)}</span>
                    </div>
                    {expiresAtDate && (
                      <div>
                        <span className="text-muted-foreground">Acesso válido até: </span>
                        <span className="font-medium text-foreground">
                          {expiresAtDate.toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    )}
                    {billing?.lastPaymentId && (
                      <div className="w-full">
                        <span className="text-muted-foreground">ID da transação: </span>
                        <span className="font-mono text-xs text-foreground">{billing.lastPaymentId}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="bg-card border border-border rounded-lg p-6 md:p-8 mb-6 text-center">
              <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <h2 className="font-display text-xl font-bold mb-2">
                {isExpired ? 'Seu acesso expirou' : 'Você ainda não tem programa ativo'}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {isExpired
                  ? 'O período de acesso ao programa terminou. Compre novamente para continuar treinando.'
                  : 'Se você comprou recentemente, clique em "Sincronizar compra" para vincular o pagamento à sua conta.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => navigate('/#programas')} size="lg">
                  Ver programas
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleRefreshLink}
                  disabled={linkingPurchases}
                >
                  {linkingPurchases ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sincronizando...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Sincronizar compra
                    </>
                  )}
                </Button>
              </div>
            </section>
          )}

          {/* Passo a passo de acesso ao app */}
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-primary" />
              <h2 className="font-display text-xl font-bold">Como acessar seu treino no app</h2>
            </div>
            <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground mb-6">
              <li>
                Baixe o aplicativo <strong className="text-foreground">Majunity GO</strong> na sua loja:
              </li>
              <li>
                Abra o app, escolha o perfil <strong className="text-foreground">ALUNO</strong>.
              </li>
              <li>
                Faça login com o <strong className="text-foreground">mesmo e-mail e senha</strong> usados aqui no site
                ({user.email}).
              </li>
              <li>
                Na tela inicial do aluno, toque em <strong className="text-foreground">Meus Programas</strong> para
                acessar seu treino.
              </li>
              <li>
                Se o programa não aparecer logo após o pagamento, aguarde alguns minutos e puxe a lista para baixo para
                atualizar.
              </li>
            </ol>

            <div className="grid gap-3 sm:grid-cols-2 mb-3">
              <Button variant="outline" className="w-full justify-between min-h-[48px]" asChild>
                <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                  Baixar para iPhone (App Store)
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-between min-h-[48px]" asChild>
                <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                  Baixar para Android (Play Store)
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </Button>
            </div>

            <Button variant="secondary" className="w-full min-h-[48px]" asChild>
              <a href={WHATSAPP_HELP} target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp — dúvidas ou suporte
              </a>
            </Button>
          </section>

          {/* Ações da conta */}
          <section className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate('/')}>
              Voltar para a Home
            </Button>
            <Button
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={async () => {
                await logout();
                navigate('/', { replace: true });
              }}
            >
              Sair da conta
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyAccount;
