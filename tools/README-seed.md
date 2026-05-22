# Seed dos programas no Firestore

Script que cria `programs/{productId}` para todos os produtos do site, com **Semana 1** e **Treino A** de exemplo (para testar o app antes de cadastrar os treinos reais).

## 1. Credenciais (uma vez)

1. Abra [Firebase Console](https://console.firebase.google.com) → seu projeto → **Configurações** → **Contas de serviço**.
2. Clique em **Gerar nova chave privada**.
3. Salve o arquivo como:

```
tools/serviceAccountKey.json
```

> Esse arquivo está no `.gitignore` — **nunca** commite no Git.

## 2. Instalar dependência

Na raiz do projeto:

```bash
npm install
```

(O `firebase-admin` já está em `devDependencies`.)

## 3. Rodar o seed

**Todos os 16 programas de treino** (recomendado na primeira vez):

```bash
npm run seed:programs
```

**Incluir consultorias** (`consultoria_mensal`, `consultoria_trimestral`):

```bash
npm run seed:programs -- --all
```

**Só alguns programas:**

```bash
npm run seed:programs -- definicao_total start_inicial lipedema
```

**Simular sem gravar** (no Windows use este comando — o `--dry-run` via `npm run ... --` nem sempre é repassado):

```bash
npm run seed:programs:dry
```

### PowerShell (credencial por variável)

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS="D:\sites\majusantos-main\tools\serviceAccountKey.json"
npm run seed:programs
```

## 4. O que é criado no Firestore

```
programs/definicao_total
  title, description, level, durationWeeks, priceCents, type, tags, ...
  coverImage: null          ← preencher depois do Storage
  coverImagePath: "src/assets/..."  ← referência local

  weeks/semana_1
    number: 1
    title: "Semana 1 — Adaptação"

    workouts/treino_a
      day: "A"
      exercises: [ ... modelo ... ]
```

Consultorias (`--all`) criam só o documento raiz, **sem** semanas/treinos.

## 5. Subir as capas para o Firebase Storage

Depois do seed, rode o script de upload — ele pega as imagens de `src/assets/novo preset/`, sobe para o Storage e atualiza `coverImage` em cada `programs/{productId}`.

### Pré-requisitos

1. **Habilitar o Storage** no Firebase Console → **Storage** → **Começar agora** (modo produção).
2. Conferir o nome do bucket no Console (geralmente `apponfit.appspot.com` ou `apponfit.firebasestorage.app`).

### Rodar

```powershell
npm run upload:covers           # todos os programas
npm run upload:covers:dry       # simular sem subir
npm run upload:covers -- definicao_total start_inicial   # só esses
npm run upload:covers -- --all  # inclui consultorias
```

### Se o bucket não for o padrão

Em PowerShell:

```powershell
$env:FIREBASE_STORAGE_BUCKET="apponfit.firebasestorage.app"
npm run upload:covers
```

### O que acontece

Para cada programa:
1. Sobe `src/assets/novo preset/xxx.png` para `gs://apponfit.appspot.com/programs/{productId}/cover.png`
2. Torna o arquivo **público** (`makePublic`)
3. Atualiza `programs/{productId}.coverImage` com a URL: `https://storage.googleapis.com/apponfit.appspot.com/programs/definicao_total/cover.png`

## 6. Depois de tudo

1. **Treinos reais:** edite no Console ou em um painel admin as subcoleções `weeks` e `workouts`.
2. **Regras:** publique as regras em `PROMPT_APP_MULTIPLOS_PROGRAMAS.md` (seção 4).
3. **App:** use `PurchasesService` + `programs/{productId}` conforme o guia.

## Lista de `productId` criados

| productId | Título |
|-----------|--------|
| definicao_total | Definição Total |
| hipertrofia_feminina_quadriceps | Hipertrofia (Quadríceps) |
| hipertrofia_feminina | Hipertrofia (Glúteos) |
| treino_em_casa_express | Treino em Casa Express |
| start_inicial | Start Inicial |
| lipedema | Lipedema |
| em_casa_sem_equipamento | Em Casa Sem Equipamento |
| abdominal_slim | Abdominal Slim |
| definicao_feminina | Definição Feminina |
| hipertrofia_feminina_superiores | Hipertrofia (Superiores) |
| casa_completo | Casa Completo |
| treino_de_20_minutos | Treino de 20 Minutos |
| hiit_sem_equipamento | HIIT Sem Equipamento |
| alongamento_e_flexibilidade | Alongamento e Flexibilidade |
| desafio_21_dias | Desafio 21 dias |
| desafio_30_dias | Desafio 30 dias |
| consultoria_mensal | Acompanhamento Mensal |
| consultoria_trimestral | Acompanhamento Trimestral |
