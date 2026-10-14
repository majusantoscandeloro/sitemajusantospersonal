export type ConsentChoice = 'accepted' | 'rejected';

const STORAGE_KEY = 'maju-santos-consent';
const EVENT_NAME = 'maju-consent-change';

export function getConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === 'accepted' || value === 'rejected') return value;
  } catch {
    // storage indisponível
  }
  return null;
}

export function setConsent(choice: ConsentChoice): void {
  localStorage.setItem(STORAGE_KEY, choice);
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function clearConsent(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function subscribeConsent(listener: (choice: ConsentChoice | null) => void): () => void {
  const handler = () => listener(getConsent());
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
