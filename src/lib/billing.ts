import { doc, getDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface UserBilling {
  paid: boolean;
  expiresAt?: Timestamp | Date;
  paymentId?: string;
  status?: string;
  externalReference?: string;
  [key: string]: any; // Para outros campos que possam existir
}

/**
 * Buscar dados de billing do usuário no Firestore
 * Estrutura esperada: users/{uid}
 */
export async function getUserBilling(uid: string): Promise<UserBilling | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      
      // Retornar dados de billing se existirem
      // Pode estar em data.billing ou diretamente em data
      const billing = data.billing || data;
      
      return {
        paid: billing.paid || false,
        expiresAt: billing.expiresAt,
        paymentId: billing.paymentId,
        status: billing.status,
        externalReference: billing.externalReference,
        ...billing,
      } as UserBilling;
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao buscar billing:', error);
    throw new Error('Erro ao buscar status de pagamento');
  }
}

/**
 * Converter Timestamp do Firestore para Date
 */
export function convertTimestampToDate(timestamp: Timestamp | Date | undefined): Date | null {
  if (!timestamp) return null;
  
  if (timestamp instanceof Date) {
    return timestamp;
  }
  
  if (timestamp && typeof timestamp.toDate === 'function') {
    return timestamp.toDate();
  }
  
  return null;
}

/**
 * Listener para mudanças em tempo real no billing do usuário
 * @param uid - ID do usuário
 * @param callback - Função chamada quando há mudanças
 * @returns Função para cancelar o listener
 */
export function subscribeToUserBilling(
  uid: string,
  callback: (billing: UserBilling | null) => void
): () => void {
  try {
    const userRef = doc(db, 'users', uid);
    
    const unsubscribe = onSnapshot(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          const billing = data.billing || data;
          
          callback({
            paid: billing.paid || false,
            expiresAt: billing.expiresAt,
            paymentId: billing.paymentId,
            status: billing.status,
            externalReference: billing.externalReference,
            ...billing,
          } as UserBilling);
        } else {
          callback(null);
        }
      },
      (error) => {
        console.error('Erro no listener de billing:', error);
        callback(null);
      }
    );
    
    return unsubscribe;
  } catch (error) {
    console.error('Erro ao criar listener de billing:', error);
    return () => {}; // Retorna função vazia se houver erro
  }
}
