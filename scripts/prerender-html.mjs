/**
 * Gera HTML estático por rota indexável a partir do dist/index.html do Vite.
 *
 * Estratégia (sem Puppeteer / sem migração de framework):
 * - Copia o shell SPA
 * - Injeta title, description, canonical, OG, robots e JSON-LD por rota
 * - Coloca H1 + texto real dentro de #root (crawlers leem; React substitui ao hidratar)
 *
 * Uso: após `vite build` → node scripts/prerender-html.mjs
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import {
  ROOT,
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  loadCatalogItems,
  loadProgramSearchIntent,
  absoluteUrl,
  escapeHtml,
  titleWithBrand,
} from './lib/catalog-seo.mjs';

const distDir = join(ROOT, 'dist');
const templatePath = join(distDir, 'index.html');

function setMetaByName(html, name, content) {
  const re = new RegExp(`(<meta\\s+name="${name}"\\s+content=")[^"]*(")`, 'i');
  if (re.test(html)) return html.replace(re, `$1${escapeHtml(content)}$2`);
  return html.replace(
    '</head>',
    `    <meta name="${name}" content="${escapeHtml(content)}" />\n  </head>`,
  );
}

function setMetaByProperty(html, property, content) {
  const re = new RegExp(`(<meta\\s+property="${property}"\\s+content=")[^"]*(")`, 'i');
  if (re.test(html)) return html.replace(re, `$1${escapeHtml(content)}$2`);
  return html.replace(
    '</head>',
    `    <meta property="${property}" content="${escapeHtml(content)}" />\n  </head>`,
  );
}

function setTitle(html, title) {
  return html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
}

function setCanonical(html, href) {
  const re = /(<link\s+rel="canonical"\s+href=")[^"]*(")/i;
  if (re.test(html)) return html.replace(re, `$1${href}$2`);
  return html.replace('</head>', `    <link rel="canonical" href="${href}" />\n  </head>`);
}

function setJsonLd(html, data) {
  const tag = `    <script type="application/ld+json" id="seo-json-ld">${JSON.stringify(data)}</script>\n`;
  html = html.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/gi, '');
  return html.replace('</head>', `${tag}  </head>`);
}

function setRootContent(html, inner) {
  return html.replace(
    /<div id="root"><\/div>/i,
    `<div id="root">${inner}</div>`,
  );
}

function applySeo(html, { title, description, path, robots, ogType, jsonLd, rootHtml }) {
  const canonical = absoluteUrl(path);
  let out = html;
  out = setTitle(out, title);
  out = setMetaByName(out, 'title', title);
  out = setMetaByName(out, 'description', description);
  out = setMetaByName(out, 'robots', robots || 'index, follow, max-image-preview:large');
  out = setCanonical(out, canonical);
  out = setMetaByProperty(out, 'og:type', ogType || 'website');
  out = setMetaByProperty(out, 'og:title', title);
  out = setMetaByProperty(out, 'og:description', description);
  out = setMetaByProperty(out, 'og:url', canonical);
  out = setMetaByProperty(out, 'og:image', DEFAULT_OG_IMAGE);
  out = setMetaByName(out, 'twitter:title', title);
  out = setMetaByName(out, 'twitter:description', description);
  out = setMetaByName(out, 'twitter:url', canonical);
  out = setMetaByName(out, 'twitter:image', DEFAULT_OG_IMAGE);
  if (jsonLd) out = setJsonLd(out, jsonLd);
  if (rootHtml) out = setRootContent(out, rootHtml);
  return out;
}

function writePage(routePath, html) {
  const filePath =
    routePath === '/'
      ? join(distDir, 'index.html')
      : join(distDir, routePath.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html, 'utf8');
  return filePath;
}

function breadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function buildPages(catalog, intentMap) {
  const programs = catalog.filter((i) => i.type === 'programa');
  const consulting = catalog.filter((i) => i.type === 'consultoria');
  const pages = [];

  pages.push({
    path: '/',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    rootHtml: `
      <main style="padding:24px;font-family:system-ui,sans-serif;max-width:720px;margin:0 auto;line-height:1.5">
        <h1>${escapeHtml(SITE_NAME)}</h1>
        <p>${escapeHtml(DEFAULT_DESCRIPTION)}</p>
        <p><a href="/programas">Programas de treino</a> · <a href="/consultoria-online">Consultoria online</a> · <a href="/links">Links</a> · <a href="/eventos">Eventos</a></p>
      </main>`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: absoluteUrl('/'),
          description: DEFAULT_DESCRIPTION,
          inLanguage: 'pt-BR',
        },
        {
          '@type': 'Person',
          name: SITE_NAME,
          jobTitle: 'Personal Trainer',
          url: absoluteUrl('/'),
          image: DEFAULT_OG_IMAGE,
        },
        {
          '@type': 'ProfessionalService',
          name: SITE_NAME,
          description: DEFAULT_DESCRIPTION,
          url: absoluteUrl('/'),
          image: DEFAULT_OG_IMAGE,
          areaServed: 'BR',
          telephone: '+55 14 91011-7854',
          priceRange: '$$',
          provider: { '@type': 'Person', name: SITE_NAME },
        },
      ],
    },
  });

  pages.push({
    path: '/programas',
    title: titleWithBrand('Programas de Treino'),
    description:
      'Programas de treino prontos para academia ou casa, com diferentes objetivos e níveis. Acesso pelo Majunity GO.',
    rootHtml: `
      <main style="padding:24px;font-family:system-ui,sans-serif;max-width:720px;margin:0 auto;line-height:1.5">
        <h1>Programas de treino</h1>
        <p>Treinos estruturados e prontos para seguir no Majunity GO.</p>
        <ul>
          ${programs
            .map(
              (p) =>
                `<li><a href="${p.path}">${escapeHtml(p.fullTitle)}</a> — ${escapeHtml(p.shortDescription)}</li>`,
            )
            .join('\n          ')}
        </ul>
      </main>`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: 'Programas de Treino',
          url: absoluteUrl('/programas'),
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: programs.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: absoluteUrl(p.path),
              name: p.fullTitle,
            })),
          },
        },
        breadcrumb([
          { name: 'Início', path: '/' },
          { name: 'Programas', path: '/programas' },
        ]),
      ],
    },
  });

  for (const p of programs) {
    const intent = intentMap[p.productId];
    const desc =
      intent?.seoDescription ||
      p.shortDescription ||
      (p.description.length > 155 ? `${p.description.slice(0, 155)}…` : p.description);
    pages.push({
      path: p.path,
      title: titleWithBrand(intent?.seoTitle || p.fullTitle),
      description: desc,
      ogType: 'product',
      rootHtml: `
      <main style="padding:24px;font-family:system-ui,sans-serif;max-width:720px;margin:0 auto;line-height:1.5">
        <nav><a href="/">Início</a> › <a href="/programas">Programas</a> › ${escapeHtml(p.title)}</nav>
        <h1>${escapeHtml(p.fullTitle)}</h1>
        <p>${escapeHtml(p.description)}</p>
        <p><strong>Preço:</strong> R$ ${(p.priceCents / 100).toFixed(2).replace('.', ',')}</p>
        <p><a href="/consultoria-online">Consultoria VIP Online</a> · <a href="/programas">Todos os programas</a></p>
      </main>`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Product',
            name: p.fullTitle,
            description: p.description,
            sku: p.productId,
            brand: { '@type': 'Brand', name: SITE_NAME },
            offers: {
              '@type': 'Offer',
              url: absoluteUrl(p.path),
              priceCurrency: 'BRL',
              price: (p.priceCents / 100).toFixed(2),
              availability: p.available
                ? 'https://schema.org/InStock'
                : 'https://schema.org/PreOrder',
            },
          },
          breadcrumb([
            { name: 'Início', path: '/' },
            { name: 'Programas', path: '/programas' },
            { name: p.title, path: p.path },
          ]),
        ],
      },
    });
  }

  pages.push({
    path: '/consultoria-online',
    title: titleWithBrand('Consultoria Personal Online'),
    description:
      'Consultoria VIP com acompanhamento individual: planejamento ajustado à sua rotina, suporte e análise de execução.',
    rootHtml: `
      <main style="padding:24px;font-family:system-ui,sans-serif;max-width:720px;margin:0 auto;line-height:1.5">
        <nav><a href="/">Início</a> › Consultoria Online</nav>
        <h1>Consultoria VIP Online</h1>
        <p>Acompanhamento individual com planejamento ajustado à rotina, suporte e análise de execução.</p>
        <ul>
          ${consulting
            .map(
              (c) =>
                `<li><strong>${escapeHtml(c.fullTitle)}</strong> — R$ ${(c.priceCents / 100).toFixed(2).replace('.', ',')} — ${escapeHtml(c.shortDescription)}</li>`,
            )
            .join('\n          ')}
        </ul>
        <p><a href="/programas">Ver programas de treino</a></p>
      </main>`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Consultoria VIP Online',
          description:
            'Acompanhamento individual com planejamento ajustado à rotina, suporte e análise de execução.',
          url: absoluteUrl('/consultoria-online'),
          provider: { '@type': 'Person', name: SITE_NAME },
          areaServed: 'BR',
          offers: consulting.map((c) => ({
            '@type': 'Offer',
            name: c.fullTitle,
            priceCurrency: 'BRL',
            price: (c.priceCents / 100).toFixed(2),
            url: absoluteUrl('/consultoria-online'),
            availability: 'https://schema.org/InStock',
          })),
        },
        breadcrumb([
          { name: 'Início', path: '/' },
          { name: 'Consultoria Online', path: '/consultoria-online' },
        ]),
      ],
    },
  });

  pages.push({
    path: '/links',
    title: titleWithBrand('Links'),
    description:
      'Todos os links da Maju Santos em um só lugar: consultoria, marcas, achadinhos e redes.',
    rootHtml: `
      <main style="padding:24px;font-family:system-ui,sans-serif;max-width:720px;margin:0 auto;line-height:1.5">
        <h1>Links</h1>
        <p>Todos os links da Maju Santos em um só lugar: consultoria, marcas, achadinhos e redes.</p>
        <ul>
          <li><a href="https://apponfit.web.app/">Consultoria Online</a></li>
          <li><a href="https://destrave-clube.netlify.app/">Destrave Clube</a></li>
          <li><a href="https://mycollection.shop/casaentredois">Coleção Shopee</a></li>
          <li><a href="https://www.inovenutrition.com.br/">Inove Nutrition</a></li>
          <li><a href="https://www.caffeinearmy.com.br/pages/vitrine-sc">SuperCoffee</a></li>
        </ul>
        <p>
          <a href="https://instagram.com/majusantospersonal">Instagram</a> ·
          <a href="https://www.tiktok.com/@majusantospersonal">TikTok</a> ·
          <a href="https://www.youtube.com/@majusantospersonal">YouTube</a>
        </p>
      </main>`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          name: 'Links',
          url: absoluteUrl('/links'),
          description:
            'Todos os links da Maju Santos em um só lugar: consultoria, marcas, achadinhos e redes.',
          isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: absoluteUrl('/') },
        },
        breadcrumb([
          { name: 'Início', path: '/' },
          { name: 'Links', path: '/links' },
        ]),
      ],
    },
  });

  pages.push({
    path: '/eventos',
    title: titleWithBrand('Eventos'),
    description:
      'Encontros presenciais da Team Maju para movimento, conexão e bem-estar. Conheça o Wellness Experience e próximos eventos.',
    rootHtml: `
      <main style="padding:24px;font-family:system-ui,sans-serif;max-width:720px;margin:0 auto;line-height:1.5">
        <nav><a href="/">Início</a> › Eventos</nav>
        <h1>Eventos</h1>
        <p>Encontros presenciais da Team Maju para movimento, conexão e bem-estar.</p>
        <p><a href="/eventos/wellness-experience">Wellness Experience</a></p>
      </main>`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumb([
          { name: 'Início', path: '/' },
          { name: 'Eventos', path: '/eventos' },
        ]),
      ],
    },
  });

  pages.push({
    path: '/eventos/wellness-experience',
    title: titleWithBrand('Wellness Experience'),
    description:
      'Uma manhã completa para cuidar do corpo, da mente e das suas conexões. Domingo, 26/07/2026 às 08h no Vixe Club, Av. das Esmeraldas, 2681 — Marília.',
    rootHtml: `
      <main style="padding:24px;font-family:system-ui,sans-serif;max-width:720px;margin:0 auto;line-height:1.5">
        <nav><a href="/">Início</a> › <a href="/eventos">Eventos</a> › Wellness Experience</nav>
        <h1>Wellness Experience</h1>
        <p>Uma manhã completa para cuidar do corpo, da mente e das suas conexões.</p>
        <p>Domingo, 26 de julho de 2026 às 08h — Vixe Club, Av. das Esmeraldas, 2681 — Marília.</p>
      </main>`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Event',
          name: 'Wellness Experience',
          description:
            'Uma manhã completa para cuidar do corpo, da mente e das suas conexões.',
          startDate: '2026-07-26T08:00:00-03:00',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          location: {
            '@type': 'Place',
            name: 'Vixe Club',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Av. das Esmeraldas, 2681',
              addressLocality: 'Marília',
              addressRegion: 'SP',
              addressCountry: 'BR',
            },
          },
          organizer: { '@type': 'Person', name: SITE_NAME, url: absoluteUrl('/') },
          offers: {
            '@type': 'Offer',
            price: '40.00',
            priceCurrency: 'BRL',
            url: absoluteUrl('/eventos/wellness-experience'),
            availability: 'https://schema.org/SoldOut',
          },
        },
        breadcrumb([
          { name: 'Início', path: '/' },
          { name: 'Eventos', path: '/eventos' },
          { name: 'Wellness Experience', path: '/eventos/wellness-experience' },
        ]),
      ],
    },
  });

  return pages;
}

if (!existsSync(templatePath)) {
  console.error('dist/index.html não encontrado. Rode `vite build` antes.');
  process.exit(1);
}

const template = readFileSync(templatePath, 'utf8');
const catalog = loadCatalogItems();
const intentMap = loadProgramSearchIntent();
const pages = buildPages(catalog, intentMap);

// Shell SPA puro (metas da home) para rotas transacionais via rewrite
const spaShell = applySeo(template, {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: '/',
  robots: 'noindex, follow',
  rootHtml: '<div data-spa-shell="true"></div>',
});
writeFileSync(join(distDir, 'spa.html'), spaShell, 'utf8');

let count = 0;
for (const page of pages) {
  const html = applySeo(template, page);
  const out = writePage(page.path, html);
  count += 1;
  console.log(`prerender: ${page.path} → ${out.replace(ROOT + '\\', '').replace(ROOT + '/', '')}`);
}

console.log(`Prerender concluído: ${count} páginas + spa.html (fallback transacional)`);
console.log(`SITE_URL=${SITE_URL}`);
