export interface ProgramDetails {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  price: string;
  features?: string[];
  accessPeriod?: string;
}

export const programDetails: Record<string, ProgramDetails> = {
  // Mais Procurados
  '1': {
    id: '1',
    title: 'Definição Total',
    description: 'Programa completo de 8 semanas focado em definição muscular e perda de gordura. Treinos estruturados que combinam força e cardio para resultados visíveis e sustentáveis. Ideal para quem busca um corpo mais definido e tonificado.',
    price: 'R$ 120,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Treino completo de 8 semanas',
      'Exercícios para definição muscular',
      'Combinação de força e cardio',
      'Orientações de execução',
      'Acompanhamento da evolução'
    ],
  },
  '2': {
    id: '2',
    title: 'Hipertrofia Feminina',
    subtitle: 'Foco em Quadríceps',
    description: 'Programa avançado de 8 a 12 semanas desenvolvido especificamente para mulheres que buscam ganho de massa muscular de forma saudável e feminina. Com foco em quadríceps.',
    price: 'R$ 89,90',
    accessPeriod: '90 dias',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa completo de 8 a 12 semanas',
      'Foco em hipertrofia feminina com foco em quadríceps',
      'Estrutura: quadríceps, glúteos, superiores e cardio',
      'Acesso ao conteúdo por 90 dias',
      'Progressão estruturada e acompanhamento detalhado'
    ],
  },
  '3': {
    id: '3',
    title: 'Hipertrofia Feminina',
    subtitle: 'foco em glúteos',
    description: 'Programa avançado de 8 a 12 semanas desenvolvido especificamente para mulheres que buscam ganho de massa muscular de forma saudável e feminina. Com foco em glúteos.',
    price: 'R$ 89,90',
    accessPeriod: '90 dias',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa completo de 8 a 12 semanas',
      'Foco em hipertrofia feminina com foco em glúteos',
      'Estrutura: glúteos, quadríceps, superiores e cardio',
      'Acesso ao conteúdo por 90 dias',
      'Progressão estruturada e acompanhamento detalhado'
    ],
  },
  '4': {
    id: '4',
    title: 'Treino em Casa Express',
    description: 'Programa prático de 4 semanas para fazer em casa, sem necessidade de equipamentos. Treinos rápidos e eficientes que cabem na sua rotina.',
    price: 'R$ 80,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 4 semanas',
      'Treinos em casa',
      'Sem necessidade de equipamentos',
      'Treinos rápidos e práticos',
      'Fácil de encaixar na rotina'
    ],
  },
  // Iniciantes / Especiais
  '6': {
    id: '6',
    title: 'Força do Zero',
    description: 'Programa de 8 semanas focado em desenvolver força e resistência desde o início. Ideal para quem quer construir uma base sólida de força.',
    price: 'R$ 110,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 8 semanas',
      'Desenvolvimento de força',
      'Construção de base sólida',
      'Progressão gradual',
      'Foco em técnica correta'
    ],
  },
  '7': {
    id: '7',
    title: 'Cardio Leve',
    description: 'Programa de 4 semanas com treinos cardiovasculares leves e acessíveis. Perfeito para melhorar condicionamento físico sem sobrecarga.',
    price: 'R$ 70,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 4 semanas',
      'Treinos cardiovasculares leves',
      'Melhora do condicionamento',
      'Baixo impacto',
      'Ideal para iniciantes'
    ],
  },
  '8': {
    id: '8',
    title: 'Em Casa Sem Equipamento',
    description: 'Programa completo de 6 semanas para treinar em casa usando apenas o peso do corpo. Ideal para gestantes e iniciantes. Treinos seguros e eficientes sem necessidade de aparelhos, adaptados para diferentes fases da gestação.',
    price: 'R$ 85,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 6 semanas',
      'Treinos em casa',
      'Ideal para gestantes e iniciantes',
      'Apenas peso do corpo',
      'Sem necessidade de equipamentos',
      'Exercícios adaptados para gestação',
      'Treinos seguros, completos e eficientes'
    ],
  },
  // Emagrecimento
  '9': {
    id: '9',
    title: 'Queima 30 Dias',
    description: 'Programa intenso de 4 semanas focado em queima de gordura e emagrecimento. Treinos eficientes para resultados em 30 dias.',
    price: 'R$ 95,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 4 semanas (30 dias)',
      'Foco em queima de gordura',
      'Treinos intensos e eficientes',
      'Resultados rápidos',
      'Aceleração do metabolismo'
    ],
  },
  '10': {
    id: '10',
    title: 'HIIT Intenso',
    description: 'Programa avançado de 6 semanas com treinos HIIT (High Intensity Interval Training) para máxima queima de gordura e condicionamento.',
    price: 'R$ 130,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 6 semanas',
      'Treinos HIIT intensos',
      'Máxima queima de gordura',
      'Melhora do condicionamento',
      'Treinos curtos e eficientes'
    ],
  },
  '11': {
    id: '11',
    title: 'Metabolismo Acelerado',
    description: 'Programa de 8 semanas focado em acelerar o metabolismo através de treinos estratégicos. Ideal para quem quer emagrecer de forma sustentável.',
    price: 'R$ 120,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 8 semanas',
      'Aceleração do metabolismo',
      'Treinos estratégicos',
      'Emagrecimento sustentável',
      'Resultados duradouros'
    ],
  },
  '12': {
    id: '12',
    title: 'Definição Feminina',
    description: 'Programa de 10 semanas focado em definição e emagrecimento para mulheres. Combina treinos de força e cardio para um corpo definido e feminino.',
    price: 'R$ 140,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 10 semanas',
      'Foco em definição feminina',
      'Combinação força e cardio',
      'Corpo definido e tonificado',
      'Resultados visíveis'
    ],
  },
  // Hipertrofia
  '14': {
    id: '14',
    title: 'Hipertrofia Feminina',
    subtitle: 'Foco em Superiores',
    description: 'Programa avançado de 8 a 12 semanas desenvolvido especificamente para mulheres que buscam ganho de massa muscular de forma saudável e feminina. Com foco em superiores.',
    price: 'R$ 89,90',
    accessPeriod: '90 dias',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa completo de 8 a 12 semanas',
      'Foco em hipertrofia feminina com foco em superiores',
      'Estrutura: superiores, glúteos, quadríceps e cardio',
      'Acesso ao conteúdo por 90 dias',
      'Progressão estruturada e acompanhamento detalhado'
    ],
  },
  // Treinos em Casa
  '17': {
    id: '17',
    title: 'Casa Completo',
    description: 'Programa completo de 8 semanas para treinar em casa. Treinos variados e eficientes que trabalham todo o corpo sem necessidade de equipamentos.',
    price: 'R$ 110,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa completo de 8 semanas',
      'Treinos em casa',
      'Trabalho de todo o corpo',
      'Sem necessidade de equipamentos',
      'Treinos variados e eficientes'
    ],
  },
  '18': {
    id: '18',
    title: 'Treino de 20 Minutos',
    description: 'Programa prático de 4 semanas com treinos rápidos de apenas 20 minutos. Perfeito para quem tem pouco tempo mas quer resultados.',
    price: 'R$ 75,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 4 semanas',
      'Treinos de apenas 20 minutos',
      'Ideal para quem tem pouco tempo',
      'Treinos eficientes e rápidos',
      'Resultados mesmo com rotina apertada'
    ],
  },
  '19': {
    id: '19',
    title: 'HIIT Sem Equipamento',
    description: 'Programa de 6 semanas com treinos HIIT intensos usando apenas o peso do corpo. Queima máxima de gordura sem sair de casa.',
    price: 'R$ 100,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 6 semanas',
      'Treinos HIIT intensos',
      'Apenas peso do corpo',
      'Queima máxima de gordura',
      'Treinos em casa'
    ],
  },
  '20': {
    id: '20',
    title: 'Flexibilidade e Força',
    description: 'Programa de 6 semanas que combina exercícios de força com alongamento e flexibilidade. Ideal para quem busca um corpo forte e flexível.',
    price: 'R$ 90,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 6 semanas',
      'Combinação força e flexibilidade',
      'Exercícios de alongamento',
      'Corpo forte e flexível',
      'Prevenção de lesões'
    ],
  },
  // Consultoria Online
  '21': {
    id: '21',
    title: 'Acompanhamento Mensal',
    description: 'Acompanhamento personalizado com treinos ajustados à sua rotina, objetivos e evolução. Análise dos vídeos de execução dos exercícios, suporte contínuo, orientações claras e adaptações durante todo o mês para garantir resultados consistentes, onde você estiver.',
    price: 'R$ 180,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Suporte Diário a todo o tempo do plano',
      'Envio de vídeos para correção de exercícios',
      'Treinos ajustados à sua rotina e objetivos',
      'Análise dos vídeos de execução',
      'Orientações claras e adaptações mensais',
      'Acompanhamento personalizado contínuo'
    ],
  },
  '22': {
    id: '22',
    title: 'Acompanhamento Trimestral',
    description: 'Acompanhamento online por 3 meses, com troca de treino mensal, ajustes conforme sua evolução e análise dos vídeos de execução dos exercícios. Um plano completo para quem busca constância, progressão e resultados reais ao longo do tempo, com mais vantagem no investimento.',
    price: 'R$ 480,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Suporte Diário a todo o tempo do plano',
      'Envio de vídeos para correção de exercícios',
      'Troca de treino mensal por 3 meses',
      'Ajustes conforme sua evolução',
      'Análise dos vídeos de execução',
      'Plano completo com mais vantagem no investimento',
      'Constância, progressão e resultados reais'
    ],
  },
};
