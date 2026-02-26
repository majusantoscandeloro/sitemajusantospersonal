# Prompt para o Backend – Adequar ao novo fluxo de checkout

Use o texto abaixo ao solicitar as alterações no backend (API do Mercado Pago).

---

Você é um desenvolvedor Backend focado em integração com Mercado Pago e experiência de compra.

**Contexto:** O front-end do site de venda de treinos (conteúdo digital) foi alterado para permitir **checkout sem cadastro**: o usuário não precisa mais criar conta ou fazer login antes de pagar. Ele preenche nome, e-mail e WhatsApp na página de checkout e é redirecionado direto para o Mercado Pago. Após o pagamento, pode criar conta no site com o mesmo e-mail para acessar o aplicativo mobile.

**Objetivo:** Ajustar a API do backend para aceitar esse novo fluxo, mantendo compatibilidade com usuários já logados e permitindo vincular o pagamento ao usuário quando ele se cadastrar depois com o mesmo e-mail.

---

## Contrato atual (referência)

- **POST** `create-preference`  
- Corpo: `{ "uid": string, "productId": string }`  
- `uid` = Firebase Auth UID do usuário logado.  
- Resposta: `{ "init_point": string }` (URL do checkout Mercado Pago).

---

## Novo contrato da API `create-preference`

**Endpoint:** `POST /create-preference` (ou o que você já usa).

**Corpo da requisição (JSON):**

| Campo       | Tipo   | Obrigatório | Descrição |
|------------|--------|-------------|-----------|
| `productId`| string | Sim         | ID do produto em snake_case (ex.: `definicao_total`, `hipertrofia_feminina`). |
| `uid`      | string | Não         | Firebase UID do usuário logado. Quando enviado, o fluxo é “logado” e o pagamento pode ser vinculado ao usuário. |
| `email`    | string | Sim*        | E-mail do comprador. Obrigatório quando `uid` não é enviado (checkout sem login). Recomendado enviar também quando há `uid` para consistência. |
| `name`     | string | Não         | Nome do comprador (para pré-preenchimento no MP e para vincular depois). |
| `whatsapp` | string | Não         | WhatsApp do comprador (para suporte e para vincular ao perfil depois). |

\* Regra de negócio: **pelo menos um** de `uid` ou `email` deve ser enviado. Se `uid` estiver presente, o backend pode usar o e-mail do perfil do usuário ou o `email` enviado no body.

**Resposta (sucesso):**

```json
{
  "init_point": "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=..."
}
```

**Comportamento esperado no backend:**

1. **Quando recebe `uid`:**
   - Comportamento atual: criar a preference do Mercado Pago associada ao usuário (se já fizer isso).
   - Pode continuar gravando o pagamento/compra no Firestore (ou onde armazena) pelo `uid`.

2. **Quando recebe apenas `email` (sem `uid`):**
   - Criar a preference do Mercado Pago normalmente.
   - Enviar no payload do Mercado Pago o `payer.email` (e, se possível, `payer.name`) para pré-preencher o checkout.
   - **Guardar** de alguma forma o `email` (e, se tiver, `name`, `whatsapp`) junto com o `preference_id` e/ou com o `payment_id` quando o webhook/retorno do MP informar. Ex.: coleção/tabela `pending_purchases` ou campo em documento por `preference_id`.
   - Objetivo: quando o usuário criar conta no site/app com esse mesmo e-mail, o backend (ou um job) possa **vincular** a compra ao novo `uid` (ex.: atualizar documento de billing/orders com o `uid` do Firebase).

3. **Webhook / notificações MP:**
   - Ao receber confirmação de pagamento (status aprovado), atualizar o estado da compra.
   - Se tiver armazenado compra por `email` (sem `uid`), ao vincular depois por e-mail ao criar conta, o usuário passa a ter acesso ao conteúdo no app.

4. **URLs de retorno (`back_urls`):**
   - Manter (ou configurar) as URLs que o front usa:
     - Sucesso: `https://seu-dominio.com/success` (ou `/obrigado`)
     - Pendente: `https://seu-dominio.com/pending`
     - Falha: `https://seu-dominio.com/failure`
   - Parâmetros que o Mercado Pago envia na volta (query string) e que o front já usa: `status`, `payment_id` ou `collection_id`, `preference_id`, `status_detail` (em failure).

---

## Resumo das tarefas para o backend

1. **Alterar `create-preference`:**
   - Aceitar body com `productId` (obrigatório) e **ou** `uid` **ou** `email` (pelo menos um dos dois).
   - Aceitar opcionalmente `name` e `whatsapp`.
   - Se não houver `uid`, usar `email` (e nome/WhatsApp se enviados) para criar a preference e para gravar uma “compra pendente de vínculo” (por e-mail).

2. **Persistência:**
   - Ao criar preference sem `uid`, salvar `email`, `preference_id` e, quando o MP notificar, `payment_id` e status, para depois vincular ao `uid` quando o usuário se cadastrar com esse e-mail.

3. **Vínculo pós-cadastro:**
   - Quando o usuário criar conta no front (Firebase Auth) com um e-mail que já tem compra aprovada (guardada por e-mail), o backend (ou processo que você definir) deve associar essa compra ao novo `uid` (ex.: atualizar billing/orders no Firestore ou no seu banco), para que o app mobile conceda acesso ao conteúdo.

4. **Mercado Pago:**
   - Enviar `payer.email` (e `payer.name` se tiver) na preference quando disponível, para melhorar a experiência no checkout.
   - Manter `back_urls` apontando para `/success`, `/pending` e `/failure` (e `/obrigado` se quiser igual a success).

5. **(Opcional) API de status para o front:**
   - Se quiser que o front confirme o pagamento antes de disparar evento de conversão (Meta Pixel Purchase), pode expor um endpoint tipo `GET /payment-status?payment_id=...` que retorne `{ status: "approved" | "pending" | "rejected" }` para o front chamar na página de sucesso.

---

## Exemplos de request

**Checkout com usuário logado (comportamento atual):**

```json
{
  "productId": "definicao_total",
  "uid": "firebase-uid-abc123",
  "email": "cliente@email.com",
  "name": "Maria Silva",
  "whatsapp": "(11) 99999-9999"
}
```

**Checkout sem login (novo fluxo):**

```json
{
  "productId": "hipertrofia_feminina",
  "email": "cliente@email.com",
  "name": "Maria Silva",
  "whatsapp": "(11) 99999-9999"
}
```

Em ambos os casos a resposta deve ser `{ "init_point": "https://..." }`.

---

Entregue:

- Alterações no código do backend com comentários onde fizer sentido.
- Documentação breve do novo contrato do `create-preference` (ou atualize a existente).
- Se usar Firestore/banco, descreva como está armazenando compras “pendentes de vínculo” por e-mail e como faz o vínculo quando o usuário se cadastra.
