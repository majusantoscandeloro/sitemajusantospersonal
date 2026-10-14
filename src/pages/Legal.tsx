import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import { PATHS, SITE_NAME, WHATSAPP_URL } from '@/config/site';
import { clearConsent } from '@/lib/consent';
import { titleWithBrand } from '@/lib/seo';

function LegalShell({
  title,
  description,
  path,
  children,
}: {
  title: string;
  description: string;
  path: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead title={titleWithBrand(title)} description={description} path={path} />
      <Header />
      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#743B38]">Maju Santos</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-[#171717] md:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-[#6F6A68]">Atualizado em 14 de outubro de 2026.</p>
        <div className="mt-8 space-y-8 text-sm leading-relaxed text-[#343131] md:text-base">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-[#171717]">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export function PrivacyPage() {
  return (
    <LegalShell
      title="Política de privacidade"
      description="Como a Maju Santos trata nome, e-mail, WhatsApp e dados de navegação na compra de programas e na consultoria."
      path={PATHS.privacy}
    >
      <Section title="Quem é a responsável">
        <p>
          {SITE_NAME}, personal trainer, é a responsável pelos dados coletados neste site. O contato para
          privacidade é o{' '}
          <a className="font-semibold text-[#C15847]" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            WhatsApp oficial
          </a>
          .
        </p>
      </Section>
      <Section title="Dados que o site coleta">
        <p>Na compra ou na inscrição de evento: nome, e-mail e WhatsApp. Se você cria conta, também a senha, guardada pelo Firebase Authentication, e o identificador da conta.</p>
        <p>O pagamento acontece no Mercado Pago. Este site não recebe nem armazena número de cartão.</p>
        <p>No seu navegador ficam o carrinho, os dados digitados no checkout até a conclusão e, se você aceitar, a escolha de cookies. Isso fica no armazenamento local do aparelho.</p>
        <p>Se você aceitar cookies de medição, Meta Pixel e Google Analytics recebem páginas visitadas, identificador do anúncio (quando a URL traz fbclid ou gclid) e eventos de produto, checkout e compra.</p>
      </Section>
      <Section title="Para que usamos">
        <p>Liberar o programa no Majunity GO com o e-mail da compra, confirmar o pedido no WhatsApp, operar o pagamento e responder um pedido seu. A medição de anúncio só roda depois do aceite no aviso de cookies.</p>
      </Section>
      <Section title="Com quem compartilhamos">
        <p>Firebase (Google) para conta e perfil. Mercado Pago para a cobrança. O fluxo de confirmação pode enviar nome, e-mail, WhatsApp e nome do produto para a mensagem de WhatsApp do pedido. Meta e Google Analytics só entram se você aceitar os cookies de medição.</p>
        <p>Não vendemos esses dados.</p>
      </Section>
      <Section title="Seus direitos">
        <p>Você pode pedir acesso, correção ou exclusão dos dados de conta e perfil pelo WhatsApp oficial, com o e-mail usado na compra. A recusa dos cookies de medição não impede comprar.</p>
        <p>
          <button type="button" className="font-semibold text-[#C15847]" onClick={() => { clearConsent(); window.location.reload(); }}>
            Alterar a escolha de cookies
          </button>
        </p>
      </Section>
      <Section title="Páginas relacionadas">
        <p>
          <Link className="font-semibold text-[#C15847]" to={PATHS.terms}>
            Termos de uso
          </Link>
        </p>
      </Section>
    </LegalShell>
  );
}

export function TermsPage() {
  return (
    <LegalShell
      title="Termos de uso"
      description="Condições de compra dos programas de treino, da consultoria e dos eventos da Maju Santos."
      path={PATHS.terms}
    >
      <Section title="O que você está comprando">
        <p>Programa pronto: treino digital liberado no aplicativo Majunity GO para a conta do mesmo e-mail usado no pagamento. Consultoria VIP: acompanhamento individual, com pré-cadastro em fluxo próprio, diferente do programa pronto. Evento: vaga presencial, sujeita à lotação informada na página.</p>
      </Section>
      <Section title="Pagamento">
        <p>A cobrança é feita pelo Mercado Pago, um programa por pagamento. O valor exibido no checkout é o valor da preferência enviada. PIX pode exigir que você volte pelo botão da loja no Mercado Pago para ver o status neste site.</p>
      </Section>
      <Section title="Acesso">
        <p>A liberação do programa depende da confirmação do pagamento e do e-mail informado. Se esse e-mail já tiver conta no Majunity GO, entre com ela. Criar outra conta com outro e-mail não transfere a compra.</p>
      </Section>
      <Section title="Saúde">
        <p>O conteúdo é orientação de treino. Não substitui avaliação médica, fisioterapêutica ou nutricional. Interrompa o exercício e procure atendimento se sentir dor aguda, tontura ou mal-estar.</p>
      </Section>
      <Section title="Conta e conduta">
        <p>O acesso é pessoal. Não compartilhe login nem redistribua o material dos programas. Podemos encerrar o acesso em caso de uso indevido, fraude no pagamento ou chargeback sem contato prévio.</p>
      </Section>
      <Section title="Contato">
        <p>
          Dúvidas sobre pedido, acesso ou evento:{' '}
          <a className="font-semibold text-[#C15847]" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            WhatsApp oficial
          </a>
          . Leia também a{' '}
          <Link className="font-semibold text-[#C15847]" to={PATHS.privacy}>
            política de privacidade
          </Link>
          .
        </p>
      </Section>
    </LegalShell>
  );
}
