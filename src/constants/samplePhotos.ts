/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SAMPLE / PLACEHOLDER PHOTOS — NOT REAL PHOTOS OF THE WARD'S WORK
 * ─────────────────────────────────────────────────────────────────────────────
 *  These are free stock photos of the general subject (a canal, a stadium,
 *  a blood donation) so the Key Works carousel doesn't look empty while real
 *  photos are being collected. They do NOT show Rohit Prasai, Birtamod-5 or the
 *  actual projects.
 *
 *  ⚠️  Replace them with real photos before the site goes public, because the
 *      carousel sits next to a "Verified record" label.
 *
 *  HOW TO REPLACE
 *  1. Put the real photo in public/images/works/ (or use a direct image URL).
 *  2. In src/data/workPhotos.ts, remove the SAMPLE_* entry and add the real one.
 *  3. Once nothing uses a constant below, delete it.
 *
 *  All of these are free to use on a website:
 *  - Unsplash License: https://unsplash.com/license (no credit required)
 *  - Pexels License:   https://www.pexels.com/license/ (no credit required)
 *  - CC0 (WordPress Photo Directory): public domain
 *  Each entry notes the page it came from, so the source and license can be checked.
 */

/** Size the CDN serves: big enough for the carousel, small enough to load fast */
const UNSPLASH = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;
const PEXELS = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

export const SAMPLE_CAPTION_EN = 'Sample photo: to be replaced with a real photo';
export const SAMPLE_CAPTION_NE = 'नमुना फोटो: वास्तविक फोटोले बदलिनेछ';

// ── Aawas Marg drainage ──────────────────────────────────────────────────────
/** Concrete spillway into an irrigation canal, Nepal. CC0.
 *  Source: https://wordpress.org/photos/photo/7446a2913e/ */
export const SAMPLE_DRAINAGE_CANAL_NEPAL = 'https://pd.w.org/2026/06/7446a2913e81ccf39.94176626.jpg';
/** Concrete dam/channel with flowing water. Pexels License.
 *  Source: https://www.pexels.com/photo/8879025/ */
export const SAMPLE_DRAINAGE_CONCRETE_CHANNEL = PEXELS(8879025);

// ── Jhapa Gold Cup / Domalal Stadium ─────────────────────────────────────────
/** Green football pitch with a crowd, daytime (Liam McKay). Unsplash License.
 *  Source: https://unsplash.com/photos/QYeEoTv6Gbw */
export const SAMPLE_FOOTBALL_PITCH_CROWD = UNSPLASH('photo-1504016798967-59a258e9386d');
/** Football players on a pitch at dusk, stadium seating (Anton Borzenkov). Unsplash License.
 *  Source: https://unsplash.com/photos/vgRJgkxg_0E */
export const SAMPLE_FOOTBALL_MATCH_DUSK = UNSPLASH('photo-1780255440268-294ac67d0d9a');

// ── Blood donation drive ─────────────────────────────────────────────────────
/** Healthcare worker drawing blood from a donor's arm. Unsplash License.
 *  Source: https://unsplash.com/photos/2rNHliX6XHk */
export const SAMPLE_BLOOD_DONATION_DRAW = UNSPLASH('photo-1615461066159-fea0960485d5');
/** Blood being collected from an arm. Unsplash License.
 *  Source: https://unsplash.com/photos/tQTGrzT7uAA */
export const SAMPLE_BLOOD_DONATION_COLLECTION = UNSPLASH('photo-1784798340504-a0893a7743da');
