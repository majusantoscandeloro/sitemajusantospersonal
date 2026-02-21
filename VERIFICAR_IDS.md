# 🔍 Verificar IDs após vercel link

Após completar o `vercel link`, execute estes comandos para ver os IDs:

## 1. Ver PROJECT_ID e ORG_ID

```bash
# Ver o arquivo gerado pelo vercel link
type .vercel\project.json
```

O output será algo como:
```json
{
  "orgId": "team_abc123xyz",
  "projectId": "prj_xyz789abc"
}
```

## 2. Verificar se está correto

- **ORG_ID**: O valor de `orgId` (formato: `team_xxx` ou `user_xxx`)
- **PROJECT_ID**: O valor de `projectId` (formato: `prj_xxx`)

## 3. Comparar com os secrets no GitHub

1. Vá em GitHub → Settings → Secrets → Actions
2. Verifique se:
   - `VERCEL_ORG_ID` = valor de `orgId` do arquivo
   - `VERCEL_PROJECT_ID` = valor de `projectId` do arquivo

Se estiverem diferentes, atualize os secrets no GitHub!
