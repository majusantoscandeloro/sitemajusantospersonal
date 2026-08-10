import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ExternalLink, Smartphone, ShoppingBag, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LazyImage from '@/components/LazyImage';
import { useAuth } from '@/context/AuthContext';
import {
  getUserBilling,
  subscribeToUserBilling,
  subscribeToUserActivePurchases,
  convertTimestampToDate,
  type UserBilling,
  type UserPurchase,
} from '@/lib/billing';
import { getProductByProductId, formatPrice } from '@/lib/products';
import { linkPurchasesForUser } from '@/services/linkPurchases';
import NoIndexPageSeo from '@/components/NoIndexPageSeo';
import { PATHS } from '@/config/site';
import perfilStepImg from '@/assets/imagens_site/perfil.png';
import emailSenhaStepImg from '@/assets/imagens_site/email_senha.png';
import meusProgramasStepImg from '@/assets/imagens_site/meus_programas.png';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.majunitygo.app&pcampaignid=web_share';
const APP_STORE_URL = 'https://apps.apple.com/br/app/majunity-go/id6749276894';
const WHATSAPP_HELP =
  'https://wa.me/5514910117854?text=' +
  encodeURIComponent('Olá! Acabei de comprar e preciso de ajuda para acessar o aplicativo Majunity GO.');

const MyAccount = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const [billing, setBilling] = useState<UserBilling | null>(null);
  const [billingLoading, setBillingLoading] = useState(true);
  const [purchases, setPurchases] = useState<UserPurchase[]>([]);
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

    const unsubscribeBilling = subscribeToUserBilling(user.uid, (data) => {
      setBilling(data);
      setBillingLoading(false);
    });

    const unsubscribePurchases = subscribeToUserActivePurchases(user.uid, (list) => {
      setPurchases(list);
    });

    return () => {
      active = false;
      unsubscribeBilling();
      unsubscribePurchases();
    };
  }, [user]);

  /**
   * Lista de programas ativos do usuário.
   * Combina:
   *  - Compras encontradas em `purchases/{paymentId}` (filtradas por uid + status aprovado + não expiradas).
   *  - Fallback no `users/{uid}` (`billing.productId`) caso a coleção `purchases` ainda não esteja preenchida.
   * Deduplica por productId, priorizando o item com expiresAt mais recente.
   */
  const activeProducts = useMemo(() => {
    const map = new Map<
      string,
      { productId: string; expiresAt: Date | null; paymentId?: string; price?: number }
    >();

    purchases.forEach((p) => {
      if (!p.productId) return;
      const expiresAt = convertTimestampToDate(p.expiresAt);
      const existing = map.get(p.productId);
      const isNewer =
        !existing ||
        (expiresAt && (!existing.expiresAt || expiresAt > existing.expiresAt));
      if (isNewer) {
        map.set(p.productId, {
          productId: p.productId,
          expiresAt,
          paymentId: p.paymentId,
        });
      }
    });

    // Fallback: garante que o último produto registrado em users/{uid} também apareça
    if (billing?.paid && billing?.productId && !map.has(billing.productId)) {
      const expiresAt = convertTimestampToDate(billing.expiresAt);
      const stillValid = !expiresAt || expiresAt.getTime() >= Date.now();
      if (stillValid) {
        map.set(billing.productId, {
          productId: billing.productId,
          expiresAt,
          paymentId: billing.lastPaymentId || billing.paymentId,
        });
      }
    }

    return Array.from(map.values()).map((item) => ({
      ...item,
      product: getProductByProductId(item.productId),
    }));
  }, [purchases, billing]);

  const hasActivePurchase = activeProducts.length > 0;
  const fallbackExpiresAt = useMemo(
    () => convertTimestampToDate(billing?.expiresAt),
    [billing?.expiresAt]
  );
  const isExpired =
    !hasActivePurchase && !!fallbackExpiresAt && fallbackExpiresAt.getTime() < Date.now();

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
        <NoIndexPageSeo title="Minha conta" path={PATHS.account} />
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
      <NoIndexPageSeo title="Minha conta" path={PATHS.account} />
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

          {/* Lista de programas ativos */}
          {hasActivePurchase ? (
            <section className="mb-6 space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  {activeProducts.length === 1
                    ? 'Acesso liberado'
                    : `${activeProducts.length} programas liberados`}
                </span>
              </div>

              {activeProducts.map(({ productId, product, expiresAt, paymentId }) => (
                <article
                  key={productId}
                  className="bg-card border border-primary/30 rounded-lg p-6 md:p-8"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {product?.image && (
                      <div className="w-full md:w-44 aspect-square rounded-lg overflow-hidden bg-muted shrink-0">
                        <LazyImage
                          src={product.image}
                          alt={`Imagem do programa ${product.title}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <h2 className="font-display text-2xl font-bold">
                        {product?.title || productId}
                      </h2>
                      {product?.description && (
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      )}
                      <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm">
                        {product?.price !== undefined && (
                          <div>
                            <span className="text-muted-foreground">Valor pago: </span>
                            <span className="font-medium text-foreground">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">Acesso: </span>
                          <span className="font-medium text-foreground">
                            {expiresAt
                              ? `válido até ${expiresAt.toLocaleDateString('pt-BR')}`
                              : 'vitalício'}
                          </span>
                        </div>
                        {paymentId && (
                          <div className="w-full">
                            <span className="text-muted-foreground">ID da transação: </span>
                            <span className="font-mono text-xs text-foreground">{paymentId}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
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
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-5 h-5 text-primary" />
              <h2 className="font-display text-xl font-bold">Como acessar seu treino no app</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Siga os passos abaixo para abrir o seu programa no aplicativo <strong className="text-foreground">Majunity GO</strong>.
            </p>

            {/* Passo 1 - Baixar o app */}
            <div className="border border-border rounded-lg p-4 md:p-5 mb-4">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                  1
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Baixe o aplicativo Majunity GO</h3>
                  <p className="text-sm text-muted-foreground">
                    Escolha a loja conforme o seu celular.
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 sm:ml-11">
                <Button variant="outline" className="w-full justify-between min-h-[48px]" asChild>
                  <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                    iPhone (App Store)
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-between min-h-[48px]" asChild>
                  <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                    Android (Play Store)
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Passo 2 - Escolher perfil ALUNO */}
            <div className="border border-border rounded-lg p-4 md:p-5 mb-4">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                  2
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Abra o app e escolha o perfil ALUNO</h3>
                  <p className="text-sm text-muted-foreground">
                    Na primeira tela, toque em <strong className="text-foreground">ALUNO</strong>.
                  </p>
                </div>
              </div>
              <div className="sm:ml-11 max-w-[220px] mx-auto sm:mx-0">
                <div className="rounded-lg overflow-hidden border border-border bg-muted">
                  <LazyImage
                    src={perfilStepImg}
                    alt="Tela do app pedindo para escolher entre Personal e Aluno, com Aluno destacado"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Passo 3 - Login */}
            <div className="border border-border rounded-lg p-4 md:p-5 mb-4">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                  3
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Faça login com o mesmo e-mail e senha do site</h3>
                  <p className="text-sm text-muted-foreground">
                    Use exatamente o mesmo e-mail (<strong className="text-foreground">{user.email}</strong>) e a senha
                    que você criou aqui.
                  </p>
                </div>
              </div>
              <div className="sm:ml-11 max-w-[220px] mx-auto sm:mx-0">
                <div className="rounded-lg overflow-hidden border border-border bg-muted">
                  <LazyImage
                    src={emailSenhaStepImg}
                    alt="Tela de login do app com os campos de e-mail e senha destacados"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Passo 4 - Meus Programas */}
            <div className="border border-border rounded-lg p-4 md:p-5 mb-4">
              <div className="flex items-start gap-3 mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                  4
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Toque em "Meus Programas"</h3>
                  <p className="text-sm text-muted-foreground">
                    Na <strong className="text-foreground">Área do Aluno</strong>, toque no card{' '}
                    <strong className="text-foreground">Meus Programas</strong> para acessar o seu treino.
                  </p>
                </div>
              </div>
              <div className="sm:ml-11 max-w-[220px] mx-auto sm:mx-0">
                <div className="rounded-lg overflow-hidden border border-border bg-muted">
                  <LazyImage
                    src={meusProgramasStepImg}
                    alt="Área do aluno no app com o card Meus Programas destacado"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Dica final */}
            <div className="bg-muted/40 border border-border rounded-lg p-4 md:p-5 mb-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Dica:</strong> se o programa não aparecer logo após o pagamento,
                aguarde alguns minutos e puxe a lista para baixo para atualizar.
              </p>
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
