# Resumo das alterações no front (para repassar ao backend)

## O que mudou no fluxo

- **Antes:** O usuário era obrigado a criar conta ou fazer login antes de pagar (modal de cadastro no checkout).
- **Agora:** O usuário preenche só nome, e-mail e WhatsApp no checkout e vai direto para o Mercado Pago, sem precisar de conta. Depois do pagamento, pode criar conta na página de sucesso para acessar o app.

---

## O que o front passou a enviar na API

Na chamada **POST create-preference**, o front envia:

| Situação | Campos enviados |
|----------|------------------|
| **Usuário logado** | `productId`, `uid`, `email`, `name`, `whatsapp` |
| **Usuário não logado** | `productId`, `email`, `name`, `whatsapp` (sem `uid`) |

Ou seja: **`uid` deixou de ser obrigatório**. Quando o usuário não está logado, enviamos **`email`** (obrigatório) + **`name`** e **`whatsapp`** (opcional).

O backend precisa:

1. Aceitar esse novo formato (checkout sem `uid`, só com `email` + `productId`).
2. Criar a preference do Mercado Pago e devolver o `init_point` igual hoje.
3. Guardar o e-mail (e se tiver, nome/WhatsApp) da compra para vincular à conta quando o usuário se cadastrar depois com o mesmo e-mail.
4. **Incluir o e-mail na URL de retorno de sucesso** do Mercado Pago, para o front pré-preencher o “Criar conta” na página de sucesso.  
   Exemplo: em vez de só `https://seusite.com/success?payment_id=123&status=approved`, usar algo como:  
   `https://seusite.com/success?payment_id=123&status=approved&email=cliente@email.com`  
   (conforme o que o Mercado Pago permitir na configuração das `back_urls` ou na preference.)

---

## Resumo em uma frase para o backend

*“O checkout não exige mais login. A API create-preference agora recebe `email` + `productId` (e opcionalmente `name`, `whatsapp`) quando não há `uid`. Precisamos que aceitem esse formato, guardem o e-mail da compra para vincular depois ao usuário quando ele criar conta, e que o e-mail do comprador seja enviado na URL de retorno de sucesso (ex.: query param `email=`) para pré-preencher o cadastro na página de sucesso.”*
