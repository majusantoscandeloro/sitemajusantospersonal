import { useNavigate, useSearchParams } from 'react-router-dom';
import { Clock, ArrowLeft, Home, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Pending = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

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
              Pagamento Pendente
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Estamos aguardando a confirmação do seu pagamento
            </p>
          </div>

          {/* Info Card */}
          <div className="bg-card border border-yellow-500/20 rounded-lg p-6 md:p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h2 className="font-semibold text-lg mb-2">O que acontece agora?</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Seu pagamento está sendo processado. Isso pode levar alguns minutos ou até algumas horas, dependendo do método de pagamento escolhido.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Você receberá um email quando o pagamento for confirmado</li>
                  <li>O acesso ao programa será liberado automaticamente</li>
                  <li>Em caso de dúvidas, entre em contato conosco</li>
                </ul>
              </div>
            </div>

            {paymentId && (
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">ID do Pagamento:</span>
                  <span className="font-mono font-semibold">{paymentId}</span>
                </div>
                {status && (
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-semibold capitalize">{status}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex-1"
            >
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
            <Button
              onClick={() => navigate('/cart')}
              className="flex-1"
            >
              Ver Meu Carrinho
            </Button>
          </div>

          {/* Help Message */}
          <div className="mt-8 p-4 bg-muted rounded-lg text-sm text-center text-muted-foreground">
            <p>
              Precisa de ajuda? Entre em contato pelo{' '}
              <a
                href="https://wa.me/5514996536032"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                WhatsApp
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pending;
