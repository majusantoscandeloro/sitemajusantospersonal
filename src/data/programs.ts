import programStrength from '@/assets/program-strength.jpg';
import programHome from '@/assets/program-home.jpg';
import programCardio from '@/assets/program-cardio.jpg';
import programBeginner from '@/assets/program-beginner.jpg';
import programHypertrophy from '@/assets/program-hypertrophy.jpg';
import quadricepsNovo from '@/assets/novo preset/quadriceps.png';
import gluteosNovo from '@/assets/novo preset/gluteos.png';
import superioresNovo from '@/assets/novo preset/superiores-triceps.png';
import casaNovo from '@/assets/casanovo.png';
import gravida from '@/assets/gravida.jpg';
import programFatburn from '@/assets/program-fatburn.jpg';
import onlineNovo from '@/assets/onlinenovo.png';
import defImg from '@/assets/novo preset/superiores-biceps.png';
import desafiosImg from '@/assets/desafios.png';
import inicialNovo from '@/assets/novo preset/superiore-ombro.png';
import lipedemaImg from '@/assets/novo preset/posteriores.png';
import abdominalNovo from '@/assets/novo preset/abdominal.png';
import defFemNovo from '@/assets/novo preset/superiores-biceps.png';

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
        image: defImg,
        level: 'Intermediário' as const,
        duration: '8 a 12 semanas',
        category: 'Top #1',
      },
      {
        id: '2',
        title: 'Hipertrofia Feminina',
        subtitle: 'Foco em Quadríceps',
        image: quadricepsNovo,
        level: 'Avançado' as const,
        duration: '8 a 12 semanas',
        category: 'Intermediário, Avançado',
      },
      {
        id: '3',
        title: 'Hipertrofia Feminina',
        subtitle: 'foco em glúteos',
        image: gluteosNovo,
        level: 'Avançado' as const,
        duration: '8 a 12 semanas',
        category: 'Intermediário, Avançado',
      },
    ],
  },
  challenges: {
    title: 'Desafios',
    programs: [
      {
        id: '23',
        title: 'Desafio 21 dias',
        image: desafiosImg,
        level: 'Iniciante' as const,
        duration: '21 dias',
        category: 'Iniciante, Intermediário, Avançado',
      },
      {
        id: '24',
        title: 'Desafio 30 dias',
        image: desafiosImg,
        level: 'Intermediário' as const,
        duration: '30 dias',
        category: 'Iniciante, Intermediário, Avançado',
      },
    ],
  },
  beginner: {
    title: 'Iniciantes / Especiais',
    programs: [
      {
        id: '6',
        title: 'Start Inicial',
        image: inicialNovo,
        level: 'Iniciante' as const,
        duration: '8 a 12 semanas',
      },
      {
        id: '7',
        title: 'Lipedema',
        image: lipedemaImg,
        level: 'Iniciante' as const,
        duration: '8 a 12 semanas',
        category: 'Iniciante, Intermediário, Avançado',
      },
    ],
  },
  weightLoss: {
    title: 'Emagrecimento',
    programs: [
      {
        id: '11',
        title: 'Abdominal Slim',
        image: abdominalNovo,
        level: 'Intermediário' as const,
        duration: '8 a 12 semanas',
        category: 'Iniciante, Intermediário, Avançado',
      },
      {
        id: '12',
        title: 'Definição Feminina',
        image: defFemNovo,
        level: 'Intermediário' as const,
        duration: '8 a 12 semanas',
        category: 'Iniciante, Intermediário, Avançado',
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
        image: quadricepsNovo,
        level: 'Avançado' as const,
        duration: '8 a 12 semanas',
        category: 'Intermediário, Avançado',
      },
      {
        id: '3',
        title: 'Hipertrofia Feminina',
        subtitle: 'foco em glúteos',
        image: gluteosNovo,
        level: 'Avançado' as const,
        duration: '8 a 12 semanas',
        category: 'Intermediário, Avançado',
      },
      {
        id: '14',
        title: 'Hipertrofia Feminina',
        subtitle: 'Foco em Superiores',
        image: superioresNovo,
        level: 'Avançado' as const,
        duration: '8 a 12 semanas',
        category: 'Intermediário, Avançado',
      },
    ],
  },
  homeWorkout: {
    title: 'Treinos em Casa',
    programs: [
      {
        id: '8',
        title: 'Em Casa Sem Equipamento',
        image: casaNovo,
        level: 'Iniciante' as const,
        duration: '8 a 12 semanas',
        category: 'Iniciante, Intermediário',
      },
      {
        id: '17',
        title: 'Casa Completo',
        image: casaNovo,
        level: 'Intermediário' as const,
        duration: '8 a 12 semanas',
        category: 'Iniciante, Intermediário',
      },
      {
        id: '19',
        title: 'HIIT Sem Equipamento',
        subtitle: 'Para derreter gordura',
        image: casaNovo,
        level: 'Intermediário' as const,
        duration: '8 a 12 semanas',
        category: 'Iniciante, Intermediário, Avançado',
      },
    ],
  },
  consulting: {
    title: 'Consultoria Online',
    programs: [
      {
        id: '21',
        title: 'Acompanhamento Mensal',
        image: onlineNovo,
        level: 'Iniciante' as const,
        duration: 'Mensal',
        category: 'Iniciante, Intermediário, Avançado',
      },
      {
        id: '22',
        title: 'Acompanhamento Trimestral',
        image: onlineNovo,
        level: 'Iniciante' as const,
        duration: '3 meses',
        category: 'Iniciante, Intermediário, Avançado',
      },
    ],
  },
};
