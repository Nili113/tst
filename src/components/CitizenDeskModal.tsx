import React, { useId, useState } from 'react';
import { Language } from '../types';
import { X, Send, FileText, Copy, Check } from 'lucide-react';
import { Modal } from './Modal';

interface CitizenDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

/** Accept messy phone input (Devanagari digits, spaces, dashes, +977) and return clean digits. */
function normalizePhone(raw: string): string {
  let s = raw.replace(/[०-९]/g, (d) => String('०१२३४५६७८९'.indexOf(d))).replace(/[^\d+]/g, '');
  s = s.replace(/^\+?977/, '').replace(/\+/g, '');
  return s;
}
const isValidPhone = (s: string) => /^\d{7,10}$/.test(normalizePhone(s));

export const CitizenDeskModal: React.FC<CitizenDeskModalProps> = ({ isOpen, onClose, lang }) => {
  const ne = lang === 'ne';
  const titleId = useId();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [tole, setTole] = useState('');
  const [category, setCategory] = useState('recommendation');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [shake, setShake] = useState(false);
  const [copied, setCopied] = useState(false);

  const phoneInvalid = phoneTouched && phone.length > 0 && !isValidPhone(phone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPhone(phone)) {
      setPhoneTouched(true);
      setShake(true);
      window.setTimeout(() => setShake(false), 300);
      document.getElementById('desk-phone')?.focus();
      return;
    }
    setPhone(normalizePhone(phone));
    setTicketId('BP5-' + Math.floor(100000 + Math.random() * 900000));
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    window.setTimeout(() => {
      setIsSubmitted(false);
      setFullName('');
      setPhone('');
      setPhoneTouched(false);
      setTole('');
      setMessage('');
      setCopied(false);
    }, 200);
  };

  const copyTicket = async () => {
    try {
      await navigator.clipboard.writeText(ticketId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose} labelledBy={titleId} className="sm:max-w-lg font-sans">
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-4 right-4 w-10 h-10 grid place-items-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-ink active:scale-90 transition-[transform,background-color,color] duration-150 z-10"
        aria-label={ne ? 'बन्द गर्नुहोस्' : 'Close'}
      >
        <X className="w-5 h-5" />
      </button>

      {isSubmitted ? (
        <div className="text-center px-6 sm:px-10 pt-12 pb-10" role="status">
          <div className="relative w-20 h-20 mx-auto">
            <span className="ring absolute inset-0 rounded-full bg-emerald-500/30" aria-hidden="true" />
            <span className="pop relative w-20 h-20 rounded-full bg-emerald-600 text-white grid place-items-center shadow-[0_10px_24px_-10px_rgba(5,150,105,0.8)]">
              <svg className="draw w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
          </div>

          <h3 id={titleId} className="mt-6 text-2xl font-extrabold text-ink tracking-tight">
            {ne ? 'गुनासो सफलतापूर्वक दर्ता भयो!' : 'Grievance submitted'}
          </h3>
          <p className="mt-2 text-[15px] text-stone-600 max-w-sm mx-auto leading-relaxed">
            {ne
              ? 'तपाईंको अनुरोध वडाध्यक्ष सचिवालयमा दर्ता भएको छ। आवश्यक समन्वयपछि छिट्टै सम्पर्क गरिनेछ।'
              : 'Your submission has been registered with the Ward Chairperson desk. Our team will verify and follow up promptly.'}
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-ivory-section border border-stone-200 pl-5 pr-2 py-2">
            <div className="text-left">
              <span className="block text-xs text-stone-500">{ne ? 'दर्ता ट्र्याकिङ नम्बर' : 'Tracking reference'}</span>
              <strong className="text-lg text-maroon tabular-nums tracking-wide">{ticketId}</strong>
            </div>
            <button
              type="button"
              onClick={copyTicket}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3 rounded-xl bg-white border border-stone-200 text-[13px] font-semibold text-ink hover:border-stone-300 active:scale-95 transition-transform"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-400" />}
              <span>{copied ? (ne ? 'कपी भयो' : 'Copied') : ne ? 'कपी' : 'Copy'}</span>
            </button>
          </div>

          <div className="mt-8">
            <button type="button" onClick={handleClose} className="btn btn-primary px-8" data-autofocus>
              <span className="trim">{ne ? 'बन्द गर्नुहोस्' : 'Close'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-7 sm:pb-8">
          <div className="pr-12">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-maroon-tint text-maroon text-xs font-semibold border border-[#f1d5da]">
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              {ne ? 'वडा नागरिक डेस्क' : 'Citizen Assistance Desk'}
            </span>
            <h3 id={titleId} className="mt-3 text-2xl font-extrabold text-ink tracking-tight">
              {ne ? 'नागरिक सेवा तथा गुनासो फारम' : 'Civic Inquiry & Grievance'}
            </h3>
            <p className="mt-1.5 text-sm text-stone-500 leading-relaxed">
              {ne
                ? 'वडा नं. ५ बिर्तामोडका नागरिकहरूले सिधै आफ्नो समस्या वा सुझाव पेश गर्न सक्नुहुन्छ।'
                : 'Submit official inquiries, recommendation requests, or municipal maintenance tickets.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate={false} className="mt-6 space-y-4">
            <div>
              <label htmlFor="desk-name" className="label">
                {ne ? 'नागरिकको पूरा नाम' : 'Full name'} <span className="text-maroon">*</span>
              </label>
              <input
                id="desk-name"
                type="text"
                required
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => setFullName((v) => v.replace(/\s+/g, ' ').trim())}
                placeholder={ne ? 'उदाहरण: हरि प्रसाद शर्मा' : 'e.g., Hari Prasad Sharma'}
                className="field"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={shake ? 'shake' : ''}>
                <label htmlFor="desk-phone" className="label">
                  {ne ? 'सम्पर्क फोन / मोबाइल' : 'Contact phone'} <span className="text-maroon">*</span>
                </label>
                <input
                  id="desk-phone"
                  type="tel"
                  inputMode="tel"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => {
                    setPhoneTouched(true);
                    if (isValidPhone(phone)) setPhone(normalizePhone(phone));
                  }}
                  aria-invalid={phoneInvalid}
                  aria-describedby="desk-phone-hint"
                  placeholder="98XXXXXXXX"
                  className="field tabular-nums"
                />
                <p id="desk-phone-hint" className={`mt-1.5 text-xs ${phoneInvalid ? 'text-[#b42318]' : 'text-stone-400'}`}>
                  {phoneInvalid
                    ? ne
                      ? '७ देखि १० अंकको नम्बर लेख्नुहोस्।'
                      : 'Enter a 7–10 digit number.'
                    : ne
                    ? 'नेपाली वा अंग्रेजी अंक दुवै चल्छ।'
                    : 'Spaces, dashes and +977 are fine.'}
                </p>
              </div>

              <div>
                <label htmlFor="desk-tole" className="label">
                  {ne ? 'टोल वा वस्तीको नाम' : 'Tole / neighbourhood'}
                </label>
                <input
                  id="desk-tole"
                  type="text"
                  value={tole}
                  onChange={(e) => setTole(e.target.value)}
                  onBlur={() => setTole((v) => v.replace(/\s+/g, ' ').trim())}
                  placeholder={ne ? 'उदाहरण: आवास मार्ग' : 'e.g., Aawas Marg'}
                  className="field"
                />
              </div>
            </div>

            <div>
              <label htmlFor="desk-category" className="label">
                {ne ? 'सेवा वा गुनासोको प्रकृति' : 'Inquiry category'}
              </label>
              <select id="desk-category" value={category} onChange={(e) => setCategory(e.target.value)} className="field">
                <option value="recommendation">{ne ? 'नागरिकता, जन्मदर्ता वा चारकिल्ला सिफारिस' : 'Ward Recommendation'}</option>
                <option value="drainage">{ne ? 'ढल निकास तथा सडक मर्मत' : 'Drainage & Road Repair'}</option>
                <option value="electricity">{ne ? 'सडक बत्ती तथा सार्वजनिक बिजुली' : 'Streetlights & Public Utilities'}</option>
                <option value="sanitation">{ne ? 'फोहोरमैला तथा सरसफाइ गुनासो' : 'Sanitation & Waste Disposal'}</option>
                <option value="general">{ne ? 'अन्य सामान्य गुनासो तथा सुझाव' : 'General Suggestion or Grievance'}</option>
              </select>
            </div>

            <div>
              <label htmlFor="desk-message" className="label">
                {ne ? 'समस्या वा सुझावको विवरण' : 'Description'} <span className="text-maroon">*</span>
              </label>
              <textarea
                id="desk-message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={ne ? 'तपाईंको समस्या वा सुझाव स्पष्ट रूपमा उल्लेख गर्नुहोस्…' : 'Describe the issue or recommendation clearly…'}
                className="field resize-y min-h-[112px]"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full min-h-[52px] rounded-2xl mt-2">
              <Send className="btn-icon btn-icon-nudge w-4 h-4" aria-hidden="true" />
              <span className="trim">{ne ? 'गुनासो दर्ता गर्नुहोस्' : 'Submit grievance'}</span>
            </button>
          </form>
        </div>
      )}
    </Modal>
  );
};
