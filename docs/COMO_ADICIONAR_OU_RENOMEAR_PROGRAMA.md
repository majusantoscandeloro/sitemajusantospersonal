# Como adicionar ou renomear um programa de treino

Documento de referência para quando pedirmos: **incluir programa novo** ou **mudar nome/URL** de um existente.

> Fonte principal do catálogo: `src/data/catalog.ts`  
> URL pública: `/programas/{slug}` onde `slug` = `productId` com `_` trocado por `-`  
> Ex.: `definicao_total` → `/programas/definicao-total`

---

## Regras importantes

1. **Não inventar URL solta.** A URL vem do `productId`. Quem define o endereço é o catálogo.
2. **Mudar só o título na tela ≠ mudar a URL.** Título comercial e slug são coisas diferentes.
3. **Trocar `productId` quebra a URL antiga.** Google, links salvos e possíveis IDs no app/Firebase podem apontar para o ID antigo — precisa redirect + checagem no backend.
4. Depois de alterar código: **build + deploy**. Sitemap e prerender SEO regeneram no `npm run build`.
5. **Search Console / GA4** não atualizam sozinhos a “memória” do Google: URL nova pode precisar de inspeção; URL antiga precisa de redirect se mudou o slug.

---

## Checklist A — Incluir um programa NOVO

Marque tudo o que se aplicar:

### 1. Catálogo (obrigatório)
- [ ] Adicionar item em `src/data/catalog.ts` (`catalogItems`)
  - `id` único (string usada no card/modal)
  - `productId` estável em `snake_case` (ex.: `secando_rapido`)
  - `title`, `subtitle?`, `shortDescription`, `description`
  - `priceCents`, `image`, `type: 'programa'`
  - `level`, `duration`, `category?`, `accessPeriod?`
  - `objective?`, `features?`, etc. (quanto mais completo, melhor o modal e o SEO)
- [ ] Incluir o `id` na categoria certa em `catalogCategoryDefs` (home / carrosséis)

### 2. Compra / disponibilidade
- [ ] Se já for comprável no site: incluir `productId` em `AVAILABLE_PRODUCT_IDS` (mesmo arquivo `catalog.ts`)
- [ ] Se ainda for “em breve”, **não** colocar em `AVAILABLE_PRODUCT_IDS`
- [ ] Conferir se o backend/Firebase/app já conhece esse `productId` (seed/upload se o fluxo do projeto exigir — ver scripts `seed:programs`, `upload:covers`)

### 3. SEO / intenção de busca (obrigatório para página indexável boa)
- [ ] Adicionar entrada em `src/data/searchIntent.ts` com o **mesmo** `productId`
  - `seoTitle` / `seoDescription`
  - objetivo, público, contexto, intenções
  - **não** usar meta keywords

### 4. Nome no checkout / backend (se necessário)
- [ ] Se o nome enviado ao pagamento/n8n precisar ser específico: atualizar `PRODUCT_DISPLAY_NAMES` em `src/lib/products.ts`

### 5. Imagem
- [ ] Colocar asset otimizado (webp de preferência) e importar no `catalog.ts`

### 6. O que o build faz sozinho
Após o item existir no catálogo + searchIntent:

- rota `/programas/{slug}`
- sitemap
- HTML prerender (title, description, canonical, JSON-LD Product)
- links internos relacionados (mesma categoria)

Comando local de checagem:

```bash
npm run build
```

Conferir em `dist/programas/<slug>/index.html` o title e o H1.

### 7. Publicar e Google
- [ ] Commit + deploy produção
- [ ] Abrir a URL nova no navegador
- [ ] (Opcional) Search Console → Inspeção de URL → solicitar indexação
- [ ] Sitemap já é regenerado no build; se o Search Console já tem o sitemap cadastrado, o Google releia com o tempo (pode forçar reenvio se quiser)

---

## Checklist B — Mudar só o NOME comercial (recomendado na maioria dos casos)

Ex.: “Definição Total” → “Secando Rápido”, **mantendo** `productId: definicao_total` e URL `/programas/definicao-total`.

- [ ] `title` / `subtitle` / descrições em `src/data/catalog.ts`
- [ ] `seoTitle` / `seoDescription` (e textos de intenção) em `src/data/searchIntent.ts`
- [ ] `PRODUCT_DISPLAY_NAMES` em `src/lib/products.ts` (se existir entrada fixa)
- [ ] Build + deploy

**Vantagem:** não quebra URL, links, indexação nem IDs de produto.

---

## Checklist C — Mudar a URL / `productId` (cuidado)

Ex.: `definicao_total` → `secando_rapido`  
URL: `/programas/definicao-total` → `/programas/secando-rapido`

### Antes de mudar
- [ ] Confirmar se o `productId` antigo já está em uso no app, Firebase, compras, cupons, n8n
- [ ] Preferir **não** mudar se a URL antiga já estiver indexada com tráfego — a menos que haja motivo forte

### No código
- [ ] Trocar `productId` em `src/data/catalog.ts`
- [ ] Atualizar `AVAILABLE_PRODUCT_IDS` se estiver na lista
- [ ] Atualizar chave em `src/data/searchIntent.ts`
- [ ] Atualizar `PRODUCT_DISPLAY_NAMES` em `src/lib/products.ts` (chave antiga → nova)
- [ ] Atualizar qualquer seed/ferramenta que cite o ID antigo
- [ ] **Redirect permanente** da URL antiga → nova em `vercel.json`  
  Ex.: `/programas/definicao-total` → `/programas/secando-rapido` (308/301)

### Depois do deploy
- [ ] Testar URL nova (200)
- [ ] Testar URL antiga (deve redirecionar, não 404)
- [ ] Search Console: inspecionar URL nova; acompanhar a antiga
- [ ] Avisar se há links externos (bio, Stories, WhatsApp) apontando para a URL antiga

---

## O que NÃO precisa editar na mão (se o catálogo estiver certo)

| Item | Motivo |
|---|---|
| `programDetails.ts` | Deriva do catálogo |
| `programs.ts` / views de carrossel | Em geral derivam do catálogo + `catalogCategoryDefs` |
| `scripts/generate-sitemap.mjs` | Lê o catálogo no build |
| `scripts/prerender-html.mjs` | Lê catálogo + searchIntent no build |
| JSON-LD Product | Gerado a partir do catálogo |

---

## Consultoria (não é página `/programas/:slug`)

Planos `consultoria_*` ficam em `/consultoria-online`.  
Pré-cadastro externo: `CONSULTORIA_PRECADASTRO_URL` em `src/config/site.ts` (hoje aponta para apponfit).

Não criar slug individual por plano de consultoria sem decisão explícita de SEO/produto.

---

## Frase para usar no pedido futuro

Ao pedir inclusão/mudança, informe:

1. Nome comercial desejado  
2. Se a URL deve mudar ou permanecer  
3. Preço  
4. Se já está liberado para compra (`AVAILABLE_PRODUCT_IDS`)  
5. Imagem / capa  
6. Texto curto e longo (ou “usar o do catálogo atual e só ajustar SEO”)

Assim evitamos esquecer SEO, compra ou redirect.
