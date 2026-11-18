import React from 'react';
import { educationMembershipsData } from '../data/portfolioData';
import { Language } from '../types';
import { GraduationCap, Users } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { SectionHeader } from './SectionHeader';
import { Rich } from '../lib/typo';
import { useScrollProgress } from '../lib/useScrollProgress';

interface EducationSectionProps {
  lang: Language;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ lang }) => {
  const ne = lang === 'ne';
  const d = educationMembershipsData;
  // The line fills as the list passes the 65% mark of the viewport; dots fill when reached.
  const lineRef = useScrollProgress<HTMLOListElement>((r, vh) => (vh * 0.65 - r.top) / Math.max(r.height, 1), {
    onUpdate: (p, el) => {
      const h = el.offsetHeight || 1;
      el.querySelectorAll<HTMLElement>('[data-dot]').forEach((dot) => {
        const li = dot.parentElement as HTMLElement;
        dot.dataset.on = String(p * h >= li.offsetTop + dot.offsetTop - 2);
      });
    },
  });

  return (
    <section id="education" className="py-16 sm:py-24 bg-ivory-section font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={ne ? 'प्राज्ञिक जग तथा सामाजिक आबद्धता' : 'Credentials & affiliations'}
          title={ne ? d.headlineNe : d.headlineEn}
          lede={ne ? d.subtitleNe : d.subtitleEn}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Education: a sequence, so it gets a timeline */}
          <div>
            <h3 className="flex items-center gap-3 pb-4 mb-2 border-b border-stone-300/70 text-lg font-bold text-ink">
              <span className="w-9 h-9 rounded-xl bg-white border border-stone-200 text-maroon grid place-items-center">
                <GraduationCap className="w-[18px] h-[18px]" aria-hidden="true" />
              </span>
              {ne ? 'शैक्षिक योग्यता तथा प्राज्ञिक अध्ययन' : 'Academic Credentials'}
            </h3>

            <ol ref={lineRef} className="relative mt-6">
              <span aria-hidden="true" className="absolute left-[7px] top-2 bottom-2 w-px bg-stone-300" />
              <span aria-hidden="true" className="timeline-fill absolute left-[6px] top-2 bottom-2 w-[3px] rounded-full bg-maroon" />
              {d.educationList.map((item, idx) => (
                <ScrollReveal as="li" key={idx} delay={idx * 70} className="relative pl-9 pb-8 last:pb-0">
                  <span aria-hidden="true" data-dot data-on="false" className="timeline-dot absolute left-0 top-[5px] w-[15px] h-[15px] rounded-full border-2" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-[17px] font-bold text-ink leading-snug">
                      <Rich text={ne ? item.levelNe : item.levelEn} />
                    </h4>
                    <span className="text-[13px] font-medium text-maroon tabular-nums">
                      <Rich text={ne ? item.yearNe : item.yearEn} />
                    </span>
                  </div>
                  <p className="mt-1 text-[14.5px] font-semibold text-stone-700">
                    {ne ? item.institutionNe : item.institutionEn}
                  </p>
                  <p className="mt-2 text-[14.5px] text-stone-600 leading-[1.7] max-w-[58ch]">
                    <Rich text={ne ? item.descNe : item.descEn} />
                  </p>
                </ScrollReveal>
              ))}
            </ol>
          </div>

          {/* Memberships: independent list */}
          <div>
            <h3 className="flex items-center gap-3 pb-4 mb-2 border-b border-stone-300/70 text-lg font-bold text-ink">
              <span className="w-9 h-9 rounded-xl bg-white border border-stone-200 text-maroon grid place-items-center">
                <Users className="w-[18px] h-[18px]" aria-hidden="true" />
              </span>
              {ne ? 'सामाजिक तथा राजनीतिक आबद्धता' : 'Civic & Community Memberships'}
            </h3>

            <ul className="divide-y divide-stone-300/60">
              {d.membershipsList.map((item, idx) => (
                <ScrollReveal as="li" key={idx} delay={idx * 70} className="py-6 first:pt-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-[17px] font-bold text-ink leading-snug">
                      {ne ? item.organizationNe : item.organizationEn}
                    </h4>
                    <span className="text-[13px] font-medium text-stone-500 tabular-nums">
                      <Rich text={ne ? item.tenureNe : item.tenureEn} />
                    </span>
                  </div>
                  <p className="mt-1 text-[14.5px] font-semibold text-maroon">{ne ? item.roleNe : item.roleEn}</p>
                  <p className="mt-2 text-[14.5px] text-stone-600 leading-[1.7] max-w-[58ch]">
                    <Rich text={ne ? item.descNe : item.descEn} />
                  </p>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
