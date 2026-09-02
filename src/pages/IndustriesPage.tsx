import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/siteData';
import { pageTransition } from '../utils/motion';
import { FlowingHeading } from '../components/common/FlowingHeading';
import { ModernCard } from '../components/common/ModernCard';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { InteractiveButton } from '../components/common/InteractiveButton';

interface IndustriesPageProps {
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onNavigate: _onNavigate,
  onOpenScheduleModal,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndustryId, setActiveIndustryId] = useState(INDUSTRIES_DATA[0].id);

  const activeIndustry = INDUSTRIES_DATA.find((i) => i.id === activeIndustryId) || INDUSTRIES_DATA[0];

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-4 pb-16 sm:pt-6 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-10 sm:space-y-12 overflow-x-hidden"
    >
      {/* Hero Header */}
      <div className="relative pt-6 sm:pt-10 pb-2 text-center max-w-3xl mx-auto space-y-4">
        <ScrollReveal variant="fadeScale">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>8 Core Industry Verticals</span>
          </div>
        </ScrollReveal>

        <FlowingHeading
          as="h1"
          text="Domain expertise across regulated sectors."
          highlightWords={['regulated', 'sectors.']}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
        />

        <ScrollReveal variant="fadeUp" delay={0.1}>
          <p className="text-[#5B5876] text-base sm:text-lg leading-relaxed">
            Generic AI won't cut it in high-stakes environments. We build compliance-ready architectures with strict regulatory guardrails.
          </p>
        </ScrollReveal>
      </div>

      {/* Industry Tabs Bar */}
      <ScrollReveal variant="fadeUp" delay={0.15}>
        <div className="flex flex-wrap justify-center gap-2">
          {INDUSTRIES_DATA.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActiveIndustryId(ind.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                activeIndustryId === ind.id
                  ? 'bg-gradient-to-r from-[#3B4FD9] to-[#7B5CE8] text-white border-transparent shadow-sm'
                  : 'bg-white text-[#5B5876] border-[#EDEAFB] hover:bg-[#F6F5FC]'
              }`}
            >
              {ind.name}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Active Industry Showcase Card */}
      <ModernCard variant="white" className="p-8 sm:p-14 text-left space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EDEAFB]">
          <div>
            <span className="text-xs font-extrabold text-[#3B4FD9] uppercase tracking-wider font-mono">
              Featured Vertical Profile
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151235] mt-1">
              {activeIndustry.name}
            </h2>
          </div>
          <div className="bg-[#EDEAFB] px-4 py-2 rounded-2xl border border-[#7B5CE8]/20">
            <span className="text-xs text-[#5B5876] font-medium">Industry Benchmark: </span>
            <strong className="text-xs font-extrabold text-[#3B4FD9]">{activeIndustry.featuredStat}</strong>
          </div>
        </div>

        <p className="text-base text-[#5B5876] leading-relaxed max-w-3xl">
          {activeIndustry.description}
        </p>

        {/* Concrete Use Cases */}
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-[#151235]">
            Common Production Deployments:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeIndustry.popularUseCases.map((uc, i) => (
              <div key={i} className="bg-[#F6F5FC] p-4 rounded-2xl border border-[#EDEAFB] flex items-start gap-3 hover:border-[#3B4FD9]/30 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-[#3B4FD9] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-[#151235] leading-relaxed">{uc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Story & ROI */}
        <div className="bg-gradient-to-br from-[#EDEAFB]/50 via-[#F6F5FC] to-white p-6 sm:p-8 rounded-3xl border border-[#EDEAFB] space-y-3">
          <div className="text-xs font-extrabold text-[#5B4FE0] uppercase tracking-wider">
            Key Strategic Value &amp; Impact:
          </div>
          <div className="text-sm font-extrabold text-[#151235]">
            {activeIndustry.keyBenefit}
          </div>
          <div className="pt-3">
            <InteractiveButton
              variant="primary"
              glow={true}
              onClick={() => onOpenScheduleModal(`${activeIndustry.name} Architecture`)}
            >
              <span>Schedule {activeIndustry.name} Architecture Brief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </InteractiveButton>
          </div>
        </div>
      </ModernCard>

      {/* Grid of all other industries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {INDUSTRIES_DATA.map((ind, idx) => (
          <ModernCard
            key={ind.id}
            variant="white"
            delay={idx * 0.05}
            onClick={() => setActiveIndustryId(ind.id)}
            className="p-6 space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-extrabold text-[#3B4FD9] group-hover:text-[#2A3FA8] transition-colors font-mono">{ind.name}</div>
              <p className="text-xs text-[#5B5876] line-clamp-3 mt-1 leading-relaxed">
                {ind.description}
              </p>
            </div>
            <div className="pt-3 border-t border-[#EDEAFB] text-[11px] font-bold text-[#151235] flex items-center justify-between">
              <span>{ind.featuredStat}</span>
              <span className="text-[#3B4FD9] group-hover:translate-x-0.5 transition-transform">Explore →</span>
            </div>
          </ModernCard>
        ))}
      </div>
    </motion.div>
  );
};
