import React, { useEffect, useRef, useState } from 'react';

type State = 'closed' | 'opening' | 'open' | 'closing';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Accessible animated dialog: Escape and backdrop close, scroll lock,
 * focus moves in and returns. Bottom sheet on phones, centred card above.
 */
export const Modal: React.FC<ModalProps> = ({ open, onClose, labelledBy, className = '', children }) => {
  const [state, setState] = useState<State>(open ? 'open' : 'closed');
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement;
      setState('opening');
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setState('open')));
      return () => cancelAnimationFrame(raf);
    }
    setState((s) => (s === 'closed' ? 'closed' : 'closing'));
    const t = window.setTimeout(() => setState('closed'), 180);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prev = { overflow: document.body.style.overflow, pr: document.body.style.paddingRight };
    document.body.style.overflow = 'hidden';
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    const focusT = window.setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>('[data-autofocus], input, select, textarea');
      (first ?? panelRef.current)?.focus({ preventScroll: true });
    }, 60);
    return () => {
      window.clearTimeout(focusT);
      document.body.style.overflow = prev.overflow;
      document.body.style.paddingRight = prev.pr;
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (state === 'closed') return null;

  return (
    <div
      data-state={state === 'opening' ? 'closed' : state}
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-6"
    >
      <div
        className="modal-backdrop absolute inset-0 bg-[#1c1917]/60 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={`modal-panel relative w-full bg-white shadow-[0_24px_60px_-20px_rgba(28,25,23,0.45)] rounded-t-[22px] sm:rounded-[22px] max-h-[92vh] overflow-y-auto overscroll-contain focus:outline-none ${className}`}
      >
        <div className="sm:hidden mx-auto mt-2.5 h-1 w-10 rounded-full bg-stone-200" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
};
