# Prompt revisado: Checkout sem cadastro pré-pagamento (mantendo acesso ao app)

Use o texto abaixo ao solicitar as alterações. Ele já considera que **o cadastro é usado pelo cliente para acessar o aplicativo mobile**.

---

Você é um Senior Front-end Engineer (React/TypeScript) focado em conversão.

**Contexto:** Tenho um site de venda de treinos (conteúdo digital) hospedado na Vercel. O stack é **React (Vite) + React Router** — não é Next.js. Hoje existe carrinho + checkout interno que coleta Nome/Email/WhatsApp e **exige criar conta (modal de cadastro) antes de pagar**. Isso está gerando fricção.

**Importante:** O cadastro (conta Firebase + perfil com nome/email/WhatsApp) é usado pelo **cliente para acessar o aplicativo mobile**. Ou seja: não podemos exigir cadastro antes do pagamento, mas **precisamos permitir (e incentivar) que o cliente crie a conta após o pagamento** para acessar o app com o mesmo email.

**Objetivo:** Reduzir fricção no pagamento (ir direto ao Mercado Pago) e manter o fluxo de criação de conta **depois** do pagamento, para acesso ao app.

---

## Novo fluxo

1. Usuário escolhe um programa.
2. Clica em **"Comprar agora"** (pode ser direto do card/detalhes ou passar pelo carrinho simplificado).
3. Vai **direto** para o checkout do Mercado Pago (link de pagamento / preference).
4. Após pagar, volta para uma página de agradecimento no site (**/success** já existe; pode haver alias **/obrigado** se desejável).

---

## Tarefas

### 1. Remover cadastro antes do pagamento
- Remover a etapa de **"criar conta" antes do pagamento** (modal de cadastro no checkout).
- O checkout **não** deve exigir login nem abrir AuthModal para prosseguir ao pagamento.

### 2. Checkout simplificado → Mercado Pago
- Trocar o checkout interno por um CTA principal **"Comprar agora"** que:
  - Chama a API do backend para criar a **preference** do Mercado Pago.
  - Recebe a URL do checkout (**init_point**) e redireciona o usuário.
- **Backend:** Hoje a API `create-preference` recebe `uid` (Firebase) + `productId`. Para checkout sem login, a API precisa aceitar **checkout sem uid**: por exemplo `email` + `productId` (e opcionalmente nome/WhatsApp). O backend deve gerar a preference e, se possível, guardar o email do pagamento para depois vincular à conta quando o usuário se cadastrar com o mesmo email.

### 3. Dados mínimos antes de ir ao MP (opcional)
- Manter **opcional** na landing/detalhes do programa um único campo de **email** com o aviso: *"Use o mesmo e-mail para acessar o app após a compra"*. Sem exigir senha nem cadastro antes do pagamento.
- Se o backend aceitar, enviar esse email na criação da preference para pré-preencher no MP e para vincular depois à conta.

### 4. Cadastro **após** o pagamento (acesso ao app)
- Na página de sucesso (**/success** ou **/obrigado**), quando o status for **approved** (e, se possível, usuário ainda não logado):
  - Mostrar uma seção ou CTA: **"Crie sua conta para acessar o app"**.
  - Oferecer criação de conta (modal ou inline) com:
    - **Email** pré-preenchido quando houver (query param ou email usado no pagamento, se o backend devolver).
    - **Senha** (obrigatória para criar conta).
    - Nome e WhatsApp opcionais (podem ser preenchidos depois no app).
  - Ao criar a conta, usar o **AuthModal** (ou componente de signup) existente; o Firebase/backend já pode vincular a compra ao usuário pelo email.
- Manter o **AuthModal** e o **AuthContext** para login/cadastro em outros pontos do site (ex.: header "Entrar") e para uso nessa etapa pós-pagamento.

### 5. Páginas de retorno (/obrigado e /status)
- **/success**, **/pending** e **/failure** já existem. Garantir que:
  - Leiam os query params (ex.: `status`, `payment_id`, `preference_id`).
  - Mostrem mensagem adequada: "Pagamento em análise", "Pagamento aprovado", "Pagamento recusado".
- Opcional: criar **/obrigado** como alias de **/success** ou redirecionar para uma única página de agradecimento que decide o conteúdo pelo `status`.
- Se fizer sentido, ter **/status** que lê os mesmos params e exibe o status (ou redireciona para success/pending/failure).

### 6. Meta Pixel
- **ViewContent:** ao abrir detalhes do programa (modal ou página).
- **InitiateCheckout:** ao clicar em "Comprar agora".
- **Purchase:** somente na página de sucesso quando **status=approved** (e, se possível, confirmar via backend antes de disparar).

### 7. UX mobile
- Botões grandes, loading state no CTA "Comprar agora", evitar múltiplos cliques (desabilitar botão após clique até o redirecionamento).

---

## Entregas esperadas

- Alterações no código com comentários onde for relevante.
- Componentes e rotas necessárias (React Router; não Next.js).
- Manter o projeto como está em relação a Firebase Auth e perfil (AuthContext, AuthModal, profile): usar para **login** e para **cadastro pós-pagamento**, não antes do pagamento.
- Se a API do backend precisar mudar (ex.: aceitar `email` + `productId` sem `uid`), documentar o contrato esperado.

---

## Resumo do que NÃO mudar

- **AuthContext**, **AuthModal**, Firebase e perfil (Firestore): continuam sendo usados para **acesso ao app**; apenas não bloquear o pagamento.
- Rotas existentes **/success**, **/pending**, **/failure** e estrutura do **App.tsx** (React Router).
