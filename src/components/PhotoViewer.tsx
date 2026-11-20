import React, { useEffect, useRef, useState } from 'react';
import { lockScroll } from '../lib/smoothScroll';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

export interface ViewerPhoto {
  src: string;
  caption?: string;
}

interface PhotoViewerProps {
  photos: ViewerPhoto[];
  start: number;
  title: string;
  lang: 'ne' | 'en';
  onClose: () => void;
}

/** Full-screen photo viewer: arrows, swipe, Escape, thumbnails; focus is trapped while open. */
export const PhotoViewer: React.FC<PhotoViewerProps> = ({ photos, start, title, lang, onClose }) => {
  const ne = lang === 'ne';
  const [i, setI] = useState(start);
  const [shown, setShown] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const drag = useRef<number | null>(null);
  const n = photos.length;
  const go = (d: number) => setI((x) => (x + d + n) % n);

  useEffect(() => {
    const returnTo = document.activeElement as HTMLElement | null;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prev = { o: document.body.style.overflow, p: document.body.style.paddingRight };
    document.body.style.overflow = 'hidden';
    lockScroll(true);
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    const raf = requestAnimationFrame(() => setShown(true));
    dialogRef.current?.focus();
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prev.o;
      lockScroll(false);
      document.body.style.paddingRight = prev.p;
      returnTo?.focus?.();
    };
  }, []);

  useEffect(() => {
    const t = stripRef.current?.querySelector<HTMLElement>(`[data-i="${i}"]`);
    t?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [i]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowRight') go(1);
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'Tab') {
      const f = dialogRef.current?.querySelectorAll<HTMLElement>('button');
      if (!f?.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const p = photos[i];

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabIndex={-1}
      onKeyDown={onKey}
      data-shown={shown}
      className="pv fixed inset-0 z-[100] flex flex-col bg-[#16030a]/95 backdrop-blur-xl text-white font-sans outline-none"
    >
      <div className="flex items-center gap-4 px-4 sm:px-6 h-16 shrink-0">
        <p className="min-w-0 flex-1 truncate text-[14px] font-semibold">{title}</p>
        <span className="text-[13px] tabular-nums text-white/60">
          {i + 1} / {n}
        </span>
        <button type="button" onClick={onClose} className="wk-btn" aria-label={ne ? 'बन्द गर्नुहोस्' : 'Close'}>
          <X className="w-[18px] h-[18px]" aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative flex-1 min-h-0 select-none touch-pan-y"
        onPointerDown={(e) => (drag.current = e.clientX)}
        onPointerUp={(e) => {
          if (drag.current === null) return;
          const dx = e.clientX - drag.current;
          drag.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        <img key={p.src} src={p.src} alt={p.caption ?? ''} className="pv-img absolute inset-0 m-auto max-w-[calc(100%-2rem)] sm:max-w-[calc(100%-9rem)] max-h-full object-contain rounded-xl" draggable={false} />
        {n > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} className="wk-btn absolute left-3 sm:left-6 top-1/2 -translate-y-1/2" aria-label={ne ? 'अघिल्लो फोटो' : 'Previous photo'}>
              <ArrowLeft className="w-[18px] h-[18px]" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => go(1)} className="wk-btn wk-btn-solid absolute right-3 sm:right-6 top-1/2 -translate-y-1/2" aria-label={ne ? 'अर्को फोटो' : 'Next photo'}>
              <ArrowRight className="w-[18px] h-[18px]" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      <div className="shrink-0 px-4 sm:px-6 pt-3 pb-5">
        {p.caption && <p className="text-center text-[14px] text-white/75 mb-3">{p.caption}</p>}
        {n > 1 && (
          <div ref={stripRef} className="hide-scrollbar flex gap-2 overflow-x-auto justify-start sm:justify-center">
            {photos.map((ph, k) => (
              <button
                key={ph.src}
                type="button"
                data-i={k}
                onClick={() => setI(k)}
                aria-label={`${k + 1} / ${n}`}
                aria-current={k === i}
                className={`relative shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-[opacity,transform,box-shadow] duration-200 ${k === i ? 'opacity-100 ring-2 ring-white scale-[1.04]' : 'opacity-45 hover:opacity-80'}`}
              >
                <img src={ph.src} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
