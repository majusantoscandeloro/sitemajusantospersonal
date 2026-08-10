import { linksSiteConfig } from './siteConfig';
import type { LinkItem } from './types';

const DEMO_LINKS: LinkItem[] = [
  {
    id: '1b',
    title: 'Consultoria Online Individualizada',
    description: 'Faça seu pré-cadastro',
    category: 'Consultoria',
    imageUrl: '/links/imagensbiolink/2.png',
    destinationUrl: linksSiteConfig.consultoria.url,
    coupon: '',
    active: true,
    featured: true,
    order: 1,
    layout: 'banner',
  },
  {
    id: '2',
    title: 'Destrave Clube',
    description: 'O clube perfeito para mulheres que querem mudar',
    category: 'Clube',
    imageUrl: '/links/imagensbiolink/3.png',
    destinationUrl: linksSiteConfig.destraveClube.url,
    coupon: '',
    active: true,
    featured: true,
    order: 2,
    layout: 'banner',
  },
  {
    id: '3',
    title: 'Minha coleção Shopee',
    description: 'Coisas que eu uso e recomendo',
    category: 'Shopee',
    imageUrl: '/links/imagensbiolink/5.png',
    destinationUrl: linksSiteConfig.shopee.url,
    coupon: '',
    active: true,
    featured: true,
    order: 3,
    layout: 'banner',
  },
  {
    id: '4',
    title: 'Suplementos Inove Nutrition',
    description: 'Toque na imagem para acessar a loja',
    category: 'Suplementos',
    imageUrl: '/links/imagensbiolink/1.png',
    destinationUrl: linksSiteConfig.inove.url,
    coupon: 'MARIMAJU',
    active: true,
    featured: true,
    order: 4,
    layout: 'banner',
  },
  {
    id: '4b',
    title: 'SuperCoffee',
    description: 'Toque na imagem para acessar a loja',
    category: 'Suplementos',
    imageUrl: '/links/imagensbiolink/4.png',
    destinationUrl: linksSiteConfig.superCoffee.url,
    coupon: 'MAJUSANTOSPERSONAL',
    active: true,
    featured: true,
    order: 5,
    layout: 'banner',
  },
];

function parseBoolean(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.trim().toUpperCase();
  return normalized === 'TRUE' || normalized === '1' || normalized === 'YES' || normalized === 'SIM';
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let current: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      current.push(field);
      field = '';
    } else if (char === '\n' || (char === '\r' && next === '\n')) {
      current.push(field);
      rows.push(current);
      current = [];
      field = '';
      if (char === '\r') i++;
    } else if (char === '\r') {
      current.push(field);
      rows.push(current);
      current = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field.length > 0 || current.length > 0) {
    current.push(field);
    rows.push(current);
  }

  return rows.filter((row) => row.some((cell) => cell.trim() !== ''));
}

function mapRowToLink(headers: string[], row: string[]): LinkItem | null {
  const get = (key: string): string => {
    const index = headers.indexOf(key);
    if (index === -1) return '';
    return (row[index] ?? '').trim();
  };

  const title = get('title');
  const destinationUrl = get('destinationUrl');
  const id = get('id');

  if (!title || !destinationUrl || !id) {
    return null;
  }

  const orderValue = Number.parseInt(get('order'), 10);
  const layoutValue = get('layout').toLowerCase();
  const layout =
    layoutValue === 'banner' ? 'banner' : layoutValue === 'default' ? 'default' : undefined;

  return {
    id,
    title,
    description: get('description'),
    category: get('category'),
    imageUrl: get('imageUrl'),
    destinationUrl,
    coupon: get('coupon'),
    active: parseBoolean(get('active')),
    featured: parseBoolean(get('featured')),
    order: Number.isFinite(orderValue) ? orderValue : 999,
    layout,
  };
}

function normalizeLinks(links: LinkItem[]): LinkItem[] {
  return links.filter((link) => link.active).sort((a, b) => a.order - b.order);
}

export async function fetchLinksFromSheet(csvUrl?: string): Promise<LinkItem[]> {
  const url = (csvUrl ?? linksSiteConfig.sheetsCsvUrl).trim();

  if (!url) {
    return normalizeLinks(DEMO_LINKS);
  }

  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Falha ao carregar planilha (${response.status})`);
  }

  const csvText = await response.text();
  const rows = parseCsv(csvText);

  if (rows.length < 2) {
    throw new Error('Planilha vazia ou sem dados');
  }

  const headers = rows[0].map((header) => header.trim());
  const required = ['id', 'title', 'destinationUrl', 'active', 'order'];

  for (const column of required) {
    if (!headers.includes(column)) {
      throw new Error(`Coluna obrigatória ausente: ${column}`);
    }
  }

  const links: LinkItem[] = [];

  for (let i = 1; i < rows.length; i++) {
    const item = mapRowToLink(headers, rows[i]);
    if (item) {
      links.push(item);
    }
  }

  return normalizeLinks(links);
}
