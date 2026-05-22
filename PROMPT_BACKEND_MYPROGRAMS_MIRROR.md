# Prompt para o Backend – Espelhar compras em `users/{uid}/myPrograms/{productId}`

> Cole este prompt no chat da IA que mexe no backend (`mp-backend-r1ec.onrender.com`), ou envie para o(a) dev responsável.

---

## Contexto

- Site: React + Vercel.
- App Flutter (`apponfit`): aluno acessa os programas comprados em "Meus Programas".
- Backend Node atual: ao confirmar pagamento do Mercado Pago, grava `users/{uid}` (resumo) e `purchases/{paymentId}` (histórico).

**Problema:** o app não pode ler `purchases/` por regras de segurança (`allow read, write: if false`) — e mantemos assim de propósito. Mas o aluno precisa enxergar **todos** os programas que comprou, não só o último.

**Solução:** no mesmo webhook que processa pagamento aprovado, gravar um **espelho** em `users/{uid}/myPrograms/{productId}`. Essa subcoleção tem regra de leitura para o próprio dono e escrita só pelo Admin SDK — exatamente o que a gente precisa.

---

## Tarefa

Você é desenvolvedor sênior Node.js mantendo o backend `mp-backend-r1ec.onrender.com` (Mercado Pago + Firebase Admin SDK).

Adicione um **terceiro write** no fluxo que confirma pagamento aprovado, gravando o espelho em `users/{uid}/myPrograms/{productId}`.

### Onde mexer

No mesmo handler/função que hoje, ao receber `status === "approved"`:
1. Atualiza `users/{uid}` com `paid: true`, `productId`, `lastPaymentId`, `expiresAt`.
2. Atualiza `purchases/{paymentId}` com `status: "approved"`.

Adicione, logo depois, um **terceiro write idempotente**:

```js
// productId vem do body original do create-preference (snake_case, ex.: "definicao_total")
// uid: do doc de purchases (pode ser o uid do token original ou vinculado depois via link-purchases-by-email)
// expiresAtTimestamp: o mesmo Timestamp que você gravou em users/{uid}.expiresAt
// paymentId: id do pagamento do MP
// durationDays: o mesmo usado para calcular expiresAt (default 90 para programas, 30/90 para consultorias)

await admin
  .firestore()
  .collection('users')
  .doc(uid)
  .collection('myPrograms')
  .doc(productId)
  .set(
    {
      productId,
      status: 'approved',
      expiresAt: expiresAtTimestamp,
      paymentId,
      durationDays,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
```

### Regras importantes

- **ID do documento = `productId` em snake_case** (mesma chave usada em `site_templates/{productId}`).
  Ex.: `users/abc123/myPrograms/definicao_total`.
- Use `set(..., { merge: true })` para que **renovações** do mesmo produto apenas atualizem `expiresAt` no doc existente, sem criar duplicidade.
- **Não precisa criar regra extra** no Firestore — a regra que permite o aluno ler `users/{uid}/myPrograms/{productId}` já está publicada (escrita continua bloqueada para o cliente, só Admin SDK).

### Também atualizar `link-purchases-by-email`

No endpoint `POST /link-purchases-by-email` que vincula compras guest ao aluno depois do cadastro: ao varrer `purchases` onde `email == X` e fazer o merge em `users/{uid}`, **espelhe também** cada uma em `users/{uid}/myPrograms/{purchase.productId}` (mesmo payload acima). Assim, quem comprou sem login e depois criou conta também passa a aparecer no app.

### Job de retroativo (opcional, mas recomendado)

Para alunos que já compraram antes deste deploy aparecerem no app, rode uma vez um script:

```js
const purchasesSnap = await admin.firestore()
  .collection('purchases')
  .where('status', '==', 'approved')
  .get();

for (const doc of purchasesSnap.docs) {
  const p = doc.data();
  if (!p.uid || !p.productId) continue;

  await admin.firestore()
    .collection('users').doc(p.uid)
    .collection('myPrograms').doc(p.productId)
    .set({
      productId: p.productId,
      status: 'approved',
      expiresAt: p.expiresAt,
      paymentId: doc.id,
      durationDays: p.durationDays ?? null,
      createdAt: p.createdAt ?? admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
}
console.log(`Espelhados ${purchasesSnap.size} purchases em users/{uid}/myPrograms`);
```

Pode rodar uma vez via `node scripts/backfill-myprograms.js` ou um endpoint admin protegido.

---

## Lista oficial de `productId` (já no Firestore em `site_templates/`)

Programas de treino:

`definicao_total`, `hipertrofia_feminina`, `hipertrofia_feminina_quadriceps`, `hipertrofia_feminina_superiores`, `treino_em_casa_express`, `start_inicial`, `lipedema`, `em_casa_sem_equipamento`, `abdominal_slim`, `definicao_feminina`, `casa_completo`, `treino_de_20_minutos`, `hiit_sem_equipamento`, `alongamento_e_flexibilidade`, `desafio_21_dias`, `desafio_30_dias`.

Consultorias (não passam por checkout — ficam só como contato via WhatsApp no site):

`consultoria_mensal`, `consultoria_trimestral`.

---

## Compatibilidade

- Se você publicar isso, o app passa a listar **todos** os programas comprados em tempo real.
- Se ainda não publicar, **não há regressão**: o app cai no fallback em `users/{uid}.productId` e mostra o último programa (comportamento que já existia antes).

---

## Entregue

- Diff do handler do webhook MP (e do `link-purchases-by-email`) com o write em `myPrograms`.
- Script de backfill (se for fazer o retroativo).
- Confirmação de que rodou um teste manual com uma compra real ou simulada.
