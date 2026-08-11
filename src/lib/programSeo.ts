import {
  catalogCategoryDefs,
  getCatalogItemById,
  getCatalogItemByProductId,
  type CatalogItem,
} from '@/data/catalog';
import { getProgramSearchIntent } from '@/data/searchIntent';
import { titleWithBrand } from '@/lib/seo';

export function resolveProgramPageSeo(item: CatalogItem): {
  title: string;
  description: string;
} {
  const intent = getProgramSearchIntent(item.productId);
  const fullTitle = item.subtitle ? `${item.title} — ${item.subtitle}` : item.title;

  const title = titleWithBrand(intent?.seoTitle ?? fullTitle);
  const description =
    intent?.seoDescription ??
    (item.shortDescription ||
      (item.description.length > 155
        ? `${item.description.slice(0, 155)}…`
        : item.description));

  return { title, description };
}

/**
 * Programas relacionados: irmãos da mesma categoria do catálogo
 * (exceto o atual), até `limit`.
 */
export function getRelatedPrograms(item: CatalogItem, limit = 4): CatalogItem[] {
  const siblingIds = new Set<string>();

  for (const def of Object.values(catalogCategoryDefs)) {
    if (!('ids' in def)) continue;
    const ids = def.ids as readonly string[];
    if (!ids.includes(item.id)) continue;
    for (const id of ids) {
      if (id !== item.id) siblingIds.add(id);
    }
  }

  const related: CatalogItem[] = [];
  for (const id of siblingIds) {
    const sibling = getCatalogItemById(id);
    if (sibling && sibling.type === 'programa') related.push(sibling);
    if (related.length >= limit) break;
  }

  if (related.length >= limit) return related;

  // Fallback: mesmo local (academia/casa) quando a categoria tem poucos irmãos.
  for (const candidate of Object.values(catalogCategoryDefs)) {
    if (!('ids' in candidate)) continue;
    for (const id of candidate.ids as readonly string[]) {
      if (id === item.id || related.some((r) => r.id === id)) continue;
      const other = getCatalogItemById(id);
      if (!other || other.type !== 'programa') continue;
      if (item.location && other.location && item.location === other.location) {
        related.push(other);
      }
      if (related.length >= limit) return related;
    }
  }

  return related;
}

export function getRelatedByProductId(productId: string, limit = 4): CatalogItem[] {
  const item = getCatalogItemByProductId(productId);
  if (!item) return [];
  return getRelatedPrograms(item, limit);
}
