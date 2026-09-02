import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { FlowingHeading } from '../common/FlowingHeading';
import { ScrollReveal } from '../common/ScrollReveal';
import { InteractiveButton } from '../common/InteractiveButton';

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
        <ScrollReveal variant="fadeScale">
          <div className="relative bg-gradient-to-br from-[#0A0E2A] via-[#141B5C] to-[#2A3FA8] border border-[#3B4FD9]/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 lg:p-9 text-white text-center shadow-soft-lg overflow-hidden group">
            {/* Ambient Royal Blue Glow Highlights */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#3B4FD9]/25 blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7B5CE8]/20 blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

            {/* Background Decorative Tech Dots Mesh */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B4FD9_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-2.5 sm:space-y-3">
              {/* Small Badge Label */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1442] border border-[#3B4FD9]/40 text-[#7DE8FF] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#7DE8FF]" />
                  <span>Let's Build Something Great</span>
                </div>
              </div>

              {/* Compact Heading + Accent Line */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold tracking-tight leading-tight text-white">
                Have an idea worth building? <br className="hidden sm:inline" />
                <span className="text-[#7DE8FF]">Let's turn it into reality.</span>
              </h2>

              {/* Concise Supporting Text */}
              <p className="text-[#B8BEDC] text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                Tell us what you're trying to build, where you're stuck, or what you'd like to improve. We'll understand your requirements and discuss the right technical path forward.
              </p>

              {/* Reassurance Line */}
              <p className="text-[10.5px] sm:text-xs text-[#B8BEDC]/80 font-medium">
                No complicated process. 24-hour response guarantee.
              </p>

              {/* CTA Buttons */}
              <div className="pt-1.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 max-w-sm sm:max-w-none mx-auto">
                <InteractiveButton
                  variant="primary"
                  glow={true}
                  onClick={() => {
                    if (onOpenScheduleModal) {
                      onOpenScheduleModal('New Project Inquiry');
                    } else {
                      onNavigate('/contact');
                    }
                  }}
                  className="w-full sm:w-auto"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule a Discovery Call</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </InteractiveButton>

                <InteractiveButton
                  variant="ghost"
                  onClick={() => onNavigate('/portfolio')}
                  className="w-full sm:w-auto text-white border border-white/20 bg-white/10 hover:bg-white/20"
                >
                  <span>Explore Our Work</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </InteractiveButton>
              </div>

              {/* Bottom Trust Line */}
              <div className="pt-3 sm:pt-3.5 border-t border-[#141B5C] mt-2 text-[10.5px] sm:text-[11px] text-[#B8BEDC] font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <span>Direct Senior Collaboration</span>
                <span className="text-[#7DE8FF] font-bold">·</span>
                <span>Production-Grade Quality</span>
                <span className="text-[#7DE8FF] font-bold">·</span>
                <span>Long-Term Support</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
