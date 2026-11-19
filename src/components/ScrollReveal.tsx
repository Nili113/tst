import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  as?: 'div' | 'section' | 'li' | 'article';
}

const OFFSETS: Record<NonNullable<ScrollRevealProps['direction']>, [string, string]> = {
  up: ['0px', '22px'],
  down: ['0px', '-22px'],
  left: ['22px', '0px'],
  right: ['-22px', '0px'],
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  as = 'div',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [rx, ry] = OFFSETS[direction];
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      data-visible={isVisible}
      style={{ '--d': `${delay}ms`, '--rx': rx, '--ry': ry } as React.CSSProperties}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
};

export const ScrollProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? Math.min(Math.max(window.scrollY / total, 0), 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none" aria-hidden="true">
      <div ref={barRef} className="h-full bg-maroon origin-left" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
};
