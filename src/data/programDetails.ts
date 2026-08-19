import { catalogItems, getCatalogItemById, type CatalogItem } from '@/data/catalog';
import { formatPrice } from '@/lib/products';

export interface ProgramDetails {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  /** Preço do card (Pix/à vista) — derivado de `catalog.priceCents`. */
  price: string;
  /** Legenda sob o preço do card (ex.: "no Pix"). */
  priceHint?: string;
  /** Preço no cartão exibido no modal (consultoria). */
  cardPaymentLabel?: string;
  features?: string[];
  accessPeriod?: string;
  objective?: string;
  level?: string;
  duration?: string;
  workoutsPerWeek?: string;
  location?: string;
}

/** Frase padrão de valor — reforça que o produto é um programa completo no app. */
export const MAJUNITY_GO_VALUE_COPY =
  'Você recebe o programa completo no Majunity GO — com exercícios, vídeos demonstrativos, séries, repetições e intervalos de descanso.';

function toProgramDetails(item: CatalogItem): ProgramDetails {
  return {
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    price: formatPrice(item.priceCents),
    priceHint: item.priceHint,
    cardPaymentLabel: item.cardPaymentLabel,
    features: item.features,
    accessPeriod: item.accessPeriod,
    objective: item.objective,
    level: item.detailLevel ?? item.level,
    duration: item.duration,
    workoutsPerWeek: item.workoutsPerWeek,
    location: item.location,
  };
}

/** Detalhes do modal — derivados de `src/data/catalog.ts` (preço incluso). */
export const programDetails: Record<string, ProgramDetails> = Object.fromEntries(
  catalogItems.map((item) => [item.id, toProgramDetails(item)]),
);

export function getProgramDetailsById(id: string): ProgramDetails | undefined {
  const item = getCatalogItemById(id);
  return item ? toProgramDetails(item) : undefined;
}
