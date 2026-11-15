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

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 350;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="news" className="py-16 md:py-24 bg-[#faf8f5] border-b border-civic-200/80 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Navigation Controls */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-12">
            <div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-civic-950 tracking-tight leading-[1.3] ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
                {lang === 'ne' ? 'झापा गोल्डकप तथा जनसरोकारका समाचार' : 'Jhapa Gold Cup & Civic News'}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-civic-600 max-w-xl leading-relaxed font-sans">
                {lang === 'ne'
                  ? 'डोमालाल रंगशालामा सञ्चालित झापा गोल्डकप तथा बिर्तामोडको स्थानीय सेवा प्रवाहका प्रमाणित समाचारहरू'
                  : 'Verified coverage on Jhapa Gold Cup at Domalal Stadium and local municipal progress.'}
              </p>
            </div>

            {/* Clean Navigation Chevrons */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                className={`p-3 rounded-full border transition-all ${
                  canScrollLeft
                    ? 'bg-white border-civic-300 text-civic-800 hover:bg-sand-100 shadow-sm active:scale-95'
                    : 'bg-civic-100/50 border-civic-200 text-civic-300 cursor-not-allowed'
                }`}
                aria-label="Previous News"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                className={`p-3 rounded-full border transition-all ${
                  canScrollRight
                    ? 'bg-white border-civic-300 text-civic-800 hover:bg-sand-100 shadow-sm active:scale-95'
                    : 'bg-civic-100/50 border-civic-200 text-civic-300 cursor-not-allowed'
                }`}
                aria-label="Next News"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Scroll Pane (Matching Reference Style: Clean & Prestigious) */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory hide-scrollbar select-none scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {featuredNewsList.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="taste-card min-w-[275px] sm:min-w-[340px] max-w-[340px] bg-white rounded-xl overflow-hidden border border-civic-200/90 shadow-sm flex flex-col justify-between shrink-0 snap-start cursor-pointer group hover:border-crimson-800/40"
            >
              <div>
                {/* Media Image Frame */}
                <div className="relative h-48 overflow-hidden bg-civic-900 taste-image-frame">
                  <img
                    src={article.imageUrl}
                    alt={article.titleEn}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Category Chip */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-civic-900/90 text-white backdrop-blur-sm shadow-sm">
                      {lang === 'ne' ? article.categoryNe : article.categoryEn}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-civic-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {lang === 'ne' ? article.dateNe : article.dateEn}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-crimson-800">{article.source}</span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-civic-950 leading-snug group-hover:text-crimson-900 transition-colors line-clamp-2 font-nepali">
                    {lang === 'ne' ? article.titleNe : article.titleEn}
                  </h3>

                  <p className="text-xs text-civic-600 line-clamp-3 leading-relaxed">
                    {lang === 'ne' ? article.summaryNe : article.summaryEn}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0 border-t border-civic-100 flex items-center justify-between mt-3 text-xs">
                <span className="flex items-center gap-1 text-civic-400 text-[11px]">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
                <span className="font-bold text-crimson-800 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>{lang === 'ne' ? 'विस्तृत पढ्नुहोस्' : 'Read Story'}</span>
                  <span>→</span>
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* News Article Modal Dialog */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-civic-950/75 backdrop-blur-sm animate-fade-in font-sans">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-civic-200 shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-sand-100 text-civic-600 hover:bg-sand-200 hover:text-civic-900 transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold rounded bg-crimson-50 text-crimson-800 border border-crimson-200">
                  {lang === 'ne' ? selectedArticle.categoryNe : selectedArticle.categoryEn}
                </span>
                <span className="text-xs text-civic-500 font-medium">
                  {lang === 'ne' ? selectedArticle.dateNe : selectedArticle.dateEn} • {selectedArticle.source}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-civic-950 leading-tight">
                {lang === 'ne' ? selectedArticle.titleNe : selectedArticle.titleEn}
              </h2>

              <div className="rounded-xl overflow-hidden h-60 sm:h-72 bg-civic-900">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.titleEn}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-civic-800 text-sm sm:text-base leading-relaxed space-y-3 pt-2">
                <p className="font-medium text-civic-900 text-base">
                  {lang === 'ne' ? selectedArticle.summaryNe : selectedArticle.summaryEn}
                </p>
                <p>
                  {lang === 'ne'
                    ? 'बिर्तामोड नगरपालिका वडा नं. ५ का वडाध्यक्ष रोहित प्रसाईंले स्थानीय जनताको दैनिक काम, प्रशासनिक सेवा र विकास निर्माणमा कुनै सम्झौता नगर्ने स्पष्ट अडान राख्नुभएको छ।'
                    : 'Birtamod Ward Chairperson Rohit Prasai continues to deliver on transparent administration, community health access, and accountable governance.'}
                </p>
              </div>

              <div className="pt-6 border-t border-civic-200 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-civic-500">
                  {lang === 'ne' ? 'स्रोत आभार:' : 'Source Credit:'} <strong className="text-civic-800">{selectedArticle.source}</strong>
                </div>
                {selectedArticle.sourceUrl && (
                  <a
                    href={selectedArticle.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="taste-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-civic-900 text-white text-xs font-medium hover:bg-civic-800"
                  >
                    <span>{lang === 'ne' ? 'स्रोत पोर्टल हेर्नुहोस्' : 'Visit Source'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
