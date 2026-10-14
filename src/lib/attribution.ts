const STORAGE_KEY = 'maju-santos-attribution';

const PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
] as const;

export type Attribution = Partial<Record<(typeof PARAMS)[number], string>>;

export function captureAttributionFromLocation(search: string): void {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const incoming: Attribution = {};
  for (const key of PARAMS) {
    const value = params.get(key)?.trim();
    if (value) incoming[key] = value.slice(0, 200);
  }
  if (Object.keys(incoming).length === 0) return;
  try {
    const previous = readAttribution();
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...previous, ...incoming }));
  } catch {
    // sessão indisponível
  }
}

export function readAttribution(): Attribution {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Attribution;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

/** Grava o clique do anúncio da Meta só depois do consentimento. */
export function applyFacebookClickCookie(): void {
  const fbclid = readAttribution().fbclid;
  if (!fbclid || typeof document === 'undefined') return;
  const value = `fb.1.${Date.now()}.${fbclid}`;
  document.cookie = `_fbc=${encodeURIComponent(value)}; path=/; max-age=7776000; SameSite=Lax`;
}
