import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Home } from 'lucide-react';
import { formatPrice } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ORDERS_STORAGE_KEY = 'maju-santos-orders';

interface Order {
  orderId: string;
  items: Array<{
    product: {
      id: string;
      title: string;
      price: number;
    };
    quantity: number;
  }>;
  total: number;
  customer: {
    name: string;
    email: string;
    whatsapp?: string;
  };
  createdAt: string;
}

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    // Buscar pedido no localStorage
    try {
      const orders = JSON.parse(
        localStorage.getItem(ORDERS_STORAGE_KEY) || '[]'
      ) as Order[];
      const foundOrder = orders.find((o) => o.orderId === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      navigate('/');
    }
  }, [orderId, navigate]);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <CheckCircle2 className="w-20 h-20 mx-auto mb-4 text-primary" />
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Pedido Confirmado!
            </h1>
            <p className="text-muted-foreground">
              Obrigada pela sua compra, {order.customer.name}!
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 mb-6">
            <div className="mb-6">
              <h2 className="font-display text-xl font-bold mb-4">Detalhes do Pedido</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Número do Pedido:</span>
                  <span className="font-semibold font-mono">{order.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data:</span>
                  <span className="font-semibold">{formattedDate}</span>
                </div>
              </div>
            </div>

            <Separator className="mb-6" />

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Itens do Pedido</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold">{item.product.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantidade: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold ml-4">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="mb-6" />

            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-2xl text-primary">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 mb-6">
            <h2 className="font-display text-xl font-bold mb-4">Informações de Contato</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Nome:</span>
                <span className="ml-2 font-semibold">{order.customer.name}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <span className="ml-2 font-semibold">{order.customer.email}</span>
              </div>
              {order.customer.whatsapp && (
                <div>
                  <span className="text-muted-foreground">WhatsApp:</span>
                  <span className="ml-2 font-semibold">{order.customer.whatsapp}</span>
                </div>
              )}
            </div>
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

          {/* Info Message */}
          <div className="mt-8 p-4 bg-muted rounded-lg text-sm text-center text-muted-foreground">
            <p>
              Seu pedido foi registrado com sucesso. Em breve você receberá mais informações por email.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Success;
