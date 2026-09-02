import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import { FlowingHeading } from '../common/FlowingHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { InteractiveButton } from '../common/InteractiveButton';

interface FinalCTAProps {
  onScrollToPlans: () => void;
  onOpenScheduleModal: (topic?: string) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onScrollToPlans,
  onOpenScheduleModal,
}) => {
  return (
    <section className="px-4 sm:px-6 max-w-5xl mx-auto">
      <ScrollReveal variant="fadeScale">
        <div className="relative bg-gradient-to-br from-[#0A0E2A] via-[#141B5C] to-[#2A3FA8] border border-[#3B4FD9]/30 rounded-2xl sm:rounded-3xl p-7 sm:p-12 text-white text-center shadow-soft-lg overflow-hidden space-y-5 sm:space-y-6">
          {/* Background Decorative Tech Dots Mesh */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B4FD9_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Ambient Royal Blue Glows */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#3B4FD9]/20 blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#7B5CE8]/15 blur-[90px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Already Have a Digital Product? <br />
              <span className="text-[#7DE8FF]">Let's Make It Better.</span>
            </h2>

            <p className="text-[#B8BEDC] text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Tell us what you already have, what is not working and what you want to improve. We'll recommend the right level of technical support.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
              <InteractiveButton
                variant="primary"
                glow={true}
                onClick={onScrollToPlans}
                className="w-full sm:w-auto"
              >
                <span>Find My Plan</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </InteractiveButton>

              <InteractiveButton
                variant="ghost"
                onClick={() => onOpenScheduleModal('Existing Digital Product Consultation')}
                className="w-full sm:w-auto text-white border border-white/20 bg-white/10 hover:bg-white/20"
              >
                <PhoneCall className="w-4 h-4 text-[#7DE8FF]" />
                <span>Talk to Our Team</span>
              </InteractiveButton>
            </div>

            <p className="text-[#B8BEDC] text-[11px] sm:text-xs pt-2">
              No pressure. No unnecessary sales pitch. Just a clear conversation about what your systems need.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
