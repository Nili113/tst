import React from 'react';
import { ScrollReveal } from './ScrollReveal';

interface SectionHeaderProps {
  label: string;
  title: string;
  lede?: string;
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ label, title, lede, className = '', children }) => (
  <ScrollReveal className={`mb-10 sm:mb-14 ${className}`}>
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
      <div className="max-w-3xl">
        <p className="eyebrow">{label}</p>
        <h2 className="h2">{title}</h2>
        {lede && <p className="lede mt-4 max-w-2xl">{lede}</p>}
      </div>
      {children}
    </div>
  </ScrollReveal>
);
