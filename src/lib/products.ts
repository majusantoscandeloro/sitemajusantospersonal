import quadricepsNovo from '@/assets/novo preset/quadriceps.png';
import gluteosNovo from '@/assets/novo preset/gluteos.png';
import superioresNovo from '@/assets/novo preset/superiores-triceps.png';
import casaSemEquipamento from '@/assets/novo preset/treino_em_casa_sem_equipamento.png';
import casaCompleto from '@/assets/novo preset/treino_casa_completo.png';
import hiitEmCasa from '@/assets/novo preset/Hiit_em_casa.png';
import consultoriaMensalImg from '@/assets/novo preset/online.JPG';
import defImg from '@/assets/novo preset/superiores-biceps.png';
import desafiosImg from '@/assets/novo preset/desafios.png';
import inicialNovo from '@/assets/novo preset/superiore-ombro.png';
import lipedemaImg from '@/assets/novo preset/posteriores.png';
import abdominalNovo from '@/assets/novo preset/abdominal.png';
import defFemNovo from '@/assets/novo preset/superiores-biceps2.png';

export type ProductType = 'programa' | 'consultoria';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number; // em centavos (ex: 9900 = R$ 99,00)
  productId: string; // ID do produto em snake_case para o backend
  image?: string;
  category?: string;
  type: ProductType;
}

// Lista de produtos baseada nos programas existentes
export const products: Product[] = [
  // Mais Procurados
  {
    id: '1',
    title: 'Definição Total',
    description: 'Programa completo de 8 a 12 semanas para definição muscular. Acesso vitalício.',
    price: 100, // R$ 1,00
    productId: 'definicao_total',
    image: defImg,
    category: 'Top #1',
    type: 'programa',
  },
  {
    id: '2',
    title: 'Hipertrofia Feminina',
    description: 'Programa avançado de 8 a 12 semanas para ganho de massa, foco em quadríceps. Acesso vitalício.',
    price: 6990, // R$ 69,90
    productId: 'hipertrofia_feminina_quadriceps',
    image: quadricepsNovo,
    category: 'Novo',
    type: 'programa',
  },
  {
    id: '3',
    title: 'Hipertrofia Feminina',
    description: 'Programa avançado de 8 a 12 semanas para ganho de massa, foco em glúteos. Acesso vitalício.',
    price: 6990, // R$ 69,90
    productId: 'hipertrofia_feminina',
    image: gluteosNovo,
    type: 'programa',
  },
  {
    id: '4',
    title: 'Treino em Casa Express',
    description: 'Treino de 8 a 12 semanas para fazer em casa. Acesso vitalício.',
    price: 5990, // R$ 59,90
    productId: 'treino_em_casa_express',
    image: casaSemEquipamento,
    type: 'programa',
  },
  // Para Iniciantes
  {
    id: '6',
    title: 'Start Inicial',
    description: 'Desenvolva força desde o início - 8 a 12 semanas. Acesso vitalício.',
    price: 5990, // R$ 59,90
    productId: 'start_inicial',
    image: inicialNovo,
    type: 'programa',
  },
  {
    id: '7',
    title: 'Lipedema',
    description: 'Programa de 8 a 12 semanas para lipedema: treinos de baixo impacto, circulação e fortalecimento adaptados. Acesso vitalício.',
    price: 6990, // R$ 69,90
    productId: 'lipedema',
    image: lipedemaImg,
    type: 'programa',
  },
  {
    id: '8',
    title: 'Em Casa Sem Equipamento',
    description: 'Treino completo sem equipamentos, ideal para gestantes e iniciantes - 8 a 12 semanas. Acesso vitalício.',
    price: 4990, // R$ 49,90
    productId: 'em_casa_sem_equipamento',
    image: casaSemEquipamento,
    type: 'programa',
  },
  // Emagrecimento
  {
    id: '11',
    title: 'Abdominal Slim',
    description: 'Programa de 8 a 12 semanas para abdômen definido: core, queima localizada e postura. Acesso vitalício.',
    price: 2990, // R$ 29,90
    productId: 'abdominal_slim',
    image: abdominalNovo,
    type: 'programa',
  },
  {
    id: '12',
    title: 'Definição Feminina',
    description: 'Foco em definição e tonificação - 8 a 12 semanas. Acesso vitalício.',
    price: 6990, // R$ 69,90
    productId: 'definicao_feminina',
    image: defFemNovo,
    type: 'programa',
  },
  // Hipertrofia
  {
    id: '14',
    title: 'Hipertrofia Feminina',
    description: 'Programa avançado de 8 a 12 semanas para ganho de massa, foco em superiores. Acesso vitalício.',
    price: 6990, // R$ 69,90
    productId: 'hipertrofia_feminina_superiores',
    image: superioresNovo,
    type: 'programa',
  },
  // Treinos em Casa
  {
    id: '17',
    title: 'Casa Completo',
    description: 'Treino completo para fazer em casa - 8 a 12 semanas. Acesso vitalício.',
    price: 5990, // R$ 59,90
    productId: 'casa_completo',
    image: casaCompleto,
    category: 'Favorito',
    type: 'programa',
  },
  {
    id: '18',
    title: 'Treino de 20 Minutos',
    description: 'Treinos rápidos de 20 minutos - 8 a 12 semanas. Acesso vitalício.',
    price: 5990, // R$ 59,90
    productId: 'treino_de_20_minutos',
    image: casaSemEquipamento,
    type: 'programa',
  },
  {
    id: '19',
    title: 'HIIT Sem Equipamento',
    description: 'Para derreter gordura: treinos HIIT intensos sem equipamentos em 8 a 12 semanas. Iniciante, intermediário e avançado. Acesso vitalício.',
    price: 5990, // R$ 59,90
    productId: 'hiit_sem_equipamento',
    image: hiitEmCasa,
    type: 'programa',
  },
  {
    id: '20',
    title: 'Alongamento e Flexibilidade',
    description: 'Alongamento e flexibilidade - 8 a 12 semanas. Acesso vitalício.',
    price: 5990, // R$ 59,90
    productId: 'alongamento_e_flexibilidade',
    image: casaSemEquipamento,
    type: 'programa',
  },
  // Desafios
  {
    id: '23',
    title: 'Desafio 21 dias',
    description: 'Desafio de 21 dias para criar o hábito de treinar',
    price: 5990, // R$ 59,90
    productId: 'desafio_21_dias',
    image: desafiosImg,
    type: 'programa',
  },
  {
    id: '24',
    title: 'Desafio 30 dias',
    description: 'Desafio de 30 dias para emagrecimento e condicionamento',
    price: 5990, // R$ 59,90
    productId: 'desafio_30_dias',
    image: desafiosImg,
    type: 'programa',
  },
  // Consultoria Personalizada
  {
    id: '21',
    title: 'Consultoria Personalizada',
    description: 'Consultoria personalizada com acompanhamento mensal individual',
    price: 19900, // R$ 199,00
    productId: 'consultoria_mensal',
    image: consultoriaMensalImg,
    category: 'Iniciante, Intermediário, Avançado',
    type: 'consultoria',
  },
  {
    id: '22',
    title: 'Consultoria Personalizada',
    description: 'Consultoria personalizada com acompanhamento trimestral (3 meses)',
    price: 49900, // R$ 499,00 (economia de R$ 98,00)
    productId: 'consultoria_trimestral',
    image: consultoriaMensalImg,
    category: 'Iniciante, Intermediário, Avançado',
    type: 'consultoria',
  },
];

/**
 * Conjunto de `productId` cujos treinos JÁ estão disponíveis no app.
 * Os demais programas continuam aparecendo no site como cards, mas SEM
 * botões de "Comprar agora" / "Adicionar ao carrinho" — apenas com um
 * aviso de "Em breve" e o link de WhatsApp.
 *
 * Quando um novo programa for liberado, adicione o `productId` aqui.
 * (Consultorias têm fluxo próprio via WhatsApp e não dependem desta lista.)
 */
const AVAILABLE_PRODUCT_IDS: ReadonlySet<string> = new Set<string>([
  'definicao_total',
]);

/** Indica se o produto pode ser comprado/adicionado ao carrinho neste momento. */
export function isProductAvailable(product: Product | undefined | null): boolean {
  if (!product) return false;
  if (product.type === 'consultoria') return true;
  return AVAILABLE_PRODUCT_IDS.has(product.productId);
}

// Função auxiliar para formatar preço em BRL
export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(priceInCents / 100);
}

// Função para buscar produto por ID
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

// Função para buscar produto pelo productId (snake_case usado no backend/MP)
export function getProductByProductId(productId: string): Product | undefined {
  return products.find((product) => product.productId === productId);
}

/**
 * Mapeamento explícito de `productId` (snake_case enviado ao backend/Mercado
 * Pago) para o nome legível do produto. É a fonte de verdade do nome enviado
 * ao backend / repassado ao webhook do n8n / WhatsApp.
 *
 * Mantemos um mapa explícito (em vez de usar apenas `product.title`) porque:
 * - Alguns produtos compartilham o mesmo `title` no catálogo
 *   (ex.: "Hipertrofia Feminina" aparece 3x com focos diferentes) e
 *   precisamos desambiguar no nome enviado.
 * - Garante estabilidade do nome mesmo que o `title` exibido no site mude.
 *
 * Para qualquer `productId` que não esteja aqui, usamos um fallback que
 * converte o snake_case em Title Case (ex.: "programa_emagrecimento" ->
 * "Programa De Emagrecimento"), garantindo que o backend nunca receba o id
 * cru caso um novo produto seja adicionado sem atualizar este mapa.
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
  consultoria_mensal: 'Consultoria Personalizada — Mensal',
  consultoria_trimestral: 'Consultoria Personalizada — Trimestral',
  wellness_experience_individual: 'Wellness Experience - Individual (descontinuado)',
  wellness_experience_dupla: 'Wellness Experience',
};

/**
 * Converte um `productId` em snake_case para um nome legível ("Title Case").
 * Usado apenas como fallback quando o `productId` não está em
 * {@link PRODUCT_DISPLAY_NAMES}.
 */
function snakeCaseToTitleCase(productId: string): string {
  return productId
    .split('_')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Retorna o nome legível do produto a partir do `productId`.
 *
 * Ordem de resolução:
 * 1. {@link PRODUCT_DISPLAY_NAMES} (mapa explícito);
 * 2. `title` do catálogo `products`;
 * 3. Fallback: snake_case convertido em Title Case.
 */
export function getProductDisplayName(productId: string): string {
  if (!productId) return '';
  const fromMap = PRODUCT_DISPLAY_NAMES[productId];
  if (fromMap) return fromMap;

  const fromCatalog = getProductByProductId(productId)?.title;
  if (fromCatalog) return fromCatalog;

  return snakeCaseToTitleCase(productId);
}
