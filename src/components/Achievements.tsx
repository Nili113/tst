import React, { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { completedWorksData } from '../data/portfolioData';
import { workPhotos } from '../data/workPhotos';
import { Language } from '../types';
import { ShieldCheck, Milestone, Trophy, HeartHandshake, BadgeCheck, ArrowLeft, ArrowRight, Pause, Play, Images, LucideIcon } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';
import { WorkArt } from './WorkArt';
import { PhotoViewer } from './PhotoViewer';
import { Rich } from '../lib/typo';

interface AchievementsProps {
  lang: Language;
}

const ICONS: Record<string, LucideIcon> = { ShieldCheck, Milestone, Trophy, HeartHandshake };
const BASE_DURATION = 7000; // ms on a slide without photos
const PHOTO_MS = 3200; // ms per photo inside a slide
const MAX_DURATION = 16000;
const WIPE = 1000; // ms, matches .wk-media transition

const pad = (n: number) => String(n).padStart(2, '0');
const NE_DIGITS = '०१२३४५६७८९';
const toNe = (s: string) => s.replace(/\d/g, (d) => NE_DIGITS[+d]);

interface Photo {
  src: string;
  captionEn?: string;
  captionNe?: string;
  portrait: boolean;
}

/** Load every listed photo; keep the ones that load, in order, and note their orientation. */
function useWorkPhotos() {
  const [photos, setPhotos] = useState<Record<string, Photo[] | undefined>>({});
  useEffect(() => {
    let alive = true;
    completedWorksData.forEach((w) => {
      const list = workPhotos[w.id] ?? [];
      Promise.all(
        list.map(
          (entry) =>
            new Promise<Photo | null>((resolve) => {
              const meta = typeof entry === 'string' ? { src: entry } : entry;
              if (!meta.src) return resolve(null);
              const img = new Image();
              img.onload = () =>
                resolve(img.naturalWidth > 0 ? { ...meta, portrait: img.naturalHeight > img.naturalWidth * 1.05 } : null);
              img.onerror = () => resolve(null);
              img.src = meta.src;
            })
        )
      ).then((found) => {
        if (!alive) return;
        const ok = found.filter((p): p is Photo => !!p);
        // de-duplicate in case the same file is listed twice
        const seen = new Set<string>();
        setPhotos((p) => ({ ...p, [w.id]: ok.filter((x) => !seen.has(x.src) && !!seen.add(x.src)) }));
      });
    });
    return () => {
      alive = false;
    };
  }, []);
  return photos;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

const slideDuration = (n: number) => (n <= 1 ? BASE_DURATION : Math.min(MAX_DURATION, Math.max(BASE_DURATION, n * PHOTO_MS)));

export const Achievements: React.FC<AchievementsProps> = ({ lang }) => {
  const ne = lang === 'ne';
  const works = completedWorksData;
  const total = works.length;
  const photos = useWorkPhotos();
  const reduced = usePrefersReducedMotion();

  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<'next' | 'prev'>('next');
  const [run, setRun] = useState(0); // restarts the progress bar
  const [photoIdx, setPhotoIdx] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);
  const [hover, setHover] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [docHidden, setDocHidden] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<number>();
  const drag = useRef<{ x: number; y: number; id: number } | null>(null);

  const activeWork = works[index];
  const activePhotos = photos[activeWork.id] ?? [];
  const autoplay = !reduced && !userPaused;
  const playing = autoplay && !hover && !focusWithin && inView && !docHidden && viewer === null;

  const go = useCallback(
    (to: number, direction?: 'next' | 'prev') => {
      const next = ((to % total) + total) % total;
      if (next === index) return;
      const d = direction ?? (next > index ? 'next' : 'prev');
      // Commit the direction first so the incoming slide starts its wipe from the correct edge.
      flushSync(() => setDir(d));
      void stageRef.current?.offsetWidth;
      setPrev(index);
      setIndex(next);
      setPhotoIdx(0);
      setRun((r) => r + 1);
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = window.setTimeout(() => setPrev(null), WIPE + 60);
    },
    [index, total]
  );

  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);

  // Photos inside the current slide cycle on their own clock.
  useEffect(() => {
    if (!playing || activePhotos.length < 2) return;
    const t = window.setInterval(() => setPhotoIdx((i) => (i + 1) % activePhotos.length), PHOTO_MS);
    return () => window.clearInterval(t);
  }, [playing, activePhotos.length, index]);

  // Only advance while the carousel is on screen and the tab is visible.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    const onVis = () => setDocHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // Keep the active tab in view on small screens, without scrolling the page.
  useEffect(() => {
    const rail = tabsRef.current;
    const tab = rail?.querySelector<HTMLElement>(`[data-tab="${index}"]`);
    if (!rail || !tab || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({ left: Math.max(0, tab.offsetLeft - 16), behavior: reduced ? 'auto' : 'smooth' });
  }, [index, reduced]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(index + 1, 'next');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(index - 1, 'prev');
    }
  };

  // Swipe / drag on the stage
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) go(index + (dx < 0 ? 1 : -1), dx < 0 ? 'next' : 'prev');
  };

  const onCardMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const num = (n: number) => (ne ? toNe(pad(n)) : pad(n));
  const caption = (p: Photo) => (ne ? p.captionNe ?? p.captionEn : p.captionEn ?? p.captionNe);

  return (
    <section id="works" className="py-16 sm:py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={ne ? 'कार्यसम्पादन तथा परिणाम' : 'Public record & impact'}
          title={ne ? 'हालसम्म सम्पन्न भएका मुख्य कामहरू' : 'Key Works Done Till Now'}
          lede={
            ne
              ? 'कार्यालय समयको अनुशासनदेखि अन्तर-पालिका पूर्वाधार, रक्तदान अभियान र प्रतिष्ठित झापा गोल्डकप फुटबलको संरक्षकत्वसम्मका मुख्य पहलहरू।'
              : 'From pioneering municipal punctuality to inter-ward drainage, community blood drives, and football tournament patronage.'
          }
        />

        <ScrollReveal>
          <div
            ref={cardRef}
            role="region"
            aria-roledescription={ne ? 'क्यारोसेल' : 'carousel'}
            aria-label={ne ? 'मुख्य कामहरू' : 'Key works'}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
            onPointerLeave={() => setHover(false)}
            onPointerMove={onCardMove}
            onFocus={(e) => (e.target as HTMLElement).matches(':focus-visible') && setFocusWithin(true)}
            onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setFocusWithin(false)}
            className="wk-card relative isolate overflow-hidden rounded-[28px] sm:rounded-[32px] bg-maroon-deep text-white shadow-[0_40px_80px_-40px_rgba(66,12,21,0.7)]"
          >
            {/* Same atmosphere as the hero */}
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <div className="absolute -right-[15%] -top-[30%] w-[70%] aspect-square rounded-full bg-[radial-gradient(closest-side,rgba(179,72,90,0.5),rgba(128,20,38,0.2)_55%,transparent)]" />
              <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" />
            </div>
            <div aria-hidden="true" className="wk-spot absolute inset-0 -z-10 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* ── Stage ── */}
              <div className="lg:col-span-7 p-2 sm:p-2.5">
                <div
                  ref={stageRef}
                  data-dir={dir}
                  onPointerDown={onPointerDown}
                  onPointerUp={onPointerUp}
                  onPointerCancel={() => (drag.current = null)}
                  className="wk-stage relative overflow-hidden rounded-[22px] sm:rounded-[24px] aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[540px] bg-[#2a060c] select-none touch-pan-y"
                >
                  {works.map((w, i) => {
                    const Icon = ICONS[w.iconName] ?? ShieldCheck;
                    const state = i === index ? 'active' : i === prev ? 'leaving' : 'idle';
                    const list = photos[w.id];
                    const has = !!list && list.length > 0;
                    const live = state !== 'idle';
                    const cur = i === index ? photoIdx : 0;
                    return (
                      <div
                        key={w.id}
                        id={`work-slide-${i}`}
                        role="group"
                        aria-roledescription={ne ? 'स्लाइड' : 'slide'}
                        aria-label={`${num(i + 1)} / ${num(total)}`}
                        aria-hidden={i !== index}
                        data-state={state}
                        className="wk-media"
                      >
                        <div className="wk-media-inner absolute inset-0">
                          {list === undefined ? null : has ? (
                            list.map((p, k) => (
                              <div key={p.src} className="wk-photo absolute inset-0 overflow-hidden" data-current={k === cur}>
                                {p.portrait && (
                                  <img src={p.src} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl brightness-[0.55] saturate-[1.2]" loading="lazy" decoding="async" draggable={false} />
                                )}
                                <img
                                  src={p.src}
                                  alt={caption(p) ?? (ne ? w.titleNe : w.titleEn)}
                                  className={`wk-kb absolute inset-0 w-full h-full ${p.portrait ? 'object-contain' : 'object-cover'}`}
                                  loading={i === 0 && k === 0 ? 'eager' : 'lazy'}
                                  decoding="async"
                                  draggable={false}
                                />
                              </div>
                            ))
                          ) : (
                            <WorkArt id={w.id} active={live} />
                          )}
                          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,4,8,0.7),transparent_38%),linear-gradient(to_bottom,rgba(26,4,8,0.35),transparent_25%)] pointer-events-none" />
                        </div>

                        <span className="wk-chip absolute left-3 top-3 sm:left-4 sm:top-4 inline-flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-md border border-white/15 pl-1.5 pr-3.5 py-1.5 text-[12.5px] font-semibold">
                          <span className="grid place-items-center w-7 h-7 rounded-full bg-white text-maroon">
                            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                          </span>
                          {ne ? w.subtitleNe : w.subtitleEn}
                        </span>

                        {/* Animated badge rides on top of the photos */}
                        {has && (
                          <span className="wk-badge absolute right-3 top-3 sm:right-4 sm:top-4 w-[76px] h-[76px] sm:w-[104px] sm:h-[104px] rounded-full overflow-hidden ring-1 ring-white/30 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.7)]">
                            <WorkArt id={w.id} active={live} variant="badge" />
                          </span>
                        )}

                        {/* Photo strip: every photo is reachable, however many there are */}
                        {has && i === index && (
                          <div className="wk-strip absolute left-3 bottom-3 sm:left-4 sm:bottom-4 z-10 flex items-center gap-1.5 max-w-[calc(100%-110px)]">
                            {list!.slice(0, 5).map((p, k) => (
                              <button
                                key={p.src}
                                type="button"
                                onClick={() => setPhotoIdx(k)}
                                aria-label={`${ne ? 'फोटो' : 'Photo'} ${k + 1} / ${list!.length}`}
                                aria-current={k === cur}
                                className={`wk-strip-thumb relative shrink-0 w-10 h-8 sm:w-12 sm:h-9 rounded-lg overflow-hidden ${k >= 3 ? 'hidden sm:block' : ''}`}
                              >
                                <img src={p.src} alt="" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                              </button>
                            ))}
                            <button
                              type="button"
                              onClick={() => setViewer(cur)}
                              className="inline-flex items-center gap-1.5 h-8 sm:h-9 px-3 rounded-lg bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-[12px] font-semibold transition-colors"
                            >
                              <Images className="w-3.5 h-3.5" aria-hidden="true" />
                              <span className="tabular-nums">{ne ? toNe(String(list!.length)) : list!.length}</span>
                              <span className="hidden sm:inline">{ne ? 'फोटो' : list!.length === 1 ? 'photo' : 'photos'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Stage counter */}
                  <div aria-hidden="true" className="absolute right-4 bottom-4 sm:right-5 sm:bottom-5 z-10 flex items-baseline gap-1 tabular-nums font-bold text-white/90">
                    <span className="wk-count text-[28px] sm:text-[34px] leading-none tracking-tight" key={index}>{num(index + 1)}</span>
                    <span className="text-[13px] text-white/50">/ {num(total)}</span>
                  </div>
                </div>
              </div>

              {/* ── Copy ── */}
              <div className="lg:col-span-5 relative flex flex-col px-6 pt-6 pb-7 sm:px-10 sm:pt-9 sm:pb-9 lg:pl-8 lg:pr-12 lg:py-12">
                <div className="grid flex-1" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
                  {works.map((w, i) => (
                    <article key={w.id} data-active={i === index} aria-hidden={i !== index} className="wk-copy relative flex flex-col">
                      <span aria-hidden="true" className="wk-num absolute -top-4 sm:-top-6 right-0 text-[110px] sm:text-[150px] font-extrabold leading-none tracking-tighter tabular-nums">
                        {num(i + 1)}
                      </span>
                      <p className="wk-line relative text-[13px] font-semibold text-[#f0b8c2] flex items-center gap-2.5" style={{ '--i': 0 } as React.CSSProperties}>
                        <span className="w-6 h-[1.5px] bg-current" aria-hidden="true" />
                        {ne ? w.subtitleNe : w.subtitleEn}
                      </p>
                      <h3 className="wk-line relative mt-4 text-[26px] sm:text-[32px] lg:text-[34px] font-extrabold leading-[1.12] tracking-tight" style={{ '--i': 1 } as React.CSSProperties}>
                        {ne ? w.titleNe : w.titleEn}
                      </h3>
                      <p className="wk-line relative mt-4 text-[15px] sm:text-base leading-[1.75] text-white/70 max-w-[52ch]" style={{ '--i': 2 } as React.CSSProperties}>
                        <Rich text={ne ? w.descriptionNe : w.descriptionEn} />
                      </p>
                      <div className="wk-line relative mt-auto pt-7" style={{ '--i': 3 } as React.CSSProperties}>
                        <div className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3.5">
                          <span className="w-1 self-stretch rounded-full bg-[#f0b8c2]" aria-hidden="true" />
                          <div className="min-w-0">
                            <p className="text-[17px] sm:text-lg font-bold leading-snug">{ne ? w.metricsNe : w.metricsEn}</p>
                            <p className="mt-1 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white/55">
                              <BadgeCheck className="w-3.5 h-3.5 text-[#f0b8c2]" aria-hidden="true" />
                              {ne ? 'प्रमाणित अभिलेख' : 'Verified record'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Controls */}
                <div className="mt-7 flex items-center gap-2">
                  <button type="button" onClick={() => go(index - 1, 'prev')} className="wk-btn" aria-label={ne ? 'अघिल्लो काम' : 'Previous work'} aria-controls={`work-slide-${index}`}>
                    <ArrowLeft className="w-[18px] h-[18px]" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => go(index + 1, 'next')} className="wk-btn wk-btn-solid" aria-label={ne ? 'अर्को काम' : 'Next work'} aria-controls={`work-slide-${index}`}>
                    <ArrowRight className="w-[18px] h-[18px]" aria-hidden="true" />
                  </button>
                  {!reduced && (
                    <button
                      type="button"
                      onClick={() => setUserPaused((p) => !p)}
                      className="wk-btn ml-auto"
                      aria-label={userPaused ? (ne ? 'स्वतः प्ले गर्नुहोस्' : 'Play slideshow') : ne ? 'रोक्नुहोस्' : 'Pause slideshow'}
                    >
                      {userPaused ? <Play className="w-4 h-4" aria-hidden="true" /> : <Pause className="w-4 h-4" aria-hidden="true" />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Progress tabs ── */}
            <div
              ref={tabsRef}
              role="tablist"
              aria-label={ne ? 'काम छान्नुहोस्' : 'Choose a work'}
              className="hide-scrollbar relative flex lg:grid lg:grid-cols-4 overflow-x-auto snap-x snap-proximity scroll-px-4 border-t border-white/10"
            >
              {works.map((w, i) => {
                const Icon = ICONS[w.iconName] ?? ShieldCheck;
                const on = i === index;
                const thumb = photos[w.id]?.[0]?.src;
                const count = photos[w.id]?.length ?? 0;
                return (
                  <button
                    key={w.id}
                    type="button"
                    role="tab"
                    data-tab={i}
                    aria-selected={on}
                    aria-controls={`work-slide-${i}`}
                    onClick={() => go(i)}
                    className={`wk-tab group relative shrink-0 w-[74%] sm:w-[44%] lg:w-auto snap-start text-left px-5 sm:px-6 pt-5 pb-5 flex items-start gap-3.5 ${i > 0 ? 'border-l border-white/10' : ''}`}
                  >
                    <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-[2px] bg-white/10 overflow-hidden">
                      {on && (
                        <span
                          key={run}
                          className="wk-progress absolute inset-0 bg-[#f0b8c2] origin-left"
                          data-run={autoplay ? 'auto' : 'static'}
                          style={{ animationDuration: `${slideDuration(count)}ms`, animationPlayState: playing ? 'running' : 'paused' }}
                          onAnimationEnd={() => autoplay && go(index + 1, 'next')}
                        />
                      )}
                    </span>
                    <span className="wk-thumb relative shrink-0 w-11 h-11 rounded-xl overflow-hidden grid place-items-center border">
                      {thumb ? (
                        <img src={thumb} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11.5px] font-semibold tabular-nums wk-tab-num">{num(i + 1)}</span>
                      <span className="wk-tab-title mt-0.5 block text-[13.5px] font-semibold leading-snug line-clamp-2">
                        {ne ? w.titleNe : w.titleEn}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {viewer !== null && activePhotos.length > 0 && (
        <PhotoViewer
          photos={activePhotos.map((p) => ({ src: p.src, caption: caption(p) }))}
          start={Math.min(viewer, activePhotos.length - 1)}
          title={ne ? activeWork.titleNe : activeWork.titleEn}
          lang={lang}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
};
