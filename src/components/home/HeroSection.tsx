import React from 'react';
import {
  ArrowRight,
  Zap,
  Shield,
  Users2,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { RotatingWord } from './RotatingWord';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}

const ROTATING_WORDS = [
  'works.',
  'scales.',
  'delivers.',
  'performs.',
  'converts.',
  'grows.',
  'ships.',
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate: _onNavigate,
  onOpenScheduleModal,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-center items-center pt-8 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Clean Subtle Static Ambient Gradient Background Matching Site Theme */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 select-none overflow-hidden">
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] rounded-full bg-gradient-to-tr from-[#3B4FD9]/10 via-[#7B5CE8]/8 to-[#7DE8FF]/6 blur-[120px] pointer-events-none" />
        {/* Smooth Bottom Blend into Section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F6F5FC]/30 to-[#F6F5FC] pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-4xl mx-auto w-full relative z-10 text-center flex flex-col items-center justify-center space-y-6 sm:space-y-7">
        {/* 1. Badge Pill (Fades & slides down first) */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 shadow-xs text-xs font-semibold text-[#151235]">
            <span className="text-[#3B4FD9]">⚡</span>
            <span className="text-[#5B4FE0] font-bold">AI-First Software Engineering Studio</span>
          </div>
        </motion.div>

        {/* 2. Eyebrow Label & Headline (Static block fades up, followed by typewriter) */}
        <motion.div
          className="space-y-3 sm:space-y-4 max-w-3xl mx-auto text-center flex flex-col items-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <p className="text-xs sm:text-sm font-extrabold text-[#3B4FD9] uppercase tracking-wider">
            AI-POWERED SOFTWARE ENGINEERING STUDIO
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#151235] tracking-tight leading-[1.08]">
            Build intelligent software that{' '}
            <RotatingWord
              words={ROTATING_WORDS}
              color="#3B4FD9"
              startDelay={prefersReducedMotion ? 0 : 550}
            />
          </h1>
        </motion.div>

        {/* 3. Subheading (Fades up after headline) */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-[#5B5876] max-w-2xl mx-auto leading-relaxed text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          We design and build AI products, web applications, mobile apps, automation systems and scalable cloud solutions for startups and growing businesses.
        </motion.p>

        {/* 4. 3 Feature / Trust Chips (Staggered entrance) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-1">
          {/* Pill 1 */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#EDEAFB] shadow-xs text-xs font-semibold text-[#151235] transition-all hover:border-[#7B5CE8]/40 hover:shadow-sm cursor-default"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.82,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="w-5 h-5 rounded-md bg-[#EDEAFB] flex items-center justify-center text-[#5B4FE0]">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span>Fast & Focused Delivery</span>
          </motion.div>

          {/* Pill 2 */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#EDEAFB] shadow-xs text-xs font-semibold text-[#151235] transition-all hover:border-[#7B5CE8]/40 hover:shadow-sm cursor-default"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="w-5 h-5 rounded-md bg-[#EDEAFB] flex items-center justify-center text-[#5B4FE0]">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span>Security-First Development</span>
          </motion.div>

          {/* Pill 3 */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#EDEAFB] shadow-xs text-xs font-semibold text-[#151235] transition-all hover:border-[#7B5CE8]/40 hover:shadow-sm cursor-default"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.98,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="w-5 h-5 rounded-md bg-[#EDEAFB] flex items-center justify-center text-[#5B4FE0]">
              <Users2 className="w-3.5 h-3.5" />
            </div>
            <span>Direct Expert Collaboration</span>
          </motion.div>
        </div>

        {/* 5. Single Primary CTA Button (Scales & fades in last) */}
        <motion.div
          className="pt-2 flex justify-center"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 1.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <button
            onClick={() => onOpenScheduleModal()}
            className="inline-flex items-center gap-2 sm:gap-2.5 bg-gradient-to-r from-[#3B4FD9] via-[#4D6BFF] to-[#7B5CE8] hover:shadow-[0_10px_25px_-5px_rgba(59,79,217,0.4)] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
          >
            <span className="text-white/90 font-medium">Not sure what you need?</span>
            <span className="text-white/70">→</span>
            <span className="text-white font-bold">Talk to our team</span>
            <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* 'What We Build' Capabilities Strip */}
        <motion.div
          className="pt-6 sm:pt-7 border-t border-[#EDEAFB] w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#5B5876]"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 1.25,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span className="font-extrabold text-[#151235] uppercase tracking-wider text-[11px] sm:text-xs">
            What we build —
          </span>
          <span className="font-semibold text-[#151235]">AI & ML</span>
          <span className="text-[#EDEAFB]">|</span>
          <span className="font-semibold text-[#151235]">Web Apps</span>
          <span className="text-[#EDEAFB]">|</span>
          <span className="font-semibold text-[#151235]">Mobile Apps</span>
          <span className="text-[#EDEAFB]">|</span>
          <span className="font-semibold text-[#151235]">SaaS</span>
          <span className="text-[#EDEAFB]">|</span>
          <span className="font-semibold text-[#151235]">Automation</span>
          <span className="text-[#EDEAFB]">|</span>
          <span className="font-semibold text-[#151235]">Cloud & Backend</span>
        </motion.div>
      </div>
    </section>
  );
};
