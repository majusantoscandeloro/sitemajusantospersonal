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
    description: 'Programa completo de 8 a 12 semanas focado em definição muscular e perda de gordura. Treinos estruturados que combinam força e cardio para resultados visíveis e sustentáveis. Ideal para quem busca um corpo mais definido e tonificado.',
    price: 'R$ 120,00',
    accessPeriod: '90 dias',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Treino completo de 8 a 12 semanas',
      'Acesso ao conteúdo por 90 dias',
      'Exercícios para definição muscular',
      'Combinação de força e cardio',
      'Orientações de execução'
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
      'Acesso ao conteúdo por 90 dias'
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
      'Acesso ao conteúdo por 90 dias'
    ],
  },
  '4': {
    id: '4',
    title: 'Treino em Casa Express',
    description: 'Programa prático de 8 a 12 semanas para fazer em casa, sem necessidade de equipamentos. Treinos rápidos e eficientes que cabem na sua rotina.',
    price: 'R$ 59,90',
    accessPeriod: '90 dias',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 8 a 12 semanas',
      'Acesso ao conteúdo por 90 dias',
      'Treinos em casa',
      'Sem necessidade de equipamentos',
      'Treinos rápidos e práticos',
      'Fácil de encaixar na rotina'
    ],
  },
  // Iniciantes / Especiais
  '6': {
    id: '6',
    title: 'Start Inicial',
    description: 'Programa de 8 a 12 semanas focado em desenvolver força e resistência desde o início. Ideal para quem quer construir uma base sólida de força.',
    price: 'R$ 89,90',
    accessPeriod: '90 dias',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 8 a 12 semanas',
      'Acesso ao conteúdo por 90 dias',
      'Desenvolvimento de força',
      'Construção de base sólida',
      'Progressão gradual',
      'Foco em técnica correta'
    ],
  },
  '7': {
    id: '7',
    title: 'Lipedema',
    description: 'Programa de 8 a 12 semanas desenvolvido especialmente para mulheres com lipedema. Treinos de baixo impacto que ajudam na circulação, redução de inchaço e fortalecimento muscular, com exercícios seguros e adaptados para quem convive com a condição.',
    price: 'R$ 89,90',
    accessPeriod: '90 dias',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Acesso ao conteúdo por 90 dias',
      'Treinos de baixo impacto',
      'Foco em circulação e redução de inchaço',
      'Exercícios adaptados e seguros',
      'Fortalecimento muscular progressivo',
      'Orientações para quem tem lipedema'
    ],
  },
  '8': {
    id: '8',
    title: 'Em Casa Sem Equipamento',
    description: 'Programa completo de 8 a 12 semanas para treinar em casa usando apenas o peso do corpo. Ideal para gestantes e iniciantes. Treinos seguros e eficientes sem necessidade de aparelhos, adaptados para diferentes fases da gestação.',
    price: 'R$ 59,90',
    accessPeriod: '90 dias',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 8 a 12 semanas',
      'Acesso ao conteúdo por 90 dias',
      'Treinos em casa',
      'Ideal para gestantes e iniciantes',
      'Apenas peso do corpo',
      'Sem necessidade de equipamentos',
      'Exercícios adaptados para gestação',
      'Treinos seguros, completos e eficientes'
    ],
  },
  // Emagrecimento
  '11': {
    id: '11',
    title: 'Abdominal Slim',
    description: 'Programa de 8 a 12 semanas focado em fortalecimento e definição do abdômen. Treinos específicos para core, queima de gordura localizada e postura, com exercícios eficazes para um abdômen definido e slim.',
    price: 'R$ 29,90',
    accessPeriod: '90 dias',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 8 a 12 semanas',
      'Acesso ao conteúdo por 90 dias',
      'Foco em abdômen e core',
      'Treinos para definição abdominal',
      'Fortalecimento de core e postura',
      'Exercícios para abdômen slim e definido'
    ],
  },
  '12': {
    id: '12',
    title: 'Definição Feminina',
    description: 'Programa de 8 a 12 semanas focado em definição e emagrecimento para mulheres. Combina treinos de força e cardio para um corpo definido e feminino.',
    price: 'R$ 89,90',
    accessPeriod: '90 dias',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 8 a 12 semanas',
      'Acesso ao conteúdo por 90 dias',
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
      'Acesso ao conteúdo por 90 dias'
    ],
  },
  // Treinos em Casa
  '17': {
    id: '17',
    title: 'Casa Completo',
    description: 'Programa completo de 8 a 12 semanas para treinar em casa. Treinos variados e eficientes que trabalham todo o corpo sem necessidade de equipamentos.',
    price: 'R$ 59,90',
    accessPeriod: '90 dias',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa completo de 8 a 12 semanas',
      'Acesso ao conteúdo por 90 dias',
      'Treinos em casa',
      'Trabalho de todo o corpo',
      'Sem necessidade de equipamentos',
      'Treinos variados e eficientes'
    ],
  },
  '18': {
    id: '18',
    title: 'Treino de 20 Minutos',
    description: 'Programa prático de 8 a 12 semanas com treinos rápidos de apenas 20 minutos. Perfeito para quem tem pouco tempo mas quer resultados.',
    price: 'R$ 59,90',
    accessPeriod: '90 dias',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 8 a 12 semanas',
      'Acesso ao conteúdo por 90 dias',
      'Treinos de apenas 20 minutos',
      'Ideal para quem tem pouco tempo',
      'Treinos eficientes e rápidos',
      'Resultados mesmo com rotina apertada'
    ],
  },
  '19': {
    id: '19',
    title: 'HIIT Sem Equipamento',
    subtitle: 'Para derreter gordura',
    description: 'Programa de 8 a 12 semanas com treinos HIIT intensos usando apenas o peso do corpo. Desenvolvido para derreter gordura, com versões para iniciante, intermediário e avançado. Queima máxima sem sair de casa.',
    price: 'R$ 59,90',
    accessPeriod: '90 dias',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 8 a 12 semanas para derreter gordura',
      'Acesso ao conteúdo por 90 dias',
      'Treinos HIIT intensos',
      'Apenas peso do corpo',
      'Versões para iniciante, intermediário e avançado',
      'Treinos em casa'
    ],
  },
  '20': {
    id: '20',
    title: 'Alongamento e Flexibilidade',
    description: 'Programa de 8 a 12 semanas focado em alongamento e flexibilidade. Exercícios para melhorar amplitude de movimento, relaxamento muscular e bem-estar.',
    price: 'R$ 59,90',
    accessPeriod: '90 dias',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 8 a 12 semanas',
      'Acesso ao conteúdo por 90 dias',
      'Alongamento e flexibilidade',
      'Melhora da amplitude de movimento',
      'Relaxamento muscular',
      'Prevenção de lesões e bem-estar'
    ],
  },
  // Desafios
  '23': {
    id: '23',
    title: 'Desafio 21 dias',
    description: 'Desafio de 21 dias para criar o hábito de treinar. Programa intensivo com treinos diários para resultados rápidos e transformação em 3 semanas.',
    price: 'R$ 79,90',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 21 dias',
      'Treinos diários',
      'Criação de hábito',
      'Resultados rápidos'
    ],
  },
  '24': {
    id: '24',
    title: 'Desafio 30 dias',
    description: 'Desafio de 30 dias para emagrecimento e condicionamento. Um mês de treinos estruturados para você ver resultados reais.',
    price: 'R$ 79,90',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 30 dias',
      'Treinos para emagrecimento e condicionamento',
      'Resultados em 1 mês'
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
