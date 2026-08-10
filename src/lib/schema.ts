import type { CatalogItem } from '@/data/catalog';
import { AVAILABLE_PRODUCT_IDS } from '@/data/catalog';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  PATHS,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_URL,
} from '@/config/site';
import { absoluteUrl } from '@/lib/seo';
import { getCatalogItemPath, getCatalogItemSlug } from '@/lib/slugs';
import { WELLNESS_EVENT, WELLNESS_PRICE } from '@/data/wellnessExperience';

function assetUrl(pathOrUrl: string | undefined): string {
  if (!pathOrUrl) return absoluteUrl(DEFAULT_OG_IMAGE_PATH);
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (pathOrUrl.startsWith('/')) return `${SITE_URL}${pathOrUrl}`;
  // Import Vite em runtime já costuma ser path absoluto (/assets/...)
  return pathOrUrl;
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildHomeJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: absoluteUrl(PATHS.home),
        description: DEFAULT_DESCRIPTION,
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'Person',
        name: SITE_NAME,
        jobTitle: 'Personal Trainer',
        url: absoluteUrl(PATHS.home),
        image: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
        sameAs: [WHATSAPP_URL, 'https://www.instagram.com/majusantospersonal/'],
      },
      {
        '@type': 'ProfessionalService',
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        url: absoluteUrl(PATHS.home),
        image: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
        areaServed: 'BR',
        telephone: '+55 14 91011-7854',
        priceRange: '$$',
        provider: {
          '@type': 'Person',
          name: SITE_NAME,
        },
      },
    ],
  };
}

export function buildProgramProductJsonLd(item: CatalogItem): Record<string, unknown> {
  const slug = getCatalogItemSlug(item);
  const path = getCatalogItemPath(item);
  const name = item.subtitle ? `${item.title} — ${item.subtitle}` : item.title;
  const isBuyable = AVAILABLE_PRODUCT_IDS.has(item.productId);

  const offer: Record<string, unknown> = {
    '@type': 'Offer',
    url: absoluteUrl(path),
    priceCurrency: 'BRL',
    price: (item.priceCents / 100).toFixed(2),
    availability: isBuyable
      ? 'https://schema.org/InStock'
      : 'https://schema.org/PreOrder',
  };

  const product: Record<string, unknown> = {
    '@type': 'Product',
    name,
    description: item.description,
    image: assetUrl(item.image),
    sku: item.productId,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: offer,
  };

  if (item.category) {
    product.category = item.category;
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      product,
      buildBreadcrumbJsonLd([
        { name: 'Início', path: PATHS.home },
        { name: 'Programas', path: PATHS.programs },
        { name: item.title, path: PATHS.program(slug) },
      ]),
    ],
  };
}

export function buildConsultingServiceJsonLd(
  plans: CatalogItem[],
): Record<string, unknown> {
  const offers = plans.map((plan) => ({
    '@type': 'Offer',
    name: plan.subtitle ? `${plan.title} — ${plan.subtitle}` : plan.title,
    description: plan.shortDescription || plan.description,
    priceCurrency: 'BRL',
    price: (plan.priceCents / 100).toFixed(2),
    url: absoluteUrl(PATHS.consulting),
    availability: 'https://schema.org/InStock',
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Consultoria VIP Online',
        description:
          'Acompanhamento individual com planejamento ajustado à rotina, suporte e análise de execução.',
        url: absoluteUrl(PATHS.consulting),
        provider: {
          '@type': 'Person',
          name: SITE_NAME,
        },
        areaServed: 'BR',
        offers,
      },
      buildBreadcrumbJsonLd([
        { name: 'Início', path: PATHS.home },
        { name: 'Consultoria Online', path: PATHS.consulting },
      ]),
    ],
  };
}

export function buildProgramsIndexJsonLd(
  programs: CatalogItem[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Programas de Treino',
        description:
          'Programas de treino prontos para academia ou casa, com diferentes objetivos e níveis.',
        url: absoluteUrl(PATHS.programs),
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: programs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absoluteUrl(getCatalogItemPath(item)),
            name: item.subtitle ? `${item.title} — ${item.subtitle}` : item.title,
          })),
        },
      },
      buildBreadcrumbJsonLd([
        { name: 'Início', path: PATHS.home },
        { name: 'Programas', path: PATHS.programs },
      ]),
    ],
  };
}

/** startDate ISO derivado dos dados reais do evento (26/07/2026 08:00 America/Sao_Paulo). */
const WELLNESS_START_ISO = '2026-07-26T08:00:00-03:00';

export function buildWellnessEventJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Event',
        name: WELLNESS_EVENT.title,
        description:
          'Uma manhã completa para cuidar do corpo, da mente e das suas conexões.',
        startDate: WELLNESS_START_ISO,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: WELLNESS_EVENT.location,
          address: {
            '@type': 'PostalAddress',
            streetAddress: WELLNESS_EVENT.address,
            addressLocality: 'Marília',
            addressRegion: 'SP',
            addressCountry: 'BR',
          },
        },
        organizer: {
          '@type': 'Person',
          name: SITE_NAME,
          url: absoluteUrl(PATHS.home),
        },
        offers: {
          '@type': 'Offer',
          price: (WELLNESS_PRICE / 100).toFixed(2),
          priceCurrency: 'BRL',
          url: absoluteUrl(PATHS.wellness),
          availability: 'https://schema.org/SoldOut',
        },
      },
      buildBreadcrumbJsonLd([
        { name: 'Início', path: PATHS.home },
        { name: 'Eventos', path: PATHS.events },
        { name: WELLNESS_EVENT.title, path: PATHS.wellness },
      ]),
    ],
  };
}
