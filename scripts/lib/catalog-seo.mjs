/**
 * Parser compartilhado do catálogo (texto de catalog.ts) para scripts Node
 * sem precisar resolver imports de imagens do Vite.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = join(__dirname, '../..');

export const SITE_URL = (
  process.env.VITE_SITE_URL || 'https://majusantospersonal.vercel.app'
).replace(/\/$/, '');

export const SITE_NAME = 'Maju Santos';
export const DEFAULT_TITLE = `${SITE_NAME} | Programas de Treino e Consultoria Personalizada`;
export const DEFAULT_DESCRIPTION =
  'Programas de treino para diferentes objetivos, níveis e rotinas, com acesso pelo Majunity GO. Para quem busca algo individual, consultoria personalizada com a Maju.';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg?v=2`;

const AVAILABLE_PRODUCT_IDS = new Set(['definicao_total']);

function strField(block, name) {
  const re = new RegExp(`${name}:\\s*'((?:\\\\'|[^'])*)'`);
  const m = block.match(re);
  return m ? m[1].replace(/\\'/g, "'") : undefined;
}

function numField(block, name) {
  const m = block.match(new RegExp(`${name}:\\s*(\\d+)`));
  return m ? Number(m[1]) : undefined;
}

export function loadCatalogItems() {
  const source = readFileSync(join(ROOT, 'src/data/catalog.ts'), 'utf8');
  const items = [];
  const blockRe =
    /\{\s*id:\s*'([^']+)',\s*productId:\s*'([^']+)',([\s\S]*?)type:\s*'(programa|consultoria)'/g;
  let match;
  while ((match = blockRe.exec(source)) !== null) {
    const id = match[1];
    const productId = match[2];
    const body = match[3];
    const type = match[4];
    const title = strField(body, 'title') || productId;
    const subtitle = strField(body, 'subtitle');
    const shortDescription = strField(body, 'shortDescription') || '';
    const description = strField(body, 'description') || shortDescription;
    const priceCents = numField(body, 'priceCents') ?? 0;
    items.push({
      id,
      productId,
      slug: productId.replace(/_/g, '-'),
      type,
      title,
      subtitle,
      shortDescription,
      description,
      priceCents,
      fullTitle: subtitle ? `${title} — ${subtitle}` : title,
      path: type === 'consultoria' ? '/consultoria-online' : `/programas/${productId.replace(/_/g, '-')}`,
      available: type === 'consultoria' || AVAILABLE_PRODUCT_IDS.has(productId),
    });
  }
  return items;
}

export function absoluteUrl(path = '/') {
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function titleWithBrand(pageTitle) {
  if (!pageTitle) return DEFAULT_TITLE;
  if (pageTitle.includes(SITE_NAME)) return pageTitle;
  return `${pageTitle} | ${SITE_NAME}`;
}
