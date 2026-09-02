import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface RotatingWordProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  startDelay?: number;
  color?: string;
  className?: string;
}

export const RotatingWord: React.FC<RotatingWordProps> = ({
  words = ['works.', 'scales.', 'delivers.', 'performs.', 'converts.', 'grows.', 'ships.'],
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 2000,
  startDelay = 600,
  color = '#3B4FD9',
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  // If reduced motion is enabled, show the first word statically
  if (prefersReducedMotion) {
    return (
      <span
        className={`relative inline-block font-extrabold ${className}`}
        style={{ color }}
      >
        {words[0] || 'works.'}
        <svg
          className="absolute -bottom-2 left-0 w-full h-3 opacity-40 pointer-events-none"
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,8 Q50,0 100,8"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </span>
    );
  }

  return (
    <AnimatedRotatingWord
      words={words}
      typingSpeed={typingSpeed}
      deletingSpeed={deletingSpeed}
      pauseDuration={pauseDuration}
      startDelay={startDelay}
      color={color}
      className={className}
    />
  );
};

const AnimatedRotatingWord: React.FC<RotatingWordProps> = ({
  words,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 2000,
  startDelay = 600,
  color = '#3B4FD9',
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // Find longest word to stably reserve horizontal width
  const longestWord = words.reduce(
    (longest, current) => (current.length > longest.length ? current : longest),
    words[0] || 'performs.'
  );

  const currentWord = words[currentIndex] || '';

  // Initial delay before typewriter begins (coordinated with hero entrance motion)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!isStarted) return;

    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Full word typed -> stay visible for ~2s
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting -> move to next word
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, isStarted, currentWord, words.length, typingSpeed, deletingSpeed, pauseDuration]);

  // Underline progress: 1 when full word is typed, shrinks during deletion, redraws during typing
  const underlineProgress =
    currentWord.length > 0
      ? Math.max(0, Math.min(1, displayText.length / currentWord.length))
      : 0;

  return (
    <span
      className={`relative inline-grid grid-cols-1 grid-rows-1 items-baseline align-baseline font-extrabold ${className}`}
      style={{ color }}
      aria-label={`Build intelligent software that ${currentWord}`}
    >
      {/* Invisible placeholder for stable width and seamless responsive wrapping */}
      <span
        className="col-start-1 row-start-1 invisible opacity-0 select-none pointer-events-none whitespace-nowrap pr-2"
        aria-hidden="true"
      >
        {longestWord}
        {/* Invisible space for cursor */}
        <span className="inline-block w-[3px] ml-1" />
      </span>

      {/* Active typewriter text */}
      <span className="col-start-1 row-start-1 inline-flex items-baseline whitespace-nowrap z-10">
        <span>{displayText}</span>
        {/* Blinking Cursor */}
        <motion.span
          className="inline-block w-[2.5px] sm:w-[3px] h-[0.8em] ml-0.5 sm:ml-1 translate-y-[1px] rounded-full"
          style={{ backgroundColor: color }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'linear',
          }}
          aria-hidden="true"
        />
      </span>

      {/* Dynamic Animated Underline Accent */}
      <svg
        className="col-start-1 row-start-1 self-end -bottom-2 left-0 w-full h-3 pointer-events-none overflow-visible opacity-45"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M0,8 Q50,0 100,8"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: underlineProgress,
            opacity: underlineProgress > 0 ? 1 : 0,
          }}
          transition={{
            duration: isDeleting ? 0.05 : 0.08,
            ease: 'easeOut',
          }}
        />
      </svg>
    </span>
  );
};
