import React, { useState } from 'react';
import { Language } from '../types';
import { X, Send, CheckCircle2, FileText } from 'lucide-react';

interface CitizenDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const CitizenDeskModal: React.FC<CitizenDeskModalProps> = ({ isOpen, onClose, lang }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [tole, setTole] = useState('');
  const [category, setCategory] = useState('recommendation');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedTicket = 'BP5-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(generatedTicket);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhone('');
    setTole('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/70 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto border border-[#e2dcd0] shadow-2xl p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#0f172a] transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#0f172a]">
              {lang === 'ne' ? 'गुनासो सफलतापूर्वक दर्ता भयो!' : 'Grievance Submitted Successfully!'}
            </h3>

            <p className="text-sm text-[#475569] max-w-sm mx-auto">
              {lang === 'ne'
                ? 'तपाईंको अनुरोध वडाध्यक्ष सचिवालयमा दर्ता भएको छ। आवश्यक समन्वयपछि छिट्टै सम्पर्क गरिनेछ।'
                : 'Your submission has been registered with the Ward Chairperson desk. Our team will verify and follow up promptly.'}
            </p>

            <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#e2dcd0] inline-block font-mono text-sm text-[#0f172a]">
              <span className="text-xs text-[#64748b] block mb-1">
                {lang === 'ne' ? 'दर्ता ट्र्याकिङ नम्बर' : 'Tracking Reference Ticket'}:
              </span>
              <strong className="text-[#801426] text-base">{ticketId}</strong>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="taste-btn px-6 py-2.5 rounded-lg bg-[#801426] hover:bg-[#680f1e] text-white font-bold text-xs shadow-md shadow-[#801426]/20 transition-all"
              >
                {lang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fbf2f4] text-[#801426] text-xs font-semibold mb-2 border border-[#f5d0d6]">
                <FileText className="w-3.5 h-3.5" />
                <span>{lang === 'ne' ? 'वडा नागरिक डेस्क' : 'Citizen Assistance Desk'}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#0f172a]">
                {lang === 'ne' ? 'नागरिक सेवा तथा गुनासो फारम' : 'Civic Inquiry & Grievance'}
              </h3>
              <p className="text-xs text-[#64748b] mt-1">
                {lang === 'ne'
                  ? 'वडा नं. ५ बिर्तामोडका नागरिकहरूले सिधै आफ्नो समस्या वा सुझाव पेश गर्न सक्नुहुन्छ।'
                  : 'Submit official inquiries, recommendation requests, or municipal maintenance tickets.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0f172a] mb-1">
                  {lang === 'ne' ? 'नागरिकको पूरा नाम *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={lang === 'ne' ? 'उदाहरण: हरि प्रसाद शर्मा' : 'e.g., Hari Prasad Sharma'}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#d6cec0] bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#801426] focus:border-[#801426] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#0f172a] mb-1">
                    {lang === 'ne' ? 'सम्पर्क फोन / मोबाइल *' : 'Contact Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#d6cec0] bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#801426] focus:border-[#801426] text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0f172a] mb-1">
                    {lang === 'ne' ? 'टोल वा वस्तीको नाम' : 'Tole / Neighborhood'}
                  </label>
                  <input
                    type="text"
                    value={tole}
                    onChange={(e) => setTole(e.target.value)}
                    placeholder={lang === 'ne' ? 'उदाहरण: आवास मार्ग' : 'e.g., Aawas Marg'}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#d6cec0] bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#801426] focus:border-[#801426] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0f172a] mb-1">
                  {lang === 'ne' ? 'सेवा वा गुनासोको प्रकृति' : 'Inquiry Category'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#d6cec0] bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#801426] focus:border-[#801426] text-sm"
                >
                  <option value="recommendation">
                    {lang === 'ne' ? 'नागरिकता, जन्मदर्ता वा चारकिल्ला सिफारिस' : 'Ward Recommendation'}
                  </option>
                  <option value="drainage">
                    {lang === 'ne' ? 'ढल निकास तथा सडक मर्मत' : 'Drainage & Road Repair'}
                  </option>
                  <option value="electricity">
                    {lang === 'ne' ? 'सडक बत्ती तथा सार्वजनिक बिजुली' : 'Streetlights & Public Utilities'}
                  </option>
                  <option value="sanitation">
                    {lang === 'ne' ? 'फोहोरमैला तथा सरसफाइ गुनासो' : 'Sanitation & Waste Disposal'}
                  </option>
                  <option value="general">
                    {lang === 'ne' ? 'अन्य सामान्य गुनासो तथा सुझाव' : 'General Suggestion or Grievance'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#0f172a] mb-1">
                  {lang === 'ne' ? 'समस्या वा सुझावको विवरण *' : 'Detailed Description *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    lang === 'ne'
                      ? 'तपाईंको समस्या वा सुझाव स्पष्ट रूपमा उल्लेख गर्नुहोस्...'
                      : 'Please describe the issue or recommendation clearly...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#d6cec0] bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#801426] focus:border-[#801426] text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="taste-btn w-full py-3 px-4 rounded-xl bg-[#801426] hover:bg-[#680f1e] text-white font-bold text-sm shadow-md shadow-[#801426]/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>{lang === 'ne' ? 'गुनासो दर्ता गर्नुहोस्' : 'Submit Ticket'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
