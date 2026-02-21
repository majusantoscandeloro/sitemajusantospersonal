# 🔧 Troubleshooting: Deploy Automático Vercel

## ❌ Workflow Falhou - Como Investigar

### 1. Ver os Logs do Erro

1. **No GitHub**, clique no workflow que falhou (o que tem o ❌ vermelho)
2. **Clique no job** "deploy" (que falhou)
3. **Role até o final** dos logs para ver a mensagem de erro

### 2. Erros Comuns e Soluções

#### 🔴 Erro: "Project not found" ou "Invalid project ID"

**Causa**: `VERCEL_PROJECT_ID` incorreto ou não existe

**Solução**:
```bash
# Verificar o PROJECT_ID correto
cd d:\sites\majusantos-main\majusantos-main
vercel link
type .vercel\project.json
```

- Copie o `projectId` do arquivo
- Vá em GitHub → Settings → Secrets → Actions
- Atualize o secret `VERCEL_PROJECT_ID`

---

#### 🔴 Erro: "Invalid token" ou "Unauthorized"

**Causa**: `VERCEL_TOKEN` inválido ou expirado

**Solução**:
1. Acesse [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Delete o token antigo (se existir)
3. Crie um novo token
4. Atualize o secret `VERCEL_TOKEN` no GitHub

---

#### 🔴 Erro: "Organization not found" ou "Invalid scope"

**Causa**: `VERCEL_ORG_ID` incorreto

**Solução**:
```bash
# Verificar o ORG_ID correto
vercel teams ls
# ou
vercel whoami
```

- Use o ID que aparece (formato: `team_xxx` ou `user_xxx`)
- Atualize o secret `VERCEL_ORG_ID` no GitHub

---

#### 🔴 Erro: "Build failed" ou erro no `npm run build`

**Causa**: Erro no build do projeto (não relacionado aos secrets)

**Solução**:
1. Teste o build localmente:
   ```bash
   npm ci
   npm run build
   ```
2. Se falhar localmente, corrija os erros
3. Se funcionar localmente, pode ser variável de ambiente faltando na Vercel

---

#### 🔴 Erro: "Environment variable not found"

**Causa**: Variáveis de ambiente não configuradas na Vercel

**Solução**:
1. Acesse seu projeto na Vercel
2. Vá em **Settings → Environment Variables**
3. Adicione todas as variáveis necessárias:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

---

#### 🔴 Erro: "vercel pull" falhou

**Causa**: Problema ao baixar configuração do projeto

**Solução**:
1. Verifique se o projeto existe na Vercel
2. Verifique se os secrets estão corretos
3. Tente executar localmente:
   ```bash
   vercel pull --yes --environment=production
   ```

---

### 3. Verificar Secrets no GitHub

Certifique-se de que os 3 secrets estão configurados corretamente:

1. **GitHub** → Seu Repositório → **Settings**
2. **Secrets and variables** → **Actions**
3. Verifique se aparecem:
   - ✅ `VERCEL_TOKEN`
   - ✅ `VERCEL_ORG_ID`
   - ✅ `VERCEL_PROJECT_ID`

**Importante**: Os valores devem estar **exatamente** como você copiou:
- `VERCEL_TOKEN`: sem espaços no início/fim
- `VERCEL_ORG_ID`: formato `team_xxx` ou `user_xxx` (com o prefixo!)
- `VERCEL_PROJECT_ID`: formato `prj_xxx` (com o prefixo!)

---

### 4. Testar Secrets Localmente

Para verificar se os secrets estão corretos:

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Fazer login (vai pedir o token)
vercel login

# 3. Linkar o projeto
cd d:\sites\majusantos-main\majusantos-main
vercel link

# 4. Testar pull (simula o que o workflow faz)
vercel pull --yes --environment=production

# 5. Testar deploy
npm run build
vercel deploy --prebuilt --prod
```

Se funcionar localmente, os secrets estão corretos!

---

### 5. Re-executar o Workflow

Após corrigir os problemas:

1. **Opção A**: Faça um novo commit e push
   ```bash
   git commit --allow-empty -m "chore: re-trigger deploy"
   git push origin main
   ```

2. **Opção B**: Re-executar no GitHub
   - Vá na aba **Actions**
   - Clique no workflow que falhou
   - Clique em **"Re-run all jobs"** (botão no canto superior direito)

---

### 6. Verificar Logs Detalhados

No GitHub Actions, os logs mostram exatamente onde falhou:

1. Clique no workflow que falhou
2. Clique no job "deploy"
3. Expanda cada step para ver os detalhes
4. O step que falhou terá um ❌ ao lado

**Exemplo de log útil**:
```
Error: Project not found
  at ...
```

Isso indica qual secret está incorreto.

---

## ✅ Checklist de Verificação

Antes de re-executar, verifique:

- [ ] Os 3 secrets estão configurados no GitHub
- [ ] `VERCEL_TOKEN` é válido (não expirou)
- [ ] `VERCEL_ORG_ID` tem o formato correto (`team_xxx` ou `user_xxx`)
- [ ] `VERCEL_PROJECT_ID` tem o formato correto (`prj_xxx`)
- [ ] O projeto existe na Vercel
- [ ] Variáveis de ambiente estão configuradas na Vercel
- [ ] Build funciona localmente (`npm run build`)

---

## 🆘 Ainda com Problemas?

Se após verificar tudo ainda não funcionar:

1. **Copie a mensagem de erro completa** dos logs do GitHub Actions
2. **Verifique**:
   - Qual step falhou?
   - Qual é a mensagem de erro exata?
   - Os secrets estão visíveis na lista? (não os valores, só os nomes)

3. **Teste localmente**:
   ```bash
   npm ci
   npm run build
   vercel deploy --prebuilt --prod
   ```

Se funcionar localmente mas falhar no GitHub Actions, é problema de secrets.

---

## 📚 Recursos

- [Vercel CLI Docs](https://vercel.com/docs/cli)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
