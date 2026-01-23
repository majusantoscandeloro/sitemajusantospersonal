import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Clock, Home, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { getUserBilling, subscribeToUserBilling, convertTimestampToDate } from '@/lib/billing';

const Pending = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  
  const [isChecking, setIsChecking] = useState(false);
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
              Seu pagamento está sendo processado. Isso pode levar alguns minutos. Você receberá um email quando o pagamento for confirmado.
            </p>
            
            {/* Mostrar query params se existirem (opcional, para debug) */}
            {queryParams.collection_id && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  ID da transação: {queryParams.collection_id}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Home className="w-4 h-4 mr-2" />
              Voltar para a Home
            </Button>
            
            {isAuthenticated && user && (
              <Button
                onClick={handleCheckPayment}
                size="lg"
                disabled={isChecking}
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
