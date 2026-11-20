import Lenis from 'lenis';

/**
 * Site-wide smooth scrolling (Lenis) for mouse wheels and trackpads.
 * - Touch keeps native scrolling: phones already glide, and hijacking touch feels laggy.
 * - Off entirely when the visitor prefers reduced motion.
 * - Lenis drives the real window scroll, so every scroll listener and `position: sticky` keeps working.
 */
let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (lenis || typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.09, // lower = silkier glide; 0.09 is smooth without feeling detached
    wheelMultiplier: 0.95,
    // Vertical wheel always scrolls the page (even over the video row); sideways trackpad swipes still scroll the row natively.
    gestureOrientation: 'vertical',
    // Let dialogs and horizontal strips scroll natively
    prevent: (node: HTMLElement) => !!node.closest?.('[role="dialog"], [data-lenis-prevent]'),
  });
}

/** Scroll the page to a y position or element, smoothly when Lenis is running. */
export function smoothScrollTo(target: number | HTMLElement, opts: { offset?: number; immediate?: boolean } = {}) {
  const offset = opts.offset ?? (typeof target === 'number' ? 0 : -72);
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate: opts.immediate, duration: opts.immediate ? undefined : 1.2 });
    return;
  }
  const y = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: y + offset, behavior: opts.immediate ? 'auto' : 'smooth' });
}

/** Freeze page scrolling while a modal is open. */
export function lockScroll(locked: boolean) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
