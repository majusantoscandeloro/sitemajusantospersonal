import { useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Failure = () => {
  const navigate = useNavigate();

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
              Pagamento não concluído
            </h1>
          </div>

          {/* Message Card */}
          <div className="bg-card border border-destructive/20 rounded-lg p-6 md:p-8 mb-6">
            <p className="text-muted-foreground">
              Não foi possível processar seu pagamento. Nenhum valor foi debitado da sua conta. Por favor, tente novamente.
            </p>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => navigate('/checkout')}
            size="lg"
            className="w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Tentar novamente
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Failure;
