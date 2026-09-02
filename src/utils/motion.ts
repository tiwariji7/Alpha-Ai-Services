import { Variants } from 'motion/react';

// Standardized easing curves for smooth, premium human-crafted editorial motion
export const EASING = {
  easeOut: [0.16, 1, 0.3, 1] as const, // Smooth natural deceleration (never linear)
  easeInOut: [0.65, 0, 0.35, 1] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
  spring: [0.2, 0.8, 0.2, 1] as const,
};

// Physics-driven spring transitions
export const SPRING_PHYSICS = {
  snappy: { type: 'spring' as const, stiffness: 380, damping: 30 },
  gentle: { type: 'spring' as const, stiffness: 240, damping: 26 },
  bouncy: { type: 'spring' as const, stiffness: 320, damping: 20 },
  slow: { type: 'spring' as const, stiffness: 120, damping: 22 },
};

// 1. Fade Up variant (Subtle, calm 14px entrance for headings, cards, text blocks)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// 2. Fade In variant (Clean opacity fade)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// 3. Fade Scale variant (Badges, pills, modals)
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

// 4. Slide In variant (Left or Right directional entrances)
export const slideIn = (direction: 'left' | 'right' = 'left'): Variants => ({
  hidden: { opacity: 0, x: direction === 'left' ? -18 : 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
});

// 5. Stagger Container (Parent wrapper for choreographing child elements)
export const staggerContainer = (staggerChildren = 0.06, delayChildren = 0.04): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// 6. Stagger Item (Child element inside a staggerContainer)
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// 7. Word & Character Flow Variants (Natural, organic reveal without mechanical jitter)
export const flowWordContainer: Variants = {
  hidden: { opacity: 0 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.045, // 45ms organic gap between words
      delayChildren: customDelay || 0.02,
    },
  }),
};

export const flowWordItem: Variants = {
  hidden: {
    opacity: 0,
    y: 12, // Subtle 12px slide for clean, professional feel
    filter: 'blur(2px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.48,
      ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for effortless deceleration
    },
  },
};

// 8. Page Transition variant (Smooth fade crossfade without layout shift)
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.12, ease: 'easeOut' },
  },
};

// 9. Card Hover & Tap Transition Config
export const cardHoverTransition = {
  y: -5,
  scale: 1.018,
  transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] as const },
};

// 10. Shimmer sweep animation (Slow, soft background movement)
export const shimmerVariants: Variants = {
  initial: { backgroundPosition: '-200% 0' },
  animate: {
    backgroundPosition: '200% 0',
    transition: {
      repeat: Infinity,
      duration: 4.5, // Calm and slow
      ease: 'linear',
    },
  },
};
