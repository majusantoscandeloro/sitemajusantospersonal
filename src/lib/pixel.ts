/**
 * Meta Pixel. Os eventos só existem depois que a pessoa aceita cookies
 * e o script oficial foi carregado.
 */
import { applyFacebookClickCookie, readAttribution } from '@/lib/attribution';

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: Fbq;
};

let pixelRequested = false;

export function centsToReais(cents: number): number {
  if (!Number.isFinite(cents) || cents <= 0) return 0;
  return Math.round(cents) / 100;
}

function safeFbq(action: string, eventName: string, params?: Record<string, unknown>) {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq(action, eventName, params);
    }
  } catch {
    // pixel indisponível
  }
}

function withAttribution(params: Record<string, unknown>): Record<string, unknown> {
  const attribution = readAttribution();
  const extra: Record<string, unknown> = {};
  if (attribution.utm_source) extra.utm_source = attribution.utm_source;
  if (attribution.utm_medium) extra.utm_medium = attribution.utm_medium;
  if (attribution.utm_campaign) extra.utm_campaign = attribution.utm_campaign;
  if (attribution.utm_content) extra.utm_content = attribution.utm_content;
  return { ...params, ...extra };
}

export function ensureMetaPixel(pixelId: string): void {
  if (!pixelId || pixelRequested || typeof document === 'undefined') return;
  pixelRequested = true;
  applyFacebookClickCookie();

  const fbq: Fbq = function fbqStub(...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
      return;
    }
    fbq.queue?.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];

  window.fbq = window.fbq || fbq;
  if (!window._fbq) window._fbq = window.fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  window.fbq('init', pixelId);
}

export function trackPixelPageView(): void {
  safeFbq('track', 'PageView');
}

/** ViewContent: preço em centavos, id estável do catálogo (productId). */
export function trackViewContent(contentName: string, contentIds?: string[], valueCents?: number) {
  const value = valueCents == null ? undefined : centsToReais(valueCents);
  safeFbq(
    'track',
    'ViewContent',
    withAttribution({
      content_name: contentName,
      content_ids: contentIds,
      content_type: 'product',
      ...(value ? { value } : {}),
      currency: 'BRL',
    }),
  );
}

export function trackInitiateCheckout(
  items: Array<{
    product: { id: string; productId?: string; title: string; price: number };
    quantity: number;
  }>,
  totalCents: number,
) {
  const value = centsToReais(totalCents);
  safeFbq(
    'track',
    'InitiateCheckout',
    withAttribution({
      content_ids: items.map((item) => item.product.productId || item.product.id),
      content_name: items.map((item) => item.product.title),
      content_type: 'product',
      num_items: items.reduce((acc, item) => acc + item.quantity, 0),
      ...(value ? { value } : {}),
      currency: 'BRL',
    }),
  );
}

/**
 * Purchase só com valor conhecido em centavos.
 * Valor 0 ensinaria o algoritmo a otimizar compra sem receita.
 */
export function trackPurchase(
  valueCents: number,
  orderId?: string,
  contentIds?: string[],
  contentName?: string,
): boolean {
  const value = centsToReais(valueCents);
  if (!value) return false;
  safeFbq(
    'track',
    'Purchase',
    withAttribution({
      value,
      currency: 'BRL',
      ...(orderId ? { order_id: orderId } : {}),
      ...(contentIds && contentIds.length > 0 ? { content_ids: contentIds, content_type: 'product' } : {}),
      ...(contentName ? { content_name: contentName } : {}),
    }),
  );
  return true;
}
