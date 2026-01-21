import { useNavigate, useSearchParams } from 'react-router-dom';
import { XCircle, ArrowLeft, Home, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Failure = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');
  const statusDetail = searchParams.get('status_detail');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Failure Icon */}
          <div className="mb-8">
            <div className="relative inline-block mb-6">
              <XCircle className="w-24 h-24 mx-auto text-destructive" />
              <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Pagamento Não Aprovado
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Não foi possível processar seu pagamento
            </p>
          </div>

          {/* Info Card */}
          <div className="bg-card border border-destructive/20 rounded-lg p-6 md:p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div className="text-left">
                <h2 className="font-semibold text-lg mb-2">O que pode ter acontecido?</h2>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside mb-4">
                  <li>Dados do cartão incorretos ou inválidos</li>
                  <li>Saldo insuficiente ou limite excedido</li>
                  <li>Transação recusada pelo banco emissor</li>
                  <li>Problemas temporários com o processador de pagamento</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  Não se preocupe, nenhum valor foi debitado da sua conta.
                </p>
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
                    <span className="font-semibold capitalize text-destructive">{status}</span>
                  </div>
                )}
                {statusDetail && (
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-muted-foreground">Detalhe:</span>
                    <span className="font-semibold text-xs capitalize">{statusDetail.replace(/_/g, ' ')}</span>
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
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar Novamente
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
              {' '}ou tente novamente com outro método de pagamento.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Failure;
