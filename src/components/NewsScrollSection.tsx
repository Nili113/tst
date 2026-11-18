import React, { useRef, useState, useEffect } from 'react';
import { featuredNewsList } from '../data/portfolioData';
import { Language, NewsItem } from '../types';
import { ChevronLeft, ChevronRight, Calendar, Clock, X, ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface NewsScrollSectionProps {
  lang: Language;
}

export const NewsScrollSection: React.FC<NewsScrollSectionProps> = ({ lang }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
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
      const cardWidth = 350;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="news" className="py-20 sm:py-28 bg-white border-b border-slate-100 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Navigation Controls */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-12">
            <div>
              <div className={`text-xs font-mono uppercase font-bold text-[#801426] mb-2 ${
                lang === 'en' ? 'tracking-widest' : 'tracking-normal'
              }`}>
                — {lang === 'ne' ? 'प्रमाणित समाचार तथा कभरेज' : 'VERIFIED NEWS COVERAGE'}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.15]">
                {lang === 'ne' ? 'झापा गोल्डकप तथा जनसरोकारका समाचार' : 'Jhapa Gold Cup & Civic News'}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#475569] max-w-xl leading-relaxed font-sans">
                {lang === 'ne'
                  ? 'डोमालाल रंगशालामा सञ्चालित झापा गोल्डकप तथा बिर्तामोडको स्थानीय सेवा प्रवाहका प्रमाणित समाचारहरू'
                  : 'Verified coverage on Jhapa Gold Cup at Domalal Stadium and local municipal progress.'}
              </p>
              <div className="w-12 h-0.5 bg-[#801426] mt-4" />
            </div>

            {/* Clean Navigation Chevrons */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                className={`p-3 rounded-full border transition-all ${canScrollLeft
                  ? 'bg-white border-[#d6cec0] text-[#0f172a] hover:bg-[#faf8f5] shadow-sm active:scale-95'
                  : 'bg-[#f1f5f9] border-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
                  }`}
                aria-label="Previous News"
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
                aria-label="Next News"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Scroll Pane (No automatic sliding, purely user controlled) */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory hide-scrollbar select-none scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {featuredNewsList.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="taste-card min-w-[275px] sm:min-w-[340px] max-w-[340px] bg-white rounded-xl overflow-hidden border border-[#e2dcd0] shadow-sm flex flex-col justify-between shrink-0 snap-start cursor-pointer group hover:border-[#801426]/40 transition-all"
            >
              <div>
                {/* Media Image Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e2dcd0] taste-image-frame">
                  <img
                    src={article.imageUrl}
                    alt={lang === 'ne' ? article.titleNe : article.titleEn}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/images/news-army.jpg';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-[#0f172a]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white border border-white/10">
                    {article.source}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-[#64748b] mb-2 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#801426]" />
                    <span>{lang === 'ne' ? article.dateNe : article.dateEn}</span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-[#0f172a] group-hover:text-[#801426] transition-colors leading-snug line-clamp-2">
                    {lang === 'ne' ? article.titleNe : article.titleEn}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#475569] line-clamp-3 leading-relaxed">
                    {lang === 'ne' ? article.summaryNe : article.summaryEn}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-5 pb-5 pt-2">
                <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-semibold text-[#801426] group-hover:translate-x-0.5 transition-transform">
                  <span>{lang === 'ne' ? 'पुरा विवरण पढ्नुहोस्' : 'Read Full Coverage'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#e2dcd0] max-h-[90vh] flex flex-col font-sans">
            <div className="relative h-60 sm:h-72 w-full bg-[#f1f5f9] shrink-0">
              <img
                src={selectedArticle.imageUrl}
                alt={lang === 'ne' ? selectedArticle.titleNe : selectedArticle.titleEn}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/news-army.jpg';
                }}
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-[#0f172a]/70 text-white hover:bg-[#0f172a] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-4 bg-[#801426] text-white text-xs px-3 py-1 rounded-full font-bold">
                {selectedArticle.source}
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center gap-3 text-xs text-[#64748b] font-mono">
                <span>{lang === 'ne' ? selectedArticle.dateNe : selectedArticle.dateEn}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#801426]" />
                  {selectedArticle.readTime}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] leading-snug">
                {lang === 'ne' ? selectedArticle.titleNe : selectedArticle.titleEn}
              </h3>
              <p className="text-sm text-[#334155] leading-relaxed whitespace-pre-line">
                {lang === 'ne' ? selectedArticle.summaryNe : selectedArticle.summaryEn}
              </p>
              {selectedArticle.sourceUrl && (
                <div className="pt-3 border-t border-[#f1f5f9]">
                  <a
                    href={selectedArticle.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#801426] hover:underline"
                  >
                    <span>{lang === 'ne' ? 'मूल समाचार स्रोत हेर्नुहोस्' : 'View Original News Source'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
