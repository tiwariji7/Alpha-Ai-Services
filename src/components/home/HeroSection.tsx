import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Zap,
  Shield,
  Users2,
  Code2,
  Terminal,
  Cpu,
  GitBranch,
} from 'lucide-react';
import { HeroMotionBackground } from './HeroMotionBackground';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenScheduleModal: _onOpenScheduleModal,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Typewriter effect variables
  const part1 = 'Build intelligent software that ';
  const part2 = 'works.';
  const fullText = part1 + part2;

  const [charCount, setCharCount] = useState(prefersReducedMotion ? fullText.length : 0);
  const [typingComplete, setTypingComplete] = useState(Boolean(prefersReducedMotion));
  const [showCursor, setShowCursor] = useState(!prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCharCount(fullText.length);
      setTypingComplete(true);
      setShowCursor(false);
      return;
    }

    let currentIndex = 0;
    // Initial short pause before typing starts
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        currentIndex += 1;
        setCharCount(currentIndex);

        if (currentIndex >= fullText.length) {
          clearInterval(interval);
          setTypingComplete(true);

          // Let cursor blink 3 times then fade out gracefully
          setTimeout(() => {
            setShowCursor(false);
          }, 1100);
        }
      }, 38);

      return () => clearInterval(interval);
    }, 180);

    return () => clearTimeout(startTimeout);
  }, [prefersReducedMotion, fullText.length]);

  // Sliced display text
  const currentText = fullText.slice(0, charCount);
  const displayPart1 = currentText.slice(0, part1.length);
  const displayPart2 = currentText.length > part1.length ? currentText.slice(part1.length) : '';

  return (
    <section className="relative flex flex-col justify-start items-center pt-8 sm:pt-12 pb-10 sm:pb-14 px-4 sm:px-6 overflow-hidden">
      {/* Tech-Themed Full-Bleed Motion Background */}
      <HeroMotionBackground />

      {/* Floating Decorative Tech Accents (Low-opacity, non-intrusive ambient depth) */}
      {!prefersReducedMotion && (
        <>
          {/* Top-Left: Code tag chip */}
          <motion.div
            aria-hidden="true"
            animate={{
              y: [-6, 6, -6],
              rotate: [-1, 1.5, -1],
            }}
            transition={{
              duration: 5.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/60 backdrop-blur-md border border-[#EDE9E4]/80 shadow-2xs absolute top-16 left-8 xl:left-20 pointer-events-none opacity-40 select-none -z-0"
          >
            <Code2 className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span className="font-mono text-[10px] text-[#6B6660] font-semibold">&lt;ai_runtime /&gt;</span>
          </motion.div>

          {/* Top-Right: Terminal prompt chip */}
          <motion.div
            aria-hidden="true"
            animate={{
              y: [7, -7, 7],
              rotate: [1, -1.5, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.8,
            }}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/60 backdrop-blur-md border border-[#EDE9E4]/80 shadow-2xs absolute top-14 right-8 xl:right-20 pointer-events-none opacity-40 select-none -z-0"
          >
            <Terminal className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span className="font-mono text-[10px] text-[#6B6660] font-semibold">&gt; git push prod</span>
          </motion.div>

          {/* Bottom-Left: Chip & Micro Architecture node */}
          <motion.div
            aria-hidden="true"
            animate={{
              y: [5, -5, 5],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.2,
            }}
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/50 backdrop-blur-sm border border-[#EDE9E4]/60 shadow-2xs absolute bottom-24 left-16 pointer-events-none opacity-30 select-none -z-0"
          >
            <Cpu className="w-3 h-3 text-[#FF5A1F]" />
            <span className="font-mono text-[9px] text-[#6B6660] font-bold">RAG_LATENCY &lt; 40ms</span>
          </motion.div>

          {/* Bottom-Right: Branch & Build status node */}
          <motion.div
            aria-hidden="true"
            animate={{
              y: [-6, 6, -6],
            }}
            transition={{
              duration: 5.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.6,
            }}
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/50 backdrop-blur-sm border border-[#EDE9E4]/60 shadow-2xs absolute bottom-28 right-16 pointer-events-none opacity-30 select-none -z-0"
          >
            <GitBranch className="w-3 h-3 text-emerald-600" />
            <span className="font-mono text-[9px] text-[#6B6660] font-bold">main: verified 100%</span>
          </motion.div>
        </>
      )}

      {/* Centered Hero Content */}
      <div className="max-w-4xl mx-auto w-full relative z-10 text-center flex flex-col items-center justify-center space-y-6 sm:space-y-7">
        {/* Small Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#EDE9E4] shadow-xs text-xs font-semibold text-[#111111]"
        >
          <span className="text-[#FF5A1F]">⚡</span>
          <span>AI-First Software Engineering Studio</span>
        </motion.div>

        {/* Eyebrow Label & Dynamic Typewriter Headline */}
        <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto text-center flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
            className="text-xs sm:text-sm font-bold text-[#6B6660] uppercase tracking-wider"
          >
            AI-POWERED SOFTWARE ENGINEERING STUDIO
          </motion.p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#111111] tracking-tight leading-[1.08] min-h-[2.3em] sm:min-h-[2.1em] flex items-center justify-center flex-wrap">
            <span>{displayPart1}</span>
            {displayPart2 && (
              <span className="text-[#FF5A1F] relative inline-block ml-1">
                {displayPart2}
                {/* Curved underline accent draws in right after typing completes */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#FF5A1F]/30 pointer-events-none"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0,8 Q50,0 100,8"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: prefersReducedMotion ? 1 : 0 }}
                    animate={{
                      pathLength: typingComplete ? 1 : 0,
                      opacity: typingComplete ? 1 : 0,
                    }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
              </span>
            )}

            {/* Blinking Tech Terminal Cursor */}
            {showCursor && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.65, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block w-[3px] sm:w-[4px] h-[0.85em] bg-[#FF5A1F] ml-1.5 rounded-full align-middle"
              />
            )}
          </h1>
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0.2 : 1.35, ease: 'easeOut' }}
          className="text-base sm:text-lg md:text-xl text-[#6B6660] max-w-2xl mx-auto leading-relaxed text-center"
        >
          We design and build AI products, web applications, mobile apps, automation systems and scalable cloud solutions for startups and growing businesses.
        </motion.p>

        {/* 3 Feature / Trust Chips (Staggered entrance + interactive hover lift) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-1">
          {/* Pill 1 */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: prefersReducedMotion ? 0.25 : 1.5, ease: 'easeOut' }}
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    y: -2,
                    boxShadow: '0 8px 24px -4px rgba(255, 90, 31, 0.14)',
                    borderColor: 'rgba(255, 90, 31, 0.45)',
                  }
            }
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border border-[#EDE9E4] shadow-xs text-xs font-semibold text-[#111111] transition-colors cursor-default"
          >
            <div className="w-5 h-5 rounded-md bg-[#FF5A1F]/10 flex items-center justify-center text-[#FF5A1F]">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span>Fast & Focused Delivery</span>
          </motion.div>

          {/* Pill 2 */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: prefersReducedMotion ? 0.3 : 1.62, ease: 'easeOut' }}
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    y: -2,
                    boxShadow: '0 8px 24px -4px rgba(16, 185, 129, 0.14)',
                    borderColor: 'rgba(16, 185, 129, 0.45)',
                  }
            }
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border border-[#EDE9E4] shadow-xs text-xs font-semibold text-[#111111] transition-colors cursor-default"
          >
            <div className="w-5 h-5 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span>Security-First Development</span>
          </motion.div>

          {/* Pill 3 */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: prefersReducedMotion ? 0.35 : 1.74, ease: 'easeOut' }}
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    y: -2,
                    boxShadow: '0 8px 24px -4px rgba(59, 130, 246, 0.14)',
                    borderColor: 'rgba(59, 130, 246, 0.45)',
                  }
            }
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border border-[#EDE9E4] shadow-xs text-xs font-semibold text-[#111111] transition-colors cursor-default"
          >
            <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center text-blue-600">
              <Users2 className="w-3.5 h-3.5" />
            </div>
            <span>Direct Expert Collaboration</span>
          </motion.div>
        </div>

        {/* Single CTA Button with Subtle Continuous Edge Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0.4 : 1.9, ease: [0.16, 1, 0.3, 1] }}
          className="pt-2 flex justify-center"
        >
          <motion.button
            onClick={() => onNavigate('/contact')}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    boxShadow: [
                      '0 4px 14px rgba(17, 17, 17, 0.15), 0 0 0 0px rgba(255, 90, 31, 0)',
                      '0 8px 22px rgba(17, 17, 17, 0.2), 0 0 0 3.5px rgba(255, 90, 31, 0.35)',
                      '0 4px 14px rgba(17, 17, 17, 0.15), 0 0 0 0px rgba(255, 90, 31, 0)',
                    ],
                  }
            }
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-flex items-center gap-2 sm:gap-2.5 bg-[#111111] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm md:text-base font-bold hover:bg-[#262626] hover:scale-105 transition-all group active:scale-95 cursor-pointer relative"
          >
            <span className="text-gray-300 font-medium">Not sure what you need?</span>
            <span className="text-gray-400">→</span>
            <span className="text-white font-bold group-hover:text-[#FF5A1F] transition-colors">Talk to our team</span>
            <ArrowRight className="w-4 h-4 text-[#FF5A1F] transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* 'What We Build' Capabilities Strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0.45 : 2.1, ease: 'easeOut' }}
          className="pt-6 sm:pt-7 border-t border-[#EDE9E4] w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#6B6660]"
        >
          <span className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] sm:text-xs">
            What we build —
          </span>
          <span className="font-semibold text-[#111111]">AI & ML</span>
          <span className="text-gray-300">|</span>
          <span className="font-semibold text-[#111111]">Web Apps</span>
          <span className="text-gray-300">|</span>
          <span className="font-semibold text-[#111111]">Mobile Apps</span>
          <span className="text-gray-300">|</span>
          <span className="font-semibold text-[#111111]">SaaS</span>
          <span className="text-gray-300">|</span>
          <span className="font-semibold text-[#111111]">Automation</span>
          <span className="text-gray-300">|</span>
          <span className="font-semibold text-[#111111]">Cloud & Backend</span>
        </motion.div>
      </div>
    </section>
  );
};
