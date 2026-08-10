import { useEffect } from 'react';
import { resolvePageSeo, type PageSeoInput } from '@/lib/seo';

const MANAGED_ATTR = 'data-seo-managed';

function upsertMeta(
  attr: 'name' | 'property',
  key: string,
  content: string,
): void {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"][${MANAGED_ATTR}="true"]`,
  );
  if (!el) {
    el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute(MANAGED_ATTR, 'true');
    document.head.appendChild(el);
  } else {
    el.setAttribute(MANAGED_ATTR, 'true');
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"][${MANAGED_ATTR}="true"]`,
  );
  if (!el) {
    el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  }
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute(MANAGED_ATTR, 'true');
    document.head.appendChild(el);
  } else {
    el.setAttribute(MANAGED_ATTR, 'true');
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(data: Record<string, unknown> | Record<string, unknown>[]): void {
  const id = 'seo-json-ld';
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    el.setAttribute(MANAGED_ATTR, 'true');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(): void {
  document.getElementById('seo-json-ld')?.remove();
}

/**
 * Atualiza title, meta, canonical, OG, Twitter e JSON-LD da página atual.
 * Fonte única de SEO por rota (SPA). Prerender futuro poderá reutilizar resolvePageSeo.
 */
export function SeoHead(props: PageSeoInput) {
  const {
    title,
    description,
    path,
    robots,
    ogType,
    ogImage,
    ogImageAlt,
    jsonLd,
  } = props;

  useEffect(() => {
    const seo = resolvePageSeo({
      title,
      description,
      path,
      robots,
      ogType,
      ogImage,
      ogImageAlt,
      jsonLd,
    });

    document.title = seo.title;

    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', seo.robots);
    upsertLink('canonical', seo.canonical);

    upsertMeta('property', 'og:type', seo.ogType);
    upsertMeta('property', 'og:title', seo.ogTitle);
    upsertMeta('property', 'og:description', seo.ogDescription);
    upsertMeta('property', 'og:url', seo.ogUrl);
    upsertMeta('property', 'og:image', seo.ogImage);
    upsertMeta('property', 'og:image:secure_url', seo.ogImage);
    upsertMeta('property', 'og:image:alt', seo.ogImageAlt);

    upsertMeta('name', 'twitter:card', seo.twitterCard);
    upsertMeta('name', 'twitter:title', seo.ogTitle);
    upsertMeta('name', 'twitter:description', seo.ogDescription);
    upsertMeta('name', 'twitter:url', seo.ogUrl);
    upsertMeta('name', 'twitter:image', seo.ogImage);
    upsertMeta('name', 'twitter:image:alt', seo.ogImageAlt);

    if (seo.jsonLd) {
      upsertJsonLd(seo.jsonLd);
    } else {
      removeJsonLd();
    }
  }, [title, description, path, robots, ogType, ogImage, ogImageAlt, jsonLd]);

  return null;
}

export default SeoHead;
