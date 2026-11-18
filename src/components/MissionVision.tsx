import React from 'react';
import { missionVisionData } from '../data/portfolioData';
import { Language } from '../types';
import { Compass, Target } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface MissionVisionProps {
  lang: Language;
}

export const MissionVision: React.FC<MissionVisionProps> = ({ lang }) => {
  return (
    <section id="mission" className="py-16 sm:py-24 bg-white border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className={`text-xs font-mono uppercase font-semibold text-[#801426] mb-2 ${lang === 'en' ? 'tracking-[0.2em]' : 'tracking-normal'
              }`}>
              — {lang === 'ne' ? 'मार्गदर्शन तथा संकल्प' : 'GUIDING PRINCIPLES'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.15]">
              {lang === 'ne' ? missionVisionData.headlineNe : missionVisionData.headlineEn}
            </h2>
          </div>
        </ScrollReveal>

        {/* 2 Clean Cards: Vision & Mission (Concise & Focused) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          {/* Vision Card */}
          <ScrollReveal delay={100} className="h-full">
            <div className="taste-card h-full p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-[#801426]/30 transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#fbf2f4] border border-[#f5d0d6] flex items-center justify-center text-[#801426] mb-5">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0f172a] mb-2.5">
                  {lang === 'ne' ? missionVisionData.vision.titleNe : missionVisionData.vision.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  {lang === 'ne' ? missionVisionData.vision.textNe : missionVisionData.vision.textEn}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200/60 text-xs font-mono font-semibold text-[#801426]">
                {lang === 'ne' ? 'दीर्घकालीन संकल्प • नमुना बिर्तामोड–५' : 'Long-Term Horizon • Model Birtamod-5'}
              </div>
            </div>
          </ScrollReveal>

          {/* Mission Card */}
          <ScrollReveal delay={200} className="h-full">
            <div className="taste-card h-full p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-[#801426]/30 transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#fbf2f4] border border-[#f5d0d6] flex items-center justify-center text-[#801426] mb-5">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0f172a] mb-2.5">
                  {lang === 'ne' ? missionVisionData.mission.titleNe : missionVisionData.mission.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  {lang === 'ne' ? missionVisionData.mission.textNe : missionVisionData.mission.textEn}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200/60 text-xs font-mono font-semibold text-[#801426]">
                {lang === 'ne' ? 'दैनिक अभ्यास • शून्य ढिलाइ' : 'Operational Practice • Zero Bureaucratic Delay'}
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
