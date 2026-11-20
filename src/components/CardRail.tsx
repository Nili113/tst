import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { SectionHeader } from './SectionHeader';

/** Section with a horizontal row of cards. It never moves on its own: the arrow buttons scroll it one card at a time. */
export const CardRail: React.FC<{
  id: string;
  lang: Language;
  label: string;
  title: string;
  lede: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, lang, label, title, lede, className = '', children }) => {
  const ne = lang === 'ne';
  const rail = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const check = () => {
    const el = rail.current;
    if (el) setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(() => {
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const move = (dir: number) => {
    const el = rail.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: 'smooth' });
  };

  return (
    <section id={id} className={`py-16 sm:py-24 font-sans overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label={label} title={title} lede={lede}>
          <div className="flex items-center gap-2 shrink-0">
            <button type="button" onClick={() => move(-1)} disabled={edge.start} className="rail-btn" aria-label={ne ? 'अघिल्लो' : 'Previous'}>
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => move(1)} disabled={edge.end} className="rail-btn" aria-label={ne ? 'अर्को' : 'Next'}>
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </SectionHeader>

        <div ref={rail} onScroll={check} className="hide-scrollbar flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pt-1 pb-4">
          {children}
        </div>
      </div>
    </section>
  );
};
