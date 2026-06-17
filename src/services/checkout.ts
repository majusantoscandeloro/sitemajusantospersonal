/** Base URL do backend (Render) — também usada em `/pending` para consultar status real do pagamento. */
export const MP_BACKEND_URL = 'https://mp-backend-r1ec.onrender.com';

// Controle de cooldown para evitar disparos repetidos de /health
// (ex.: vários hovers no botão "Comprar agora" em poucos segundos).
let lastWakeUpAt = 0;
const WAKE_UP_COOLDOWN_MS = 30_000;
const WAKE_UP_TIMEOUT_MS = 30_000;

/**
 * Faz um GET silencioso em `/health` para "acordar" o backend hospedado no
 * Render (free tier), que entra em sleep após inatividade. Deve ser chamada
 * de forma preventiva (ao carregar a página de checkout e ao passar o mouse
 * sobre o botão de pagamento) para reduzir o tempo de espera até o redirect
 * ao Mercado Pago.
 *
 * Garantias:
 * - Nunca lança erro (try/catch interno).
 * - Não bloqueia a UI (fire-and-forget).
 * - Não exibe nada para o usuário em caso de falha.
 * - Possui cooldown para evitar requisições redundantes.
 */
export async function wakeUpBackend(): Promise<void> {
  const now = Date.now();
  if (now - lastWakeUpAt < WAKE_UP_COOLDOWN_MS) {
    return;
  }
  lastWakeUpAt = now;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), WAKE_UP_TIMEOUT_MS);

    await fetch(`${MP_BACKEND_URL}/health`, {
      method: 'GET',
      signal: controller.signal,
      cache: 'no-store',
      keepalive: true,
    });

    clearTimeout(timeoutId);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.log('[wakeUpBackend] backend ainda não respondeu (provável cold start):', error);
    }
  }
}

/**
 * Dados para criar preference no Mercado Pago.
 * - Com login: uid + productId (backend associa ao usuário).
 * - Sem login: email + productId (opcional: name, whatsapp); backend gera preference e pode vincular depois pelo email.
 */
export interface ProductCheckoutData {
  productId: string; // ID do produto em snake_case (obrigatório)
  uid?: string; // ID do usuário autenticado (opcional; quando presente, fluxo logado)
  email?: string; // Email do comprador (obrigatório quando sem uid)
  name?: string;
  whatsapp?: string;
  /**
   * Nome legível do produto (ex.: "Definição Total"). Repassado pelo
   * backend ao webhook do n8n/WhatsApp para exibir o produto comprado.
   * Resolvido no frontend a partir de `productId` via
   * `getProductDisplayName` (ver `src/lib/products.ts`).
   */
  produtoNome?: string;
  /** Nome do acompanhante (ex.: inscrição em dupla no Wellness Experience). */
  companionName?: string;
}

export interface CreatePreferenceResponse {
  init_point: string;
}

/**
 * Função para obter mensagem de erro amigável
 */
function getErrorMessage(error: unknown, status?: number): string {
  if (status === 400) {
    return 'Dados inválidos. Verifique as informações e tente novamente.';
  }
  if (status === 401) {
    return 'Não autorizado. Por favor, faça login novamente.';
  }
  if (status === 404) {
    return 'Serviço não encontrado. Tente novamente mais tarde.';
  }
  if (status === 500) {
    return 'Erro no servidor. Nossa equipe foi notificada. Tente novamente em alguns instantes.';
  }
  if (status && status >= 500) {
    return 'Erro no servidor. Por favor, tente novamente mais tarde.';
  }
  if (error instanceof Error) {
    // Mensagens de rede
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return 'Erro de conexão. Verifique sua internet e tente novamente.';
    }
    return error.message;
  }
  return 'Erro ao processar compra. Tente novamente mais tarde.';
}

/**
 * Cria preference no Mercado Pago e redireciona para o checkout.
 * Aceita fluxo com usuário logado (uid + productId) ou sem login (email + productId).
 *
 * @param productData - productId obrigatório; uid OU email (e opcionalmente name, whatsapp)
 * @returns Promise que resolve quando o redirecionamento é feito
 * @throws Error se a requisição falhar
 */
export async function comprarProduto(productData: ProductCheckoutData): Promise<void> {
  try {
    if (!productData.productId) {
      throw new Error('Produto não identificado. Por favor, tente novamente.');
    }

    // Exige uid (logado) OU email (checkout sem cadastro)
    const hasAuth = !!productData.uid;
    const hasEmail = !!productData.email?.trim();
    if (!hasAuth && !hasEmail) {
      throw new Error('Informe seu e-mail para continuar.');
    }

    const requestBody: Record<string, unknown> = {
      productId: productData.productId,
    };
    if (productData.uid) requestBody.uid = productData.uid;
    if (productData.email) requestBody.email = productData.email.trim();
    if (productData.name) requestBody.name = productData.name.trim();
    if (productData.whatsapp) requestBody.whatsapp = productData.whatsapp.trim();
    if (productData.produtoNome) requestBody.produtoNome = productData.produtoNome.trim();
    if (productData.companionName) requestBody.companionName = productData.companionName.trim();

    const response = await fetch(`${MP_BACKEND_URL}/create-preference`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      let errorMessage = '';
      let errorCode = '';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || '';
        errorCode = errorData.code || '';
      } catch {
        const errorText = await response.text();
        errorMessage = errorText || '';
      }

      if (response.status === 409 && errorCode === 'WELLNESS_CAPACITY_FULL') {
        throw new Error(
          errorMessage || 'Vagas esgotadas para o Wellness Experience. Tente novamente mais tarde.',
        );
      }
      
      const friendlyMessage = getErrorMessage(errorMessage, response.status);
      throw new Error(friendlyMessage);
    }

    const data: CreatePreferenceResponse = await response.json();

    if (!data.init_point) {
      throw new Error('Resposta inválida do servidor. Tente novamente.');
    }

    // Redirecionar para o checkout do Mercado Pago (produção)
    window.location.href = data.init_point;
  } catch (error) {
    console.error('Erro ao processar compra:', error);
    const friendlyMessage = getErrorMessage(error);
    
    // Usar alert para mensagens de erro amigáveis
    alert(friendlyMessage);
    throw error;
  }
}
