import React from 'react';
import { civicProfile } from '../data/portfolioData';
import { Language } from '../types';
import { ArrowUp, ExternalLink } from 'lucide-react';
import { FacebookIcon, YoutubeIcon } from './BrandIcons';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#f2ece1] text-[#0f172a] overflow-hidden font-sans border-t-2 border-[#801426]">
      
      {/* Subtle Ambient Light */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#efe8dc] to-[#f4eee4] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 md:pt-20">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16">
          
          {/* Brand & Stewardship Column (Left - 5 Cols) */}
          <div className="md:col-span-5 space-y-5">
            {/* Headline Ethos */}
            <h3 className={`text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight leading-snug ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
              {lang === 'ne' 
                ? 'जनउत्तरदायी स्थानीय सरकार, पारदर्शी नेतृत्व र समृद्ध बिर्तामोड' 
                : 'Accountable Local Governance, Transparent Stewardship & Prosperous Birtamod'}
            </h3>

            {/* Description */}
            <p className="text-sm text-[#475569] leading-relaxed max-w-md font-sans">
              {lang === 'ne'
                ? 'बिर्तामोड–५ का प्रत्येक नागरिकको पहुँचयोग्य सेवा, सुशासन, दिगो पूर्वाधार र युवा खेलकुद प्रवर्द्धनका लागि निरन्तर कार्यरत जनप्रतिनिधि पोर्टल।'
                : 'Dedicated to sustainable development, prompt administrative delivery, civic grievance redressal, and youth development for Birtamod Ward 5 constituents.'}
            </p>

            {/* Return to Top Button */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={scrollToTop}
                className="taste-btn inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#faf8f5] text-[#0f172a] border border-[#d6cec0] shadow-xs text-xs font-semibold transition-all"
                title={lang === 'ne' ? 'पृष्ठको सुरुमा जानुहोस्' : 'Back to top'}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#801426]" />
                <span>{lang === 'ne' ? 'पृष्ठको सुरुमा जानुहोस्' : 'Back to top'}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Menu (2-3 Cols) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#801426] font-mono">
              {lang === 'ne' ? 'मुख्य मेनु' : 'Menu'}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#475569]">
              <li>
                <a href="#hero" className="hover:text-[#801426] hover:translate-x-0.5 transition-all inline-block">
                  {lang === 'ne' ? 'गृहपृष्ठ' : 'Home'}
                </a>
              </li>
              <li>
                <a href="#biography" className="hover:text-[#801426] hover:translate-x-0.5 transition-all inline-block">
                  {lang === 'ne' ? 'व्यक्तिगत परिचय' : 'Biography'}
                </a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-[#801426] hover:translate-x-0.5 transition-all inline-block">
                  {lang === 'ne' ? 'कार्यसम्पादन' : 'Key Initiatives'}
                </a>
              </li>
              <li>
                <a href="#education" className="text-[#801426] font-semibold hover:translate-x-0.5 transition-all inline-block">
                  {lang === 'ne' ? 'शिक्षा तथा उद्यम' : 'Education & Enterprise'}
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-[#801426] hover:translate-x-0.5 transition-all inline-block">
                  {lang === 'ne' ? 'नेतृत्व यात्रा' : 'Mandate Timeline'}
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-[#801426] hover:translate-x-0.5 transition-all inline-block">
                  {lang === 'ne' ? 'समाचार अपडेट' : 'Civic News'}
                </a>
              </li>
              <li>
                <a href="#videos" className="hover:text-[#801426] hover:translate-x-0.5 transition-all inline-block">
                  {lang === 'ne' ? 'भिडियो प्रसारण' : 'Video Stream'}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#801426] hover:translate-x-0.5 transition-all inline-block">
                  {lang === 'ne' ? 'सम्पर्क' : 'Contact'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Constituent Services (2-3 Cols) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#801426] font-mono">
              {lang === 'ne' ? 'नागरिक सेवा' : 'Services'}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#475569]">
              <li>
                <span className="cursor-default hover:text-[#801426] transition-colors">
                  {lang === 'ne' ? 'सिफारिस तथा प्रमाणीकरण' : 'Ward Recommendations'}
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-[#801426] transition-colors">
                  {lang === 'ne' ? 'योजना तथा बजेट अनुगमन' : 'Project Monitoring'}
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-[#801426] transition-colors">
                  {lang === 'ne' ? 'नागरिक वडापत्र' : 'Citizen Charter'}
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-[#801426] transition-colors">
                  {lang === 'ne' ? 'सूचनाको हक (RTI)' : 'Right to Information'}
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-[#801426] transition-colors">
                  {lang === 'ne' ? 'सडक तथा सरसफाइ गुनासो' : 'Sanitation & Roads'}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency & Direct Contacts (3 Cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#801426] font-mono">
              {lang === 'ne' ? 'सम्पर्क तथा आपतकालीन' : 'Emergency & Contacts'}
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#ded5c4] shadow-xs">
                <div className="text-[10px] uppercase font-bold text-[#64748b] font-mono">
                  {lang === 'ne' ? 'वडा कार्यालय फोन' : 'Ward Office Desk'}
                </div>
                <div className="font-mono text-sm font-bold text-[#0f172a] mt-0.5">
                  {civicProfile.phone}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#ded5c4] shadow-xs">
                <div className="text-[10px] uppercase font-bold text-[#64748b] font-mono">
                  {lang === 'ne' ? 'प्रहरी आपतकालीन / नगर' : 'Police Emergency'}
                </div>
                <div className="font-mono text-sm font-bold text-emerald-700 mt-0.5">
                  १०० / ०२३–५४००९९
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#ded5c4] shadow-xs">
                <div className="text-[10px] uppercase font-bold text-[#64748b] font-mono">
                  {lang === 'ne' ? 'एम्बुलेन्स सेवा' : 'Ambulance Hotline'}
                </div>
                <div className="font-mono text-sm font-bold text-[#801426] mt-0.5">
                  १०२
                </div>
              </div>
            </div>

            {/* Official Social Links */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href={civicProfile.facebookPage}
                target="_blank"
                rel="noopener noreferrer"
                className="taste-btn flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold shadow-xs"
              >
                <FacebookIcon className="w-3.5 h-3.5 fill-white" />
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={civicProfile.youtubeSearch}
                target="_blank"
                rel="noopener noreferrer"
                className="taste-btn flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#FF0000] hover:bg-[#e60000] text-white text-xs font-bold shadow-xs"
              >
                <YoutubeIcon className="w-3.5 h-3.5 fill-white" />
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>

          </div>

        </div>

        {/* Clean Portal Attribution Line — Media Credits Removed */}
        <div className="border-t border-[#ded5c4] pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748b]">
          <div>
            {lang === 'ne' 
              ? '© २०८१ रोहित प्रसाईं — आधिकारिक नागरिक तथा जनप्रतिनिधि पोर्टल | बिर्तामोड–५, झापा' 
              : '© 2024 Rohit Prasai — Official Civic Representative Portal | Birtamod-5, Jhapa'}
          </div>
          <div className="font-mono text-[11px] text-[#94a3b8]">
            {lang === 'ne' ? 'नेपाल संवत् ११४४ • स्थानीय सरकार' : 'Local Government Portfolio'}
          </div>
        </div>

      </div>

    </footer>
  );
};
