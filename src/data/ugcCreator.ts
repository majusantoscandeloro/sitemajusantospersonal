/**
 * Conteúdo da página UGC Creator.
 *
 * Vídeos: coloque os arquivos locais em `src/assets/ugc/videos/`
 * e preencha `videoSrc` abaixo. O link completo (YouTube) vai em `fullUrl`.
 */
import fotoHero from '@/assets/fotos atuais maju/IMG_7217.JPEG';
import fotoAbout from '@/assets/fotos atuais maju/IMG_7211.webp';
import fotoGallery1 from '@/assets/fotos atuais maju/IMG_7210.webp';
import fotoGallery2 from '@/assets/fotos atuais maju/IMG_7212.webp';
import fotoGallery3 from '@/assets/fotos atuais maju/IMG_7214.webp';
import fotoGallery4 from '@/assets/fotos atuais maju/IMG_7215.JPEG';
import fotoCta from '@/assets/fotos atuais maju/IMG_7213.JPEG';
import fotoBrands from '@/assets/fotos atuais maju/IMG_7216.JPEG';
import posterRituaria from '@/assets/ugc/imagens/rituaria.png';
import logoLive from '@/assets/ugc/logos/live.png';
import logoColcci from '@/assets/ugc/logos/colcci.png';
import logoInove from '@/assets/ugc/logos/inove.png';
import logoRituaria from '@/assets/ugc/logos/rituaria.png';
import videoRituaria from '@/assets/ugc/videos/rituaria.mp4';
import videoRituariaOriginal from '@/assets/ugc/videos/rituaria-original.mp4';
import painelInstagram from '@/assets/ugc/painel-instagram/painel profissional insta.jpg';
import painelPerfil from '@/assets/ugc/painel-instagram/perfil.jpeg';
import painelConteudo from '@/assets/ugc/painel-instagram/conteudo.jpg';
import painelInteracoes from '@/assets/ugc/painel-instagram/interraçoes.jpg';

export const UGC_WHATSAPP_MESSAGE =
  'Oi Maju! Vi seu portfólio de UGC e gostaria de conversar sobre uma parceria.';

export const ugcImages = {
  hero: fotoHero,
  about: fotoAbout,
  brands: fotoBrands,
  cta: fotoCta,
  gallery: [fotoGallery1, fotoGallery2, fotoGallery3, fotoGallery4, fotoHero, fotoAbout],
} as const;

export const ugcNiches = ['Fitness', 'Beauty', 'Lifestyle'] as const;

export const ugcServices = [
  {
    title: 'GRWM',
    description:
      'Mostro o produto enquanto me preparo, de forma natural e integrada à rotina.',
  },
  {
    title: 'Unboxing',
    description:
      'Registro a primeira impressão e a experiência de abrir e conhecer o produto.',
  },
  {
    title: 'Demonstração',
    description:
      'Mostro o produto em uso — benefícios e encaixe na rotina, com transparência de parceria.',
  },
  {
    title: 'Tutorial',
    description:
      'Demonstro o uso na prática, com clareza e estética clean.',
  },
  {
    title: 'Lifestyle',
    description:
      'Levo o produto para o dia a dia, conectando marca e momentos reais.',
  },
  {
    title: 'UGC de Produto',
    description:
      'Conteúdo sob briefing da marca: visual cuidado, linguagem natural e pronto para o feed.',
  },
] as const;

export type UgcVideo = {
  id: string;
  brand: string;
  /** Tipo de conteúdo produzido (padronizado no portfólio). */
  category: string;
  /** Poster / capa enquanto não há vídeo (ou thumbnail do clip). */
  poster: string;
  /** Como encaixar o poster no frame vertical (produto flat costuma usar contain). */
  posterFit?: 'cover' | 'contain';
  /**
   * Arquivo local curto (≈30–40s).
   * Ex.: import clip from '@/assets/ugc/videos/live-01.mp4'
   * Deixe vazio até ter o arquivo.
   */
  videoSrc?: string;
  /** Link do vídeo completo (YouTube / Drive / etc.). */
  fullUrl?: string;
};

/**
 * Melhores trabalhos — categoria = tipo de conteúdo produzido.
 * Substitua poster/videoSrc/fullUrl quando tiver o material.
 */
export const ugcBestVideos: UgcVideo[] = [
  {
    id: 'live',
    brand: 'LIVE!',
    category: 'Moda fitness & Lifestyle',
    poster: fotoGallery1,
  },
  {
    id: 'colcci',
    brand: 'Colcci',
    category: 'Provador & Styling',
    poster: fotoAbout,
  },
  {
    id: 'inove',
    brand: 'Inove Nutrition',
    category: 'Demonstração de Produto',
    poster: fotoGallery3,
    videoSrc: videoRituariaOriginal,
  },
  {
    id: 'rituaria',
    brand: 'Rituária',
    category: 'UGC de Produto',
    poster: posterRituaria,
    posterFit: 'contain',
    videoSrc: videoRituaria,
  },
];

export type UgcBrand = {
  name: string;
  image: string;
  /** Escala relativa do logo no grid (1 = padrão). */
  scale?: number;
};

/** Marcas com quem Maju trabalha / trabalhou. */
export const ugcBrands: UgcBrand[] = [
  { name: 'LIVE!', image: logoLive, scale: 1.35 },
  { name: 'Colcci', image: logoColcci, scale: 1.35 },
  { name: 'Inove Nutrition', image: logoInove },
  { name: 'Rituária', image: logoRituaria },
];

export const ugcAbout = {
  eyebrow: 'UGC Creator',
  title: 'Oi, sou a Maju!',
  paragraphs: [
    'Personal trainer e criadora de conteúdo em Marília/SP. Meu nicho une fitness, beauty e lifestyle — com rotina real, estética natural e comunicação próxima.',
    'Produzo UGC que parece conversa, não interrupção: conteúdos que conectam marcas a pessoas de forma autêntica e visualmente cuidada.',
  ],
} as const;

export const ugcCollaborate = {
  title: 'Como podemos trabalhar juntos?',
  pitch:
    'UGC bem feito não parece propaganda: parece parte do feed. Crio vídeos orgânicos, com estética alinhada à marca e linguagem que gera identificação.',
  bullets: [
    'Demonstração de produto',
    'Moda, styling e lifestyle',
    'UGC de produto sob briefing',
    'Conteúdo para feed e anúncios',
  ],
} as const;

/** Prints do painel profissional do Instagram (@majusantospersonal). */
export const ugcInstagramPanel = [
  {
    id: 'perfil',
    label: 'Perfil',
    image: painelPerfil,
  },
  {
    id: 'painel',
    label: 'Painel profissional',
    image: painelInstagram,
  },
  {
    id: 'conteudo',
    label: 'Conteúdo',
    image: painelConteudo,
  },
  {
    id: 'interacoes',
    label: 'Interações',
    image: painelInteracoes,
  },
] as const;
