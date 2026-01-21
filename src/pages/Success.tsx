import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Home, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const preferenceId = searchParams.get('preference_id');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="relative inline-block mb-6">
              <CheckCircle2 className="w-24 h-24 mx-auto text-primary" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
              <Sparkles className="w-8 h-8 absolute -top-2 -right-2 text-primary animate-pulse" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Pagamento Aprovado!
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Parabéns! Seu pagamento foi confirmado com sucesso
            </p>
          </div>

          {/* Success Card */}
          <div className="bg-card border border-primary/20 rounded-lg p-6 md:p-8 mb-6">
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-primary mb-4">
                <CheckCircle2 className="w-6 h-6" />
                <p className="font-semibold text-lg">Tudo certo! Seu pedido está sendo processado.</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Você receberá um email de confirmação em breve com todos os detalhes do seu pedido e instruções para acessar seu programa.
              </p>
            </div>

            {(paymentId || preferenceId) && (
              <div className="pt-4 border-t border-border">
                {paymentId && (
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-muted-foreground">ID do Pagamento:</span>
                    <span className="font-mono font-semibold">{paymentId}</span>
                  </div>
                )}
                {preferenceId && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">ID da Preferência:</span>
                    <span className="font-mono font-semibold text-xs">{preferenceId}</span>
                  </div>
                )}
                {status && (
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-semibold capitalize text-primary">{status}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-muted/50 border border-border rounded-lg p-6 mb-6">
            <h2 className="font-semibold text-lg mb-4">Próximos Passos</h2>
            <ul className="text-sm text-muted-foreground space-y-2 text-left">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Verifique seu email para receber as instruções de acesso</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>O acesso ao programa será liberado automaticamente</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Em caso de dúvidas, entre em contato conosco pelo WhatsApp</span>
              </li>
            </ul>
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
              onClick={() => navigate('/')}
              className="flex-1"
            >
              Ver Mais Programas
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

export default Success;
