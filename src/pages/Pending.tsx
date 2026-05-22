import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Clock, Home, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { getUserBilling, subscribeToUserBilling } from '@/lib/billing';
import { fetchPaymentStatusFromBackend, isApprovedMpStatus } from '@/services/paymentStatus';

const POLL_MS = 2500;
const POLL_MAX = 120;
const ALLOW_CONTINUE_AFTER = 6;

const Pending = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuth();

  const [isChecking, setIsChecking] = useState(false);
  const [isPollingMp, setIsPollingMp] = useState(false);
  const [manualMpCheck, setManualMpCheck] = useState(false);
  const [pollAttempts, setPollAttempts] = useState(0);
  const [lastMpStatus, setLastMpStatus] = useState<string | null>(null);
  const [queryParams, setQueryParams] = useState<{
    collection_id?: string;
    payment_id?: string;
    status?: string;
    external_reference?: string;
    [key: string]: string | undefined;
  }>({});

  // Ler query params do Mercado Pago
  useEffect(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    setQueryParams(params);
    
    // Log para debug (opcional, pode remover em produção)
    if (Object.keys(params).length > 0) {
      console.log('Query params do Mercado Pago:', params);
    }
  }, [searchParams]);

  const paymentIdFromUrl =
    searchParams.get('payment_id') || searchParams.get('collection_id') || '';

  const buildSuccessUrl = useCallback(() => {
    const p = new URLSearchParams();
    p.set('status', 'approved');
    if (paymentIdFromUrl) p.set('payment_id', paymentIdFromUrl);
    const pref = searchParams.get('preference_id');
    if (pref) p.set('preference_id', pref);
    const em = searchParams.get('email');
    if (em) p.set('email', em);
    return `/success?${p.toString()}`;
  }, [paymentIdFromUrl, searchParams]);

  /** A URL do retorno do MP costuma vir com status=pending mesmo após o PIX aprovado; consultamos a API via backend. */
  useEffect(() => {
    const urlStatus = (
      searchParams.get('status') ||
      searchParams.get('collection_status') ||
      ''
    ).toLowerCase();

    if (!paymentIdFromUrl) return;

    if (urlStatus === 'approved' || urlStatus === 'apro') {
      navigate(buildSuccessUrl(), { replace: true });
      return;
    }

    let cancelled = false;
    let attempts = 0;
    let busy = false;
    let tid = 0;

    const stopPolling = () => {
      if (tid) window.clearInterval(tid);
      tid = 0;
      setIsPollingMp(false);
    };

    const run = async () => {
      if (cancelled || busy || attempts >= POLL_MAX) {
        if (attempts >= POLL_MAX) stopPolling();
        return;
      }
      busy = true;
      attempts += 1;
      setPollAttempts(attempts);
      setIsPollingMp(true);
      try {
        const { status, error } = await fetchPaymentStatusFromBackend(paymentIdFromUrl);
        if (cancelled) return;
        setLastMpStatus(status);
        if (import.meta.env.DEV) {
          console.log(`[pending] tentativa ${attempts}: status=${status} error=${error}`);
        }
        if (isApprovedMpStatus(status)) {
          stopPolling();
          navigate(buildSuccessUrl(), { replace: true });
          return;
        }
        if (attempts >= POLL_MAX) stopPolling();
      } finally {
        busy = false;
      }
    };

    void run();
    tid = window.setInterval(() => void run(), POLL_MS);
    return () => {
      cancelled = true;
      stopPolling();
    };
  }, [paymentIdFromUrl, searchParams.toString(), navigate, buildSuccessUrl]);

  const handleCheckMpStatus = async () => {
    if (!paymentIdFromUrl) return;
    setManualMpCheck(true);
    try {
      const { status, error } = await fetchPaymentStatusFromBackend(paymentIdFromUrl);
      setLastMpStatus(status);
      if (isApprovedMpStatus(status)) {
        navigate(buildSuccessUrl(), { replace: true });
        return;
      }
      const detail = status
        ? `Status atual no Mercado Pago: "${status}".`
        : error === 'network'
        ? 'Não foi possível falar com nosso servidor agora.'
        : 'Não foi possível confirmar com o Mercado Pago agora.';
      alert(
        `${detail}\n\nSe você já recebeu o e-mail de aprovação do PIX, clique em "Já paguei, continuar" abaixo — seu acesso será liberado quando você criar a conta com o mesmo e-mail da compra.`
      );
    } finally {
      setManualMpCheck(false);
    }
  };

  const handleContinueAnyway = () => {
    navigate(buildSuccessUrl(), { replace: true });
  };

  // Listener para atualização automática quando webhook aprovar
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    let unsubscribe: (() => void) | null = null;

    // Configurar listener para mudanças em tempo real
    unsubscribe = subscribeToUserBilling(user.uid, (billing) => {
      if (billing?.paid === true) {
        // Pagamento aprovado! Redirecionar para home
        console.log('Pagamento aprovado! Redirecionando...');
        navigate('/', { replace: true });
      }
    });

    // Cleanup ao desmontar
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isAuthenticated, user, navigate]);

  // Função para verificar manualmente o status do pagamento
  const handleCheckPayment = async () => {
    if (!isAuthenticated || !user) {
      alert('Por favor, faça login para verificar o status do pagamento.');
      return;
    }

    setIsChecking(true);
    try {
      const billing = await getUserBilling(user.uid);
      
      if (billing?.paid === true) {
        // Pagamento aprovado! Redirecionar
        navigate('/', { replace: true });
      } else {
        alert('O pagamento ainda está em análise. Você receberá um email quando for confirmado.');
      }
    } catch (error) {
      console.error('Erro ao verificar pagamento:', error);
      alert('Erro ao verificar status do pagamento. Tente novamente.');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Pending Icon */}
          <div className="mb-8">
            <div className="relative inline-block mb-6">
              <Clock className="w-24 h-24 mx-auto text-yellow-500 animate-pulse" />
              <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Pagamento em análise
            </h1>
          </div>

          {/* Message Card */}
          <div className="bg-card border border-yellow-500/20 rounded-lg p-6 md:p-8 mb-6">
            <p className="text-muted-foreground mb-4">
              O Mercado Pago pode enviar você para esta página com &quot;pendente&quot; na barra de endereço mesmo depois
              do PIX ser aprovado — isso é normal. Estamos conferindo o status real automaticamente.
            </p>
            <p className="text-muted-foreground mb-4">
              Se o pagamento for confirmado, você será levado para a página de sucesso em instantes. Caso contrário,
              pode levar alguns minutos; você também receberá um e-mail quando for confirmado.
            </p>
            {(isPollingMp || manualMpCheck) && (
              <p className="text-sm text-primary flex items-center justify-center gap-2 mb-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Confirmando com o Mercado Pago…
              </p>
            )}
            {(queryParams.collection_id || queryParams.payment_id) && (
              <div className="mt-4 pt-4 border-t border-border/50 space-y-1">
                <p className="text-xs text-muted-foreground">
                  ID da transação: {queryParams.payment_id || queryParams.collection_id}
                </p>
                {lastMpStatus && (
                  <p className="text-xs text-muted-foreground">
                    Status atual no Mercado Pago: <span className="font-medium">{lastMpStatus}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {!isAuthenticated && (
            <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
              <h2 className="font-display text-lg font-semibold mb-2">Comprou sem estar logado?</h2>
              <p className="text-sm text-muted-foreground mb-3">
                No Mercado Pago use o link <strong className="text-foreground">«Voltar para [nome da loja]»</strong>{' '}
                (é o retorno para este site). Se esta página ainda disser pendente, use{' '}
                <strong className="text-foreground">Atualizar status do pagamento</strong> abaixo.
              </p>
              <p className="text-sm text-muted-foreground">
                Quando o pagamento for aprovado, crie sua conta neste site com o{' '}
                <strong className="text-foreground">mesmo e-mail usado na compra</strong> — o acesso será
                vinculado automaticamente. Se precisar do link do app, fale no{' '}
                <a
                  href="https://wa.me/5514996536032"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium underline-offset-4 hover:underline"
                >
                  WhatsApp
                </a>
                .
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Home className="w-4 h-4 mr-2" />
              Voltar para a Home
            </Button>

            {paymentIdFromUrl ? (
              <Button
                onClick={handleCheckMpStatus}
                size="lg"
                disabled={manualMpCheck}
                variant="default"
                className="w-full sm:w-auto"
              >
                {manualMpCheck ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Atualizar status do pagamento
                  </>
                )}
              </Button>
            ) : null}

            {paymentIdFromUrl && pollAttempts >= ALLOW_CONTINUE_AFTER ? (
              <Button
                onClick={handleContinueAnyway}
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Já paguei, continuar
              </Button>
            ) : null}

            {isAuthenticated && user && (
              <Button
                onClick={handleCheckPayment}
                size="lg"
                disabled={isChecking}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                {isChecking ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Já paguei, atualizar acesso
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Info sobre atualização automática */}
          {isAuthenticated && user && (
            <p className="text-xs text-muted-foreground mt-6">
              Seu acesso será atualizado automaticamente quando o pagamento for confirmado.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pending;
