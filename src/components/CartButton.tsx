import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CartButton = () => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const totalItems = getTotalItems();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => navigate('/cart')}
      className="relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      aria-label={`Carrinho de compras com ${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`}
    >
      <ShoppingCart className="w-5 h-5" aria-hidden="true" />
      {totalItems > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold rounded-full"
          aria-label={`${totalItems} ${totalItems === 1 ? 'item no carrinho' : 'itens no carrinho'}`}
        >
          {totalItems > 99 ? '99+' : totalItems}
        </Badge>
      )}
    </Button>
  );
};

export default CartButton;
