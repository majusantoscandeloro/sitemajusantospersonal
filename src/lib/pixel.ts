/**
 * Meta Pixel (Facebook) - eventos para conversão.
 * Só dispara se window.fbq existir (script do Pixel carregado no site).
 * Configure VITE_META_PIXEL_ID no .env para o ID do seu Pixel.
 */

declare global {
  interface Window {
    fbq?: (
      action: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

function safeFbq(
  action: string,
  eventName: string,
  params?: Record<string, unknown>
) {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq(action, eventName, params);
    }
  } catch {
    // ignorar
  }
}

/** ViewContent: ao abrir detalhes do programa (modal ou página) */
export function trackViewContent(contentName: string, contentIds?: string[], value?: number) {
  safeFbq('track', 'ViewContent', {
    content_name: contentName,
    content_ids: contentIds,
    content_type: 'product',
    value,
    currency: 'BRL',
  });
}

/** InitiateCheckout: ao clicar em "Comprar agora" */
export function trackInitiateCheckout(
  items: Array<{ product: { id: string; title: string; price: number }; quantity: number }>,
  totalPrice: number
) {
  const contentIds = items.map((i) => i.product.id);
  const contentNames = items.map((i) => i.product.title);
  const numItems = items.reduce((acc, i) => acc + i.quantity, 0);
  safeFbq('track', 'InitiateCheckout', {
    content_ids: contentIds,
    content_name: contentNames,
    content_type: 'product',
    num_items: numItems,
    value: totalPrice / 100, // valor em reais (price está em centavos)
    currency: 'BRL',
  });
}

/** Purchase: somente na página de sucesso quando status=approved */
export function trackPurchase(value: number, currency = 'BRL', orderId?: string) {
  safeFbq('track', 'Purchase', {
    value: value / 100,
    currency,
    order_id: orderId,
  });
}
