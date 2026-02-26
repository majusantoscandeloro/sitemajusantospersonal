import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Home, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/context/AuthContext';
import { trackPurchase } from '@/lib/pixel';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const purchaseTracked = useRef(false);

  const status = searchParams.get('status') || searchParams.get('collection_status') || '';
  const paymentId = searchParams.get('payment_id') || searchParams.get('collection_id') || '';
  const preferenceId = searchParams.get('preference_id') || '';
  const emailFromUrl = searchParams.get('email') || '';

  const isApproved = status === 'approved' || status === 'APRO';

  // Meta Pixel: Purchase somente quando status aprovado (uma vez por página)
  useEffect(() => {
    if (!isApproved || purchaseTracked.current) return;
    purchaseTracked.current = true;
    // Valor pode vir da URL ou usar 0; o backend pode enviar no futuro
    const valueParam = searchParams.get('value');
    const value = valueParam ? Number(valueParam) : 0;
    trackPurchase(value, 'BRL', paymentId || undefined);
  }, [isApproved, searchParams, paymentId]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="relative inline-block mb-6">
              <CheckCircle2 className="w-24 h-24 mx-auto text-primary" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Pagamento confirmado!
            </h1>
          </div>

          <div className="bg-card border border-primary/20 rounded-lg p-6 md:p-8 mb-6">
            <p className="text-muted-foreground">
              Seu pagamento foi processado com sucesso. Você receberá um email de confirmação em breve.
            </p>
            {paymentId && (
              <p className="text-xs text-muted-foreground mt-3">
                ID da transação: {paymentId}
              </p>
            )}
          </div>

          {/* CTA: Criar conta para acessar o app (apenas se aprovado e não logado) */}
          {isApproved && !isAuthenticated && !user && (
            <div className="bg-muted/50 border border-border rounded-lg p-6 mb-6 text-left">
              <h2 className="font-display text-lg font-semibold mb-2 flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Acesse o app com sua conta
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Crie sua conta com o mesmo e-mail da compra para acessar os treinos no aplicativo.
              </p>
              <Button
                size="lg"
                className="w-full min-h-[48px]"
                onClick={() => setShowAuthModal(true)}
              >
                Criar conta para acessar o app
              </Button>
            </div>
          )}

          <Button
            onClick={() => navigate('/')}
            size="lg"
            className="w-full sm:w-auto min-h-[48px]"
          >
            <Home className="w-4 h-4 mr-2" />
            Voltar para a Home
          </Button>
        </div>
      </main>
      <Footer />

      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        initialEmail={emailFromUrl}
        defaultTab="signup"
      />
    </div>
  );
};

export default Success;
