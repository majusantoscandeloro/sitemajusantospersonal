/**
 * Mapa de intenção de busca por produto (organização interna).
 *
 * NÃO vira `<meta name="keywords">`.
 * Usado só para title/description naturais e relatório SEO.
 *
 * Campos derivados dos dados reais de `catalog.ts` — sem inventar benefícios.
 */
export interface ProductSearchIntent {
  /** productId do catálogo */
  productId: string;
  objetivo: string;
  publico: string;
  contexto: string;
  /** Intenção principal (como alguém pesquisaria). */
  intencaoPrincipal: string;
  intencoesSecundarias: string[];
  intencaoComercial: string;
  /**
   * Title da página (sem marca — `titleWithBrand` adiciona).
   * Natural e específico; evita canibalização com outros produtos.
   */
  seoTitle: string;
  /** Meta description própria (≤ ~155 chars). */
  seoDescription: string;
}

/** Somente programas (`type: programa`). Consultoria fica na página agregada. */
export const PROGRAM_SEARCH_INTENT: Readonly<Record<string, ProductSearchIntent>> = {
  definicao_total: {
    productId: 'definicao_total',
    objetivo: 'Definição muscular e perda de gordura',
    publico: 'Mulheres intermediárias que treinam em academia',
    contexto: 'Academia · 4 a 5 treinos/semana',
    intencaoPrincipal: 'treino feminino para definição muscular',
    intencoesSecundarias: [
      'programa de treino para definição',
      'treino de definição feminino academia',
      'treino para mulher definir o corpo',
      'programa de treino feminino 8 a 12 semanas',
    ],
    intencaoComercial: 'programa de treino feminino para definição online',
    seoTitle: 'Definição Total — Treino feminino para definição',
    seoDescription:
      'Programa de 8 a 12 semanas para definição muscular e perda de gordura na academia. Treinos de força e cardio com acesso vitalício no Majunity GO.',
  },
  hipertrofia_feminina_quadriceps: {
    productId: 'hipertrofia_feminina_quadriceps',
    objetivo: 'Hipertrofia com foco em quadríceps',
    publico: 'Mulheres intermediárias/avançadas',
    contexto: 'Academia · 4 a 5 treinos/semana',
    intencaoPrincipal: 'treino feminino para hipertrofia de quadríceps',
    intencoesSecundarias: [
      'programa de hipertrofia feminina quadríceps',
      'treino para ganhar massa nas pernas',
      'treino de quadríceps feminino academia',
    ],
    intencaoComercial: 'programa de hipertrofia feminina foco em quadríceps',
    seoTitle: 'Hipertrofia Feminina — Foco em Quadríceps',
    seoDescription:
      'Programa avançado de 8 a 12 semanas para ganho de massa com ênfase em quadríceps. Treinos estruturados para academia, acesso vitalício.',
  },
  hipertrofia_feminina: {
    productId: 'hipertrofia_feminina',
    objetivo: 'Hipertrofia com foco em glúteos',
    publico: 'Mulheres intermediárias/avançadas',
    contexto: 'Academia · 4 a 5 treinos/semana',
    intencaoPrincipal: 'treino feminino para glúteos',
    intencoesSecundarias: [
      'programa de hipertrofia feminina glúteos',
      'treino para ganhar glúteos na academia',
      'treino de glúteos e pernas feminino',
    ],
    intencaoComercial: 'programa de hipertrofia feminina foco em glúteos',
    seoTitle: 'Hipertrofia Feminina — Foco em Glúteos',
    seoDescription:
      'Programa avançado de 8 a 12 semanas para ganho de massa com ênfase em glúteos. Progressão para academia, acesso vitalício no Majunity GO.',
  },
  treino_em_casa_express: {
    productId: 'treino_em_casa_express',
    objetivo: 'Condicionamento e consistência em casa',
    publico: 'Iniciantes / quem treina em casa',
    contexto: 'Casa · sem equipamentos · 3 a 4 treinos/semana',
    intencaoPrincipal: 'treino em casa sem equipamento',
    intencoesSecundarias: [
      'treino feminino em casa',
      'programa de treino em casa rápido',
      'treino pronto para fazer em casa',
    ],
    intencaoComercial: 'programa de treino em casa online',
    seoTitle: 'Treino em Casa Express — Sem equipamentos',
    seoDescription:
      'Programa prático de 8 a 12 semanas para treinar em casa, sem equipamentos. Sessões rápidas com acesso vitalício no Majunity GO.',
  },
  start_inicial: {
    productId: 'start_inicial',
    objetivo: 'Construir base de força e técnica',
    publico: 'Iniciantes na academia',
    contexto: 'Academia · 3 a 4 treinos/semana',
    intencaoPrincipal: 'treino para iniciantes na academia',
    intencoesSecundarias: [
      'programa de treino para quem está começando',
      'treino feminino para iniciantes',
      'ficha de treino para iniciante',
    ],
    intencaoComercial: 'programa de treino para iniciantes online',
    seoTitle: 'Start Inicial — Treino para iniciantes na academia',
    seoDescription:
      'Programa de 8 a 12 semanas para desenvolver força e técnica desde o início. Ideal para quem está começando na academia. Acesso vitalício.',
  },
  lipedema: {
    productId: 'lipedema',
    objetivo: 'Fortalecimento e movimento seguro com foco em lipedema',
    publico: 'Mulheres com lipedema (com liberação profissional quando indicada)',
    contexto: 'Academia ou casa · baixo impacto · 3 a 4 treinos/semana',
    intencaoPrincipal: 'treino para lipedema',
    intencoesSecundarias: [
      'programa de treino baixo impacto lipedema',
      'treino de fortalecimento para lipedema',
      'exercícios adaptados para lipedema',
    ],
    intencaoComercial: 'programa de treino para lipedema online',
    seoTitle: 'Lipedema — Treino de baixo impacto',
    seoDescription:
      'Programa de 8 a 12 semanas com treinos de baixo impacto para fortalecimento e mobilidade, pensado para mulheres com lipedema. Acesso vitalício.',
  },
  em_casa_sem_equipamento: {
    productId: 'em_casa_sem_equipamento',
    objetivo: 'Treinar em casa com segurança e consistência',
    publico: 'Iniciantes e intermediários',
    contexto: 'Casa · peso do corpo · 3 a 4 treinos/semana',
    intencaoPrincipal: 'treino em casa só com peso do corpo',
    intencoesSecundarias: [
      'treino sem equipamentos feminino',
      'programa de treino em casa completo',
      'treino bodyweight feminino',
    ],
    intencaoComercial: 'programa de treino em casa sem equipamento',
    seoTitle: 'Em Casa Sem Equipamento — Treino com peso do corpo',
    seoDescription:
      'Programa completo de 8 a 12 semanas para treinar em casa só com o peso do corpo. Indicado para iniciantes. Acesso vitalício no Majunity GO.',
  },
  abdominal_slim: {
    productId: 'abdominal_slim',
    objetivo: 'Fortalecimento do core e da postura',
    publico: 'Todos os níveis',
    contexto: 'Academia ou casa · 3 a 4 treinos/semana',
    intencaoPrincipal: 'treino de abdômen e core',
    intencoesSecundarias: [
      'programa de fortalecimento do core',
      'treino para postura e abdômen',
      'treino de core feminino',
    ],
    intencaoComercial: 'programa de treino abdominal online',
    seoTitle: 'Abdominal Slim — Fortalecimento de core e postura',
    seoDescription:
      'Programa de 8 a 12 semanas focado em abdômen, core e postura. Treinos objetivos com acesso vitalício no Majunity GO.',
  },
  definicao_feminina: {
    productId: 'definicao_feminina',
    objetivo: 'Definição e emagrecimento feminino',
    publico: 'Todos os níveis · academia',
    contexto: 'Academia · 4 a 5 treinos/semana',
    intencaoPrincipal: 'treino feminino para emagrecer e definir',
    intencoesSecundarias: [
      'programa de emagrecimento feminino',
      'treino para definição feminina academia',
      'treino força e cardio para emagrecer',
    ],
    intencaoComercial: 'programa de treino feminino para emagrecimento',
    seoTitle: 'Definição Feminina — Treino para emagrecer e definir',
    seoDescription:
      'Programa de 8 a 12 semanas com força e cardio para definição e emagrecimento feminino na academia. Acesso vitalício no Majunity GO.',
  },
  hipertrofia_feminina_superiores: {
    productId: 'hipertrofia_feminina_superiores',
    objetivo: 'Hipertrofia com foco em superiores',
    publico: 'Mulheres intermediárias/avançadas',
    contexto: 'Academia · 4 a 5 treinos/semana',
    intencaoPrincipal: 'treino feminino para superiores',
    intencoesSecundarias: [
      'hipertrofia feminina membros superiores',
      'treino de braços e costas feminino',
      'programa de hipertrofia superiores',
    ],
    intencaoComercial: 'programa de hipertrofia feminina foco em superiores',
    seoTitle: 'Hipertrofia Feminina — Foco em Superiores',
    seoDescription:
      'Programa avançado de 8 a 12 semanas para ganho de massa com ênfase em superiores. Treinos para academia, acesso vitalício.',
  },
  casa_completo: {
    productId: 'casa_completo',
    objetivo: 'Condicionamento completo em casa',
    publico: 'Iniciantes e intermediários',
    contexto: 'Casa · sem equipamentos · 3 a 4 treinos/semana',
    intencaoPrincipal: 'treino completo em casa sem equipamento',
    intencoesSecundarias: [
      'programa de treino full body em casa',
      'treino feminino completo em casa',
      'rotina de treino em casa',
    ],
    intencaoComercial: 'programa de treino completo em casa online',
    seoTitle: 'Casa Completo — Treino full body em casa',
    seoDescription:
      'Programa de 8 a 12 semanas para treinar o corpo todo em casa, sem equipamentos. Acesso vitalício no Majunity GO.',
  },
  treino_de_20_minutos: {
    productId: 'treino_de_20_minutos',
    objetivo: 'Resultados com pouco tempo disponível',
    publico: 'Quem tem rotina apertada',
    contexto: 'Casa · 20 minutos · 4 a 5 treinos/semana',
    intencaoPrincipal: 'treino de 20 minutos em casa',
    intencoesSecundarias: [
      'treino rápido feminino',
      'programa de treino para quem tem pouco tempo',
      'treino curto e eficiente',
    ],
    intencaoComercial: 'programa de treino rápido de 20 minutos',
    seoTitle: 'Treino de 20 Minutos — Rápido e eficiente',
    seoDescription:
      'Programa de 8 a 12 semanas com treinos de apenas 20 minutos. Ideal para quem tem pouco tempo. Acesso vitalício no Majunity GO.',
  },
  hiit_sem_equipamento: {
    productId: 'hiit_sem_equipamento',
    objetivo: 'Condicionamento e gasto energético com HIIT em casa',
    publico: 'Todos os níveis',
    contexto: 'Casa · peso do corpo · 3 a 4 treinos/semana',
    intencaoPrincipal: 'HIIT em casa sem equipamento',
    intencoesSecundarias: [
      'treino HIIT feminino em casa',
      'programa HIIT peso do corpo',
      'treino intervalado sem equipamentos',
    ],
    intencaoComercial: 'programa de HIIT sem equipamento online',
    seoTitle: 'HIIT Sem Equipamento — Condicionamento em casa',
    seoDescription:
      'Programa de 8 a 12 semanas com HIIT só com o peso do corpo. Versões para iniciante, intermediário e avançado. Acesso vitalício.',
  },
  alongamento_e_flexibilidade: {
    productId: 'alongamento_e_flexibilidade',
    objetivo: 'Melhorar flexibilidade e bem-estar',
    publico: 'Todos os níveis',
    contexto: 'Casa · 3 a 4 sessões/semana',
    intencaoPrincipal: 'programa de alongamento e flexibilidade',
    intencoesSecundarias: [
      'treino de flexibilidade em casa',
      'alongamento para melhorar amplitude',
      'rotina de alongamento feminino',
    ],
    intencaoComercial: 'programa de alongamento e flexibilidade online',
    seoTitle: 'Alongamento e Flexibilidade — Em casa',
    seoDescription:
      'Programa de 8 a 12 semanas focado em alongamento, amplitude de movimento e bem-estar. Acesso vitalício no Majunity GO.',
  },
  desafio_21_dias: {
    productId: 'desafio_21_dias',
    objetivo: 'Criar o hábito de treinar com consistência',
    publico: 'Quem quer começar ou retomar',
    contexto: 'Academia ou casa · treinos diários · 21 dias',
    intencaoPrincipal: 'desafio de treino 21 dias',
    intencoesSecundarias: [
      'desafio para criar hábito de treinar',
      'programa de 21 dias de treino',
      'treino para voltar a treinar',
    ],
    intencaoComercial: 'desafio de treino 21 dias online',
    seoTitle: 'Desafio 21 Dias — Crie o hábito de treinar',
    seoDescription:
      'Desafio de 21 dias com treinos diários para construir o hábito de treinar. Ideal para começar ou retomar. Acesso vitalício.',
  },
  desafio_30_dias: {
    productId: 'desafio_30_dias',
    objetivo: 'Condicionamento e consistência em 30 dias',
    publico: 'Todos os níveis',
    contexto: 'Academia ou casa · 5 a 6 treinos/semana · 30 dias',
    intencaoPrincipal: 'desafio de treino 30 dias',
    intencoesSecundarias: [
      'desafio de condicionamento 30 dias',
      'programa de treino de 1 mês',
      'desafio fitness 30 dias feminino',
    ],
    intencaoComercial: 'desafio de treino 30 dias online',
    seoTitle: 'Desafio 30 Dias — Condicionamento e consistência',
    seoDescription:
      'Desafio de 30 dias com treinos estruturados para condicionamento e consistência. Acesso vitalício no Majunity GO.',
  },
};

export function getProgramSearchIntent(
  productId: string,
): ProductSearchIntent | undefined {
  return PROGRAM_SEARCH_INTENT[productId];
}
