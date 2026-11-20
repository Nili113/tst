import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { newsList } from '../data/media';
import { Language } from '../types';
import { CardRail } from './CardRail';

/** News: a row of article cards, moved with the arrow buttons. Each card opens the original article in a new tab. */
export const NewsScrollSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const ne = lang === 'ne';
  return (
    <CardRail
      id="news"
      lang={lang}
      className="bg-white border-t border-stone-100"
      label={ne ? 'सञ्चारमाध्यममा' : 'In the news'}
      title={ne ? 'समाचार तथा कभरेज' : 'News & Coverage'}
      lede={ne ? 'वडा नं. ५ मा हामीले सँगै गरेका कामहरू, स्थानीय सञ्चारमाध्यमको नजरमा।' : 'Our work together in Ward 5, as local newspapers have covered it.'}
    >
      {newsList.map((n) => (
        <a
          key={n.id}
          href={n.url}
          target="_blank"
          rel="noopener noreferrer"
          className="taste-card group snap-start shrink-0 w-[280px] sm:w-[340px] flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm hover:border-maroon/30 hover:shadow-[0_18px_40px_-24px_rgba(28,25,23,0.35)]"
        >
          <span className="relative block aspect-[16/10] overflow-hidden bg-stone-200">
            <img src={n.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-[50%_25%] transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
            <span className="absolute left-3 top-3 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11.5px] font-semibold text-white">{n.source}</span>
          </span>
          <span className="flex flex-1 flex-col p-5">
            <span className="flex items-center gap-1.5 text-[12.5px] text-stone-500 tabular-nums">
              <Calendar className="w-3.5 h-3.5 text-maroon" aria-hidden="true" />
              {ne ? n.dateNe : n.dateEn}
            </span>
            <span className="mt-2 text-[17px] font-bold leading-snug text-ink group-hover:text-maroon transition-colors line-clamp-2">{ne ? n.titleNe : n.titleEn}</span>
            <span className="mt-2 text-[14px] leading-relaxed text-stone-600 line-clamp-3">{ne ? n.summaryNe : n.summaryEn}</span>
            <span className="mt-auto pt-4">
              <span className="flex items-center justify-between border-t border-stone-100 pt-3 text-[13px] font-semibold text-maroon">
                {ne ? 'पूरा समाचार पढ्नुहोस्' : 'Read full story'}
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </span>
          </span>
        </a>
      ))}
    </CardRail>
  );
};
