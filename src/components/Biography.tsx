import React, { useRef } from 'react';
import { autobiographyData, civicProfile } from '../data/portfolioData';
import { Language } from '../types';
import { Vote, Flag, Users, Trophy, GraduationCap, Plane, Store, Waves, School } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { SectionHeader } from './SectionHeader';
import { Rich, unquote } from '../lib/typo';
import { useScrollProgress } from '../lib/useScrollProgress';

interface BiographyProps {
  lang: Language;
}

export const Biography: React.FC<BiographyProps> = ({ lang }) => {
  const ne = lang === 'ne';
  // Band top travels from 90% to 20% of the viewport → words light up in reading order.
  // Latches: words light up as the band scrolls in and stay lit when scrolling back up.
  const quoteMax = useRef(0);
  const quoteRef = useScrollProgress<HTMLElement>((r, vh) => (quoteMax.current = Math.max(quoteMax.current, (vh * 0.9 - r.top) / (vh * 0.7))));
  const quoteWords = unquote(ne ? autobiographyData.philosophyNe : autobiographyData.philosophyEn).split(/\s+/);

  // The line through the journey lights each stop as the strip scrolls through the viewport.
  const journeyMax = useRef(0);
  const journeyRef = useScrollProgress<HTMLOListElement>((r, vh) => (journeyMax.current = Math.max(journeyMax.current, (vh * 0.85 - r.top) / (r.height + vh * 0.35))));
  const journey = [
    { icon: School, year: '', title: ne ? 'कन्काई बोर्डिङ' : 'Kankai Boarding', detail: ne ? 'विद्यालय शिक्षा, झापा' : 'Schooling in Jhapa' },
    { icon: GraduationCap, year: '', title: ne ? 'ग्लोबल कलेज' : 'Global College', detail: ne ? '+२ व्यवस्थापन, काठमाडौँ' : '+2 Management, Kathmandu' },
    { icon: Flag, year: ne ? '२०६२' : '2005', title: ne ? 'नेपाली कांग्रेस' : 'Nepali Congress', detail: ne ? 'क्रियाशील सदस्यता' : 'Active member since 2062 BS' },
    { icon: GraduationCap, year: ne ? '२०६६' : '2009', title: ne ? 'सिलभर माउण्टेन' : 'Silver Mountain', detail: ne ? 'होटल म्यानेजमेन्ट स्नातक' : 'Bachelor in Hotel Management' },
    { icon: Plane, year: '', title: ne ? 'अष्ट्रेलिया' : 'Australia', detail: ne ? 'व्यवस्थापकीय डिप्लोमा' : 'Professional diploma' },
    { icon: Store, year: '', title: ne ? 'माता पाथीभरा ट्रेडर्स' : 'Mata Pathivara Traders', detail: ne ? 'संस्थापक, स्थानीय उद्यम' : 'Founder, local enterprise' },
    { icon: Vote, year: ne ? '२०७९' : '2022', title: ne ? 'वडाध्यक्षमा निर्वाचित' : 'Elected Ward Chair', detail: ne ? 'बिर्तामोड–५' : 'Birtamod-5' },
    { icon: Waves, year: ne ? '२०८०' : '2023', title: ne ? 'आवास मार्ग ढल समिति' : 'Aawas Marg drain committee', detail: ne ? 'बिर्तामोड–अर्जुनधारा' : 'Birtamod–Arjundhara' },
  ];

  const facts = [
    {
      icon: Vote,
      title: ne ? 'स्थानीय तह निर्वाचन २०७९' : 'Elected Ward Chair (2022)',
      detail: ne ? 'नेपाली कांग्रेसका तर्फबाट निर्वाचित' : 'Mandate: 2022 – 2027',
    },
    {
      icon: Flag,
      title: ne ? 'नेपाली कांग्रेस आबद्धता' : 'Nepali Congress',
      detail: ne ? 'वि.सं. २०६२ देखि क्रियाशील सदस्य' : 'Active Member since 2062 BS',
    },
    {
      icon: Users,
      title: ne ? 'सामाजिक संस्था' : 'Civic Memberships',
      detail: ne ? 'बिर्ता जेसिज तथा नेपाल रेडक्रस' : 'Birta Jaycees & Nepal Red Cross',
    },
    {
      icon: Trophy,
      title: ne ? 'खेलकुद प्रवर्द्धन' : 'Sports Patronage',
      detail: ne ? 'झापा गोल्डकप तथा डोमालाल रंगशाला' : 'Jhapa Gold Cup & Domalal Stadium',
    },
  ];

  return (
    <section id="about" className="pt-16 sm:pt-24 bg-white font-sans border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={ne ? 'पृष्ठभूमि तथा यात्रा' : 'Autobiography & roots'}
          title={ne ? autobiographyData.headlineNe : autobiographyData.headlineEn}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          <div className="lg:col-span-7 space-y-5 max-w-[68ch]">
            <ScrollReveal delay={60}>
              <p className="text-lg sm:text-xl text-ink leading-[1.65]">
                <Rich
                  text={
                    ne
                      ? 'झापा बिर्तामोड–५ को सामाजिक, शैक्षिक तथा व्यावसायिक पृष्ठभूमिबाट अघि बढ्दै वि.सं. २०६२ देखि नेपाली कांग्रेसमा क्रियाशील रही २०७९ को स्थानीय तह निर्वाचनमार्फत वडाध्यक्षमा निर्वाचित भएको हुँ।'
                      : 'Rooted in the civic, educational, and enterprise fabric of Birtamod-5, active in the democratic movement with Nepali Congress since 2062 BS (2005), and elected Ward Chairperson in 2022.'
                  }
                />
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-base text-stone-600 leading-[1.75]">
                <Rich
                  text={
                    ne
                      ? 'कन्काई बोर्डिङ, ग्लोबल कलेज हुँदै सिलभर माउण्टेनबाट होटल म्यानेजमेन्ट स्नातक र अष्ट्रेलियाबाट अन्तर्राष्ट्रिय डिप्लोमा अध्ययनले मलाई योजना, अनुशासन र कुशल व्यवस्थापनको दृष्टिकोण दियो। यही अनुभवलाई स्थानीय तहको सुशासन र पूर्वाधार विकासमा उपयोग गरिरहेको छु।'
                      : 'Academic training at Kankai Boarding, Global College, Silver Mountain School of Hotel Management, and professional diploma studies in Australia provided a strong foundation in logistical discipline, event governance, and public administration.'
                  }
                />
              </p>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <p className="text-base text-stone-600 leading-[1.75]">
                <Rich
                  text={
                    ne
                      ? 'कार्यालय समयको कडा अनुशासन, नागरिक सेवामा शून्य ढिलाइ, डोमालाल रंगशालाको स्तरोन्नति, झापा गोल्डकपको संरक्षकत्व र आवास मार्ग ढल निकास जस्ता दिगो विकासका कामहरू हाम्रो निरन्तर प्राथमिकता हुन्।'
                      : 'Strict municipal punctuality, zero bureaucratic delay for constituents, permanent stormwater engineering for Aawas Marg, and revitalizing sports tourism through Jhapa Gold Cup at Domalal Stadium remain core delivery mandates.'
                  }
                />
              </p>
            </ScrollReveal>
            {/* Key facts sit under the story, so both columns end together */}
            <ScrollReveal delay={180}>
              <dl aria-label={ne ? 'मुख्य विवरण' : 'Key facts'} className="!mt-9 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {facts.map(({ icon: Icon, title, detail }) => (
                  <div key={title} className="flex items-start gap-3.5 rounded-2xl border border-stone-200 bg-[#fcfbf9] p-4">
                    <span className="w-9 h-9 shrink-0 rounded-xl bg-maroon-tint text-maroon grid place-items-center">
                      <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                    </span>
                    <div>
                      <dt className="text-[15px] font-semibold text-ink leading-snug">{title}</dt>
                      <dd className="mt-0.5 text-[13.5px] text-stone-500 tabular-nums">
                        <Rich text={detail} />
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </div>

          <ScrollReveal className="lg:col-span-5 lg:h-full" delay={120}>
            <figure className="relative h-full min-h-[420px] overflow-hidden rounded-3xl bg-stone-200 shadow-[0_30px_60px_-40px_rgba(28,25,23,0.6)]">
              <img
                src="/images/gallery/portraits/portrait-waving.jpg"
                alt={ne ? civicProfile.nameNe : civicProfile.nameEn}
                className="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <figcaption className="absolute left-6 bottom-5 text-white">
                <span className="block text-[20px] font-bold leading-tight">{ne ? civicProfile.nameNe : civicProfile.nameEn}</span>
                <span className="block text-[13.5px] text-white/80">{ne ? 'बिर्तामोड–५, झापा' : 'Birtamod-5, Jhapa'}</span>
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>

        {/* Journey: schooling to office; each stop lights up as the reader reaches it */}
        <ScrollReveal className="mt-16 sm:mt-20">
          <h3 className="text-[15px] font-bold text-ink">{ne ? 'यात्रा' : 'The journey so far'}</h3>
          <ol ref={journeyRef} className="journey relative mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-7 lg:gap-y-10">
            {journey.map(({ icon: Icon, year, title, detail }, i) => (
              <li key={title} className="journey-item relative flex gap-3.5" style={{ '--at': (i / journey.length).toFixed(3) } as React.CSSProperties}>
                <span className="journey-dot relative z-10 mt-0.5 grid place-items-center w-10 h-10 shrink-0 rounded-full border">
                  <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  {year && <p className="text-[12px] font-bold tabular-nums text-maroon">{year}</p>}
                  <p className="text-[15px] font-semibold text-ink leading-snug">{title}</p>
                  <p className="mt-0.5 text-[13.5px] text-stone-500 leading-snug">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </div>

      {/* The one bold moment: the courtyard philosophy, full bleed */}
      <ScrollReveal className="mt-16 sm:mt-24">
        <figure ref={quoteRef} className="quote-band relative isolate bg-[#0b6e1c] text-white overflow-hidden">
          {/* Subtle tree-green radial glow and faint dot grain */}
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div className="absolute -right-[10%] -top-[40%] w-[65vw] max-w-[820px] aspect-square rounded-full bg-[radial-gradient(closest-side,rgba(20,152,42,0.5),rgba(11,126,28,0.22)_55%,transparent)]" />
            <div className="absolute -left-[15%] -bottom-[50%] w-[55vw] max-w-[650px] aspect-square rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.3),transparent)]" />
            <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" />
          </div>
          {/* Faded tree watermark from uploaded tree_b5763aee.jpeg */}
          <img
            src="/assets/aistudio/tree_b5763aee.jpeg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none select-none absolute inset-0 -z-10 w-full h-full object-cover object-center opacity-[0.18] mix-blend-screen [filter:brightness(1.06)_contrast(1.25)_invert(1)_hue-rotate(180deg)] [mask-image:radial-gradient(ellipse_78%_82%_at_50%_50%,#000_40%,transparent_88%)]"
          />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div aria-hidden="true" className="flex items-center gap-5">
              <span className="quote-mark grid place-items-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/[0.07] ring-1 ring-white/20 backdrop-blur-sm">
                <svg viewBox="0 0 32 32" className="w-6 h-6 sm:w-7 sm:h-7 text-[#c8f0d0]" fill="currentColor">
                  <path d="M13 8.5c-4.6 1.4-7.5 5-7.5 10.3V24h7.2v-7.2H9c.1-3 1.6-5.1 4.6-6.3L13 8.5zm13.5 0c-4.6 1.4-7.5 5-7.5 10.3V24h7.2v-7.2h-3.7c.1-3 1.6-5.1 4.6-6.3l-.6-2z" />
                </svg>
              </span>
              <span className="quote-rule h-px flex-1 max-w-[180px] bg-gradient-to-r from-white/40 to-transparent" />
            </div>
            <blockquote className="mt-8 sm:mt-10">
              <p
                className={`font-serif text-white text-[clamp(1.375rem,1rem+1.6vw,2.25rem)] ${
                  ne ? 'leading-[1.7] font-medium' : 'italic leading-[1.45]'
                }`}
              >
                {quoteWords.map((w, i) => (
                  <React.Fragment key={i}>
                    <span className="qw" style={{ '--w': ((i / quoteWords.length) * 0.82).toFixed(3) } as React.CSSProperties}>
                      {w}
                    </span>{' '}
                  </React.Fragment>
                ))}
              </p>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 text-sm text-white/75">
              <span className="h-px w-8 bg-white/40" aria-hidden="true" />
              <span>
                <span className="font-semibold text-white">{ne ? civicProfile.nameNe : civicProfile.nameEn}</span>
                <span className="ml-2">{ne ? 'नगरपालिकाको आँगनबाट, बिर्तामोड–५' : 'From the municipal courtyard, Birtamod-5'}</span>
              </span>
            </figcaption>
          </div>
        </figure>
      </ScrollReveal>
    </section>
  );
};
