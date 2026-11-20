export type Language = 'ne' | 'en';

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

