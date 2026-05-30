/**
 * Utilitários para normalizar telefones de WhatsApp em formato E.164.
 *
 * Por que isso importa:
 * - A Evolution API (e a maioria das APIs de mensageria) exige o número no
 *   formato internacional, apenas dígitos, com o DDI já incluso e sem `+`,
 *   espaços, parênteses ou hífens (ex.: `5514998836693`).
 * - O frontend coleta o número com máscara para boa UX (ex.:
 *   `(14) 99883-6693`) e o DDI em separado (ex.: `+55`). Antes de enviar
 *   para o backend / n8n, precisamos combinar e limpar para E.164.
 * - Mantemos as funções 100% agnósticas de país — qualquer DDI funciona
 *   (Brasil, Portugal, EUA, etc.), sem regras fixas hardcoded.
 *
 * Referência: https://en.wikipedia.org/wiki/E.164
 */

/** Comprimento mínimo absoluto de um número E.164 (DDI + nacional). */
const E164_MIN_TOTAL_DIGITS = 8;
/** Comprimento máximo permitido pela norma E.164. */
const E164_MAX_TOTAL_DIGITS = 15;
/** Comprimento mínimo da parte nacional (sem o DDI). */
const NATIONAL_MIN_DIGITS = 7;

/** Remove tudo que não for dígito. Aceita `null`/`undefined` com segurança. */
export function digitsOnly(value: string | undefined | null): string {
  return (value || '').replace(/\D/g, '');
}

/**
 * Combina DDI + número e devolve o E.164 apenas com dígitos
 * (sem `+`, sem espaços, sem máscara). Ex.:
 *   toE164Digits('+55', '(14) 99883-6693') => '5514998836693'
 *   toE164Digits('+351', '912 345 678')    => '351912345678'
 *
 * Retorna string vazia se o resultado não for um E.164 válido.
 */
export function toE164Digits(
  countryCode: string | undefined | null,
  whatsapp: string | undefined | null,
): string {
  const cc = digitsOnly(countryCode);
  const ph = digitsOnly(whatsapp);
  if (!cc) return '';
  if (ph.length < NATIONAL_MIN_DIGITS) return '';

  const total = `${cc}${ph}`;
  if (total.length < E164_MIN_TOTAL_DIGITS) return '';
  if (total.length > E164_MAX_TOTAL_DIGITS) return '';

  return total;
}

/**
 * Igual a {@link toE164Digits}, mas devolve com o `+` na frente
 * (ex.: `+5514998836693`). Útil para exibir/armazenar de forma canônica.
 * Retorna string vazia se o número não for válido.
 */
export function toE164(
  countryCode: string | undefined | null,
  whatsapp: string | undefined | null,
): string {
  const digits = toE164Digits(countryCode, whatsapp);
  return digits ? `+${digits}` : '';
}

/**
 * Indica se o par (DDI, número) compõe um E.164 válido segundo as regras
 * acima. Não valida o destino real do número — apenas formato/comprimento.
 */
export function isValidWhatsapp(
  countryCode: string | undefined | null,
  whatsapp: string | undefined | null,
): boolean {
  return toE164Digits(countryCode, whatsapp).length >= E164_MIN_TOTAL_DIGITS;
}
