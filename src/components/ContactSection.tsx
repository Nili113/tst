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
    <section id="contact" className="py-16 md:py-24 bg-[#faf8f5] border-b border-[#e2dcd0] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Clean Editorial Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12 md:mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] tracking-tight leading-[1.3] ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
              {lang === 'ne' ? 'प्रत्यक्ष संवाद तथा नागरिक सहायता' : 'Direct Constituent Dialogue & Ward Desk'}
            </h2>
            <p className="mt-3 text-base text-[#475569] leading-relaxed font-sans">
              {lang === 'ne'
                ? 'वडा कार्यालयको कार्यतालिका, सिफारिस प्रक्रिया, नागरिक गुनासो सुनुवाइ वा प्रत्यक्ष संवादका लागि सम्पर्क गर्नुहोस्।'
                : 'Official municipal schedule, civic recommendation processing, grievance redressal, and direct constituent support.'}
            </p>
            <div className="w-12 h-0.5 bg-[#801426] mt-4" />
          </div>
        </ScrollReveal>

        {/* 2 Balanced, Equal-Height Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Card 1: Official Ward Office & Verification (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={100} className="h-full">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2dcd0] shadow-sm flex flex-col justify-between space-y-6 h-full">

                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-4 pb-4 border-b border-[#f1f5f9]">
                    <div className="w-12 h-12 rounded-xl bg-[#fbf2f4] text-[#801426] flex items-center justify-center shrink-0 border border-[#f5d0d6]">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg sm:text-xl text-[#0f172a] ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
                        {lang === 'ne' ? 'वडा कार्यालय, बिर्तामोड–५' : 'Ward No. 5 Office, Birtamod'}
                      </h3>
                      <p className="text-xs text-[#64748b] mt-0.5">
                        {lang === 'ne' ? 'बिर्तामोड नगरपालिका, झापा जिल्ला, कोशी प्रदेश' : 'Birtamod Municipality, Jhapa, Koshi Province'}
                      </p>
                    </div>
                  </div>

                  {/* Schedule & Direct Contact Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e2dcd0] space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#0f172a]">
                        <MapPin className="w-4 h-4 text-[#801426]" />
                        <span>{lang === 'ne' ? 'कार्यालय ठेगाना' : 'Office Location'}</span>
                      </div>
                      <div className="text-xs text-[#475569] pl-6">
                        {lang === 'ne' ? civicProfile.officeLocationNe : civicProfile.officeLocationEn}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e2dcd0] space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#0f172a]">
                        <Clock className="w-4 h-4 text-[#801426]" />
                        <span>{lang === 'ne' ? 'कार्यालय समय' : 'Office Hours'}</span>
                      </div>
                      <div className="text-xs text-[#475569] pl-6 leading-relaxed">
                        {lang === 'ne' ? civicProfile.officeHoursNe : civicProfile.officeHoursEn}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e2dcd0] space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#0f172a]">
                        <Phone className="w-4 h-4 text-[#801426]" />
                        <span>{lang === 'ne' ? 'वडा फोन नम्बर' : 'Ward Phone'}</span>
                      </div>
                      <div className="text-xs text-[#475569] pl-6">
                        <span className="font-mono font-bold text-sm text-[#0f172a]">{civicProfile.phone}</span>
                        <div className="text-[11px] text-[#64748b] mt-0.5">
                          {lang === 'ne' ? 'कार्यालय समयमा प्रत्यक्ष सम्पर्क' : 'Direct line during office hours'}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e2dcd0] space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#0f172a]">
                        <Mail className="w-4 h-4 text-[#801426]" />
                        <span>{lang === 'ne' ? 'इमेल सम्पर्क' : 'Official Email'}</span>
                      </div>
                      <div className="text-xs text-[#475569] pl-6">
                        <a href={`mailto:${civicProfile.email}`} className="font-mono text-xs text-[#801426] hover:underline font-semibold">
                          {civicProfile.email}
                        </a>
                        <div className="text-[11px] text-[#64748b] mt-0.5">
                          {lang === 'ne' ? 'नागरिक सोधपुछ तथा पत्राचार' : 'Citizen inquiries and correspondence'}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Verified Constituent Credentials / Background Badges */}
                  <div className="pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-2">
                      {lang === 'ne' ? 'प्रतिनिधिको परिचय तथा व्यावसायिक विवरण' : 'Representative Credentials & Enterprise'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#334155]">
                      <a href="#education" className="px-3 py-2 rounded-lg bg-[#faf8f5] border border-[#e2dcd0] flex items-center gap-2 hover:border-[#801426]/50 transition-colors">
                        <Briefcase className="w-4 h-4 text-[#801426] shrink-0" />
                        <span>{lang === 'ne' ? civicProfile.businessNe : civicProfile.businessEn}</span>
                      </a>
                      <a href="#education" className="px-3 py-2 rounded-lg bg-[#faf8f5] border border-[#e2dcd0] flex items-center gap-2 hover:border-[#801426]/50 transition-colors">
                        <GraduationCap className="w-4 h-4 text-[#801426] shrink-0" />
                        <span>{lang === 'ne' ? civicProfile.educationNe : civicProfile.educationEn}</span>
                      </a>
                    </div>
                  </div>

                </div>

                {/* Bottom Status Banner */}
                <div className="pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-xs text-[#64748b]">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{lang === 'ne' ? 'नागरिक सेवामा शून्य ढिलाइ' : 'Zero administrative delay'}</span>
                  </span>
                  <span className="font-mono text-[11px] text-[#94a3b8]">Birtamod-5, Jhapa</span>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Card 2: Interactive Citizen Desk & Grievance Registration (5 cols) */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={200} className="h-full">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2dcd0] shadow-sm flex flex-col justify-between space-y-6 h-full">

                <div className="space-y-5">

                  <div className="flex items-center gap-3.5 pb-4 border-b border-[#f1f5f9]">
                    <div className="w-12 h-12 rounded-xl bg-[#fbf2f4] text-[#801426] flex items-center justify-center shrink-0 border border-[#f5d0d6]">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg sm:text-xl text-[#0f172a] ${lang === 'en' ? 'font-serif' : 'font-nepali'}`}>
                        {lang === 'ne' ? 'नागरिक सेवा तथा गुनासो दर्ता' : 'Citizen Service & Grievance Desk'}
                      </h3>
                      <p className="text-xs text-[#64748b] mt-0.5">
                        {lang === 'ne' ? 'प्रत्यक्ष डिजिटल सुनुवाइ तथा सुझाव फारम' : 'Direct Digital Redressal & Consultation'}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                    {lang === 'ne'
                      ? 'सडक, ढल, सिफारिस वा वडाभित्रका कुनै पनि समस्याबारे वडाध्यक्ष रोहित प्रसाईंलाई सिधै डिजिटल जानकारी गराउनुहोस्।'
                      : 'Submit municipal inquiries, road repair requests, or constituent feedback directly to the Ward Chairperson.'}
                  </p>

                  {/* Service Commitments Box */}
                  <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e2dcd0] space-y-3">
                    <div className="text-xs font-bold text-[#0f172a] uppercase tracking-wider font-sans">
                      {lang === 'ne' ? 'नागरिक सेवामा हाम्रो प्रतिबद्धता' : 'Our Service Commitments'}
                    </div>
                    <div className="space-y-2 text-xs text-[#475569]">
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
                <div className="pt-4 border-t border-[#f1f5f9] space-y-3">
                  <button
                    onClick={onOpenDesk}
                    className="taste-btn w-full py-3.5 px-5 rounded-xl bg-[#801426] hover:bg-[#680f1e] text-white font-bold text-sm shadow-md shadow-[#801426]/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>{lang === 'ne' ? 'नागरिक सेवा फारम खोल्नुहोस्' : 'Open Citizen Assistance Form'}</span>
                  </button>
                  <div className="text-center text-[11px] text-[#64748b]">
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
