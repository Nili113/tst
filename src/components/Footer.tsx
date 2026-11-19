import React from 'react';
import { civicProfile } from '../data/portfolioData';
import { Language } from '../types';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

const links = [
  { href: '#home', ne: 'गृहपृष्ठ', en: 'Home' },
  { href: '#about', ne: 'परिचय', en: 'About' },
  { href: '#mission', ne: 'ध्येय', en: 'Mission' },
  { href: '#works', ne: 'कार्यसम्पादन', en: 'Works' },
  { href: '#education', ne: 'शिक्षा', en: 'Education' },
  { href: '#news', ne: 'समाचार', en: 'News' },
  { href: '#videos', ne: 'भिडियो', en: 'Videos' },
  { href: '#contact', ne: 'सम्पर्क', en: 'Contact' },
];

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const ne = lang === 'ne';
  return (
    <footer className="bg-white font-sans max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-3 sm:pb-6">
      <div className="relative isolate overflow-hidden rounded-[24px] sm:rounded-[32px] bg-maroon-deep text-white shadow-[0_30px_60px_-36px_rgba(66,12,21,0.7)]">
      {/* Same atmosphere as the hero: warm glow and faint dot grain */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -right-[10%] -top-[140%] w-[70%] max-w-[900px] aspect-square rounded-full bg-[radial-gradient(closest-side,rgba(179,72,90,0.5),rgba(128,20,38,0.22)_55%,transparent)]" />
        <div className="absolute -left-[15%] -bottom-[160%] w-[60%] max-w-[700px] aspect-square rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.35),transparent)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" />
      </div>

      <div className="px-6 sm:px-10 lg:px-12 py-9 sm:py-11">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 pb-9 border-b border-white/15">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-xl tracking-tight">{ne ? civicProfile.nameNe : civicProfile.nameEn}</span>
              <span className="text-xs font-medium text-[#f0b8c2] border-l border-white/25 pl-3">
                {ne ? 'वडा अध्यक्ष' : 'Ward Chair'}
              </span>
            </div>
            <p className="mt-2 text-[13.5px] text-white/60 max-w-sm leading-relaxed">
              {ne
                ? 'बिर्तामोड नगरपालिका, वडा नं. ५, झापा, कोशी प्रदेश, नेपाल'
                : 'Birtamod Municipality, Ward No. 5, Jhapa, Koshi Province, Nepal'}
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn btn-outline-light group mt-6 min-h-[40px] px-4 text-[13px]"
              aria-label={ne ? 'माथि जानुहोस्' : 'Back to top'}
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#f0b8c2] transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" />
              <span className="trim">{ne ? 'माथि' : 'Back to top'}</span>
            </button>
          </div>

          <nav aria-label="Footer">
            <p className="text-[12.5px] font-semibold text-[#f0b8c2] mb-3">{ne ? 'द्रुत लिङ्कहरू' : 'Quick links'}</p>
            <ul className="grid grid-rows-4 grid-flow-col gap-x-14 gap-y-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center py-1.5 text-[14px] font-medium text-white/70 hover:text-white transition-colors"
                  >
                    <span aria-hidden="true" className="h-px w-0 bg-[#f0b8c2] transition-[width,margin] duration-300 group-hover:w-3 group-hover:mr-2" />
                    {ne ? l.ne : l.en}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13px] text-white/55">
          <p>
            {ne
              ? '© २०८१ रोहित प्रसाईं — आधिकारिक जनप्रतिनिधि पोर्टल | बिर्तामोड–५'
              : '© 2024 Rohit Prasai — Official Civic Representative Portal | Birtamod-5'}
          </p>
          <p className="text-white/40">{ne ? 'नेपाल संवत् ११४४ • स्थानीय सरकार' : 'Local Government Portfolio • Ward No. 5'}</p>
        </div>
      </div>
      </div>
    </footer>
  );
};
