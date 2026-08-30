import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Zap,
  Shield,
  Users2,
  Sparkles,
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
  return (
    <section className="relative flex flex-col justify-start items-center pt-8 sm:pt-12 pb-10 sm:pb-14 px-4 sm:px-6 overflow-hidden">
      {/* Tech-Themed Full-Bleed Motion Background */}
      <HeroMotionBackground />

      {/* Centered Hero Content */}
      <div className="max-w-4xl mx-auto w-full relative z-10 text-center flex flex-col items-center justify-center space-y-6 sm:space-y-7">
        {/* Small Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#EDE9E4] shadow-xs text-xs font-semibold text-[#111111]"
        >
          <span className="text-[#FF5A1F]">⚡</span>
          <span>AI-First Software Engineering Studio</span>
        </motion.div>

        {/* Eyebrow Label & Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="space-y-3 sm:space-y-4 max-w-3xl mx-auto text-center flex flex-col items-center"
        >
          <p className="text-xs sm:text-sm font-bold text-[#6B6660] uppercase tracking-wider">
            AI-POWERED SOFTWARE ENGINEERING STUDIO
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#111111] tracking-tight leading-[1.08]">
            Build intelligent software that{' '}
            <span className="text-[#FF5A1F] relative inline-block">
              works.
              {/* Curved underline accent */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#FF5A1F]/30 pointer-events-none"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,8 Q50,0 100,8"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-base sm:text-lg md:text-xl text-[#6B6660] max-w-2xl mx-auto leading-relaxed text-center"
        >
          We design and build AI products, web applications, mobile apps, automation systems and scalable cloud solutions for startups and growing businesses.
        </motion.p>

        {/* 3 Feature / Trust Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-1"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border border-[#EDE9E4] shadow-xs text-xs font-semibold text-[#111111]">
            <div className="w-5 h-5 rounded-md bg-[#FF5A1F]/10 flex items-center justify-center text-[#FF5A1F]">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span>Fast & Focused Delivery</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border border-[#EDE9E4] shadow-xs text-xs font-semibold text-[#111111]">
            <div className="w-5 h-5 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span>Security-First Development</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border border-[#EDE9E4] shadow-xs text-xs font-semibold text-[#111111]">
            <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center text-blue-600">
              <Users2 className="w-3.5 h-3.5" />
            </div>
            <span>Direct Expert Collaboration</span>
          </div>
        </motion.div>

        {/* Single CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="pt-2 flex justify-center"
        >
          <button
            onClick={() => onNavigate('/contact')}
            className="inline-flex items-center gap-2 sm:gap-2.5 bg-[#111111] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm md:text-base font-bold hover:bg-[#262626] hover:shadow-xl hover:scale-105 transition-all group active:scale-95 shadow-md"
          >
            <span className="text-gray-300 font-medium">Not sure what you need?</span>
            <span className="text-gray-400">→</span>
            <span className="text-white font-bold group-hover:text-[#FF5A1F] transition-colors">Talk to our team</span>
            <ArrowRight className="w-4 h-4 text-[#FF5A1F] transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* 'What We Build' Capabilities Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease: 'easeOut' }}
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
