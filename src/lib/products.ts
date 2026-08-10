import {
  AVAILABLE_PRODUCT_IDS,
  catalogItems,
  getCatalogItemById,
  getCatalogItemByProductId,
  type CatalogItem,
  type ProductType,
} from '@/data/catalog';

export type { ProductType };

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number; // centavos
  productId: string;
  image?: string;
  category?: string;
  type: ProductType;
}

function toProduct(item: CatalogItem): Product {
  return {
    id: item.id,
    title: item.title,
    description: item.shortDescription,
    price: item.priceCents,
    productId: item.productId,
    image: item.image,
    category: item.category,
    type: item.type,
  };
}

/** Catálogo de checkout/carrinho — derivado de `src/data/catalog.ts`. */
export const products: Product[] = catalogItems.map(toProduct);

/** Indica se o produto pode ser comprado/adicionado ao carrinho neste momento. */
export function isProductAvailable(product: Product | undefined | null): boolean {
  if (!product) return false;
  if (product.type === 'consultoria') return true;
  return AVAILABLE_PRODUCT_IDS.has(product.productId);
}

export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(priceInCents / 100);
}

export function getProductById(id: string): Product | undefined {
  const item = getCatalogItemById(id);
  return item ? toProduct(item) : undefined;
}

export function getProductByProductId(productId: string): Product | undefined {
  const item = getCatalogItemByProductId(productId);
  return item ? toProduct(item) : undefined;
}

/**
 * Mapeamento explícito de `productId` → nome legível enviado ao backend/n8n.
 * Alguns produtos compartilham o mesmo `title` no catálogo e precisam desambiguar.
 */
export const PRODUCT_DISPLAY_NAMES: Readonly<Record<string, string>> = {
  definicao_total: 'Definição Total',
  hipertrofia_feminina_quadriceps: 'Hipertrofia Feminina - Quadríceps',
  hipertrofia_feminina: 'Hipertrofia Feminina - Glúteos',
  hipertrofia_feminina_superiores: 'Hipertrofia Feminina - Superiores',
  treino_em_casa_express: 'Treino em Casa Express',
  start_inicial: 'Start Inicial',
  lipedema: 'Lipedema',
  em_casa_sem_equipamento: 'Em Casa Sem Equipamento',
  abdominal_slim: 'Abdominal Slim',
  definicao_feminina: 'Definição Feminina',
  casa_completo: 'Casa Completo',
  treino_de_20_minutos: 'Treino de 20 Minutos',
  hiit_sem_equipamento: 'HIIT Sem Equipamento',
  alongamento_e_flexibilidade: 'Alongamento e Flexibilidade',
  desafio_21_dias: 'Desafio 21 dias',
  desafio_30_dias: 'Desafio 30 dias',
  consultoria_mensal: 'Consultoria VIP — Mensal',
  consultoria_trimestral: 'Consultoria VIP — Trimestral',
  wellness_experience_individual: 'Wellness Experience - Individual (descontinuado)',
  wellness_experience_dupla: 'Wellness Experience',
};

function snakeCaseToTitleCase(productId: string): string {
  return productId
    .split('_')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getProductDisplayName(productId: string): string {
  if (!productId) return '';
  const fromMap = PRODUCT_DISPLAY_NAMES[productId];
  if (fromMap) return fromMap;

  const fromCatalog = getProductByProductId(productId)?.title;
  if (fromCatalog) return fromCatalog;

  return snakeCaseToTitleCase(productId);
}
