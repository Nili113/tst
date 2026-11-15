import React from 'react';
import { civicProfile } from '../data/portfolioData';
import { Language } from '../types';
import { CheckCircle2, Shield, Trophy, ArrowRight, MessageSquare } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenDesk: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenDesk }) => {
  return (
    <section className="relative min-h-[calc(100vh-60px)] flex items-center bg-[#faf8f4] pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 border-b border-civic-200/80 overflow-hidden font-sans">
      
      {/* Layer 1: Ambient Civic Warmth Radial Light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(153,27,27,0.06),rgba(250,248,244,0))] pointer-events-none" />

      {/* Layer 2: Subtle Topographic & Civic Lines Backdrop */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path d="M0,200 Q360,120 720,240 T1440,160" fill="none" stroke="#000" strokeWidth="1.5" />
        <path d="M0,380 Q360,300 720,420 T1440,340" fill="none" stroke="#000" strokeWidth="1.5" />
        <path d="M0,560 Q360,480 720,600 T1440,520" fill="none" stroke="#000" strokeWidth="1.5" />
        <path d="M0,740 Q360,660 720,780 T1440,700" fill="none" stroke="#000" strokeWidth="1.5" />
      </svg>

      {/* Layer 3: Soft Golden Light Accent in Top Right */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/[0.04] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-center">
          
          {/* Portrait Column (Photo First on Mobile, Proportional & Above the Fold!) */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[210px] xs:max-w-[250px] sm:max-w-xs lg:max-w-md">
              
              {/* Subtle back decorative glow */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-amber-600/20 via-crimson-800/10 to-transparent blur-md -z-10" />

              <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-xl border border-civic-200/90 taste-image-frame relative">
                <img
                  src="/images/rohit-prasai-portrait.jpg"
                  alt={civicProfile.nameEn}
                  className="w-full h-52 xs:h-60 sm:h-72 md:h-80 lg:h-[490px] object-cover object-top"
                  loading="eager"
                />

                {/* Mandate Floating Badge on Photo */}
                <div className="absolute top-2.5 right-2.5 bg-civic-950/85 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-semibold text-white border border-white/10 shadow-sm">
                  {lang === 'ne' ? '२०७९ – २०८४' : '2022 – 2027'}
                </div>
              </div>
            </div>
          </div>

          {/* Writings Column (Order 2 on Mobile, Order 1 on Desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            {/* Main Headline — Distinguished Typography */}
            <div className="space-y-2 sm:space-y-3">
              
              {/* Name */}
              <h1 className={`tracking-tight text-civic-950 block ${
                lang === 'en'
                  ? 'font-serif font-black text-4xl sm:text-6xl lg:text-7xl xl:text-[76px] leading-[1.08]'
                  : 'font-nepali font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.22] pb-0.5'
              }`}>
                {lang === 'ne' ? civicProfile.nameNe : civicProfile.nameEn}
              </h1>

              {/* Single Cohesive Designation & Municipality line */}
              <div className="text-lg sm:text-2xl font-semibold text-crimson-800 tracking-tight">
                {lang === 'ne' 
                  ? `${civicProfile.roleNe} • बिर्तामोड नगरपालिका, वडा नं. ५`
                  : `${civicProfile.roleEn} • Birtamod Municipality, Ward No. 5`}
              </div>

              {/* Civic Mandate Subtitle */}
              <div className="text-xs sm:text-sm font-medium text-civic-500">
                {lang === 'ne' 
                  ? 'नेपाली कांग्रेस • स्थानीय तह कार्यकाल २०७९–२०८४' 
                  : 'Nepali Congress • Municipal Term 2022–2027'}
              </div>
            </div>

            {/* Ethos Statement */}
            <p className="text-sm sm:text-base lg:text-lg text-civic-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal pt-0.5">
              {lang === 'ne' ? civicProfile.taglineNe : civicProfile.taglineEn}
            </p>

            {/* Civic Commitments: Clean Minimal Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1 text-left">
              <div className="p-3 sm:p-4 rounded-xl bg-white/95 border border-civic-200/80 shadow-xs flex items-start gap-2.5 sm:gap-3 backdrop-blur-xs">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-civic-900">
                    {lang === 'ne' ? 'समयपालन अडान' : 'Strict Punctuality'}
                  </div>
                  <div className="text-[11px] text-civic-500 mt-0.5 leading-snug">
                    {lang === 'ne' ? 'नागरिक सेवामा शून्य ढिलाइ' : 'Zero bureaucratic delay'}
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-white/95 border border-civic-200/80 shadow-xs flex items-start gap-2.5 sm:gap-3 backdrop-blur-xs">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-crimson-800 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-civic-900">
                    {lang === 'ne' ? 'प्रत्यक्ष खुला सेवा' : 'Direct Public Desk'}
                  </div>
                  <div className="text-[11px] text-civic-500 mt-0.5 leading-snug">
                    {lang === 'ne' ? 'नागरिकसँग प्रत्यक्ष संवाद' : 'Direct citizen access'}
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-white/95 border border-civic-200/80 shadow-xs flex items-start gap-2.5 sm:gap-3 backdrop-blur-xs">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-civic-900">
                    {lang === 'ne' ? 'खेलकुद र युवा' : 'Sports & Youth'}
                  </div>
                  <div className="text-[11px] text-civic-500 mt-0.5 leading-snug">
                    {lang === 'ne' ? 'झापा गोल्डकप संरक्षण' : 'Gold Cup tournament patron'}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Callouts */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-2">
              <button
                onClick={onOpenDesk}
                className="taste-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-crimson-800 text-white font-semibold text-xs sm:text-sm hover:bg-crimson-900 shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{lang === 'ne' ? 'नागरिक सहायता तथा गुनासो दर्ता' : 'Citizen Assistance Desk'}</span>
              </button>

              <a
                href="#achievements"
                className="taste-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-civic-300 text-civic-800 font-semibold text-xs sm:text-sm hover:bg-sand-100 shadow-xs transition-all"
              >
                <span>{lang === 'ne' ? 'सार्वजनिक कार्यहरू' : 'Explore Public Work'}</span>
                <ArrowRight className="w-4 h-4 text-civic-500" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
