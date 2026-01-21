import programStrength from '@/assets/program-strength.jpg';
import programHome from '@/assets/program-home.jpg';
import programCardio from '@/assets/program-cardio.jpg';
import programBeginner from '@/assets/program-beginner.jpg';
import programHypertrophy from '@/assets/program-hypertrophy.jpg';
import programFatburn from '@/assets/program-fatburn.jpg';
import programConsultoria from '@/assets/program-consultoria.jpg';

export interface Program {
  id: string;
  title: string;
  image: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  duration: string;
  category?: string;
}

export const programCategories = {
  popular: {
    title: 'Mais Procurados',
    programs: [
      {
        id: '1',
        title: 'Definição Total',
        image: programStrength,
        level: 'Intermediário' as const,
        duration: '8 semanas',
        category: 'Top #1',
      },
      {
        id: '2',
        title: 'Queima Intensa',
        image: programFatburn,
        level: 'Intermediário' as const,
        duration: '6 semanas',
        category: 'Novo',
      },
      {
        id: '3',
        title: 'Hipertrofia Feminina',
        image: programHypertrophy,
        level: 'Avançado' as const,
        duration: '12 semanas',
      },
      {
        id: '4',
        title: 'Treino em Casa Express',
        image: programHome,
        level: 'Iniciante' as const,
        duration: '4 semanas',
      },
    ],
  },
  beginner: {
    title: 'Para Iniciantes',
    programs: [
      {
        id: '5',
        title: 'Primeiros Passos',
        image: programBeginner,
        level: 'Iniciante' as const,
        duration: '6 semanas',
        category: 'Recomendado',
      },
      {
        id: '6',
        title: 'Força do Zero',
        image: programStrength,
        level: 'Iniciante' as const,
        duration: '8 semanas',
      },
      {
        id: '7',
        title: 'Cardio Leve',
        image: programCardio,
        level: 'Iniciante' as const,
        duration: '4 semanas',
      },
      {
        id: '8',
        title: 'Em Casa Sem Equipamento',
        image: programHome,
        level: 'Iniciante' as const,
        duration: '6 semanas',
      },
    ],
  },
  weightLoss: {
    title: 'Emagrecimento',
    programs: [
      {
        id: '9',
        title: 'Queima 30 Dias',
        image: programFatburn,
        level: 'Iniciante' as const,
        duration: '4 semanas',
        category: 'Popular',
      },
      {
        id: '10',
        title: 'HIIT Intenso',
        image: programCardio,
        level: 'Avançado' as const,
        duration: '6 semanas',
      },
      {
        id: '11',
        title: 'Metabolismo Acelerado',
        image: programStrength,
        level: 'Intermediário' as const,
        duration: '8 semanas',
      },
      {
        id: '12',
        title: 'Definição Feminina',
        image: programHypertrophy,
        level: 'Intermediário' as const,
        duration: '10 semanas',
      },
    ],
  },
  hypertrophy: {
    title: 'Hipertrofia',
    programs: [
      {
        id: '13',
        title: 'Glúteos Definidos',
        image: programHypertrophy,
        level: 'Intermediário' as const,
        duration: '8 semanas',
        category: 'Best Seller',
      },
      {
        id: '14',
        title: 'Ganho de Massa',
        image: programStrength,
        level: 'Avançado' as const,
        duration: '12 semanas',
      },
      {
        id: '15',
        title: 'Força e Definição',
        image: programFatburn,
        level: 'Avançado' as const,
        duration: '10 semanas',
      },
      {
        id: '16',
        title: 'Volume Muscular',
        image: programHypertrophy,
        level: 'Avançado' as const,
        duration: '16 semanas',
      },
    ],
  },
  homeWorkout: {
    title: 'Treinos em Casa',
    programs: [
      {
        id: '17',
        title: 'Casa Completo',
        image: programHome,
        level: 'Intermediário' as const,
        duration: '8 semanas',
        category: 'Favorito',
      },
      {
        id: '18',
        title: 'Treino de 20 Minutos',
        image: programBeginner,
        level: 'Iniciante' as const,
        duration: '4 semanas',
      },
      {
        id: '19',
        title: 'HIIT Sem Equipamento',
        image: programCardio,
        level: 'Intermediário' as const,
        duration: '6 semanas',
      },
      {
        id: '20',
        title: 'Flexibilidade e Força',
        image: programHome,
        level: 'Iniciante' as const,
        duration: '6 semanas',
      },
    ],
  },
  consulting: {
    title: 'Consultoria Online',
    programs: [
      {
        id: '21',
        title: 'Acompanhamento Mensal',
        image: programConsultoria,
        level: 'Iniciante' as const,
        duration: 'Mensal',
        category: 'Iniciante, Intermediário, Avançado',
      },
      {
        id: '22',
        title: 'Acompanhamento Trimestral',
        image: programConsultoria,
        level: 'Iniciante' as const,
        duration: '3 meses',
        category: 'Iniciante, Intermediário, Avançado',
      },
    ],
  },
};
