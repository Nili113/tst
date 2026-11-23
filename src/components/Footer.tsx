import React from 'react';
import { civicProfile } from '../data/portfolioData';
import { FACEBOOK_PAGE } from '../data/gallery';
import { Language } from '../types';
import { ArrowUp, Mail, MapPin } from 'lucide-react';
import { FacebookIcon } from './BrandIcons';
import { useScrollProgress } from '../lib/useScrollProgress';
import { linkClick, usePath } from '../lib/router';
import { smoothScrollTo } from '../lib/smoothScroll';

interface FooterProps {
  lang: Language;
}

const links = [
  { href: '#home', ne: 'गृहपृष्ठ', en: 'Home' },
  { href: '#about', ne: 'परिचय', en: 'About' },
  { href: '#mission', ne: 'ध्येय', en: 'Mission' },
  { href: '#works', ne: 'परियोजनाहरू', en: 'Projects' },
  { href: '#education', ne: 'शिक्षा', en: 'Education' },
  { href: '#news', ne: 'समाचार', en: 'News' },
  { href: '#videos', ne: 'भिडियो', en: 'Videos' },
  { href: '/gallery', ne: 'ग्यालरी', en: 'Gallery' },
  { href: '#contact', ne: 'सम्पर्क', en: 'Contact' },
];

const NE_DIGITS = '०१२३४५६७८९';
const toNe = (n: number) => String(n).replace(/\d/g, (d) => NE_DIGITS[+d]);

/** Current year in AD, and in BS (the BS year turns over in mid-April). */
function years() {
  const now = new Date();
  const ad = now.getFullYear();
  const bs = ad + (now.getMonth() > 3 || (now.getMonth() === 3 && now.getDate() >= 14) ? 57 : 56);
  return { ad, bs };
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const ne = lang === 'ne';
  const home = usePath() === '/';
  const { ad, bs } = years();
  // Section anchors only exist on the home page; elsewhere they lead back to it.
  const hrefFor = (h: string) => (h.startsWith('#') && !home ? (h === '#home' ? '/' : '/' + h) : h);

  // --p: 0 when the footer's top meets the bottom of the screen, 1 once most of it is in view.
  // Content staggers in once the card has mostly risen (set as an attribute: no re-render).
  const ref = useScrollProgress<HTMLElement>((r, vh) => (vh - r.top) / Math.max(Math.min(r.height, vh) * 0.85, 1), {
    reducedValue: 1,
    onUpdate: (p, el) => {
      if (p > 0.45) el.dataset.shown = 'true';
    },
  });

  const socials = [
    { href: FACEBOOK_PAGE, label: 'Facebook', icon: <FacebookIcon className="w-[18px] h-[18px] fill-current" /> },
    { href: `mailto:${civicProfile.email}`, label: 'Email', icon: <Mail className="w-[18px] h-[18px]" aria-hidden="true" /> },
  ];

  return (
    <footer ref={ref} className="site-footer w-full bg-[#0b6e1c] font-sans">
      <div className="footer-card relative isolate overflow-hidden bg-[#0b6e1c] text-white">
        {/* Same atmosphere: tree-green glow and faint dot grain */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute -right-[10%] -top-[60%] w-[70%] max-w-[900px] aspect-square rounded-full bg-[radial-gradient(closest-side,rgba(20,152,42,0.55),rgba(11,126,28,0.22)_55%,transparent)]" />
          <div className="absolute -left-[15%] -bottom-[50%] w-[60%] max-w-[700px] aspect-square rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.32),transparent)]" />
          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Columns ── */}
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 pt-12 sm:pt-14 pb-6 lg:pb-2">
            <div className="ft-in col-span-2 lg:col-span-5" style={{ '--i': 1 } as React.CSSProperties}>
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-xl tracking-tight">{ne ? civicProfile.nameNe : civicProfile.nameEn}</span>
                <span className="text-xs font-medium text-[#bfe8c8] border-l border-white/25 pl-3">{ne ? 'वडा अध्यक्ष' : 'Ward Chair'}</span>
              </div>
              <div className="mt-5 flex items-center gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="ft-social grid place-items-center w-11 h-11 rounded-full border border-white/20 bg-white/[0.04] text-white/80"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <nav aria-label="Footer" className="ft-in col-span-2 sm:col-span-1 lg:col-span-4" style={{ '--i': 2 } as React.CSSProperties}>
              <p className="text-[12.5px] font-semibold text-[#c8f0d0] mb-3">{ne ? 'द्रुत लिङ्कहरू' : 'Quick links'}</p>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-0.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={hrefFor(l.href)}
                      onClick={linkClick}
                      className="group inline-flex items-center py-1.5 text-[14px] font-medium text-white/70 hover:text-white transition-colors"
                    >
                      <span aria-hidden="true" className="h-px w-0 bg-[#c8f0d0] transition-[width,margin] duration-300 group-hover:w-3 group-hover:mr-2" />
                      {ne ? l.ne : l.en}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="ft-in col-span-2 sm:col-span-1 lg:col-span-3" style={{ '--i': 3 } as React.CSSProperties}>
              <p className="text-[12.5px] font-semibold text-[#c8f0d0] mb-3">{ne ? 'सम्पर्क' : 'Contact'}</p>
              <ul className="space-y-3 text-[14px] text-white/70">
                <li className="flex gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#c8f0d0]" aria-hidden="true" />
                  <span>{ne ? 'वडा नं. ५, बिर्तामोड, झापा' : 'Ward No. 5, Birtamod, Jhapa'}</span>
                </li>
                <li className="flex gap-2.5">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#c8f0d0]" aria-hidden="true" />
                  <a href={`mailto:${civicProfile.email}`} className="break-all hover:text-white transition-colors">{civicProfile.email}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Signature: his name, oversized and outlined, rising out of the bottom edge ── */}
        <div aria-hidden="true" className="ft-sign pointer-events-none select-none px-4 sm:px-8 -mb-[0.22em] text-center font-extrabold leading-none whitespace-nowrap">
          {ne ? civicProfile.nameNe : civicProfile.nameEn}
        </div>

        {/* ── Bottom bar ── */}
        <div className="relative border-t border-white/10 bg-black/15 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12.5px] text-white/55">
            <p className="tabular-nums">
              {ne ? `© ${toNe(bs)} ${civicProfile.nameNe} · बिर्तामोड–५, झापा` : `© ${ad} ${civicProfile.nameEn} · Birtamod-5, Jhapa`}
            </p>
            <button
              type="button"
              onClick={() => smoothScrollTo(0)}
              className="group inline-flex items-center gap-2 self-start sm:self-auto min-h-[36px] text-white/70 hover:text-white transition-colors"
            >
              {ne ? 'माथि जानुहोस्' : 'Back to top'}
              <span className="grid place-items-center w-8 h-8 rounded-full border border-white/25 transition-[transform,background-color,border-color] duration-300 group-hover:-translate-y-0.5 group-hover:bg-white group-hover:border-white group-hover:text-[#0b6e1c]">
                <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
