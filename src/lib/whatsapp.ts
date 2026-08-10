/**
 * Utilitários para envio de acesso/passo a passo via WhatsApp usando o
 * recurso "Mensagem para si mesmo" do WhatsApp (wa.me apontando para o
 * próprio número do cliente). Tudo é montado no frontend; nenhum token
 * ou credencial é exposto.
 */

export interface AccessMessageInput {
  /** Código do país no formato com '+' (ex.: '+55'). Aceita também só dígitos. */
  countryCode: string;
  /** Número do WhatsApp, podendo conter máscara como '(14) 99999-9999'. */
  whatsapp: string;
  name?: string;
  email?: string;
  programTitle?: string;
  paymentId?: string;
  /** Link da Google Play (opcional). */
  playStoreUrl?: string;
  /** Link da App Store (opcional). */
  appStoreUrl?: string;
  /**
   * Telefone do suporte em formato E.164 sem '+' (ex.: '5514910117854').
   * Se informado, vira um link wa.me no final da mensagem.
   */
  supportPhone?: string;
}

const onlyDigits = (value: string): string => (value || '').replace(/\D/g, '');

/**
 * Normaliza DDI + número para o formato exigido pelo wa.me: apenas dígitos,
 * já com o código do país no início (E.164 sem o '+').
 * Retorna string vazia se algum dos campos for inválido.
 *
 * Ex.: ('+55', '(14) 99999-9999') -> '5514999999999'
 */
export function toWaMePhone(countryCode: string, whatsapp: string): string {
  const cc = onlyDigits(countryCode);
  const ph = onlyDigits(whatsapp);
  if (!cc || ph.length < 8) return '';
  return `${cc}${ph}`;
}

/**
 * Monta uma mensagem amigável com os dados de acesso e o passo a passo,
 * usando formatação leve do WhatsApp (*negrito*) e quebras de linha.
 */
export function buildAccessMessage(input: AccessMessageInput): string {
  const lines: string[] = [];
  lines.push('✅ *Acesso Maju Santos — Majunity GO*');
  lines.push('');

  if (input.programTitle) lines.push(`*Programa:* ${input.programTitle}`);
  if (input.name) lines.push(`*Nome:* ${input.name}`);
  if (input.email) lines.push(`*E-mail de acesso:* ${input.email}`);
  if (input.paymentId) lines.push(`*ID do pagamento:* ${input.paymentId}`);

  lines.push('');
  lines.push('📲 *Passo a passo para acessar:*');

  let step = 1;
  if (input.playStoreUrl) {
    lines.push(`${step}. Android: baixe o app na Google Play — ${input.playStoreUrl}`);
    step++;
  }
  if (input.appStoreUrl) {
    lines.push(`${step}. iPhone: baixe na App Store — ${input.appStoreUrl}`);
    step++;
  }
  if (!input.playStoreUrl && !input.appStoreUrl) {
    lines.push(`${step}. Peça o link do app pelo suporte (link abaixo).`);
    step++;
  }
  lines.push(
    `${step}. Abra o app e crie sua conta com o *mesmo e-mail* da compra.`,
  );
  step++;
  lines.push(`${step}. O conteúdo do seu programa aparece automaticamente.`);

  lines.push('');
  if (input.supportPhone) {
    lines.push(
      `Dúvidas? Fale com o suporte: https://wa.me/${onlyDigits(input.supportPhone)}`,
    );
  }

  return lines.join('\n');
}

/**
 * Gera o link wa.me apontando para o próprio número do cliente
 * (recurso "Mensagem para si mesmo"). Ao clicar, o WhatsApp dele abre
 * com a mensagem pronta; basta tocar em Enviar para salvar nos Recados.
 *
 * Retorna `null` se o telefone for inválido.
 */
export function buildSelfAccessLink(input: AccessMessageInput): string | null {
  const phone = toWaMePhone(input.countryCode, input.whatsapp);
  if (!phone) return null;
  const message = buildAccessMessage(input);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
