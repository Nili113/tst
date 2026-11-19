import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('public/images/facebook');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const assets = [
  {
    name: 'post-1-civic-desk.svg',
    titleNe: 'नागरिक सेवा तथा प्रशासनिक अनुशासन',
    titleEn: 'Courtyard Citizen Service',
    category: 'सुशासन र सुधार',
    accent: '#991b1b',
    bg: '#1e293b',
    icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="#f87171" stroke-width="2"/><path d="m9 12 2 2 4-4" fill="none" stroke="#f87171" stroke-width="2"/>`
  },
  {
    name: 'post-2-drainage.svg',
    titleNe: 'आवास मार्ग ढल निर्माण योजना',
    titleEn: 'Aawas Marg Stormwater Drainage',
    category: 'पूर्वाधार विकास',
    accent: '#0369a1',
    bg: '#0f172a',
    icon: `<rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#38bdf8" stroke-width="2"/><path d="M3 9h18M9 21V9M15 21V9" stroke="#38bdf8" stroke-width="2"/>`
  },
  {
    name: 'post-3-sanitation.svg',
    titleNe: 'सार्वजनिक शौचालय तथा सहरी सरसफाइ',
    titleEn: 'Urban Sanitation Land Allotment',
    category: 'सहरी विकास',
    accent: '#047857',
    bg: '#142820',
    icon: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" fill="none" stroke="#34d399" stroke-width="2"/><circle cx="9" cy="7" r="4" fill="none" stroke="#34d399" stroke-width="2"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="#34d399" stroke-width="2"/>`
  },
  {
    name: 'post-4-market.svg',
    titleNe: 'बुधबारे हटिया बजार अनुगमन',
    titleEn: 'Budhabare Bazaar Consumer Checks',
    category: 'उपभोक्ता संरक्षण',
    accent: '#b45309',
    bg: '#291b0f',
    icon: `<circle cx="8" cy="21" r="1" fill="#fbbf24"/><circle cx="19" cy="21" r="1" fill="#fbbf24"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" fill="none" stroke="#fbbf24" stroke-width="2"/>`
  },
  {
    name: 'post-5-sports.svg',
    titleNe: 'झापा गोल्डकप तथा खेल पूर्वाधार',
    titleEn: 'Jhapa Gold Cup Athletics Patronage',
    category: 'खेलकुद प्रवर्द्धन',
    accent: '#854d0e',
    bg: '#231d10',
    icon: `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34M12 2a5 5 0 0 0-5 5v5a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" fill="none" stroke="#facc15" stroke-width="2"/>`
  },
  {
    name: 'post-6-health.svg',
    titleNe: 'स्वास्थ्य चौकी सेवा विस्तार',
    titleEn: 'Ward Health Clinic Expansion',
    category: 'नागरिक स्वास्थ्य',
    accent: '#be123c',
    bg: '#270e17',
    icon: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="none" stroke="#fb7185" stroke-width="2"/>`
  },
  {
    name: 'video-1-courtyard.svg',
    titleNe: 'फेसबुक लाइभ: नगरपालिका प्रांगणमा प्रत्यक्ष सेवा',
    titleEn: 'Facebook Live: Open Courtyard Service',
    category: 'फेसबुक लाइभ',
    accent: '#1877f2',
    bg: '#0a192f',
    icon: `<polygon points="5 3 19 12 5 21 5 3" fill="#60a5fa"/>`
  },
  {
    name: 'video-2-press-meet.svg',
    titleNe: 'फेसबुक भिडियो: वडा विकास तथा प्रशासनिक सम्बोधन',
    titleEn: 'Facebook Video: Civic Press Briefing',
    category: 'भिडियो अपडेट',
    accent: '#1877f2',
    bg: '#0f172a',
    icon: `<polygon points="5 3 19 12 5 21 5 3" fill="#60a5fa"/>`
  },
  {
    name: 'video-3-drainage-inspection.svg',
    titleNe: 'फेसबुक लाइभ: आवास मार्ग स्थलगत अनुगमन',
    titleEn: 'Facebook Live: Drainage Field Inspection',
    category: 'स्थलगत प्रत्यक्ष',
    accent: '#1877f2',
    bg: '#091e3a',
    icon: `<polygon points="5 3 19 12 5 21 5 3" fill="#60a5fa"/>`
  },
  {
    name: 'video-4-stadium.svg',
    titleNe: 'फेसबुक भिडियो: डोमालाल रंगशाला तयारी',
    titleEn: 'Facebook Video: Domalal Stadium Staging',
    category: 'खेलकुद भिडियो',
    accent: '#1877f2',
    bg: '#1e1b4b',
    icon: `<polygon points="5 3 19 12 5 21 5 3" fill="#60a5fa"/>`
  }
];

for (const a of assets) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="800" height="480">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${a.bg}"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.8" cy="0.2" r="0.8">
      <stop offset="0%" stop-color="${a.accent}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${a.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="480" fill="url(#bgGrad)"/>
  <rect width="800" height="480" fill="url(#glow)"/>
  
  <!-- Subtle Grid Lines -->
  <g stroke="rgba(255,255,255,0.05)" stroke-width="1">
    <line x1="0" y1="80" x2="800" y2="800"/>
    <line x1="0" y1="160" x2="800" y2="160"/>
    <line x1="0" y1="240" x2="800" y2="240"/>
    <line x1="0" y1="320" x2="800" y2="320"/>
    <line x1="0" y1="400" x2="800" y2="400"/>
    <line x1="160" y1="0" x2="160" y2="480"/>
    <line x1="320" y1="0" x2="320" y2="480"/>
    <line x1="480" y1="0" x2="480" y2="480"/>
    <line x1="640" y1="0" x2="640" y2="480"/>
  </g>

  <!-- Facebook verified header badge -->
  <g transform="translate(48, 48)">
    <rect width="180" height="36" rx="18" fill="rgba(24,119,242,0.2)" stroke="#1877f2" stroke-width="1.5"/>
    <circle cx="20" cy="18" r="10" fill="#1877f2"/>
    <path d="M22 14h-1.5c-1 0-1.5.5-1.5 1.5V17H22l-.5 2h-2.5v6H16v-6h-2v-2h2v-1.5c0-2 1.2-3.5 3.5-3.5H22v2z" fill="#ffffff" transform="translate(-1, -1) scale(0.85)"/>
    <text x="38" y="23" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700">Official Facebook</text>
  </g>

  <!-- Central Emblem / Icon Graphic -->
  <g transform="translate(620, 200) scale(3.5)">
    ${a.icon}
  </g>

  <!-- Bottom Title Block -->
  <g transform="translate(48, 320)">
    <rect width="120" height="26" rx="6" fill="${a.accent}" opacity="0.9"/>
    <text x="12" y="17" fill="#ffffff" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700">${a.category}</text>
    <text x="0" y="65" fill="#ffffff" font-family="'Mukta', sans-serif" font-size="30" font-weight="700">${a.titleNe}</text>
    <text x="0" y="100" fill="rgba(255,255,255,0.7)" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="500">${a.titleEn}</text>
  </g>
</svg>`;

  fs.writeFileSync(path.join(outDir, a.name), svg, 'utf8');
}

console.log('Generated ' + assets.length + ' local media assets in public/images/facebook');
