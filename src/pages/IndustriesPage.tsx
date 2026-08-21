import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
} from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/siteData';
import { pageTransition } from '../utils/motion';

interface IndustriesPageProps {
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onNavigate,
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
      className="pt-4 pb-16 sm:pt-6 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-10 sm:space-y-12"
    >
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>8 Core Industry Verticals</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight">
          Domain expertise across <span className="text-[#FF5A1F]">regulated sectors.</span>
        </h1>

        <p className="text-[#6B6660] text-base sm:text-lg leading-relaxed">
          Generic AI won't cut it in high-stakes environments. We build compliance-ready architectures with strict regulatory guardrails.
        </p>
      </div>

      {/* Industry Tabs Bar */}
      <div className="flex flex-wrap justify-center gap-2">
        {INDUSTRIES_DATA.map((ind) => (
          <button
            key={ind.id}
            onClick={() => setActiveIndustryId(ind.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
              activeIndustryId === ind.id
                ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                : 'bg-white text-[#6B6660] border-[#EDE9E4] hover:bg-[#FAF8F6]'
            }`}
          >
            {ind.name}
          </button>
        ))}
      </div>

      {/* Active Industry Showcase Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#EDE9E4] shadow-soft text-left space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EDE9E4]">
          <div>
            <span className="text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
              Featured Vertical Profile
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mt-1">
              {activeIndustry.name}
            </h2>
          </div>
          <div className="bg-[#FAF8F6] px-4 py-2 rounded-2xl border border-[#EDE9E4]">
            <span className="text-xs text-gray-500 font-medium">Industry Benchmark: </span>
            <strong className="text-xs font-extrabold text-[#FF5A1F]">{activeIndustry.featuredStat}</strong>
          </div>
        </div>

        <p className="text-base text-[#6B6660] leading-relaxed max-w-3xl">
          {activeIndustry.description}
        </p>

        {/* Concrete Use Cases */}
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-[#111111]">
            Common Production Deployments:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeIndustry.popularUseCases.map((uc, i) => (
              <div key={i} className="bg-[#FAF8F6] p-4 rounded-2xl border border-[#EDE9E4] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FF5A1F] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-[#111111] leading-relaxed">{uc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Story & ROI */}
        <div className="bg-gradient-to-br from-[#FAF8F6] to-white p-6 sm:p-8 rounded-3xl border border-[#EDE9E4] space-y-3">
          <div className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
            Key Strategic Value & Impact:
          </div>
          <div className="text-sm font-extrabold text-[#111111]">
            {activeIndustry.keyBenefit}
          </div>
          <div className="pt-3">
            <button
              onClick={() => onOpenScheduleModal(`${activeIndustry.name} Architecture`)}
              className="bg-[#111111] text-white px-6 py-3 rounded-full text-xs font-bold hover:bg-[#262626] transition-all inline-flex items-center gap-2"
            >
              <span>Schedule {activeIndustry.name} Architecture Brief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of all other industries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {INDUSTRIES_DATA.map((ind) => (
          <div
            key={ind.id}
            onClick={() => setActiveIndustryId(ind.id)}
            className="bg-white rounded-3xl p-6 border border-[#EDE9E4] shadow-soft hover:shadow-soft-lg transition-all cursor-pointer space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-extrabold text-[#FF5A1F]">{ind.name}</div>
              <p className="text-xs text-[#6B6660] line-clamp-3 mt-1 leading-relaxed">
                {ind.description}
              </p>
            </div>
            <div className="pt-3 border-t border-[#EDE9E4] text-[11px] font-bold text-[#111111] flex items-center justify-between">
              <span>{ind.featuredStat}</span>
              <span className="text-[#FF5A1F]">Explore →</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
