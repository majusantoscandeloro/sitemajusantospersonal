const BACKEND_URL = 'https://mp-backend-r1ec.onrender.com';

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

    const response = await fetch(`${BACKEND_URL}/create-preference`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      let errorMessage = '';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || '';
      } catch {
        const errorText = await response.text();
        errorMessage = errorText || '';
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
