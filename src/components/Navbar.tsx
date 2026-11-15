import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Menu, X, MessageSquare, Globe } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenDesk: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, onOpenDesk }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#biography', labelNe: 'परिचय', labelEn: 'About' },
    { href: '#achievements', labelNe: 'कार्यसम्पादन', labelEn: 'Initiatives' },
    { href: '#timeline', labelNe: 'नेतृत्व यात्रा', labelEn: 'Timeline' },
    { href: '#news', labelNe: 'समाचार', labelEn: 'News' },
    { href: '#videos', labelNe: 'भिडियो', labelEn: 'Media' },
    { href: '#contact', labelNe: 'सम्पर्क', labelEn: 'Contact' },
  ];

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center pointer-events-none px-4 font-sans">
      
      {/* Symmetrically Centered, Content-Hugging Floating Island Dock */}
      <nav
        className={`pointer-events-auto inline-flex items-center gap-2 sm:gap-2.5 rounded-full transition-all duration-300 p-1.5 sm:p-2 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-xl shadow-civic-950/[0.08] border border-civic-200/90'
            : 'bg-white/90 backdrop-blur-md shadow-lg shadow-civic-950/[0.04] border border-civic-200/70'
        }`}
      >

        {/* Desktop Navigation Links — Centered with Equal Margins */}
        <div className="hidden md:flex items-center gap-0.5 bg-sand-100/80 rounded-full p-1 border border-civic-200/50">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold text-civic-700 hover:text-crimson-800 hover:bg-white rounded-full px-3.5 py-1.5 transition-all"
            >
              {lang === 'ne' ? link.labelNe : link.labelEn}
            </a>
          ))}
        </div>

        {/* Subtle Vertical Divider on Desktop */}
        <div className="hidden md:block w-px h-5 bg-civic-200/80 mx-0.5" />

        {/* Action Controls: Language Switcher & Mobile Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Language Switcher Pill */}
          <button
            onClick={onToggleLang}
            className="taste-btn flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sand-100 hover:bg-sand-200/80 text-civic-800 text-xs font-bold border border-civic-200/80 transition-all shadow-2xs"
            title={lang === 'ne' ? 'Switch to English' : 'नेपालीमा हेर्नुहोस्'}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-crimson-800" />
            <span className="font-mono text-[11px] font-bold">
              {lang === 'ne' ? 'English' : 'नेपाली'}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full text-civic-700 hover:text-civic-950 hover:bg-sand-100 md:hidden transition-colors ml-0.5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </nav>

      {/* Mobile Floating Dropdown Card */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-14 inset-x-4 max-w-sm mx-auto rounded-2xl bg-white/95 backdrop-blur-xl border border-civic-200 shadow-2xl p-4 space-y-2 animate-fade-in md:hidden">
          <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-civic-100">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-civic-800 hover:text-crimson-800 hover:bg-sand-100/80 p-2.5 rounded-xl transition-colors text-center"
              >
                {lang === 'ne' ? link.labelNe : link.labelEn}
              </a>
            ))}
          </div>

          <div className="pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDesk();
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-crimson-800 text-white text-xs font-bold shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{lang === 'ne' ? 'नागरिक सहायता तथा गुनासो' : 'Citizen Assistance Desk'}</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
