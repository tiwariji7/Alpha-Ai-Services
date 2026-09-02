import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { flowWordContainer, flowWordItem } from '../../utils/motion';

interface FlowingHeadingProps {
  children?: React.ReactNode;
  text?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  delay?: number;
  threshold?: number;
}

export const FlowingHeading: React.FC<FlowingHeadingProps> = ({
  children,
  text,
  as: Component = 'h2',
  className = '',
  highlightWords = [],
  highlightClassName = 'text-gradient font-black',
  delay = 0,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // If simple string text is passed, split into flowing words
  const content = text || (typeof children === 'string' ? children : null);

  if (prefersReducedMotion || !content) {
    const Tag = Component as any;
    return <Tag className={className}>{content || children}</Tag>;
  }

  const words = content.split(' ');

  const MotionComponent = motion[Component] as any;

  return (
    <MotionComponent
      variants={flowWordContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-25px' }}
      custom={delay}
      className={`${className} inline-flex flex-wrap items-baseline gap-x-[0.28em] gap-y-[0.1em]`}
    >
      {words.map((word, idx) => {
        // Strip punctuation for highlight match check
        const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, '');
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord.toLowerCase() || hw.toLowerCase() === word.toLowerCase()
        );

        return (
          <motion.span
            key={`${word}-${idx}`}
            variants={flowWordItem}
            className={`inline-block ${isHighlight ? highlightClassName : ''}`}
          >
            {word}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
};
