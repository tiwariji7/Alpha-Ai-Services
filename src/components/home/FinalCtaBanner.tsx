import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';

interface FinalCtaBannerProps {
  onNavigate: (path: string) => void;
  onOpenScheduleModal?: (topic?: string) => void;
}

export const FinalCtaBanner: React.FC<FinalCtaBannerProps> = ({
  onNavigate,
  onOpenScheduleModal,
}) => {
  return (
    <section className="py-6 sm:py-8 md:py-10 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative bg-gradient-to-br from-[#1E130D] via-[#150D09] to-[#0E0805] border border-[#3A1F13] rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 lg:p-9 text-white text-center shadow-soft-lg overflow-hidden group"
        >
          {/* Ambient Warm Glow Highlights */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FF5A1F]/15 blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#FF5A1F]/10 blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

          {/* Abstract Subtle Tech Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3A1F1315_1px,transparent_1px),linear-gradient(to_bottom,#3A1F1315_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
            {/* Small Badge Label */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 text-[#FF5A1F] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>Let's Build Something Great</span>
              </div>
            </div>

            {/* Compact Heading + Accent Line */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold tracking-tight leading-tight text-white">
              Have an idea worth building? <br className="hidden sm:inline" />
              <span className="text-[#FF5A1F]">Let's turn it into reality.</span>
            </h2>

            {/* Concise Supporting Text */}
            <p className="text-gray-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Tell us what you're trying to build, where you're stuck, or what you'd like to improve. We'll understand your requirements and discuss the right technical path forward.
            </p>

            {/* Reassurance Line */}
            <p className="text-[10.5px] sm:text-xs text-gray-400 font-medium">
              No complicated process. 24-hour response guarantee.
            </p>

            {/* CTA Buttons */}
            <div className="pt-1.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 max-w-sm sm:max-w-none mx-auto">
              <button
                onClick={() => {
                  if (onOpenScheduleModal) {
                    onOpenScheduleModal('New Project Inquiry');
                  } else {
                    onNavigate('/contact');
                  }
                }}
                className="bg-[#FF5A1F] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold hover:bg-[#e04c15] hover:shadow-[0_6px_20px_rgba(255,90,31,0.35)] transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-md"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule a Discovery Call</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('/portfolio')}
                className="bg-white/5 text-white border border-white/20 hover:bg-white/10 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-xs"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Bottom Trust Line */}
            <div className="pt-3 sm:pt-3.5 border-t border-[#3A1F13]/80 mt-2 text-[10.5px] sm:text-[11px] text-gray-400 font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span>Direct Senior Collaboration</span>
              <span className="text-[#FF5A1F] font-bold">·</span>
              <span>Production-Grade Quality</span>
              <span className="text-[#FF5A1F] font-bold">·</span>
              <span>Long-Term Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
