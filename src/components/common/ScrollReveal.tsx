import React from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';
import { fadeUp, fadeIn, fadeScale, slideIn } from '../../utils/motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fadeUp' | 'fadeIn' | 'fadeScale' | 'slideLeft' | 'slideRight';
  delay?: number;
  duration?: number;
  className?: string;
  margin?: string;
  as?: 'div' | 'section' | 'article' | 'span';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.55,
  className = '',
  margin = '-40px',
  as: Component = 'div',
}) => {
  const prefersReducedMotion = useReducedMotion();

  let selectedVariant: Variants;
  switch (variant) {
    case 'fadeIn':
      selectedVariant = fadeIn;
      break;
    case 'fadeScale':
      selectedVariant = fadeScale;
      break;
    case 'slideLeft':
      selectedVariant = slideIn('left');
      break;
    case 'slideRight':
      selectedVariant = slideIn('right');
      break;
    case 'fadeUp':
    default:
      selectedVariant = fadeUp;
      break;
  }

  if (prefersReducedMotion) {
    const Tag = Component as any;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[Component] as any;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: margin as any }}
      variants={selectedVariant}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};
