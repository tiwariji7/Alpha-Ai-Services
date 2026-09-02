import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Users,
  Target,
  Layers,
  HeartHandshake,
  CheckCircle2,
  MessageSquare,
  Terminal,
  Cpu,
} from 'lucide-react';
import {
  fadeUp,
  pageTransition,
} from '../utils/motion';
import { FlowingHeading } from '../components/common/FlowingHeading';
import { ModernCard } from '../components/common/ModernCard';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { InteractiveButton } from '../components/common/InteractiveButton';
import { PageHeroAmbient } from '../components/common/PageHeroAmbient';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}

const CORE_VALUES = [
  {
    number: '01',
    title: 'Product Thinking First',
    desc: 'We do not just write code — we understand your business model, target users and operational goals before building.',
    icon: <Target className="w-5 h-5 text-[#3B4FD9]" />,
  },
  {
    number: '02',
    title: 'Direct Collaboration',
    desc: 'You communicate directly with the engineers and designers building your product — no middle management bottlenecks.',
    icon: <Users className="w-5 h-5 text-[#2A3FA8]" />,
  },
  {
    number: '03',
    title: 'Clean, Maintainable Code',
    desc: 'We write modular, well-tested and documented software that your team can comfortably own, extend and scale long-term.',
    icon: <Code2 className="w-5 h-5 text-[#4D6BFF]" />,
  },
  {
    number: '04',
    title: 'Long-Term Partnership',
    desc: 'We stay invested in your success beyond launch day, providing maintenance, optimization and feature enhancements.',
    icon: <HeartHandshake className="w-5 h-5 text-[#5B4FE0]" />,
  },
];

const WORKING_MODELS = [
  {
    title: 'Dedicated Project Sprints',
    desc: 'End-to-end product delivery from concept and UX wireframes to full-stack engineering and production deployment.',
    points: ['Defined milestone roadmap', 'Fixed-scope predictability', 'Weekly live staging demos'],
    icon: <Layers className="w-5 h-5 text-[#3B4FD9]" />,
  },
  {
    title: 'Engineering Pod Extension',
    desc: 'Integrate skilled developers directly into your existing team to accelerate roadmap delivery and tackle complex modules.',
    points: ['Direct Git & Slack integration', 'Flexible sprint commitments', 'Immediate technical velocity'],
    icon: <Terminal className="w-5 h-5 text-[#2A3FA8]" />,
  },
  {
    title: 'AI & Technical Advisory',
    desc: 'Practical consultation on AI feasibility, modern system architecture, technology selection, and migration planning.',
    points: ['Architecture blueprints', 'RAG & AI feasibility review', 'Cost & scale optimization'],
    icon: <Cpu className="w-5 h-5 text-[#5B4FE0]" />,
  },
];

const WORKING_COMMITMENTS = [
  '100% IP & Source Code Ownership from Day 1',
  'Direct Developer Communication via Slack / Teams',
  'Weekly Staging Previews & Progress Demos',
  'Transparent Milestone Reviews & Git Commits',
  'Production-Grade Testing & Quality Assurance',
  'Post-Launch Warranty & Handover Support',
];

export const AboutPage: React.FC<AboutPageProps> = ({
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
      {/* 1. HERO SECTION WITH 3D AMBIENT PARTICLES */}
      <section className="pt-8 sm:pt-14 pb-4 sm:pb-8 px-4 sm:px-6 relative overflow-hidden">
        <PageHeroAmbient theme="page" />

        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 relative z-10">
          {/* Eyebrow */}
          <ScrollReveal variant="fadeScale">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT ALPHA AI SERVICES</span>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <FlowingHeading
            as="h1"
            text="Engineering Software With Purpose and Precision."
            highlightWords={['Purpose', 'and', 'Precision.']}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
          />

          {/* Supporting Narrative */}
          <ScrollReveal variant="fadeUp" delay={0.12}>
            <p className="text-base sm:text-lg md:text-xl text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
              With engineering teams in Pune and Prayagraj, we partner with startups and growing businesses across India to design, build, and deploy reliable digital products, modern web apps, and custom software.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. OUR STORY & PHILOSOPHY */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto">
        <ModernCard variant="white" className="p-6 sm:p-10 lg:p-12 text-left grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <span>WHO WE ARE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151235] tracking-tight leading-tight">
              A studio built around craft, clarity, and genuine accountability.
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#5B5876] leading-relaxed">
              Alpha AI Services was created with a clear objective: to eliminate the common friction, miscommunication, and bloated overhead of traditional agencies.
            </p>

            <p className="text-xs sm:text-sm text-[#5B5876] leading-relaxed">
              We focus on building technology that solves genuine operational problems. By combining modern AI capabilities with time-tested software architecture, we deliver robust web apps, mobile products, and automated workflows that are practical today and scalable tomorrow.
            </p>
          </div>

          <div className="lg:col-span-6 bg-[#F6F5FC] rounded-2xl p-6 sm:p-8 border border-[#EDEAFB] space-y-5">
            <h3 className="text-base sm:text-lg font-extrabold text-[#151235]">
              Our Engineering Standards:
            </h3>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#EDEAFB] text-[#5B4FE0] border border-[#7B5CE8]/30 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <strong className="text-xs sm:text-sm font-bold text-[#151235] block">
                    Zero Bloat, Production-First Mindset
                  </strong>
                  <p className="text-xs text-[#5B5876] leading-relaxed mt-0.5">
                    We only recommend technologies and architectures that truly benefit your specific project requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#EDEAFB] text-[#5B4FE0] border border-[#7B5CE8]/30 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <strong className="text-xs sm:text-sm font-bold text-[#151235] block">
                    Transparent Communication
                  </strong>
                  <p className="text-xs text-[#5B5876] leading-relaxed mt-0.5">
                    Live staging links, transparent Git commits, and regular updates mean you always know where your project stands.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#EDEAFB] text-[#5B4FE0] border border-[#7B5CE8]/30 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <strong className="text-xs sm:text-sm font-bold text-[#151235] block">
                    Complete Client Ownership
                  </strong>
                  <p className="text-xs text-[#5B5876] leading-relaxed mt-0.5">
                    You own 100% of your source code, infrastructure credentials, and intellectual property from day one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ModernCard>
      </section>

      {/* 3. GUIDING PRINCIPLES / CORE VALUES */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
          <ScrollReveal variant="fadeScale">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <span>CORE VALUES</span>
            </div>
          </ScrollReveal>

          <FlowingHeading
            as="h2"
            text="How We Approach Every Project."
            highlightWords={['Every', 'Project.']}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
          />

          <ScrollReveal variant="fadeUp" delay={0.08}>
            <p className="text-xs sm:text-sm md:text-base text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
              These four principles guide every design decision, code commit, and client interaction.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-left">
          {CORE_VALUES.map((val, idx) => (
            <ModernCard
              key={val.number}
              variant="white"
              delay={idx * 0.08}
              className="p-6 sm:p-7 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#EDEAFB] border border-[#7B5CE8]/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-2xs">
                    {val.icon}
                  </div>
                  <span className="text-xs font-mono font-black text-[#5B5876] group-hover:text-[#3B4FD9]">
                    {val.number}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-[#151235] group-hover:text-[#3B4FD9] transition-colors leading-snug">
                  {val.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5B5876] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </ModernCard>
          ))}
        </div>
      </section>

      {/* 4. HOW WE COLLABORATE (Working Models) */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-white border-y border-[#EDEAFB]">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
            <ScrollReveal variant="fadeScale">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <span>ENGAGEMENT MODELS</span>
              </div>
            </ScrollReveal>

            <FlowingHeading
              as="h2"
              text="Flexible Ways to Work Together."
              highlightWords={['Work', 'Together.']}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
            />

            <ScrollReveal variant="fadeUp" delay={0.08}>
              <p className="text-xs sm:text-sm md:text-base text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
                Whether you need an entire product built from scratch or dedicated engineering support, we adapt to your workflow.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {WORKING_MODELS.map((model, idx) => (
              <ModernCard
                key={model.title}
                variant="white"
                delay={idx * 0.08}
                className="p-6 sm:p-7 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EDEAFB] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    {model.icon}
                  </div>
                  <h3 className="text-lg font-extrabold text-[#151235]">
                    {model.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B5876] leading-relaxed">
                    {model.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EDEAFB] space-y-1.5">
                  {model.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-[#151235]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3B4FD9] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WORKING COMMITMENTS STRIP */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ModernCard variant="white" className="p-6 sm:p-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>OUR COMMITMENT TO YOU</span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-[#151235]">
            Clear Standards for Every Engagement
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2 text-left">
            {WORKING_COMMITMENTS.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#F6F5FC] border border-[#EDEAFB] flex items-center gap-2 text-xs font-semibold text-[#151235] hover:border-[#3B4FD9]/30 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-[#3B4FD9] shrink-0" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </ModernCard>
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal variant="fadeScale">
          <div className="relative bg-gradient-to-br from-[#0A0E2A] via-[#141B5C] to-[#2A3FA8] border border-[#3B4FD9]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-9 text-white text-center shadow-soft-lg overflow-hidden">
            {/* Background Decorative Tech Dots Mesh */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B4FD9_1px,transparent_1px)] [background-size:16px_16px]" />
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-[#3B4FD9]/20 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#7B5CE8]/15 blur-[80px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
                Let's Build Something <span className="text-[#7DE8FF]">Great Together.</span>
              </h2>

              <p className="text-[#B8BEDC] text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                Tell us about your project or idea. We're ready to help you plan, architect, and build the right solution.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
                <InteractiveButton
                  variant="primary"
                  glow={true}
                  onClick={() => onOpenScheduleModal('General Inquiry & Project Scoping')}
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
                  <span>Contact Our Team</span>
                </InteractiveButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </motion.div>
  );
};
