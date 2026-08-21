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
    icon: <Compass className="w-5 h-5 text-[#FF5A1F]" />,
  },
  {
    phase: 'Phase 02',
    number: '02',
    title: 'Plan & Design',
    subline: 'Turn requirements into a clear plan.',
    description:
      'We define the product scope, user experience, technical architecture and development roadmap.',
    icon: <Palette className="w-5 h-5 text-blue-500" />,
  },
  {
    phase: 'Phase 03',
    number: '03',
    title: 'Build',
    subline: 'Develop with continuous feedback.',
    description:
      'Our team builds the product in focused iterations while keeping you updated throughout development.',
    icon: <Code2 className="w-5 h-5 text-purple-500" />,
  },
  {
    phase: 'Phase 04',
    number: '04',
    title: 'Test & Refine',
    subline: 'Make it reliable before launch.',
    description:
      'We test functionality, usability, performance and security, then refine the product based on feedback.',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
  },
  {
    phase: 'Phase 05',
    number: '05',
    title: 'Launch & Support',
    subline: 'Go live and keep improving.',
    description:
      'We deploy your product and can continue supporting, maintaining and improving it as your needs evolve.',
    icon: <Rocket className="w-5 h-5 text-amber-500" />,
  },
];

export const ProcessPreview: React.FC<ProcessPreviewProps> = ({ onNavigate }) => {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
            From Idea to Production, <br />
            <span className="text-[#FF5A1F]">Step by Step.</span>
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-[#6B6660] max-w-2xl mx-auto leading-relaxed">
            A clear and collaborative process keeps your project focused, transparent and moving forward.
          </p>
        </motion.div>

        {/* Desktop Connected Horizontal Flow (5 Cards) */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-3.5 relative">
          {PROCESS_DATA.map((step, idx) => (
            <div key={step.number} className="relative flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.08,
                  ease: 'easeOut',
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl p-5 border border-[#EDE9E4] hover:border-[#FF5A1F]/30 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex-1 flex flex-col justify-between text-left group relative z-10"
              >
                <div>
                  {/* Top: Icon + Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] flex items-center justify-center group-hover:bg-white group-hover:border-[#FF5A1F]/25 transition-colors shadow-xs">
                      {step.icon}
                    </div>
                    <span className="text-xl font-extrabold text-gray-300 group-hover:text-[#FF5A1F] transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Phase Label */}
                  <div className="text-[10px] font-extrabold text-[#FF5A1F] uppercase tracking-wider mb-1">
                    {step.phase}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-[#111111] group-hover:text-[#FF5A1F] transition-colors leading-snug mb-1">
                    {step.title}
                  </h3>

                  {/* Italic Sub-line */}
                  <div className="text-xs text-[#111111] font-semibold italic mb-2">
                    {step.subline}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#6B6660] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {/* Connecting Arrow between desktop cards */}
              {idx < PROCESS_DATA.length - 1 && (
                <div className="hidden xl:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-white border border-[#EDE9E4] items-center justify-center text-gray-400 shadow-xs pointer-events-none">
                  <ArrowRight className="w-3 h-3 text-[#FF5A1F]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile / Tablet Vertical Stacked Timeline */}
        <div className="lg:hidden space-y-4 relative">
          {/* Subtle Vertical Connector Line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#FF5A1F]/40 via-[#EDE9E4] to-[#FF5A1F]/40 pointer-events-none -z-0" />

          {PROCESS_DATA.map((step, idx) => (
            <div key={step.number} className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06,
                  ease: 'easeOut',
                }}
                className="bg-white rounded-2xl p-5 border border-[#EDE9E4] shadow-soft text-left ml-0 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] flex items-center justify-center shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                        {step.phase}
                      </div>
                      <h3 className="text-base font-extrabold text-[#111111]">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xl font-extrabold text-gray-300">
                    {step.number}
                  </span>
                </div>

                <div className="text-xs text-[#111111] font-semibold italic mb-1.5">
                  {step.subline}
                </div>

                <p className="text-xs text-[#6B6660] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Vertical connector down-arrow between mobile steps */}
              {idx < PROCESS_DATA.length - 1 && (
                <div className="flex justify-center my-1.5 text-[#FF5A1F]">
                  <ArrowDown className="w-3.5 h-3.5 opacity-60" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Small Trust Message Below the 5 Steps */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="pt-6 sm:pt-8 border-t border-[#EDE9E4] text-center space-y-1.5"
        >
          <div className="text-[11px] sm:text-xs font-bold text-[#111111] uppercase tracking-wider">
            Clear at every stage.
          </div>
          <p className="text-xs sm:text-sm text-[#6B6660] font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>Defined Scope</span>
            <span className="text-[#FF5A1F] font-bold">·</span>
            <span>Regular Updates</span>
            <span className="text-[#FF5A1F] font-bold">·</span>
            <span>Milestone Reviews</span>
            <span className="text-[#FF5A1F] font-bold">·</span>
            <span>Transparent Communication</span>
          </p>
        </motion.div>

        {/* Bottom Link to Full Process Page */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="text-center pt-1"
        >
          <button
            onClick={() => onNavigate('/company/process')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#111111] hover:text-[#FF5A1F] px-6 py-3 rounded-full bg-white border border-[#EDE9E4] shadow-xs hover:shadow transition-all group"
          >
            <span>Learn More About Our Process</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
