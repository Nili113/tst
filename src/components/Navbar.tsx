import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Menu, X, Globe } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenDesk?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang }) => {
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
    { href: '#education', labelNe: 'शिक्षा', labelEn: 'Education' },
    { href: '#timeline', labelNe: 'नेतृत्व यात्रा', labelEn: 'Timeline' },
    { href: '#news', labelNe: 'समाचार', labelEn: 'News' },
    { href: '#videos', labelNe: 'भिडियो', labelEn: 'Media' },
    { href: '#contact', labelNe: 'सम्पर्क', labelEn: 'Contact' },
  ];

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center pointer-events-none px-4 font-sans">
      
      {/* Symmetrically Centered, Content-Hugging Floating Island Dock in Ivory Cream */}
      <nav
        className={`pointer-events-auto inline-flex items-center gap-2 sm:gap-2.5 rounded-full transition-all duration-300 p-1.5 sm:p-2 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-xl shadow-[#0f172a]/[0.06] border border-[#e2dcd0]'
            : 'bg-white/90 backdrop-blur-md shadow-lg shadow-[#0f172a]/[0.03] border border-[#e8e3d8]'
        }`}
      >

        {/* Desktop Navigation Links — Centered with Equal Margins */}
        <div className="hidden md:flex items-center gap-0.5 bg-[#faf8f5] rounded-full p-1 border border-[#e2dcd0]/70">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold text-[#475569] hover:text-[#801426] hover:bg-white rounded-full px-3.5 py-1.5 transition-all"
            >
              {lang === 'ne' ? link.labelNe : link.labelEn}
            </a>
          ))}
        </div>

        {/* Subtle Vertical Divider on Desktop */}
        <div className="hidden md:block w-px h-5 bg-[#e2dcd0] mx-0.5" />

        {/* Action Controls: Language Switcher & Mobile Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Language Switcher Pill */}
          <button
            onClick={onToggleLang}
            className="taste-btn flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#faf8f5] hover:bg-white text-[#0f172a] text-xs font-bold border border-[#e2dcd0] transition-all shadow-2xs"
            title={lang === 'ne' ? 'Switch to English' : 'नेपालीमा हेर्नुहोस्'}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-[#801426]" />
            <span className="font-mono text-[11px] font-bold">
              {lang === 'ne' ? 'English' : 'नेपाली'}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full text-[#475569] hover:text-[#0f172a] hover:bg-[#faf8f5] md:hidden transition-colors ml-0.5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </nav>

      {/* Mobile Floating Dropdown Card */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-14 inset-x-4 max-w-sm mx-auto rounded-2xl bg-white/98 backdrop-blur-xl border border-[#e2dcd0] shadow-2xl p-4 space-y-2 animate-fade-in md:hidden">
          <div className="grid grid-cols-2 gap-1.5 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-[#0f172a] hover:text-[#801426] hover:bg-[#faf8f5] p-2.5 rounded-xl transition-colors text-center"
              >
                {lang === 'ne' ? link.labelNe : link.labelEn}
              </a>
            ))}
          </div>
        </div>
      )}

    </header>
  );
};
