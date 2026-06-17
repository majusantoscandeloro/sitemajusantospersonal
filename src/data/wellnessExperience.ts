export const WELLNESS_MAX_CAPACITY = 60;

export const WELLNESS_PRODUCT_IDS = {
  individual: 'wellness_experience_individual',
  dupla: 'wellness_experience_dupla',
} as const;

export const WELLNESS_PRICES = {
  individual: 2000, // R$ 20,00
  dupla: 4000, // R$ 40,00
} as const;

export const WELLNESS_PENDING_CHECKOUT_KEY = 'maju-wellness-pending-checkout';

export const WELLNESS_EVENT = {
  title: 'Wellness Experience',
  date: 'Domingo, 26 de julho de 2026',
  time: '08:00',
  location: 'Vixe Club',
  city: 'Marília - SP',
  pillars: ['Movimento', 'Conexão', 'Bem-estar'] as const,
  activities: [
    { label: 'Treino funcional', icon: 'dumbbell' as const },
    { label: 'Café da manhã', icon: 'coffee' as const },
    { label: 'Momento de aprendizado', icon: 'brain' as const },
    { label: 'Sorteios especiais', icon: 'gift' as const },
  ],
};
