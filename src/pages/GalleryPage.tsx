import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, ChevronRight, Expand, PlayCircle } from 'lucide-react';
import { Language } from '../types';
import { PhotoViewer } from '../components/PhotoViewer';
import { FacebookIcon } from '../components/BrandIcons';
import { galleryCommunity, galleryPortraits, galleryVideos, FACEBOOK_PAGE, GalleryPhoto } from '../data/gallery';
import { linkClick } from '../lib/router';
import { VideoCard } from '../components/VideoPlayer';

export type GalleryView = 'all' | 'community' | 'portraits' | 'videos';

export const GALLERY_VIEWS: { view: GalleryView; href: string; en: string; ne: string }[] = [
  { view: 'all', href: '/gallery', en: 'All photos', ne: 'सबै तस्बिर' },
  { view: 'community', href: '/gallery/community', en: 'Community', ne: 'समुदाय' },
  { view: 'portraits', href: '/gallery/portraits', en: 'Portraits', ne: 'व्यक्तिगत तस्बिर' },
  { view: 'videos', href: '/gallery/videos', en: 'Videos', ne: 'भिडियो' },
];

export const galleryViewFromPath = (path: string): GalleryView => {
  const seg = path.replace(/\/+$/, '').split('/')[2];
  return (['community', 'portraits', 'videos'] as const).find((v) => v === seg) ?? 'all';
};

const INTRO: Record<GalleryView, { en: string; ne: string }> = {
  all: { en: 'Moments with the people of Birtamod, and portraits.', ne: 'बिर्तामोडका जनतासँगका क्षणहरू र व्यक्तिगत तस्बिरहरू।' },
  community: { en: 'Out in the neighbourhood: gatherings, door-to-door visits and blessings.', ne: 'टोलमा: भेला, घरदैलो भेटघाट र आशीर्वाद।' },
  portraits: { en: 'Personal portraits.', ne: 'व्यक्तिगत तस्बिरहरू।' },
  videos: { en: 'Speeches, interviews and field visits on video.', ne: 'भाषण, अन्तर्वार्ता र स्थलगत भ्रमणका भिडियोहरू।' },
};


export const GalleryPage: React.FC<{ lang: Language; view: GalleryView }> = ({ lang, view }) => {
  const ne = lang === 'ne';
  const [viewer, setViewer] = useState<number | null>(null);
  useEffect(() => setViewer(null), [view]);

  const photos: GalleryPhoto[] = useMemo(() => {
    if (view === 'community') return galleryCommunity;
    if (view === 'portraits') return galleryPortraits;
    if (view === 'all') {
      // Interleave so portraits don't all bunch up at the end.
      const out = [...galleryCommunity];
      galleryPortraits.forEach((p, k) => out.splice(Math.min(out.length, 1 + k * 5), 0, p));
      return out;
    }
    return [];
  }, [view]);

  const caption = (p: GalleryPhoto) => (ne ? p.captionNe : p.captionEn);
  const current = GALLERY_VIEWS.find((v) => v.view === view)!;
  const count = (v: GalleryView) =>
    v === 'all' ? galleryCommunity.length + galleryPortraits.length : v === 'community' ? galleryCommunity.length : v === 'portraits' ? galleryPortraits.length : galleryVideos.length;

  return (
    <main className="font-sans">
      {/* Page header */}
      <section className="relative overflow-hidden bg-ivory-section border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-9 sm:pt-12 pb-8 sm:pb-10 text-center">
          <nav aria-label={ne ? 'ब्रेडक्रम' : 'Breadcrumb'} className="flex items-center justify-center gap-1.5 text-[13px] text-stone-500">
            <a href="/" onClick={linkClick} className="hover:text-ink transition-colors">{ne ? 'गृहपृष्ठ' : 'Home'}</a>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <a href="/gallery" onClick={linkClick} className={view === 'all' ? 'text-ink font-medium' : 'hover:text-ink transition-colors'}>{ne ? 'ग्यालरी' : 'Gallery'}</a>
            {view !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-ink font-medium">{ne ? current.ne : current.en}</span>
              </>
            )}
          </nav>
          <h1 className="h2 mt-4">{ne ? 'तस्बिर तथा भिडियो' : 'Moments & Media'}</h1>
          <p className="mt-3 max-w-lg mx-auto text-[15px] sm:text-[16.5px] leading-relaxed text-stone-600">{ne ? INTRO[view].ne : INTRO[view].en}</p>

          {/* Category pills: each is its own page */}
          <div role="tablist" aria-label={ne ? 'ग्यालरी वर्ग' : 'Gallery categories'} className="mt-6 flex flex-wrap justify-center gap-2">
            {GALLERY_VIEWS.map((v) => {
              const on = v.view === view;
              return (
                <a
                  key={v.view}
                  href={v.href}
                  onClick={linkClick}
                  role="tab"
                  aria-selected={on}
                  className={`inline-flex items-center gap-2 min-h-[40px] px-4 rounded-full border text-[13.5px] transition-[background-color,border-color,color,box-shadow] duration-200 ${
                    on
                      ? 'bg-maroon text-white border-maroon shadow-[0_8px_20px_-10px_rgba(155,35,53,0.7)]'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:text-ink'
                  }`}
                >
                  {v.view === 'videos' && <PlayCircle className="w-4 h-4" aria-hidden="true" />}
                  <span className="font-medium">{ne ? v.ne : v.en}</span>
                  <span className={`text-[12px] tabular-nums ${on ? 'text-white/70' : 'text-stone-400'}`}>{count(v.view)}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        {/* Enough room that a short category never runs straight into the footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20 sm:pb-28 min-h-[58svh]">
          {view !== 'videos' ? (
            <div key={view} className={view === 'portraits' ? 'grid grid-cols-3 gap-2 sm:gap-5 max-w-4xl mx-auto' : 'grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5'}>
              {photos.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setViewer(i)}
                  style={{ '--i': i } as React.CSSProperties}
                  className={`gallery-tile group relative overflow-hidden rounded-2xl bg-stone-200 ${view === 'portraits' ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}
                  aria-label={caption(p) ?? (ne ? 'तस्बिर हेर्नुहोस्' : 'Open photo')}
                >
                  <img
                    src={p.src}
                    alt={caption(p) ?? ''}
                    loading={i < 4 ? 'eager' : 'lazy'}
                    className="absolute inset-0 w-full h-full object-cover object-[50%_25%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300" />
                  {caption(p) && (
                    <span className="absolute left-4 right-14 bottom-4 text-left text-[14px] font-medium leading-snug text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-[opacity,transform] duration-300">
                      {caption(p)}
                    </span>
                  )}
                  <span className="absolute right-3 bottom-3 grid place-items-center w-9 h-9 rounded-full bg-white/90 text-ink opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
                    <Expand className="w-4 h-4" aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          ) : galleryVideos.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {galleryVideos.map((v) => (
                <VideoCard key={v.id} v={v} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="max-w-xl mx-auto rounded-3xl border border-dashed border-stone-300 bg-ivory-section px-6 py-16 text-center">
              <PlayCircle className="mx-auto w-10 h-10 text-maroon/70" aria-hidden="true" />
              <p className="mt-4 text-[18px] font-semibold text-ink">{ne ? 'भिडियोहरू छिट्टै थपिनेछन्' : 'Videos are on the way'}</p>
              <p className="mt-1.5 text-[15px] text-stone-500">{ne ? 'हालका भिडियोहरू फेसबुक पेजमा हेर्नुहोस्।' : 'Meanwhile, my latest videos are on my Facebook page.'}</p>
              <a href={FACEBOOK_PAGE} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6">
                <FacebookIcon className="w-4 h-4 text-[#1877F2]" />
                <span className="trim">{ne ? 'फेसबुकमा हेर्नुहोस्' : 'Watch on Facebook'}</span>
                <ArrowUpRight className="btn-icon btn-icon-nudge w-4 h-4 text-stone-400" aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </section>

      {viewer !== null && (
        <PhotoViewer
          photos={photos.map((p) => ({ src: p.src, caption: caption(p) }))}
          start={viewer}
          title={ne ? 'ग्यालरी' : 'Gallery'}
          lang={lang}
          onClose={() => setViewer(null)}
        />
      )}
    </main>
  );
};
