import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { linksSiteConfig } from '../siteConfig';

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    const shareData = {
      title: linksSiteConfig.share.title,
      text: linksSiteConfig.share.text,
      url,
    };

    try {
      if (typeof navigator.share === 'function') {
        await navigator.share(shareData);
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-xs font-medium text-[#c9785c] shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[#a85c43] active:scale-95"
      aria-label="Compartilhar página"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
          Link copiado!
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5" strokeWidth={2.2} />
          Compartilhar
        </>
      )}
    </button>
  );
}
