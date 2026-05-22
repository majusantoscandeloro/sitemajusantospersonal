import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
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
 * Documento de uma compra individual gravada pelo backend em `purchases/{paymentId}`.
 * Permite ao usuário ter MAIS DE UM programa ativo ao mesmo tempo.
 */
export interface UserPurchase {
  paymentId: string;
  productId: string;
  uid?: string;
  email?: string;
  status?: string;
  expiresAt?: Timestamp | Date;
  createdAt?: Timestamp | Date;
  durationDays?: number;
  [key: string]: any;
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

/**
 * Normaliza um documento da coleção `purchases` para UserPurchase,
 * filtrando apenas compras aprovadas e dentro da validade.
 */
function isPurchaseActive(purchase: UserPurchase): boolean {
  const status = (purchase.status || '').toLowerCase();
  if (status && status !== 'approved' && status !== 'paid') return false;

  const expires = convertTimestampToDate(purchase.expiresAt);
  if (expires && expires.getTime() < Date.now()) return false;

  return true;
}

/**
 * Busca TODAS as compras ativas (aprovadas e não expiradas) do usuário.
 * Lê a coleção `purchases` (gravada pelo backend MP) filtrando por uid.
 *
 * Útil para liberar múltiplos programas no app e exibir o histórico
 * em "Minha conta".
 */
export async function getUserActivePurchases(uid: string): Promise<UserPurchase[]> {
  try {
    const purchasesRef = collection(db, 'purchases');
    const q = query(purchasesRef, where('uid', '==', uid));
    const snap = await getDocs(q);

    const purchases: UserPurchase[] = snap.docs.map((d) => ({
      paymentId: d.id,
      ...(d.data() as Omit<UserPurchase, 'paymentId'>),
    }));

    return purchases.filter(isPurchaseActive);
  } catch (error) {
    console.error('Erro ao buscar compras ativas:', error);
    return [];
  }
}

/**
 * Listener em tempo real das compras ativas do usuário.
 * Atualiza automaticamente quando o backend grava uma nova compra
 * ou muda o status de uma existente.
 */
export function subscribeToUserActivePurchases(
  uid: string,
  callback: (purchases: UserPurchase[]) => void
): () => void {
  try {
    const purchasesRef = collection(db, 'purchases');
    const q = query(purchasesRef, where('uid', '==', uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const purchases: UserPurchase[] = snapshot.docs.map((d) => ({
          paymentId: d.id,
          ...(d.data() as Omit<UserPurchase, 'paymentId'>),
        }));
        callback(purchases.filter(isPurchaseActive));
      },
      (error) => {
        console.error('Erro no listener de compras ativas:', error);
        callback([]);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error('Erro ao criar listener de compras ativas:', error);
    return () => {};
  }
}
