# PROGRESSO DA IMPLEMENTAÇÃO SEO

> Atualizado conforme as etapas avançam. Não refazer o que já estiver marcado como **FEITO**.

## Envios ao GitHub / deploy

| Data | Conteúdo | Status |
|---|---|---|
| 2026-08-10 | Etapas 1–2 (URLs, SeoHead, sitemap, JSON-LD, OG) | **Enviado** (`557d05b`, `cd6ad4b`) → deploy Vercel via Actions |
| 2026-08-10 | Etapas 3–4 (prerender HTML, soft 404, code splitting, GA4 opcional, imagens) | **Enviado** (`1f71979`) → deploy Vercel via Actions |
| 2026-08-11 | Etapa 5 (intenção de busca, SEO copy, breadcrumbs, links relacionados, imagens, relatório) | **Enviado** → deploy Vercel via Actions |

## Status geral

| Prioridade | Tema | Status |
|---|---|---|
| P1 | Fundação SITE_URL + SeoHead + canonical por página | **FEITO** (2026-08-10) |
| P1 | Remover meta keywords | **FEITO** |
| P1 | Slugs + URLs `/programas` e `/programas/:slug` | **FEITO** |
| P1 | Página `/programas` (visual alinhado à home / theme-navy) | **FEITO** (ajuste visual 2026-08-10) |
| P1 | Página `/consultoria-online` (visual alinhado à home / theme-navy) | **FEITO** (ajuste visual 2026-08-10) |
| P1 | Links rastreáveis no catálogo (ProgramCard + Footer + Header) | **FEITO** |
| P1 | noindex em páginas transacionais | **FEITO** |
| P1 | Sitemap automático (sem cart/checkout) | **FEITO** |
| P1 | Conteúdo HTML indexável / prerender-SSG | **FEITO** (shell HTML por rota no build, sem Puppeteer) |
| P1 | Soft 404 HTTP real (vercel.json) | **FEITO** (sem catch-all; só rewrites SPA) |
| P2 | JSON-LD Product / Service / Event / Breadcrumb | **FEITO** (2026-08-10) |
| P2 | Performance / code splitting por rota | **FEITO** (2026-08-10) |
| P2 | Imagens (alt / width-height / hero decoding) | **FEITO** (2026-08-11) |
| P2 | Breadcrumbs visuais + links internos relacionados | **FEITO** (2026-08-11) |
| P2 | Intenção de busca + SEO title/description por programa | **FEITO** (2026-08-11) |
| P3 | GA4 opcional / docs Search Console | **FEITO** (GA4 via env; passo a passo no relatório) |
| P3 | Relatório final `SEO_IMPLEMENTATION_REPORT.md` | **FEITO** (2026-08-11) |

---

## Log de etapas

### Etapa 5 — Intenção de busca + copy SEO + links + imagens + relatório (2026-08-11)

**Feito:**

1. `src/data/searchIntent.ts` — mapa de intenção por `productId` (objetivo, público, contexto, intenções, `seoTitle`/`seoDescription`). **Não** vira meta keywords.
2. `src/lib/programSeo.ts` — resolve metadata da página de programa + programas relacionados (mesma categoria do catálogo).
3. `ProgramPage` — title/description por intenção; seção “Outros programas relacionados”; link para consultoria; breadcrumb via componente compartilhado.
4. `PageBreadcrumb` — breadcrumb visual em `/programas`, `/consultoria-online`, `/eventos`, wellness e página de programa.
5. Title da consultoria alinhado à intenção comercial: “Consultoria Personal Online”.
6. Imagens: `width`/`height` em Hero, About, Results, Context, Routine, AppAccess, Eventos e Wellness flyer.
7. Prerender lê `searchIntent.ts` e injeta titles/descriptions no HTML estático.
8. `SEO_IMPLEMENTATION_REPORT.md` — relatório final do ciclo (Search Console, domínio, novos produtos, testes).

**Testes:** `npm run sitemap` OK (22 URLs); `tsc --noEmit` OK; `npm run build` OK (22 páginas prerender + spa.html); `npm test` OK. HTML de `/programas/definicao-total` com title/description de intenção.

**GitHub:** enviado (commit + push).

---

### Etapa 1 — Fundação SEO + URLs de produtos (2026-08-10)

**Feito:**

1. `src/config/site.ts` — `SITE_URL` central (via `VITE_SITE_URL` ou default vercel.app), `PATHS`, `NOINDEX_PATHS`.
2. `src/lib/seo.ts` + `src/components/SeoHead.tsx` — title, description, **canonical por página**, robots, OG, Twitter.
3. `src/lib/slugs.ts` — slug a partir de `productId` (ex.: `definicao-total`).
4. Rotas: `/programas`, `/programas/:slug`, `/consultoria-online` (3 planos na mesma página).
5. `ProgramCard`: título e “Ver detalhes” são `<Link>`; modal da home permanece no clique do card.
6. Header/Footer com links para páginas indexáveis.
7. `noindex, follow` em cart, checkout, success, pending, failure, minha-conta, inscrição wellness, 404.
8. `scripts/generate-sitemap.mjs` + `prebuild` — 21 URLs; sem cart/checkout.
9. Meta `keywords` removida do `index.html`.
10. Home, Eventos e Wellness usam `SeoHead`.
11. **Ajuste visual:** `/programas` passou a usar `theme-navy` + `ProgramCarousel`/`ProgramCard` iguais à home (antes ficava fundo claro/branco).

**Testes:** `npm run sitemap` OK; `tsc --noEmit` OK; `npm run build` OK.

**Adiado na época (resolvido na Etapa 3):**

- Prerender/SSG e soft 404 — ver Etapa 3.

**Troca futura de domínio:** `VITE_SITE_URL` na Vercel ou `DEFAULT_SITE_URL` em `src/config/site.ts` + regenerar sitemap.

## Próxima etapa sugerida

1. ~~Relatório final `SEO_IMPLEMENTATION_REPORT.md`~~ → **FEITO**
2. ~~Commit/push da Etapa 5~~ → **FEITO**
3. Search Console (passo a passo no relatório — ação **externa**/manual).
4. Ajustes finos de copy só se métricas do Search Console indicarem necessidade.

---

### Etapa 4 — Performance + GA4 opcional (2026-08-10)

**Feito:**

1. Code splitting: home eager; demais páginas com `React.lazy` + `Suspense` (`App.tsx`). Bundle principal caiu ~1.0 MB → ~0.93 MB; rotas em chunks (Cart, Checkout, ProgramPage, etc.).
2. GA4 opcional: `AnalyticsRoutes` + `VITE_GA_MEASUREMENT_ID` (page_view em mudanças de rota SPA; não mexe no Meta Pixel).
3. Imagens: `decoding="async"` no Hero; `width`/`height` opcionais no `LazyImage`; alts dos cards mais descritivos (“Capa do programa…”).

**Como ativar GA4:** criar variável `VITE_GA_MEASUREMENT_ID=G-XXXXXXXX` no `.env` / Vercel e rebuild.

**GitHub:** enviado em 2026-08-10 (junto com Etapa 3).

---

### Etapa 3 — Prerender HTML + soft 404 (2026-08-10)

**Feito:**

1. `scripts/prerender-html.mjs` + `scripts/lib/catalog-seo.mjs` — após `vite build`, gera HTML estático por rota indexável em `dist/` (title, description, canonical, OG, JSON-LD, H1 + texto em `#root`).
2. `package.json`: `build` = `vite build && npm run prerender`.
3. `dist/spa.html` — shell com `noindex` para rotas transacionais.
4. `vercel.json` — **removido** catch-all `/(.*) → /`. Rewrites apenas para: cart, checkout, success, obrigado, pending, failure, minha-conta, inscrição wellness + redirect legado `/wellnessexperience*`.
5. URLs desconhecidas (ex.: `/isso-nao-existe`) passam a retornar **404 HTTP** na Vercel (arquivo estático inexistente e sem rewrite).

**Como testar localmente:**

```bash
npm run build
npx serve dist
```

- Abrir `/programas/definicao-total` e “View Source” → deve ter H1 e canonical próprios.
- Abrir `/cart` → precisa do rewrite (no `serve` puro pode 404; na Vercel usa `spa.html`).
- Abrir `/pagina-que-nao-existe` → 404.

**Nota:** não é hidratação SSR completa (React ainda monta no cliente). É prerender de shell SEO seguro, sem Puppeteer e sem migrar para Next.js.

**GitHub:** enviado em 2026-08-10 (junto com Etapa 4).

---

### Etapa 2 — Structured data + OG produto (2026-08-10)

**Feito:**

1. `src/lib/schema.ts` — helpers: Home (WebSite/Person/ProfessionalService), Product+Offer, Service+Offer, Event, CollectionPage, BreadcrumbList.
2. JSON-LD injetado via `SeoHead` em Home, `/programas`, `/programas/:slug`, `/consultoria-online`, Eventos e Wellness.
3. OG image da página de programa usa a capa do catálogo.
4. JSON-LD estático removido do `index.html` (centralizado no código + `SITE_URL`).
5. Disponibilidade Offer: `InStock` só para `AVAILABLE_PRODUCT_IDS`; demais programas `PreOrder`; Wellness `SoldOut` (inscrições fechadas).

---

# ROTEIRO ORIGINAL (especificação)

Quero que você faça uma melhoria completa de SEO técnico e estrutural neste projeto.

IMPORTANTE: você já analisou o projeto anteriormente. Use a estrutura real existente e não faça uma reconstrução desnecessária.

# CONTEXTO DO PROJETO

Projeto: site Maju Santos — programas de treino, consultoria e eventos.

Stack atual:

* React 18
* TypeScript
* Vite 5
* React Router DOM v6
* SPA / CSR
* Tailwind CSS
* shadcn/ui
* Firebase
* Deploy na Vercel
* Build estático em `dist`

Atualmente NÃO usamos:

* Next.js
* SSR
* SSG
* prerender

O conteúdo principal é renderizado pelo JavaScript após carregar o `index.html`.

Domínio atualmente utilizado no projeto:

`https://majusantospersonal.vercel.app/`

A arquitetura atual funciona e NÃO quero migrar para Next.js ou outro framework apenas por SEO.

Quero melhorar o SEO mantendo React + Vite + Vercel sempre que tecnicamente possível.

---

# OBJETIVO PRINCIPAL

Quero que o site tenha estrutura adequada para aparecer organicamente no Google quando pessoas pesquisarem:

# OBJETIVO DE POSICIONAMENTO NO GOOGLE

Quero que a estratégia de SEO seja pensada com base em **como uma pessoa real pesquisaria no Google até chegar aos nossos produtos**, e não apenas em palavras-chave genéricas.

Não quero tentar posicionar o site somente para termos amplos como:

* treino;
* academia;
* personal trainer;
* treino feminino.

Esses termos podem ser extremamente genéricos e nem sempre representam alguém interessado no que realmente vendemos.

Quero priorizar principalmente buscas com **intenção clara, específica e comercial**, além de buscas relacionadas aos problemas e objetivos que os nossos programas resolvem.

Antes de definir títulos, textos ou páginas, analise os produtos existentes em `src/data/catalog.ts` e identifique quais intenções de busca fazem sentido para CADA produto.

Pense nas pesquisas em diferentes níveis:

## 1. BUSCAS PELA MARCA

Pessoas que já conhecem a profissional ou receberam indicação.

Exemplos conceituais:

* Maju Santos
* Maju Santos personal
* Maju Santos personal trainer
* Maju Santos treinos
* Maju Santos consultoria
* Maju Santos programas de treino
* consultoria Maju Santos
* treino Maju Santos

O site deve deixar extremamente claro para o Google quem é Maju Santos, o que ela oferece e quais são seus produtos e serviços.

---

## 2. BUSCAS PELO NOME DOS PRODUTOS

Cada programa existente deve ter potencial para aparecer quando alguém pesquisar diretamente pelo seu nome.

Considere pesquisas como:

* nome do programa
* nome do programa Maju Santos
* treino nome do programa
* nome do programa preço
* nome do programa como funciona
* nome do programa para quem é
* nome do programa vale a pena

Não é necessário criar páginas específicas para cada variação.

A página principal daquele produto deve possuir conteúdo suficiente para responder naturalmente essas intenções.

---

## 3. BUSCAS PELO OBJETIVO DA PESSOA

Essa deve ser uma das principais bases da estratégia.

Analise quais objetivos os programas realmente atendem.

Exemplos de como usuários podem pesquisar:

* treino para emagrecer
* treino feminino para emagrecer
* programa de treino para emagrecimento
* treino para definição muscular feminina
* treino para ganhar massa muscular
* treino feminino para hipertrofia
* treino para glúteos
* treino para pernas e glúteos
* treino para melhorar condicionamento
* treino para voltar a treinar
* treino para quem está começando

Use somente objetivos realmente atendidos pelos produtos existentes.

Não tente posicionar um programa para um objetivo que ele não foi criado para atender.

---

## 4. BUSCAS PELO PROBLEMA OU SITUAÇÃO

Muitas pessoas não pesquisam pelo nome de um produto.

Elas pesquisam pelo problema que estão tentando resolver.

Identifique situações reais relacionadas aos programas.

Exemplos conceituais:

* não sei o que treinar na academia
* preciso de um treino para academia
* treino pronto para academia
* ficha de treino pronta
* treino organizado para academia
* treino para quem treina sozinha
* treino para mulher que não sabe montar treino
* programa de treino para seguir na academia
* treino estruturado para academia
* treino feminino pronto
* planilha de treino feminino
* rotina de treino para academia

Analise quais dessas intenções fazem sentido para a oferta real.

O conteúdo deve responder ao problema de maneira natural, sem parecer texto escrito apenas para mecanismos de busca.

---

## 5. BUSCAS PELO LOCAL OU EQUIPAMENTO DISPONÍVEL

Quando os produtos permitirem, considere buscas relacionadas ao ambiente onde a pessoa treina.

Exemplos:

* treino para academia
* treino feminino para academia
* treino com aparelhos de academia
* treino para fazer em casa
* treino feminino em casa
* treino com halteres
* treino sem equipamentos

IMPORTANTE:

Somente utilize essas buscas quando o produto realmente puder ser realizado dessa maneira.

Não associe todos os programas a todas as modalidades apenas para ganhar tráfego.

---

## 6. BUSCAS POR PERFIL DA PESSOA

Analise se existem programas claramente direcionados para determinados perfis.

Exemplos:

* treino para iniciantes
* treino feminino para iniciantes
* treino para quem está voltando para academia
* treino para mulher que já treina
* treino para mulheres
* programa de treino feminino
* treino para quem treina 3 vezes por semana
* treino para quem treina 4 vezes por semana
* treino para quem tem pouco tempo

Novamente, essas associações devem existir somente quando forem verdadeiras.

---

## 7. BUSCAS COM INTENÇÃO DE COMPRA

Quero dar atenção especial a pesquisas feitas por pessoas que já estão procurando uma solução.

Exemplos:

* comprar programa de treino
* programa de treino online
* treino online feminino
* treino pronto online
* programa de treino feminino online
* consultoria de treino online
* consultoria personal online
* personal trainer online
* acompanhamento de treino online
* quanto custa consultoria de personal online
* valor consultoria personal online

Essas buscas normalmente estão mais próximas de uma decisão.

As páginas comerciais devem deixar muito claro:

* o que é oferecido;
* para quem é;
* como funciona;
* diferenças entre as opções;
* preço, quando disponível;
* como contratar.

---

## 8. DIFERENCIAR PROGRAMA PRONTO DE CONSULTORIA

Esse ponto é muito importante para a estratégia.

Não quero que o SEO transmita a ideia de que:

"programa pronto é inferior e consultoria é melhor".

São produtos para necessidades diferentes.

Os PROGRAMAS devem aparecer em pesquisas relacionadas a pessoas que procuram:

* um treino estruturado;
* praticidade;
* orientação do que fazer;
* programa pronto para seguir;
* treino organizado;
* uma solução que não necessariamente exige acompanhamento individual constante.

A CONSULTORIA deve aparecer mais fortemente quando a busca indicar necessidade de:

* acompanhamento individual;
* personalização;
* contato mais próximo;
* ajustes frequentes;
* suporte;
* acompanhamento de evolução.

Exemplos conceituais:

PROGRAMAS:

* treino pronto para academia
* programa de treino feminino
* ficha de treino pronta
* treino online para seguir
* programa de treino para emagrecer

CONSULTORIA:

* consultoria personal online
* personal trainer online
* treino personalizado online
* acompanhamento de treino online
* consultoria de treino personalizada

Preserve essa diferença na arquitetura e na comunicação.

---

## 9. BUSCAS LONG TAIL

Quero priorizar também pesquisas mais específicas.

Em vez de tentar competir somente por:

`treino feminino`

podemos ter páginas que respondem melhor a buscas como:

`programa de treino feminino para academia`

ou:

`treino feminino para definição na academia`

ou ainda:

`treino pronto para mulher que treina 4 vezes por semana`

quando essas características forem verdadeiras para determinado produto.

Quanto mais específica a intenção, mais relevante deve ser a página entregue.

Não crie páginas separadas para cada pequena variação.

Uma boa página de produto pode responder naturalmente a várias buscas relacionadas.

---

## 10. MAPA DE INTENÇÃO POR PRODUTO

Antes de escrever ou alterar conteúdo, faça uma análise dos produtos presentes em:

`src/data/catalog.ts`

Para cada um, determine:

### Produto

Nome comercial.

### Objetivo principal

Qual transformação ou necessidade ele realmente atende.

### Público

Para quem ele realmente foi criado.

### Contexto

Academia, casa, equipamentos etc., quando houver essa informação.

### Intenção principal de busca

Qual seria a pesquisa mais provável que deveria levar até esse produto.

### Intenções secundárias

Outras 3 a 8 buscas relacionadas que a mesma página poderia responder naturalmente.

### Intenção comercial

Como alguém próximo da compra poderia pesquisar por essa solução.

Exemplo apenas de raciocínio:

Produto:
`Nome comercial X`

Objetivo:
`definição muscular`

Intenção principal:
`treino feminino para definição`

Secundárias:
`programa de treino para definição`
`treino de definição feminino academia`
`treino para mulher definir o corpo`

Comercial:
`programa de treino feminino para definição`

NÃO use esse exemplo automaticamente.

Analise cada produto real.

---

## 11. EVITAR CANIBALIZAÇÃO

Não quero que diversas páginas tentem posicionar exatamente para a mesma intenção.

Exemplo:

se uma página é a principal resposta para:

`consultoria personal online`

não precisamos criar outras cinco páginas praticamente iguais tentando disputar a mesma busca.

Cada página deve possuir um propósito claro.

Estruture as páginas para que o Google consiga entender:

Home → marca e visão geral

/programas → categoria geral de programas

/programas/[produto] → intenção específica daquele programa

/consultoria-online → acompanhamento personalizado

/eventos → eventos

/eventos/[evento] → evento específico

---

## 12. FOCO EM CONVERSÃO, NÃO APENAS TRÁFEGO

O objetivo final NÃO é gerar o maior número possível de visitantes.

Quero atrair pessoas que tenham alguma possibilidade real de se interessar pelos produtos.

Prefira posicionar bem para:

`programa de treino feminino para academia`

do que trazer milhares de acessos irrelevantes através de uma pesquisa extremamente genérica como:

`exercícios`.

SEO deve aproximar:

PESQUISA DO USUÁRIO

↓

PROBLEMA / OBJETIVO

↓

PÁGINA MAIS RELEVANTE

↓

PRODUTO ADEQUADO

↓

COMPRA OU CONTATO

A arquitetura, conteúdo e links internos devem seguir essa lógica.


O objetivo NÃO é simplesmente "colocar palavras-chave".

Quero que o Google consiga:

1. encontrar as páginas;
2. rastreá-las;
3. entender o conteúdo;
4. diferenciar cada produto/serviço;
5. indexar URLs individuais;
6. relacionar cada página com pesquisas relevantes;
7. exibir título e descrição adequados nos resultados;
8. compreender produtos, serviços, eventos e a profissional através de dados estruturados.

---

# REGRA MAIS IMPORTANTE

NÃO altere:

* identidade visual;
* layout;
* experiência atual sem necessidade;
* funcionamento de compra;
* Firebase;
* autenticação;
* integração com pagamentos;
* carrinho;
* checkout;
* Meta Pixel;
* APIs existentes;
* funcionamento dos eventos.

SEO deve ser implementado ao redor da aplicação existente.

Antes de remover, substituir ou migrar qualquer tecnologia, avalie impacto e necessidade.

NÃO faça uma migração grande para Next.js.

Se algo puder ser resolvido com React + Vite + Vercel, prefira essa solução.

---

# 1. RENDERIZAÇÃO E HTML INDEXÁVEL

Hoje o projeto é SPA pura e o HTML inicial praticamente contém apenas:

`<div id="root"></div>`

Quero melhorar isso.

Analise e implemente a melhor estratégia segura de:

* prerender;
* geração estática;
* SSG;
* ou outra solução equivalente

compatível com React + Vite + Vercel.

O objetivo é que páginas públicas importantes tenham conteúdo relevante presente no HTML entregue inicialmente, incluindo quando aplicável:

* title;
* meta description;
* canonical;
* H1;
* descrição;
* nome do produto;
* informações principais;
* JSON-LD.

NÃO implemente "dynamic rendering" exclusivo para bots.

Googlebot e usuário devem receber essencialmente o mesmo conteúdo.

Antes de escolher biblioteca/plugin de prerender, confirme que:

* é mantido;
* é compatível com as versões atuais do projeto;
* funciona no build da Vercel;
* não quebra React Router;
* não depende de solução abandonada;
* não cria uma arquitetura excessivamente complexa.

Se implementar prerender/SSG exigir uma alteração muito grande ou arriscada, NÃO faça uma migração silenciosa.

Nesse caso:

1. implemente todas as melhorias seguras possíveis;
2. documente qual seria a mudança necessária para resolver completamente essa parte.

---

# 2. CRIAR URLs INDIVIDUAIS PARA OS PROGRAMAS

Atualmente aproximadamente 19 itens estão em:

`src/data/catalog.ts`

Os detalhes aparecem apenas através de `ProgramDetailsModal`.

Isso é ruim para descoberta orgânica porque cada produto não possui uma URL indexável própria.

Quero manter o catálogo e o modal se eles forem úteis para UX, porém criar páginas reais para os produtos.

Exemplo de estrutura:

`/programas`
`/programas/nome-do-programa`

ou outra estrutura melhor tecnicamente.

Use slugs:

* minúsculos;
* sem acentos;
* separados por hífen;
* curtos;
* descritivos;
* permanentes.

Exemplo conceitual:

`/programas/definicao-total`

em vez de:

`/?produto=123`

ou URLs baseadas apenas em IDs.

Cada produto deve possuir uma URL estável.

---

# 3. NÃO DUPLICAR MANUALMENTE OS PRODUTOS

`src/data/catalog.ts` deve continuar sendo, sempre que possível, a fonte principal dos dados dos programas.

Evite criar 19 páginas TypeScript duplicadas manualmente.

Prefira uma estrutura reutilizável do tipo:

`/programas/:slug`

com os dados provenientes do catálogo.

Porém as URLs públicas precisam ser compatíveis com a estratégia de geração estática/prerender escolhida.

O sistema deve conseguir gerar automaticamente as páginas existentes a partir do catálogo.

---

# 4. PÁGINA INDIVIDUAL DE PROGRAMA

Crie um template reutilizável para página individual.

Preserve a identidade visual existente.

Cada página deve apresentar usando SOMENTE informações verdadeiras já existentes no projeto:

* nome do programa;
* imagem;
* descrição;
* objetivo;
* características;
* público indicado;
* benefícios descritos atualmente;
* preço, quando existir;
* CTA;
* botão de compra;
* botão de WhatsApp quando fizer parte do fluxo atual;
* informações relevantes existentes no catálogo.

Não invente:

* benefícios;
* resultados garantidos;
* depoimentos;
* qualificações;
* números;
* duração;
* características;
* contraindicações.

Se alguma informação não existir no projeto, simplesmente não utilize.

---

# 5. LINKS DO CATÁLOGO

Os produtos precisam possuir links HTML reais para suas páginas.

Evite depender exclusivamente de algo como:

`onClick={() => abrirModal()}`

para descobrir os produtos.

Quero links rastreáveis, idealmente `<a href>` ou componente equivalente do React Router que gere âncora HTML.

Exemplo:

Produto → `/programas/nome-do-programa`

Podemos continuar usando modal onde fizer sentido, porém deve existir uma forma clara e rastreável de acessar a URL individual.

Analise a melhor UX sem prejudicar o funcionamento atual.

---

# 6. CONSULTORIA

A consultoria NÃO deve ser apresentada de forma que diminua ou desvalorize os programas prontos.

A comunicação atual do projeto deve ser preservada.

Ela é uma opção diferente para quem deseja:

* acompanhamento mais próximo;
* contato;
* suporte;
* atenção individual;
* orientação personalizada;

quando essas informações já estiverem presentes no projeto.

Crie uma página indexável própria para a consultoria se ainda não existir.

Exemplo:

`/consultoria-online`

ou nomenclatura equivalente mais coerente com o conteúdo real.

Se existem planos diferentes da mesma consultoria, analise se:

A) devem estar todos dentro de `/consultoria-online`;

ou

B) realmente justificam URLs individuais.

Não crie páginas artificiais apenas para gerar volume de páginas.

---

# 7. SEO POR PÁGINA

Crie uma estrutura centralizada para gerenciamento de SEO.

Cada página pública indexável deve possuir de forma individual:

* `<title>`;
* meta description;
* canonical;
* robots;
* Open Graph title;
* Open Graph description;
* Open Graph URL;
* Open Graph image quando aplicável;
* Twitter Card;
* JSON-LD quando aplicável.

Não quero tags espalhadas de maneira desorganizada por componentes.

Crie uma solução reutilizável, por exemplo um componente/helper de SEO, se isso for adequado à arquitetura.

---

# 8. TITLE

Cada página deve possuir title único e natural.

Não faça títulos gigantes.

Exemplo conceitual:

`Nome do Programa | Maju Santos`

ou:

`Consultoria Online | Maju Santos`

Mas analise o conteúdo real antes de definir.

Não repita exatamente o mesmo title em todas as páginas.

---

# 9. META DESCRIPTION

Cada página indexável deve possuir descrição própria.

Ela deve:

* explicar o conteúdo daquela página;
* ser natural;
* ajudar o usuário a decidir se aquela página responde à pesquisa;
* incluir termos relevantes apenas quando fizer sentido.

Não faça keyword stuffing.

Não copie a mesma description para todos os produtos.

---

# 10. NÃO USAR META KEYWORDS

NÃO adicione:

`<meta name="keywords">`

Não quero SEO baseado nessa tag.

Quando eu falar em "palavras-chave", estou falando de:

* intenção da página;
* conteúdo;
* título;
* headings;
* descrição;
* arquitetura;
* links internos;

e NÃO de uma meta tag de keywords.

---

# 11. CANONICAL

Este é um problema importante atualmente.

Hoje todas as páginas apontam para:

`https://majusantospersonal.vercel.app/`

como canonical.

Corrija isso.

Cada página indexável deve ter canonical apontando para ELA MESMA.

Exemplos:

Home:
`https://DOMINIO/`

Programa:
`https://DOMINIO/programas/nome`

Consultoria:
`https://DOMINIO/consultoria-online`

Evento:
`https://DOMINIO/eventos/wellness-experience`

Centralize a URL base para facilitar futura troca do domínio `vercel.app` por um domínio próprio.

NÃO espalhe o domínio hardcoded por dezenas de arquivos.

Crie algo como uma configuração única de `SITE_URL`, utilizando a estratégia mais apropriada para este projeto.

---

# 12. DOMÍNIO

Não altere automaticamente o domínio atual porque isso depende de configuração externa.

Por enquanto, utilize corretamente o domínio existente.

Mas prepare o código para que posteriormente seja simples trocar:

`majusantospersonal.vercel.app`

por um domínio próprio.

No relatório final, indique exatamente onde essa mudança deverá ser feita.

---

# 13. SITEMAP

Corrija o sitemap.

Atualmente ele inclui páginas transacionais como:

* `/cart`
* `/checkout`

Não quero essas páginas no sitemap.

O sitemap deve conter APENAS páginas públicas que realmente queremos que apareçam no Google.

Provavelmente incluir:

* `/`
* `/programas`, se essa página for criada
* todas as URLs individuais dos programas
* `/consultoria-online`
* `/eventos`
* `/eventos/wellness-experience`

Analise se outras páginas públicas realmente merecem indexação.

Prefira gerar o sitemap automaticamente com base nas rotas/produtos para evitar manutenção manual.

Se um novo programa for adicionado ao `catalog.ts`, idealmente o sitemap deverá conseguir incorporá-lo sem editar o XML manualmente.

Use apenas URLs canônicas.

---

# 14. PÁGINAS QUE NÃO DEVEM APARECER NO GOOGLE

Analise e aplique `noindex` corretamente em páginas como:

* `/cart`
* `/checkout`
* `/success`
* `/obrigado`
* `/pending`
* `/failure`
* `/minha-conta`

Analise também:

`/eventos/wellness-experience/inscricao`

Se for apenas uma etapa operacional de inscrição e não uma landing page relevante para pesquisa, provavelmente deve ser `noindex`.

Não aplique isso cegamente: verifique a finalidade real.

Essas páginas também NÃO devem entrar no sitemap.

Prefira:

`noindex, follow`

onde fizer sentido.

Para páginas privadas/autenticadas, escolha a estratégia tecnicamente mais apropriada.

---

# 15. ROBOTS.TXT

Revise `public/robots.txt`.

Ele deve:

* permitir rastreamento das páginas públicas;
* informar o sitemap correto;
* utilizar o domínio correto.

Não tente usar `robots.txt` como substituto de `noindex`.

Tenha cuidado para não bloquear no robots.txt uma página que precisa ser rastreada para que o Google consiga enxergar seu `noindex`.

---

# 16. SOFT 404 / VERCEL

Atualmente:

`vercel.json`

possui um catch-all semelhante a:

`/(.*) → /`

Isso faz parte do fallback da SPA.

Porém URLs inexistentes podem receber HTTP 200 e depois mostrar a página 404 apenas no React.

Quero corrigir esse problema sem quebrar:

* deep links;
* React Router;
* checkout;
* conta;
* páginas de produto;
* eventos.

Depois da implementação de páginas estáticas/prerenderizadas, revise a necessidade desse catch-all.

O objetivo é:

URL existente → funciona normalmente.

URL inexistente → retorna HTTP 404 real quando tecnicamente possível.

Não simplesmente remova o rewrite sem testar todas as rotas.

Faça uma solução compatível com a Vercel.

---

# 17. HEADINGS

Revise as páginas indexáveis.

Cada página deve possuir hierarquia semântica clara:

H1 → assunto principal da página

H2 → seções

H3 → subseções

Não transforme textos em headings apenas para SEO.

Não repita H1 desnecessariamente.

---

# 18. CONTEÚDO VISÍVEL

O conteúdo que queremos indexar deve ser texto HTML real.

Evite colocar informações importantes exclusivamente em:

* imagens;
* atributos;
* JavaScript inacessível;
* modais que nunca entram no HTML da página;
* elementos sem representação semântica.

Não adicione textos escondidos para mecanismos de busca.

Usuário e Google devem encontrar o mesmo conteúdo.

---

# 19. STRUCTURED DATA / JSON-LD

Hoje existe:

* Person
* ProfessionalService

Revise e mantenha apenas se os dados estiverem corretos.

Implemente Schema.org somente quando o conteúdo da página realmente suportar o dado.

Considere:

HOME:

* Person
* ProfessionalService ou tipo mais adequado
* WebSite, se fizer sentido

PROGRAMAS:

* Product
* Offer, quando houver preço/oferta real

CONSULTORIA:

* Service, se tecnicamente mais correto do que Product

EVENTO WELLNESS:

* Event

NAVEGAÇÃO:

* BreadcrumbList nas páginas internas, se houver breadcrumb real/coerente.

Não invente avaliações.

Não coloque:

* AggregateRating;
* Review;
* estrelas;
* disponibilidade;
* preço;
* datas;

se esses dados não existirem de verdade.

JSON-LD deve representar o conteúdo visível da página.

---

# 20. WELLNESS EXPERIENCE

A página:

`/eventos/wellness-experience`

já altera title e description através de JavaScript depois do mount.

Melhore isso dentro da estratégia geral.

Quero que a versão inicial/indexável já possua:

* title próprio;
* description própria;
* canonical próprio;
* OG próprio;
* JSON-LD `Event` quando todos os dados obrigatórios/relevantes estiverem disponíveis.

Utilize datas, local, imagens e demais informações SOMENTE se existirem de verdade no projeto.

---

# 21. OPEN GRAPH

Corrija OG por página.

Cada produto deve poder ser compartilhado com informações coerentes.

Configure quando aplicável:

* `og:title`
* `og:description`
* `og:url`
* `og:type`
* `og:image`

Utilize imagem existente adequada.

Não gere imagens falsas automaticamente.

Mantenha fallback para a imagem institucional atual quando não existir uma imagem específica adequada.

---

# 22. IMAGENS

Faça auditoria nas imagens públicas pensando em:

* peso;
* dimensões;
* formatos;
* lazy loading;
* width/height;
* layout shift;
* alt text;
* imagens acima da dobra;
* hero.

Não coloque alt text cheio de palavras-chave.

Alt deve descrever a imagem de maneira útil.

Imagens puramente decorativas podem utilizar `alt=""`.

Não comprometa qualidade visual apenas para diminuir alguns KB.

---

# 23. PERFORMANCE / CORE WEB VITALS

Analise:

* LCP;
* CLS;
* INP;
* bundle inicial;
* scripts externos;
* imagens;
* fontes;
* lazy loading;
* carregamento do Firebase;
* bibliotecas carregadas sem necessidade;
* componentes abaixo da dobra;
* código dividido por rota.

Implemente otimizações seguras.

Não quebre funcionalidades em nome de um score.

Se fizer code splitting/lazy loading, garanta que isso não prejudique a renderização indexável das páginas importantes.

---

# 24. LINKS INTERNOS

Crie uma arquitetura de links internos natural.

Exemplos:

Home → programas

Home → consultoria

Programas → páginas individuais

Programa → outros programas relacionados quando fizer sentido

Home → eventos

Eventos → evento específico

Footer → páginas principais

Não crie links artificiais apenas para SEO.

Use textos de link que façam sentido para seres humanos.

---

# 25. BREADCRUMBS

Nas páginas de produto/evento onde fizer sentido, implemente breadcrumb visual simples e semanticamente correto.

Exemplo:

Início > Programas > Nome do programa

Se utilizar BreadcrumbList JSON-LD, mantenha coerência com a navegação real.

---

# 26. PÁGINA /PROGRAMAS

Analise se vale criar uma página:

`/programas`

com todos os programas.

Se tecnicamente e semanticamente fizer sentido, implemente.

Ela deve funcionar como página de categoria/índice e possuir conteúdo próprio suficiente para não ser simplesmente uma cópia da seção da home.

Preserve o catálogo existente e reutilize seus componentes.

---

# 27. INTENÇÃO DE BUSCA

Analise os nomes e descrições reais presentes em `src/data/catalog.ts`.

Para cada programa, identifique qual problema/intenção ele realmente atende.

Exemplo conceitual:

Nome comercial:
"Definição Total"

Intenção possível:
programa de treino feminino para definição

Isso é apenas exemplo.

NÃO presuma que esse produto existe nem altere a comunicação sem olhar os dados reais.

Utilize os termos de busca naturalmente em:

* title;
* H1/H2 quando adequado;
* descrição inicial;
* conteúdo;
* links internos;
* meta description.

Não force frases estranhas apenas para colocar palavras-chave.

---

# 28. CONTEÚDO E COPY

Não reescreva agressivamente todo o site.

A identidade da comunicação atual deve ser preservada.

Se encontrar páginas com pouco contexto textual para o Google entender o produto, acrescente conteúdo somente quando for realmente útil para o usuário.

Evite:

* texto genérico;
* texto produzido apenas para SEO;
* repetição de palavras;
* páginas quase idênticas;
* conteúdo escondido;
* conteúdo enorme sem necessidade.

---

# 29. FAQ

Analise se existem dúvidas reais já respondidas no projeto.

Se houver conteúdo suficiente, podemos ter FAQ visual dentro de páginas estratégicas.

Não invente dezenas de perguntas apenas para SEO.

Não implemente `FAQPage` structured data automaticamente sem primeiro verificar se:

* o conteúdo existe de verdade;
* está visível;
* o uso está de acordo com as regras atuais dos mecanismos de busca.

FAQ deve existir primeiro para ajudar o usuário.

---

# 30. GOOGLE SEARCH CONSOLE

NÃO é necessário implementar uma tag `google-site-verification` agora.

Search Console será configurado posteriormente.

Prepare o projeto para isso e, no relatório final, explique:

1. como cadastrar o domínio/site;
2. método recomendado de verificação;
3. como enviar o sitemap;
4. quais URLs importantes solicitar inspeção inicialmente;
5. como acompanhar páginas indexadas;
6. como acompanhar consultas, cliques, impressões, CTR e posição.

Se futuramente eu fornecer um código de verificação, deixe claro onde deverá ser colocado caso optemos pelo método HTML.

NÃO invente um código de verification.

---

# 31. GOOGLE ANALYTICS

Atualmente não existe GA4.

NÃO invente Measurement ID.

Prepare uma integração limpa e opcional se fizer sentido, preferencialmente através de variável de ambiente.

Algo conceitualmente como:

`VITE_GA_MEASUREMENT_ID`

Porém só implemente o código se isso não adicionar complexidade desnecessária agora.

Se implementar:

* não envie eventos duplicados;
* SPA precisa registrar mudanças de rota corretamente;
* não interfira no Meta Pixel existente.

No relatório final indique como ativar.

---

# 32. GOOGLE BUSINESS PROFILE

Google Business Profile / Perfil da Empresa no Google é configuração externa.

NÃO tente resolver isso pelo código.

O foco deste projeto é SEO do SITE.

Apenas informe no relatório final que o Perfil da Empresa pode ser trabalhado separadamente para buscas locais.

---

# 33. 404

A página 404 deve:

* continuar visualmente adequada;
* possuir `noindex`;
* não usar canonical apontando para home;
* retornar HTTP 404 real quando possível na arquitetura escolhida.

Teste URLs aleatórias.

Exemplo:

`/isso-nao-existe-123456`

Não deve ser tratada como uma página válida da home.

---

# 34. REDIRECTS LEGADOS

Existem URLs antigas:

`/wellnessexperience*`

Revise esses redirects.

Se a página mudou permanentemente, utilize redirect permanente apropriado para a URL canônica atual, quando tecnicamente correto.

Evite cadeias:

A → B → C

Prefira:

A → C

---

# 35. HTTPS / WWW / DUPLICIDADES

Analise se existe apenas uma versão canônica do domínio.

Não precisamos alterar infraestrutura externa agora.

Mas o projeto deve estar preparado para evitar futuramente duplicidades como:

* HTTP vs HTTPS;
* www vs sem www;
* URLs com slash e sem slash;
* parâmetros desnecessários;
* páginas duplicadas.

---

# 36. ACESSIBILIDADE E SEMÂNTICA

Faça melhorias seguras em:

* `<main>`;
* `<nav>`;
* `<header>`;
* `<footer>`;
* `<section>`;
* labels;
* botões;
* links;
* headings;
* aria somente quando necessário.

Evite `div` clicável quando semanticamente deveria ser botão ou link.

Isso deve melhorar acessibilidade e entendimento estrutural sem alterar o visual.

---

# 37. NÃO FAZER

NÃO:

* criar centenas de páginas artificiais;
* criar conteúdo duplicado;
* criar páginas por cidade que não tenham conteúdo real;
* esconder texto;
* adicionar keyword stuffing;
* usar meta keywords;
* comprar ou gerar backlinks;
* criar avaliações falsas;
* criar dados estruturados falsos;
* mudar nomes comerciais sem necessidade;
* alterar preços;
* inventar promoções;
* criar resultados garantidos;
* criar depoimentos;
* migrar para Next.js sem necessidade;
* substituir Firebase;
* alterar checkout;
* alterar sistema de pagamentos;
* alterar identidade visual.

---

# 38. BUILD

Depois das alterações:

Execute:

* TypeScript check, se disponível;
* lint;
* testes existentes;
* `npm run build`.

Corrija qualquer erro causado pelas alterações.

Confirme que `dist` é gerado corretamente.

Verifique especificamente que o build que será enviado para a Vercel contém as páginas/HTML esperados pela estratégia de prerender/SSG.

---

# 39. TESTES DE SEO

Depois do build, faça verificações locais.

Para algumas páginas estratégicas, inspecione o HTML gerado SEM depender da execução posterior do React.

Teste pelo menos:

* `/`
* uma página de programa
* `/consultoria-online`
* `/eventos`
* `/eventos/wellness-experience`
* uma URL inexistente

Confirme:

HOME

* title correto
* description correta
* canonical correto
* conteúdo relevante no HTML

PROGRAMA

* title próprio
* H1 próprio
* description própria
* canonical próprio
* conteúdo do produto
* JSON-LD adequado

CONSULTORIA

* metadata própria
* conteúdo indexável

EVENTO

* metadata própria
* Event Schema quando válido

404

* não deve parecer página válida/indexável.

---

# 40. SITEMAP AUTOMÁTICO

Após o build, confira se:

* todas as páginas indexáveis estão presentes;
* páginas noindex não estão presentes;
* produtos estão presentes;
* URLs estão corretas;
* não existem duplicidades;
* domínio base está centralizado.

---

# 41. ROBOTS

Confira na versão final:

`/robots.txt`

Deve estar acessível diretamente.

`/sitemap.xml`

Também deve estar acessível diretamente.

---

# 42. ESTRUTURA DE CÓDIGO

Quero uma arquitetura limpa.

Prefira algo conceitualmente semelhante a:

* configuração global do site;
* utilitário/componente SEO;
* geração de slug;
* geração de sitemap;
* template de página de programa;
* dados vindos do catálogo;
* schemas reutilizáveis.

Não precisa seguir esses nomes se a estrutura atual indicar algo melhor.

Evite duplicar informações como:

* domínio;
* nome da marca;
* URLs;
* produtos;
* preços.

---

# 43. COMPATIBILIDADE COM ADIÇÃO DE NOVOS PRODUTOS

Esse ponto é importante.

Hoje os produtos ficam em:

`src/data/catalog.ts`

Quero que futuramente seja fácil adicionar um programa.

Idealmente ao adicionar um novo produto com os campos necessários:

* ele aparece no catálogo;
* ganha sua URL;
* recebe metadata;
* entra no sitemap;
* pode receber structured data;

sem precisar editar cinco arquivos diferentes.

Projete pensando nisso.

---

# 44. CAMPOS SEO NO CATÁLOGO

Se fizer sentido, você pode ampliar a estrutura dos itens com campos como:

* `slug`
* `seoTitle`
* `seoDescription`

Porém:

não quero obrigatoriamente duplicar conteúdo que possa ser derivado com qualidade dos dados existentes.

Crie campos específicos apenas quando existir vantagem real.

Não use:

`keywords: []`

como meta keywords.

Se quiser armazenar conceito/intenção de busca internamente para organização, deixe claro que isso NÃO será transformado em `<meta name="keywords">`.

---

# 45. PRIORIDADE

Execute nesta ordem:

PRIORIDADE 1 — CRÍTICO

* corrigir canonical;
* URLs de produtos;
* conteúdo indexável;
* estratégia prerender/SSG;
* metadata individual;
* sitemap;
* noindex das páginas transacionais;
* soft 404.

PRIORIDADE 2 — IMPORTANTE

* structured data;
* links internos;
* headings;
* Open Graph;
* breadcrumbs;
* performance;
* imagens.

PRIORIDADE 3 — COMPLEMENTAR

* GA4 preparado;
* documentação Search Console;
* sugestões de conteúdo futuro.

Não gaste tempo com detalhes cosméticos antes dos problemas estruturais.

---

# 46. NÃO FAÇA SEO BASEADO APENAS EM SCORE

Não quero simplesmente:

"100/100 no Lighthouse".

Lighthouse é ferramenta de diagnóstico, não objetivo isolado.

Priorize:

* rastreabilidade;
* indexação;
* HTML;
* conteúdo;
* arquitetura;
* intenção de busca;
* performance real;
* UX.

---

# 47. DOCUMENTAÇÃO FINAL

Ao terminar, crie um relatório chamado:

`SEO_IMPLEMENTATION_REPORT.md`

Inclua:

## Arquitetura anterior

Explique resumidamente como funcionava.

## Arquitetura atual

Explique o que mudou.

## Problemas corrigidos

Liste os problemas encontrados e soluções.

## URLs indexáveis

Liste todas.

## URLs noindex

Liste todas.

## Produtos

Mostre:

produto → slug → URL.

## Metadata

Explique como é gerenciada.

## Canonical

Explique como funciona.

## Sitemap

Explique como é gerado.

## Robots

Explique as regras.

## Structured Data

Liste schemas implementados e onde.

## Prerender / SSG

Explique a solução escolhida e por quê.

## Vercel

Explique mudanças realizadas em `vercel.json`.

## 404

Explique como URLs inexistentes são tratadas.

## Search Console

Passe o passo a passo que preciso fazer manualmente.

## Analytics

Explique se foi preparado e como ativar.

## Domínio próprio

Explique exatamente o que precisará ser alterado quando sairmos do `vercel.app`.

## Novos produtos

Explique como adicionar um produto futuramente sem quebrar o SEO.

## Testes realizados

Liste:

* build;
* lint;
* testes;
* páginas verificadas;
* HTML gerado;
* sitemap;
* robots;
* redirects;
* 404.

## Pendências externas

Tudo que depender de:

* Vercel Dashboard;
* DNS;
* Google Search Console;
* Google Analytics;
* Google Business Profile.

---

# 48. MUITO IMPORTANTE: NÃO PRESUMIR QUE ALTERAÇÃO = MELHORIA

Antes de alterar qualquer arquitetura crítica, confirme no próprio projeto que a alteração realmente é necessária.

Especialmente:

* router;
* Vercel rewrites;
* prerender;
* Firebase;
* checkout.

Prefira a menor mudança capaz de resolver corretamente o problema.

---

# RESULTADO QUE EU ESPERO

Quero sair de uma estrutura parecida com:

Google encontra:

`/`

e praticamente todo o catálogo existe dentro dela.

Para algo parecido com:

`/`
`/programas`
`/programas/programa-a`
`/programas/programa-b`
`/programas/programa-c`
`/consultoria-online`
`/eventos`
`/eventos/wellness-experience`

onde cada página importante possui:

* URL própria;
* conteúdo próprio;
* HTML indexável;
* title;
* description;
* canonical;
* Open Graph;
* structured data quando aplicável;
* links internos;
* presença correta no sitemap.

Enquanto:

`/cart`
`/checkout`
`/success`
`/pending`
`/failure`
`/minha-conta`

continuam funcionando normalmente, mas não disputam espaço desnecessariamente no Google.

---

# MODO DE EXECUÇÃO

Primeiro analise os arquivos atuais relacionados a essas alterações.

Depois implemente em etapas pequenas.

A cada etapa importante, preserve compatibilidade com o restante da aplicação.

Não pare apenas na análise: implemente as melhorias seguras.

Se encontrar alguma mudança que envolva risco alto de quebrar produção ou exigir migração grande de arquitetura, NÃO faça essa parte automaticamente.

Implemente o restante e documente:

* problema;
* solução recomendada;
* motivo de não ter sido feita automaticamente.

Ao final, execute os testes e gere `SEO_IMPLEMENTATION_REPORT.md`.
