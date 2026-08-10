export interface LinkItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  destinationUrl: string;
  coupon: string;
  active: boolean;
  featured: boolean;
  order: number;
  /** banner = arte completa do card; default = layout texto + imagem */
  layout?: 'default' | 'banner';
}
