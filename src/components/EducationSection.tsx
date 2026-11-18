import React from 'react';
import { educationMembershipsData } from '../data/portfolioData';
import { Language } from '../types';
import { GraduationCap, Users } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface EducationSectionProps {
  lang: Language;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ lang }) => {
  return (
    <section id="education" className="py-20 sm:py-28 bg-white border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className={`text-xs font-mono uppercase font-bold text-[#801426] mb-2 ${
              lang === 'en' ? 'tracking-widest' : 'tracking-normal'
            }`}>
              — {lang === 'ne' ? 'प्राज्ञिक जग तथा सामाजिक आबद्धता' : 'CREDENTIALS & AFFILIATIONS'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.15]">
              {lang === 'ne' ? educationMembershipsData.headlineNe : educationMembershipsData.headlineEn}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              {lang === 'ne' ? educationMembershipsData.subtitleNe : educationMembershipsData.subtitleEn}
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Track Perfectly Aligned Layout (Row-by-Row Matching Heights) */}
        <div>
          {/* Track Headers Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pb-4 mb-2">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-[#fbf2f4] text-[#801426] flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#0f172a]">
                {lang === 'ne' ? 'शैक्षिक योग्यता तथा प्राज्ञिक अध्ययन' : 'Academic Credentials'}
              </h3>
            </div>

            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#0f172a]">
                {lang === 'ne' ? 'सामाजिक तथा राजनीतिक आबद्धता' : 'Civic & Community Memberships'}
              </h3>
            </div>
          </div>

          {/* Row-by-Row Aligned Pairs */}
          <div className="space-y-4 sm:space-y-5">
            {educationMembershipsData.educationList.map((eduItem, idx) => {
              const memItem = educationMembershipsData.membershipsList[idx];
              return (
                <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-stretch">
                  
                  {/* Left: Education Card */}
                  <ScrollReveal delay={idx * 50} className="h-full">
                    <div className="taste-card p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs hover:border-[#801426]/30 hover:bg-white transition-all h-full flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className="font-bold text-sm sm:text-base text-[#0f172a]">
                            {lang === 'ne' ? eduItem.levelNe : eduItem.levelEn}
                          </span>
                          <span className="text-xs font-mono font-medium text-[#801426] bg-[#fbf2f4] px-2.5 py-0.5 rounded-full border border-[#f5d0d6]">
                            {lang === 'ne' ? eduItem.yearNe : eduItem.yearEn}
                          </span>
                        </div>

                        <div className="text-xs font-semibold text-slate-700 mb-2">
                          {lang === 'ne' ? eduItem.institutionNe : eduItem.institutionEn}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {lang === 'ne' ? eduItem.descNe : eduItem.descEn}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Right: Membership Card */}
                  {memItem && (
                    <ScrollReveal delay={idx * 50 + 20} className="h-full">
                      <div className="taste-card p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs hover:border-[#801426]/30 hover:bg-white transition-all h-full flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <span className="font-bold text-sm sm:text-base text-[#0f172a]">
                              {lang === 'ne' ? memItem.organizationNe : memItem.organizationEn}
                            </span>
                            <span className="text-xs font-mono font-medium text-slate-600 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                              {lang === 'ne' ? memItem.tenureNe : memItem.tenureEn}
                            </span>
                          </div>

                          <div className="text-xs font-semibold text-[#801426] mb-2">
                            {lang === 'ne' ? memItem.roleNe : memItem.roleEn}
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed">
                            {lang === 'ne' ? memItem.descNe : memItem.descEn}
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  )}

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
