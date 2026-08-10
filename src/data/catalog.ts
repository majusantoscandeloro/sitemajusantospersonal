/**
 * Fonte única de verdade do catálogo do site.
 *
 * Preço, título, subtítulo, duração, nível, disponibilidade, imagem e
 * detalhes do modal vivem aqui. `products.ts`, `programs.ts` e
 * `programDetails.ts` apenas derivam views a partir deste arquivo.
 */
import quadricepsNovo from '@/assets/novo preset/quadriceps.webp';
import gluteosNovo from '@/assets/novo preset/gluteos.webp';
import superioresNovo from '@/assets/novo preset/superiores-triceps.webp';
import casaSemEquipamento from '@/assets/novo preset/treino_em_casa_sem_equipamento.webp';
import casaCompleto from '@/assets/novo preset/treino_casa_completo.webp';
import hiitEmCasa from '@/assets/novo preset/Hiit_em_casa.webp';
import consultoriaMensalImg from '@/assets/novo preset/online.webp';
import defImg from '@/assets/novo preset/superiores-biceps.webp';
import desafiosImg from '@/assets/novo preset/desafios.webp';
import inicialNovo from '@/assets/novo preset/superiore-ombro.webp';
import lipedemaImg from '@/assets/novo preset/posteriores.webp';
import abdominalNovo from '@/assets/novo preset/abdominal.webp';
import defFemNovo from '@/assets/novo preset/superiores-biceps2.webp';

export type ProductType = 'programa' | 'consultoria';
export type ProgramLevel = 'Iniciante' | 'Intermediário' | 'Avançado';

export interface CatalogItem {
  id: string;
  productId: string;
  title: string;
  subtitle?: string;
  /** Descrição curta (carrinho / checkout). */
  shortDescription: string;
  /** Descrição longa (modal de detalhes). */
  description: string;
  /** Preço em centavos (ex.: 6990 = R$ 69,90). No card = Pix/à vista. */
  priceCents: number;
  /**
   * Preço no cartão para o modal (consultoria).
   * Ex.: "1x de R$ 187,90" | "3x de R$ 164,89"
   */
  cardPaymentLabel?: string;
  /** Legenda curta sob o preço do card (ex.: "no Pix"). */
  priceHint?: string;
  image: string;
  type: ProductType;
  level: ProgramLevel;
  duration: string;
  /** Badge / níveis exibidos no card. */
  category?: string;
  accessPeriod?: string;
  objective?: string;
  /** Nível legível no modal (pode ser mais rico que `level`). */
  detailLevel?: string;
  workoutsPerWeek?: string;
  location?: string;
  features?: string[];
}

/**
 * `productId`s já liberados no app (compráveis no site).
 * Consultorias têm fluxo próprio via WhatsApp e não dependem desta lista.
 */
export const AVAILABLE_PRODUCT_IDS: ReadonlySet<string> = new Set<string>([
  'definicao_total',
]);

export const catalogItems: CatalogItem[] = [
  {
    id: '1',
    productId: 'definicao_total',
    title: 'Definição Total',
    shortDescription:
      'Programa completo de 8 a 12 semanas para definição muscular. Acesso vitalício.',
    description:
      'Programa completo de 8 a 12 semanas focado em definição muscular e perda de gordura. Treinos estruturados que combinam força e cardio para resultados visíveis e sustentáveis.',
    priceCents: 12000,
    image: defImg,
    type: 'programa',
    level: 'Intermediário',
    duration: '8 a 12 semanas',
    category: 'Top #1',
    accessPeriod: 'Vitalício',
    objective: 'Definição muscular e perda de gordura',
    detailLevel: 'Intermediário',
    workoutsPerWeek: '4 a 5 treinos',
    location: 'Academia',
    features: [
      'Treinos estruturados combinando força e cardio',
      'Exercícios para definição muscular',
      'Orientações de execução',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '2',
    productId: 'hipertrofia_feminina_quadriceps',
    title: 'Hipertrofia Feminina',
    subtitle: 'Foco em Quadríceps',
    shortDescription:
      'Programa avançado de 8 a 12 semanas para ganho de massa, foco em quadríceps. Acesso vitalício.',
    description:
      'Programa avançado de 8 a 12 semanas para mulheres que buscam ganho de massa muscular de forma saudável e feminina, com ênfase em quadríceps.',
    priceCents: 6990,
    image: quadricepsNovo,
    type: 'programa',
    level: 'Avançado',
    duration: '8 a 12 semanas',
    category: 'Intermediário, Avançado',
    accessPeriod: 'Vitalício',
    objective: 'Hipertrofia com foco em quadríceps',
    detailLevel: 'Intermediário / Avançado',
    workoutsPerWeek: '4 a 5 treinos',
    location: 'Academia',
    features: [
      'Estrutura: quadríceps, glúteos, superiores e cardio',
      'Progressão pensada para hipertrofia feminina',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '3',
    productId: 'hipertrofia_feminina',
    title: 'Hipertrofia Feminina',
    subtitle: 'foco em glúteos',
    shortDescription:
      'Programa avançado de 8 a 12 semanas para ganho de massa, foco em glúteos. Acesso vitalício.',
    description:
      'Programa avançado de 8 a 12 semanas para mulheres que buscam ganho de massa muscular de forma saudável e feminina, com ênfase em glúteos.',
    priceCents: 6990,
    image: gluteosNovo,
    type: 'programa',
    level: 'Avançado',
    duration: '8 a 12 semanas',
    category: 'Intermediário, Avançado',
    accessPeriod: 'Vitalício',
    objective: 'Hipertrofia com foco em glúteos',
    detailLevel: 'Intermediário / Avançado',
    workoutsPerWeek: '4 a 5 treinos',
    location: 'Academia',
    features: [
      'Estrutura: glúteos, quadríceps, superiores e cardio',
      'Progressão pensada para hipertrofia feminina',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '4',
    productId: 'treino_em_casa_express',
    title: 'Treino em Casa Express',
    shortDescription: 'Treino de 8 a 12 semanas para fazer em casa. Acesso vitalício.',
    description:
      'Programa prático de 8 a 12 semanas para fazer em casa, sem necessidade de equipamentos. Treinos rápidos e eficientes que cabem na sua rotina.',
    priceCents: 5990,
    image: casaSemEquipamento,
    type: 'programa',
    level: 'Iniciante',
    duration: '8 a 12 semanas',
    accessPeriod: 'Vitalício',
    objective: 'Condicionamento e consistência em casa',
    detailLevel: 'Iniciante / Intermediário',
    workoutsPerWeek: '3 a 4 treinos',
    location: 'Casa',
    features: [
      'Treinos em casa, sem equipamentos',
      'Sessões rápidas e práticas',
      'Fácil de encaixar na rotina',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '6',
    productId: 'start_inicial',
    title: 'Start Inicial',
    shortDescription: 'Desenvolva força desde o início - 8 a 12 semanas. Acesso vitalício.',
    description:
      'Programa de 8 a 12 semanas focado em desenvolver força e resistência desde o início. Ideal para quem quer construir uma base sólida.',
    priceCents: 5990,
    image: inicialNovo,
    type: 'programa',
    level: 'Iniciante',
    duration: '8 a 12 semanas',
    accessPeriod: 'Vitalício',
    objective: 'Construir base de força e técnica',
    detailLevel: 'Iniciante',
    workoutsPerWeek: '3 a 4 treinos',
    location: 'Academia',
    features: [
      'Progressão gradual para iniciantes',
      'Foco em técnica correta',
      'Construção de base sólida de força',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '7',
    productId: 'lipedema',
    title: 'Lipedema',
    shortDescription:
      'Programa de 8 a 12 semanas com treinos de baixo impacto e fortalecimento adaptados para mulheres com lipedema. Acesso vitalício.',
    description:
      'Programa de 8 a 12 semanas com treinos de baixo impacto e progressão cuidadosa, pensado para mulheres com lipedema. O foco é fortalecimento, mobilidade e consistência no movimento — sem promessas clínicas. Não substitui avaliação médica ou fisioterapêutica; inicie apenas com liberação profissional quando indicada.',
    priceCents: 6990,
    image: lipedemaImg,
    type: 'programa',
    level: 'Iniciante',
    duration: '8 a 12 semanas',
    category: 'Iniciante, Intermediário, Avançado',
    accessPeriod: 'Vitalício',
    objective: 'Fortalecimento e movimento seguro com foco em lipedema',
    detailLevel: 'Todos os níveis',
    workoutsPerWeek: '3 a 4 treinos',
    location: 'Academia ou casa',
    features: [
      'Treinos de baixo impacto',
      'Progressão adaptada e segura',
      'Foco em fortalecimento e mobilidade',
      'Orientações gerais para quem tem lipedema',
      'Não substitui acompanhamento profissional individual',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '8',
    productId: 'em_casa_sem_equipamento',
    title: 'Em Casa Sem Equipamento',
    shortDescription:
      'Treino completo em casa só com o peso do corpo — 8 a 12 semanas. Acesso vitalício.',
    description:
      'Programa completo de 8 a 12 semanas para treinar em casa usando apenas o peso do corpo. Indicado para iniciantes e para quem prefere treinos sem equipamentos. Em caso de gestação ou condição de saúde específica, busque liberação e orientação do seu médico ou profissional de saúde antes de começar — este programa não inclui avaliação individual.',
    priceCents: 4990,
    image: casaSemEquipamento,
    type: 'programa',
    level: 'Iniciante',
    duration: '8 a 12 semanas',
    category: 'Iniciante, Intermediário',
    accessPeriod: 'Vitalício',
    objective: 'Treinar em casa com segurança e consistência',
    detailLevel: 'Iniciante / Intermediário',
    workoutsPerWeek: '3 a 4 treinos',
    location: 'Casa',
    features: [
      'Apenas peso do corpo — sem equipamentos',
      'Adequado para iniciantes',
      'Fácil de encaixar na rotina de casa',
      'Em gestação ou condições específicas: inicie com liberação profissional',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '11',
    productId: 'abdominal_slim',
    title: 'Abdominal Slim',
    shortDescription:
      'Programa de 8 a 12 semanas para fortalecer o core e melhorar a postura. Acesso vitalício.',
    description:
      'Programa de 8 a 12 semanas focado em fortalecimento do abdômen e do core, com atenção à postura e à estabilidade. Treinos objetivos para quem quer ganhar consciência corporal e força na região central.',
    priceCents: 2990,
    image: abdominalNovo,
    type: 'programa',
    level: 'Intermediário',
    duration: '8 a 12 semanas',
    category: 'Iniciante, Intermediário, Avançado',
    accessPeriod: 'Vitalício',
    objective: 'Fortalecimento do core e da postura',
    detailLevel: 'Todos os níveis',
    workoutsPerWeek: '3 a 4 treinos',
    location: 'Academia ou casa',
    features: [
      'Foco em abdômen e core',
      'Fortalecimento de postura',
      'Estabilidade e consciência corporal',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '12',
    productId: 'definicao_feminina',
    title: 'Definição Feminina',
    shortDescription: 'Foco em definição e tonificação - 8 a 12 semanas. Acesso vitalício.',
    description:
      'Programa de 8 a 12 semanas focado em definição e emagrecimento para mulheres. Combina treinos de força e cardio para um corpo definido e feminino.',
    priceCents: 6990,
    image: defFemNovo,
    type: 'programa',
    level: 'Intermediário',
    duration: '8 a 12 semanas',
    category: 'Iniciante, Intermediário, Avançado',
    accessPeriod: 'Vitalício',
    objective: 'Definição e emagrecimento feminino',
    detailLevel: 'Todos os níveis',
    workoutsPerWeek: '4 a 5 treinos',
    location: 'Academia',
    features: [
      'Combinação de força e cardio',
      'Foco em definição feminina',
      'Resultados visíveis e sustentáveis',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '14',
    productId: 'hipertrofia_feminina_superiores',
    title: 'Hipertrofia Feminina',
    subtitle: 'Foco em Superiores',
    shortDescription:
      'Programa avançado de 8 a 12 semanas para ganho de massa, foco em superiores. Acesso vitalício.',
    description:
      'Programa avançado de 8 a 12 semanas para mulheres que buscam ganho de massa muscular de forma saudável e feminina, com ênfase em superiores.',
    priceCents: 6990,
    image: superioresNovo,
    type: 'programa',
    level: 'Avançado',
    duration: '8 a 12 semanas',
    category: 'Intermediário, Avançado',
    accessPeriod: 'Vitalício',
    objective: 'Hipertrofia com foco em superiores',
    detailLevel: 'Intermediário / Avançado',
    workoutsPerWeek: '4 a 5 treinos',
    location: 'Academia',
    features: [
      'Estrutura: superiores, glúteos, quadríceps e cardio',
      'Progressão pensada para hipertrofia feminina',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '17',
    productId: 'casa_completo',
    title: 'Casa Completo',
    shortDescription: 'Treino completo para fazer em casa - 8 a 12 semanas. Acesso vitalício.',
    description:
      'Programa completo de 8 a 12 semanas para treinar em casa. Treinos variados e eficientes que trabalham todo o corpo sem necessidade de equipamentos.',
    priceCents: 5990,
    image: casaCompleto,
    type: 'programa',
    level: 'Intermediário',
    duration: '8 a 12 semanas',
    category: 'Iniciante, Intermediário',
    accessPeriod: 'Vitalício',
    objective: 'Condicionamento completo em casa',
    detailLevel: 'Iniciante / Intermediário',
    workoutsPerWeek: '3 a 4 treinos',
    location: 'Casa',
    features: [
      'Trabalho de todo o corpo',
      'Sem necessidade de equipamentos',
      'Treinos variados e eficientes',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '18',
    productId: 'treino_de_20_minutos',
    title: 'Treino de 20 Minutos',
    shortDescription: 'Treinos rápidos de 20 minutos - 8 a 12 semanas. Acesso vitalício.',
    description:
      'Programa prático de 8 a 12 semanas com treinos rápidos de apenas 20 minutos. Perfeito para quem tem pouco tempo, mas quer resultados.',
    priceCents: 5990,
    image: casaSemEquipamento,
    type: 'programa',
    level: 'Intermediário',
    duration: '8 a 12 semanas',
    accessPeriod: 'Vitalício',
    objective: 'Resultados com pouco tempo disponível',
    detailLevel: 'Todos os níveis',
    workoutsPerWeek: '4 a 5 treinos',
    location: 'Casa',
    features: [
      'Treinos de apenas 20 minutos',
      'Ideal para rotina apertada',
      'Sessões eficientes e objetivas',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '19',
    productId: 'hiit_sem_equipamento',
    title: 'HIIT Sem Equipamento',
    subtitle: 'Foco em condicionamento e gasto energético',
    shortDescription:
      'Treinos HIIT sem equipamentos, com foco em condicionamento e gasto energético — 8 a 12 semanas. Iniciante, intermediário e avançado. Acesso vitalício.',
    description:
      'Programa de 8 a 12 semanas com treinos HIIT usando apenas o peso do corpo, com foco em condicionamento e gasto energético. Versões para iniciante, intermediário e avançado.',
    priceCents: 5990,
    image: hiitEmCasa,
    type: 'programa',
    level: 'Intermediário',
    duration: '8 a 12 semanas',
    category: 'Iniciante, Intermediário, Avançado',
    accessPeriod: 'Vitalício',
    objective: 'Condicionamento e gasto energético com HIIT em casa',
    detailLevel: 'Todos os níveis',
    workoutsPerWeek: '3 a 4 treinos',
    location: 'Casa',
    features: [
      'Treinos HIIT estruturados',
      'Apenas peso do corpo',
      'Versões para iniciante, intermediário e avançado',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '20',
    productId: 'alongamento_e_flexibilidade',
    title: 'Alongamento e Flexibilidade',
    shortDescription: 'Alongamento e flexibilidade - 8 a 12 semanas. Acesso vitalício.',
    description:
      'Programa de 8 a 12 semanas focado em alongamento e flexibilidade. Exercícios para melhorar amplitude de movimento, relaxamento muscular e bem-estar.',
    priceCents: 5990,
    image: casaSemEquipamento,
    type: 'programa',
    level: 'Iniciante',
    duration: '8 a 12 semanas',
    accessPeriod: 'Vitalício',
    objective: 'Melhorar flexibilidade e bem-estar',
    detailLevel: 'Todos os níveis',
    workoutsPerWeek: '3 a 4 sessões',
    location: 'Casa',
    features: [
      'Alongamento e flexibilidade',
      'Melhora da amplitude de movimento',
      'Relaxamento muscular e prevenção de lesões',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '23',
    productId: 'desafio_21_dias',
    title: 'Desafio 21 dias',
    shortDescription: 'Desafio de 21 dias para criar o hábito de treinar',
    description:
      'Desafio de 21 dias para construir o hábito de treinar com consistência. Treinos diários estruturados para quem quer começar — ou retomar — a rotina com clareza e progresso gradual.',
    priceCents: 5990,
    image: desafiosImg,
    type: 'programa',
    level: 'Iniciante',
    duration: '21 dias',
    category: 'Iniciante, Intermediário, Avançado',
    accessPeriod: 'Vitalício',
    objective: 'Criar o hábito de treinar com consistência',
    detailLevel: 'Todos os níveis',
    workoutsPerWeek: 'Treinos diários',
    location: 'Academia ou casa',
    features: [
      'Programa estruturado de 21 dias',
      'Treinos diários para criar o hábito',
      'Foco em consistência e progressão gradual',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '24',
    productId: 'desafio_30_dias',
    title: 'Desafio 30 dias',
    shortDescription: 'Desafio de 30 dias focado em condicionamento e consistência',
    description:
      'Desafio de 30 dias com treinos estruturados para fortalecer o condicionamento e manter a consistência ao longo de um mês. Ideal para quem busca disciplina e evolução progressiva na rotina.',
    priceCents: 5990,
    image: desafiosImg,
    type: 'programa',
    level: 'Intermediário',
    duration: '30 dias',
    category: 'Iniciante, Intermediário, Avançado',
    accessPeriod: 'Vitalício',
    objective: 'Condicionamento e consistência em 30 dias',
    detailLevel: 'Todos os níveis',
    workoutsPerWeek: '5 a 6 treinos',
    location: 'Academia ou casa',
    features: [
      'Programa estruturado de 30 dias',
      'Foco em condicionamento e consistência',
      'Progressão ao longo do mês',
      'Acesso vitalício ao conteúdo',
    ],
  },
  {
    id: '21',
    productId: 'consultoria_mensal',
    title: 'Consultoria VIP',
    subtitle: 'Mensal',
    shortDescription: 'Consultoria VIP com acompanhamento mensal individual',
    description:
      'Planejamento individual e acompanhamento mais próximo diretamente comigo. Treinos ajustados à sua rotina, objetivos e evolução, com análise de vídeos e suporte contínuo.',
    priceCents: 18000,
    priceHint: 'no Pix',
    cardPaymentLabel: '1x de R$ 187,90',
    image: consultoriaMensalImg,
    type: 'consultoria',
    level: 'Iniciante',
    duration: 'Mensal',
    category: 'Iniciante, Intermediário, Avançado',
    features: [
      'Planejamento individual feito para você',
      'Suporte diário durante todo o plano',
      'Envio de vídeos para correção de exercícios',
      'Treinos ajustados à sua rotina e objetivos',
      'Análise dos vídeos de execução',
      'Adaptações conforme sua evolução',
    ],
  },
  {
    id: '22',
    productId: 'consultoria_trimestral',
    title: 'Consultoria VIP',
    subtitle: 'Trimestral',
    shortDescription: 'Consultoria VIP com acompanhamento trimestral (3 meses)',
    description:
      'Acompanhamento individual por 3 meses, com troca de treino mensal, ajustes conforme sua evolução e análise dos vídeos de execução. Mais tempo juntas, mais progressão — e mais vantagem no investimento.',
    priceCents: 46000,
    priceHint: 'à vista',
    cardPaymentLabel: '3x de R$ 164,89',
    image: consultoriaMensalImg,
    type: 'consultoria',
    level: 'Iniciante',
    duration: '3 meses',
    category: 'Iniciante, Intermediário, Avançado',
    features: [
      'Planejamento individual feito para você',
      'Suporte diário durante todo o plano',
      'Troca de treino mensal por 3 meses',
      'Envio de vídeos para correção de exercícios',
      'Ajustes conforme sua evolução',
      'Mais vantagem no investimento',
    ],
  },
  {
    id: '25',
    productId: 'consultoria_semestral',
    title: 'Consultoria VIP',
    subtitle: 'Semestral',
    shortDescription: 'Consultoria VIP com acompanhamento semestral (6 meses)',
    description:
      'Acompanhamento individual por 6 meses, com trocas de treino, ajustes conforme sua evolução e análise dos vídeos de execução. Mais tempo juntas e mais vantagem no investimento.',
    priceCents: 84000,
    priceHint: 'à vista',
    cardPaymentLabel: '6x de R$ 154,99',
    image: consultoriaMensalImg,
    type: 'consultoria',
    level: 'Iniciante',
    duration: '6 meses',
    category: 'Iniciante, Intermediário, Avançado',
    features: [
      'Planejamento individual feito para você',
      'Suporte diário durante todo o plano',
      'Trocas de treino ao longo dos 6 meses',
      'Envio de vídeos para correção de exercícios',
      'Ajustes conforme sua evolução',
      'Mais vantagem no investimento',
    ],
  },
];

export const catalogById: ReadonlyMap<string, CatalogItem> = new Map(
  catalogItems.map((item) => [item.id, item]),
);

export function getCatalogItemById(id: string): CatalogItem | undefined {
  return catalogById.get(id);
}

export function getCatalogItemByProductId(productId: string): CatalogItem | undefined {
  return catalogItems.find((item) => item.productId === productId);
}

/** Itens do tipo programa (páginas em `/programas/:slug`). */
export function getProgramCatalogItems(): CatalogItem[] {
  return catalogItems.filter((item) => item.type === 'programa');
}

/** Planos de consultoria (agrupados em `/consultoria-online`). */
export function getConsultingCatalogItems(): CatalogItem[] {
  return catalogItems.filter((item) => item.type === 'consultoria');
}

/**
 * Busca programa pelo slug de URL (derivado de `productId`).
 * Consultorias não usam esta rota — vão para `/consultoria-online`.
 */
export function getCatalogItemBySlug(slug: string): CatalogItem | undefined {
  const normalized = slug.trim().toLowerCase();
  return getProgramCatalogItems().find(
    (item) => item.productId.replace(/_/g, '-').toLowerCase() === normalized,
  );
}

/** Ordem e agrupamento dos carrosséis na home. */
export const catalogCategoryDefs = {
  popular: {
    title: 'Mais Procurados',
    ids: ['1', '2', '3'] as const,
  },
  challenges: {
    title: 'Desafios',
    ids: ['23', '24'] as const,
  },
  beginner: {
    title: 'Programas especiais',
    ids: ['6', '7'] as const,
  },
  weightLoss: {
    title: 'Emagrecimento',
    ids: ['11', '12'] as const,
  },
  hypertrophy: {
    title: 'Hipertrofia',
    ids: ['2', '3', '14'] as const,
  },
  homeWorkout: {
    title: 'Treinos em Casa',
    ids: ['8', '17', '19'] as const,
  },
  consulting: {
    title: 'Consultoria VIP',
    description:
      'Para quem deseja atendimento mais individual: mais contato comigo, suporte para tirar dúvidas e planejamento ajustado à rotina, objetivos e evolução.',
    ids: ['21', '22', '25'] as const,
  },
} as const;
