import React from 'react';
import { missionVisionData } from '../data/portfolioData';
import { Language } from '../types';
import { Compass, Target } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { SectionHeader } from './SectionHeader';
import { Rich } from '../lib/typo';

interface MissionVisionProps {
  lang: Language;
}

export const MissionVision: React.FC<MissionVisionProps> = ({ lang }) => {
  const ne = lang === 'ne';
  const items = [
    {
      icon: Compass,
      title: ne ? missionVisionData.vision.titleNe : missionVisionData.vision.titleEn,
      text: ne ? missionVisionData.vision.textNe : missionVisionData.vision.textEn,
      tag: ne ? 'दीर्घकालीन संकल्प • नमुना बिर्तामोड–५' : 'Long-term horizon • Model Birtamod-5',
    },
    {
      icon: Target,
      title: ne ? missionVisionData.mission.titleNe : missionVisionData.mission.titleEn,
      text: ne ? missionVisionData.mission.textNe : missionVisionData.mission.textEn,
      tag: ne ? 'दैनिक अभ्यास • शून्य ढिलाइ' : 'Operational practice • Zero bureaucratic delay',
    },
  ];

  return (
    <section id="mission" className="py-16 sm:py-24 bg-ivory-section font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={ne ? 'मार्गदर्शन तथा संकल्प' : 'Guiding principles'}
          title={ne ? missionVisionData.headlineNe : missionVisionData.headlineEn}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-stone-300/70">
          {items.map(({ icon: Icon, title, text, tag }, i) => (
            <ScrollReveal
              key={title}
              delay={i * 90}
              className={`pt-8 sm:pt-10 pb-2 md:pb-4 ${i === 0 ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16 md:border-l border-stone-300/70 mt-6 md:mt-0 border-t md:border-t-0'}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white border border-stone-200 text-maroon grid place-items-center shadow-[0_1px_2px_rgba(28,25,23,0.05)]">
                  <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                </span>
                <h3 className="text-2xl sm:text-[28px] font-bold text-ink tracking-tight">{title}</h3>
              </div>
              <p className="mt-5 text-base sm:text-[17px] text-stone-700 leading-[1.75] max-w-[60ch]">
                <Rich text={text} />
              </p>
              <p className="mt-6 text-[13px] font-semibold text-maroon">{tag}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
