# Prompt para a IA do app — Ajustar `firestore.rules`

> Cole este prompt na IA que mexe no app Flutter (projeto `apponfit`). Ela deve fazer **duas tarefas** com cuidado: (1) garantir que a regra de `myPrograms` está publicada; (2) auditar e corrigir a regra catch-all que está deixando o banco aberto.

---

## Contexto

Você é desenvolvedor sênior responsável pelas **regras de segurança do Firestore** do projeto `apponfit` (app Flutter Majunity GO / OnFit).

Olhei as regras atuais que estão publicadas em produção no Firebase Console e detectei **dois pontos** que precisam de atenção:

### Ponto 1 — Regra de `myPrograms` ainda não está publicada

Quando você implementou múltiplos programas por aluno (Opção A: backend espelha em `users/{uid}/myPrograms/{productId}`), você editou o arquivo local `firestore.rules`, mas a regra **não está** no Firebase Console.

A regra que precisa existir é:

```
match /users/{uid}/myPrograms/{productId} {
  allow read: if request.auth != null && request.auth.uid == uid;
  allow write: if false;
}
```

### Ponto 2 — Catch-all está liberando tudo

No final das regras atuais existe:

```
match /{document=**} {
  allow read, write: if request.auth != null;
}
```

Isso significa que **qualquer usuário autenticado lê/escreve qualquer documento** do Firestore. Como Firestore avalia rules com lógica de OR (qualquer regra que permita libera o acesso), essa catch-all está anulando boa parte das restrições mais específicas acima:

- A regra `match /purchases/{paymentId} { allow read, write: if false; }` é **ignorada** — qualquer usuário logado lê `purchases`.
- A regra `match /users/{uid}` que bloqueia mexer em `paid`/`expiresAt` é **ignorada**.
- Qualquer aluno pode ler dados de outro aluno (`alunos/`, `anamneses/`, `parq/`, `treinos_realizados/`, etc.).

Hoje isso não está sendo explorado porque o app não tenta acessar dados de outros usuários, mas é uma brecha real: alguém com acesso ao Firebase SDK no DevTools pode ler tudo.

---

## Tarefas

### Tarefa 1 — Publicar a regra de `myPrograms`

1. Abra o arquivo `firestore.rules` no projeto.
2. Confirme que dentro do bloco `service cloud.firestore { match /databases/{database}/documents { ... } }` existe:

```
match /users/{uid}/myPrograms/{productId} {
  allow read: if request.auth != null && request.auth.uid == uid;
  allow write: if false;
}
```

Coloque essa regra **logo abaixo** do bloco `match /users/{uid} { ... }` existente, mas **antes** do catch-all final.

3. Publique:

```bash
firebase deploy --only firestore:rules --project apponfit
```

4. Confirme no Firebase Console (Firestore → Regras) que a regra está lá.

### Tarefa 2 — Auditar e corrigir a catch-all

**Plano em 4 passos.** Não pule nenhum — risco de quebrar o app inteiro.

#### 2.1 Inventário de coleções

Liste **todas** as coleções e subcoleções que o app Flutter e o painel admin acessam hoje. Procure no código por:

- `FirebaseFirestore.instance.collection('...')`
- `.collection('...')` dentro de subcoleções
- `collectionGroup('...')`

Para cada coleção, anote:
- Nome.
- Quem lê (aluno, personal, admin Maju, ninguém).
- Quem escreve.
- Se já tem regra explícita ou se depende da catch-all.

Coleções que eu **já identifiquei** e têm regras explícitas (manter como estão):

`pre_cadastros`, `usuarios_personal`, `alunos`, `avaliacoes_parq`, `anamneses`, `treinos_realizados`, `exercicios`, `programas_treino`, `biblioteca_treinos`, `treinos_praia`, `treinos_hotel`, `treinos_outros`, `acessos_treino_praia`, `acessos_treino_hotel`, `acessos_treino_outros`, `parceiros`, `notificacoes`, `fcm_tokens`, `treinos_corrida`, `acessos_treino_corrida`, `feedbacks_treino` (collectionGroup), `users`, `purchases`, `site_templates`, `products`, `configuracoes`.

**Pergunta importante:** o código do app acessa alguma coleção que **não** está nessa lista? Se sim, precisa criar regra explícita antes de fechar a catch-all.

#### 2.2 Mapear as subcoleções dentro de `alunos/{email}/`

Pelo que vi, o app materializa programas em `alunos/{email}/programas_treino/{productId}` (via `site_program_materializer.dart`). Confirme:

- Quais subcoleções existem em `alunos/{email}/`?
- Cada uma precisa de regra própria? (Recomendado.)

Provavelmente algo como:

```
match /alunos/{alunoEmail}/programas_treino/{programaId} {
  allow read, write: if request.auth != null && request.auth.token.email == alunoEmail;
}

match /alunos/{alunoEmail}/programas_treino/{programaId}/rotinas/{rotinaId} {
  allow read, write: if request.auth != null && request.auth.token.email == alunoEmail;
}

match /alunos/{alunoEmail}/programas_treino/{programaId}/rotinas/{rotinaId}/exercicios/{exId} {
  allow read, write: if request.auth != null && request.auth.token.email == alunoEmail;
}
```

(Ajuste conforme a chave real — pode ser `uid` em vez de `email`.)

#### 2.3 Substituir a catch-all por deny-default

Quando tiver certeza de que todas as coleções têm regras explícitas, troque:

```
match /{document=**} {
  allow read, write: if request.auth != null;   // ❌ catch-all permissiva
}
```

por:

```
match /{document=**} {
  allow read, write: if false;                  // ✅ deny-default
}
```

#### 2.4 Testar antes de publicar (obrigatório)

Use o emulador de Firestore para testar tudo:

```bash
firebase emulators:start --only firestore
```

Importe um snapshot de produção (se possível) ou crie dados de teste:
- 1 aluno logado lendo o **próprio** `users/{uid}`, `users/{uid}/myPrograms`, `alunos/{email}/programas_treino` → deve passar.
- 1 aluno tentando ler **outro** `users/{outroUid}` → deve falhar.
- 1 aluno tentando ler `purchases/{paymentId}` → deve falhar.
- 1 personal (`usuarios_personal/{email}`) lendo seus próprios alunos → deve passar.
- 1 admin (`majuscandeloro@outlook.com`) escrevendo em `site_templates/{productId}` → deve passar.
- Qualquer não-autenticado → deve falhar em tudo (exceto `configuracoes/app_version` se aplicar).

**Se algum teste essencial falhar**, ajuste a regra correspondente e teste de novo. **NÃO publique no produção** sem todos passarem.

---

## Como entregar

1. **Diff** completo do `firestore.rules` final (do estado atual no Console para o estado seguro proposto).
2. **Tabela** com o inventário de coleções (nome, quem lê, quem escreve, regra correspondente).
3. **Log** dos testes feitos no emulador (quais cenários, quais passaram, quais falharam).
4. **Confirmação** de deploy: `firebase deploy --only firestore:rules --project apponfit` retornou sucesso.

---

## Regras de segurança (não faça)

- **Não publique** diretamente em produção sem testar no emulador.
- **Não remova** regras existentes sem antes confirmar que o app tem uma rota equivalente.
- **Não amplie** acesso (ex.: `allow read: if true`) em coleções com dados sensíveis (`users`, `purchases`, `anamneses`, `avaliacoes_parq`).
- **Não toque** em coleções do personal trainer (`usuarios_personal`, `alunos`, `treinos_*`, `feedbacks_treino`, `parceiros`) sem absoluta certeza — fluxo já funciona em produção.

---

## Pergunta final que você deve responder ao usuário

Depois de implementar:

1. A regra de `myPrograms` foi publicada? (Sim/Não + screenshot do Console.)
2. Inventário de coleções está completo? Faltou alguma que apareceu no código?
3. A catch-all foi substituída por `if false`?
4. Lista dos testes no emulador.
5. Houve quebra em alguma tela do app após o deploy? Como foi resolvido?
