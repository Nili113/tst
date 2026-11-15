import React from 'react';
import { civicProfile, bioNarrative } from '../data/portfolioData';
import { Language } from '../types';
import { GraduationCap, Briefcase, Award, CheckCircle } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface BiographyProps {
  lang: Language;
}

export const Biography: React.FC<BiographyProps> = ({ lang }) => {
  return (
    <section id="biography" className="py-16 md:py-24 bg-white border-b border-civic-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean, Non-Colliding Editorial Section Header */}
        <ScrollReveal>
          <div className="mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-civic-950 tracking-tight leading-[1.3] ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
              {lang === 'ne' ? 'नागरिक सेवामा समर्पित नेतृत्व' : 'Public Leadership & Civic Philosophy'}
            </h2>
            <p className="mt-3 text-base text-civic-600 max-w-2xl font-sans">
              {lang === 'ne' 
                ? 'बिर्तामोड–५ को सर्वाङ्गीण विकास, पारदर्शिता र उत्तरदायी स्थानीय सरकार' 
                : 'Constituent governance, public integrity, and sustainable civic progress in Birtamod'}
            </p>
            <div className="w-12 h-0.5 bg-crimson-800 mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Main Story (Left Column - 7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-civic-800 leading-relaxed font-sans">
            
            <ScrollReveal delay={100}>
              <p className="text-base sm:text-lg text-civic-900 font-medium leading-relaxed">
                {lang === 'ne' ? bioNarrative.aboutNe : bioNarrative.aboutEn}
              </p>
            </ScrollReveal>

            {/* Polished Editorial Quote */}
            <ScrollReveal delay={150}>
              <div className="my-8 p-6 sm:p-8 rounded-xl bg-[#f7f5f0] border border-civic-200/70">
                <span className="text-3xl sm:text-4xl font-serif text-crimson-800/40 select-none block leading-none mb-2">“</span>
                <p className="font-serif italic text-lg sm:text-xl text-civic-900 leading-snug">
                  {lang === 'ne' ? bioNarrative.philosophyNe : bioNarrative.philosophyEn}
                </p>
                <div className="mt-4 pt-3 border-t border-civic-200/50 flex items-center justify-between text-xs font-semibold text-crimson-800 tracking-wide font-sans">
                  <span>— {lang === 'ne' ? civicProfile.nameNe : civicProfile.nameEn}</span>
                  <span className="text-civic-500 font-normal">
                    {lang === 'ne' ? 'वडा अध्यक्ष, बिर्तामोड–५' : 'Ward Chairperson, Birtamod-5'}
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-sm sm:text-base text-civic-700 leading-relaxed">
                {lang === 'ne' ? bioNarrative.educationNe : bioNarrative.educationEn}
              </p>
            </ScrollReveal>

            {/* Foundations & Experience Badges */}
            <ScrollReveal delay={250}>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-sand-50 border border-civic-200/80 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-white text-crimson-800 flex items-center justify-center shrink-0 border border-civic-200 shadow-sm">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-civic-900">
                      {lang === 'ne' ? 'सिल्भर माउण्टेन (सन् २००९)' : 'Silver Mountain (2009)'}
                    </div>
                    <div className="text-xs text-civic-600 mt-0.5">
                      {lang === 'ne' ? 'होटल म्यानेजमेन्ट स्नातक' : 'Hotel Management Studies'}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-sand-50 border border-civic-200/80 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-white text-crimson-800 flex items-center justify-center shrink-0 border border-civic-200 shadow-sm">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-civic-900">
                      {lang === 'ne' ? 'माता पाथिभरा ट्रेडर्स' : 'Mata Pathivara Traders'}
                    </div>
                    <div className="text-xs text-civic-600 mt-0.5">
                      {lang === 'ne' ? 'प्रोप्राइटर / स्थानीय उद्यमशीलता' : 'Proprietor & Local Enterprise'}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Quick Facts Sidebar (Right Column - 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal delay={200} direction="left">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#faf8f5] border border-civic-200/80 space-y-6 shadow-sm">
                
                <h3 className={`text-base font-bold text-civic-950 uppercase tracking-wider ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
                  {lang === 'ne' ? 'प्रतिनिधित्व र सार्वजनिक विवरण' : 'Public Profile & Representation'}
                </h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  
                  <div className="flex items-start gap-3 pb-3 border-b border-civic-200/60">
                    <Award className="w-4 h-4 text-crimson-800 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold text-civic-900">
                        {lang === 'ne' ? 'स्थानीय तह निर्वाचन २०७९' : '2022 Municipal Election'}
                      </div>
                      <div className="text-civic-600 text-xs mt-0.5">
                        {lang === 'ne' ? 'नेपाली कांग्रेसका तर्फबाट निर्वाचित वडाध्यक्ष' : 'Elected Ward Chair, Nepali Congress'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-3 border-b border-civic-200/60">
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold text-civic-900">
                        {lang === 'ne' ? 'कार्यालय समयपालन सुधार' : 'Municipal Punctuality Reform'}
                      </div>
                      <div className="text-civic-600 text-xs mt-0.5">
                        {lang === 'ne' ? 'नगरपालिका प्रांगणबाटै प्रत्यक्ष सेवा प्रवाहको ऐतिहासिक पहल' : 'Direct Courtyard Service Desk initiative'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-3 border-b border-civic-200/60">
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold text-civic-900">
                        {lang === 'ne' ? 'आवास मार्ग ढल निर्माण' : 'Aawas Marg Stormwater Drainage'}
                      </div>
                      <div className="text-civic-600 text-xs mt-0.5">
                        {lang === 'ne' ? 'बिर्तामोड–अर्जुनधारा सीमामा संयुक्त अन्तर-पालिका समन्वय' : 'Inter-municipal flood mitigation canal'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-semibold text-civic-900">
                        {lang === 'ne' ? 'झापा गोल्डकप खेलकुद संरक्षण' : 'Jhapa Gold Cup Patronage'}
                      </div>
                      <div className="text-civic-600 text-xs mt-0.5">
                        {lang === 'ne' ? 'डोमालाल रंगशाला स्तरोन्नति तथा खेलाडी सम्मान' : 'Domalal Stadium athletic infrastructure'}
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
