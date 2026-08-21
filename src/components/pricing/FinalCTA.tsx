import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

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
      <div className="relative bg-[#111111] border border-[#2A2A2A] rounded-2xl sm:rounded-3xl p-7 sm:p-12 text-white text-center shadow-soft-lg overflow-hidden space-y-5 sm:space-y-6">
        {/* Ambient Warm Glows */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#FF5A1F]/15 blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#FF5A1F]/10 blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Already Have a Digital Product? <br />
            <span className="text-[#FF5A1F]">Let's Make It Better.</span>
          </h2>

          <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Tell us what you already have, what is not working and what you want to improve. We'll recommend the right level of technical support.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <button
              onClick={onScrollToPlans}
              className="w-full sm:w-auto bg-[#FF5A1F] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold hover:bg-[#e04c15] hover:shadow-[0_8px_24px_rgba(255,90,31,0.35)] transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-md cursor-pointer"
            >
              <span>Find My Plan</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onOpenScheduleModal('Existing Digital Product Consultation')}
              className="w-full sm:w-auto bg-white/5 text-white border border-white/20 hover:bg-white/10 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-2xs cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#FF5A1F]" />
              <span>Talk to Our Team</span>
            </button>
          </div>

          <p className="text-gray-400 text-[11px] sm:text-xs pt-2">
            No pressure. No unnecessary sales pitch. Just a clear conversation about what your systems need.
          </p>
        </div>
      </div>
    </section>
  );
};
