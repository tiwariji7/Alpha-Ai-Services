import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, Shield, Activity, Cpu } from 'lucide-react';
import { ProjectTags } from './ProjectTags';

interface CaseStudyHeroProps {
  onBackToPortfolio?: () => void;
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = () => {
  const prefersReducedMotion = useReducedMotion();

  const heroImageUrl =
    'https://raw.githubusercontent.com/tiwariji7/SeHAT-SmartCare/main/assets/images/sehat-hero.png';

  const tags = ['AI', 'Android', 'RAG', 'Healthcare'];

  return (
    <section className="relative pt-2 pb-6 sm:pb-10">
      {/* Soft lavender/blue atmosphere in background */}
      <div className="absolute inset-0 -top-12 -bottom-8 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#F1F2FF] via-[#E8EAFF]/70 to-[#E0F2FE]/40 rounded-full blur-3xl opacity-70" />
        <div className="absolute -top-10 right-10 w-[300px] h-[300px] bg-[#5B86FF]/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-10 w-[260px] h-[260px] bg-[#7C3AED]/8 rounded-full blur-2xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Editorial Information */}
        <div className="lg:col-span-7 text-left space-y-5 sm:space-y-6">
          {/* Metadata pill & tags */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono text-[#2D3DB7] bg-[#F1F2FF] border border-[#2D3DB7]/20 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#5B86FF]" />
                <span>Project: SeHAT SmartCare</span>
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-mono text-[#0B1235] bg-white/90 border border-[#2D3DB7]/14">
                Internal Product
              </span>
            </div>

            <ProjectTags tags={tags} variant="pill" />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-extrabold text-[#0B1235] tracking-tight leading-[1.12]">
              SeHAT SmartCare
            </h1>
            <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#2D3DB7] via-[#5B86FF] to-[#7C3AED] bg-clip-text text-transparent">
              AI-Powered Health Assistance Platform
            </p>
          </div>

          {/* Short Project Description */}
          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-2xl font-normal">
            AI-powered Android healthcare assistant for symptom analysis, medical report understanding, and intelligent health guidance.
          </p>

          {/* Key Architectural Anchors / Feature Pills */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-[#2D3DB7]/14">
            <div className="flex items-center gap-2 text-xs font-medium text-[#4B5563]">
              <div className="w-6 h-6 rounded-lg bg-[#F1F2FF] border border-[#2D3DB7]/14 flex items-center justify-center text-[#2D3DB7] shrink-0">
                <Activity className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-[#0B1235]">Symptom Checker</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#4B5563]">
              <div className="w-6 h-6 rounded-lg bg-[#F1F2FF] border border-[#2D3DB7]/14 flex items-center justify-center text-[#5B86FF] shrink-0">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-[#0B1235]">RAG & FAISS</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#4B5563] col-span-2 sm:col-span-1">
              <div className="w-6 h-6 rounded-lg bg-[#F1F2FF] border border-[#2D3DB7]/14 flex items-center justify-center text-[#7C3AED] shrink-0">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-[#0B1235]">Privacy-Conscious</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            whileHover={
              prefersReducedMotion
                ? undefined
                : { scale: 1.015, transition: { duration: 0.35, ease: 'easeOut' } }
            }
            className="w-full max-w-lg lg:max-w-none rounded-[24px] sm:rounded-[28px] p-2 sm:p-3 bg-gradient-to-b from-white via-[#F7F8FF] to-[#F1F2FF] border border-[#2D3DB7]/20 shadow-[0_12px_40px_rgba(45,61,183,0.12)] relative overflow-hidden group"
          >
            {/* Ambient inner soft glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#22D3EE]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#5B86FF]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative rounded-[20px] sm:rounded-[22px] overflow-hidden bg-[#080B2A]/5 border border-[#2D3DB7]/14 aspect-[16/10] sm:aspect-[4/3] flex items-center justify-center">
              <img
                src={heroImageUrl}
                alt="SeHAT SmartCare Hero Showcase"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover sm:object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#080B2A]/10 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
