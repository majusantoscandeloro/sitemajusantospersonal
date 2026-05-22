import { MP_BACKEND_URL } from '@/services/checkout';

/**
 * Consulta o status atual do pagamento na API do Mercado Pago via backend (token seguro no servidor).
 * O retorno na URL do checkout (pending/success) pode estar defasado em relação ao PIX — por isso este endpoint existe.
 *
 * Backend (Render): GET /payment-status?payment_id=NUMERO
 * Resposta: { "status": "approved" | "pending" | "rejected" } (campo `status` da API MP v1 GET /payments/:id).
 * No servidor: fetch `https://api.mercadopago.com/v1/payments/${id}` com Bearer token; defina CORS para o domínio Vercel.
 */
export async function fetchPaymentStatusFromBackend(paymentId: string): Promise<{
  status: string | null;
  source: 'firestore' | 'mercado_pago' | null;
  error: 'network' | 'http' | 'parse' | null;
}> {
  const id = paymentId.trim();
  if (!id) return { status: null, source: null, error: 'parse' };

  try {
    const url = `${MP_BACKEND_URL}/payment-status?payment_id=${encodeURIComponent(id)}`;
    const res = await fetch(url);
    if (!res.ok) return { status: null, source: null, error: 'http' };
    const data = (await res.json()) as { status?: string; source?: 'firestore' | 'mercado_pago' };
    if (typeof data.status === 'string') {
      return { status: data.status, source: data.source ?? null, error: null };
    }
    return { status: null, source: null, error: 'parse' };
  } catch {
    return { status: null, source: null, error: 'network' };
  }
}

export function isApprovedMpStatus(status: string | null): boolean {
  if (!status) return false;
  const s = status.toLowerCase();
  return s === 'approved' || s === 'authorized';
}
