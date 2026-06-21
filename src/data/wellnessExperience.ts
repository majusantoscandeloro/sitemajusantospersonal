/** Máximo de inscrições (cada uma pode levar até 1 acompanhante = até 60 pessoas). */
export const WELLNESS_MAX_SLOTS = 30;
export const WELLNESS_MAX_PEOPLE = 60;

/** Alias usado no contador de vagas (1 inscrição = 1 vaga). */
export const WELLNESS_MAX_CAPACITY = WELLNESS_MAX_SLOTS;

/** Rotas públicas do evento (URLs amigáveis) */
export const EVENTOS_PATH = '/eventos';
export const WELLNESS_PATH = '/eventos/wellness-experience';
export const WELLNESS_INSCRICAO_PATH = '/eventos/wellness-experience/inscricao';

/** Único produto ativo: R$ 40 — acompanhante opcional. */
export const WELLNESS_PRODUCT_ID = 'wellness_experience_dupla';
export const WELLNESS_PRICE = 4000; // R$ 40,00

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
