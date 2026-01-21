import { useNavigate } from 'react-router-dom';
import { Clock, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Pending = () => {
  const navigate = useNavigate();

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
            <p className="text-muted-foreground">
              Seu pagamento está sendo processado. Isso pode levar alguns minutos. Você receberá um email quando o pagamento for confirmado.
            </p>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => navigate('/')}
            size="lg"
            className="w-full sm:w-auto"
          >
            <Home className="w-4 h-4 mr-2" />
            Voltar para a Home
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pending;
