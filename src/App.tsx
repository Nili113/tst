import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Biography } from './components/Biography';
import { Achievements } from './components/Achievements';
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
    <div className="min-h-screen bg-sand-50 font-sans text-civic-900 selection:bg-crimson-800 selection:text-white">
      {/* Subtle Top Scroll Reading Progress Indicator */}
      <ScrollProgressBar />

      {/* Navigation Bar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenDesk={() => setIsDeskOpen(true)}
      />

      {/* Hero Entrance (Screen 1) */}
      <main>
        <Hero
          lang={lang}
          onOpenDesk={() => setIsDeskOpen(true)}
        />

        {/* Biography & Roots */}
        <Biography lang={lang} />

        {/* Key Achievements & Impact Pillars */}
        <Achievements lang={lang} />

        {/* Mandate & Leadership Timeline */}
        <Timeline lang={lang} />

        {/* Horizontal Scroll Pane 1: Featured News & Jhapa Gold Cup */}
        <NewsScrollSection lang={lang} />

        {/* Horizontal Scroll Pane 2: Video Dispatches & Social Redirects */}
        <VideoScrollSection lang={lang} />

        {/* Ward Office Contact & Inquiry Desk */}
        <ContactSection
          lang={lang}
          onOpenDesk={() => setIsDeskOpen(true)}
        />
      </main>

      {/* Civic Footer with Mandatory License Line */}
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
