import React from 'react';
import { keyAchievements } from '../data/portfolioData';
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
          containerClass: 'bg-[#fef3c7] border-[#fde68a] text-amber-600',
        };
      case 'HeartHandshake':
        return {
          icon: <HeartHandshake className="w-5 h-5 text-emerald-600 transition-transform duration-200 group-hover:scale-110" />,
          containerClass: 'bg-[#ecfdf5] border-[#a7f3d0] text-emerald-600',
        };
      default:
        return {
          icon: <ShieldCheck className="w-5 h-5 text-[#801426] transition-transform duration-200 group-hover:scale-110" />,
          containerClass: 'bg-[#fbf2f4] border-[#f5d0d6] text-[#801426]',
        };
    }
  };

  return (
    <section id="achievements" className="py-16 md:py-24 bg-[#faf8f5] border-b border-[#e2dcd0] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Editorial Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight leading-[1.3] ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
              {lang === 'ne' ? 'बिर्तामोडका लागि ठोस काम र प्रतिबद्धता' : 'Tangible Milestones for Birtamod'}
            </h2>
            
            <p className="mt-3 text-[#475569] text-sm sm:text-base font-sans leading-relaxed">
              {lang === 'ne'
                ? 'कार्यालय समयको अनुशासनदेखि अन्तर-पालिका पूर्वाधार, रक्तदान अभियान र प्रतिष्ठित झापा गोल्डकप फुटबलको संरक्षकत्वसम्मका मुख्य पहलहरू।'
                : 'From pioneering municipal punctuality to inter-ward drainage, community blood drives, and football tournament patronage.'}
            </p>
            <div className="w-12 h-0.5 bg-[#801426] mt-4" />
          </div>
        </ScrollReveal>

        {/* 4 Impact Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 font-sans">
          {keyAchievements.map((item, idx) => {
            const iconConfig = getIconConfig(item.iconName);
            return (
              <ScrollReveal key={item.id} delay={idx * 80}>
                <div
                  className="taste-card bg-white rounded-xl p-6 sm:p-7 border border-[#e2dcd0] shadow-sm flex flex-col justify-between group hover:border-[#801426]/50 hover:shadow-md transition-all duration-300 h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className={`w-10 h-10 rounded-lg ${iconConfig.containerClass} border flex items-center justify-center transition-all duration-200 group-hover:shadow-xs`}>
                        {iconConfig.icon}
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#f1f5f9] text-[#475569]">
                        {lang === 'ne' ? item.subtitleNe : item.subtitleEn}
                      </span>
                    </div>

                    <h3 className={`font-bold text-lg sm:text-xl text-[#0f172a] mb-2.5 group-hover:text-[#801426] transition-colors ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
                      {lang === 'ne' ? item.titleNe : item.titleEn}
                    </h3>

                    <p className="text-sm text-[#334155] leading-relaxed">
                      {lang === 'ne' ? item.descriptionNe : item.descriptionEn}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-[#801426] bg-[#fbf2f4] px-2.5 py-0.5 rounded-full border border-[#f5d0d6]">
                      {lang === 'ne' ? item.metricsNe : item.metricsEn}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] group-hover:text-[#801426] group-hover:translate-x-0.5 transition-all">
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
