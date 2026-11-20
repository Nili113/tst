/**
 * Gallery content. Files live in public/images/gallery/<folder>/.
 * To add a photo: drop the file in the folder and add a line below.
 * Videos live in media.ts.
 */

export interface GalleryPhoto {
  src: string;
  captionEn?: string;
  captionNe?: string;
}

const c = (n: number, captionEn?: string, captionNe?: string): GalleryPhoto => ({
  src: `/images/gallery/community/community-${String(n).padStart(2, '0')}.jpg`,
  captionEn,
  captionNe,
});

export const galleryCommunity: GalleryPhoto[] = [
  c(5, 'Welcomed with garlands at a community gathering', 'सामुदायिक भेलामा मालाले स्वागत'),
  c(1, 'Meeting residents at the community tent', 'सामुदायिक पालमा नागरिकहरूसँग भेटघाट'),
  c(6, 'Greeting an elder in the neighbourhood', 'टोलमा अग्रजसँग भेट'),
  c(3, 'Receiving blessings from the community', 'समुदायबाट आशीर्वाद ग्रहण'),
  c(7, 'Walking the neighbourhood with supporters', 'समर्थकहरूसँग टोल भ्रमण'),
  c(4, 'Paying tribute at the community programme', 'सामुदायिक कार्यक्रममा श्रद्धाञ्जली'),
  c(2, 'With fellow community members', 'समुदायका साथीहरूसँग'),
  c(10, 'Visiting local shopkeepers', 'स्थानीय पसलेहरूसँग भेट'),
  c(8, 'Receiving a mother’s blessing at home', 'घरमा आमाको आशीर्वाद'),
  c(9, 'Door-to-door in the neighbourhood', 'टोलमा घरदैलो कार्यक्रम'),
];

export const galleryPortraits: GalleryPhoto[] = [
  { src: '/images/gallery/portraits/portrait-namaste.jpg', captionEn: 'Rohit Prasai', captionNe: 'रोहित प्रसाईं' },
  { src: '/images/gallery/portraits/portrait-waving.jpg', captionEn: 'Rohit Prasai', captionNe: 'रोहित प्रसाईं' },
  { src: '/images/gallery/portraits/portrait-sunglasses.jpg', captionEn: 'Rohit Prasai · Photo: Purwanchal Daily', captionNe: 'रोहित प्रसाईं · तस्बिर: पूर्वाञ्चल दैनिक' },
];

export { videoList as galleryVideos } from './media';

export const FACEBOOK_PAGE = 'https://www.facebook.com/Rohitprasaii';
