/**
 * Gera public/sitemap.xml a partir do catálogo e rotas indexáveis.
 * Rode via: node scripts/generate-sitemap.mjs
 * (também no prebuild)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const SITE_URL = (process.env.VITE_SITE_URL || 'https://majusantospersonal.vercel.app').replace(
  /\/$/,
  '',
);

const catalogPath = join(root, 'src/data/catalog.ts');
const catalogSrc = readFileSync(catalogPath, 'utf8');

/** Extrai productIds de itens type: 'programa' (ordem do arquivo). */
function extractProgramSlugs(source) {
  const items = [];
  const blockRe =
    /\{\s*id:\s*'[^']+',\s*productId:\s*'([^']+)',[\s\S]*?type:\s*'(programa|consultoria)'/g;
  let match;
  while ((match = blockRe.exec(source)) !== null) {
    const productId = match[1];
    const type = match[2];
    if (type === 'programa') {
      items.push(productId.replace(/_/g, '-'));
    }
  }
  return items;
}

const programSlugs = extractProgramSlugs(catalogSrc);
const today = new Date().toISOString().slice(0, 10);

const staticUrls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/programas', priority: '0.9', changefreq: 'weekly' },
  { loc: '/consultoria-online', priority: '0.9', changefreq: 'weekly' },
  { loc: '/eventos', priority: '0.8', changefreq: 'weekly' },
  { loc: '/eventos/wellness-experience', priority: '0.8', changefreq: 'weekly' },
];

const programUrls = programSlugs.map((slug) => ({
  loc: `/programas/${slug}`,
  priority: '0.8',
  changefreq: 'weekly',
}));

const all = [...staticUrls, ...programUrls];

const body = all
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc === '/' ? '/' : u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const outPath = join(root, 'public/sitemap.xml');
writeFileSync(outPath, xml, 'utf8');
console.log(`sitemap.xml gerado com ${all.length} URLs → ${outPath}`);
