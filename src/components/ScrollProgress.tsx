import { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 
        ? (scrollTop / scrollableHeight) * 100 
        : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', calculateScrollProgress, { passive: true });
    calculateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 bg-background/20 z-50"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progresso de leitura da página"
    >
      <div
        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
