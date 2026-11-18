import React from 'react';
import { autobiographyData, civicProfile } from '../data/portfolioData';
import { Language } from '../types';
import { Vote, Flag, Users, Trophy } from 'lucide-react';
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
  const quoteRef = useScrollProgress<HTMLElement>((r, vh) => (vh * 0.9 - r.top) / (vh * 0.7));
  const quoteWords = unquote(ne ? autobiographyData.philosophyNe : autobiographyData.philosophyEn).split(/\s+/);

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
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
          </div>

          <ScrollReveal className="lg:col-span-5" delay={120}>
            <aside aria-labelledby="key-facts" className="rounded-2xl border border-stone-200 bg-[#fcfbf9] p-6 sm:p-7">
              <h3 id="key-facts" className="text-[15px] font-bold text-ink">
                {ne ? 'मुख्य विवरण' : 'Key facts'}
              </h3>
              <dl className="mt-4 divide-y divide-stone-200/80">
                {facts.map(({ icon: Icon, title, detail }) => (
                  <div key={title} className="flex items-start gap-3.5 py-3.5 first:pt-1 last:pb-0">
                    <span className="mt-0.5 w-8 h-8 shrink-0 rounded-lg bg-maroon-tint text-maroon grid place-items-center">
                      <Icon className="w-4 h-4" aria-hidden="true" />
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
            </aside>
          </ScrollReveal>
        </div>
      </div>

      {/* The one bold moment: the courtyard philosophy, full bleed */}
      <ScrollReveal className="mt-16 sm:mt-24">
        <figure ref={quoteRef} className="quote-band relative bg-maroon-deep text-white overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]"
          />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <span
              aria-hidden="true"
              className="quote-mark block font-serif text-[88px] sm:text-[120px] leading-[0.7] text-[#d98a97] select-none"
            >
              “
            </span>
            <blockquote className="mt-4 sm:mt-6">
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
                <span className="ml-2">{ne ? 'वडा अध्यक्ष, बिर्तामोड–५' : 'Ward Chairperson, Birtamod-5'}</span>
              </span>
            </figcaption>
          </div>
        </figure>
      </ScrollReveal>
    </section>
  );
};
