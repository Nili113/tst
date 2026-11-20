import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ShieldCheck, Milestone, Trophy, HeartHandshake, BadgeCheck, Expand, LucideIcon } from 'lucide-react';
import { completedWorksData } from '../data/portfolioData';
import { workPhotos } from '../data/workPhotos';
import { Language } from '../types';
import { SectionHeader } from './SectionHeader';
import { WorkArt, hasArt } from './WorkArt';
import { PhotoViewer } from './PhotoViewer';
import { smoothScrollTo } from '../lib/smoothScroll';

const ICONS: Record<string, LucideIcon> = { ShieldCheck, Milestone, Trophy, HeartHandshake };
const NE_DIGITS = '०१२३४५६७८९';

interface Photo {
  src: string;
  captionEn?: string;
  captionNe?: string;
}

/**
 * Story timeline, in chapters: chapter i holds the stage for t ∈ [i, i + HOLD],
 * then hands over to the next one during the remaining (1 − HOLD) of a chapter.
 */
const HOLD = 0.62;
const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
/** Smooth in/out so hand-overs start and finish gently (scrubbed, so it reverses exactly). */
const ease = (n: number) => n * n * (3 - 2 * n);

/**
 * Key Works as a pinned scroll story. The whole panel (text + stage) stays centred on screen;
 * scrolling scrubs a single timeline `t`, so every transition moves with the reader, frame by
 * frame, and plays backwards when they scroll up. Styles are written straight to the DOM each
 * frame; React only re-renders when the chapter number changes.
 */
export const WorksStory: React.FC<{ lang: Language }> = ({ lang }) => {
  const ne = lang === 'ne';
  const num = (n: number) => {
    const s = String(n).padStart(2, '0');
    return ne ? s.replace(/\d/g, (d) => NE_DIGITS[+d]) : s;
  };
  const works = completedWorksData;
  const N = works.length;
  const photos = useMemo(
    () => works.map((w) => (workPhotos[w.id] ?? []).map((e) => (typeof e === 'string' ? { src: e } : e)) as Photo[]),
    [works]
  );

  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const shotRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const panel = panelRef.current;
    if (!track || !panel) return;
    const layers = [...panel.querySelectorAll<HTMLElement>('.ws-layer')];
    const texts = [...panel.querySelectorAll<HTMLElement>('.ws-text')];
    const segs = [...panel.querySelectorAll<HTMLElement>('.ws-seg')];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let lastActive = -1;

    const update = () => {
      frame = 0;
      const r = track.getBoundingClientRect();
      const pinTop = parseFloat(getComputedStyle(panel).top) || 0;
      const travel = Math.max(r.height - panel.offsetHeight, 1);
      const p = clamp01((pinTop - r.top) / travel);
      const t = p * N; // 0 → N across the pinned scroll

      // enter[i]: 0 → 1 while chapter i takes over from i − 1. Chapter 0 is always in.
      const enter = works.map((_, i) => (i === 0 ? 1 : ease(clamp01((t - (i - 1) - HOLD) / (1 - HOLD)))));
      const exit = works.map((_, i) => enter[i + 1] ?? 0);

      layers.forEach((el, i) => {
        const e = reduce.matches ? (i === Math.min(N - 1, Math.floor(t)) ? 1 : 0) : enter[i];
        el.style.setProperty('--e', e.toFixed(4));
        el.style.setProperty('--x', exit[i].toFixed(4));
        el.dataset.live = e > 0.001 && exit[i] < 0.999 ? 'true' : 'false';
        // Frames inside a chapter (its illustration, then its photos) advance with the scroll:
        // they start while the chapter is still wiping in and finish at the end of its hold.
        const frames = el.querySelectorAll<HTMLElement>('.ws-frame');
        if (frames.length) {
          // Frames only start once the chapter has fully arrived on the stage.
          const start = i;
          // The illustration gets an extra beat on screen before the first photo arrives.
          const art = el.querySelector('.ws-frame--art') ? 1 : 0;
          const lead = art ? 1.5 : 0; // the illustration holds for a good beat before the first photo
          const q = clamp01((t - start) / (i + HOLD - start)) * (frames.length + lead) - lead;
          frames.forEach((fr, k) => {
            // wide, eased cross-fade: frame k arrives over the half-step before its slot
            fr.style.setProperty('--w', k === 0 ? '1' : ease(clamp01((q - k) / 0.55 + 1)).toFixed(4));
            // slow scrubbed push-in across the frame's time on screen
            fr.style.setProperty('--z', clamp01((q - k + 0.55) / 1.6).toFixed(4));
          });
          // The illustration knows how far the first photo has opened, so it can zoom away through it.
          if (art && frames[1]) frames[0].style.setProperty('--n', frames[1].style.getPropertyValue('--w') || '0');
          if (i === lastActive) shotRef.current = Math.max(0, Math.min(frames.length - 1, Math.floor(q)) - art);
        }
      });
      texts.forEach((el, i) => {
        el.style.setProperty('--e', enter[i].toFixed(4));
        el.style.setProperty('--x', exit[i].toFixed(4));
        el.style.visibility = enter[i] < 0.001 || exit[i] > 0.999 ? 'hidden' : 'visible';
      });
      segs.forEach((el, i) => el.style.setProperty('--f', clamp01(t - i).toFixed(4)));

      // Label/counter flip at the midpoint of a hand-over, when the stage is half revealed.
      const a = Math.min(N - 1, Math.max(0, Math.floor(t + (1 - HOLD) / 2)));
      if (a !== lastActive) {
        lastActive = a;
        setActive(a);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [N, works]);

  /** Jump to the middle of a chapter's hold window. */
  const goTo = (i: number) => {
    const track = trackRef.current;
    const panel = panelRef.current;
    if (!track || !panel) return;
    const pinTop = parseFloat(getComputedStyle(panel).top) || 0;
    const travel = track.offsetHeight - panel.offsetHeight;
    const top = track.getBoundingClientRect().top + window.scrollY - pinTop + ((i + HOLD * 0.4) / N) * travel;
    smoothScrollTo(top);
  };

  const activePhotos = photos[active];
  const caption = (p: Photo) => (ne ? p.captionNe ?? p.captionEn : p.captionEn ?? p.captionNe);
  const ActiveIcon = ICONS[works[active].iconName] ?? ShieldCheck;

  return (
    <section id="works" className="pt-16 sm:pt-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          className="!mb-0"
          label={ne ? 'कार्यसम्पादन तथा परिणाम' : 'Public record & impact'}
          title={ne ? 'हालसम्म सम्पन्न भएका मुख्य कामहरू' : 'Key Works Done Till Now'}
          lede={
            ne
              ? 'कार्यालय समयको अनुशासनदेखि अन्तर-पालिका पूर्वाधार, रक्तदान अभियान र प्रतिष्ठित झापा गोल्डकप फुटबलको संरक्षकत्वसम्मका मुख्य पहलहरू।'
              : 'From pioneering municipal punctuality to inter-ward drainage, community blood drives, and football tournament patronage.'
          }
        />
      </div>

      {/* The track is tall; the panel inside it stays pinned while the reader scrolls through it. */}
      <div ref={trackRef} className="ws-track relative" style={{ '--n': N } as React.CSSProperties}>
        <div ref={panelRef} className="ws-panel">
          <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="ws-grid h-full">
              {/* ── Stage ── */}
              <div className="ws-stage relative overflow-hidden rounded-[22px] sm:rounded-[28px] bg-maroon-deep shadow-[0_40px_80px_-44px_rgba(110,27,43,0.8)]">
                {works.map((w, i) => (
                  <div key={w.id} className="ws-layer absolute inset-0" data-live={i === 0} aria-hidden={i !== active}>
                    <div className="ws-layer-inner absolute inset-0">
                      {/* Frame 0 is the chapter's illustration (when it has one); its photos follow. */}
                      {hasArt(w.id) && (
                        <div className="ws-frame ws-frame--art absolute inset-0">
                          <WorkArt id={w.id} active />
                        </div>
                      )}
                      {photos[i].map((p) => (
                        <img
                          key={p.src}
                          src={p.src}
                          alt={i === active ? caption(p) ?? (ne ? w.titleNe : w.titleEn) : ''}
                          className="ws-frame ws-photo absolute inset-0 w-full h-full object-cover"
                          loading={i === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          draggable={false}
                        />
                      ))}
                    </div>
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_top,rgba(40,8,14,0.5),transparent_34%),linear-gradient(to_bottom,rgba(40,8,14,0.28),transparent_22%)]" />
                  </div>
                ))}

                <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4 sm:p-5">
                  <span key={active} className="ws-chip inline-flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-md border border-white/15 pl-1.5 pr-3.5 py-1.5 text-[12.5px] font-semibold text-white">
                    <span className="grid place-items-center w-7 h-7 rounded-full bg-white text-maroon">
                      <ActiveIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                    {ne ? works[active].subtitleNe : works[active].subtitleEn}
                  </span>
                  {activePhotos.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setViewer(shotRef.current)}
                      className="grid place-items-center w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/15 text-white hover:bg-black/45 transition-colors"
                      aria-label={ne ? 'फोटो ठूलो गरी हेर्नुहोस्' : 'View photos full screen'}
                    >
                      <Expand className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
                <p className="absolute right-4 bottom-4 sm:right-5 sm:bottom-5 z-10 font-extrabold tracking-tight tabular-nums leading-none text-white">
                  <span key={active} className="ws-count inline-block text-[34px] sm:text-[44px]">{num(active + 1)}</span>
                  <span className="text-[13px] sm:text-[14px] text-white/60"> / {num(N)}</span>
                </p>
              </div>

              {/* ── Text: every chapter shares one cell and cross-fades in place ── */}
              <div className="ws-copy flex flex-col justify-center min-h-0">
                <div className="grid">
                  {works.map((w, i) => (
                    <article key={w.id} className="ws-text [grid-area:1/1]" aria-hidden={i !== active}>
                      <p className="ws-line flex items-center gap-3 text-[13px] font-semibold text-maroon" style={{ '--j': 0 } as React.CSSProperties}>
                        <span className="tabular-nums">{num(i + 1)}</span>
                        <span className="h-px w-6 bg-current opacity-40" />
                        {ne ? w.subtitleNe : w.subtitleEn}
                      </p>
                      <h3 className="ws-line mt-3 text-[22px] sm:text-[30px] lg:text-[36px] font-extrabold leading-[1.12] tracking-[-0.025em] text-ink" style={{ '--j': 1 } as React.CSSProperties}>
                        {ne ? w.titleNe : w.titleEn}
                      </h3>
                      <p className="ws-line mt-3 lg:mt-4 text-[14.5px] sm:text-[16px] lg:text-[17px] leading-[1.65] lg:leading-[1.7] text-stone-600 max-w-[34rem]" style={{ '--j': 2 } as React.CSSProperties}>
                        {ne ? w.descriptionNe : w.descriptionEn}
                      </p>
                      <div className="ws-line mt-4 lg:mt-6 inline-flex items-center gap-3 rounded-2xl border border-stone-200 bg-ivory-section pl-3 pr-4 py-2.5 lg:py-3" style={{ '--j': 3 } as React.CSSProperties}>
                        <span className="grid place-items-center w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-white border border-stone-200 text-maroon">
                          <BadgeCheck className="w-[18px] h-[18px]" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-[14px] lg:text-[15px] font-bold text-ink leading-tight">{ne ? w.metricsNe : w.metricsEn}</span>
                          <span className="block text-[12px] lg:text-[12.5px] text-stone-500 mt-0.5">{ne ? 'प्रमाणित विवरण' : 'Verified record'}</span>
                        </span>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Chapter rail: each segment fills as its chapter is read; click to jump */}
                <div className="mt-6 lg:mt-12 grid gap-2" style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}>
                  {works.map((w, i) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === active ? 'step' : undefined}
                      aria-label={`${num(i + 1)} ${ne ? w.titleNe : w.titleEn}`}
                      className="group text-left py-3 lg:py-2 min-h-[44px] lg:min-h-0"
                    >
                      <span className="ws-seg relative block h-[3px] rounded-full bg-stone-200 overflow-hidden">
                        <span className="ws-seg-fill absolute inset-0 rounded-full bg-maroon origin-left" />
                      </span>
                      <span className={`hidden lg:block mt-2.5 text-[12px] font-semibold tabular-nums transition-colors ${i === active ? 'text-ink' : 'text-stone-400 group-hover:text-stone-600'}`}>
                        {num(i + 1)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewer !== null && activePhotos.length > 0 && (
        <PhotoViewer
          photos={activePhotos.map((p) => ({ src: p.src, caption: caption(p) }))}
          start={Math.min(viewer, activePhotos.length - 1)}
          title={ne ? works[active].titleNe : works[active].titleEn}
          lang={lang}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
};
