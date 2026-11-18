import React from 'react';
import { completedWorksData } from '../data/portfolioData';
import { Language } from '../types';
import { ShieldCheck, Milestone, Trophy, HeartHandshake } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface AchievementsProps {
  lang: Language;
}

export const Achievements: React.FC<AchievementsProps> = ({ lang }) => {
  const getIconConfig = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return {
          icon: <ShieldCheck className="w-5 h-5 text-[#801426] transition-transform duration-200 group-hover:scale-110" />,
          containerClass: 'bg-[#fbf2f4] border-[#f5d0d6] text-[#801426]',
        };
      case 'Milestone':
        return {
          icon: <Milestone className="w-5 h-5 text-[#801426] transition-transform duration-200 group-hover:scale-110" />,
          containerClass: 'bg-[#fbf2f4] border-[#f5d0d6] text-[#801426]',
        };
      case 'Trophy':
        return {
          icon: <Trophy className="w-5 h-5 text-amber-600 transition-transform duration-200 group-hover:scale-110" />,
          containerClass: 'bg-amber-50 border-amber-200 text-amber-600',
        };
      case 'HeartHandshake':
        return {
          icon: <HeartHandshake className="w-5 h-5 text-emerald-600 transition-transform duration-200 group-hover:scale-110" />,
          containerClass: 'bg-emerald-50 border-emerald-200 text-emerald-600',
        };
      default:
        return {
          icon: <ShieldCheck className="w-5 h-5 text-[#801426] transition-transform duration-200 group-hover:scale-110" />,
          containerClass: 'bg-[#fbf2f4] border-[#f5d0d6] text-[#801426]',
        };
    }
  };

  return (
    <section id="works" className="py-20 sm:py-28 bg-white border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className={`text-xs font-mono uppercase font-bold text-[#801426] mb-2 ${
              lang === 'en' ? 'tracking-widest' : 'tracking-normal'
            }`}>
              — {lang === 'ne' ? 'कार्यसम्पादन तथा परिणाम' : 'PUBLIC RECORD & IMPACT'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.15]">
              {lang === 'ne' ? 'हालसम्म सम्पन्न भएका मुख्य कामहरू' : 'Key Works Done Till Now'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              {lang === 'ne'
                ? 'कार्यालय समयको अनुशासनदेखि अन्तर-पालिका पूर्वाधार, रक्तदान अभियान र प्रतिष्ठित झापा गोल्डकप फुटबलको संरक्षकत्वसम्मका मुख्य पहलहरू।'
                : 'From pioneering municipal punctuality to inter-ward drainage, community blood drives, and football tournament patronage.'}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Impact Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 font-sans">
          {completedWorksData.map((item, idx) => {
            const iconConfig = getIconConfig(item.iconName);
            return (
              <ScrollReveal key={item.id} delay={idx * 80}>
                <div
                  className="taste-card bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between group hover:border-[#801426]/40 hover:bg-white hover:shadow-sm transition-all duration-300 h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className={`w-11 h-11 rounded-xl ${iconConfig.containerClass} border flex items-center justify-center transition-all duration-200 shadow-2xs`}>
                        {iconConfig.icon}
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600">
                        {lang === 'ne' ? item.subtitleNe : item.subtitleEn}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg sm:text-xl text-[#0f172a] mb-3 group-hover:text-[#801426] transition-colors leading-snug">
                      {lang === 'ne' ? item.titleNe : item.titleEn}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {lang === 'ne' ? item.descriptionNe : item.descriptionEn}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-[#801426] bg-[#fbf2f4] px-2.5 py-0.5 rounded-full border border-[#f5d0d6]">
                      {lang === 'ne' ? item.metricsNe : item.metricsEn}
                    </span>
                    <span className={`text-[11px] font-bold uppercase text-slate-400 group-hover:text-[#801426] group-hover:translate-x-0.5 transition-all ${
                      lang === 'en' ? 'tracking-wider' : 'tracking-normal'
                    }`}>
                      {lang === 'ne' ? 'प्रमाणित अभिलेख →' : 'Verified Record →'}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
