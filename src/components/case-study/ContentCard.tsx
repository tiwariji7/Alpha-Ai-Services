import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ContentCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowAccent?: 'none' | 'blue' | 'lavender' | 'cyan' | 'violet';
  id?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  glowAccent = 'none',
  id,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const glowStyles = {
    none: '',
    blue: 'relative before:absolute before:-top-px before:left-8 before:right-8 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#2D3DB7]/40 before:to-transparent',
    lavender: 'relative before:absolute before:-top-px before:left-8 before:right-8 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#7C3AED]/30 before:to-transparent',
    cyan: 'relative before:absolute before:-top-px before:left-8 before:right-8 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#22D3EE]/50 before:to-transparent',
    violet: 'relative before:absolute before:-top-px before:left-8 before:right-8 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#7C3AED]/40 before:to-transparent',
  };

  return (
    <motion.div
      id={id}
      whileHover={hoverEffect && !prefersReducedMotion ? { y: -3, transition: { duration: 0.25, ease: 'easeOut' } } : undefined}
      className={`rounded-[24px] sm:rounded-[28px] bg-gradient-to-b from-white via-white to-[#F7F8FF]/80 backdrop-blur-sm border border-[#2D3DB7]/14 shadow-[0_4px_24px_rgba(45,61,183,0.06)] hover:shadow-[0_8px_32px_rgba(45,61,183,0.1)] transition-shadow duration-300 relative overflow-hidden ${glowStyles[glowAccent]} ${className}`}
    >
      {children}
    </motion.div>
  );
};
