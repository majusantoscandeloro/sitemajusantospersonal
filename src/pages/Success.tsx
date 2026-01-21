import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Success = () => {
  const navigate = useNavigate();

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
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Pagamento confirmado!
            </h1>
          </div>

          {/* Message Card */}
          <div className="bg-card border border-primary/20 rounded-lg p-6 md:p-8 mb-6">
            <p className="text-muted-foreground">
              Seu pagamento foi processado com sucesso. Você receberá um email de confirmação em breve.
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

export default Success;
