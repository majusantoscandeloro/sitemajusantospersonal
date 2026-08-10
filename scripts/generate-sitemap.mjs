/**
 * Gera public/sitemap.xml a partir do catálogo e rotas indexáveis.
 * Rode via: node scripts/generate-sitemap.mjs
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, SITE_URL, loadCatalogItems } from './lib/catalog-seo.mjs';

const catalog = loadCatalogItems();
const programs = catalog.filter((i) => i.type === 'programa');
const today = new Date().toISOString().slice(0, 10);

const staticUrls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/programas', priority: '0.9', changefreq: 'weekly' },
  { loc: '/consultoria-online', priority: '0.9', changefreq: 'weekly' },
  { loc: '/links', priority: '0.8', changefreq: 'weekly' },
  { loc: '/eventos', priority: '0.8', changefreq: 'weekly' },
  { loc: '/eventos/wellness-experience', priority: '0.8', changefreq: 'weekly' },
];

const programUrls = programs.map((p) => ({
  loc: p.path,
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

const outPath = join(ROOT, 'public/sitemap.xml');
writeFileSync(outPath, xml, 'utf8');
console.log(`sitemap.xml gerado com ${all.length} URLs → ${outPath}`);
