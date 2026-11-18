import React from 'react';
import { civicProfile } from '../data/portfolioData';
import { Language } from '../types';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { FacebookIcon, YoutubeIcon } from './BrandIcons';
import { ScrollReveal } from './ScrollReveal';

interface ContactSectionProps {
  lang: Language;
  onOpenDesk: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, onOpenDesk }) => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-10 sm:mb-14">
            <div className={`text-xs font-mono uppercase font-bold text-[#801426] mb-2 ${
              lang === 'en' ? 'tracking-widest' : 'tracking-normal'
            }`}>
              — {lang === 'ne' ? 'प्रमाणित सम्पर्क तथा माध्यमहरू' : 'VERIFIED CHANNELS'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.15]">
              {lang === 'ne' ? 'सम्पर्क तथा आधिकारिक विवरण' : 'Contact & Links'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              {lang === 'ne'
                ? 'वडा कार्यालयको आधिकारिक ठेगाना, सिफारिस कार्यतालिका, प्रत्यक्ष नागरिक सहायता र प्रमाणित सामाजिक सम्पर्कहरू।'
                : 'Only verified public contacts, official ward schedules, and constituent dialogue links are listed.'}
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Perfectly Aligned Editorial Grid (Matching Heights & Harmonized Button Tone) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Action Column (Left - 5 cols) */}
          <div className="lg:col-span-5 h-full">
            <ScrollReveal delay={100} className="h-full">
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs h-full flex flex-col justify-between space-y-6">
                
                {/* Desk Direct Inquiry */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-[#0f172a] mb-1.5">
                      {lang === 'ne' ? 'प्रत्यक्ष नागरिक सहायता डेस्क' : 'Direct Constituent Desk'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {lang === 'ne'
                        ? 'सडक, ढल वा वडाका कुनै पनि सिफारिस समस्या सिधै वडाध्यक्ष रोहित प्रसाईंलाई डिजिटल रूपमा पठाउनुहोस्।'
                        : 'Submit municipal inquiries, road repair tickets, or recommendation feedback directly to the Ward Chairperson.'}
                    </p>
                  </div>

                  <button
                    onClick={onOpenDesk}
                    className="taste-btn w-full py-3.5 px-5 rounded-xl bg-[#420c15] hover:bg-[#30080f] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>{lang === 'ne' ? 'नागरिक सहायता फारम खोल्नुहोस्' : 'Open Assistance Form'}</span>
                  </button>
                </div>

                {/* Social Channels Nested in Clean Balanced Card Foot */}
                <div className="pt-5 border-t border-slate-200/80 space-y-2.5">
                  <div className="text-[11px] font-mono uppercase font-bold text-slate-400">
                    {lang === 'ne' ? 'आधिकारिक डिजिटल सम्पर्क' : 'VERIFIED CHANNELS'}
                  </div>

                  <a
                    href={civicProfile.facebookPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="taste-btn flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-all text-xs font-semibold text-[#0f172a]"
                  >
                    <div className="flex items-center gap-2.5">
                      <FacebookIcon className="w-4 h-4 text-[#1877F2]" />
                      <span>{lang === 'ne' ? 'आधिकारिक फेसबुक प्रोफाइल' : 'Official Facebook Profile'}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <a
                    href={civicProfile.youtubeSearch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="taste-btn flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-all text-xs font-semibold text-[#0f172a]"
                  >
                    <div className="flex items-center gap-2.5">
                      <YoutubeIcon className="w-4 h-4 text-[#FF0000]" />
                      <span>{lang === 'ne' ? 'युट्युब भिडियो रेकर्ड' : 'YouTube Video Stream'}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Official Details Column (Right - 7 cols) - Matching Height & Visual Weight */}
          <div className="lg:col-span-7 h-full">
            <ScrollReveal delay={150} className="h-full">
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs h-full flex flex-col justify-between">
                
                <div>
                  <h3 className="font-bold text-lg sm:text-xl text-[#0f172a] mb-2 pb-3 border-b border-slate-200/80">
                    {lang === 'ne' ? 'कार्यालय विवरण तथा सेवा तालिका' : 'Office Details & Public Schedule'}
                  </h3>

                  <div className="divide-y divide-slate-200/70 text-xs sm:text-sm">
                    
                    <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2 font-mono uppercase text-[11px] font-bold text-slate-400">
                        <MapPin className="w-4 h-4 text-[#801426]" />
                        <span>{lang === 'ne' ? 'कार्यालय ठेगाना' : 'LOCATION'}</span>
                      </div>
                      <div className="font-medium text-slate-800 text-left sm:text-right">
                        {lang === 'ne' ? civicProfile.locationNe : civicProfile.locationEn}
                      </div>
                    </div>

                    <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2 font-mono uppercase text-[11px] font-bold text-slate-400">
                        <Clock className="w-4 h-4 text-[#801426]" />
                        <span>{lang === 'ne' ? 'कार्यालय समय' : 'OFFICE HOURS'}</span>
                      </div>
                      <div className="font-medium text-slate-800 text-left sm:text-right">
                        {lang === 'ne' ? civicProfile.officeHoursNe : civicProfile.officeHoursEn}
                      </div>
                    </div>

                    <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2 font-mono uppercase text-[11px] font-bold text-slate-400">
                        <Phone className="w-4 h-4 text-[#801426]" />
                        <span>{lang === 'ne' ? 'वडा कार्यालय फोन' : 'WARD PHONE'}</span>
                      </div>
                      <div className="font-mono font-bold text-slate-900 text-left sm:text-right">
                        {civicProfile.phone}
                      </div>
                    </div>

                    <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="flex items-center gap-2 font-mono uppercase text-[11px] font-bold text-slate-400">
                        <Mail className="w-4 h-4 text-[#801426]" />
                        <span>{lang === 'ne' ? 'आधिकारिक इमेल' : 'EMAIL'}</span>
                      </div>
                      <div className="font-mono font-medium text-[#801426] text-left sm:text-right">
                        <a href={`mailto:${civicProfile.email}`} className="hover:underline">
                          {civicProfile.email}
                        </a>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Emergency Hotlines Footer Banner */}
                <div className="mt-4 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white/70 p-3 rounded-xl border border-slate-200/80">
                  <div className="font-mono uppercase text-[11px] font-bold text-slate-500">
                    {lang === 'ne' ? 'आपतकालीन सम्पर्क' : 'EMERGENCY NUMBERS'}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono font-bold">
                    <span className="text-emerald-700">{lang === 'ne' ? 'प्रहरी: १००' : 'Police: 100'}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[#801426]">{lang === 'ne' ? 'एम्बुलेन्स: १०२' : 'Ambulance: 102'}</span>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
