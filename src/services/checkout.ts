const BACKEND_URL = 'https://mp-backend-r1ec.onrender.com';

export interface ProductCheckoutData {
  uid: string; // ID do usuário autenticado
  productId: string; // ID do produto em snake_case
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
 * Função genérica para comprar um produto via Mercado Pago Checkout Pro
 * 
 * @param productData - Dados do produto (uid, productId)
 * @returns Promise que resolve quando o redirecionamento é feito
 * @throws Error se a requisição falhar
 */
export async function comprarProduto(productData: ProductCheckoutData): Promise<void> {
  try {
    // Validar dados obrigatórios
    if (!productData.uid) {
      throw new Error('Usuário não autenticado. Por favor, faça login.');
    }
    
    if (!productData.productId) {
      throw new Error('Produto não identificado. Por favor, tente novamente.');
    }

    // Enviar apenas uid e productId
    const requestBody = {
      uid: productData.uid,
      productId: productData.productId,
    };

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
