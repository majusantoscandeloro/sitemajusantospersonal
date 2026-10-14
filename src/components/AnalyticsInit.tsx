/**
 * Google Analytics 4 e Meta Pixel, só depois do aceite de cookies.
 * Deve ficar DENTRO do BrowserRouter (usa useLocation).
 */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { captureAttributionFromLocation } from '@/lib/attribution';
import { getConsent, subscribeConsent, type ConsentChoice } from '@/lib/consent';
import { ensureMetaPixel, trackPixelPageView } from '@/lib/pixel';

const GA_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim() || undefined;
const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim() || undefined;

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
  const [consent, setConsent] = useState<ConsentChoice | null>(() => getConsent());

  useEffect(() => subscribeConsent(setConsent), []);

  useEffect(() => {
    captureAttributionFromLocation(location.search);
  }, [location.search]);

  useEffect(() => {
    if (consent !== 'accepted') return;
    if (PIXEL_ID) ensureMetaPixel(PIXEL_ID);
    if (GA_ID) ensureGtag(GA_ID);
    const path = `${location.pathname}${location.search}`;
    trackPageView(path);
    trackPixelPageView();
  }, [consent, location.pathname, location.search]);

  return null;
}

export default AnalyticsRoutes;
