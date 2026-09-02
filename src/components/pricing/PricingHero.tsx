import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, ArrowRight, PhoneCall, CheckCircle2 } from 'lucide-react';
import { FlowingHeading } from '../common/FlowingHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { InteractiveButton } from '../common/InteractiveButton';
import { PageHeroAmbient } from '../common/PageHeroAmbient';

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
      <PageHeroAmbient theme="page" />

      <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-5 relative z-10">
        {/* Eyebrow */}
        <ScrollReveal variant="fadeScale">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MONTHLY TECHNOLOGY RETAINERS</span>
          </div>
        </ScrollReveal>

        {/* Main Heading */}
        <FlowingHeading
          as="h1"
          text="Your Technology Team, Without Building One."
          highlightWords={['Without', 'Building', 'One.']}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#151235] tracking-tight leading-[1.15] justify-center"
        />

        {/* Supporting Line */}
        <ScrollReveal variant="fadeUp" delay={0.12}>
          <p className="text-sm sm:text-base md:text-lg text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
            Keep your existing digital systems running, improving and growing — with ongoing technical support, maintenance and dedicated engineering capacity.
          </p>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal variant="fadeUp" delay={0.18}>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <InteractiveButton
              variant="primary"
              size="md"
              glow={true}
              onClick={onScrollToPlans}
              className="w-full sm:w-auto"
            >
              <span>Compare Retainer Plans</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </InteractiveButton>

            <InteractiveButton
              variant="outline"
              size="md"
              onClick={() => onOpenScheduleModal('Monthly Technology Partnership')}
              className="w-full sm:w-auto"
            >
              <PhoneCall className="w-4 h-4 text-[#3B4FD9]" />
              <span>Talk to Our Team</span>
            </InteractiveButton>
          </div>
        </ScrollReveal>

        {/* Trust Line */}
        <ScrollReveal variant="fadeUp" delay={0.24}>
          <div className="pt-2 sm:pt-3 flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-[#5B5876] font-medium flex-wrap">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3B4FD9]" />
              <span>Transparent monthly plans</span>
            </span>
            <span className="text-[#EDEAFB]">•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3B4FD9]" />
              <span>Agreed capacity</span>
            </span>
            <span className="text-[#EDEAFB]">•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3B4FD9]" />
              <span>Zero hiring overhead</span>
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
