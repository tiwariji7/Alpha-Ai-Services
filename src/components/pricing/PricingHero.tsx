import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, ArrowRight, PhoneCall, CheckCircle2 } from 'lucide-react';
import { fadeUp } from '../../utils/motion';

interface PricingHeroProps {
  onScrollToPlans: () => void;
  onOpenScheduleModal: (topic?: string) => void;
}

export const PricingHero: React.FC<PricingHeroProps> = ({
  onScrollToPlans,
  onOpenScheduleModal,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="pt-8 sm:pt-14 pb-6 sm:pb-10 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle Warm Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] bg-gradient-to-tr from-[#FF5A1F]/10 via-[#FF7A45]/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-5">
        {/* Eyebrow */}
        <motion.div
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>MONTHLY TECHNOLOGY RETAINERS</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.08 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-[1.15]"
        >
          Your Technology Team, <br />
          <span className="text-[#FF5A1F] inline-block">Without Building One.</span>
        </motion.h1>

        {/* Supporting Line */}
        <motion.p
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          className="text-sm sm:text-base md:text-lg text-[#6B6660] max-w-2xl mx-auto leading-relaxed"
        >
          Keep your existing digital systems running, improving and growing — with ongoing technical support, maintenance and dedicated engineering capacity.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.22 }}
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto"
        >
          <button
            onClick={onScrollToPlans}
            className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#111111] text-white hover:bg-[#262626] transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-sm cursor-pointer"
          >
            <span>Compare Retainer Plans</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => onOpenScheduleModal('Monthly Technology Partnership')}
            className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-white text-[#111111] border border-[#EDE9E4] hover:border-[#FF5A1F]/40 hover:bg-[#FAF8F6] transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-2xs cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-[#FF5A1F]" />
            <span>Talk to Our Team</span>
          </button>
        </motion.div>

        {/* Trust Line */}
        <motion.div
          variants={prefersReducedMotion ? undefined : fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.28 }}
          className="pt-2 sm:pt-3 flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-[#8C867F] font-medium flex-wrap"
        >
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span>Transparent monthly plans</span>
          </span>
          <span className="text-[#DDD8D0]">•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span>Agreed capacity</span>
          </span>
          <span className="text-[#DDD8D0]">•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span>Zero hiring overhead</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
};
