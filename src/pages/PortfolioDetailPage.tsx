import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  Code2,
  Target,
  Compass,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  Image as ImageIcon,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/siteData';
import { pageTransition } from '../utils/motion';
import { FlowingHeading } from '../components/common/FlowingHeading';
import { ModernCard } from '../components/common/ModernCard';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { InteractiveButton } from '../components/common/InteractiveButton';
import { SehatSmartCareCaseStudy } from '../components/case-study/SehatSmartCareCaseStudy';

interface PortfolioDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}

export const PortfolioDetailPage: React.FC<PortfolioDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenScheduleModal,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const item = PORTFOLIO_DATA.find((p) => p.slug === slug) || PORTFOLIO_DATA[0];

  // Bespoke upgraded case study experience for SeHAT SmartCare
  if (slug === 'sehat-smartcare' || item.slug === 'sehat-smartcare') {
    return (
      <SehatSmartCareCaseStudy
        onNavigate={onNavigate}
        onOpenScheduleModal={onOpenScheduleModal}
      />
    );
  }

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-4 pb-16 sm:pt-6 sm:pb-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-8 sm:space-y-12 overflow-x-hidden"
    >
      {/* Top Navigation / Breadcrumbs */}
      <ScrollReveal variant="fadeIn">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5B5876]">
          <motion.button
            whileHover={{ x: -2 }}
            onClick={() => onNavigate('/portfolio')}
            className="hover:text-[#151235] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Selected Work</span>
          </motion.button>
          <span>/</span>
          <span className="text-[#3B4FD9] font-bold">{item.name}</span>
        </div>
      </ScrollReveal>

      {/* Hero Header Banner */}
      <div className="relative">
        <ModernCard variant="white" className="p-6 sm:p-10 lg:p-12 text-left space-y-4 sm:space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold text-[#5B4FE0] bg-[#EDEAFB] px-3.5 py-1 rounded-full border border-[#7B5CE8]/20 font-mono">
              {item.name}
            </span>
            <span className="text-xs font-bold text-[#151235] bg-[#F6F5FC] px-3.5 py-1 rounded-full border border-[#EDEAFB] font-mono">
              {item.projectType}
            </span>
          </div>

          <FlowingHeading
            as="h1"
            text={item.title}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151235] tracking-tight leading-tight"
          />

          <ScrollReveal variant="fadeUp" delay={0.1}>
            <p className="text-sm sm:text-base md:text-lg text-[#5B5876] leading-relaxed">
              {item.summary}
            </p>
          </ScrollReveal>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#EDEAFB]">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold text-[#151235] bg-[#F6F5FC] px-3 py-1 rounded-xl border border-[#EDEAFB] font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </ModernCard>
      </div>

      {/* Main Cover Visual */}
      <ScrollReveal variant="fadeScale">
        <div className="rounded-3xl overflow-hidden shadow-soft border border-[#EDEAFB] h-72 sm:h-96 lg:h-[450px] w-full bg-[#F6F5FC]">
          <img
            src={item.coverImage}
            alt={item.title}
            width="1200"
            height="675"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
      </ScrollReveal>

      {/* 1. Overview */}
      {item.overview && (
        <ModernCard variant="white" className="p-7 sm:p-10 text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#3B4FD9] uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4" />
            <span>01 — Overview</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#151235]">
            What Was Built
          </h2>
          <p className="text-sm sm:text-base text-[#5B5876] leading-relaxed">
            {item.overview}
          </p>
        </ModernCard>
      )}

      {/* 2. Challenge & 3. Approach (2-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
        {/* Challenge */}
        <ModernCard variant="white" className="p-7 sm:p-9 space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-rose-600 uppercase tracking-wider font-mono">
            <Target className="w-4 h-4" />
            <span>02 — Challenge</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#151235]">
            The Problem to Solve
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5876] leading-relaxed">
            {item.challenge}
          </p>
        </ModernCard>

        {/* Approach */}
        <ModernCard variant="white" className="p-7 sm:p-9 space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#3B4FD9] uppercase tracking-wider font-mono">
            <Compass className="w-4 h-4" />
            <span>03 — Approach</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#151235]">
            How We Approached It
          </h2>
          <p className="text-xs sm:text-sm text-[#5B5876] leading-relaxed">
            {item.approach || 'We adopted a systematic, iterative methodology prioritizing clean architecture, user empathy, and scalable system components.'}
          </p>
        </ModernCard>
      </div>

      {/* 4. Solution */}
      <ModernCard variant="white" className="p-7 sm:p-10 text-left space-y-3">
        <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-600 uppercase tracking-wider font-mono">
          <CheckCircle2 className="w-4 h-4" />
          <span>04 — Solution</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#151235]">
          Engineered Solution
        </h2>
        <p className="text-sm sm:text-base text-[#5B5876] leading-relaxed">
          {item.solution}
        </p>
      </ModernCard>

      {/* 5. Technology */}
      <ModernCard variant="white" className="p-7 sm:p-10 text-left space-y-4">
        <div className="flex items-center gap-2 text-xs font-extrabold text-[#3B4FD9] uppercase tracking-wider font-mono">
          <Code2 className="w-4 h-4" />
          <span>05 — Technology Stack</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#151235]">
          Tools & Frameworks Used
        </h2>
        <div className="flex flex-wrap gap-2.5 pt-2">
          {item.techUsed.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-2xl bg-[#EDEAFB] border border-[#7B5CE8]/20 text-xs sm:text-sm font-bold text-[#151235]"
            >
              {tech}
            </span>
          ))}
        </div>
      </ModernCard>

      {/* 6. Outcome */}
      {item.keyOutcomes && item.keyOutcomes.length > 0 && (
        <ModernCard variant="white" className="p-7 sm:p-10 text-left space-y-4">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#3B4FD9] uppercase tracking-wider font-mono">
            <Layers className="w-4 h-4" />
            <span>06 — Measurable Outcome</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#151235]">
            Verified Impact
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {item.keyOutcomes.map((out, idx) => (
              <div
                key={idx}
                className="bg-[#F6F5FC] p-4 rounded-2xl border border-[#EDEAFB] text-center"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#3B4FD9]">
                  {out.metric}
                </div>
                <div className="text-xs text-[#5B5876] mt-1 font-medium">
                  {out.label}
                </div>
              </div>
            ))}
          </div>
        </ModernCard>
      )}

      {/* 7. Gallery */}
      {item.gallery && item.gallery.length > 0 && (
        <ModernCard variant="white" className="p-7 sm:p-10 text-left space-y-5">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#151235] uppercase tracking-wider">
            <ImageIcon className="w-4 h-4 text-[#3B4FD9]" />
            <span>Product Gallery</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#151235]">
            Visual Artifacts & Previews
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {item.gallery.map((imgUrl, gIdx) => (
              <div
                key={gIdx}
                className="rounded-2xl overflow-hidden border border-[#EDEAFB] h-60 sm:h-72 bg-[#F6F5FC] shadow-xs"
              >
                <img
                  src={imgUrl}
                  alt={`${item.title} Preview ${gIdx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </ModernCard>
      )}

      {/* Bottom Action Card */}
      <ScrollReveal variant="fadeScale">
        <div className="relative bg-gradient-to-br from-[#0A0E2A] via-[#141B5C] to-[#2A3FA8] text-white rounded-3xl p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md overflow-hidden border border-[#3B4FD9]/30">
          {/* Background Decorative Tech Dots Mesh */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B4FD9_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Interested in building something similar?
            </h3>
            <p className="text-xs sm:text-sm text-[#B8BEDC] mt-1">
              Let's discuss your product goals, architecture, and timeline.
            </p>
          </div>
          <InteractiveButton
            variant="primary"
            glow={true}
            onClick={() => onNavigate('/contact')}
            className="relative z-10 whitespace-nowrap"
          >
            <span>Talk to Our Team</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </InteractiveButton>
        </div>
      </ScrollReveal>
    </motion.div>
  );
};
