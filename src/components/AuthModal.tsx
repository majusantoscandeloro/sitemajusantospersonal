import { useState, useEffect } from 'react';
import { useAuth, AuthFlowError } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  /** E-mail pré-preenchido (ex.: pós-pagamento para criar conta e acessar o app) */
  initialEmail?: string;
  /** Abrir direto na aba de cadastro (útil quando initialEmail vem da compra) */
  defaultTab?: 'login' | 'signup';
}

const AuthModal = ({ open, onOpenChange, onSuccess, initialEmail = '', defaultTab = 'login' }: AuthModalProps) => {
  const { signIn, signUp } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [error, setError] = useState<string | null>(null);
  // Mensagem informativa (azul/info) — usada, por exemplo, quando trocamos
  // automaticamente para a aba "Entrar" porque o e-mail já tem conta.
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Sincronizar estado quando o modal abre. Pré-preenche e-mail (se vier)
  // e respeita o `defaultTab` informado pelo chamador. Antes este efeito
  // forçava a aba "signup" sempre que existia `initialEmail`, o que
  // sequestrava o fluxo do Checkout em que abrimos o modal já em "login".
  useEffect(() => {
    if (!open) return;
    if (initialEmail) setEmail(initialEmail);
    setActiveTab(defaultTab);
    setError(null);
    setInfo(null);
  }, [open, initialEmail, defaultTab]);

  const handleSubmit = async (e: React.FormEvent, isSignUp: boolean) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    try {
      if (isSignUp) {
        // Nome e WhatsApp obrigatórios só quando não for fluxo pós-pagamento (initialEmail)
        const optionalFields = !!initialEmail;
        if (!optionalFields) {
          if (!name.trim()) {
            setError('Por favor, informe seu nome completo.');
            setLoading(false);
            return;
          }
          if (!whatsapp.trim()) {
            setError('Por favor, informe seu WhatsApp.');
            setLoading(false);
            return;
          }
          const phoneNumbers = whatsapp.replace(/\D/g, '');
          if (phoneNumbers.length < 10) {
            setError('Por favor, insira um número de WhatsApp válido.');
            setLoading(false);
            return;
          }
        }
        await signUp(email, password, name.trim() || undefined, whatsapp.trim() || undefined);
      } else {
        await signIn(email, password);
      }

      // Limpar campos
      setEmail('');
      setPassword('');
      setName('');
      setWhatsapp('');
      setError(null);
      setInfo(null);

      // Fechar modal e chamar callback de sucesso
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      // Caso especial: tentando se cadastrar com e-mail que já tem conta.
      // Em vez de bloquear o cliente (ex.: pós-pagamento), trocamos
      // automaticamente para a aba "Entrar" mantendo o e-mail para que
      // ele só precise digitar a senha — após o login, o backend vincula
      // a compra recém-realizada à conta existente.
      if (
        isSignUp &&
        err instanceof AuthFlowError &&
        err.code === 'auth/email-already-in-use'
      ) {
        setActiveTab('login');
        setPassword('');
        setError(null);
        setInfo(
          'Já existe uma conta com este e-mail. Faça login com a sua senha para liberar o acesso da sua compra.',
        );
      } else {
        setError(err instanceof Error ? err.message : 'Erro ao autenticar');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'login' | 'signup');
    setError(null);
    setInfo(null);
    setPassword('');
    setName('');
    setWhatsapp('');
    // Importante: NÃO limpar o e-mail ao trocar de aba — assim o cliente
    // que veio do pós-pagamento (ou clicou em "Já tenho conta") mantém o
    // e-mail digitado entre as abas Cadastrar/Entrar.
  };

  // Função para formatar telefone brasileiro
  const formatPhoneNumber = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica máscara brasileira: (XX) XXXXX-XXXX
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setWhatsapp(formatted);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {activeTab === 'login' ? 'Entrar na sua conta' : 'Criar nova conta'}
          </DialogTitle>
          <DialogDescription>
            {activeTab === 'login'
              ? 'Digite seu email e senha para acessar sua conta'
              : 'Crie uma conta para continuar com o pagamento'}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="signup">Cadastrar</TabsTrigger>
          </TabsList>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {info && !error && (
            <Alert className="mt-4 border-primary/30 bg-primary/5">
              <Info className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">{info}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="login" className="mt-4">
            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Senha</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-4">
            <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Nome completo *</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-whatsapp">WhatsApp *</Label>
                <Input
                  id="signup-whatsapp"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={whatsapp}
                  onChange={handleWhatsAppChange}
                  required
                  disabled={loading}
                  maxLength={15}
                />
                <p className="text-xs text-muted-foreground">
                  Número completo com DDD
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email *</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Senha *</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">
                  Use pelo menos 6 caracteres
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  'Criar conta'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
