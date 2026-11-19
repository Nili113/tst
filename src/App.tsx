import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Biography } from './components/Biography';
import { MissionVision } from './components/MissionVision';
import { Achievements } from './components/Achievements';
import { EducationSection } from './components/EducationSection';
import { NewsScrollSection } from './components/NewsScrollSection';
import { VideoScrollSection } from './components/VideoScrollSection';
import { ContactSection } from './components/ContactSection';
import { CitizenDeskModal } from './components/CitizenDeskModal';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/ScrollReveal';
import { Language } from './types';

export function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      return localStorage.getItem('lang') === 'en' ? 'en' : 'ne';
    } catch {
      return 'ne';
    }
  });
  const [isDeskOpen, setIsDeskOpen] = useState(false);

  // Keep <html lang> in sync: drives hyphenation, Devanagari leading and screen readers.
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ne' ? 'en' : 'ne'));
  };

  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      {/* Subtle Top Scroll Reading Progress Indicator */}
      <ScrollProgressBar />

      {/* Clean Sticky Navbar (Pravash Reference Style) */}
      <Navbar
        lang={lang}
        onSetLang={setLang}
        onToggleLang={toggleLanguage}
        onOpenDesk={() => setIsDeskOpen(true)}
      />

      {/* Main Narrative Sequence */}
      <main>
        {/* 1. Hero: Balanced 2-Column with Dark Maroon Photo Card (Pravash Reference Style, Fits 100% Above the Fold!) */}
        <Hero
          lang={lang}
          onOpenDesk={() => setIsDeskOpen(true)}
        />

        {/* 2. Autobiography & Roots */}
        <Biography lang={lang} />

        {/* 3. Mission & Vision */}
        <MissionVision lang={lang} />

        {/* 4. Completed Works (Public Record & Impact) */}
        <Achievements lang={lang} />

        {/* 5. Education & Memberships (Handwritten Note Content) */}
        <EducationSection lang={lang} />

        {/* 6. Verified News Coverage (Kept intact) */}
        <NewsScrollSection lang={lang} />

        {/* 7. Field Dispatches & Video Records (Kept intact) */}
        <VideoScrollSection lang={lang} />

        {/* 8. Contact & Verified Civic Links (Pravash Reference Style) */}
        <ContactSection
          lang={lang}
          onOpenDesk={() => setIsDeskOpen(true)}
        />
      </main>

      {/* 9. Clean Civic Footer */}
      <Footer lang={lang} />

      {/* Interactive Citizen Grievance Modal */}
      <CitizenDeskModal
        isOpen={isDeskOpen}
        onClose={() => setIsDeskOpen(false)}
        lang={lang}
      />
    </div>
  );
}

export default App;
