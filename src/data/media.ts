/**
 * Real coverage and videos of Rohit Prasai, collected from news sites and Facebook.
 * Newest first. Images live in public/images/news and public/images/gallery/videos.
 */

export interface MediaNews {
  id: string;
  titleNe: string;
  titleEn: string;
  summaryNe: string;
  summaryEn: string;
  source: string;
  dateNe: string;
  dateEn: string;
  url: string;
  image: string;
  featured?: boolean;
}

export interface MediaVideo {
  id: string;
  titleNe: string;
  titleEn: string;
  /** Page or person who posted it */
  by: string;
  dateEn: string;
  dateNe: string;
  url: string;
  poster: string;
  /** Vertical (phone-shot) video */
  tall?: boolean;
  tag: 'service' | 'community' | 'speech' | 'greeting';
}

export const newsList: MediaNews[] = [
  {
    id: 'pd-ward5',
    featured: true,
    titleNe: 'बिर्तामोड नगरपालिका वडा नं. ५ : विकास, समर्पण र जनविश्वासको उदाहरण',
    titleEn: 'Birtamod Ward No. 5: an example of development, dedication and public trust',
    summaryNe: 'बिर्तामोड–५ मा सँगै मिलेर गरिएका विकास, सेवा प्रवाह र जनविश्वासका कामहरूको विशेष प्रस्तुति।',
    summaryEn: 'A feature on the development, public service and community trust we have built together in Birtamod-5.',
    source: 'Purwanchal Daily',
    dateNe: '१९ असार २०८३',
    dateEn: 'July 3, 2026',
    url: 'https://purwanchaldaily.com/256852/',
    image: '/images/news/pd-ward5-feature.jpg',
  },
  {
    id: 'pd-bishranti',
    titleNe: 'विराट भरत विश्रान्ति : बुवा भरतबाबुको सम्झना, मुमाको जग्गादान र मानव सेवाको एउटा सुन्दर सपना',
    titleEn: 'Birat Bharat Bishranti: a land donation and a dream of humanitarian service',
    summaryNe: 'बुवाको सम्झनामा आमाले गरेको जग्गादानबाट सुरु भएको मानव सेवाको आश्रय र त्यसको सपना।',
    summaryEn: 'How a mother’s land donation in memory of her husband became a home for humanitarian service in Birtamod.',
    source: 'Purwanchal Daily',
    dateNe: '१५ कात्तिक २०८३',
    dateEn: 'November 1, 2026',
    url: 'https://purwanchaldaily.com/265983/',
    image: '/images/news/pd-birat-bharat-bishranti.jpg',
  },
  {
    id: 'nayapaper-citizenship',
    titleNe: 'बिर्तामोड ५ का अति अशक्त तिम्ल्याहा दिदीबहिनीलाई घरमै पुगेर नागरिकता प्रदान',
    titleEn: 'Citizenship delivered at home to triplet sisters with disabilities in Birtamod-5',
    summaryNe: 'जिल्ला प्रशासन कार्यालय झापाले वडा नं. ५ बुद्ध टोलमा एकै परिवारका ३ जना अपाङ्गता भएका व्यक्तिलाई घरमै पुगेर नागरिकता वितरण गर्‍यो।',
    summaryEn: 'The District Administration Office, Jhapa, went door to door in Ward 5’s Buddha Tole to hand citizenship certificates to three sisters with disabilities.',
    source: 'Nayapaper',
    dateNe: '२२ वैशाख २०८२',
    dateEn: 'May 5, 2025',
    url: 'https://nayapaper.com/?p=10822',
    image: '/images/news/nayapaper-citizenship.jpg',
  },
  {
    id: 'jhapatoday-football',
    titleNe: 'बिर्तामोड अन्तरवडा फुटबल : वडा नम्बर ४ सेमिफाइनलमा',
    titleEn: 'Birtamod inter-ward football: Ward 4 into the semi-finals',
    summaryNe: 'बिर्तामोड नगर खेलकुद विकास समितिको अन्तरवडा फुटबल प्रतियोगिता, म्यान अफ द म्याच सम्मानसहित।',
    summaryEn: 'The municipality’s inter-ward football tournament, with the Man of the Match presentation.',
    source: 'Jhapa Today',
    dateNe: '१८ असोज २०८१',
    dateEn: 'October 4, 2024',
    url: 'https://jhapatoday.com/2024/10/04/42853/',
    image: '/images/news/jhapatoday-interward-football.jpg',
  },
];

const fb = (pfbid: string) => `https://www.facebook.com/rohit.prasai.5/posts/${pfbid}`;
const V = (f: string) => `/images/gallery/videos/${f}`;

export const videoList: MediaVideo[] = [
  { id: 'blood', tag: 'service', tall: true, by: 'Sajesh Siwakoti', dateEn: 'Nov 14, 2026', dateNe: '२८ कात्तिक २०८३', titleEn: 'Donate blood, save life', titleNe: 'रक्तदान गरौँ, जीवन बचाऔँ', url: 'https://www.facebook.com/sajeshsiwakoti/posts/29631388033145829/', poster: V('blood-donation.jpg') },
  { id: 'flowers', tag: 'community', tall: true, by: 'Rohit Prasai', dateEn: 'Nov 8, 2026', dateNe: '२२ कात्तिक २०८३', titleEn: 'Back local produce: flowers by local youth', titleNe: 'स्थानीय उत्पादनलाई प्रोत्साहन गरौँ', url: fb('pfbid0PnSe6WfxroQaLkEx13MHsmXtM7oamrWr1XCmuzp1Z9BcfYybvvq2bqzA7LGqrp5Al'), poster: V('local-flowers.jpg') },
  { id: 'tihar', tag: 'greeting', tall: true, by: 'Rohit Prasai', dateEn: 'Nov 7, 2026', dateNe: '२१ कात्तिक २०८३', titleEn: 'Let’s celebrate together', titleNe: 'सबै मिली, सँगै मनाऔँ', url: fb('pfbid02SK7PjUP8E5rupaerKr7zkxD6auwRDR1kJaJAAvcSdvVUhpXMnXvSBFL2TSHHYGw1l'), poster: '/images/gallery/portraits/portrait-namaste.jpg' },
  { id: 'water-speech', tag: 'speech', by: 'Sajha Online News', dateEn: 'Nov 1, 2026', dateNe: '१५ कात्तिक २०८३', titleEn: 'Focus on expanding service, not blame: the drinking water users’ meeting', titleNe: 'आरोप–प्रत्यारोपभन्दा सेवा विस्तारमा ध्यान दिनुपर्छ', url: fb('pfbid026kCXdMBCcQ8Wz4r3G5ak7JCGh2EFeaSGxaavhUWCwonwdkMT87wRXQ8V13YvYL3ml'), poster: V('water-users-speech.jpg') },
  { id: 'dashain', tag: 'greeting', tall: true, by: 'Aafno Ghar Ashram', dateEn: 'Oct 2026', dateNe: 'असोज २०८३', titleEn: 'Dashain tika at Aafno Ghar Ashram', titleNe: 'आफ्नो घर आश्रममा दसैँ टीका', url: 'https://www.facebook.com/reel/915294298184126', poster: V('dashain-tika.jpg') },
  { id: 'rescue-feb', tag: 'service', tall: true, by: 'Rohit Prasai', dateEn: 'Feb 16, 2026', dateNe: '४ फागुन २०८२', titleEn: 'An elderly father rescued from Mukti Chowk', titleNe: 'मुक्तिचोकबाट वृद्ध बुवाको उद्धार', url: fb('pfbid02u4zBPPAaMigYcbhDbGQAqbikqySz4iU76ztbhTSXBRAnGx3VBcFSBA2XiHHxPmxzl'), poster: V('p-19zVgcop3n.jpg') },
  { id: 'rescue-jan', tag: 'service', tall: true, by: 'Rohit Prasai', dateEn: 'Jan 30, 2026', dateNe: '१६ माघ २०८२', titleEn: 'Shelter for a man living under the bus park hume pipe', titleNe: 'बसपार्कको ह्युम पाइपमुनि बस्दै आएकालाई आश्रय', url: fb('pfbid0XrdKcuiepYtaW3wRhGYVjuhsP178C3tVKrkwHD3L61B4MFf5QtgotSuj3Unp6jptl'), poster: V('p-14psVBzSKf1.jpg') },
  { id: 'free-food', tag: 'service', tall: true, by: 'Rohit Prasai', dateEn: 'Jan 14, 2026', dateNe: '३० पुस २०८२', titleEn: 'Free food, free clothes: day ten', titleNe: 'निःशुल्क खाना, निःशुल्क कपडा', url: fb('pfbid02PwWKQ7R6UsPsTrD53co3dp6capgR3iRqC1VPTvGKP1zY48giyGzbfzMjsWia2r4Fl'), poster: V('p-1ARZ4pe8RA.jpg') },
  { id: 'echo', tag: 'speech', by: 'Rohit Prasai', dateEn: 'Oct 20, 2025', dateNe: '३ कात्तिक २०८२', titleEn: 'Echo Muzic Fest: say no to drugs, yes to music', titleNe: 'इको म्युजिक फेस्टको उद्देश्य', url: fb('pfbid0BLg195dTGHMZX2m6eNGA26YJcAYFE7pg4tqBXp9RXdT46UmUzcFFABMHCvWr8gUal'), poster: V('echo-music-fest.jpg') },
  { id: 'dogs', tag: 'community', tall: true, by: 'KGF Team', dateEn: 'Aug 28, 2025', dateNe: '१२ भदौ २०८२', titleEn: 'Water bowls for street dogs across Ward 5', titleNe: 'सडक कुकुरका लागि पिउने पानीका भाँडा', url: fb('pfbid029g8YiG3PCKS5RxJM6y81jNNLubeLGrF1jWcNvVHofthaDgJqnAJPVTf3PFsyTmiil'), poster: V('p-1CMzRne9hU.jpg') },
  { id: 'chhath', tag: 'community', by: 'Sajha Online News', dateEn: 'Aug 23, 2025', dateNe: '७ भदौ २०८२', titleEn: 'Clothes and food distribution on Kushe Aunsi', titleNe: 'कुशे औंसीमा कपडा तथा खाद्यान्न वितरण', url: fb('pfbid06v92NaFiZmump5XAjzzcbZK5Y5LZWakV14zVqUyt9CVM2arU6GyxainMbW9hCEb5l'), poster: V('p-1EDHjJkNDQ.jpg') },
  { id: 'trees', tag: 'community', tall: true, by: 'Rohit Prasai', dateEn: 'Jul 26, 2025', dateNe: '१० साउन २०८२', titleEn: 'Tree planting along the new Sanischare road', titleNe: 'शनिश्चरे सडक किनारमा वृक्षारोपण', url: fb('pfbid0G66paD54cRiNUVNgHG5bhzwqRsmR3poLLnNKvvvarbf3q3YWG1HNVeq9W44Ba7Nbl'), poster: V('p-19ySAU36gV.jpg') },
  { id: 'rescue-june30', tag: 'service', tall: true, by: 'Rohit Prasai', dateEn: 'Jun 30, 2025', dateNe: '१६ असार २०८२', titleEn: 'Night rescue of an elderly man on Sanischare Road', titleNe: 'शनिश्चरे रोडबाट वृद्ध बुवाको रात्रिकालीन उद्धार', url: fb('pfbid02Z21RuAza9mBWDsJyXrdQpB8A5pXzbtTSBKsSnehn618UENUtuhkZXfCSu9Fkor8hl'), poster: V('rescue-elder-night.jpg') },
  { id: 'rescue-june21', tag: 'service', tall: true, by: 'Rohit Prasai', dateEn: 'Jun 21, 2025', dateNe: '७ असार २०८२', titleEn: 'A young man brought to safety at Aafno Ghar Ashram', titleNe: 'युवकलाई आफ्नो घर आश्रममा उद्धार', url: fb('pfbid02iVfPZCaGdhidPTcwJr3aymzrLezTNfWd8HAQQGi4rMGAvy8EcKENy3dfA5Jj3DX9l'), poster: V('p-1CRHZaL8X2.jpg') },
];

