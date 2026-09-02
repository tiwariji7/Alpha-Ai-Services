import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface EngineCardProps {
  title: string;
  category?: string;
  description?: string;
  items?: string[];
  itemPrefix?: string;
  extraText?: string;
  icon: LucideIcon;
  badgeAccent?: string;
  className?: string;
}

export const EngineCard: React.FC<EngineCardProps> = ({
  title,
  category,
  description,
  items,
  extraText,
  icon: Icon,
  badgeAccent = 'text-[#2D3DB7] bg-[#F1F2FF] border-[#2D3DB7]/20',
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -3, transition: { duration: 0.25, ease: 'easeOut' } }
      }
      className={`rounded-[24px] sm:rounded-[28px] bg-gradient-to-b from-white to-[#F7F8FF] border border-[#2D3DB7]/14 p-6 sm:p-7 shadow-[0_4px_24px_rgba(45,61,183,0.06)] hover:shadow-[0_8px_32px_rgba(45,61,183,0.1)] transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      <div className="space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border ${badgeAccent} shadow-2xs`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              {category && (
                <span className="text-[11px] font-mono font-bold text-[#4B5563] uppercase tracking-wider block">
                  {category}
                </span>
              )}
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0B1235] tracking-tight leading-snug">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            {description}
          </p>
        )}

        {/* Items List (if present) */}
        {items && items.length > 0 && (
          <div className="pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#2D3DB7]/14 text-xs font-semibold text-[#0B1235]"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2D3DB7]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extra text (e.g. secondary paragraph) */}
        {extraText && (
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed pt-1 border-t border-[#2D3DB7]/10">
            {extraText}
          </p>
        )}
      </div>
    </motion.div>
  );
};
