import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from '@/config/site';

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${normalized}`;
}

export function absoluteAssetUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  // Assets do Vite (import) viram URLs absolutas no browser; no SSR/prerender futuro usamos path.
  if (path.startsWith('/')) return `${SITE_URL}${path}`;
  return path;
}

export function defaultOgImageUrl(): string {
  return absoluteUrl(DEFAULT_OG_IMAGE_PATH);
}

export type SeoRobots = 'index, follow' | 'noindex, follow' | 'noindex, nofollow';

export interface PageSeoInput {
  title?: string;
  description?: string;
  /** Path canônico relativo (ex.: /programas/definicao-total). */
  path: string;
  robots?: SeoRobots;
  ogType?: 'website' | 'product' | 'article';
  /** Path ou URL absoluta da imagem OG. */
  ogImage?: string;
  ogImageAlt?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export interface ResolvedPageSeo {
  title: string;
  description: string;
  canonical: string;
  robots: SeoRobots;
  ogType: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  ogImageAlt: string;
  twitterCard: 'summary_large_image';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function resolvePageSeo(input: PageSeoInput): ResolvedPageSeo {
  const title = input.title?.trim() || DEFAULT_TITLE;
  const description = input.description?.trim() || DEFAULT_DESCRIPTION;
  const canonical = absoluteUrl(input.path);
  const ogImage = input.ogImage
    ? absoluteAssetUrl(input.ogImage)
    : defaultOgImageUrl();

  return {
    title,
    description,
    canonical,
    robots: input.robots ?? 'index, follow',
    ogType: input.ogType ?? 'website',
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical,
    ogImage,
    ogImageAlt: input.ogImageAlt ?? `${SITE_NAME} — ${DEFAULT_TITLE}`,
    twitterCard: 'summary_large_image',
    jsonLd: input.jsonLd,
  };
}

export function titleWithBrand(pageTitle: string): string {
  const trimmed = pageTitle.trim();
  if (!trimmed) return DEFAULT_TITLE;
  if (trimmed.includes(SITE_NAME)) return trimmed;
  return `${trimmed} | ${SITE_NAME}`;
}
