import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { civicProfile } from '../data/portfolioData';
import { Language } from '../types';
import { ChevronDown, Image as ImageIcon, PlayCircle, Users, UserRound } from 'lucide-react';
import { linkClick } from '../lib/router';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onSetLang?: (lang: Language) => void;
  onOpenDesk?: () => void;
  page?: 'home' | 'gallery';
}

const navLinks = [
  { href: '#home', labelNe: 'गृहपृष्ठ', labelEn: 'Home' },
  { href: '#about', labelNe: 'परिचय', labelEn: 'About' },
  { href: '#mission', labelNe: 'ध्येय / दृष्टिकोण', labelEn: 'Mission & Vision' },
  { href: '#works', labelNe: 'परियोजनाहरू', labelEn: 'Projects' },
  { href: '#education', labelNe: 'शिक्षा र आबद्धता', labelEn: 'Education' },
  { href: '#news', labelNe: 'समाचार', labelEn: 'News' },
  { href: '#videos', labelNe: 'भिडियो', labelEn: 'Videos' },
  { href: '#contact', labelNe: 'सम्पर्क', labelEn: 'Contact' },
];

const galleryLinks = [
  { href: '/gallery/community', labelNe: 'समुदाय', labelEn: 'Community', icon: Users, group: 'images' },
  { href: '/gallery/portraits', labelNe: 'व्यक्तिगत तस्बिर', labelEn: 'Portraits', icon: UserRound, group: 'images' },
  { href: '/gallery/videos', labelNe: 'भिडियो', labelEn: 'Videos', icon: PlayCircle, group: 'videos' },
] as const;

/** "Gallery" nav item: the label goes to /gallery; hover or focus opens Images ▸ Community / Portraits, and Videos. */
const GalleryNav: React.FC<{ lang: Language; dark: boolean; active: boolean }> = ({ lang, dark, active }) => {
  const ne = lang === 'ne';
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number>();
  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };
  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    linkClick(e);
  };
  const label = ne ? 'ग्यालरी' : 'Gallery';
  return (
    <div
      className="relative"
      onPointerEnter={(e) => e.pointerType === 'mouse' && show()}
      onPointerLeave={hide}
      onFocus={show}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(false)}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
    >
      <a
        href="/gallery"
        onClick={go}
        aria-haspopup="true"
        aria-expanded={open}
        aria-current={active ? 'page' : undefined}
        className={`flex items-center gap-1 px-2 xl:px-2.5 py-2.5 text-[13.5px] transition-colors duration-150 ${
          dark ? 'text-white/75 hover:text-white' : active ? 'text-ink' : 'text-stone-600 hover:text-ink'
        }`}
      >
        <span className="reserve" data-text={label}>
          <span className={active ? 'font-semibold' : 'font-medium'}>{label}</span>
        </span>
        <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </a>
      <div data-open={open} className="nav-drop absolute left-1/2 top-full z-50 pt-2 w-[240px]">
        <div className="rounded-2xl border border-stone-200 bg-white p-1.5 text-ink shadow-[0_18px_40px_-16px_rgba(28,25,23,0.3)]">
          <p className="flex items-center gap-2 px-3 pt-2 pb-1 text-[11.5px] font-semibold text-stone-400">
            <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
            {ne ? 'तस्बिरहरू' : 'Images'}
          </p>
          {galleryLinks.map((g) => (
            <React.Fragment key={g.href}>
              {g.group === 'videos' && <div className="my-1 h-px bg-stone-100" />}
              <a
                href={g.href}
                onClick={go}
                className={`flex items-center gap-3 min-h-[42px] rounded-xl pr-3 text-[14px] text-stone-700 hover:bg-stone-50 hover:text-ink transition-colors ${g.group === 'images' ? 'pl-5' : 'pl-3'}`}
              >
                <g.icon className="w-4 h-4 text-maroon" aria-hidden="true" />
                {ne ? g.labelNe : g.labelEn}
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

/** Two-option language switch with a sliding thumb. Selected label is bold without shifting layout. */
const LangSwitch: React.FC<{ lang: Language; onSet: (l: Language) => void; compact?: boolean; dark?: boolean }> = ({
  lang,
  onSet,
  compact,
  dark,
}) => {
  const options: { value: Language; label: string; full: string }[] = [
    { value: 'ne', label: compact ? 'ने' : 'नेपाली', full: 'नेपाली' },
    { value: 'en', label: compact ? 'EN' : 'English', full: 'English' },
  ];
  return (
    <div
      role="group"
      aria-label={lang === 'ne' ? 'भाषा छान्नुहोस्' : 'Choose language'}
      className={`relative grid grid-cols-2 p-[3px] rounded-full border text-[12.5px] transition-colors duration-300 ${
        dark ? 'bg-white/10 border-white/15' : 'bg-stone-100 border-stone-200/80'
      }`}
    >
      <span
        aria-hidden="true"
        className="seg-thumb absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] rounded-full bg-white shadow-[0_1px_2px_rgba(28,25,23,0.12),0_2px_6px_-2px_rgba(28,25,23,0.12)]"
        style={{ transform: lang === 'en' ? 'translateX(100%)' : 'translateX(0)' }}
      />
      {options.map((o) => {
        const active = lang === o.value;
        return (
          <button
            key={o.value}
            type="button"
            lang={o.value}
            aria-pressed={active}
            aria-label={o.full}
            onClick={() => onSet(o.value)}
            className={`relative z-10 ${compact ? 'min-w-[40px] h-8' : 'min-w-[66px] h-[30px]'} px-2.5 rounded-full transition-colors duration-150 ${
              active ? 'text-ink' : dark ? 'text-white/70 hover:text-white' : 'text-stone-500 hover:text-ink'
            }`}
          >
            <span className="reserve trim" data-text={o.label}>
              <span className={active ? 'font-semibold' : 'font-medium'}>{o.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, onSetLang, page = 'home' }) => {
  const home = page === 'home';
  // From another page, section links go back to the home page and its anchor.
  const toHref = (h: string) => (home ? h : h === '#home' ? '/' : '/' + h);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, visible: false });
  const navRef = useRef<HTMLElement>(null);

  const setLang = (l: Language) => {
    if (onSetLang) onSetLang(l);
    else if (l !== lang) onToggleLang();
  };

  // Scroll-spy: highlight the section in the middle band of the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    if (!home) setActive('/gallery');
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [home]);

  // Slide the underline between links (pose to pose; the browser fills the frames).
  useLayoutEffect(() => {
    const place = () => {
      const link = navRef.current?.querySelector<HTMLElement>(`a[href="${active}"]`);
      if (!link || !navRef.current) return setIndicator((i) => ({ ...i, visible: false }));
      const label = link.querySelector<HTMLElement>('.reserve') ?? link;
      const navBox = navRef.current.getBoundingClientRect();
      const box = label.getBoundingClientRect();
      setIndicator({ x: box.left - navBox.left, w: box.width, visible: active !== '#home' });
    };
    place();
    window.addEventListener('resize', place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener('resize', place);
  }, [active, lang, home]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const dark = false;

  return (
    <header
      data-dark={dark}
      className={`sticky top-0 z-50 font-sans transition-[background-color,box-shadow,border-color,color] duration-300 border-b ${
        dark
          ? 'bg-[#0b6e1c] text-white border-white/10'
          : scrolled || mobileMenuOpen
          ? 'bg-white/90 backdrop-blur-md text-ink border-stone-200/70 shadow-[0_1px_12px_-6px_rgba(28,25,23,0.12)]'
          : 'bg-white text-ink border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <a href={toHref('#home')} onClick={linkClick} className="group flex items-center gap-3 -ml-1 px-1 py-2 rounded-md">
            <span className={`font-extrabold text-base sm:text-[17px] tracking-tight transition-colors ${dark ? 'group-hover:text-[#bfe8c8]' : 'group-hover:text-maroon'}`}>
              {lang === 'ne' ? civicProfile.nameNe : civicProfile.nameEn}
            </span>
            <span className={`hidden sm:inline-block text-xs font-medium border-l pl-3 transition-colors duration-300 ${dark ? 'text-white/60 border-white/20' : 'text-stone-500 border-stone-200'}`}>
              {lang === 'ne' ? 'बिर्तामोड–५' : 'Birtamod-5'}
            </span>
          </a>

          <nav ref={navRef} aria-label="Primary" className="relative hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const label = lang === 'ne' ? link.labelNe : link.labelEn;
              const isActive = active === link.href && link.href !== '#home';
              return (
                <React.Fragment key={link.href}>
                <a
                  href={toHref(link.href)}
                  onClick={linkClick}
                  aria-current={isActive ? 'location' : undefined}
                  className={`px-2 xl:px-2.5 py-2.5 text-[13.5px] transition-colors duration-150 ${
                    dark ? 'text-white/75 hover:text-white' : isActive ? 'text-ink' : 'text-stone-600 hover:text-ink'
                  }`}
                >
                  <span className="reserve" data-text={label}>
                    <span className={isActive ? 'font-semibold' : 'font-medium'}>{label}</span>
                  </span>
                </a>
                {link.href === '#videos' && <GalleryNav lang={lang} dark={dark} active={!home} />}
                </React.Fragment>
              );
            })}
            <span
              aria-hidden="true"
              className="nav-indicator"
              style={{
                width: indicator.w,
                transform: `translateX(${indicator.x}px)`,
                opacity: indicator.visible && !dark ? 1 : 0,
              }}
            />
            <div className="ml-3">
              <LangSwitch lang={lang} onSet={setLang} dark={dark} />
            </div>
          </nav>

          <div className="flex items-center gap-1.5 lg:hidden">
            <LangSwitch lang={lang} onSet={setLang} compact dark={dark} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={lang === 'ne' ? 'मेनु' : 'Menu'}
              className={`burger relative w-11 h-11 rounded-full active:scale-95 transition-[transform,background-color] duration-150 ${dark ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-stone-100'}`}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" className="menu-panel lg:hidden" data-open={mobileMenuOpen}>
        <div>
          <nav aria-label="Mobile" className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 pt-1 grid grid-cols-2 gap-1">
            {navLinks.map((link, i) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={toHref(link.href)}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    linkClick(e);
                  }}
                  style={{ '--i': i } as React.CSSProperties}
                  className={`menu-item flex items-center min-h-[48px] px-3 rounded-xl text-[15px] font-medium transition-colors ${
                    isActive ? 'bg-maroon-tint text-maroon' : 'text-stone-700 hover:bg-stone-50 active:bg-stone-100'
                  }`}
                >
                  {lang === 'ne' ? link.labelNe : link.labelEn}
                </a>
              );
            })}
            <p className="col-span-2 mt-2 px-3 pt-3 border-t border-stone-100 text-[12px] font-semibold text-stone-400">
              {lang === 'ne' ? 'ग्यालरी' : 'Gallery'}
            </p>
            {galleryLinks.map((g, i) => (
              <a
                key={g.href}
                href={g.href}
                tabIndex={mobileMenuOpen ? 0 : -1}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  linkClick(e);
                }}
                style={{ '--i': navLinks.length + i } as React.CSSProperties}
                className="menu-item flex items-center gap-2.5 min-h-[48px] px-3 rounded-xl text-[15px] font-medium text-stone-700 hover:bg-stone-50 active:bg-stone-100"
              >
                <g.icon className="w-4 h-4 text-maroon" aria-hidden="true" />
                {lang === 'ne' ? g.labelNe : g.labelEn}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
