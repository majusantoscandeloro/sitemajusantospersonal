# 🚀 Configuração de Deploy Automático na Vercel

Este guia explica como configurar o deploy automático do projeto na Vercel usando GitHub Actions.

## 📋 Pré-requisitos

- Conta na Vercel
- Repositório no GitHub
- Acesso de administrador ao repositório

---

## 1️⃣ Integração GitHub ↔ Vercel (Git Integration)

### Passo a passo:

1. **Acesse o Dashboard da Vercel**
   - Vá para [vercel.com](https://vercel.com) e faça login

2. **Conecte o Repositório**
   - Clique em **"Add New Project"** ou **"Import Project"**
   - Selecione **"Import Git Repository"**
   - Escolha seu repositório GitHub
   - Autorize a Vercel a acessar seu GitHub (se necessário)

3. **Configure o Projeto**
   - **Framework Preset**: Vite (ou detectar automaticamente)
   - **Root Directory**: `./` (raiz do projeto)
   - **Build Command**: `npm run build` (já configurado no package.json)
   - **Output Directory**: `dist` (padrão do Vite)
   - **Install Command**: `npm install`

4. **Configure a Branch de Produção**
   - Em **"Production Branch"**, defina: `main`
   - Isso garante que apenas pushes na `main` façam deploy de produção

5. **Configure Environment Variables**
   - Vá em **Settings → Environment Variables**
   - Adicione todas as variáveis necessárias:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`
     - Qualquer outra variável que seu projeto precise

6. **IMPORTANTE**: Após conectar, você pode **desabilitar o deploy automático da Vercel** (opcional), pois o GitHub Actions fará isso. Mas não é necessário - ambos podem coexistir.

---

## 2️⃣ Obter Secrets para GitHub Actions

Você precisa de 3 secrets para o workflow funcionar:

### 🔑 VERCEL_TOKEN

1. Acesse [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Clique em **"Create Token"**
3. Dê um nome (ex: "GitHub Actions Deploy")
4. Selecione **"Full Scope"** ou apenas **"Deploy"** (recomendado)
5. Clique em **"Create"**
6. **Copie o token** (você só verá ele uma vez!)

### 🏢 VERCEL_ORG_ID

**Opção 1: Via Dashboard**
1. Acesse [vercel.com/account](https://vercel.com/account)
2. Na URL ou no código-fonte da página, você verá algo como: `team_xxxxx` ou `user_xxxxx`
3. Esse é o seu ORG_ID

**Opção 2: Via CLI**
```bash
# Instale a Vercel CLI globalmente
npm install -g vercel

# Faça login
vercel login

# Liste suas organizações
vercel teams ls

# Ou execute este comando para ver o ID:
vercel whoami
```

**Opção 3: Via API**
```bash
curl -H "Authorization: Bearer SEU_TOKEN" https://api.vercel.com/v2/teams
```

### 📦 VERCEL_PROJECT_ID

**Opção 1: Via Dashboard**
1. Acesse seu projeto na Vercel
2. Vá em **Settings → General**
3. Role até **"Project ID"**
4. Copie o ID (formato: `prj_xxxxx`)

**Opção 2: Via CLI**
```bash
# No diretório do projeto
vercel link

# Isso criará um arquivo .vercel/project.json com o PROJECT_ID
cat .vercel/project.json
```

**Opção 3: Via API**
```bash
curl -H "Authorization: Bearer SEU_TOKEN" \
  "https://api.vercel.com/v9/projects?teamId=SEU_ORG_ID"
```

---

## 3️⃣ Configurar Secrets no GitHub

1. **Acesse seu repositório no GitHub**
2. Vá em **Settings → Secrets and variables → Actions**
3. Clique em **"New repository secret"**
4. Adicione os 3 secrets:

   | Name | Value |
   |------|-------|
   | `VERCEL_TOKEN` | Token criado na Vercel |
   | `VERCEL_ORG_ID` | ID da organização/usuário (formato: `team_xxx` ou `user_xxx`) |
   | `VERCEL_PROJECT_ID` | ID do projeto (formato: `prj_xxx`) |

5. Clique em **"Add secret"** para cada um

---

## 4️⃣ Como Funciona

### Deploy Automático

- **Push na `main`**: Dispara deploy de **produção** automaticamente
- **Pull Request**: Dispara deploy de **preview** automaticamente
- **Sem ação manual**: Tudo acontece automaticamente após o push

### Workflow do GitHub Actions

O workflow (`.github/workflows/vercel-deploy.yml`) faz:

1. ✅ Checkout do código
2. ✅ Setup do Node.js
3. ✅ Instalação de dependências (`npm ci`)
4. ✅ Build do projeto (`npm run build`)
5. ✅ Instalação da Vercel CLI
6. ✅ Pull das variáveis de ambiente da Vercel
7. ✅ Deploy na Vercel (produção ou preview)
8. ✅ Comentário no PR com URL do preview (se for PR)

---

## 5️⃣ Segurança

✅ **Secrets não são expostos nos logs**
- O GitHub Actions automaticamente mascarar valores de secrets
- O workflow usa `${{ secrets.VERCEL_TOKEN }}` que nunca aparece nos logs

✅ **Boas práticas implementadas**
- Usa `npm ci` para instalação determinística
- Cache do npm para builds mais rápidos
- Deploy apenas após build bem-sucedido

---

## 6️⃣ Troubleshooting

### Erro: "Project not found"
- Verifique se `VERCEL_PROJECT_ID` está correto
- Certifique-se de que o projeto existe na Vercel

### Erro: "Invalid token"
- Gere um novo token na Vercel
- Verifique se o token tem permissões de deploy

### Erro: "Organization not found"
- Verifique se `VERCEL_ORG_ID` está correto
- Use `team_xxx` para times ou `user_xxx` para contas pessoais

### Build falha
- Verifique se todas as variáveis de ambiente estão configuradas na Vercel
- Verifique os logs do GitHub Actions para mais detalhes

### Deploy não acontece
- Verifique se o workflow está na branch `main`
- Verifique se os secrets estão configurados corretamente
- Veja a aba "Actions" no GitHub para logs detalhados

---

## 7️⃣ Comandos Úteis

### Verificar configuração local
```bash
# Ver informações do projeto
vercel inspect

# Ver variáveis de ambiente
vercel env ls

# Ver deployments
vercel ls
```

### Testar deploy manualmente
```bash
# Build local
npm run build

# Deploy preview
vercel --prebuilt

# Deploy produção
vercel --prebuilt --prod
```

---

## ✅ Checklist Final

- [ ] Repositório conectado na Vercel
- [ ] Branch de produção = `main`
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] `VERCEL_TOKEN` criado e adicionado no GitHub
- [ ] `VERCEL_ORG_ID` obtido e adicionado no GitHub
- [ ] `VERCEL_PROJECT_ID` obtido e adicionado no GitHub
- [ ] Workflow `.github/workflows/vercel-deploy.yml` commitado
- [ ] Push na `main` testado e funcionando

---

## 📚 Referências

- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Pronto!** Após configurar tudo, cada push na `main` fará deploy automático de produção! 🎉
