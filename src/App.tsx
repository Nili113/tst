import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Biography } from './components/Biography';
import { Achievements } from './components/Achievements';
import { EducationSection } from './components/EducationSection';
import { Timeline } from './components/Timeline';
import { NewsScrollSection } from './components/NewsScrollSection';
import { VideoScrollSection } from './components/VideoScrollSection';
import { ContactSection } from './components/ContactSection';
import { CitizenDeskModal } from './components/CitizenDeskModal';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/ScrollReveal';
import { Language } from './types';

export function App() {
  const [lang, setLang] = useState<Language>('ne');
  const [isDeskOpen, setIsDeskOpen] = useState(false);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ne' ? 'en' : 'ne'));
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans text-[#0f172a] selection:bg-[#801426] selection:text-white">
      {/* Subtle Top Scroll Reading Progress Indicator */}
      <ScrollProgressBar />

      {/* Symmetrical Floating Dock in Ivory Cream */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenDesk={() => setIsDeskOpen(true)}
      />

      {/* Main Narrative Sequence */}
      <main>
        {/* Hero Entrance (Screen 1) */}
        <Hero
          lang={lang}
          onOpenDesk={() => setIsDeskOpen(true)}
        />

        {/* Biography & Roots */}
        <Biography lang={lang} />

        {/* Key Achievements & Impact Pillars */}
        <Achievements lang={lang} />

        {/* Dedicated Education & Enterprise Section */}
        <EducationSection lang={lang} />

        {/* Mandate & Leadership Timeline */}
        <Timeline lang={lang} />

        {/* Horizontal Scroll Pane 1: Featured News & Jhapa Gold Cup (Manual scroll on buttons only) */}
        <NewsScrollSection lang={lang} />

        {/* Horizontal Scroll Pane 2: Video Dispatches & Social Redirects (Manual scroll on buttons only) */}
        <VideoScrollSection lang={lang} />

        {/* Ward Office Contact & Inquiry Desk */}
        <ContactSection
          lang={lang}
          onOpenDesk={() => setIsDeskOpen(true)}
        />
      </main>

      {/* Civic Footer (Media Credits Removed) */}
      <Footer
        lang={lang}
      />

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
