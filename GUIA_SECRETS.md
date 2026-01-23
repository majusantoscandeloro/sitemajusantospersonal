# 🔐 Guia Passo a Passo: Obter e Configurar Secrets

Este guia mostra **exatamente** como obter os 3 secrets e adicioná-los no GitHub.

---

## 📝 PARTE 1: Obter os 3 Secrets

### 🔑 1. Obter VERCEL_TOKEN

1. **Acesse**: [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Ou: Vercel Dashboard → Settings → Tokens

2. **Clique em**: "Create Token" (botão no topo)

3. **Preencha**:
   - **Name**: `GitHub Actions Deploy` (ou qualquer nome que você quiser)
   - **Scope**: Selecione **"Full"** ou apenas **"Deploy"** (recomendado: Deploy)
   - **Expiration**: Deixe "No expiration" ou escolha uma data

4. **Clique em**: "Create"

5. **⚠️ IMPORTANTE**: Copie o token **AGORA**! Você só verá ele uma vez.
   - O token será algo como: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Salve em um lugar seguro** (bloco de notas, password manager, etc.)

✅ **Você tem o VERCEL_TOKEN!**

---

### 🏢 2. Obter VERCEL_ORG_ID

Você tem **3 opções** (escolha a mais fácil):

#### **Opção A: Via Dashboard (Mais Fácil)**

1. **Acesse**: [https://vercel.com/account](https://vercel.com/account)
2. **Olhe na URL** do navegador:
   - Se for time: `https://vercel.com/teams/SEU_ORG_ID/...`
   - Se for usuário: `https://vercel.com/user/SEU_ORG_ID/...`
3. **Ou abra o código-fonte da página** (F12 → Elements):
   - Procure por `team_` ou `user_`
   - O ID será algo como: `team_xxxxxxxxxxxxx` ou `user_xxxxxxxxxxxxx`

#### **Opção B: Via CLI (Recomendado)**

```bash
# 1. Instale a Vercel CLI (se ainda não tiver)
npm install -g vercel

# 2. Faça login
vercel login

# 3. Liste suas organizações/teams
vercel teams ls

# 4. O output mostrará algo como:
# ┌─────────────────────────────────────┐
# │ team_abc123xyz (Nome do Time)       │
# └─────────────────────────────────────┘
# 
# O "team_abc123xyz" é o seu ORG_ID
```

#### **Opção C: Via API (Avançado)**

```bash
# Use o token que você criou
curl -H "Authorization: Bearer SEU_VERCEL_TOKEN" https://api.vercel.com/v2/teams

# O output será JSON com os teams e seus IDs
```

✅ **Você tem o VERCEL_ORG_ID!** (formato: `team_xxx` ou `user_xxx`)

---

### 📦 3. Obter VERCEL_PROJECT_ID

Você tem **3 opções** (escolha a mais fácil):

#### **Opção A: Via Dashboard (Mais Fácil)**

1. **Acesse seu projeto** na Vercel Dashboard
2. **Vá em**: Settings (ícone de engrenagem no topo)
3. **Clique em**: "General" (menu lateral)
4. **Role a página até**: "Project ID"
5. **Copie o ID** (formato: `prj_xxxxxxxxxxxxx`)

#### **Opção B: Via CLI (Recomendado)**

```bash
# 1. Navegue até a pasta do seu projeto
cd d:\sites\majusantos-main\majusantos-main

# 2. Execute (se ainda não linkou o projeto)
vercel link

# 3. Siga as instruções:
#   - Selecione o scope (team ou user)
#   - Selecione o projeto
#   - Escolha se quer sobrescrever (Y/N)

# 4. Após linkar, veja o arquivo criado:
cat .vercel/project.json
# ou no Windows:
type .vercel\project.json

# 5. O output será algo como:
# {
#   "orgId": "team_abc123",
#   "projectId": "prj_xyz789"
# }
# 
# O "projectId" é o seu VERCEL_PROJECT_ID
```

#### **Opção C: Via API (Avançado)**

```bash
# Use o token e org_id que você já tem
curl -H "Authorization: Bearer SEU_VERCEL_TOKEN" \
  "https://api.vercel.com/v9/projects?teamId=SEU_ORG_ID"

# O output será JSON com todos os projetos e seus IDs
# Procure pelo nome do seu projeto e copie o "id"
```

✅ **Você tem o VERCEL_PROJECT_ID!** (formato: `prj_xxx`)

---

## 📝 PARTE 2: Adicionar Secrets no GitHub

### 🚀 Passo a Passo Completo

1. **Acesse seu repositório no GitHub**
   - Vá para: `https://github.com/SEU_USUARIO/SEU_REPOSITORIO`

2. **Clique em**: "Settings" (aba no topo do repositório)
   - ⚠️ Você precisa ter permissão de **admin** no repositório

3. **No menu lateral esquerdo**, role até:
   - **"Secrets and variables"**
   - Clique em **"Actions"**

4. **Você verá a página de Secrets**
   - Clique no botão **"New repository secret"** (canto superior direito)

5. **Adicione cada secret um por vez**:

   #### Secret 1: VERCEL_TOKEN
   - **Name**: `VERCEL_TOKEN`
   - **Secret**: Cole o token que você copiou da Vercel
   - **Clique em**: "Add secret"

   #### Secret 2: VERCEL_ORG_ID
   - **Name**: `VERCEL_ORG_ID`
   - **Secret**: Cole o ORG_ID (ex: `team_abc123xyz` ou `user_abc123xyz`)
   - **Clique em**: "Add secret"

   #### Secret 3: VERCEL_PROJECT_ID
   - **Name**: `VERCEL_PROJECT_ID`
   - **Secret**: Cole o PROJECT_ID (ex: `prj_xyz789abc`)
   - **Clique em**: "Add secret"

6. **Verifique se os 3 secrets aparecem na lista**:
   - ✅ `VERCEL_TOKEN`
   - ✅ `VERCEL_ORG_ID`
   - ✅ `VERCEL_PROJECT_ID`

✅ **Pronto! Os secrets estão configurados!**

---

## 🎯 Resumo Rápido

### O que você precisa:

| Secret | Onde obter | Formato |
|--------|------------|---------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) | `xxxxxxxxxxxxx` |
| `VERCEL_ORG_ID` | Dashboard ou `vercel teams ls` | `team_xxx` ou `user_xxx` |
| `VERCEL_PROJECT_ID` | Settings do projeto ou `vercel link` | `prj_xxx` |

### Onde adicionar:

1. GitHub → Seu Repositório → **Settings**
2. **Secrets and variables** → **Actions**
3. **New repository secret** (3 vezes, uma para cada)

---

## 🔍 Verificação Rápida

### Teste se os secrets estão corretos:

```bash
# No terminal, na pasta do projeto:
vercel login
vercel link

# Se funcionar, você conseguiu linkar o projeto
# Isso significa que seus IDs estão corretos
```

### Teste o token:

```bash
# Teste se o token funciona
curl -H "Authorization: Bearer SEU_VERCEL_TOKEN" \
  "https://api.vercel.com/v2/user"

# Se retornar dados do usuário, o token está correto
```

---

## ⚠️ Dicas Importantes

1. **Token expira?**
   - Se você escolheu "No expiration", não expira
   - Se escolheu uma data, precisará renovar antes de expirar

2. **Não consegue ver Settings no GitHub?**
   - Você precisa ser **owner** ou ter permissão de **admin** no repositório
   - Peça para o dono do repositório adicionar os secrets

3. **Secrets são seguros?**
   - ✅ Sim! GitHub nunca mostra os valores dos secrets
   - ✅ Eles são mascarados automaticamente nos logs
   - ✅ Apenas workflows podem acessá-los

4. **Posso editar um secret?**
   - Sim! Clique no secret na lista e depois em "Update"
   - Ou delete e crie um novo

5. **E se eu perder o token?**
   - Não tem problema! Delete o token antigo na Vercel
   - Crie um novo token
   - Atualize o secret no GitHub

---

## ✅ Checklist Final

- [ ] VERCEL_TOKEN criado e copiado
- [ ] VERCEL_ORG_ID obtido (via dashboard ou CLI)
- [ ] VERCEL_PROJECT_ID obtido (via dashboard ou CLI)
- [ ] Todos os 3 secrets adicionados no GitHub
- [ ] Secrets aparecem na lista do GitHub
- [ ] Pronto para fazer deploy! 🚀

---

## 🆘 Precisa de Ajuda?

Se tiver dúvidas em algum passo, consulte:
- **Documentação completa**: `VERCEL_DEPLOY_SETUP.md`
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Actions Docs**: [docs.github.com/en/actions](https://docs.github.com/en/actions)
