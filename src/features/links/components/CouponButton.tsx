import { useState, type MouseEvent } from 'react';
import { TicketPercent, Check } from 'lucide-react';

interface CouponButtonProps {
  coupon: string;
  tone?: 'light' | 'dark';
  className?: string;
}

export function CouponButton({
  coupon,
  tone = 'light',
  className = '',
}: CouponButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    try {
      await navigator.clipboard.writeText(coupon);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = coupon;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  const styles =
    tone === 'dark'
      ? 'border-white/70 text-white hover:bg-white/10'
      : 'border-[#c9785c]/70 text-[#a85c43] hover:bg-[#c9785c]/5';

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 sm:text-sm ${styles} ${className}`}
      aria-label={`Copiar cupom ${coupon}`}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
          Cupom copiado!
        </>
      ) : (
        <>
          <TicketPercent className="h-3.5 w-3.5" strokeWidth={2} />
          {coupon}
        </>
      )}
    </button>
  );
}
