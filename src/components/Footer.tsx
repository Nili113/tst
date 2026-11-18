import React from 'react';
import { civicProfile } from '../data/portfolioData';
import { Language } from '../types';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-[#0f172a] font-sans py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Tier: Clean 2-Side Balanced Layout (Zero Redundancies) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200/80">

          {/* Left: Brand Identity & Role */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-base sm:text-lg text-[#0f172a] tracking-tight">
                {lang === 'ne' ? civicProfile.nameNe : civicProfile.nameEn}
              </span>
              <span className={`text-[11px] font-mono uppercase text-slate-400 font-semibold border-l border-slate-300 pl-2.5 ${
                lang === 'en' ? 'tracking-widest' : 'tracking-normal'
              }`}>
                {lang === 'ne' ? 'वडा अध्यक्ष' : 'Ward Chair'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-sans">
              {lang === 'ne'
                ? 'बिर्तामोड नगरपालिका, वडा नं. ५, झापा, कोशी प्रदेश, नेपाल'
                : 'Birtamod Municipality, Ward No. 5, Jhapa, Koshi Province, Nepal'}
            </p>
          </div>

          {/* Right: Essential Anchor Links & Back to Top */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-medium text-slate-600">
            <a href="#home" className="hover:text-[#801426] transition-colors">
              {lang === 'ne' ? 'गृहपृष्ठ' : 'Home'}
            </a>
            <a href="#about" className="hover:text-[#801426] transition-colors">
              {lang === 'ne' ? 'परिचय' : 'About'}
            </a>
            <a href="#mission" className="hover:text-[#801426] transition-colors">
              {lang === 'ne' ? 'ध्येय' : 'Mission'}
            </a>
            <a href="#works" className="hover:text-[#801426] transition-colors">
              {lang === 'ne' ? 'कार्यसम्पादन' : 'Works'}
            </a>
            <a href="#education" className="hover:text-[#801426] transition-colors">
              {lang === 'ne' ? 'शिक्षा' : 'Education'}
            </a>
            <a href="#news" className="hover:text-[#801426] transition-colors">
              {lang === 'ne' ? 'समाचार' : 'News'}
            </a>
            <a href="#videos" className="hover:text-[#801426] transition-colors">
              {lang === 'ne' ? 'भिडियो' : 'Videos'}
            </a>
            <a href="#contact" className="hover:text-[#801426] transition-colors">
              {lang === 'ne' ? 'सम्पर्क' : 'Contact'}
            </a>

            {/* Smooth Back to Top */}
            <button
              onClick={scrollToTop}
              className="taste-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs text-xs font-semibold transition-all ml-1 sm:ml-2"
              title={lang === 'ne' ? 'माथि जानुहोस्' : 'Back to top'}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#801426]" />
              <span>{lang === 'ne' ? 'माथि' : 'Top'}</span>
            </button>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Civic Attribution */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            {lang === 'ne'
              ? '© २०८१ रोहित प्रसाईं — आधिकारिक जनप्रतिनिधि पोर्टल | बिर्तामोड–५'
              : '© 2024 Rohit Prasai — Official Civic Representative Portal | Birtamod-5'}
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            {lang === 'ne' ? 'नेपाल संवत् ११४४ • स्थानीय सरकार' : 'Local Government Portfolio • Ward No. 5'}
          </div>
        </div>

      </div>
    </footer>
  );
};
