import React, { useEffect, useRef } from 'react';
import { completedWorksData } from '../data/portfolioData';
import { Language } from '../types';
import { ShieldCheck, Milestone, Trophy, HeartHandshake, BadgeCheck, LucideIcon } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { SectionHeader } from './SectionHeader';
import { Rich } from '../lib/typo';

interface AchievementsProps {
  lang: Language;
}

const ICONS: Record<string, LucideIcon> = { ShieldCheck, Milestone, Trophy, HeartHandshake };

export const Achievements: React.FC<AchievementsProps> = ({ lang }) => {
  const ne = lang === 'ne';
  const listRef = useRef<HTMLOListElement>(null);

  // Highlight the record crossing the middle of the viewport: one thing at a time.
  useEffect(() => {
    const rows = listRef.current?.querySelectorAll<HTMLElement>('[data-row]');
    if (!rows?.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => ((e.target as HTMLElement).dataset.active = String(e.isIntersecting))),
      { rootMargin: '-42% 0px -42% 0px' }
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="works" className="py-16 sm:py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={ne ? 'कार्यसम्पादन तथा परिणाम' : 'Public record & impact'}
          title={ne ? 'हालसम्म सम्पन्न भएका मुख्य कामहरू' : 'Key Works Done Till Now'}
          lede={
            ne
              ? 'कार्यालय समयको अनुशासनदेखि अन्तर-पालिका पूर्वाधार, रक्तदान अभियान र प्रतिष्ठित झापा गोल्डकप फुटबलको संरक्षकत्वसम्मका मुख्य पहलहरू।'
              : 'From pioneering municipal punctuality to inter-ward drainage, community blood drives, and football tournament patronage.'
          }
        />

        {/* A public record reads best as a ledger, not a grid of identical cards */}
        <ol ref={listRef} className="border-t border-stone-200">
          {completedWorksData.map((item, idx) => {
            const Icon = ICONS[item.iconName] ?? ShieldCheck;
            return (
              <ScrollReveal as="li" key={item.id} delay={idx * 60} className="border-b border-stone-200">
                <article data-row data-active="false" className="work-row relative grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_minmax(200px,260px)] gap-x-5 sm:gap-x-8 gap-y-4 py-8 sm:py-10">
                  <span aria-hidden="true" className="work-bar absolute left-[-16px] sm:left-[-24px] top-8 bottom-8 w-[3px] rounded-full bg-maroon" />
                  <span className="work-icon w-12 h-12 rounded-2xl grid place-items-center border">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-maroon">
                      {ne ? item.subtitleNe : item.subtitleEn}
                    </p>
                    <h3 className="work-title mt-1.5 text-xl sm:text-2xl font-bold text-ink leading-snug tracking-tight">
                      {ne ? item.titleNe : item.titleEn}
                    </h3>
                    <p className="mt-3 text-[15px] sm:text-base text-stone-600 leading-[1.75] max-w-[62ch]">
                      <Rich text={ne ? item.descriptionNe : item.descriptionEn} />
                    </p>
                  </div>

                  <div className="col-start-2 md:col-start-3 md:pl-8 md:border-l border-stone-200 md:self-stretch flex flex-col justify-center">
                    <p className="text-lg sm:text-xl font-bold text-ink leading-snug tabular-nums">
                      {ne ? item.metricsNe : item.metricsEn}
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-stone-500">
                      <BadgeCheck className="w-4 h-4 text-maroon" aria-hidden="true" />
                      {ne ? 'प्रमाणित अभिलेख' : 'Verified record'}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
