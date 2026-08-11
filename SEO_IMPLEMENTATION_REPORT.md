# SEO Implementation Report

Relatório final do ciclo de melhorias SEO (React + Vite + Vercel), sem migração para Next.js.

Data: **2026-08-11**

---

## Arquitetura anterior

SPA pura (CSR): o HTML inicial tinha pouco conteúdo indexável (`#root` vazio). Produtos existiam só no modal da home, sem URL própria. Canonical apontava sempre para a home. Sitemap incluía rotas transacionais. Catch-all na Vercel fazia soft 404 (HTTP 200).

## Arquitetura atual

- **Fonte de dados:** `src/data/catalog.ts`
- **SEO central:** `src/config/site.ts` + `src/lib/seo.ts` + `src/components/SeoHead.tsx`
- **Slugs:** `src/lib/slugs.ts` (`productId` → kebab-case)
- **Intenção de busca:** `src/data/searchIntent.ts` (title/description por programa; **não** vira meta keywords)
- **JSON-LD:** `src/lib/schema.ts`
- **Prerender:** `scripts/prerender-html.mjs` gera HTML estático por rota indexável após `vite build`
- **Sitemap:** `scripts/generate-sitemap.mjs` (prebuild)
- **Deploy:** Vercel com rewrites só para rotas SPA/transacionais (`vercel.json`)

---

## Problemas corrigidos

| Problema | Solução |
|---|---|
| Canonical único na home | Canonical por página via `SITE_URL` + path |
| Produtos sem URL | `/programas/:slug` + página `/programas` |
| HTML vazio para crawlers | Prerender de shell com H1, texto, metas, JSON-LD |
| Soft 404 | Removido catch-all; URLs inexistentes → 404 HTTP |
| Sitemap com cart/checkout | Só rotas públicas indexáveis |
| Meta keywords | Removida |
| Metadata genérica | Title/description por intenção (`searchIntent.ts`) |
| Links só via onClick | `<Link>` rastreáveis nos cards e listas |
| Breadcrumb só no JSON-LD | Breadcrumb visual em programas, consultoria, eventos, wellness |
| Imagens sem dimensões | `width`/`height` + alts descritivos nas imagens públicas |

---

## URLs indexáveis

- `/`
- `/programas`
- `/programas/:slug` (16 programas)
- `/consultoria-online`
- `/links`
- `/eventos`
- `/eventos/wellness-experience`

## URLs noindex

- `/cart`, `/checkout`, `/success`, `/obrigado`, `/pending`, `/failure`
- `/minha-conta`
- `/eventos/wellness-experience/inscricao`
- 404 / programa inexistente (`noindex, follow`)

---

## Produtos → slug → URL

| Produto | productId | Slug | URL |
|---|---|---|---|
| Definição Total | `definicao_total` | `definicao-total` | `/programas/definicao-total` |
| Hipertrofia Feminina — Quadríceps | `hipertrofia_feminina_quadriceps` | `hipertrofia-feminina-quadriceps` | `/programas/hipertrofia-feminina-quadriceps` |
| Hipertrofia Feminina — Glúteos | `hipertrofia_feminina` | `hipertrofia-feminina` | `/programas/hipertrofia-feminina` |
| Treino em Casa Express | `treino_em_casa_express` | `treino-em-casa-express` | `/programas/treino-em-casa-express` |
| Start Inicial | `start_inicial` | `start-inicial` | `/programas/start-inicial` |
| Lipedema | `lipedema` | `lipedema` | `/programas/lipedema` |
| Em Casa Sem Equipamento | `em_casa_sem_equipamento` | `em-casa-sem-equipamento` | `/programas/em-casa-sem-equipamento` |
| Abdominal Slim | `abdominal_slim` | `abdominal-slim` | `/programas/abdominal-slim` |
| Definição Feminina | `definicao_feminina` | `definicao-feminina` | `/programas/definicao-feminina` |
| Hipertrofia Feminina — Superiores | `hipertrofia_feminina_superiores` | `hipertrofia-feminina-superiores` | `/programas/hipertrofia-feminina-superiores` |
| Casa Completo | `casa_completo` | `casa-completo` | `/programas/casa-completo` |
| Treino de 20 Minutos | `treino_de_20_minutos` | `treino-de-20-minutos` | `/programas/treino-de-20-minutos` |
| HIIT Sem Equipamento | `hiit_sem_equipamento` | `hiit-sem-equipamento` | `/programas/hiit-sem-equipamento` |
| Alongamento e Flexibilidade | `alongamento_e_flexibilidade` | `alongamento-e-flexibilidade` | `/programas/alongamento-e-flexibilidade` |
| Desafio 21 dias | `desafio_21_dias` | `desafio-21-dias` | `/programas/desafio-21-dias` |
| Desafio 30 dias | `desafio_30_dias` | `desafio-30-dias` | `/programas/desafio-30-dias` |

Consultoria (3 planos na mesma URL): `/consultoria-online`

---

## Metadata

Gerenciada por `SeoHead` + `resolvePageSeo`.

Programas usam `resolveProgramPageSeo()` → `seoTitle` / `seoDescription` de `searchIntent.ts`, com fallback para título/descrição do catálogo.

## Canonical

`absoluteUrl(path)` com base em `SITE_URL` (`VITE_SITE_URL` ou `DEFAULT_SITE_URL` em `src/config/site.ts`).

## Sitemap

Gerado em `prebuild` por `scripts/generate-sitemap.mjs` → `public/sitemap.xml`. Inclui só URLs canônicas indexáveis.

## Robots

`public/robots.txt` permite rastreamento e aponta:

`Sitemap: https://majusantospersonal.vercel.app/sitemap.xml`

## Structured Data

| Página | Schema |
|---|---|
| Home | WebSite, Person, ProfessionalService |
| `/programas` | CollectionPage + ItemList + BreadcrumbList |
| `/programas/:slug` | Product + Offer + BreadcrumbList |
| `/consultoria-online` | Service + Offer(s) + BreadcrumbList |
| `/eventos` | BreadcrumbList |
| Wellness | Event + Offer + BreadcrumbList |
| `/links` | WebPage + BreadcrumbList |

Sem AggregateRating/Review inventados.

## Prerender / SSG

Shell HTML por rota no build (**sem Puppeteer**). Crawlers veem title, description, canonical, OG, JSON-LD, H1 e texto em `#root`. React monta no cliente (não é hidratação SSR completa).

## Vercel

`vercel.json`: sem catch-all `/(.*) → /`. Rewrites apenas para cart, checkout, success, obrigado, pending, failure, minha-conta, inscrição wellness + redirect legado `/wellnessexperience*`.

## 404

URL desconhecida → arquivo inexistente sem rewrite → **HTTP 404** na Vercel. Página React 404 com `noindex`.

## Search Console (manual)

1. Cadastrar a propriedade do site (URL prefix ou domínio).
2. Verificar (recomendado: DNS ou arquivo HTML; se HTML meta, colocar em `index.html` / SeoHead quando houver o código).
3. Enviar sitemap: `https://majusantospersonal.vercel.app/sitemap.xml`
4. Solicitar inspeção inicial de: `/`, `/programas`, `/programas/definicao-total`, `/consultoria-online`, `/eventos/wellness-experience`
5. Acompanhar cobertura, consultas, CTR e posição em Performance.

**Não** inventar `google-site-verification` no código.

## Analytics

GA4 opcional via `VITE_GA_MEASUREMENT_ID=G-XXXXXXXX` (page_view em mudanças de rota SPA). Não interfere no Meta Pixel.

## Domínio próprio

Quando trocar de `majusantospersonal.vercel.app`:

1. Definir `VITE_SITE_URL=https://seudominio.com` na Vercel (ou alterar `DEFAULT_SITE_URL` em `src/config/site.ts`)
2. Rebuild (`npm run build` regenera sitemap/prerender)
3. Atualizar `public/robots.txt` (linha do Sitemap) se ainda hardcoded
4. Configurar domínio + HTTPS na Vercel/DNS
5. Atualizar Search Console para o novo domínio

## Novos produtos

1. Adicionar item em `src/data/catalog.ts` (campos existentes)
2. Se for programa comprável, incluir `productId` em `AVAILABLE_PRODUCT_IDS` quando liberar
3. Adicionar entrada em `src/data/searchIntent.ts` (seoTitle/seoDescription + intenções)
4. Incluir o `id` na categoria adequada em `catalogCategoryDefs` (home/carrosséis)
5. Build: slug, URL, sitemap, prerender e JSON-LD saem automaticamente

## Intenção de busca (mapa)

Ver `src/data/searchIntent.ts`. Cada programa tem objetivo, público, contexto, intenção principal/secundárias/comercial e metadata própria — alinhado ao roteiro (marca × produto × objetivo × problema × compra), sem canibalizar consultoria vs programas.

## Testes realizados

- `npm run sitemap` — 22 URLs
- `tsc --noEmit` — OK
- `npm run build` — Vite + prerender 22 páginas + `spa.html`
- `npm test` — 1 passed
- HTML verificado: `/programas/definicao-total` com title de intenção (“Definição Total — Treino feminino para definição | Maju Santos”), canonical próprio e H1 no shell
- `/consultoria-online` — title “Consultoria Personal Online | Maju Santos”
- Sitemap e robots em `public/`

## Pendências externas

- Google Search Console (cadastro, verificação, sitemap)
- Ativar GA4 (`VITE_GA_MEASUREMENT_ID`) se desejado
- Domínio próprio + DNS/HTTPS
- Google Business Profile (local, fora do código do site)
