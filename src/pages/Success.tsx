import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ExternalLink, Home, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/context/AuthContext';
import { trackPurchase } from '@/lib/pixel';

const PLAY_STORE_URL = import.meta.env.VITE_PLAY_STORE_URL as string | undefined;
const APP_STORE_URL = import.meta.env.VITE_APP_STORE_URL as string | undefined;
const WHATSAPP_APP_HELP =
  'https://wa.me/5514996536032?text=' +
  encodeURIComponent('Olá! Acabei de comprar e preciso do link do aplicativo / ajuda para acessar.');

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
            {isApproved && (
              <p className="text-sm text-muted-foreground mt-3">
                O conteúdo fica no <strong className="text-foreground">aplicativo Maju Santos</strong>. Use o
                mesmo e-mail da compra ao criar a conta abaixo para o acesso ser liberado.
              </p>
            )}
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
              <ol className="text-sm text-muted-foreground mb-4 list-decimal list-inside space-y-2">
                <li>Crie sua conta com o <strong className="text-foreground">mesmo e-mail da compra</strong>.</li>
                <li>Baixe o app nos links abaixo (ou peça o link pelo WhatsApp se precisar).</li>
              </ol>
              <div className="flex flex-col gap-2 mb-4">
                {PLAY_STORE_URL ? (
                  <Button variant="outline" className="w-full justify-between min-h-[48px]" asChild>
                    <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                      Abrir na Google Play
                      <ExternalLink className="w-4 h-4 shrink-0" />
                    </a>
                  </Button>
                ) : null}
                {APP_STORE_URL ? (
                  <Button variant="outline" className="w-full justify-between min-h-[48px]" asChild>
                    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                      Abrir na App Store
                      <ExternalLink className="w-4 h-4 shrink-0" />
                    </a>
                  </Button>
                ) : null}
                {!PLAY_STORE_URL && !APP_STORE_URL ? (
                  <p className="text-sm text-muted-foreground">
                    Use o WhatsApp abaixo para receber o link oficial do aplicativo na sua loja (Android ou
                    iPhone).
                  </p>
                ) : null}
                <Button variant="secondary" className="w-full min-h-[48px]" asChild>
                  <a href={WHATSAPP_APP_HELP} target="_blank" rel="noopener noreferrer">
                    WhatsApp — link do app / dúvidas
                  </a>
                </Button>
              </div>
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
