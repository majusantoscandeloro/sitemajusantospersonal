/**
 * Google Analytics 4 (opcional).
 * Ative com VITE_GA_MEASUREMENT_ID=G-XXXXXXXX no .env / Vercel.
 * Não interfere no Meta Pixel.
 *
 * Deve ficar DENTRO do BrowserRouter (usa useLocation).
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function ensureGtag(measurementId: string) {
  if (typeof window === 'undefined' || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

function trackPageView(path: string) {
  if (!GA_ID || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function AnalyticsRoutes() {
  const location = useLocation();
  const lastPath = useRef<string>('');

  useEffect(() => {
    if (!GA_ID) return;
    ensureGtag(GA_ID);
    const path = `${location.pathname}${location.search}`;
    if (path === lastPath.current) return;
    lastPath.current = path;
    trackPageView(path);
  }, [location.pathname, location.search]);

  return null;
}

export default AnalyticsRoutes;
