/**
 * Photos for the "Key Works Done Till Now" carousel.
 *
 * HOW TO ADD PHOTOS
 * - Add as many entries as you like under a work; they show in this order.
 * - Each entry is either a plain path/URL string, or an object with a caption:
 *     '/images/works/my-photo.jpg'                      ← file placed in public/images/works/
 *     'https://example.com/photo.jpg'                   ← any direct image URL
 *     { src: '/images/works/x.jpg', captionEn: '…', captionNe: '…' }
 * - Anything that fails to load is skipped automatically, so a bad link never breaks the slide.
 * - A work with no photos shows its animated artwork full-size instead.
 *
 * SAMPLE PHOTOS
 * Entries built with sample() use free stock photos from src/constants/samplePhotos.ts.
 * They are PLACEHOLDERS, not real photos of these projects. Replace them with real ones.
 *
 * Tip: Facebook image links expire after a while. Download the photo and put it in
 * public/images/works/ rather than pasting a facebook.com / fbcdn.net link.
 */

import {
  SAMPLE_CAPTION_EN,
  SAMPLE_CAPTION_NE,
  SAMPLE_DRAINAGE_CANAL_NEPAL,
  SAMPLE_DRAINAGE_CONCRETE_CHANNEL,
  SAMPLE_FOOTBALL_PITCH_CROWD,
  SAMPLE_FOOTBALL_MATCH_DUSK,
  SAMPLE_BLOOD_DONATION_DRAW,
  SAMPLE_BLOOD_DONATION_COLLECTION,
} from '../constants/samplePhotos';

export type WorkPhoto = string | { src: string; captionEn?: string; captionNe?: string };

/** Marks a placeholder stock photo, so the viewer labels it "Sample photo". */
const sample = (src: string): WorkPhoto => ({ src, captionEn: SAMPLE_CAPTION_EN, captionNe: SAMPLE_CAPTION_NE });

export const workPhotos: Record<string, WorkPhoto[]> = {
  // Courtyard Citizen Desk & Municipal Punctuality Drive (real photos)
  'courtyard-service': [
    '/images/works/citizen-desk-garland.jpg',
    '/images/works/citizen-desk-greeting.jpg',
    '/images/works/citizen-desk-door-to-door.jpg',
    '/images/works/citizen-desk-blessing.jpg',
  ],

  // Aawas Marg Integrated Stormwater Drainage Canal (SAMPLE photos: replace)
  'aawas-drainage': [sample(SAMPLE_DRAINAGE_CANAL_NEPAL), sample(SAMPLE_DRAINAGE_CONCRETE_CHANNEL)],

  // Jhapa Gold Cup Patronage & Domalal Stadium Upgrades (SAMPLE photos: replace)
  'jhapa-gold-cup': [sample(SAMPLE_FOOTBALL_PITCH_CROWD), sample(SAMPLE_FOOTBALL_MATCH_DUSK)],

  // Community Blood Donation Drives & Civic Welfare (SAMPLE photos: replace)
  'blood-donation': [sample(SAMPLE_BLOOD_DONATION_DRAW), sample(SAMPLE_BLOOD_DONATION_COLLECTION)],
};
