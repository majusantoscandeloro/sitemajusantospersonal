import programStrength from '@/assets/program-strength.jpg';
import programHome from '@/assets/program-home.jpg';
import programCardio from '@/assets/program-cardio.jpg';
import programBeginner from '@/assets/program-beginner.jpg';
import programHypertrophy from '@/assets/program-hypertrophy.jpg';
import quadricepsNovo from '@/assets/quadricepsnovo.png';
import gluteosNovo from '@/assets/gluteosnovo.png';
import superioresNovo from '@/assets/superioresnovo.png';
import casaNovo from '@/assets/casanovo.png';
import gravida from '@/assets/gravida.jpg';
import programFatburn from '@/assets/program-fatburn.jpg';
import onlineNovo from '@/assets/onlinenovo.png';
import defImg from '@/assets/defnovo.png';
import desafiosImg from '@/assets/desafios.png';
import inicialNovo from '@/assets/inicialnovo.png';
import lipedemaImg from '@/assets/lipenovo.png';
import abdominalNovo from '@/assets/abdominalnovo.png';
import defFemNovo from '@/assets/deffemnovo.png';

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
    description: 'Programa completo de 8 a 12 semanas para definição muscular. Acesso ao conteúdo por 90 dias.',
    price: 100, // R$ 1,00
    productId: 'definicao_total',
    image: defImg,
    category: 'Top #1',
    type: 'programa',
  },
  {
    id: '2',
    title: 'Hipertrofia Feminina',
    description: 'Programa avançado de 8 a 12 semanas para ganho de massa, foco em quadríceps. Acesso ao conteúdo por 90 dias.',
    price: 6990, // R$ 69,90
    productId: 'hipertrofia_feminina_quadriceps',
    image: quadricepsNovo,
    category: 'Novo',
    type: 'programa',
  },
  {
    id: '3',
    title: 'Hipertrofia Feminina',
    description: 'Programa avançado de 8 a 12 semanas para ganho de massa, foco em glúteos. Acesso ao conteúdo por 90 dias.',
    price: 6990, // R$ 69,90
    productId: 'hipertrofia_feminina',
    image: gluteosNovo,
    type: 'programa',
  },
  {
    id: '4',
    title: 'Treino em Casa Express',
    description: 'Treino de 8 a 12 semanas para fazer em casa. Acesso ao conteúdo por 90 dias.',
    price: 5990, // R$ 59,90
    productId: 'treino_em_casa_express',
    image: casaNovo,
    type: 'programa',
  },
  // Para Iniciantes
  {
    id: '6',
    title: 'Start Inicial',
    description: 'Desenvolva força desde o início - 8 a 12 semanas. Acesso ao conteúdo por 90 dias.',
    price: 5990, // R$ 59,90
    productId: 'start_inicial',
    image: inicialNovo,
    type: 'programa',
  },
  {
    id: '7',
    title: 'Lipedema',
    description: 'Programa de 8 a 12 semanas para lipedema: treinos de baixo impacto, circulação e fortalecimento adaptados. Acesso ao conteúdo por 90 dias.',
    price: 6990, // R$ 69,90
    productId: 'lipedema',
    image: lipedemaImg,
    type: 'programa',
  },
  {
    id: '8',
    title: 'Em Casa Sem Equipamento',
    description: 'Treino completo sem equipamentos, ideal para gestantes e iniciantes - 8 a 12 semanas. Acesso ao conteúdo por 90 dias.',
    price: 4990, // R$ 49,90
    productId: 'em_casa_sem_equipamento',
    image: casaNovo,
    type: 'programa',
  },
  // Emagrecimento
  {
    id: '11',
    title: 'Abdominal Slim',
    description: 'Programa de 8 a 12 semanas para abdômen definido: core, queima localizada e postura. Acesso ao conteúdo por 90 dias.',
    price: 2990, // R$ 29,90
    productId: 'abdominal_slim',
    image: abdominalNovo,
    type: 'programa',
  },
  {
    id: '12',
    title: 'Definição Feminina',
    description: 'Foco em definição e tonificação - 8 a 12 semanas. Acesso ao conteúdo por 90 dias.',
    price: 6990, // R$ 69,90
    productId: 'definicao_feminina',
    image: defFemNovo,
    type: 'programa',
  },
  // Hipertrofia
  {
    id: '14',
    title: 'Hipertrofia Feminina',
    description: 'Programa avançado de 8 a 12 semanas para ganho de massa, foco em superiores. Acesso ao conteúdo por 90 dias.',
    price: 6990, // R$ 69,90
    productId: 'hipertrofia_feminina_superiores',
    image: superioresNovo,
    type: 'programa',
  },
  // Treinos em Casa
  {
    id: '17',
    title: 'Casa Completo',
    description: 'Treino completo para fazer em casa - 8 a 12 semanas. Acesso ao conteúdo por 90 dias.',
    price: 5990, // R$ 59,90
    productId: 'casa_completo',
    image: casaNovo,
    category: 'Favorito',
    type: 'programa',
  },
  {
    id: '18',
    title: 'Treino de 20 Minutos',
    description: 'Treinos rápidos de 20 minutos - 8 a 12 semanas. Acesso ao conteúdo por 90 dias.',
    price: 5990, // R$ 59,90
    productId: 'treino_de_20_minutos',
    image: casaNovo,
    type: 'programa',
  },
  {
    id: '19',
    title: 'HIIT Sem Equipamento',
    description: 'Para derreter gordura: treinos HIIT intensos sem equipamentos em 8 a 12 semanas. Iniciante, intermediário e avançado. Acesso ao conteúdo por 90 dias.',
    price: 5990, // R$ 59,90
    productId: 'hiit_sem_equipamento',
    image: casaNovo,
    type: 'programa',
  },
  {
    id: '20',
    title: 'Alongamento e Flexibilidade',
    description: 'Alongamento e flexibilidade - 8 a 12 semanas. Acesso ao conteúdo por 90 dias.',
    price: 5990, // R$ 59,90
    productId: 'alongamento_e_flexibilidade',
    image: casaNovo,
    type: 'programa',
  },
  // Desafios
  {
    id: '23',
    title: 'Desafio 21 dias',
    description: 'Desafio de 21 dias para criar o hábito de treinar',
    price: 5990, // R$ 59,90
    productId: 'desafio_21_dias',
    image: desafiosImg,
    type: 'programa',
  },
  {
    id: '24',
    title: 'Desafio 30 dias',
    description: 'Desafio de 30 dias para emagrecimento e condicionamento',
    price: 5990, // R$ 59,90
    productId: 'desafio_30_dias',
    image: desafiosImg,
    type: 'programa',
  },
  // Consultoria Online
  {
    id: '21',
    title: 'Acompanhamento Mensal',
    description: 'Consultoria online com acompanhamento mensal personalizado',
    price: 19900, // R$ 199,00
    productId: 'consultoria_mensal',
    image: onlineNovo,
    category: 'Iniciante, Intermediário, Avançado',
    type: 'consultoria',
  },
  {
    id: '22',
    title: 'Acompanhamento Trimestral',
    description: 'Consultoria online com acompanhamento trimestral (3 meses)',
    price: 49900, // R$ 499,00 (economia de R$ 98,00)
    productId: 'consultoria_trimestral',
    image: onlineNovo,
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
