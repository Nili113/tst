import React, { useRef, useState, useEffect } from 'react';
import { featuredVideosList, civicProfile } from '../data/portfolioData';
import { Language, VideoItem } from '../types';
import { ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';
import { FacebookIcon, YoutubeIcon } from './BrandIcons';
import { ScrollReveal } from './ScrollReveal';

interface VideoScrollSectionProps {
  lang: Language;
}

export const VideoScrollSection: React.FC<VideoScrollSectionProps> = ({ lang }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // ONLY manual scrolling upon clicking button: NO automatic scrolling
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 380;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="videos" className="py-20 sm:py-28 bg-white border-b border-slate-100 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Navigation Controls */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-12">
            <div>
              <div className={`text-xs font-mono uppercase font-bold text-[#801426] mb-2 ${
                lang === 'en' ? 'tracking-widest' : 'tracking-normal'
              }`}>
                — {lang === 'ne' ? 'स्थलगत भिडियो तथा प्रसारण' : 'FIELD DISPATCHES & VIDEO'}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.15]">
                {lang === 'ne' ? 'स्थलगत भिडियो तथा प्रत्यक्ष प्रसारण' : 'Field Records & Video Stream'}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#475569] max-w-xl leading-relaxed font-sans">
                {lang === 'ne'
                  ? 'डोमालाल रंगशाला तयारी, बाँसको प्यारापिट निर्माण तथा रंगशाला निरीक्षणका प्रत्यक्ष भिडियोहरू'
                  : 'Direct field video reports on stadium staging, infrastructure inspection, and sponsorship agreements.'}
              </p>
              <div className="w-12 h-0.5 bg-[#801426] mt-4" />
            </div>

            {/* Clean Chevrons */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                className={`p-3 rounded-full border transition-all ${canScrollLeft
                  ? 'bg-white border-[#d6cec0] text-[#0f172a] hover:bg-[#faf8f5] shadow-sm active:scale-95'
                  : 'bg-[#f1f5f9] border-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
                  }`}
                aria-label="Previous Video"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                className={`p-3 rounded-full border transition-all ${canScrollRight
                  ? 'bg-white border-[#d6cec0] text-[#0f172a] hover:bg-[#faf8f5] shadow-sm active:scale-95'
                  : 'bg-[#f1f5f9] border-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
                  }`}
                aria-label="Next Video"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Video Scroll Rail (Purely manual scroll on buttons, NO automatic scrolling) */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory hide-scrollbar select-none scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {featuredVideosList.map((video) => (
            <article
              key={video.id}
              className="taste-card min-w-[285px] sm:min-w-[360px] max-w-[360px] bg-white rounded-xl overflow-hidden border border-[#e2dcd0] shadow-sm flex flex-col justify-between shrink-0 snap-start group hover:border-[#801426]/40 transition-all"
            >
              <div>
                {/* Video Thumbnail Frame — SINGLE Native Play Button (No redundant CSS overlay!) */}
                <div
                  onClick={() => setSelectedVideo(video)}
                  className="relative aspect-video overflow-hidden bg-[#e2dcd0] cursor-pointer taste-image-frame"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={lang === 'ne' ? video.titleNe : video.titleEn}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/images/video-domalal-prep.jpg';
                    }}
                  />

                  {/* Channel / Publisher Pill */}
                  <div className="absolute top-3 left-3 bg-[#0f172a]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white border border-white/10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#801426] animate-pulse" />
                    <span>{video.publisher}</span>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-[#0f172a]/90 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono text-white">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-xs text-[#64748b] mb-2 font-mono">
                    {video.date}
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-[#0f172a] group-hover:text-[#801426] transition-colors leading-snug line-clamp-2">
                    {lang === 'ne' ? video.titleNe : video.titleEn}
                  </h3>
                </div>
              </div>

              {/* Footer Links */}
              <div className="px-5 pb-5 pt-2">
                <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-semibold text-[#801426]">
                  <button
                    onClick={() => setSelectedVideo(video)}
                    className="hover:underline flex items-center gap-1"
                  >
                    <span>{lang === 'ne' ? 'भिडियो हेर्नुहोस्' : 'Watch Dispatch'}</span>
                    <span>→</span>
                  </button>

                  <a
                    href={video.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#64748b] hover:text-[#801426] transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <span>{lang === 'ne' ? 'स्रोत' : 'Source'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Media Channels Ribbon */}
        <div className="mt-10 pt-6 border-t border-[#e2dcd0] flex flex-wrap items-center justify-between gap-4 text-xs text-[#475569]">
          <span className="font-semibold text-[#0f172a]">
            {lang === 'ne' ? 'आधिकारिक डिजिटल च्यानलहरू:' : 'Official Digital Broadcast Channels:'}
          </span>
          <div className="flex items-center gap-3">
            <a
              href={civicProfile.facebookPage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e2dcd0] hover:text-[#801426] transition-colors shadow-2xs"
            >
              <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2]" />
              <span className="font-medium">Facebook Live</span>
            </a>
            <a
              href={civicProfile.youtubeSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e2dcd0] hover:text-[#801426] transition-colors shadow-2xs"
            >
              <YoutubeIcon className="w-3.5 h-3.5 text-[#FF0000]" />
              <span className="font-medium">YouTube Records</span>
            </a>
          </div>
        </div>

      </div>

      {/* Embedded Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#e2dcd0] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-[#f1f5f9]">
              <div className="font-bold text-sm text-[#0f172a] line-clamp-1">
                {lang === 'ne' ? selectedVideo.titleNe : selectedVideo.titleEn}
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1.5 rounded-full hover:bg-[#f1f5f9] text-[#0f172a] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={lang === 'ne' ? selectedVideo.titleNe : selectedVideo.titleEn}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
