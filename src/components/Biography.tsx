import React from 'react';
import { autobiographyData, civicProfile } from '../data/portfolioData';
import { Language } from '../types';
import { Award, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface BiographyProps {
  lang: Language;
}

export const Biography: React.FC<BiographyProps> = ({ lang }) => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className={`text-xs font-mono uppercase font-semibold text-[#801426] mb-2 ${
              lang === 'en' ? 'tracking-[0.2em]' : 'tracking-normal'
            }`}>
              — {lang === 'ne' ? 'पृष्ठभूमि तथा यात्रा' : 'AUTOBIOGRAPHY & ROOTS'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.15]">
              {lang === 'ne' ? autobiographyData.headlineNe : autobiographyData.headlineEn}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Narrative Column (7 cols) - Balanced & Substantive */}
          <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed font-sans">
            
            <ScrollReveal delay={100}>
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed">
                {lang === 'ne'
                  ? 'झापा बिर्तामोड–५ को सामाजिक, शैक्षिक तथा व्यावसायिक पृष्ठभूमिबाट अघि बढ्दै वि.सं. २०६२ देखि नेपाली कांग्रेसमा क्रियाशील रही २०७९ को स्थानीय तह निर्वाचनमार्फत वडाध्यक्षमा निर्वाचित भएको हुँ।'
                  : 'Rooted in the civic, educational, and enterprise fabric of Birtamod-5, active in the democratic movement with Nepali Congress since 2062 BS (2005), and elected Ward Chairperson in 2022.'}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lang === 'ne'
                  ? 'कन्काई बोर्डिङ, ग्लोबल कलेज हुँदै सिलभर माउण्टेनबाट होटल म्यानेजमेन्ट स्नातक र अष्ट्रेलियाबाट अन्तर्राष्ट्रिय डिप्लोमा अध्ययनले मलाई योजना, अनुशासन र कुशल व्यवस्थापनको दृष्टिकोण दियो। यही अनुभवलाई स्थानीय तहको सुशासन र पूर्वाधार विकासमा उपयोग गरिरहेको छु।'
                  : 'Academic training at Kankai Boarding, Global College, Silver Mountain School of Hotel Management, and professional diploma studies in Australia provided a strong foundation in logistical discipline, event governance, and public administration.'}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lang === 'ne'
                  ? 'कार्यालय समयको कडा अनुशासन, नागरिक सेवामा शून्य ढिलाइ, डोमालाल रंगशालाको स्तरोन्नति, झापा गोल्डकपको संरक्षकत्व र आवास मार्ग ढल निकास जस्ता दिगो विकासका कामहरू हाम्रो निरन्तर प्राथमिकता हुन्।'
                  : 'Strict municipal punctuality, zero bureaucratic delay for constituents, permanent stormwater engineering for Aawas Marg, and revitalizing sports tourism through Jhapa Gold Cup at Domalal Stadium remain core delivery mandates.'}
              </p>
            </ScrollReveal>

            {/* Direct Philosophy Quote */}
            <ScrollReveal delay={160}>
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border-l-4 border-[#801426] border-y border-r border-slate-200">
                <p className="font-serif italic text-base sm:text-lg text-[#0f172a] leading-relaxed">
                  {lang === 'ne' ? autobiographyData.philosophyNe : autobiographyData.philosophyEn}
                </p>
                <div className="mt-3 text-xs font-semibold text-[#801426] font-mono">
                  — {lang === 'ne' ? civicProfile.nameNe : civicProfile.nameEn} (वडा अध्यक्ष, बिर्तामोड–५)
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Quick Facts Sidebar (Right Column - 5 cols) - Concise Bullet Cards */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={200} direction="left">
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                
                <h3 className={`text-sm font-bold text-[#0f172a] uppercase ${
                  lang === 'en' ? 'tracking-wider' : 'tracking-normal'
                }`}>
                  {lang === 'ne' ? 'मुख्य विवरण' : 'Key Facts'}
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  
                  <div className="flex items-start gap-3 pb-3 border-b border-slate-200/80">
                    <Award className="w-4 h-4 text-[#801426] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#0f172a]">
                        {lang === 'ne' ? 'स्थानीय तह निर्वाचन २०७९' : 'Elected Ward Chair (2022)'}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {lang === 'ne' ? 'नेपाली कांग्रेसका तर्फबाट निर्वाचित' : 'Mandate: 2022 – 2027'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-3 border-b border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#0f172a]">
                        {lang === 'ne' ? 'नेपाली कांग्रेस आबद्धता' : 'Nepali Congress'}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {lang === 'ne' ? 'वि.सं. २०६२ देखि क्रियाशील सदस्य' : 'Active Member since 2062 BS'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pb-3 border-b border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#0f172a]">
                        {lang === 'ne' ? 'सामाजिक संस्था' : 'Civic Memberships'}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {lang === 'ne' ? 'बिर्ता जेसिज तथा नेपाल रेडक्रस' : 'Birta Jaycees & Nepal Red Cross'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#0f172a]">
                        {lang === 'ne' ? 'खेलकुद प्रवर्द्धन' : 'Sports Patronage'}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {lang === 'ne' ? 'झापा गोल्डकप तथा डोमालाल रंगशाला' : 'Jhapa Gold Cup & Domalal Stadium'}
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
