import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
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
import { pageTransition } from '../utils/motion';
import { FlowingHeading } from '../components/common/FlowingHeading';
import { ModernCard } from '../components/common/ModernCard';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { InteractiveButton } from '../components/common/InteractiveButton';
import { ProcessTimeline } from '../components/common/ProcessTimeline';

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
    icon: <Compass className="w-5 h-5 text-[#3B4FD9]" />,
    align: 'left',
  },
  {
    number: '02',
    title: 'Product & UX Design',
    desc: 'Turn requirements into clear user experiences and scalable product architecture.',
    keyPoints: ['User flows', 'UI/UX design', 'Product architecture'],
    icon: <Palette className="w-5 h-5 text-[#2A3FA8]" />,
    align: 'right',
  },
  {
    number: '03',
    title: 'Development',
    desc: 'Build the product with clean, scalable and production-ready engineering.',
    keyPoints: ['Frontend & backend', 'APIs & integrations', 'Database architecture'],
    icon: <Code2 className="w-5 h-5 text-[#4D6BFF]" />,
    align: 'left',
  },
  {
    number: '04',
    title: 'AI & Automation',
    desc: 'Add intelligent systems and automation where they create measurable value.',
    keyPoints: ['AI integration', 'RAG & agents', 'Workflow automation'],
    icon: <Bot className="w-5 h-5 text-[#5B4FE0]" />,
    align: 'right',
  },
  {
    number: '05',
    title: 'Testing & Security',
    desc: 'Validate performance, reliability, security and usability before release.',
    keyPoints: ['Functional testing', 'Performance testing', 'Security checks'],
    icon: <ShieldCheck className="w-5 h-5 text-[#7B5CE8]" />,
    align: 'left',
  },
  {
    number: '06',
    title: 'Launch & Deployment',
    desc: 'Move from development to production with reliable deployment and monitoring.',
    keyPoints: ['Cloud deployment', 'CI/CD', 'Monitoring'],
    icon: <Rocket className="w-5 h-5 text-[#141B5C]" />,
    align: 'right',
  },
  {
    number: '07',
    title: 'Continuous Growth',
    desc: 'Keep improving the product after launch through feedback, optimization and new capabilities.',
    keyPoints: ['Product improvements', 'Performance optimization', 'Ongoing support'],
    icon: <RefreshCw className="w-5 h-5 text-[#3B4FD9]" />,
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-12 sm:space-y-16 md:space-y-24 pb-16 sm:pb-24 overflow-x-hidden bg-[#F6F5FC]"
    >
      {/* 1. HERO SECTION */}
      <section className="pt-8 sm:pt-14 pb-2 sm:pb-4 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-3.5 sm:space-y-4 relative z-10">
          <ScrollReveal variant="fadeScale">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HOW WE WORK</span>
            </div>
          </ScrollReveal>

          <FlowingHeading
            as="h1"
            text="From Idea to Production, Step by Step."
            highlightWords={['Step', 'by', 'Step.']}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
          />

          <ScrollReveal variant="fadeUp" delay={0.12}>
            <p className="text-sm sm:text-base md:text-lg text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
              A clear, collaborative process designed to turn business goals into reliable digital products — from the first conversation to long-term growth.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. CONTINUOUS 3D INFOGRAPHIC ROADMAP TIMELINE */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto relative">
        <ProcessTimeline steps={PROCESS_STEPS} />
      </section>

      {/* 3. BOTTOM TRUST STRIP */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ModernCard variant="white" className="p-6 sm:p-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>BUILT FOR CLARITY AT EVERY STAGE</span>
          </div>

          <p className="text-xs sm:text-sm text-[#151235] font-semibold max-w-2xl mx-auto">
            We eliminate typical engineering ambiguity through structured milestones and open communication.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
            {TRUST_ELEMENTS.map((el) => (
              <span
                key={el}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F6F5FC] border border-[#EDEAFB] text-xs font-bold text-[#151235]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3B4FD9]" />
                <span>{el}</span>
              </span>
            ))}
          </div>
        </ModernCard>
      </section>

      {/* 4. FINAL CTA BANNER */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal variant="fadeScale">
          <div className="relative bg-gradient-to-br from-[#0A0E2A] via-[#141B5C] to-[#2A3FA8] border border-[#3B4FD9]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-9 text-white text-center shadow-soft-lg overflow-hidden">
            {/* Background Decorative Tech Dots Mesh */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B4FD9_1px,transparent_1px)] [background-size:16px_16px]" />
            {/* Ambient Royal Blue Glow */}
            <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-[#3B4FD9]/20 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#7B5CE8]/15 blur-[80px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
                Ready to Build <span className="text-[#7DE8FF]">What’s Next?</span>
              </h2>

              <p className="text-[#B8BEDC] text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                Tell us what you're building. We'll help you turn the idea into a clear, practical technical plan.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
                <InteractiveButton
                  variant="primary"
                  glow={true}
                  onClick={() => onOpenScheduleModal('Process & Architecture Inquiry')}
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </InteractiveButton>

                <InteractiveButton
                  variant="ghost"
                  onClick={() => onNavigate('/contact')}
                  className="text-white border border-white/20 bg-white/10 hover:bg-white/20"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#7DE8FF]" />
                  <span>Talk to Our Team</span>
                </InteractiveButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </motion.div>
  );
};
