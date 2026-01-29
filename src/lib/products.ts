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

export type ProductType = 'programa' | 'consultoria';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number; // em centavos (ex: 9900 = R$ 99,00)
  productId: string; // ID do produto em snake_case para o backend
  image?: string;
  category?: string;
  type: ProductType;
}

// Lista de produtos baseada nos programas existentes
export const products: Product[] = [
  // Mais Procurados
  {
    id: '1',
    title: 'Definição Total',
    description: 'Programa completo de 8 semanas para definição muscular',
    price: 100, // R$ 1,00
    productId: 'definicao_total',
    image: programStrength,
    category: 'Top #1',
    type: 'programa',
  },
  {
    id: '2',
    title: 'Hipertrofia Feminina',
    description: 'Programa avançado de 8 a 12 semanas para ganho de massa, foco em quadríceps. Acesso ao conteúdo por 90 dias.',
    price: 8990, // R$ 89,90
    productId: 'hipertrofia_feminina_quadriceps',
    image: quadriceps,
    category: 'Novo',
    type: 'programa',
  },
  {
    id: '3',
    title: 'Hipertrofia Feminina',
    description: 'Programa avançado de 8 a 12 semanas para ganho de massa, foco em glúteos. Acesso ao conteúdo por 90 dias.',
    price: 8990, // R$ 89,90
    productId: 'hipertrofia_feminina',
    image: hipertrofiaGluteos,
    type: 'programa',
  },
  {
    id: '4',
    title: 'Treino em Casa Express',
    description: 'Treino de 4 semanas para fazer em casa',
    price: 6900, // R$ 69,00
    productId: 'treino_em_casa_express',
    image: casa,
    type: 'programa',
  },
  // Para Iniciantes
  {
    id: '6',
    title: 'Força do Zero',
    description: 'Desenvolva força desde o início - 8 semanas',
    price: 9900, // R$ 99,00
    productId: 'forca_do_zero',
    image: programStrength,
    type: 'programa',
  },
  {
    id: '7',
    title: 'Cardio Leve',
    description: 'Cardio suave para iniciantes - 4 semanas',
    price: 6900, // R$ 69,00
    productId: 'cardio_leve',
    image: programCardio,
    type: 'programa',
  },
  {
    id: '8',
    title: 'Em Casa Sem Equipamento',
    description: 'Treino completo sem equipamentos, ideal para gestantes e iniciantes - 6 semanas',
    price: 7900, // R$ 79,00
    productId: 'em_casa_sem_equipamento',
    image: casa,
    type: 'programa',
  },
  // Emagrecimento
  {
    id: '9',
    title: 'Queima 30 Dias',
    description: 'Desafio de 30 dias para emagrecimento',
    price: 8900, // R$ 89,00
    productId: 'queima_30_dias',
    image: programFatburn,
    category: 'Popular',
    type: 'programa',
  },
  {
    id: '10',
    title: 'HIIT Intenso',
    description: 'Treino HIIT avançado - 6 semanas',
    price: 9900, // R$ 99,00
    productId: 'hiit_intenso',
    image: programCardio,
    type: 'programa',
  },
  {
    id: '11',
    title: 'Metabolismo Acelerado',
    description: 'Programa para acelerar o metabolismo - 8 semanas',
    price: 10900, // R$ 109,00
    productId: 'metabolismo_acelerado',
    image: programStrength,
    type: 'programa',
  },
  {
    id: '12',
    title: 'Definição Feminina',
    description: 'Foco em definição e tonificação - 10 semanas',
    price: 12900, // R$ 129,00
    productId: 'definicao_feminina',
    image: programHypertrophy,
    type: 'programa',
  },
  // Hipertrofia
  {
    id: '14',
    title: 'Hipertrofia Feminina',
    description: 'Programa avançado de 8 a 12 semanas para ganho de massa, foco em superiores. Acesso ao conteúdo por 90 dias.',
    price: 8990, // R$ 89,90
    productId: 'hipertrofia_feminina_superiores',
    image: superiores,
    type: 'programa',
  },
  // Treinos em Casa
  {
    id: '17',
    title: 'Casa Completo',
    description: 'Treino completo para fazer em casa - 8 semanas',
    price: 9900, // R$ 99,00
    productId: 'casa_completo',
    image: programHome,
    category: 'Favorito',
    type: 'programa',
  },
  {
    id: '18',
    title: 'Treino de 20 Minutos',
    description: 'Treinos rápidos de 20 minutos - 4 semanas',
    price: 6900, // R$ 69,00
    productId: 'treino_de_20_minutos',
    image: programBeginner,
    type: 'programa',
  },
  {
    id: '19',
    title: 'HIIT Sem Equipamento',
    description: 'HIIT completo sem equipamentos - 6 semanas',
    price: 8900, // R$ 89,00
    productId: 'hiit_sem_equipamento',
    image: programCardio,
    type: 'programa',
  },
  {
    id: '20',
    title: 'Flexibilidade e Força',
    description: 'Combinação de flexibilidade e força - 6 semanas',
    price: 7900, // R$ 79,00
    productId: 'flexibilidade_e_forca',
    image: programHome,
    type: 'programa',
  },
  // Consultoria Online
  {
    id: '21',
    title: 'Acompanhamento Mensal',
    description: 'Consultoria online com acompanhamento mensal personalizado',
    price: 19900, // R$ 199,00
    productId: 'consultoria_mensal',
    image: programConsultoria,
    category: 'Iniciante, Intermediário, Avançado',
    type: 'consultoria',
  },
  {
    id: '22',
    title: 'Acompanhamento Trimestral',
    description: 'Consultoria online com acompanhamento trimestral (3 meses)',
    price: 49900, // R$ 499,00 (economia de R$ 98,00)
    productId: 'consultoria_trimestral',
    image: programConsultoria,
    category: 'Iniciante, Intermediário, Avançado',
    type: 'consultoria',
  },
];

// Função auxiliar para formatar preço em BRL
export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(priceInCents / 100);
}

// Função para buscar produto por ID
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
