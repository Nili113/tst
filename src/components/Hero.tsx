import React from 'react';
import { civicProfile } from '../data/portfolioData';
import { Language } from '../types';
import { MessageSquare, ArrowRight, Award } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenDesk: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenDesk }) => {
  return (
    <section id="home" className="relative bg-white pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 border-b border-slate-100 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Balanced Editorial Layout (Matching Pravash Thapa Magar Reference) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTAs (7 cols on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            
            {/* Top Tracker Line (No letter-spacing in Nepali to prevent text splitting) */}
            <div className={`text-xs font-mono uppercase font-semibold text-[#801426] ${
              lang === 'en' ? 'tracking-[0.2em]' : 'tracking-normal'
            }`}>
              — {lang === 'ne' ? 'बिर्तामोड, झापा, कोशी प्रदेश, नेपाल' : 'BIRTAMODE, JHAPA, KOSHI PROVINCE, NEPAL'}
            </div>

            {/* Main Headline */}
            <div className="space-y-1.5 sm:space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f172a] tracking-tight leading-[1.08]">
                {lang === 'ne' ? civicProfile.nameNe : civicProfile.nameEn}
              </h1>

              {/* Refined Subtitle */}
              <div className="text-base sm:text-xl font-semibold text-[#801426] tracking-normal">
                {lang === 'ne' ? 'सार्वजनिक परिचय • वडा अध्यक्ष' : 'Public Representative • Ward Chairperson'}
              </div>
            </div>

            {/* Civic Mandate Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
              <Award className="w-3.5 h-3.5 text-[#801426]" />
              <span>
                {lang === 'ne' 
                  ? 'नेपाली कांग्रेस (वि.सं. २०६२ देखि) • कार्यकाल २०७९–२०८४' 
                  : 'Nepali Congress (Since 2062 BS) • Mandate 2022–2027'}
              </span>
            </div>

            {/* Concise 2-Line Summary (No Wall of Text!) */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl font-sans">
              {lang === 'ne' 
                ? 'बिर्तामोड नगरपालिका वडा नं. ५ का निर्वाचित वडाध्यक्ष। पारदर्शी सुशासन, समयपालन र नागरिक सेवामा समर्पित।' 
                : 'Elected Ward Chairperson of Birtamod Municipality Ward No. 5. Committed to transparent governance, strict punctuality, and public service.'}
            </p>

            {/* Clean Pill Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenDesk}
                className="taste-btn inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#420c15] hover:bg-[#30080f] text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>{lang === 'ne' ? 'नागरिक सहायता डेस्क' : 'Citizen Assistance Desk'}</span>
              </button>

              <a
                href="#works"
                className="taste-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm shadow-2xs transition-all"
              >
                <span>{lang === 'ne' ? 'कार्यसम्पादन विवरण' : 'Explore Public Works'}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

          </div>

          {/* Right Column: Dark Maroon Container Card with Photo (5 cols on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[350px] lg:max-w-[380px]">
              
              {/* Dark Maroon Card Container (Pravash Reference Style - Clean, No Distracting Status Dots) */}
              <div className="rounded-[28px] sm:rounded-[32px] p-2.5 sm:p-3 bg-[#420c15] border border-[#5c111e] shadow-2xl">
                
                {/* Photo Frame */}
                <div className="relative rounded-[22px] sm:rounded-[26px] overflow-hidden aspect-[4/5] bg-[#33070f] taste-image-frame">
                  <img
                    src="/images/rohit-prasai-portrait.jpg"
                    alt={civicProfile.nameEn}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />

                  {/* Mandate Floating Badge */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono font-medium text-white/90 border border-white/10 shadow-xs">
                    {lang === 'ne' ? '२०७९ – २०८४' : '2022 – 2027'}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
