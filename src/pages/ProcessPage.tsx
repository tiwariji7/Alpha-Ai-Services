import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import {
  Compass,
  Palette,
  Code2,
  Bot,
  ShieldCheck,
  Rocket,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { fadeUp, pageTransition } from '../utils/motion';

interface ProcessPageProps {
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}

interface ProcessStep {
  number: string;
  title: string;
  desc: string;
  keyPoints: string[];
  icon: React.ReactNode;
  align: 'left' | 'right';
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    desc: 'Understand the business, users, goals and technical requirements before we build.',
    keyPoints: ['Business & user discovery', 'Requirements', 'Technical direction'],
    icon: <Compass className="w-5 h-5 text-[#FF5A1F]" />,
    align: 'left',
  },
  {
    number: '02',
    title: 'Product & UX Design',
    desc: 'Turn requirements into clear user experiences and scalable product architecture.',
    keyPoints: ['User flows', 'UI/UX design', 'Product architecture'],
    icon: <Palette className="w-5 h-5 text-[#FF5A1F]" />,
    align: 'right',
  },
  {
    number: '03',
    title: 'Development',
    desc: 'Build the product with clean, scalable and production-ready engineering.',
    keyPoints: ['Frontend & backend', 'APIs & integrations', 'Database architecture'],
    icon: <Code2 className="w-5 h-5 text-[#FF5A1F]" />,
    align: 'left',
  },
  {
    number: '04',
    title: 'AI & Automation',
    desc: 'Add intelligent systems and automation where they create measurable value.',
    keyPoints: ['AI integration', 'RAG & agents', 'Workflow automation'],
    icon: <Bot className="w-5 h-5 text-[#FF5A1F]" />,
    align: 'right',
  },
  {
    number: '05',
    title: 'Testing & Security',
    desc: 'Validate performance, reliability, security and usability before release.',
    keyPoints: ['Functional testing', 'Performance testing', 'Security checks'],
    icon: <ShieldCheck className="w-5 h-5 text-[#FF5A1F]" />,
    align: 'left',
  },
  {
    number: '06',
    title: 'Launch & Deployment',
    desc: 'Move from development to production with reliable deployment and monitoring.',
    keyPoints: ['Cloud deployment', 'CI/CD', 'Monitoring'],
    icon: <Rocket className="w-5 h-5 text-[#FF5A1F]" />,
    align: 'right',
  },
  {
    number: '07',
    title: 'Continuous Growth',
    desc: 'Keep improving the product after launch through feedback, optimization and new capabilities.',
    keyPoints: ['Product improvements', 'Performance optimization', 'Ongoing support'],
    icon: <RefreshCw className="w-5 h-5 text-[#FF5A1F]" />,
    align: 'left',
  },
];

const TRUST_ELEMENTS = [
  'Clear Scope',
  'Regular Updates',
  'Milestone Reviews',
  'Transparent Communication',
  'Quality Assurance',
  'Long-Term Support',
];

export const ProcessPage: React.FC<ProcessPageProps> = ({
  onNavigate,
  onOpenScheduleModal,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll Progress Tracker for the Continuous Roadmap Infographic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-12 sm:space-y-16 md:space-y-24 pb-16 sm:pb-24 overflow-x-hidden bg-[#FAF8F6]"
    >
      {/* 1. HERO SECTION (Compact, spacious, focused) */}
      <section className="pt-8 sm:pt-14 pb-2 sm:pb-4 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#FF5A1F]/6 via-[#FF7A45]/3 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto text-center space-y-3.5 sm:space-y-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>HOW WE WORK</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight"
          >
            From Idea to Production, <br />
            <span className="text-[#FF5A1F]">Step by Step.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="text-sm sm:text-base md:text-lg text-[#6B6660] max-w-2xl mx-auto leading-relaxed"
          >
            A clear, collaborative process designed to turn business goals into reliable digital products — from the first conversation to long-term growth.
          </motion.p>
        </div>
      </section>

      {/* 2. CONTINUOUS INFOGRAPHIC ROADMAP (Visual Centerpiece) */}
      <section
        ref={containerRef}
        className="px-4 sm:px-6 max-w-6xl mx-auto relative"
      >
        {/* DESKTOP & TABLET: Continuous Curved Zig-Zag Roadmap (≥ 768px) */}
        <div className="hidden md:block relative py-8">
          {/* Continuous SVG Curved Connecting Track */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none -z-0 overflow-visible"
            viewBox="0 0 1000 1750"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Background Track Path */}
            <path
              d="
                M 500 40
                L 260 40
                C 140 40, 140 280, 260 280
                L 740 280
                C 860 280, 860 520, 740 520
                L 260 520
                C 140 520, 140 760, 260 760
                L 740 760
                C 860 760, 860 1000, 740 1000
                L 260 1000
                C 140 1000, 140 1240, 260 1240
                L 740 1240
                C 860 1240, 860 1480, 740 1480
                L 500 1480
                L 500 1680
              "
              stroke="#EDE9E4"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Glowing Interactive Progress Overlay Path */}
            <motion.path
              d="
                M 500 40
                L 260 40
                C 140 40, 140 280, 260 280
                L 740 280
                C 860 280, 860 520, 740 520
                L 260 520
                C 140 520, 140 760, 260 760
                L 740 760
                C 860 760, 860 1000, 740 1000
                L 260 1000
                C 140 1000, 140 1240, 260 1240
                L 740 1240
                C 860 1240, 860 1480, 740 1480
                L 500 1480
                L 500 1680
              "
              stroke="url(#roadmap-gradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                pathLength: prefersReducedMotion ? 1 : pathLength,
              }}
            />

            {/* Gradient Definition */}
            <defs>
              <linearGradient
                id="roadmap-gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FF5A1F" />
                <stop offset="50%" stopColor="#FF7A45" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>

          {/* 7 Staggered Alternating Step Cards */}
          <div className="space-y-16 lg:space-y-20 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const isLeft = step.align === 'left';

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
                  className={`grid grid-cols-12 items-center gap-6 ${
                    isLeft ? '' : 'flex-row-reverse'
                  }`}
                >
                  {/* Left Column Card (if align: 'left') */}
                  <div
                    className={`col-span-12 md:col-span-6 ${
                      isLeft ? 'md:col-start-1 md:pr-4' : 'md:col-start-7 md:pl-4'
                    }`}
                  >
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#EDE9E4] hover:border-[#FF5A1F]/40 shadow-soft hover:shadow-soft-lg transition-all duration-300 group text-left relative">
                      {/* Top Header: Phase number & Icon */}
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] flex items-center justify-center group-hover:scale-105 group-hover:border-[#FF5A1F]/30 transition-transform shadow-2xs">
                            {step.icon}
                          </div>
                          <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF5A1F]">
                            Phase {step.number}
                          </span>
                        </div>
                        <span className="text-xl font-mono font-black text-[#EDE9E4] group-hover:text-[#FF5A1F]/60 transition-colors">
                          {step.number}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#111111] group-hover:text-[#FF5A1F] transition-colors leading-snug mb-1.5">
                        {step.title}
                      </h3>

                      {/* 1-2 Line Description */}
                      <p className="text-xs sm:text-sm text-[#6B6660] leading-relaxed mb-4">
                        {step.desc}
                      </p>

                      {/* 3 Key Points */}
                      <div className="pt-3 border-t border-[#EDE9E4]/70 space-y-1.5">
                        {step.keyPoints.map((point, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs font-semibold text-[#111111]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer Column on the opposite side to preserve zig-zag geometry */}
                  <div
                    className={`hidden md:block col-span-6 ${
                      isLeft ? 'col-start-7' : 'col-start-1'
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* MOBILE: Clean Connected Vertical Roadmap (< 768px) */}
        <div className="md:hidden space-y-4 relative text-left py-4">
          {/* Continuous Left Vertical Connecting Track */}
          <div className="absolute left-5 top-6 bottom-6 w-1 bg-gradient-to-b from-[#FF5A1F] via-[#FF7A45] to-[#F59E0B] rounded-full pointer-events-none" />

          {PROCESS_STEPS.map((step) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative pl-12"
            >
              {/* Milestone Indicator Node */}
              <div className="absolute left-2.5 top-6 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-3 border-[#FF5A1F] shadow-xs flex items-center justify-center z-10">
                <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
              </div>

              {/* Compact Step Card */}
              <div className="bg-white rounded-2xl p-5 border border-[#EDE9E4] shadow-soft space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F6] border border-[#EDE9E4] flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF5A1F] block">
                        Phase {step.number}
                      </span>
                      <h3 className="text-base font-extrabold text-[#111111]">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-sm font-mono font-black text-gray-400">
                    {step.number}
                  </span>
                </div>

                <p className="text-xs text-[#6B6660] leading-relaxed">
                  {step.desc}
                </p>

                <div className="pt-2.5 border-t border-[#EDE9E4]/60 space-y-1">
                  {step.keyPoints.map((point, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-[11px] font-semibold text-[#111111]"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#FF5A1F] shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. BOTTOM TRUST STRIP ("BUILT FOR CLARITY AT EVERY STAGE") */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-xs text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>BUILT FOR CLARITY AT EVERY STAGE</span>
          </div>

          <p className="text-xs sm:text-sm text-[#111111] font-semibold max-w-2xl mx-auto">
            We eliminate typical engineering ambiguity through structured milestones and open communication.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
            {TRUST_ELEMENTS.map((el) => (
              <span
                key={el}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F6] border border-[#EDE9E4] text-xs font-bold text-[#111111]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A1F]" />
                <span>{el}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA BANNER */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="relative bg-[#111111] border border-[#2A2A2A] rounded-2xl sm:rounded-3xl p-6 sm:p-9 text-white text-center shadow-soft-lg overflow-hidden">
          {/* Ambient Warm Glow */}
          <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-[#FF5A1F]/15 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#FF5A1F]/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Ready to Build <span className="text-[#FF5A1F]">What’s Next?</span>
            </h2>

            <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Tell us what you're building. We'll help you turn the idea into a clear, practical technical plan.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
              <button
                onClick={() => onOpenScheduleModal('Process & Architecture Inquiry')}
                className="bg-[#FF5A1F] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold hover:bg-[#e04c15] hover:shadow-[0_6px_20px_rgba(255,90,31,0.35)] transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-md cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('/contact')}
                className="bg-white/5 text-white border border-white/20 hover:bg-white/10 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#FF5A1F]" />
                <span>Talk to Our Team</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
