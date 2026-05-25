import { User, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

interface AccountButtonProps {
  /** Callback acionado quando o usuário NÃO está logado e clica no ícone. */
  onRequestLogin: () => void;
  /** Classe extra opcional (ex.: para esconder em breakpoints específicos). */
  className?: string;
}

/**
 * Botão de "Minha conta" no estilo ícone (gêmeo do CartButton).
 * Pensado para ficar visível na barra de navegação mobile ao lado do carrinho,
 * dando acesso direto à conta sem precisar abrir o menu hambúrguer.
 */
const AccountButton = ({ onRequestLogin, className }: AccountButtonProps) => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const handleClick = () => {
    if (authLoading) return;
    if (user) {
      navigate('/minha-conta');
    } else {
      onRequestLogin();
    }
  };

  const ariaLabel = authLoading
    ? 'Carregando conta'
    : user
    ? 'Minha conta'
    : 'Entrar na minha conta';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={authLoading}
      className={`relative min-h-[44px] min-w-[44px] h-11 w-11 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${className ?? ''}`}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {authLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
      ) : (
        <>
          <User className="w-5 h-5" aria-hidden="true" />
          {user && (
            <span
              className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background"
              aria-hidden="true"
            />
          )}
        </>
      )}
    </Button>
  );
};

export default AccountButton;
