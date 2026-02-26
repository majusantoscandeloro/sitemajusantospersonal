/**
 * Inicializa o Meta Pixel (Facebook) se VITE_META_PIXEL_ID estiver definido no .env.
 * Os eventos (ViewContent, InitiateCheckout, Purchase) são disparados por src/lib/pixel.ts.
 */
import { useEffect } from 'react';

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

export function PixelInit() {
  useEffect(() => {
    if (!PIXEL_ID || typeof document === 'undefined') return;

    const s = document.createElement('script');
    s.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(s);
  }, []);

  return null;
}
