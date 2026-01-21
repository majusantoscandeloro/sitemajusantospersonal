import programStrength from '@/assets/program-strength.jpg';
import programHome from '@/assets/program-home.jpg';
import programCardio from '@/assets/program-cardio.jpg';
import programBeginner from '@/assets/program-beginner.jpg';
import programHypertrophy from '@/assets/program-hypertrophy.jpg';
import programFatburn from '@/assets/program-fatburn.jpg';
import programConsultoria from '@/assets/program-consultoria.jpg';

export type ProductType = 'programa' | 'consultoria';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number; // em centavos (ex: 9900 = R$ 99,00)
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
    price: 9900, // R$ 99,00
    image: programStrength,
    category: 'Top #1',
    type: 'programa',
  },
  {
    id: '2',
    title: 'Queima Intensa',
    description: 'Treino intenso de 6 semanas para queima de gordura',
    price: 8900, // R$ 89,00
    image: programFatburn,
    category: 'Novo',
    type: 'programa',
  },
  {
    id: '3',
    title: 'Hipertrofia Feminina',
    description: 'Programa avançado de 12 semanas para ganho de massa',
    price: 14900, // R$ 149,00
    image: programHypertrophy,
    type: 'programa',
  },
  {
    id: '4',
    title: 'Treino em Casa Express',
    description: 'Treino de 4 semanas para fazer em casa',
    price: 6900, // R$ 69,00
    image: programHome,
    type: 'programa',
  },
  // Para Iniciantes
  {
    id: '5',
    title: 'Primeiros Passos',
    description: 'Programa ideal para quem está começando - 6 semanas',
    price: 7900, // R$ 79,00
    image: programBeginner,
    category: 'Recomendado',
    type: 'programa',
  },
  {
    id: '6',
    title: 'Força do Zero',
    description: 'Desenvolva força desde o início - 8 semanas',
    price: 9900, // R$ 99,00
    image: programStrength,
    type: 'programa',
  },
  {
    id: '7',
    title: 'Cardio Leve',
    description: 'Cardio suave para iniciantes - 4 semanas',
    price: 6900, // R$ 69,00
    image: programCardio,
    type: 'programa',
  },
  {
    id: '8',
    title: 'Em Casa Sem Equipamento',
    description: 'Treino completo sem equipamentos - 6 semanas',
    price: 7900, // R$ 79,00
    image: programHome,
    type: 'programa',
  },
  // Emagrecimento
  {
    id: '9',
    title: 'Queima 30 Dias',
    description: 'Desafio de 30 dias para emagrecimento',
    price: 8900, // R$ 89,00
    image: programFatburn,
    category: 'Popular',
    type: 'programa',
  },
  {
    id: '10',
    title: 'HIIT Intenso',
    description: 'Treino HIIT avançado - 6 semanas',
    price: 9900, // R$ 99,00
    image: programCardio,
    type: 'programa',
  },
  {
    id: '11',
    title: 'Metabolismo Acelerado',
    description: 'Programa para acelerar o metabolismo - 8 semanas',
    price: 10900, // R$ 109,00
    image: programStrength,
    type: 'programa',
  },
  {
    id: '12',
    title: 'Definição Feminina',
    description: 'Foco em definição e tonificação - 10 semanas',
    price: 12900, // R$ 129,00
    image: programHypertrophy,
    type: 'programa',
  },
  // Hipertrofia
  {
    id: '13',
    title: 'Glúteos Definidos',
    description: 'Programa focado em glúteos - 8 semanas',
    price: 11900, // R$ 119,00
    image: programHypertrophy,
    category: 'Best Seller',
    type: 'programa',
  },
  {
    id: '14',
    title: 'Ganho de Massa',
    description: 'Programa avançado para ganho de massa - 12 semanas',
    price: 14900, // R$ 149,00
    image: programStrength,
    type: 'programa',
  },
  {
    id: '15',
    title: 'Força e Definição',
    description: 'Combinação de força e definição - 10 semanas',
    price: 13900, // R$ 139,00
    image: programFatburn,
    type: 'programa',
  },
  {
    id: '16',
    title: 'Volume Muscular',
    description: 'Programa completo para volume - 16 semanas',
    price: 17900, // R$ 179,00
    image: programHypertrophy,
    type: 'programa',
  },
  // Treinos em Casa
  {
    id: '17',
    title: 'Casa Completo',
    description: 'Treino completo para fazer em casa - 8 semanas',
    price: 9900, // R$ 99,00
    image: programHome,
    category: 'Favorito',
    type: 'programa',
  },
  {
    id: '18',
    title: 'Treino de 20 Minutos',
    description: 'Treinos rápidos de 20 minutos - 4 semanas',
    price: 6900, // R$ 69,00
    image: programBeginner,
    type: 'programa',
  },
  {
    id: '19',
    title: 'HIIT Sem Equipamento',
    description: 'HIIT completo sem equipamentos - 6 semanas',
    price: 8900, // R$ 89,00
    image: programCardio,
    type: 'programa',
  },
  {
    id: '20',
    title: 'Flexibilidade e Força',
    description: 'Combinação de flexibilidade e força - 6 semanas',
    price: 7900, // R$ 79,00
    image: programHome,
    type: 'programa',
  },
  // Consultoria Online
  {
    id: '21',
    title: 'Acompanhamento Mensal',
    description: 'Consultoria online com acompanhamento mensal personalizado',
    price: 19900, // R$ 199,00
    image: programConsultoria,
    category: 'Iniciante, Intermediário, Avançado',
    type: 'consultoria',
  },
  {
    id: '22',
    title: 'Acompanhamento Trimestral',
    description: 'Consultoria online com acompanhamento trimestral (3 meses)',
    price: 49900, // R$ 499,00 (economia de R$ 98,00)
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
