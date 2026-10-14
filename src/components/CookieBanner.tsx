import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '@/config/site';
import { getConsent, setConsent, subscribeConsent } from '@/lib/consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(() => getConsent() === null);

  useEffect(() => subscribeConsent((choice) => setVisible(choice === null)), []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-[#EBE3DE] bg-[#F5F0ED] px-4 py-4 shadow-[0_-8px_24px_rgba(23,23,23,0.06)]"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <p id="cookie-banner-title" className="text-sm font-semibold text-[#171717]">
            Cookies de medição
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#343131]">
            O carrinho e o pagamento funcionam sem cookies extras. Se você aceitar, o site usa Meta Pixel
            e Google Analytics para medir visitas e anúncios.{' '}
            <Link to={PATHS.privacy} className="font-semibold text-[#C15847] underline-offset-2 hover:underline">
              Política de privacidade
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="min-h-[44px] rounded-lg border border-[#171717]/15 px-4 text-sm font-semibold text-[#171717]"
            onClick={() => setConsent('rejected')}
          >
            Recusar
          </button>
          <button
            type="button"
            className="min-h-[44px] rounded-lg bg-[#C15847] px-4 text-sm font-semibold text-white"
            onClick={() => setConsent('accepted')}
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
