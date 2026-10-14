import { describe, expect, it } from 'vitest';
import { toSingleCartLine } from '@/lib/cartItems';
import { centsToReais, trackPurchase } from '@/lib/pixel';
import { isApprovedMpStatus } from '@/services/paymentStatus';

describe('preço do pixel em reais', () => {
  it('converte centavos inteiros sem inflar o valor', () => {
    expect(centsToReais(6990)).toBe(69.9);
    expect(centsToReais(4000)).toBe(40);
  });

  it('não envia compra com valor zero', () => {
    expect(centsToReais(0)).toBe(0);
    expect(centsToReais(Number.NaN)).toBe(0);
    expect(trackPurchase(0, 'pedido-1')).toBe(false);
  });
});

describe('carrinho de um programa', () => {
  it('mantém o último item quando havia mais de um', () => {
    const result = toSingleCartLine([
      { product: { id: 'a' }, quantity: 1 },
      { product: { id: 'b' }, quantity: 1 },
    ]);
    expect(result.collapsed).toBe(true);
    expect(result.lines).toEqual([{ product: { id: 'b' }, quantity: 1 }]);
  });

  it('não marca colapso quando já existe um item', () => {
    const result = toSingleCartLine([{ product: { id: 'a' }, quantity: 3 }]);
    expect(result.collapsed).toBe(false);
    expect(result.lines[0].quantity).toBe(1);
  });
});

describe('status de pagamento', () => {
  it('trata approved, authorized e APRO como pago', () => {
    expect(isApprovedMpStatus('approved')).toBe(true);
    expect(isApprovedMpStatus('APRO')).toBe(true);
    expect(isApprovedMpStatus('authorized')).toBe(true);
  });

  it('não trata vazio ou pendente como pago', () => {
    expect(isApprovedMpStatus('')).toBe(false);
    expect(isApprovedMpStatus(null)).toBe(false);
    expect(isApprovedMpStatus('pending')).toBe(false);
  });
});
