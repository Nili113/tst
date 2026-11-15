import React from 'react';
import { keyAchievements } from '../data/portfolioData';
import { Language } from '../types';
import { ShieldCheck, Milestone, Trophy, HeartHandshake } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface AchievementsProps {
  lang: Language;
}

export const Achievements: React.FC<AchievementsProps> = ({ lang }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-crimson-800" />;
      case 'Milestone':
        return <Milestone className="w-5 h-5 text-crimson-800" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-emerald-700" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-crimson-800" />;
    }
  };

  return (
    <section id="achievements" className="py-16 md:py-24 bg-[#faf8f5] border-b border-civic-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Editorial Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-civic-950 tracking-tight leading-[1.3] ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
              {lang === 'ne' ? 'बिर्तामोडका लागि ठोस काम र प्रतिबद्धता' : 'Tangible Milestones for Birtamod'}
            </h2>
            
            <p className="mt-3 text-civic-600 text-sm sm:text-base font-sans leading-relaxed">
              {lang === 'ne'
                ? 'कार्यालय समयको अनुशासनदेखि अन्तर-पालिका पूर्वाधार, रक्तदान अभियान र प्रतिष्ठित झापा गोल्डकप फुटबलको संरक्षकत्वसम्मका मुख्य पहलहरू।'
                : 'From pioneering municipal punctuality to inter-ward drainage, community blood drives, and football tournament patronage.'}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Impact Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 font-sans">
          {keyAchievements.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 80}>
              <div
                className="taste-card bg-white rounded-xl p-6 sm:p-7 border border-civic-200/90 shadow-sm flex flex-col justify-between group hover:border-crimson-800/40 h-full"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-sand-100 flex items-center justify-center group-hover:bg-crimson-50 transition-colors">
                      {getIcon(item.iconName)}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-civic-100 text-civic-700">
                      {lang === 'ne' ? item.subtitleNe : item.subtitleEn}
                    </span>
                  </div>

                  <h3 className={`font-bold text-lg sm:text-xl text-civic-950 mb-2.5 group-hover:text-crimson-900 transition-colors ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
                    {lang === 'ne' ? item.titleNe : item.titleEn}
                  </h3>

                  <p className="text-sm text-civic-600 leading-relaxed">
                    {lang === 'ne' ? item.descriptionNe : item.descriptionEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-civic-100 flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-crimson-800 bg-crimson-50 px-2 py-0.5 rounded">
                    {lang === 'ne' ? item.metricsNe : item.metricsEn}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-civic-400 group-hover:text-crimson-800 transition-colors">
                    {lang === 'ne' ? 'प्रमाणित अभिलेख →' : 'Verified Record →'}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
