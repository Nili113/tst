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
    <footer className="relative bg-[#f6f2ea] text-civic-800 border-t border-civic-200/90 overflow-hidden font-sans pt-16 md:pt-20">
      
      {/* Subtle Atmospheric Top Ambient Light */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f4] via-[#f5f0e6] to-[#ebe3d5] pointer-events-none -z-10" />

      {/* Decorative gentle hill contour silhouette at lower ground */}
      <div className="absolute bottom-0 inset-x-0 h-44 opacity-25 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-700/20 via-emerald-800/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16">
          
          {/* Brand & Stewardship Column (Left - 5 Cols) */}
          <div className="md:col-span-5 space-y-5">
            {/* Headline Ethos */}
            <h3 className={`text-xl sm:text-2xl font-bold text-civic-950 tracking-tight leading-snug ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
              {lang === 'ne' 
                ? 'जनउत्तरदायी स्थानीय सरकार, पारदर्शी नेतृत्व र समृद्ध बिर्तामोड' 
                : 'Accountable Local Governance, Transparent Stewardship & Prosperous Birtamod'}
            </h3>

            {/* Description */}
            <p className="text-sm text-civic-600 leading-relaxed max-w-md">
              {lang === 'ne'
                ? 'बिर्तामोड–५ का प्रत्येक नागरिकको पहुँचयोग्य सेवा, सुशासन, दिगो पूर्वाधार र युवा खेलकुद प्रवर्द्धनका लागि निरन्तर कार्यरत जनप्रतिनिधि पोर्टल।'
                : 'Dedicated to the sustainable development, prompt administrative delivery, civic grievance redressal, and youth development for Birtamod Ward 5 constituents.'}
            </p>

            {/* Return to Top Button */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={scrollToTop}
                className="taste-btn inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-civic-700 hover:text-civic-950 border border-civic-300/80 shadow-2xs text-xs font-semibold transition-all"
                title={lang === 'ne' ? 'पृष्ठको सुरुमा जानुहोस्' : 'Back to top'}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-3.5 h-3.5 text-crimson-800" />
                <span>{lang === 'ne' ? 'पृष्ठको सुरुमा जानुहोस्' : 'Back to top'}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Menu (2-3 Cols) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-civic-950 font-mono">
              {lang === 'ne' ? 'मुख्य मेनु' : 'Menu'}
            </h4>
            <ul className="space-y-2.5 text-sm text-civic-600">
              <li>
                <a href="#hero" className="hover:text-crimson-800 transition-colors">
                  {lang === 'ne' ? 'गृहपृष्ठ' : 'Home'}
                </a>
              </li>
              <li>
                <a href="#biography" className="hover:text-crimson-800 transition-colors">
                  {lang === 'ne' ? 'व्यक्तिगत परिचय' : 'Biography'}
                </a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-crimson-800 transition-colors">
                  {lang === 'ne' ? 'कार्यसम्पादन र योगदान' : 'Key Initiatives'}
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-crimson-800 transition-colors">
                  {lang === 'ne' ? 'नेतृत्व यात्रा' : 'Mandate Timeline'}
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-crimson-800 transition-colors">
                  {lang === 'ne' ? 'समाचार अपडेट' : 'Civic News'}
                </a>
              </li>
              <li>
                <a href="#videos" className="hover:text-crimson-800 transition-colors">
                  {lang === 'ne' ? 'भिडियो प्रसारण' : 'Video Stream'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Constituent Services (2-3 Cols) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-civic-950 font-mono">
              {lang === 'ne' ? 'नागरिक सेवा' : 'Services'}
            </h4>
            <ul className="space-y-2.5 text-sm text-civic-600">
              <li>
                <span className="cursor-default hover:text-crimson-800 transition-colors">
                  {lang === 'ne' ? 'सिफारिस तथा प्रमाणीकरण' : 'Ward Recommendations'}
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-crimson-800 transition-colors">
                  {lang === 'ne' ? 'योजना तथा बजेट अनुगमन' : 'Project Monitoring'}
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-crimson-800 transition-colors">
                  {lang === 'ne' ? 'नागरिक वडापत्र' : 'Citizen Charter'}
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-crimson-800 transition-colors">
                  {lang === 'ne' ? 'सूचनाको हक (RTI)' : 'Right to Information'}
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-crimson-800 transition-colors">
                  {lang === 'ne' ? 'सडक तथा सरसफाइ गुनासो' : 'Sanitation & Roads'}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency & Direct Contacts (3 Cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-civic-950 font-mono">
              {lang === 'ne' ? 'सम्पर्क तथा आपतकालीन' : 'Emergency & Contacts'}
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white/70 border border-civic-200/80">
                <div className="text-[10px] uppercase font-bold text-civic-500">
                  {lang === 'ne' ? 'वडा कार्यालय फोन' : 'Ward Office Desk'}
                </div>
                <div className="font-mono text-sm font-bold text-civic-900 mt-0.5">
                  {civicProfile.phone}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white/70 border border-civic-200/80">
                <div className="text-[10px] uppercase font-bold text-civic-500">
                  {lang === 'ne' ? 'प्रहरी आपतकालीन / नगर' : 'Police Emergency'}
                </div>
                <div className="font-mono text-sm font-bold text-emerald-800 mt-0.5">
                  १०० / ०२३–५४००९९
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white/70 border border-civic-200/80">
                <div className="text-[10px] uppercase font-bold text-civic-500">
                  {lang === 'ne' ? 'एम्बुलेन्स सेवा' : 'Ambulance Hotline'}
                </div>
                <div className="font-mono text-sm font-bold text-crimson-800 mt-0.5">
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
                className="taste-btn flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold shadow-sm"
              >
                <FacebookIcon className="w-3.5 h-3.5 fill-white" />
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={civicProfile.youtubeSearch}
                target="_blank"
                rel="noopener noreferrer"
                className="taste-btn flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#FF0000] hover:bg-[#e60000] text-white text-xs font-bold shadow-sm"
              >
                <YoutubeIcon className="w-3.5 h-3.5 fill-white" />
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>

          </div>

        </div>

        {/* Licence Credits Line (Rule 1 of design-taste-frontend: Licence credits go in one footer line) */}
        <div className="border-t border-civic-300/70 pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-civic-500">
          <div>
            {lang === 'ne' ? 'रोहित प्रसाईं — आधिकारिक नागरिक तथा जनप्रतिनिधि पोर्टल' : 'Rohit Prasai — Official Civic Representative Portal'}
          </div>
          <div>
            {lang === 'ne' 
              ? 'सञ्चार आभार: स्थानीय सञ्चारमाध्यम, झापा गोल्डकप तथा नागरिक अभिलेख।' 
              : 'Media credits: Local civic news portals, Jhapa Gold Cup & public records.'}
          </div>
        </div>

      </div>

    </footer>
  );
};
