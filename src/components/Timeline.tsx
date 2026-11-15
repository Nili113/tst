import React from 'react';
import { timelineMilestones } from '../data/portfolioData';
import { Language } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface TimelineProps {
  lang: Language;
}

export const Timeline: React.FC<TimelineProps> = ({ lang }) => {
  return (
    <section id="timeline" className="py-16 md:py-24 bg-white border-b border-civic-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Editorial Section Header */}
        <ScrollReveal>
          <div className="mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-civic-950 tracking-tight leading-[1.3] ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
              {lang === 'ne' ? '२०७९ देखिको नेतृत्व यात्रा' : 'Leadership Timeline (2022 – Present)'}
            </h2>
            <p className="mt-3 text-base text-civic-600 max-w-2xl font-sans">
              {lang === 'ne'
                ? 'जनअनुमोदन, समयपालन सुधार, पूर्वाधार विस्तार र जनसरोकारका ऐतिहासिक चरणहरू'
                : 'Electoral victory, governance reforms, drainage infrastructure, and civic stewardship'}
            </p>
            <div className="w-12 h-0.5 bg-crimson-800 mt-4" />
          </div>
        </ScrollReveal>

        {/* Pixel-Perfect Aligned Chronological Rail */}
        <div className="relative font-sans max-w-4xl">
          {/* Continuous Vertical Rail Line */}
          <div className="absolute top-2 bottom-2 left-3 sm:left-5 w-0.5 bg-civic-200" />

          <div className="space-y-8 sm:space-y-10">
            {timelineMilestones.map((item, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="relative flex items-start group">
                  
                  {/* Pin centered on vertical line */}
                  <div className="absolute left-3 sm:left-5 -translate-x-1/2 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-crimson-800 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-crimson-800 transition-all z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-crimson-800 group-hover:bg-white transition-colors" />
                  </div>

                  {/* Milestone Content Box */}
                  <div className="ml-8 sm:ml-12 flex-1">
                    <div className="taste-card p-5 sm:p-6 rounded-xl bg-[#faf8f5] border border-civic-200/90 shadow-2xs group-hover:border-crimson-800/40 group-hover:bg-white transition-all">
                      
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-bold text-crimson-800 bg-crimson-50 px-2.5 py-0.5 rounded-full">
                          {lang === 'ne' ? item.yearNe : item.yearEn}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sand-100 text-civic-700">
                          {lang === 'ne' ? item.badgeNe : item.badgeEn}
                        </span>
                      </div>

                      <h3 className={`font-bold text-base sm:text-lg text-civic-950 mb-2 leading-snug group-hover:text-crimson-900 transition-colors ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
                        {lang === 'ne' ? item.titleNe : item.titleEn}
                      </h3>

                      <p className="text-xs sm:text-sm text-civic-600 leading-relaxed">
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
