import programStrength from '@/assets/program-strength.jpg';
import programHome from '@/assets/program-home.jpg';
import programCardio from '@/assets/program-cardio.jpg';
import programBeginner from '@/assets/program-beginner.jpg';
import programHypertrophy from '@/assets/program-hypertrophy.jpg';
import hipertrofiaGluteos from '@/assets/hipertrofia-gluteos.jpg';
import quadriceps from '@/assets/quadriceps.jpg';
import superiores from '@/assets/superiores.jpg';
import casa from '@/assets/casa.jpg';
import gravida from '@/assets/gravida.jpg';
import programFatburn from '@/assets/program-fatburn.jpg';
import programConsultoria from '@/assets/program-consultoria.jpg';

export interface Program {
  id: string;
  title: string;
  subtitle?: string;
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
        title: 'Hipertrofia Feminina',
        subtitle: 'Foco em Quadríceps',
        image: quadriceps,
        level: 'Avançado' as const,
        duration: '8 a 12 semanas',
        category: 'Novo',
      },
      {
        id: '3',
        title: 'Hipertrofia Feminina',
        subtitle: 'foco em glúteos',
        image: hipertrofiaGluteos,
        level: 'Avançado' as const,
        duration: '8 a 12 semanas',
      },
      {
        id: '4',
        title: 'Treino em Casa Express',
        image: casa,
        level: 'Iniciante' as const,
        duration: '4 semanas',
      },
    ],
  },
  beginner: {
    title: 'Iniciantes / Especiais',
    programs: [
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
        image: casa,
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
        id: '2',
        title: 'Hipertrofia Feminina',
        subtitle: 'Foco em Quadríceps',
        image: quadriceps,
        level: 'Avançado' as const,
        duration: '8 a 12 semanas',
        category: 'Novo',
      },
      {
        id: '3',
        title: 'Hipertrofia Feminina',
        subtitle: 'foco em glúteos',
        image: hipertrofiaGluteos,
        level: 'Avançado' as const,
        duration: '8 a 12 semanas',
      },
      {
        id: '14',
        title: 'Hipertrofia Feminina',
        subtitle: 'Foco em Superiores',
        image: superiores,
        level: 'Avançado' as const,
        duration: '8 a 12 semanas',
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
