import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LazyImage from '@/components/LazyImage';

const Cart = () => {
  const navigate = useNavigate();
  const { items, increment, decrement, removeItem, getTotalPrice, getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-muted-foreground/30" />
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mb-8">
              Adicione programas ao carrinho para continuar
            </p>
            <Button onClick={() => navigate('/')} size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ver Programas
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h1 className="font-display text-3xl md:text-4xl font-bold">Carrinho de Compras</h1>
            <p className="text-muted-foreground mt-2">
              {totalItems} {totalItems === 1 ? 'item' : 'itens'} no carrinho
            </p>
          </div>

          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-card border border-border rounded-lg p-4 md:p-6"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Image */}
                  {item.product.image && (
                    <div className="w-full md:w-32 h-48 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <LazyImage
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold mb-1">{item.product.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.product.description}</p>
                      <p className="text-lg font-semibold text-primary">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => decrement(item.product.id)}
                          className="h-8 w-8"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => increment(item.product.id)}
                          className="h-8 w-8"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <p className="text-lg font-bold">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.product.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          aria-label="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-card border border-border rounded-lg p-6 sticky bottom-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Subtotal</span>
                <span className="font-bold text-2xl text-primary">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <Separator />
              <Button
                onClick={() => navigate('/checkout')}
                className="w-full"
                size="lg"
              >
                Ir para Checkout
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
