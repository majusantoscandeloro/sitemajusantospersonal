# Melhorias do site — 14 out 2026

Registro do que já foi alterado no código e do que ainda depende de conta, domínio ou decisão de produto.

## O que foi feito

### Compra
- O carrinho guarda um programa por vez. Escolher outro substitui o anterior, e o total da tela é o valor enviado ao Mercado Pago.
- A página de sucesso só diz que o pagamento foi confirmado quando o status é aprovado (`approved`, `authorized` ou `APRO`). Pendente ou sem status mostra outra mensagem.
- Erros do checkout e da inscrição do Wellness aparecem em toast, no lugar de `alert()`.
- Saiu a consulta que revelava se o e-mail já tinha conta no Firebase antes de pagar. Se o e-mail já existir, o cadastro depois da compra continua trocando para a tela de entrar.

### Anúncio e medição
- Meta Pixel e Google Analytics só carregam depois do aceite no aviso de cookies. Recusar não impede comprar.
- `ViewContent` e `InitiateCheckout` enviam o preço em reais e o `productId` do catálogo.
- `Purchase` só dispara com valor real salvo no checkout e status aprovado. Não usa mais o parâmetro `value` da URL, que vinha vazio.
- UTMs, `fbclid` e `gclid` da visita ficam guardados na sessão. O clique da Meta vira cookie `_fbc` só depois do aceite.

### Páginas e SEO
- Política de privacidade em `/privacidade` e termos em `/termos`, com links no rodapé.
- FAQ na home, também no HTML pré-renderizado e no JSON-LD.
- Sitemap republicado com `/ugc-creator`, `/privacidade` e `/termos`.
- Fontes reduzidas aos pesos usados (Montserrat 400–700 e Playfair 400/600/700), carregadas no `index.html`.

### Segurança
- `vercel.json` envia HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` e Content-Security-Policy. Vale no próximo deploy da Vercel.
- O site não chama mais `/health` para “acordar” o backend. A API está na VPS e não dorme. `/health` continua existindo só como checagem de saúde e fallback de vagas do Wellness.

### Testes
- `src/test/checkout-fixes.test.ts` cobre preço em reais, carrinho de um item e status de pagamento aprovado.

## O que ainda precisa ser feito

### Antes de aumentar a verba de anúncio
1. Colocar um domínio próprio no lugar de `majusantospersonal.vercel.app`. Trocar `VITE_SITE_URL` (ou `DEFAULT_SITE_URL` em `src/config/site.ts`) e republicar, para canonical, Open Graph e sitemap acompanharem o domínio.
2. Publicar a política de privacidade nesse domínio e informar a URL na conta da Meta e do Google Ads.
3. Confirmar no painel da Vercel que `VITE_META_PIXEL_ID` e, se for usar, `VITE_GA_MEASUREMENT_ID` estão definidos. Sem o ID, o aviso de cookies aparece, mas nenhum script de medição carrega.
4. Conversions API da Meta no backend (`mp-backend`), com o mesmo `event_id` do navegador. O token não pode ficar no frontend. Sem isso, o pixel do navegador perde compras de quem bloqueia cookie.
5. Tags de conversão do Google Ads e, se houver mídia no TikTok, o pixel de lá. Os dois precisam dos IDs das contas.

### Deploy
6. Fazer o deploy do site na Vercel para os headers de segurança e o sitemap novo irem ao ar.
7. Fazer o deploy do `mp-backend` se a alteração do comentário em `server.js` for publicada junto. O comportamento da API não mudou.

### Produto, quando fizer sentido
8. Depoimentos com nome na home. As fotos de resultado continuam no site. Em anúncio, criativo de rotina, app e depoimento passa com menos risco na política de imagem corporal da Meta.
9. A home ainda mostra vários carrosséis. Quem chega de um anúncio de um objetivo específico pode se perder antes do programa certo. As URLs `/programas/...` já servem de página de destino.
10. O README do `mp-backend` ainda descreve deploy no Render. A operação atual é a VPS. Vale atualizar esse guia quando for mexer no backend de novo.
