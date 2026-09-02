import React from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  ArrowRight,
  ArrowDown,
} from 'lucide-react';
import { FlowingHeading } from '../common/FlowingHeading';
import { ModernCard } from '../common/ModernCard';
import { ScrollReveal } from '../common/ScrollReveal';

interface ProcessPreviewProps {
  onNavigate: (path: string) => void;
}

interface StepData {
  phase: string;
  number: string;
  title: string;
  subline: string;
  description: string;
  icon: React.ReactNode;
}

const PROCESS_DATA: StepData[] = [
  {
    phase: 'Phase 01',
    number: '01',
    title: 'Discover',
    subline: 'Understand before we build.',
    description:
      'We learn about your goals, users, requirements and technical challenges to define what needs to be built.',
    icon: <Compass className="w-5 h-5 text-[#3B4FD9]" />,
  },
  {
    phase: 'Phase 02',
    number: '02',
    title: 'Plan & Design',
    subline: 'Turn requirements into a clear plan.',
    description:
      'We define the product scope, user experience, technical architecture and development roadmap.',
    icon: <Palette className="w-5 h-5 text-[#2A3FA8]" />,
  },
  {
    phase: 'Phase 03',
    number: '03',
    title: 'Build',
    subline: 'Develop with continuous feedback.',
    description:
      'Our team builds the product in focused iterations while keeping you updated throughout development.',
    icon: <Code2 className="w-5 h-5 text-[#4D6BFF]" />,
  },
  {
    phase: 'Phase 04',
    number: '04',
    title: 'Test & Refine',
    subline: 'Make it reliable before launch.',
    description:
      'We test functionality, usability, performance and security, then refine the product based on feedback.',
    icon: <ShieldCheck className="w-5 h-5 text-[#5B4FE0]" />,
  },
  {
    phase: 'Phase 05',
    number: '05',
    title: 'Launch & Support',
    subline: 'Go live and keep improving.',
    description:
      'We deploy your product and can continue supporting, maintaining and improving it as your needs evolve.',
    icon: <Rocket className="w-5 h-5 text-[#7B5CE8]" />,
  },
];

export const ProcessPreview: React.FC<ProcessPreviewProps> = ({ onNavigate }) => {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <FlowingHeading
            as="h2"
            text="From Idea to Production, Step by Step."
            highlightWords={['Step', 'by', 'Step.']}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
          />
          <ScrollReveal variant="fadeUp" delay={0.08}>
            <p className="text-xs sm:text-base md:text-lg text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
              A clear and collaborative process keeps your project focused, transparent and moving forward.
            </p>
          </ScrollReveal>
        </div>

        {/* Desktop Connected Horizontal Flow (5 Modern Cards) */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-3.5 relative">
          {PROCESS_DATA.map((step, idx) => (
            <div key={step.number} className="relative flex flex-col">
              <ModernCard
                variant="white"
                delay={idx * 0.08}
                className="p-5 flex-1 flex flex-col justify-between text-left"
              >
                <div>
                  {/* Top: Icon + Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#EDEAFB] border border-[#7B5CE8]/20 flex items-center justify-center group-hover:bg-white group-hover:border-[#3B4FD9]/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xs">
                      {step.icon}
                    </div>
                    <span className="text-xl font-black text-[#EDEAFB] group-hover:text-[#3B4FD9] transition-colors font-mono">
                      {step.number}
                    </span>
                  </div>

                  {/* Phase Label */}
                  <div className="text-[10px] font-extrabold text-[#3B4FD9] uppercase tracking-wider mb-1 font-mono">
                    {step.phase}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-[#151235] group-hover:text-[#3B4FD9] transition-colors leading-snug mb-1">
                    {step.title}
                  </h3>

                  {/* Italic Sub-line */}
                  <div className="text-xs text-[#151235] font-semibold italic mb-2">
                    {step.subline}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#5B5876] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ModernCard>

              {/* Connecting Arrow between desktop cards */}
              {idx < PROCESS_DATA.length - 1 && (
                <div className="hidden xl:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-white border border-[#EDEAFB] items-center justify-center text-gray-400 shadow-xs pointer-events-none">
                  <ArrowRight className="w-3 h-3 text-[#3B4FD9]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile / Tablet Vertical Stacked Timeline */}
        <div className="lg:hidden space-y-4 relative">
          {/* Subtle Vertical Connector Line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#3B4FD9]/40 via-[#EDEAFB] to-[#3B4FD9]/40 pointer-events-none -z-0" />

          {PROCESS_DATA.map((step, idx) => (
            <div key={step.number} className="relative z-10">
              <ModernCard
                variant="white"
                delay={idx * 0.05}
                className="p-5 text-left flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EDEAFB] border border-[#7B5CE8]/20 flex items-center justify-center shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold text-[#3B4FD9] uppercase tracking-wider font-mono">
                        {step.phase}
                      </div>
                      <h3 className="text-base font-extrabold text-[#151235]">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xl font-black text-[#EDEAFB] font-mono">
                    {step.number}
                  </span>
                </div>

                <div className="text-xs text-[#151235] font-semibold italic mb-1.5">
                  {step.subline}
                </div>

                <p className="text-xs text-[#5B5876] leading-relaxed">
                  {step.description}
                </p>
              </ModernCard>

              {/* Vertical connector down-arrow between mobile steps */}
              {idx < PROCESS_DATA.length - 1 && (
                <div className="flex justify-center my-1.5 text-[#3B4FD9]">
                  <ArrowDown className="w-3.5 h-3.5 opacity-60" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Small Trust Message Below the 5 Steps */}
        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="pt-6 sm:pt-8 border-t border-[#EDEAFB] text-center space-y-1.5">
            <div className="text-[11px] sm:text-xs font-bold text-[#151235] uppercase tracking-wider">
              Clear at every stage.
            </div>
            <p className="text-xs sm:text-sm text-[#5B5876] font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span>Defined Scope</span>
              <span className="text-[#3B4FD9] font-bold">·</span>
              <span>Regular Updates</span>
              <span className="text-[#3B4FD9] font-bold">·</span>
              <span>Milestone Reviews</span>
              <span className="text-[#3B4FD9] font-bold">·</span>
              <span>Transparent Communication</span>
            </p>
          </div>
        </ScrollReveal>

        {/* Bottom Link to Full Process Page */}
        <ScrollReveal variant="fadeUp" delay={0.25}>
          <div className="text-center pt-1">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('/company/process')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#151235] hover:text-[#3B4FD9] px-6 py-3 rounded-full bg-white border border-[#EDEAFB] shadow-xs hover:shadow-soft transition-all group cursor-pointer"
            >
              <span>Learn More About Our Process</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
