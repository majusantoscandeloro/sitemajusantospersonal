# Configuração do Firebase

Para que a autenticação funcione, você precisa configurar o Firebase no projeto.

## Passos para configurar:

1. **Criar um projeto no Firebase Console**
   - Acesse https://console.firebase.google.com/
   - Crie um novo projeto ou use um existente
   - Ative o Authentication (Email/Password)

2. **Obter as credenciais do Firebase**
   - No Firebase Console, vá em Project Settings (ícone de engrenagem)
   - Role até "Your apps" e clique em "Web" (ícone `</>`)
   - Copie as credenciais do Firebase

3. **Configurar variáveis de ambiente**
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione as seguintes variáveis:

```env
VITE_FIREBASE_API_KEY=sua-api-key
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-project-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=seu-app-id
```

4. **Habilitar Authentication no Firebase**
   - No Firebase Console, vá em Authentication
   - Clique em "Get started"
   - Vá na aba "Sign-in method"
   - Habilite "Email/Password"

## Nota de Segurança

⚠️ **IMPORTANTE**: As credenciais do Firebase são públicas no frontend, mas isso é normal e seguro. O Firebase usa regras de segurança no backend para proteger seus dados.

## Alternativa: Configuração direta no código

Se preferir não usar variáveis de ambiente, você pode editar diretamente o arquivo `src/lib/firebase.ts` e substituir os valores padrão pelas suas credenciais.
