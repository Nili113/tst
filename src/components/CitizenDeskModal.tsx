import React, { useState } from 'react';
import { Language } from '../types';
import { X, Send, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

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
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !description) return;

    const generatedTicket = `BTM-W5-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generatedTicket);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhone('');
    setTole('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-civic-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto border border-civic-200 shadow-2xl p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full bg-sand-100 text-civic-600 hover:bg-sand-200 hover:text-civic-900 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-serif font-bold text-civic-950">
              {lang === 'ne' ? 'गुनासो सफलतापूर्वक दर्ता भयो!' : 'Grievance Submitted Successfully!'}
            </h3>

            <p className="text-sm text-civic-600 max-w-sm mx-auto">
              {lang === 'ne'
                ? 'तपाईंको अनुरोध वडाध्यक्ष सचिवालयमा दर्ता भएको छ। आवश्यक समन्वयपछि छिट्टै सम्पर्क गरिनेछ।'
                : 'Your submission has been registered with the Ward Chairperson desk. Our team will verify and follow up promptly.'}
            </p>

            <div className="p-4 rounded-xl bg-sand-50 border border-civic-200 inline-block font-mono text-sm text-civic-800">
              <span className="text-xs text-civic-500 block">
                {lang === 'ne' ? 'दर्ता ट्र्याकिङ नम्बर' : 'Tracking Reference Ticket'}:
              </span>
              <strong className="text-crimson-800 text-base">{ticketId}</strong>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="taste-btn px-6 py-2.5 rounded-lg bg-crimson-800 text-white font-bold text-xs"
              >
                {lang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-crimson-50 text-crimson-800 text-xs font-semibold mb-2">
                <FileText className="w-3.5 h-3.5" />
                <span>{lang === 'ne' ? 'वडा नागरिक डेस्क' : 'Citizen Assistance Desk'}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-civic-950">
                {lang === 'ne' ? 'नागरिक सेवा तथा गुनासो फारम' : 'Civic Inquiry & Grievance'}
              </h3>
              <p className="text-xs text-civic-500 mt-1">
                {lang === 'ne'
                  ? 'वडा नं. ५ बिर्तामोडका नागरिकहरूले सिधै आफ्नो समस्या वा सुझाव पेश गर्न सक्नुहुन्छ।'
                  : 'Submit official inquiries, recommendation requests, or municipal maintenance tickets.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-civic-800 mb-1">
                  {lang === 'ne' ? 'नागरिकको पूरा नाम *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={lang === 'ne' ? 'उदाहरण: हरि प्रसाद शर्मा' : 'e.g., Hari Prasad Sharma'}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-civic-300 focus:outline-none focus:ring-2 focus:ring-crimson-800 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-civic-800 mb-1">
                    {lang === 'ne' ? 'सम्पर्क फोन / मोबाइल *' : 'Contact Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-civic-300 focus:outline-none focus:ring-2 focus:ring-crimson-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-civic-800 mb-1">
                    {lang === 'ne' ? 'टोल वा वस्तीको नाम' : 'Tole / Neighborhood'}
                  </label>
                  <input
                    type="text"
                    value={tole}
                    onChange={(e) => setTole(e.target.value)}
                    placeholder={lang === 'ne' ? 'उदाहरण: आवास मार्ग' : 'e.g., Aawas Marg'}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-civic-300 focus:outline-none focus:ring-2 focus:ring-crimson-800 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-civic-800 mb-1">
                  {lang === 'ne' ? 'विषय क्षेत्र' : 'Category'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-civic-300 focus:outline-none focus:ring-2 focus:ring-crimson-800 text-sm bg-white"
                >
                  <option value="recommendation">
                    {lang === 'ne' ? 'सिफारिस तथा कागजात प्रमाणीकरण' : 'Recommendations & Document Verification'}
                  </option>
                  <option value="drainage">
                    {lang === 'ne' ? 'सडक तथा ढल निकास समस्या' : 'Road & Drainage Issues'}
                  </option>
                  <option value="sanitation">
                    {lang === 'ne' ? 'फोहोरमैला तथा सरसफाइ' : 'Waste Management & Public Sanitation'}
                  </option>
                  <option value="sports">
                    {lang === 'ne' ? 'खेलकुद तथा युवा गतिविधि' : 'Sports & Youth Activities'}
                  </option>
                  <option value="general">
                    {lang === 'ne' ? 'अन्य सामान्य गुनासो तथा सुझाव' : 'General Suggestion or Grievance'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-civic-800 mb-1">
                  {lang === 'ne' ? 'समस्या वा सुझावको विवरण *' : 'Detailed Description *'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    lang === 'ne'
                      ? 'तपाईंको समस्या वा सुझाव स्पष्ट रूपमा उल्लेख गर्नुहोस्...'
                      : 'Please provide relevant details regarding your request or concern...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-civic-300 focus:outline-none focus:ring-2 focus:ring-crimson-800 text-sm"
                />
              </div>

              <div className="flex items-center gap-2 text-civic-500 text-[11px] bg-sand-100 p-2.5 rounded-lg">
                <AlertCircle className="w-4 h-4 text-crimson-800 shrink-0" />
                <span>
                  {lang === 'ne'
                    ? 'तपाईंको व्यक्तिगत विवरण स्थानीय सरकारको गोप्य अभिलेखमा सुरक्षित रहनेछ।'
                    : 'Your information remains confidential and will be utilized strictly for civic verification.'}
                </span>
              </div>

              <button
                type="submit"
                className="taste-btn w-full py-3 px-4 rounded-xl bg-crimson-800 hover:bg-crimson-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'ne' ? 'फारम दर्ता गर्नुहोस्' : 'Submit to Ward Desk'}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
