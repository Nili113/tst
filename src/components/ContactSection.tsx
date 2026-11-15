import React from 'react';
import { civicProfile } from '../data/portfolioData';
import { Language } from '../types';
import { MapPin, Phone, Mail, Clock, MessageSquare, Briefcase, GraduationCap, CheckCircle2, Building2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ContactSectionProps {
  lang: Language;
  onOpenDesk: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, onOpenDesk }) => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-[#faf8f5] border-b border-civic-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Editorial Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-civic-950 tracking-tight leading-[1.3] ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
              {lang === 'ne' ? 'प्रत्यक्ष संवाद तथा नागरिक सहायता' : 'Direct Constituent Dialogue & Ward Desk'}
            </h2>
            <p className="mt-3 text-base text-civic-600 leading-relaxed font-sans">
              {lang === 'ne'
                ? 'वडा कार्यालयको कार्यतालिका, सिफारिस प्रक्रिया, नागरिक गुनासो सुनुवाइ वा प्रत्यक्ष संवादका लागि सम्पर्क गर्नुहोस्।'
                : 'Official municipal schedule, civic recommendation processing, grievance redressal, and direct constituent support.'}
            </p>
            <div className="w-12 h-0.5 bg-crimson-800 mt-4" />
          </div>
        </ScrollReveal>

        {/* 2 Balanced, Equal-Height Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Official Ward Office & Verification (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={100} className="h-full">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-civic-200/90 shadow-sm flex flex-col justify-between space-y-6 h-full">
                
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-4 pb-4 border-b border-civic-100">
                    <div className="w-12 h-12 rounded-xl bg-crimson-50 text-crimson-800 flex items-center justify-center shrink-0 border border-crimson-100">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg sm:text-xl text-civic-950 ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
                        {lang === 'ne' ? 'वडा कार्यालय, बिर्तामोड–५' : 'Ward No. 5 Office, Birtamod'}
                      </h3>
                      <p className="text-xs text-civic-500 mt-0.5">
                        {lang === 'ne' ? 'बिर्तामोड नगरपालिका, झापा जिल्ला, कोशी प्रदेश' : 'Birtamod Municipality, Jhapa, Koshi Province'}
                      </p>
                    </div>
                  </div>

                  {/* Contact Detail Rows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Office Location */}
                    <div className="p-4 rounded-xl bg-[#faf8f5] border border-civic-200/60 flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-crimson-800 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-civic-900 uppercase tracking-wider">
                          {lang === 'ne' ? 'कार्यालय ठेगाना' : 'Office Address'}
                        </div>
                        <div className="text-xs text-civic-700 mt-1 font-medium leading-snug">
                          {lang === 'ne' ? civicProfile.officeLocationNe : civicProfile.officeLocationEn}
                        </div>
                      </div>
                    </div>

                    {/* Operating Hours */}
                    <div className="p-4 rounded-xl bg-[#faf8f5] border border-civic-200/60 flex items-start gap-3">
                      <Clock className="w-5 h-5 text-crimson-800 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-civic-900 uppercase tracking-wider">
                          {lang === 'ne' ? 'कार्यालय समय' : 'Office Hours'}
                        </div>
                        <div className="text-xs text-civic-700 mt-1 leading-snug">
                          {lang === 'ne' ? civicProfile.officeHoursNe : civicProfile.officeHoursEn}
                        </div>
                      </div>
                    </div>

                    {/* Hotline */}
                    <div className="p-4 rounded-xl bg-[#faf8f5] border border-civic-200/60 flex items-start gap-3">
                      <Phone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-civic-900 uppercase tracking-wider">
                          {lang === 'ne' ? 'वडा फोन नम्बर' : 'Ward Hotline'}
                        </div>
                        <a
                          href={`tel:${civicProfile.phone}`}
                          className="text-sm font-mono font-bold text-civic-900 hover:text-crimson-800 transition-colors block mt-1"
                        >
                          {civicProfile.phone}
                        </a>
                        <div className="text-[11px] text-civic-500 mt-0.5">
                          {lang === 'ne' ? 'कार्यालय समयमा प्रत्यक्ष सम्पर्क' : 'Available during office hours'}
                        </div>
                      </div>
                    </div>

                    {/* Constituent Email */}
                    <div className="p-4 rounded-xl bg-[#faf8f5] border border-civic-200/60 flex items-start gap-3">
                      <Mail className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-civic-900 uppercase tracking-wider">
                          {lang === 'ne' ? 'इमेल सम्पर्क' : 'Constituent Email'}
                        </div>
                        <a
                          href={`mailto:${civicProfile.email}`}
                          className="text-xs font-mono font-medium text-civic-900 hover:text-crimson-800 transition-colors block mt-1 break-all"
                        >
                          {civicProfile.email}
                        </a>
                        <div className="text-[11px] text-civic-500 mt-0.5">
                          {lang === 'ne' ? 'नागरिक सोधपुछ तथा पत्राचार' : 'Citizen inquiries and correspondence'}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Verified Constituent Credentials / Background Badges */}
                  <div className="pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-civic-400 mb-2">
                      {lang === 'ne' ? 'प्रतिनिधिको परिचय तथा व्यावसायिक विवरण' : 'Representative Credentials & Enterprise'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-civic-700">
                      <div className="px-3 py-2 rounded-lg bg-sand-100/80 border border-civic-200/70 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-crimson-800 shrink-0" />
                        <span>{lang === 'ne' ? civicProfile.businessNe : civicProfile.businessEn}</span>
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-sand-100/80 border border-civic-200/70 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-crimson-800 shrink-0" />
                        <span>{lang === 'ne' ? civicProfile.educationNe : civicProfile.educationEn}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Status Banner */}
                <div className="pt-4 border-t border-civic-100 flex items-center justify-between text-xs text-civic-500">
                  <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{lang === 'ne' ? 'नागरिक सेवामा शून्य ढिलाइ' : 'Zero administrative delay'}</span>
                  </span>
                  <span className="font-mono text-[11px]">Birtamod-5, Jhapa</span>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Card 2: Interactive Citizen Desk & Grievance Registration (5 cols) */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={200} className="h-full">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-civic-200/90 shadow-sm flex flex-col justify-between space-y-6 h-full">
                
                <div className="space-y-5">
                  
                  <div className="flex items-center gap-3.5 pb-4 border-b border-civic-100">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg sm:text-xl text-civic-950 ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
                        {lang === 'ne' ? 'नागरिक सेवा तथा गुनासो दर्ता' : 'Citizen Service & Grievance Desk'}
                      </h3>
                      <p className="text-xs text-civic-500 mt-0.5">
                        {lang === 'ne' ? 'प्रत्यक्ष डिजिटल सुनुवाइ तथा सुझाव फारम' : 'Direct Digital Redressal & Consultation'}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-civic-600 leading-relaxed">
                    {lang === 'ne'
                      ? 'सडक, ढल, सिफारिस वा वडाभित्रका कुनै पनि समस्याबारे वडाध्यक्ष रोहित प्रसाईंलाई सिधै डिजिटल जानकारी गराउनुहोस्।'
                      : 'Submit municipal inquiries, road repair requests, or constituent feedback directly to the Ward Chairperson.'}
                  </p>

                  {/* Service Commitments Box */}
                  <div className="p-4 rounded-xl bg-[#f8f6f0] border border-amber-200/70 space-y-3">
                    <div className="text-xs font-bold text-civic-900 uppercase tracking-wider font-sans">
                      {lang === 'ne' ? 'नागरिक सेवामा हाम्रो प्रतिबद्धता' : 'Our Service Commitments'}
                    </div>
                    <div className="space-y-2 text-xs text-civic-700">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{lang === 'ne' ? 'कागजात सिफारिस सोही कार्यदिनमै प्रमाणीकरण' : 'Same-day verification for standard documents'}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{lang === 'ne' ? 'सार्वजनिक गुनासोमा २४ घण्टाभित्र प्रारम्भिक सुनुवाइ' : 'Initial inquiry response within 24 hours'}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{lang === 'ne' ? 'शून्य घुस, पारदर्शी तथा निष्पक्ष प्रशासनिक सेवा' : 'Zero bribery, transparent & ethical administration'}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-civic-100 space-y-3">
                  <button
                    onClick={onOpenDesk}
                    className="taste-btn w-full py-3.5 px-5 rounded-xl bg-crimson-800 hover:bg-crimson-900 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{lang === 'ne' ? 'नागरिक सेवा फारम खोल्नुहोस्' : 'Open Citizen Assistance Form'}</span>
                  </button>
                  <div className="text-center text-[11px] text-civic-400">
                    {lang === 'ne' ? 'वडा कार्यालय समय: आइतबार–शुक्रबार' : 'Ward Office Hours: Sun – Fri'}
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
