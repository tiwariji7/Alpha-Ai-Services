import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Target,
  Compass,
  CheckCircle2,
  Sparkles,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/siteData';
import { pageTransition } from '../utils/motion';

interface PortfolioDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}

export const PortfolioDetailPage: React.FC<PortfolioDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenScheduleModal: _onOpenScheduleModal,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const item = PORTFOLIO_DATA.find((p) => p.slug === slug) || PORTFOLIO_DATA[0];

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-4 pb-16 sm:pt-6 sm:pb-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-8 sm:space-y-12"
    >
      {/* Top Navigation / Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-[#6B6660]">
        <button
          onClick={() => onNavigate('/portfolio')}
          className="hover:text-[#111111] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Selected Work</span>
        </button>
        <span>/</span>
        <span className="text-[#FF5A1F] font-bold">{item.name}</span>
      </div>

      {/* Hero Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EDE9E4] shadow-soft text-left space-y-4 sm:space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold text-[#FF5A1F] bg-[#FF5A1F]/10 px-3.5 py-1 rounded-full">
            {item.name}
          </span>
          <span className="text-xs font-bold text-[#111111] bg-[#FAF8F6] px-3.5 py-1 rounded-full border border-[#EDE9E4]">
            {item.projectType}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
          {item.title}
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-[#6B6660] leading-relaxed">
          {item.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#EDE9E4]">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-bold text-[#111111] bg-[#FAF8F6] px-3 py-1 rounded-xl border border-[#EDE9E4]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Main Cover Visual */}
      <div className="rounded-3xl overflow-hidden shadow-soft border border-[#EDE9E4] h-72 sm:h-96 lg:h-[450px] w-full bg-gray-100">
        <img
          src={item.coverImage}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 1. Overview */}
      {item.overview && (
        <section className="bg-white rounded-3xl p-7 sm:p-10 border border-[#EDE9E4] shadow-soft text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>01 — Overview</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#111111]">
            What Was Built
          </h2>
          <p className="text-sm sm:text-base text-[#6B6660] leading-relaxed">
            {item.overview}
          </p>
        </section>
      )}

      {/* 2. Challenge & 3. Approach (2-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
        {/* Challenge */}
        <section className="bg-white rounded-3xl p-7 sm:p-9 border border-[#EDE9E4] shadow-soft space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-rose-600 uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>02 — Challenge</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
            The Problem to Solve
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6660] leading-relaxed">
            {item.challenge}
          </p>
        </section>

        {/* Approach */}
        <section className="bg-white rounded-3xl p-7 sm:p-9 border border-[#EDE9E4] shadow-soft space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-blue-600 uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>03 — Approach</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
            How We Approached It
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6660] leading-relaxed">
            {item.approach || 'We adopted a systematic, iterative methodology prioritizing clean architecture, user empathy, and scalable system components.'}
          </p>
        </section>
      </div>

      {/* 4. Solution */}
      <section className="bg-white rounded-3xl p-7 sm:p-10 border border-[#EDE9E4] shadow-soft text-left space-y-3">
        <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-600 uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4" />
          <span>04 — Solution</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#111111]">
          Engineered Solution
        </h2>
        <p className="text-sm sm:text-base text-[#6B6660] leading-relaxed">
          {item.solution}
        </p>
      </section>

      {/* 5. Technology */}
      <section className="bg-white rounded-3xl p-7 sm:p-10 border border-[#EDE9E4] shadow-soft text-left space-y-4">
        <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
          <Code2 className="w-4 h-4" />
          <span>05 — Technology Stack</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#111111]">
          Tools & Frameworks Used
        </h2>
        <div className="flex flex-wrap gap-2.5 pt-2">
          {item.techUsed.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-2xl bg-[#FAF8F6] border border-[#EDE9E4] text-xs sm:text-sm font-bold text-[#111111]"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* 6. Outcome (Only rendered if keyOutcomes exist with verified real results) */}
      {item.keyOutcomes && item.keyOutcomes.length > 0 && (
        <section className="bg-white rounded-3xl p-7 sm:p-10 border border-[#EDE9E4] shadow-soft text-left space-y-4">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>06 — Measurable Outcome</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#111111]">
            Verified Impact
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {item.keyOutcomes.map((out, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F6] p-4 rounded-2xl border border-[#EDE9E4] text-center"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#FF5A1F]">
                  {out.metric}
                </div>
                <div className="text-xs text-[#6B6660] mt-1 font-medium">
                  {out.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Gallery */}
      {item.gallery && item.gallery.length > 0 && (
        <section className="bg-white rounded-3xl p-7 sm:p-10 border border-[#EDE9E4] shadow-soft text-left space-y-5">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#111111] uppercase tracking-wider">
            <ImageIcon className="w-4 h-4 text-[#FF5A1F]" />
            <span>Product Gallery</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#111111]">
            Visual Artifacts & Previews
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {item.gallery.map((imgUrl, gIdx) => (
              <div
                key={gIdx}
                className="rounded-2xl overflow-hidden border border-[#EDE9E4] h-60 sm:h-72 bg-gray-100 shadow-xs"
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
        </section>
      )}

      {/* Bottom Action Card */}
      <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Interested in building something similar?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Let's discuss your product goals, architecture, and timeline.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/contact')}
          className="bg-[#FF5A1F] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold hover:bg-[#e04c15] transition-all whitespace-nowrap active:scale-95 shadow-md"
        >
          Talk to Our Team →
        </button>
      </div>
    </motion.div>
  );
};
