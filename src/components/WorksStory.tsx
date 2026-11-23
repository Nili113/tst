import React, { useMemo, useState } from 'react';
import { ShieldCheck, Milestone, Trophy, HeartHandshake, BadgeCheck, Images, Calendar, MapPin, LucideIcon } from 'lucide-react';
import { completedWorksData } from '../data/portfolioData';
import { workPhotos } from '../data/workPhotos';
import { Language } from '../types';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';
import { PhotoViewer } from './PhotoViewer';

const ICONS: Record<string, LucideIcon> = { ShieldCheck, Milestone, Trophy, HeartHandshake };
const NE_DIGITS = '०१२३४५६७८९';

interface Photo {
  src: string;
  captionEn?: string;
  captionNe?: string;
}

interface CardTheme {
  letter: string;
  cardClass: string;
  glowStyle: React.CSSProperties;
  iconClass: string;
  letterClass: string;
  titleClass: string;
  badgeClass: string;
  treeFilterClass: string;
}

const CARD_THEMES: CardTheme[] = [
  {
    letter: 'C',
    cardClass: 'border-emerald-500/45 hover:border-emerald-600/70',
    glowStyle: {
      background:
        'radial-gradient(circle at 0% 0%, rgba(16, 185, 80, 0.12), transparent 58%), #ffffff',
    },
    iconClass: 'text-emerald-600',
    letterClass: 'text-emerald-600/20',
    titleClass: 'text-[#0b6e1c]',
    badgeClass: 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100',
    treeFilterClass: 'opacity-[0.12] [filter:brightness(1.06)_contrast(1.15)]',
  },
  {
    letter: 'A',
    cardClass: 'border-red-400/50 hover:border-red-500/75',
    glowStyle: {
      background:
        'radial-gradient(circle at 0% 0%, rgba(239, 68, 68, 0.11), transparent 58%), #ffffff',
    },
    iconClass: 'text-red-600',
    letterClass: 'text-red-500/20',
    titleClass: 'text-ink',
    badgeClass: 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100',
    treeFilterClass: 'opacity-[0.08] [filter:brightness(1.06)_contrast(1.15)_grayscale(1)]',
  },
  {
    letter: 'J',
    cardClass: 'border-blue-400/50 hover:border-blue-500/75',
    glowStyle: {
      background:
        'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.12), transparent 58%), #ffffff',
    },
    iconClass: 'text-blue-600',
    letterClass: 'text-blue-500/20',
    titleClass: 'text-ink',
    badgeClass: 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100',
    treeFilterClass: 'opacity-[0.08] [filter:brightness(1.06)_contrast(1.15)_grayscale(1)]',
  },
  {
    letter: 'B',
    cardClass: 'border-stone-300/80 hover:border-stone-400',
    glowStyle: {
      background:
        'radial-gradient(circle at 0% 0%, rgba(28, 25, 23, 0.06), transparent 58%), #ffffff',
    },
    iconClass: 'text-ink',
    letterClass: 'text-stone-300',
    titleClass: 'text-ink',
    badgeClass: 'border-stone-200 bg-stone-100 text-stone-800 hover:bg-stone-200/70',
    treeFilterClass: 'opacity-[0.08] [filter:brightness(1.06)_contrast(1.15)_grayscale(1)]',
  },
];

export const WorksStory: React.FC<{ lang: Language }> = ({ lang }) => {
  const ne = lang === 'ne';
  const toNe = (s: string) => (ne ? s.replace(/\d/g, (d) => NE_DIGITS[+d]) : s);
  const works = completedWorksData;
  const photos = useMemo(
    () =>
      works.map(
        (w) =>
          (workPhotos[w.id] ?? []).map((e) =>
            typeof e === 'string' ? { src: e } : e
          ) as Photo[]
      ),
    [works]
  );

  const [viewerWork, setViewerWork] = useState<number | null>(null);
  const activePhotos = viewerWork !== null ? photos[viewerWork] ?? [] : [];
  const caption = (p: Photo) => (ne ? p.captionNe ?? p.captionEn : p.captionEn ?? p.captionNe);

  return (
    <section id="works" className="py-16 sm:py-24 bg-white text-ink font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={ne ? 'कार्यसम्पादन तथा परिणाम' : 'Public record & impact'}
          title={ne ? 'परियोजनाहरू' : 'Projects'}
          lede={
            ne
              ? 'कार्यालय समयको अनुशासनदेखि अन्तर-पालिका पूर्वाधार, रक्तदान अभियान र प्रतिष्ठित झापा गोल्डकप फुटबलको संरक्षकत्वसम्मका मुख्य पहलहरू।'
              : 'From pioneering municipal punctuality to inter-ward drainage, community blood drives, and football tournament patronage.'
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {works.map((w, i) => {
            const theme = CARD_THEMES[i % CARD_THEMES.length];
            const Icon = ICONS[w.iconName] ?? ShieldCheck;
            const itemPhotos = photos[i] ?? [];

            return (
              <ScrollReveal key={w.id} delay={i * 70}>
                <article
                  style={theme.glowStyle}
                  className={`relative isolate overflow-hidden h-full flex flex-col justify-between rounded-[22px] border p-6 sm:p-8 shadow-[0_14px_38px_-22px_rgba(28,25,23,0.18)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 ${theme.cardClass}`}
                >
                  {/* Faded tree silhouette in the bottom-right corner */}
                  <img
                    src="/assets/aistudio/tree_b5763aee.jpeg"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className={`pointer-events-none select-none absolute -right-6 -bottom-4 -z-10 w-52 h-44 sm:w-64 sm:h-52 object-contain scale-[1.75] mix-blend-multiply ${theme.treeFilterClass}`}
                  />

                  <div>
                    {/* Top row: colored icon left + bold watermark letter right */}
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex items-center justify-center pt-1">
                        <Icon className={`w-9 h-9 sm:w-10 sm:h-10 ${theme.iconClass}`} strokeWidth={2.2} aria-hidden="true" />
                      </span>
                      <span
                        aria-hidden="true"
                        className={`font-black text-[44px] sm:text-[52px] leading-none tracking-tight select-none ${theme.letterClass}`}
                      >
                        {theme.letter}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`mt-5 text-[20px] sm:text-[23px] font-extrabold leading-snug tracking-[-0.015em] ${theme.titleClass}`}
                    >
                      {ne ? w.titleNe : w.titleEn}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-[14.5px] sm:text-[15.5px] leading-[1.7] text-stone-600">
                      {ne ? w.descriptionNe : w.descriptionEn}
                    </p>
                  </div>

                  {/* Subtle bottom metadata & photo gallery trigger */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-stone-700">
                      <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                      {ne ? w.metricsNe : w.metricsEn}
                    </span>

                    {itemPhotos.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setViewerWork(i)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12.5px] font-semibold transition-colors ${theme.badgeClass}`}
                      >
                        <Images className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>
                          {ne
                            ? `तस्बिर (${toNe(String(itemPhotos.length))})`
                            : `Photos (${itemPhotos.length})`}
                        </span>
                      </button>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* By The Numbers summary below Projects */}
        <ScrollReveal className="mt-16 sm:mt-24">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-center text-[26px] sm:text-[32px] font-extrabold tracking-tight text-ink">
              {ne ? 'तथ्यांकमा यात्रा' : 'By The Numbers'}
            </h3>

            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              <div className="flex flex-col items-center text-center rounded-2xl border border-stone-200/80 bg-white px-6 py-8 shadow-[0_10px_30px_-14px_rgba(28,25,23,0.12)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-16px_rgba(28,25,23,0.16)]">
                <Calendar className="w-7 h-7 text-[#e11d48] mb-3" strokeWidth={2.2} aria-hidden="true" />
                <p className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-ink leading-tight tabular-nums">
                  {ne ? '२०+' : '20+'}
                </p>
                <p className="mt-1.5 text-[13.5px] font-medium text-stone-500">
                  {ne ? 'राजनीतिमा सक्रिय वर्ष' : 'Years in Politics'}
                </p>
              </div>

              <div className="flex flex-col items-center text-center rounded-2xl border border-stone-200/80 bg-white px-6 py-8 shadow-[0_10px_30px_-14px_rgba(28,25,23,0.12)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-16px_rgba(28,25,23,0.16)]">
                <span className="inline-flex items-center justify-center w-8 h-8 mb-2.5 overflow-hidden">
                  <img
                    src="/assets/aistudio/tree_b5763aee.jpeg"
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-contain scale-[2.2] mix-blend-multiply [filter:brightness(1.06)_contrast(1.15)]"
                  />
                </span>
                <p className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-ink leading-tight tabular-nums">
                  {ne ? '३' : '3'}
                </p>
                <p className="mt-1.5 text-[13.5px] font-medium text-stone-500">
                  {ne ? 'लोकतान्त्रिक आन्दोलन' : 'Democratic Movements'}
                </p>
              </div>

              <div className="flex flex-col items-center text-center rounded-2xl border border-stone-200/80 bg-white px-6 py-8 shadow-[0_10px_30px_-14px_rgba(28,25,23,0.12)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-16px_rgba(28,25,23,0.16)]">
                <MapPin className="w-7 h-7 text-[#e11d48] mb-3" strokeWidth={2.2} aria-hidden="true" />
                <p className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-ink leading-tight">
                  {ne ? 'अर्जुनधारा–५' : 'Arjundhara-5'}
                </p>
                <p className="mt-1.5 text-[13.5px] font-medium text-stone-500">
                  {ne ? 'कार्यक्षेत्र' : 'Constituency'}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {viewerWork !== null && activePhotos.length > 0 && (
        <PhotoViewer
          photos={activePhotos.map((p) => ({ src: p.src, caption: caption(p) }))}
          start={0}
          title={ne ? works[viewerWork].titleNe : works[viewerWork].titleEn}
          lang={lang}
          onClose={() => setViewerWork(null)}
        />
      )}
    </section>
  );
};
