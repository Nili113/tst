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
    <footer className="bg-ivory-section border-t border-stone-200 text-ink font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-stone-300/60">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-lg tracking-tight">{ne ? civicProfile.nameNe : civicProfile.nameEn}</span>
              <span className="text-xs font-medium text-stone-500 border-l border-stone-300 pl-3">
                {ne ? 'वडा अध्यक्ष' : 'Ward Chair'}
              </span>
            </div>
            <p className="mt-1.5 text-[13.5px] text-stone-500">
              {ne
                ? 'बिर्तामोड नगरपालिका, वडा नं. ५, झापा, कोशी प्रदेश, नेपाल'
                : 'Birtamod Municipality, Ward No. 5, Jhapa, Koshi Province, Nepal'}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-1 gap-y-1 -mx-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-2 py-2 text-[13.5px] font-medium text-stone-600 hover:text-maroon transition-colors"
              >
                {ne ? l.ne : l.en}
              </a>
            ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="btn btn-ghost group ml-2 min-h-[40px] px-4 text-[13px]"
              aria-label={ne ? 'माथि जानुहोस्' : 'Back to top'}
            >
              <ArrowUp className="w-3.5 h-3.5 text-maroon transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" />
              <span className="trim">{ne ? 'माथि' : 'Top'}</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13px] text-stone-500">
          <p>
            {ne
              ? '© २०८१ रोहित प्रसाईं — आधिकारिक जनप्रतिनिधि पोर्टल | बिर्तामोड–५'
              : '© 2024 Rohit Prasai — Official Civic Representative Portal | Birtamod-5'}
          </p>
          <p className="text-stone-400">{ne ? 'नेपाल संवत् ११४४ • स्थानीय सरकार' : 'Local Government Portfolio • Ward No. 5'}</p>
        </div>
      </div>
    </footer>
  );
};
