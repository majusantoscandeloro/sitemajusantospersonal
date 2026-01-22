const BACKEND_URL = 'https://mp-backend-r1ec.onrender.com';

export interface ProductCheckoutData {
  title: string;
  price: number; // em centavos
  quantity?: number;
}

export interface CreatePreferenceResponse {
  init_point: string;
}

/**
 * Função genérica para comprar um produto via Mercado Pago Checkout Pro
 * 
 * @param productData - Dados do produto (title, price em centavos, quantity opcional)
 * @returns Promise que resolve quando o redirecionamento é feito
 * @throws Error se a requisição falhar
 */
export async function comprarProduto(productData: ProductCheckoutData): Promise<void> {
  try {
    // Converter price de centavos para número decimal (Mercado Pago espera decimal)
    const priceInDecimal = productData.price / 100;

    const response = await fetch(`${BACKEND_URL}/create-preference`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: productData.title,
        price: priceInDecimal,
        quantity: productData.quantity || 1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao criar preferência: ${response.status} - ${errorText}`);
    }

    const data: CreatePreferenceResponse = await response.json();

    if (!data.init_point) {
      throw new Error('Resposta do backend não contém init_point');
    }

    // Redirecionar para o checkout do Mercado Pago (produção)
    window.location.href = data.init_point;
  } catch (error) {
    console.error('Erro ao processar compra:', error);
    alert(
      error instanceof Error
        ? `Erro ao processar compra: ${error.message}`
        : 'Erro ao processar compra. Tente novamente mais tarde.'
    );
    throw error;
  }
}
