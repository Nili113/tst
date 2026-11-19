import React from 'react';
import { civicProfile } from '../data/portfolioData';
import { Language } from '../types';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { useScrollProgress } from '../lib/useScrollProgress';

interface HeroProps {
  lang: Language;
  onOpenDesk: () => void;
}

// Term: 2079 BS local election (May 2022) → 2084 BS (May 2027).
const TERM_START = new Date('2022-05-13').getTime();
const TERM_END = new Date('2027-05-13').getTime();
const elapsed = Math.min(Math.max((Date.now() - TERM_START) / (TERM_END - TERM_START), 0), 1);

const YEARS_NE = ['२०७९', '२०८०', '२०८१', '२०८२', '२०८३', '२०८४'];
const YEARS_EN = ['2022', '2023', '2024', '2025', '2026', '2027'];

export const Hero: React.FC<HeroProps> = ({ lang, onOpenDesk }) => {
  const ne = lang === 'ne';
  // 0 while the hero sits at the top, 1 once it has scrolled fully out of view.
  const heroRef = useScrollProgress<HTMLElement>((r) => -r.top / Math.max(r.height, 1), { reducedValue: 0 });
  const nameLines = (ne ? civicProfile.nameNe : civicProfile.nameEn).split(' ');
  const years = ne ? YEARS_NE : YEARS_EN;
  const pct = elapsed * 100;

  const onHeroMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section ref={heroRef} onPointerMove={onHeroMove} id="home" className="hero relative isolate overflow-hidden bg-maroon-deep text-white font-sans">
      {/* Atmosphere: warm glow behind the portrait, faint dot grain */}
      <div aria-hidden="true" className="hero-glow absolute inset-0 -z-10">
        <div className="absolute -right-[10%] top-[-20%] w-[70vw] max-w-[900px] aspect-square rounded-full bg-[radial-gradient(closest-side,rgba(179,72,90,0.55),rgba(128,20,38,0.25)_55%,transparent)]" />
        <div className="absolute -left-[20%] bottom-[-40%] w-[60vw] max-w-[700px] aspect-square rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.35),transparent)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" />
      </div>
      <div aria-hidden="true" className="hero-spot absolute inset-0 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end pt-10 sm:pt-14 lg:pt-16">
          {/* ── Words ── */}
          <div className="hero-words order-2 lg:order-1 lg:col-span-7 pb-2 lg:pb-16">
            <p className="hero-eyebrow enter" style={{ '--i': 0 } as React.CSSProperties}>
              {ne ? 'बिर्तामोड, झापा, कोशी प्रदेश, नेपाल' : 'Birtamod, Jhapa, Koshi Province, Nepal'}
            </p>

            <h1 className="hero-name mt-5" aria-label={ne ? civicProfile.nameNe : civicProfile.nameEn}>
              {nameLines.map((line, i) => (
                <span key={line + i} className="name-mask" aria-hidden="true">
                  <span style={{ animationDelay: `${120 + i * 110}ms` }}>{line}</span>
                </span>
              ))}
            </h1>

            <p className="enter mt-5 text-lg sm:text-2xl font-semibold text-[#f0b8c2]" style={{ '--i': 3 } as React.CSSProperties}>
              {ne ? 'सार्वजनिक परिचय • वडा अध्यक्ष' : 'Public Representative • Ward Chairperson'}
            </p>

            <p
              className="enter mt-4 max-w-xl text-[15.5px] sm:text-lg leading-[1.75] text-white/75"
              style={{ '--i': 4 } as React.CSSProperties}
            >
              {ne
                ? 'बिर्तामोड नगरपालिका वडा नं. ५ का निर्वाचित वडाध्यक्ष। पारदर्शी सुशासन, समयपालन र नागरिक सेवामा समर्पित।'
                : 'Elected Ward Chairperson of Birtamod Municipality Ward No. 5. Committed to transparent governance, strict punctuality, and public service.'}
            </p>

            <div className="enter flex flex-col sm:flex-row gap-3 mt-8" style={{ '--i': 5 } as React.CSSProperties}>
              <button type="button" onClick={onOpenDesk} className="btn btn-light px-7 min-h-[52px]">
                <MessageSquare className="btn-icon btn-icon-tilt w-[18px] h-[18px]" aria-hidden="true" />
                <span className="trim">{ne ? 'नागरिक सहायता डेस्क' : 'Citizen Assistance Desk'}</span>
              </button>
              <a href="#works" className="btn btn-outline-light min-h-[52px]">
                <span className="trim">{ne ? 'कार्यसम्पादन विवरण' : 'Explore Public Works'}</span>
                <ArrowRight className="btn-icon btn-icon-nudge w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* ── Portrait in an arch ── */}
          <div className="hero-art order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end">
            <div
              className="portrait-enter relative w-[68%] max-w-[260px] sm:max-w-[330px] lg:w-full lg:max-w-[420px]"
            >
              <div className="relative">
                {/* Offset outline arch: a second plane behind the photo */}
                <div
                  aria-hidden="true"
                  className="arch-outline absolute inset-0 rounded-t-full border border-[#f0b8c2]/40 [mask-image:linear-gradient(to_bottom,#000_55%,transparent_92%)]"
                  style={{ transform: 'translate(14px, -14px)' }}
                />
                <div className="relative rounded-t-full overflow-hidden aspect-[3/4] bg-[#33070f] [mask-image:linear-gradient(to_bottom,#000_70%,transparent_99%)]">
                  <img
                    src="/images/rohit-prasai-portrait.jpg"
                    alt={civicProfile.nameEn}
                    className="w-full h-full object-cover object-top scale-[1.02]"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Term ruler: the mandate as a timeline ── */}
        <div className="enter relative mt-10 lg:mt-0 border-t border-white/15 py-6 sm:py-7" style={{ '--i': 6 } as React.CSSProperties}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-10">
            <div className="shrink-0 lg:w-56">
              <p className="text-[13px] font-semibold text-white">{ne ? 'कार्यकाल २०७९–२०८४' : 'Mandate 2022–2027'}</p>
              <p className="mt-0.5 text-[13px] text-white/55">
                {ne ? 'नेपाली कांग्रेस, वि.सं. २०६२ देखि' : 'Nepali Congress, since 2062 BS'}
              </p>
            </div>

            <div
              className="relative flex-1 pt-7 pb-1"
              role="img"
              aria-label={ne ? `कार्यकालको ${Math.round(pct)}% समय बितेको` : `${Math.round(pct)}% of the term elapsed`}
            >
              {/* track */}
              <div className="relative h-[3px] rounded-full bg-white/15">
                <div
                  className="term-bar absolute inset-y-0 left-0 rounded-full bg-[#f0b8c2]"
                  style={{ width: `${pct}%`, '--to': `${pct}%` } as React.CSSProperties}
                />
                {/* today marker */}
                <div className="term-marker absolute top-1/2" style={{ left: `${pct}%`, '--to': `${pct}%` } as React.CSSProperties}>
                  <span className="absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white ring-4 ring-[#f0b8c2]/30" />
                  <span className="absolute -translate-x-1/2 -top-8 whitespace-nowrap rounded-full bg-white text-maroon-deep text-[11.5px] font-bold px-2 py-0.5 shadow-sm">
                    {ne ? 'आज' : 'Today'}
                  </span>
                </div>
              </div>
              {/* ticks */}
              <div className="relative mt-3 h-5">
                {years.map((y, i) => {
                  const left = (i / (years.length - 1)) * 100;
                  return (
                    <span
                      key={y}
                      className={`absolute text-[12px] tabular-nums ${left <= pct ? 'text-white/80' : 'text-white/40'} ${
                        i === 0 ? '' : i === years.length - 1 ? '-translate-x-full' : '-translate-x-1/2'
                      }`}
                      style={{ left: `${left}%` }}
                    >
                      {y}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
