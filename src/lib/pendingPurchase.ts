const STORAGE_KEY = 'maju-santos-pending-purchase';

export interface PendingPurchase {
  valueCents: number;
  contentIds: string[];
  contentName: string;
}

export function savePendingPurchase(purchase: PendingPurchase): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(purchase));
  } catch {
    // não bloquear o pagamento se o storage falhar
  }
}

export function readPendingPurchase(): PendingPurchase | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingPurchase;
    if (!parsed || typeof parsed.valueCents !== 'number') return null;
    return {
      valueCents: parsed.valueCents,
      contentIds: Array.isArray(parsed.contentIds) ? parsed.contentIds.filter(Boolean) : [],
      contentName: typeof parsed.contentName === 'string' ? parsed.contentName : '',
    };
  } catch {
    return null;
  }
}
