import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  AuthError,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { saveUserProfile } from '@/lib/profile';
import { linkPurchasesForUser } from '@/services/linkPurchases';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string, whatsapp?: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

/**
 * Erro tipado dos fluxos de auth: preserva o `code` original do Firebase
 * (ex.: `auth/email-already-in-use`) junto com a mensagem amigável em PT-BR.
 * Permite que a UI reaja a códigos específicos sem fazer match por string.
 */
export class AuthFlowError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = 'AuthFlowError';
    this.code = code;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        void linkPurchasesForUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Perfil será atualizado no checkout se necessário
    } catch (error) {
      const authError = error as AuthError;
      throw new AuthFlowError(authError.code, getAuthErrorMessage(authError));
    }
  };

  const signUp = async (
    email: string,
    password: string,
    name?: string,
    whatsapp?: string
  ): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Salvar perfil no Firestore se houver nome e/ou WhatsApp (ex.: pós-compra só com nome)
      const trimmedName = name?.trim();
      const trimmedWhatsapp = whatsapp?.trim();
      if (userCredential.user && (trimmedName || trimmedWhatsapp)) {
        try {
          await saveUserProfile(userCredential.user.uid, {
            email,
            ...(trimmedName ? { name: trimmedName } : {}),
            ...(trimmedWhatsapp ? { whatsapp: trimmedWhatsapp } : {}),
          });
        } catch (profileError) {
          console.error('Erro ao salvar perfil após cadastro:', profileError);
          // Não falhar o cadastro se o perfil não for salvo
        }
      }
    } catch (error) {
      const authError = error as AuthError;
      throw new AuthFlowError(authError.code, getAuthErrorMessage(authError));
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      const authError = error as AuthError;
      throw new AuthFlowError(authError.code, getAuthErrorMessage(authError));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Função para traduzir mensagens de erro do Firebase
function getAuthErrorMessage(error: AuthError): string {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Email inválido. Por favor, verifique o formato do email.';
    case 'auth/user-disabled':
      return 'Esta conta foi desabilitada. Entre em contato com o suporte.';
    case 'auth/user-not-found':
      return 'Usuário não encontrado. Verifique seu email ou cadastre-se.';
    case 'auth/wrong-password':
      return 'Senha incorreta. Tente novamente.';
    case 'auth/email-already-in-use':
      return 'Este email já está cadastrado. Faça login ou use outro email.';
    case 'auth/operation-not-allowed':
      return 'Operação não permitida. Entre em contato com o suporte.';
    case 'auth/weak-password':
      return 'Senha muito fraca. Use pelo menos 6 caracteres.';
    case 'auth/network-request-failed':
      return 'Erro de conexão. Verifique sua internet e tente novamente.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde alguns minutos e tente novamente.';
    default:
      return error.message || 'Erro ao autenticar. Tente novamente.';
  }
}
