export interface ProgramDetails {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  price: string;
  features?: string[];
  accessPeriod?: string;
  /** Specs exibidos no modal de detalhes (programas prontos). */
  objective?: string;
  level?: string;
  duration?: string;
  workoutsPerWeek?: string;
  location?: string;
}

/** Frase padrão de valor — reforça que o produto é um programa completo no app. */
export const MAJUNITY_GO_VALUE_COPY =
  'Você recebe o programa completo no Majunity GO, com exercícios, vídeos demonstrativos, séries, repetições, intervalos de descanso e registro de carga para acompanhar sua evolução.';

export const programDetails: Record<string, ProgramDetails> = {
  // Mais Procurados
  '1': {
    id: '1',
    title: 'Definição Total',
    description:
      'Programa completo de 8 a 12 semanas focado em definição muscular e perda de gordura. Treinos estruturados que combinam força e cardio para resultados visíveis e sustentáveis.',
    price: 'R$ 120,00',
    accessPeriod: 'Vitalício',
    objective: 'Definição muscular e perda de gordura',
    level: 'Intermediário',
    duration: '8 a 12 semanas',
    workoutsPerWeek: '4 a 5 treinos',
    location: 'Academia',
    features: [
      'Treinos estruturados combinando força e cardio',
      'Exercícios para definição muscular',
      'Orientações de execução',
      'Acesso vitalício ao conteúdo',
    ],
  },
  '2': {
    id: '2',
    title: 'Hipertrofia Feminina',
    subtitle: 'Foco em Quadríceps',
    description:
      'Programa avançado de 8 a 12 semanas para mulheres que buscam ganho de massa muscular de forma saudável e feminina, com ênfase em quadríceps.',
    price: 'R$ 69,90',
    accessPeriod: 'Vitalício',
    objective: 'Hipertrofia com foco em quadríceps',
    level: 'Intermediário / Avançado',
    duration: '8 a 12 semanas',
    workoutsPerWeek: '4 a 5 treinos',
    location: 'Academia',
    features: [
      'Estrutura: quadríceps, glúteos, superiores e cardio',
      'Progressão pensada para hipertrofia feminina',
      'Acesso vitalício ao conteúdo',
    ],
  },
  '3': {
    id: '3',
    title: 'Hipertrofia Feminina',
    subtitle: 'foco em glúteos',
    description:
      'Programa avançado de 8 a 12 semanas para mulheres que buscam ganho de massa muscular de forma saudável e feminina, com ênfase em glúteos.',
    price: 'R$ 69,90',
    accessPeriod: 'Vitalício',
    objective: 'Hipertrofia com foco em glúteos',
    level: 'Intermediário / Avançado',
    duration: '8 a 12 semanas',
    workoutsPerWeek: '4 a 5 treinos',
    location: 'Academia',
    features: [
      'Estrutura: glúteos, quadríceps, superiores e cardio',
      'Progressão pensada para hipertrofia feminina',
      'Acesso vitalício ao conteúdo',
    ],
  },
  '4': {
    id: '4',
    title: 'Treino em Casa Express',
    description:
      'Programa prático de 8 a 12 semanas para fazer em casa, sem necessidade de equipamentos. Treinos rápidos e eficientes que cabem na sua rotina.',
    price: 'R$ 59,90',
    accessPeriod: 'Vitalício',
    objective: 'Condicionamento e consistência em casa',
    level: 'Iniciante / Intermediário',
    duration: '8 a 12 semanas',
    workoutsPerWeek: '3 a 4 treinos',
    location: 'Casa',
    features: [
      'Treinos em casa, sem equipamentos',
      'Sessões rápidas e práticas',
      'Fácil de encaixar na rotina',
      'Acesso vitalício ao conteúdo',
    ],
  },
  // Iniciantes & Necessidades Específicas
  '6': {
    id: '6',
    title: 'Start Inicial',
    description:
      'Programa de 8 a 12 semanas focado em desenvolver força e resistência desde o início. Ideal para quem quer construir uma base sólida.',
    price: 'R$ 59,90',
    accessPeriod: 'Vitalício',
    objective: 'Construir base de força e técnica',
    level: 'Iniciante',
    duration: '8 a 12 semanas',
    workoutsPerWeek: '3 a 4 treinos',
    location: 'Academia',
    features: [
      'Progressão gradual para iniciantes',
      'Foco em técnica correta',
      'Construção de base sólida de força',
      'Acesso vitalício ao conteúdo',
    ],
  },
  '7': {
    id: '7',
    title: 'Lipedema',
    description:
      'Programa de 8 a 12 semanas desenvolvido especialmente para mulheres com lipedema. Treinos de baixo impacto que ajudam na circulação, redução de inchaço e fortalecimento muscular.',
    price: 'R$ 69,90',
    accessPeriod: 'Vitalício',
    objective: 'Fortalecimento seguro com foco em lipedema',
    level: 'Todos os níveis',
    duration: '8 a 12 semanas',
    workoutsPerWeek: '3 a 4 treinos',
    location: 'Academia ou casa',
    features: [
      'Treinos de baixo impacto',
      'Exercícios adaptados e seguros',
      'Foco em circulação e redução de inchaço',
      'Orientações para quem tem lipedema',
      'Acesso vitalício ao conteúdo',
    ],
  },
  '8': {
    id: '8',
    title: 'Em Casa Sem Equipamento',
    description:
      'Programa completo de 8 a 12 semanas para treinar em casa usando apenas o peso do corpo. Ideal para gestantes e iniciantes.',
    price: 'R$ 49,90',
    accessPeriod: 'Vitalício',
    objective: 'Treinar em casa com segurança e consistência',
    level: 'Iniciante / Intermediário',
    duration: '8 a 12 semanas',
    workoutsPerWeek: '3 a 4 treinos',
    location: 'Casa',
    features: [
      'Apenas peso do corpo — sem equipamentos',
      'Ideal para gestantes e iniciantes',
      'Exercícios adaptados para gestação',
      'Acesso vitalício ao conteúdo',
    ],
  },
  // Emagrecimento
  '11': {
    id: '11',
    title: 'Abdominal Slim',
    description:
      'Programa de 8 a 12 semanas focado em fortalecimento e definição do abdômen. Treinos específicos para core, queima de gordura e postura.',
    price: 'R$ 29,90',
    accessPeriod: 'Vitalício',
    objective: 'Fortalecimento e definição do abdômen',
    level: 'Todos os níveis',
    duration: '8 a 12 semanas',
    workoutsPerWeek: '3 a 4 treinos',
    location: 'Academia ou casa',
    features: [
      'Foco em abdômen e core',
      'Fortalecimento de postura',
      'Exercícios para abdômen slim e definido',
      'Acesso vitalício ao conteúdo',
    ],
  },
  '12': {
    id: '12',
    title: 'Definição Feminina',
    description:
      'Programa de 8 a 12 semanas focado em definição e emagrecimento para mulheres. Combina treinos de força e cardio para um corpo definido e feminino.',
    price: 'R$ 69,90',
    accessPeriod: 'Vitalício',
    objective: 'Definição e emagrecimento feminino',
    level: 'Todos os níveis',
    duration: '8 a 12 semanas',
    workoutsPerWeek: '4 a 5 treinos',
    location: 'Academia',
    features: [
      'Combinação de força e cardio',
      'Foco em definição feminina',
      'Resultados visíveis e sustentáveis',
      'Acesso vitalício ao conteúdo',
    ],
  },
  // Hipertrofia
  '14': {
    id: '14',
    title: 'Hipertrofia Feminina',
    subtitle: 'Foco em Superiores',
    description:
      'Programa avançado de 8 a 12 semanas para mulheres que buscam ganho de massa muscular de forma saudável e feminina, com ênfase em superiores.',
    price: 'R$ 69,90',
    accessPeriod: 'Vitalício',
    objective: 'Hipertrofia com foco em superiores',
    level: 'Intermediário / Avançado',
    duration: '8 a 12 semanas',
    workoutsPerWeek: '4 a 5 treinos',
    location: 'Academia',
    features: [
      'Estrutura: superiores, glúteos, quadríceps e cardio',
      'Progressão pensada para hipertrofia feminina',
      'Acesso vitalício ao conteúdo',
    ],
  },
  // Treinos em Casa
  '17': {
    id: '17',
    title: 'Casa Completo',
    description:
      'Programa completo de 8 a 12 semanas para treinar em casa. Treinos variados e eficientes que trabalham todo o corpo sem necessidade de equipamentos.',
    price: 'R$ 59,90',
    accessPeriod: 'Vitalício',
    objective: 'Condicionamento completo em casa',
    level: 'Iniciante / Intermediário',
    duration: '8 a 12 semanas',
    workoutsPerWeek: '3 a 4 treinos',
    location: 'Casa',
    features: [
      'Trabalho de todo o corpo',
      'Sem necessidade de equipamentos',
      'Treinos variados e eficientes',
      'Acesso vitalício ao conteúdo',
    ],
  },
  '18': {
    id: '18',
    title: 'Treino de 20 Minutos',
    description:
      'Programa prático de 8 a 12 semanas com treinos rápidos de apenas 20 minutos. Perfeito para quem tem pouco tempo, mas quer resultados.',
    price: 'R$ 59,90',
    accessPeriod: 'Vitalício',
    objective: 'Resultados com pouco tempo disponível',
    level: 'Todos os níveis',
    duration: '8 a 12 semanas',
    workoutsPerWeek: '4 a 5 treinos',
    location: 'Casa',
    features: [
      'Treinos de apenas 20 minutos',
      'Ideal para rotina apertada',
      'Sessões eficientes e objetivas',
      'Acesso vitalício ao conteúdo',
    ],
  },
  '19': {
    id: '19',
    title: 'HIIT Sem Equipamento',
    subtitle: 'Para derreter gordura',
    description:
      'Programa de 8 a 12 semanas com treinos HIIT intensos usando apenas o peso do corpo. Versões para iniciante, intermediário e avançado.',
    price: 'R$ 59,90',
    accessPeriod: 'Vitalício',
    objective: 'Queima de gordura com HIIT em casa',
    level: 'Todos os níveis',
    duration: '8 a 12 semanas',
    workoutsPerWeek: '3 a 4 treinos',
    location: 'Casa',
    features: [
      'Treinos HIIT intensos',
      'Apenas peso do corpo',
      'Versões para iniciante, intermediário e avançado',
      'Acesso vitalício ao conteúdo',
    ],
  },
  '20': {
    id: '20',
    title: 'Alongamento e Flexibilidade',
    description:
      'Programa de 8 a 12 semanas focado em alongamento e flexibilidade. Exercícios para melhorar amplitude de movimento, relaxamento muscular e bem-estar.',
    price: 'R$ 59,90',
    accessPeriod: 'Vitalício',
    objective: 'Melhorar flexibilidade e bem-estar',
    level: 'Todos os níveis',
    duration: '8 a 12 semanas',
    workoutsPerWeek: '3 a 4 sessões',
    location: 'Casa',
    features: [
      'Alongamento e flexibilidade',
      'Melhora da amplitude de movimento',
      'Relaxamento muscular e prevenção de lesões',
      'Acesso vitalício ao conteúdo',
    ],
  },
  // Desafios
  '23': {
    id: '23',
    title: 'Desafio 21 dias',
    description:
      'Desafio de 21 dias para criar o hábito de treinar. Programa intensivo com treinos diários para resultados rápidos e transformação em 3 semanas.',
    price: 'R$ 59,90',
    accessPeriod: 'Vitalício',
    objective: 'Criar o hábito de treinar em 21 dias',
    level: 'Todos os níveis',
    duration: '21 dias',
    workoutsPerWeek: 'Treinos diários',
    location: 'Academia ou casa',
    features: [
      'Programa intensivo de 21 dias',
      'Treinos diários para criar o hábito',
      'Foco em resultados rápidos',
      'Acesso vitalício ao conteúdo',
    ],
  },
  '24': {
    id: '24',
    title: 'Desafio 30 dias',
    description:
      'Desafio de 30 dias para emagrecimento e condicionamento. Um mês de treinos estruturados para você ver resultados reais.',
    price: 'R$ 59,90',
    accessPeriod: 'Vitalício',
    objective: 'Emagrecimento e condicionamento em 30 dias',
    level: 'Todos os níveis',
    duration: '30 dias',
    workoutsPerWeek: '5 a 6 treinos',
    location: 'Academia ou casa',
    features: [
      'Programa intensivo de 30 dias',
      'Foco em emagrecimento e condicionamento',
      'Resultados em 1 mês',
      'Acesso vitalício ao conteúdo',
    ],
  },
  // Consultoria Personalizada
  '21': {
    id: '21',
    title: 'Consultoria Personalizada',
    subtitle: 'Mensal',
    description:
      'Planejamento individual e acompanhamento mais próximo diretamente com a Maju. Treinos ajustados à sua rotina, objetivos e evolução, com análise de vídeos e suporte contínuo.',
    price: 'R$ 180,00',
    features: [
      'Planejamento individual feito para você',
      'Suporte diário durante todo o plano',
      'Envio de vídeos para correção de exercícios',
      'Treinos ajustados à sua rotina e objetivos',
      'Análise dos vídeos de execução',
      'Adaptações conforme sua evolução',
    ],
  },
  '22': {
    id: '22',
    title: 'Consultoria Personalizada',
    subtitle: 'Trimestral',
    description:
      'Acompanhamento individual por 3 meses, com troca de treino mensal, ajustes conforme sua evolução e análise dos vídeos de execução. Mais tempo juntos, mais progressão — e mais vantagem no investimento.',
    price: 'R$ 480,00',
    features: [
      'Planejamento individual feito para você',
      'Suporte diário durante todo o plano',
      'Troca de treino mensal por 3 meses',
      'Envio de vídeos para correção de exercícios',
      'Ajustes conforme sua evolução',
      'Mais vantagem no investimento',
    ],
  },
};
