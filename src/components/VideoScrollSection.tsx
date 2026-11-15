import React, { useRef, useState, useEffect } from 'react';
import { featuredVideosList, civicProfile } from '../data/portfolioData';
import { Language, VideoItem } from '../types';
import { ChevronLeft, ChevronRight, Play, X, ExternalLink } from 'lucide-react';
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

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 380;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="videos" className="py-16 md:py-24 bg-white border-b border-civic-200/80 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Navigation Controls */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-12">
            <div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-civic-950 tracking-tight leading-[1.3] ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
                {lang === 'ne' ? 'स्थलगत भिडियो तथा प्रत्यक्ष प्रसारण' : 'Field Records & Video Stream'}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-civic-600 max-w-xl leading-relaxed font-sans">
                {lang === 'ne'
                  ? 'डोमालाल रंगशाला तयारी, बाँसको प्यारापिट निर्माण तथा रंगशाला निरीक्षणका प्रत्यक्ष भिडियोहरू'
                  : 'Direct field video reports on stadium staging, infrastructure inspection, and sponsorship agreements.'}
              </p>
            </div>

            {/* Clean Chevrons */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                className={`p-3 rounded-full border transition-all ${
                  canScrollLeft
                    ? 'bg-[#faf8f5] border-civic-300 text-civic-800 hover:bg-civic-100 shadow-sm active:scale-95'
                    : 'bg-civic-100/50 border-civic-200 text-civic-300 cursor-not-allowed'
                }`}
                aria-label="Previous Videos"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                className={`p-3 rounded-full border transition-all ${
                  canScrollRight
                    ? 'bg-[#faf8f5] border-civic-300 text-civic-800 hover:bg-civic-100 shadow-sm active:scale-95'
                    : 'bg-civic-100/50 border-civic-200 text-civic-300 cursor-not-allowed'
                }`}
                aria-label="Next Videos"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Video Scroll Pane (Carousel 2) */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory hide-scrollbar select-none scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {featuredVideosList.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="taste-card min-w-[275px] sm:min-w-[360px] max-w-[360px] bg-[#faf8f5] rounded-xl overflow-hidden border border-civic-200/90 shadow-sm shrink-0 snap-start cursor-pointer group hover:border-crimson-800/40"
            >
              {/* 16:9 Thumbnail Frame with Play Overlay */}
              <div className="relative aspect-video overflow-hidden bg-civic-950 taste-image-frame">
                <img
                  src={video.thumbnailUrl}
                  alt={video.titleEn}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-civic-950/70 via-transparent to-transparent group-hover:from-civic-950/50 transition-colors" />

                {/* Publisher Badge */}
                <div className="absolute top-3 left-3 bg-civic-950/85 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-white border border-white/10 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>{video.publisher}</span>
                </div>

                {/* Video Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 rounded text-[11px] font-mono font-medium text-white">
                  {video.duration}
                </div>
              </div>

              {/* Video Title and Metadata */}
              <div className="p-5 font-sans">
                <div className="text-xs font-semibold text-civic-500 mb-1.5">
                  {video.date}
                </div>
                <h3 className="font-bold text-base sm:text-lg text-civic-950 leading-snug group-hover:text-crimson-900 transition-colors line-clamp-2 font-nepali">
                  {lang === 'ne' ? video.titleNe : video.titleEn}
                </h3>
                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-crimson-800 pt-2 border-t border-civic-200/60">
                  <span>{lang === 'ne' ? 'भिडियो हेर्नुहोस्' : 'Watch Broadcast'}</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Social Channels Redirect Hub */}
        <ScrollReveal delay={150}>
          <div className="mt-14 rounded-2xl bg-civic-950 p-6 sm:p-9 text-white shadow-xl border border-civic-800 font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-amber-400 uppercase">
                  {lang === 'ne' ? 'आधिकारिक डिजिटल सम्पर्क' : 'Official Social Channels'}
                </span>
                <h3 className={`font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
                  {lang === 'ne' ? 'रोहित प्रसाईंसँग प्रत्यक्ष डिजिटल सम्पर्क' : 'Connect Directly With Rohit Prasai'}
                </h3>
                <p className="text-sm text-civic-300 leading-relaxed max-w-xl">
                  {lang === 'ne'
                    ? 'फेसबुकमा वडा विकासका दैनिक गतिविधि, प्रत्यक्ष जनगुनासो सुनुवाइ र युट्युब मार्फत सार्वजनिक कार्यक्रमहरूको पूर्ण प्रसारण हेर्नुहोस्।'
                    : 'Follow daily municipal developments, watch broadcast reports, and engage directly with the Ward Chair.'}
                </p>
              </div>

              {/* Social Redirect Buttons: Guaranteed to Open Main Pages */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                
                {/* Facebook Button */}
                <a
                  href={civicProfile.facebookPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="taste-btn flex items-center justify-between px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm shadow-md group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <FacebookIcon className="w-4 h-4 fill-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-xs">{lang === 'ne' ? 'फेसबुक प्रोफाइल' : 'Official Facebook Page'}</div>
                      <div className="text-[11px] text-blue-100">rohit.prasai.5</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-white/90 group-hover:translate-x-1 transition-transform">
                    <span>{lang === 'ne' ? 'खोल्नुहोस्' : 'Visit'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>

                {/* YouTube Button */}
                <a
                  href={civicProfile.youtubeSearch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="taste-btn flex items-center justify-between px-5 py-3.5 rounded-xl bg-red-700 hover:bg-red-600 text-white font-medium text-sm shadow-md group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <YoutubeIcon className="w-4 h-4 fill-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-xs">{lang === 'ne' ? 'युट्युब प्रसारण' : 'YouTube Video Coverage'}</div>
                      <div className="text-[11px] text-red-100">Rohit Prasai Coverage</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-white/90 group-hover:translate-x-1 transition-transform">
                    <span>{lang === 'ne' ? 'खोल्नुहोस्' : 'Watch'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>

              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* Video Modal Player with Direct Links */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-civic-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-civic-950 rounded-2xl max-w-2xl w-full border border-civic-800 shadow-2xl p-6 sm:p-7 relative text-white font-sans">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-civic-800 text-civic-300 hover:bg-civic-700 hover:text-white transition-colors"
              aria-label="Close Video"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                <span>{selectedVideo.publisher}</span>
                <span>•</span>
                <span>{selectedVideo.date}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
                {lang === 'ne' ? selectedVideo.titleNe : selectedVideo.titleEn}
              </h3>

              {/* Video Preview Card */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-civic-800 flex items-center justify-center">
                <img
                  src={selectedVideo.thumbnailUrl}
                  alt={selectedVideo.titleEn}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-crimson-800 text-white flex items-center justify-center shadow-xl">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-civic-200 max-w-sm">
                    {lang === 'ne' 
                      ? 'यो प्रत्यक्ष भिडियो प्रसारण हेर्न तल क्लिक गर्नुहोस्:'
                      : 'Click below to watch this direct broadcast:'}
                  </p>
                  <a
                    href={selectedVideo.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="taste-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-crimson-800 hover:bg-crimson-700 text-white font-bold text-xs shadow-md"
                  >
                    <span>{lang === 'ne' ? 'भिडियो प्रसारण खोल्नुहोस्' : 'Open Video Stream'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
