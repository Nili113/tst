import React from 'react';
import { civicProfile } from '../data/portfolioData';
import { Language } from '../types';
import { MapPin, Mail, MessageSquare, ArrowUpRight } from 'lucide-react';
import { FacebookIcon, YoutubeIcon } from './BrandIcons';
import { ScrollReveal } from './ScrollReveal';
import { SectionHeader } from './SectionHeader';

interface ContactSectionProps {
  lang: Language;
  onOpenDesk: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, onOpenDesk }) => {
  const ne = lang === 'ne';

  const rows = [
    { icon: MapPin, label: ne ? 'कार्यालय ठेगाना' : 'Location', value: <>{ne ? civicProfile.locationNe : civicProfile.locationEn}</> },
    {
      icon: Mail,
      label: ne ? 'आधिकारिक इमेल' : 'Email',
      value: (
        <a href={`mailto:${civicProfile.email}`} className="font-medium text-maroon underline decoration-maroon/30 hover:decoration-maroon break-all">
          {civicProfile.email}
        </a>
      ),
    },
  ];

  const channels = [
    { href: civicProfile.facebookPage, icon: <FacebookIcon className="w-[18px] h-[18px] text-[#1877F2]" />, label: ne ? 'आधिकारिक फेसबुक प्रोफाइल' : 'Official Facebook Profile' },
    { href: civicProfile.youtubeSearch, icon: <YoutubeIcon className="w-[18px] h-[18px] text-[#FF0000]" />, label: ne ? 'युट्युब भिडियो रेकर्ड' : 'YouTube Video Stream' },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white font-sans border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={ne ? 'प्रमाणित सम्पर्क तथा माध्यमहरू' : 'Verified channels'}
          title={ne ? 'सम्पर्क तथा आधिकारिक विवरण' : 'Contact & Links'}
          lede={
            ne
              ? 'वडा कार्यालयको आधिकारिक ठेगाना, प्रत्यक्ष नागरिक सहायता र प्रमाणित सामाजिक सम्पर्कहरू।'
              : 'Only verified public contacts and constituent dialogue links are listed.'
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Desk */}
          <ScrollReveal className="lg:col-span-5" delay={60}>
            <div className="h-full rounded-3xl bg-ivory-section border border-stone-200/80 p-6 sm:p-8 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
                {ne ? 'प्रत्यक्ष नागरिक सहायता डेस्क' : 'Direct Constituent Desk'}
              </h3>
              <p className="mt-2 text-[15px] text-stone-600 leading-[1.7]">
                {ne
                  ? 'सडक, ढल वा वडाका कुनै पनि सिफारिस समस्या सिधै वडाध्यक्ष रोहित प्रसाईंलाई डिजिटल रूपमा पठाउनुहोस्।'
                  : 'Submit municipal inquiries, road repair tickets, or recommendation feedback directly to the Ward Chairperson.'}
              </p>
              <button type="button" onClick={onOpenDesk} className="btn btn-primary w-full mt-6 min-h-[52px] rounded-2xl">
                <MessageSquare className="btn-icon btn-icon-tilt w-4 h-4" aria-hidden="true" />
                <span className="trim">{ne ? 'नागरिक सहायता फारम खोल्नुहोस्' : 'Open Assistance Form'}</span>
              </button>

              <div className="mt-8 pt-6 border-t border-stone-300/60">
                <p className="text-[13px] font-semibold text-stone-500 mb-3">
                  {ne ? 'आधिकारिक डिजिटल सम्पर्क' : 'Verified channels'}
                </p>
                <div className="space-y-2">
                  {channels.map((c) => (
                    <a
                      key={c.href}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 min-h-[52px] px-4 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 active:scale-[0.985] transition-[transform,border-color,box-shadow] duration-150 hover:shadow-[0_4px_14px_-8px_rgba(28,25,23,0.25)]"
                    >
                      <span className="flex items-center gap-3 text-[14.5px] font-semibold text-ink">
                        {c.icon}
                        {c.label}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-stone-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-maroon" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Office details */}
          <ScrollReveal className="lg:col-span-7" delay={120}>
            <div className="h-full rounded-3xl border border-stone-200 p-6 sm:p-8 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight pb-4 border-b border-stone-200">
                {ne ? 'कार्यालय विवरण' : 'Office Details'}
              </h3>
              <dl className="divide-y divide-stone-200/80">
                {rows.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-6 gap-y-1.5 py-4">
                    <dt className="flex items-center gap-2.5 text-[13.5px] font-medium text-stone-500">
                      <Icon className="w-4 h-4 text-maroon shrink-0" aria-hidden="true" />
                      {label}
                    </dt>
                    <dd className="text-[15px] text-ink leading-relaxed pl-[26px] sm:pl-0">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Map fills the space the schedule used to take */}
              <div className="map-frame group relative mt-2 flex-1 min-h-[260px] rounded-2xl overflow-hidden border border-stone-200 bg-stone-100">
                <iframe
                  title={ne ? 'वडा कार्यालयको नक्सा' : 'Map of the ward office'}
                  src={civicProfile.mapEmbed}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
                <a
                  href={civicProfile.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute left-3 bottom-3 inline-flex items-center gap-2 min-h-[40px] pl-2 pr-3.5 rounded-full bg-white/95 backdrop-blur border border-stone-200 shadow-[0_6px_18px_-8px_rgba(28,25,23,0.35)] text-[13px] font-semibold text-ink hover:text-maroon active:scale-95 transition-[transform,color] duration-150"
                >
                  <span className="grid place-items-center w-7 h-7 rounded-full bg-maroon text-white">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  {ne ? 'गुगल म्यापमा खोल्नुहोस्' : 'Open in Google Maps'}
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
                </a>
              </div>

              <div className="pt-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-stone-50 border border-stone-200/80 px-4 py-3">
                  <span className="text-[13.5px] font-semibold text-stone-600">
                    {ne ? 'आपतकालीन सम्पर्क' : 'Emergency numbers'}
                  </span>
                  <div className="flex items-center gap-2">
                    <a href="tel:100" className="inline-flex items-center min-h-[40px] px-3.5 rounded-full bg-white border border-stone-200 text-[13.5px] font-semibold text-ink hover:border-stone-300 active:scale-95 transition-transform tabular-nums">
                      {ne ? 'प्रहरी: १००' : 'Police: 100'}
                    </a>
                    <a href="tel:102" className="inline-flex items-center min-h-[40px] px-3.5 rounded-full bg-white border border-stone-200 text-[13.5px] font-semibold text-maroon hover:border-stone-300 active:scale-95 transition-transform tabular-nums">
                      {ne ? 'एम्बुलेन्स: १०२' : 'Ambulance: 102'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
