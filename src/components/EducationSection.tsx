import React from 'react';
import { educationProfile } from '../data/portfolioData';
import { Language } from '../types';
import { GraduationCap, Briefcase, Award, Building2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface EducationSectionProps {
  lang: Language;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ lang }) => {
  return (
    <section id="education" className="py-16 md:py-24 bg-[#faf8f5] border-b border-[#e2dcd0] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight leading-[1.3] ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
              {lang === 'ne' ? educationProfile.headlineNe : educationProfile.headlineEn}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#475569] max-w-2xl font-sans leading-relaxed">
              {lang === 'ne' ? educationProfile.subtitleNe : educationProfile.subtitleEn}
            </p>
            <div className="w-12 h-0.5 bg-[#801426] mt-4" />
          </div>
        </ScrollReveal>

        {/* 2-Column Academic & Enterprise Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
          
          {/* Card 1: Academic Foundation (Silver Mountain) */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={100} className="h-full">
              <div className="taste-card h-full bg-white rounded-2xl p-6 sm:p-8 border border-[#e2dcd0] shadow-sm hover:border-[#801426]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fbf2f4] text-[#801426] border border-[#f5d0d6] text-xs font-mono font-bold">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{lang === 'ne' ? educationProfile.academic.yearNe : educationProfile.academic.yearEn}</span>
                    </span>
                    <span className="text-xs font-semibold text-[#64748b] bg-[#f1f5f9] px-2.5 py-0.5 rounded-full">
                      {lang === 'ne' ? educationProfile.academic.locationNe : educationProfile.academic.locationEn}
                    </span>
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-bold text-[#0f172a] mb-2 leading-snug ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
                    {lang === 'ne' ? educationProfile.academic.institutionNe : educationProfile.academic.institutionEn}
                  </h3>

                  <div className="text-xs sm:text-sm font-semibold text-[#801426] mb-4">
                    {lang === 'ne' ? educationProfile.academic.degreeNe : educationProfile.academic.degreeEn}
                  </div>

                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                    {lang === 'ne' ? educationProfile.academic.descriptionNe : educationProfile.academic.descriptionEn}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#f1f5f9] flex items-center gap-2 text-xs font-semibold text-[#475569]">
                  <Award className="w-4 h-4 text-[#801426] shrink-0" />
                  <span>
                    {lang === 'ne' ? 'आतिथ्य सत्कार, नेतृत्व तथा संगठनात्मक व्यवस्थापन' : 'Hospitality, Leadership & Public Logistics'}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Card 2: Enterprise & Community Economy (Mata Pathivara Traders) */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={200} className="h-full">
              <div className="taste-card h-full bg-white rounded-2xl p-6 sm:p-8 border border-[#e2dcd0] shadow-sm hover:border-[#801426]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fde68a] text-xs font-mono font-bold">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{lang === 'ne' ? 'उद्यमशीलता' : 'Enterprise'}</span>
                    </span>
                    <span className="text-xs font-semibold text-[#64748b] bg-[#f1f5f9] px-2.5 py-0.5 rounded-full">
                      {lang === 'ne' ? educationProfile.enterprise.locationNe : educationProfile.enterprise.locationEn}
                    </span>
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-bold text-[#0f172a] mb-2 leading-snug ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
                    {lang === 'ne' ? educationProfile.enterprise.nameNe : educationProfile.enterprise.nameEn}
                  </h3>

                  <div className="text-xs sm:text-sm font-semibold text-[#801426] mb-4">
                    {lang === 'ne' ? educationProfile.enterprise.roleNe : educationProfile.enterprise.roleEn}
                  </div>

                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                    {lang === 'ne' ? educationProfile.enterprise.descriptionNe : educationProfile.enterprise.descriptionEn}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#f1f5f9] flex items-center gap-2 text-xs font-semibold text-[#475569]">
                  <Building2 className="w-4 h-4 text-[#801426] shrink-0" />
                  <span>
                    {lang === 'ne' ? 'आर्थिक आत्मनिर्भरता र युवा रोजगारी प्रवर्द्धन' : 'Economic Self-Reliance & Youth Employment'}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* 3 Core Principles Connecting Education to Governance */}
        <ScrollReveal delay={250}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {educationProfile.principles.map((p, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-xl bg-white border border-[#e2dcd0] shadow-xs hover:border-[#801426]/40 transition-all"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-[#801426] text-white flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                    0{idx + 1}
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-[#0f172a]">
                    {lang === 'ne' ? p.titleNe : p.titleEn}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {lang === 'ne' ? p.descNe : p.descEn}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
