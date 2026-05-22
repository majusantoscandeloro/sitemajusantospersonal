import type { User } from 'firebase/auth';
import { MP_BACKEND_URL } from '@/services/checkout';

export interface LinkPurchasesResult {
  linked: number;
  latestProductId: string | null;
  latestExpiresAt: string | null;
  latestPaymentId: string | null;
}

/**
 * Vincula compras feitas sem login (guest) ao usuário logado.
 * O backend procura purchases pelo e-mail do ID token e dá merge em users/{uid}.
 *
 * É idempotente: pode ser chamada todo login que não causa duplicação.
 */
export async function linkPurchasesForUser(user: User): Promise<LinkPurchasesResult | null> {
  try {
    const email = user.email?.trim().toLowerCase();
    if (!email) return null;

    const idToken = await user.getIdToken();

    const res = await fetch(`${MP_BACKEND_URL}/link-purchases-by-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.warn('[linkPurchases] backend respondeu erro:', res.status, text);
      return null;
    }

    const data = (await res.json()) as LinkPurchasesResult;
    return data;
  } catch (error) {
    console.warn('[linkPurchases] falha ao vincular compras:', error);
    return null;
  }
}
