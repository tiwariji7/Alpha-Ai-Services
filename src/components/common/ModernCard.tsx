import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'white' | 'glass' | 'navy' | 'gradient';
  glowOnHover?: boolean;
  onClick?: () => void;
  interactive?: boolean;
  accentColor?: string;
  delay?: number;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className = '',
  variant = 'white',
  glowOnHover = true,
  onClick,
  interactive = true,
  accentColor = '#3B4FD9',
  delay = 0,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const variantStyles = {
    white:
      'bg-white/95 backdrop-blur-md border border-[#EDEAFB] text-[#151235] shadow-soft hover:shadow-soft-lg hover:border-[#3B4FD9]/40',
    glass:
      'bg-white/80 backdrop-blur-lg border border-white/60 text-[#151235] shadow-soft hover:shadow-soft-lg hover:border-[#7B5CE8]/40',
    navy:
      'bg-[#0F1442]/95 backdrop-blur-md border border-[#141B5C] text-white shadow-soft-lg hover:shadow-[0_16px_36px_-8px_rgba(59,79,217,0.35)] hover:border-[#3B4FD9]/50',
    gradient:
      'bg-gradient-to-br from-[#141B5C] to-[#2A3FA8] text-white border border-[#3B4FD9]/40 shadow-soft-lg hover:shadow-[0_20px_45px_-10px_rgba(59,79,217,0.4)]',
  };

  if (prefersReducedMotion || !interactive) {
    return (
      <div
        onClick={onClick}
        className={`rounded-2xl sm:rounded-3xl transition-all duration-250 relative overflow-hidden ${variantStyles[variant]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-25px' }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -5,
        scale: 1.018,
        transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
      }}
      whileTap={onClick ? { scale: 0.985, y: -1 } : undefined}
      className={`rounded-2xl sm:rounded-3xl transition-colors duration-250 relative overflow-hidden group ${onClick ? 'cursor-pointer' : ''} ${variantStyles[variant]} ${className}`}
    >
      {/* Soft Ambient Hover Glow Accent */}
      {glowOnHover && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 -z-0"
          style={{
            background: `radial-gradient(350px circle at 50% 0%, ${accentColor}14, transparent 70%)`,
          }}
        />
      )}

      {/* Subtle Gradient Perimeter Edge Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl border border-transparent group-hover:border-[#7DE8FF]/30 transition-colors duration-250"
      />

      {/* Card Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
};
