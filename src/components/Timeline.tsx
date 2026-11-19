import React from 'react';
import { timelineMilestones } from '../data/portfolioData';
import { Language } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface TimelineProps {
  lang: Language;
}

export const Timeline: React.FC<TimelineProps> = ({ lang }) => {
  return (
    <section id="timeline" className="py-16 md:py-24 bg-[#faf8f5] border-b border-[#e2dcd0] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Editorial Section Header */}
        <ScrollReveal>
          <div className="mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight leading-[1.3] ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
              {lang === 'ne' ? '२०७९ देखिको नेतृत्व यात्रा' : 'Leadership Timeline (2022 – Present)'}
            </h2>
            <p className="mt-3 text-base text-[#475569] max-w-2xl font-sans">
              {lang === 'ne'
                ? 'जनअनुमोदन, समयपालन सुधार, पूर्वाधार विस्तार र जनसरोकारका ऐतिहासिक चरणहरू'
                : 'Electoral victory, governance reforms, drainage infrastructure, and civic stewardship'}
            </p>
            <div className="w-12 h-0.5 bg-[#801426] mt-4" />
          </div>
        </ScrollReveal>

        {/* Pixel-Perfect Aligned Chronological Rail */}
        <div className="relative font-sans max-w-4xl">
          {/* Continuous Vertical Rail Line */}
          <div className="absolute top-2 bottom-2 left-3 sm:left-5 w-0.5 bg-[#cbd5e1]" />

          <div className="space-y-8 sm:space-y-10">
            {timelineMilestones.map((item, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="relative flex items-start group">
                  
                  {/* Pin centered on vertical line */}
                  <div className="absolute left-3 sm:left-5 -translate-x-1/2 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-[#801426] flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-[#801426] transition-all z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#801426] group-hover:bg-white transition-colors" />
                  </div>

                  {/* Milestone Content Box */}
                  <div className="ml-8 sm:ml-12 flex-1">
                    <div className="taste-card p-5 sm:p-6 rounded-xl bg-white border border-[#e2dcd0] shadow-2xs group-hover:border-[#801426]/40 transition-all">
                      
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-bold text-[#801426] bg-[#fbf2f4] px-2.5 py-0.5 rounded-full border border-[#f5d0d6]">
                          {lang === 'ne' ? item.yearNe : item.yearEn}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#f1f5f9] text-[#475569]">
                          {lang === 'ne' ? item.badgeNe : item.badgeEn}
                        </span>
                      </div>

                      <h3 className={`font-bold text-base sm:text-lg text-[#0f172a] mb-2 leading-snug group-hover:text-[#801426] transition-colors ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
                        {lang === 'ne' ? item.titleNe : item.titleEn}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                        {lang === 'ne' ? item.descriptionNe : item.descriptionEn}
                      </p>

                    </div>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
