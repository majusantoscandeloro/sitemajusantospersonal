import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/products';
import { comprarProduto } from '@/services/checkout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LazyImage from '@/components/LazyImage';

// Lista de países com códigos telefônicos
const countries = [
  { code: '+55', name: 'Brasil', flag: '🇧🇷' },
  { code: '+1', name: 'Estados Unidos', flag: '🇺🇸' },
  { code: '+1', name: 'Canadá', flag: '🇨🇦' },
  { code: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: '+34', name: 'Espanha', flag: '🇪🇸' },
  { code: '+33', name: 'França', flag: '🇫🇷' },
  { code: '+49', name: 'Alemanha', flag: '🇩🇪' },
  { code: '+39', name: 'Itália', flag: '🇮🇹' },
  { code: '+44', name: 'Reino Unido', flag: '🇬🇧' },
  { code: '+52', name: 'México', flag: '🇲🇽' },
  { code: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: '+57', name: 'Colômbia', flag: '🇨🇴' },
  { code: '+51', name: 'Peru', flag: '🇵🇪' },
  { code: '+598', name: 'Uruguai', flag: '🇺🇾' },
];

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

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+55', // Brasil como padrão
    whatsapp: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para formatar telefone brasileiro
  const formatPhoneNumber = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica máscara brasileira: (XX) XXXXX-XXXX
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, whatsapp: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validação básica
    if (!formData.name.trim() || !formData.email.trim() || !formData.whatsapp.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios (nome, email e WhatsApp).');
      setIsSubmitting(false);
      return;
    }

    // Validar formato básico de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      alert('Por favor, insira um email válido.');
      setIsSubmitting(false);
      return;
    }

    // Validar telefone (deve ter pelo menos 10 dígitos)
    const phoneNumbers = formData.whatsapp.replace(/\D/g, '');
    if (phoneNumbers.length < 10) {
      alert('Por favor, insira um número de WhatsApp válido.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Criar título descritivo do pedido
      const orderTitle =
        items.length === 1
          ? items[0].product.title
          : `Pedido com ${items.length} ${items.length === 1 ? 'item' : 'itens'}`;

      // Calcular quantidade total (soma de todas as quantidades)
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

      // Chamar função genérica de compra do Mercado Pago
      await comprarProduto({
        title: orderTitle,
        price: totalPrice, // já está em centavos
        quantity: totalQuantity,
      });

      // Se chegou aqui, o redirecionamento foi feito
      // Não precisamos limpar o carrinho aqui, pois o usuário será redirecionado
      // O carrinho será limpo após o pagamento ser confirmado (via webhook ou callback)
    } catch (error) {
      // Erro já foi tratado no comprarProduto (console.error + alert)
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-muted-foreground mb-8">
              Adicione programas ao carrinho para continuar
            </p>
            <Button onClick={() => navigate('/cart')} size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Carrinho
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
              onClick={() => navigate('/cart')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Carrinho
            </Button>
            <h1 className="font-display text-3xl md:text-4xl font-bold">Checkout</h1>
            <p className="text-muted-foreground mt-2">
              Preencha seus dados para finalizar a compra
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp *</Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.countryCode}
                      onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Código" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={`${country.code}-${country.name}`} value={country.code}>
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.code}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="whatsapp"
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={handlePhoneChange}
                      placeholder={formData.countryCode === '+55' ? '(00) 00000-0000' : 'Número do telefone'}
                      className="flex-1"
                      maxLength={15}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Número completo: {formData.countryCode} {formData.whatsapp || '...'}
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processando...' : 'Ir para o Pagamento'}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-card border border-border rounded-lg p-6 h-fit">
              <h2 className="font-display text-xl font-bold mb-4">Resumo do Pedido</h2>
              <Separator className="mb-4" />

              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    {item.product.image && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <LazyImage
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm line-clamp-2">{item.product.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity}x {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <p className="font-semibold text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="mb-4" />

              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
