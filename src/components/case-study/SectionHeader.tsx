import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  index?: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  align?: 'left' | 'center';
  badgeColor?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  title,
  subtitle,
  icon: Icon,
  align = 'left',
  badgeColor = 'text-[#2D3DB7] bg-[#F1F2FF] border-[#2D3DB7]/20',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`space-y-3 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left'} ${className}`}>
      {index && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold font-mono tracking-wider uppercase border ${badgeColor}`}>
          {Icon && <Icon className="w-3.5 h-3.5" />}
          <span>{index}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1235] tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base md:text-lg text-[#4B5563] leading-relaxed max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
