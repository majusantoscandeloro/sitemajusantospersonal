import type { CatalogItem } from '@/data/catalog';
import { PATHS } from '@/config/site';

/**
 * Converte productId (snake_case) em slug de URL (kebab-case).
 * Ex.: hipertrofia_feminina_quadriceps → hipertrofia-feminina-quadriceps
 */
export function productIdToSlug(productId: string): string {
  return productId
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/_/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getCatalogItemSlug(item: CatalogItem): string {
  return productIdToSlug(item.productId);
}

/** Path canônico público do item (programas vs consultoria). */
export function getCatalogItemPath(item: CatalogItem): string {
  if (item.type === 'consultoria') return PATHS.consulting;
  return PATHS.program(getCatalogItemSlug(item));
}
