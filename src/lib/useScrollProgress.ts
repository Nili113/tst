import { useEffect, useRef } from 'react';

type Compute = (rect: DOMRect, vh: number) => number;

const clamp = (n: number) => Math.min(Math.max(n, 0), 1);

/**
 * Writes a scroll-linked progress value (0 → 1) to the element as the CSS variable `--p`.
 * Runs on rAF, never re-renders React. With reduced motion it pins `--p` to `reducedValue`.
 */
export function useScrollProgress<T extends HTMLElement>(
  compute: Compute,
  options: { reducedValue?: number; onUpdate?: (p: number, el: T) => void } = {}
) {
  const ref = useRef<T>(null);
  const computeRef = useRef(compute);
  const optsRef = useRef(options);
  computeRef.current = compute;
  optsRef.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    let frame = 0;
    let last = -1;
    const update = () => {
      frame = 0;
      const { reducedValue = 1, onUpdate } = optsRef.current;
      const p = reduce.matches ? reducedValue : clamp(computeRef.current(el.getBoundingClientRect(), window.innerHeight));
      if (Math.abs(p - last) < 0.0005) return;
      last = p;
      el.style.setProperty('--p', p.toFixed(4));
      onUpdate?.(p, el);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduce.addEventListener?.('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduce.removeEventListener?.('change', schedule);
    };
  }, []);

  return ref;
}
