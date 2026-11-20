import React from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { MediaVideo } from '../data/media';
import { FacebookIcon } from './BrandIcons';
import { Language } from '../types';

/**
 * Card used in the home rail and the gallery. Opens the exact Facebook post in a new tab:
 * Facebook refuses to embed many of these videos (music rights), so linking out is the only
 * way every one of them reliably plays.
 */
export const VideoCard: React.FC<{ v: MediaVideo; lang: Language; className?: string }> = ({ v, lang, className = '' }) => {
  const ne = lang === 'ne';
  return (
    <a href={v.url} target="_blank" rel="noopener noreferrer" className={`vc group block text-left ${className}`} aria-label={`${ne ? "फेसबुकमा भिडियो हेर्नुहोस्" : "Watch on Facebook"}: ${ne ? v.titleNe : v.titleEn}`}>
      <span className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-stone-900">
        <img src={v.poster} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/20" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/15 px-2.5 py-1 text-[11.5px] font-semibold text-white">
          <FacebookIcon className="w-3 h-3" />
          {v.by}
        </span>
        <span className="vc-play absolute left-1/2 top-1/2 grid place-items-center w-11 h-11 sm:w-14 sm:h-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 text-maroon-deep shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)]">
          <Play className="w-5 h-5 translate-x-[1px] fill-current" aria-hidden="true" />
        </span>
        <span className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <span className="flex items-center gap-1.5 text-[12px] font-medium text-white/70 tabular-nums">{ne ? v.dateNe : v.dateEn}<ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" /></span>
          <span className="mt-1 text-[14px] sm:text-[15.5px] font-semibold leading-snug text-white line-clamp-2">{ne ? v.titleNe : v.titleEn}</span>
        </span>
      </span>
    </a>
  );
};

