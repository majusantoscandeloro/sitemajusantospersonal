import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up' | 'slide-left' | 'scale-in';
  delay?: number;
}

const AnimatedSection = ({ 
  children, 
  className = '',
  animation = 'fade-in',
  delay = 0 
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasIntersected) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasIntersected]);

  const animationClasses = {
    'fade-in': hasIntersected ? 'animate-fade-in opacity-100' : 'opacity-0',
    'slide-up': hasIntersected ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    'slide-left': hasIntersected ? 'animate-slide-in-left opacity-100 translate-x-0' : 'opacity-0 -translate-x-8',
    'scale-in': hasIntersected ? 'animate-scale-in opacity-100 scale-100' : 'opacity-0 scale-95',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        animationClasses[animation],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
