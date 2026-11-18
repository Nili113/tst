import React from 'react';
import { civicInsightsData } from '../data/portfolioData';
import { Language } from '../types';
import { Lightbulb, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface InsightsSectionProps {
  lang: Language;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ lang }) => {
  return (
    <section id="insights" className="py-20 sm:py-28 bg-white border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-mono uppercase tracking-widest text-[#801426] font-bold mb-2">
              — {lang === 'ne' ? 'नागरिक चिन्तन तथा दृष्टिकोण' : 'CIVIC PERSPECTIVES'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.15]">
              {lang === 'ne' ? 'जनअन्तर्दृष्टि तथा दृष्टिकोण' : 'Civic Insights & Governance Thoughts'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              {lang === 'ne'
                ? 'स्थानीय अर्थतन्त्र, युवा ऊर्जा र पारदर्शी राजनीतिको सम्बन्धमा वडाध्यक्ष रोहित प्रसाईंका अनुभवजन्य दृष्टिकोणहरू।'
                : 'Key practical perspectives on youth enterprise, local economic resilience, and clean, transparent public governance.'}
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Insight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {civicInsightsData.map((item, idx) => (
            <ScrollReveal key={item.id} delay={100 + idx * 80}>
              <div className="taste-card p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs hover:border-[#801426]/40 hover:shadow-sm transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#801426]">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold text-[#0f172a] mb-3 leading-snug ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
                    {lang === 'ne' ? item.titleNe : item.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {lang === 'ne' ? item.descNe : item.descEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-[#801426]">
                  <span>{lang === 'ne' ? 'नेतृत्व दर्शन' : 'Core Philosophy'}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
