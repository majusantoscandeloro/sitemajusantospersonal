export interface ProgramDetails {
  id: string;
  title: string;
  description: string;
  price: string;
  features?: string[];
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
    title: 'Queima Intensa',
    description: 'Programa intenso de 6 semanas focado em queima de gordura e aceleração do metabolismo. Treinos dinâmicos e eficientes para resultados rápidos e consistentes.',
    price: 'R$ 100,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 6 semanas',
      'Foco em queima de gordura',
      'Treinos intensos e dinâmicos',
      'Aceleração do metabolismo',
      'Resultados rápidos'
    ],
  },
  '3': {
    id: '3',
    title: 'Hipertrofia Feminina',
    description: 'Programa avançado de 12 semanas desenvolvido especificamente para mulheres que buscam ganho de massa muscular de forma saudável e feminina. Foco em glúteos, pernas e braços.',
    price: 'R$ 150,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa completo de 12 semanas',
      'Foco em hipertrofia feminina',
      'Treinos para glúteos, pernas e braços',
      'Progressão estruturada',
      'Acompanhamento detalhado'
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
  // Para Iniciantes
  '5': {
    id: '5',
    title: 'Primeiros Passos',
    description: 'Programa ideal para quem está começando na academia. Treinos leves e progressivos de 6 semanas para criar o hábito e ganhar confiança nos exercícios.',
    price: 'R$ 90,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 6 semanas para iniciantes',
      'Treinos leves e progressivos',
      'Criação de hábito de treino',
      'Aprendizado dos movimentos básicos',
      'Ganho de confiança'
    ],
  },
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
    description: 'Programa completo de 6 semanas para treinar em casa usando apenas o peso do corpo. Treinos eficientes sem necessidade de aparelhos.',
    price: 'R$ 85,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 6 semanas',
      'Treinos em casa',
      'Apenas peso do corpo',
      'Sem necessidade de equipamentos',
      'Treinos completos e eficientes'
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
  '13': {
    id: '13',
    title: 'Glúteos Definidos',
    description: 'Programa de 8 semanas focado exclusivamente no desenvolvimento dos glúteos. Treinos específicos para ganho de massa e definição na região glútea.',
    price: 'R$ 125,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 8 semanas',
      'Foco exclusivo em glúteos',
      'Ganho de massa muscular',
      'Definição da região glútea',
      'Treinos específicos e eficazes'
    ],
  },
  '14': {
    id: '14',
    title: 'Ganho de Massa',
    description: 'Programa avançado de 12 semanas para ganho de massa muscular em todo o corpo. Treinos intensos e progressivos para resultados máximos.',
    price: 'R$ 160,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa completo de 12 semanas',
      'Ganho de massa muscular',
      'Treinos intensos e progressivos',
      'Desenvolvimento de todo o corpo',
      'Resultados máximos'
    ],
  },
  '15': {
    id: '15',
    title: 'Força e Definição',
    description: 'Programa avançado de 10 semanas que combina desenvolvimento de força com definição muscular. Ideal para quem busca um corpo forte e definido.',
    price: 'R$ 145,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa de 10 semanas',
      'Desenvolvimento de força',
      'Definição muscular',
      'Corpo forte e definido',
      'Treinos avançados'
    ],
  },
  '16': {
    id: '16',
    title: 'Volume Muscular',
    description: 'Programa avançado de 16 semanas focado em ganho máximo de volume muscular. Treinos intensos e progressivos para resultados excepcionais.',
    price: 'R$ 200,00',
    features: [
      'Acesso ao meu aplicativo para visualizar os exercícios reais',
      'Programa completo de 16 semanas',
      'Ganho máximo de volume',
      'Treinos intensos e progressivos',
      'Desenvolvimento completo',
      'Resultados excepcionais'
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
