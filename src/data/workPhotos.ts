/**
 * Photos for the "Key Works Done Till Now" carousel.
 *
 * - Each entry is a path under public/ or an object with a caption.
 * - Only real photos of the work. A work with an empty list shows its illustration instead
 *   (never both, and never stock photos).
 * - Facebook image links expire: download the photo into public/images/ rather than linking it.
 */

export type WorkPhoto = string | { src: string; captionEn?: string; captionNe?: string };

export const workPhotos: Record<string, WorkPhoto[]> = {
  'courtyard-service': [
    '/images/gallery/community/community-01.jpg',
    '/images/gallery/community/community-10.jpg',
    '/images/gallery/community/community-09.jpg',
    '/images/gallery/community/community-08.jpg',
  ],

  // Domalal Rajbanshi Stadium after upgrades, ready for Jhapa Gold Cup 2080 (Khabarkheti), then the press meet (Mechi Aawaj)
  'jhapa-gold-cup': [
    { src: '/images/works/domalal-stadium-ready.jpg', captionEn: 'Domalal Rajbanshi Stadium, upgraded and ready for Jhapa Gold Cup 2080 · Photo: Khabarkheti', captionNe: 'जीर्णोद्धारपछि झापा गोल्डकप २०८० का लागि तयार डोमालाल राजवंशी रंगशाला · तस्बिर: खबरखेती' },
    { src: '/images/works/domalal-stadium-dugout.jpg', captionEn: 'New team dugouts at Domalal Stadium · Photo: Khabarkheti', captionNe: 'डोमालाल रंगशालाका नयाँ डगआउट · तस्बिर: खबरखेती' },
    { src: '/images/works/domalal-stadium-ground.jpg', captionEn: 'The prepared ground ahead of the tournament · Photo: Khabarkheti', captionNe: 'प्रतियोगिताअघि तयार पारिएको मैदान · तस्बिर: खबरखेती' },
    { src: '/images/works/goldcup-domalal-press-meet.jpg', captionEn: 'Jhapa Gold Cup press meet at Domalal Stadium, new stands rising behind · Photo: Mechi Aawaj', captionNe: 'डोमालाल रंगशालामा झापा गोल्डकप पत्रकार सम्मेलन, पछाडि बन्दै गरेको प्यारापिट · तस्बिर: मेची आवाज' },
  ],

  // Joint Birtamod-5 / Arjundhara-11 site inspection of the flood-prone border (Drishya Online, Asar 2080)
  'aawas-drainage': [
    { src: '/images/works/drainage-monitoring-walk.jpg', captionEn: 'Both municipalities walk the flood-prone Aawas Marg corridor · Photo: Nirman Lahar', captionNe: 'दुवै पालिकाद्वारा आवास मार्गको डुबान क्षेत्र अनुगमन · तस्बिर: निर्माणलहर' },
    { src: '/images/works/drainage-inspection-1.jpg', captionEn: 'Inspecting the flood-prone Birtamod–Arjundhara border · Photo: Drishya Online', captionNe: 'बिर्तामोड–अर्जुनधारा सिमानाको डुबान क्षेत्र अनुगमन · तस्बिर: दृश्य अनलाइन' },
    { src: '/images/works/drainage-inspection-2.jpg', captionEn: 'Joint committee on site with both municipalities · Photo: Drishya Online', captionNe: 'दुवै पालिकाको संयुक्त समिति स्थलगत अनुगमनमा · तस्बिर: दृश्य अनलाइन' },
  ],

  'blood-donation': [
    { src: '/images/works/blood-donation-2.jpg', captionEn: 'A regular donor: giving blood for an emergency patient at B&C Hospital, Birtamod', captionNe: 'बी एन्ड सी अस्पताल, बिर्तामोडमा बिरामीका लागि आपत्कालीन रक्तदान' },
  ],
};
