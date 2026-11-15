export type Language = 'ne' | 'en';

export interface NewsItem {
  id: string;
  titleNe: string;
  titleEn: string;
  summaryNe: string;
  summaryEn: string;
  categoryNe: string;
  categoryEn: string;
  dateNe: string;
  dateEn: string;
  source: string;
  sourceUrl?: string;
  imageUrl: string;
  readTime: string;
}

export interface VideoItem {
  id: string;
  titleNe: string;
  titleEn: string;
  publisher: string;
  publisherLogo?: string;
  duration: string;
  date: string;
  thumbnailUrl: string;
  youtubeId?: string;
  externalUrl: string;
}

export interface MilestoneItem {
  yearNe: string;
  yearEn: string;
  titleNe: string;
  titleEn: string;
  descriptionNe: string;
  descriptionEn: string;
  badgeNe: string;
  badgeEn: string;
}

export interface AchievementItem {
  id: string;
  titleNe: string;
  titleEn: string;
  subtitleNe: string;
  subtitleEn: string;
  descriptionNe: string;
  descriptionEn: string;
  metricsNe: string;
  metricsEn: string;
  iconName: string;
}

export interface SocialLink {
  platform: 'facebook' | 'youtube' | 'whatsapp' | 'email' | 'phone';
  label: string;
  url: string;
  handle: string;
}
