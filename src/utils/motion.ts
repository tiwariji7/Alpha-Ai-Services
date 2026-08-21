import { Variants } from 'motion/react';

// Standardized easing curves for smooth, premium editorial motion
export const EASING = {
  easeOut: [0.16, 1, 0.3, 1] as const, // Smooth natural spring-like deceleration
  easeInOut: [0.65, 0, 0.35, 1] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
};

// 1. Fade Up variant (Standard entrance for headings, cards, text blocks)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

// 2. Fade In variant (Clean opacity fade)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

// 3. Fade Scale variant (Spotlights, modal cards, badges)
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// 4. Slide In variant (Left or Right directional entrances)
export const slideIn = (direction: 'left' | 'right' = 'left'): Variants => ({
  hidden: { opacity: 0, x: direction === 'left' ? -24 : 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
});

// 5. Stagger Container (Parent wrapper for choreographing child elements)
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.05): Variants => ({
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
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

// 7. Page Transition variant (Smooth fade & slight vertical float on route changes)
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
};

// 8. Card Hover Transition Config
export const cardHoverTransition = {
  y: -4,
  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
};
