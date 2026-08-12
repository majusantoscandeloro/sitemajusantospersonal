import { CONSULTORIA_PRECADASTRO_URL } from '@/config/site';

export const linksSiteConfig = {
  name: 'Maju Santos',
  role: 'Personal Trainer & Criadora de Conteúdo',
  handle: '@majusantospersonal',
  headline: 'Tudo o que eu indico, em um só lugar',
  bio: 'Treinos, bem-estar, rotina saudável, achadinhos e marcas que fazem parte do meu dia a dia',
  profileImage: '/links/maju-profile-face.jpg',
  fallbackImage: '/links/fallback-card.svg',

  /**
   * URL CSV publicada do Google Sheets (opcional).
   * Preferência: VITE_BIOLINK_SHEETS_CSV_URL no .env / Vercel.
   */
  sheetsCsvUrl: (import.meta.env.VITE_BIOLINK_SHEETS_CSV_URL as string | undefined) || '',

  whatsapp: {
    number: '5514910117854',
    display: '+55 14 91011-7854',
    message: 'Olá Maju! Vim pelo seu link e gostaria de saber mais',
    label: 'Fale comigo no WhatsApp',
  },

  consultoria: {
    url: CONSULTORIA_PRECADASTRO_URL,
    label: 'Conheça minha consultoria',
  },

  shopee: {
    url: 'https://mycollection.shop/casaentredois',
  },

  inove: {
    url: 'https://www.inovenutrition.com.br/',
    label: 'Inove Nutrition',
  },

  superCoffee: {
    url: 'https://www.caffeinearmy.com.br/pages/vitrine-sc',
    label: 'SuperCoffee',
  },

  destraveClube: {
    url: 'https://destrave-clube.netlify.app/',
    label: 'Destrave Clube',
  },

  social: {
    instagram: 'https://instagram.com/majusantospersonal',
    tiktok: 'https://www.tiktok.com/@majusantospersonal',
    youtube: 'https://www.youtube.com/@majusantospersonal',
    email: 'majuscandeloro@outlook.com',
  },

  share: {
    title: 'Maju Santos | Links',
    text: 'Confira os links da Maju Santos — treinos, consultoria, marcas e achadinhos',
  },

  footer: {
    tagline: 'Treino, saúde e uma rotina possível',
  },
} as const;

export function getLinksWhatsAppUrl(): string {
  const { number, message } = linksSiteConfig.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
