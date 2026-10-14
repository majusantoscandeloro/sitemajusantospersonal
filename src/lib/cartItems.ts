export interface CartLine {
  product?: { id?: string } | null;
  quantity?: number;
}

/**
 * O Mercado Pago deste site recebe um productId por preferência.
 * O carrinho guarda só o último programa escolhido, para o total da tela
 * ser exatamente o valor cobrado.
 */
export function toSingleCartLine<T extends CartLine>(items: T[]): {
  lines: T[];
  collapsed: boolean;
} {
  const valid = items.filter((item) => Boolean(item?.product?.id));
  if (valid.length <= 1) {
    return {
      lines: valid.map((item) => ({ ...item, quantity: 1 })),
      collapsed: false,
    };
  }
  const last = valid[valid.length - 1];
  return {
    lines: [{ ...last, quantity: 1 }],
    collapsed: true,
  };
}
