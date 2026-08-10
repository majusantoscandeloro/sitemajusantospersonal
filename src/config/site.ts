/**
 * Configuração central do site (SEO, domínio, marca).
 * Para trocar o domínio futuro: defina VITE_SITE_URL no .env / Vercel,
 * ou altere DEFAULT_SITE_URL abaixo.
 */
export const DEFAULT_SITE_URL = 'https://majusantospersonal.vercel.app';

export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) || DEFAULT_SITE_URL
).replace(/\/$/, '');

export const SITE_NAME = 'Maju Santos';
export const SITE_TAGLINE = 'Programas de Treino e Consultoria Personalizada';

export const DEFAULT_TITLE = `${SITE_NAME} | ${SITE_TAGLINE}`;
export const DEFAULT_DESCRIPTION =
  'Programas de treino para diferentes objetivos, níveis e rotinas, com acesso pelo Majunity GO. Para quem busca algo individual, consultoria personalizada com a Maju.';

/** Imagem OG institucional (fallback). */
export const DEFAULT_OG_IMAGE_PATH = '/og-image.jpg?v=2';

export const WHATSAPP_NUMBER = '5514910117854';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Pré-cadastro da Consultoria VIP (fluxo externo). */
export const CONSULTORIA_PRECADASTRO_URL = 'https://apponfit.web.app/';

/** Rotas públicas canônicas (indexáveis ou não). */
export const PATHS = {
  home: '/',
  programs: '/programas',
  program: (slug: string) => `/programas/${slug}`,
  consulting: '/consultoria-online',
  links: '/links',
  events: '/eventos',
  wellness: '/eventos/wellness-experience',
  wellnessInscricao: '/eventos/wellness-experience/inscricao',
  cart: '/cart',
  checkout: '/checkout',
  success: '/success',
  obrigado: '/obrigado',
  pending: '/pending',
  failure: '/failure',
  account: '/minha-conta',
} as const;

/** Páginas que não devem ser indexadas. */
export const NOINDEX_PATHS: readonly string[] = [
  PATHS.cart,
  PATHS.checkout,
  PATHS.success,
  PATHS.obrigado,
  PATHS.pending,
  PATHS.failure,
  PATHS.account,
  PATHS.wellnessInscricao,
];
