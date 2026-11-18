import React, { useState } from 'react';
import { civicProfile } from '../data/portfolioData';
import { Language } from '../types';
import { Menu, X, Globe } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenDesk?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', labelNe: 'गृहपृष्ठ', labelEn: 'Home' },
    { href: '#about', labelNe: 'परिचय', labelEn: 'About' },
    { href: '#mission', labelNe: 'ध्येय / दृष्टिकोण', labelEn: 'Mission & Vision' },
    { href: '#works', labelNe: 'कार्यसम्पादन', labelEn: 'Works' },
    { href: '#education', labelNe: 'शिक्षा र आबद्धता', labelEn: 'Education' },
    { href: '#news', labelNe: 'समाचार', labelEn: 'News' },
    { href: '#videos', labelNe: 'भिडियो', labelEn: 'Videos' },
    { href: '#contact', labelNe: 'सम्पर्क', labelEn: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Left: Clean Brand Identity (Pravash Reference Style - Slim & Modern) */}
          <a href="#home" className="group flex items-center gap-2.5 text-slate-900 hover:text-[#801426] transition-colors">
            <span className="font-extrabold text-base sm:text-lg tracking-tight">
              {lang === 'ne' ? civicProfile.nameNe : civicProfile.nameEn}
            </span>
            <span className={`hidden sm:inline-block text-[10px] font-mono uppercase text-slate-400 font-semibold border-l border-slate-200 pl-2.5 ${
              lang === 'en' ? 'tracking-widest' : 'tracking-normal'
            }`}>
              {lang === 'ne' ? 'बिर्तामोड–५' : 'BIRTAMODE-5'}
            </span>
          </a>

          {/* Right: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-slate-600 hover:text-[#801426] transition-colors py-1"
              >
                {lang === 'ne' ? link.labelNe : link.labelEn}
              </a>
            ))}

            {/* Language Switcher Pill */}
            <button
              onClick={onToggleLang}
              className="taste-btn inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 hover:bg-white text-slate-800 text-xs font-semibold shadow-2xs transition-all ml-1"
              title={lang === 'ne' ? 'Switch to English' : 'नेपालीमा हेर्नुहोस्'}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#801426]" />
              <span className="font-mono text-[11px] font-bold">
                {lang === 'ne' ? 'English' : 'नेपाली'}
              </span>
            </button>
          </nav>

          {/* Mobile Actions: Language + Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onToggleLang}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold"
              aria-label="Toggle language"
            >
              <Globe className="w-3 h-3 text-[#801426]" />
              <span className="font-mono text-[10px] font-bold">
                {lang === 'ne' ? 'EN' : 'नेपाली'}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-2 shadow-lg animate-fade-in">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium text-slate-700 hover:text-[#801426] hover:bg-slate-50 p-2.5 rounded-lg transition-colors"
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
