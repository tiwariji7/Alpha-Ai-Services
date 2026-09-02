import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'navy';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  variant = 'primary',
  size = 'md',
  glow = false,
  children,
  className = '',
  onClick,
  disabled,
  type = 'button',
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion();

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-bold rounded-xl gap-1.5',
    md: 'px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl gap-2',
    lg: 'px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-extrabold rounded-2xl sm:rounded-3xl gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#3B4FD9] via-[#4D6BFF] to-[#7B5CE8] text-white shadow-soft hover:shadow-glow-blue border border-white/20',
    secondary:
      'bg-[#EDEAFB] hover:bg-[#E2DEF8] text-[#3B4FD9] border border-[#7B5CE8]/30 shadow-2xs',
    outline:
      'bg-white/80 hover:bg-white text-[#151235] border border-[#EDEAFB] hover:border-[#3B4FD9]/40 shadow-soft',
    navy:
      'bg-[#0F1442] hover:bg-[#141B5C] text-white border border-[#3B4FD9]/30 shadow-soft-lg hover:shadow-glow-blue',
    ghost:
      'bg-transparent hover:bg-[#EDEAFB]/60 text-[#3B4FD9] border border-transparent',
  };

  if (prefersReducedMotion) {
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`inline-flex items-center justify-center transition-all active:opacity-90 ${sizeClasses[size]} ${variantClasses[variant]} ${glow ? 'ring-2 ring-[#7DE8FF]/40' : ''} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        {...(rest as any)}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { scale: 1.02, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97, y: 1 }}
      transition={{ type: 'spring', stiffness: 450, damping: 22 }}
      className={`inline-flex items-center justify-center transition-shadow relative overflow-hidden group select-none ${sizeClasses[size]} ${variantClasses[variant]} ${glow ? 'shadow-glow-blue' : ''} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      {...(rest as any)}
    >
      {/* Subtle Luminous Sheen Highlight */}
      <span
        aria-hidden="true"
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
      />
      <span className="relative z-10 flex items-center justify-center gap-2 w-full">
        {children}
      </span>
    </motion.button>
  );
};
