import { useCallback } from 'react';

/**
 * Hook para scroll suave até um elemento
 */
export const useSmoothScroll = () => {
  const scrollTo = useCallback((elementId: string, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return { scrollTo };
};
