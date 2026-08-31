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
  ShieldCheck,
  Zap,
  MessageSquare,
  Globe,
  Terminal,
  Cpu,
  RefreshCw,
} from 'lucide-react';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  pageTransition,
} from '../utils/motion';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}

const CORE_VALUES = [
  {
    number: '01',
    title: 'Product Thinking First',
    desc: 'We do not just write code — we understand your business model, target users and operational goals before building.',
    icon: <Target className="w-5 h-5 text-[#F4512C]" />,
  },
  {
    number: '02',
    title: 'Direct Collaboration',
    desc: 'You communicate directly with the engineers and designers building your product — no middle management bottlenecks.',
    icon: <Users className="w-5 h-5 text-[#F4512C]" />,
  },
  {
    number: '03',
    title: 'Clean, Maintainable Code',
    desc: 'We write modular, well-tested and documented software that your team can comfortably own, extend and scale long-term.',
    icon: <Code2 className="w-5 h-5 text-[#F4512C]" />,
  },
  {
    number: '04',
    title: 'Long-Term Partnership',
    desc: 'We stay invested in your success beyond launch day, providing maintenance, optimization and feature enhancements.',
    icon: <HeartHandshake className="w-5 h-5 text-[#F4512C]" />,
  },
];

const WORKING_MODELS = [
  {
    title: 'Dedicated Project Sprints',
    desc: 'End-to-end product delivery from concept and UX wireframes to full-stack engineering and production deployment.',
    points: ['Defined milestone roadmap', 'Fixed-scope predictability', 'Weekly live staging demos'],
    icon: <Layers className="w-5 h-5 text-[#F4512C]" />,
  },
  {
    title: 'Engineering Pod Extension',
    desc: 'Integrate skilled developers directly into your existing team to accelerate roadmap delivery and tackle complex modules.',
    points: ['Direct Git & Slack integration', 'Flexible sprint commitments', 'Immediate technical velocity'],
    icon: <Terminal className="w-5 h-5 text-[#F4512C]" />,
  },
  {
    title: 'AI & Technical Advisory',
    desc: 'Practical consultation on AI feasibility, modern system architecture, technology selection, and migration planning.',
    points: ['Architecture blueprints', 'RAG & AI feasibility review', 'Cost & scale optimization'],
    icon: <Cpu className="w-5 h-5 text-[#F4512C]" />,
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
      className="space-y-12 sm:space-y-16 md:space-y-24 pb-16 sm:pb-24 overflow-x-hidden bg-[#FAF8F6]"
    >
      {/* 1. HERO SECTION */}
      <section className="pt-8 sm:pt-14 pb-4 sm:pb-8 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle Warm Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#F4512C]/6 via-[#FF7A45]/3 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F4512C]/10 border border-[#F4512C]/20 text-[#F4512C] text-[11px] sm:text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ABOUT ALPHA AI SERVICES</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight"
          >
            Engineering Software With <br />
            <span className="text-[#F4512C]">Purpose and Precision.</span>
          </motion.h1>

          {/* Supporting Narrative */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg md:text-xl text-[#6B6660] max-w-2xl mx-auto leading-relaxed"
          >
            With engineering teams in Pune and Prayagraj, we partner with startups and growing businesses across India to design, build, and deploy reliable digital products, modern web apps, and custom software.
          </motion.p>
        </div>
      </section>

      {/* 2. OUR STORY & PHILOSOPHY (Clean Editorial Split) */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EDE9E4] shadow-soft text-left grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4512C]/10 border border-[#F4512C]/20 text-[#F4512C] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <span>WHO WE ARE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight">
              A studio built around craft, clarity, and genuine accountability.
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#6B6660] leading-relaxed">
              Alpha AI Services was created with a clear objective: to eliminate the common friction, miscommunication, and bloated overhead of traditional agencies.
            </p>

            <p className="text-xs sm:text-sm text-[#6B6660] leading-relaxed">
              We focus on building technology that solves genuine operational problems. By combining modern AI capabilities with time-tested software architecture, we deliver robust web apps, mobile products, and automated workflows that are practical today and scalable tomorrow.
            </p>
          </div>

          <div className="lg:col-span-6 bg-[#FAF8F6] rounded-2xl p-6 sm:p-8 border border-[#EDE9E4] space-y-5">
            <h3 className="text-base sm:text-lg font-extrabold text-[#111111]">
              Our Engineering Standards:
            </h3>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#F4512C]/15 text-[#F4512C] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <strong className="text-xs sm:text-sm font-bold text-[#111111] block">
                    Zero Bloat, Production-First Mindset
                  </strong>
                  <p className="text-xs text-[#6B6660] leading-relaxed mt-0.5">
                    We only recommend technologies and architectures that truly benefit your specific project requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#F4512C]/15 text-[#F4512C] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <strong className="text-xs sm:text-sm font-bold text-[#111111] block">
                    Transparent Communication
                  </strong>
                  <p className="text-xs text-[#6B6660] leading-relaxed mt-0.5">
                    Live staging links, transparent Git commits, and regular updates mean you always know where your project stands.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#F4512C]/15 text-[#F4512C] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <strong className="text-xs sm:text-sm font-bold text-[#111111] block">
                    Complete Client Ownership
                  </strong>
                  <p className="text-xs text-[#6B6660] leading-relaxed mt-0.5">
                    You own 100% of your source code, infrastructure credentials, and intellectual property from day one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GUIDING PRINCIPLES / CORE VALUES */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4512C]/10 border border-[#F4512C]/20 text-[#F4512C] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>CORE VALUES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight">
            How We Approach <span className="text-[#F4512C]">Every Project.</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#6B6660] max-w-2xl mx-auto leading-relaxed">
            These four principles guide every design decision, code commit, and client interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-left">
          {CORE_VALUES.map((val) => (
            <div
              key={val.number}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#EDE9E4] hover:border-[#F4512C]/40 shadow-soft hover:shadow-soft-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    {val.icon}
                  </div>
                  <span className="text-xs font-mono font-black text-[#8C867F] group-hover:text-[#F4512C]">
                    {val.number}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-[#111111] group-hover:text-[#F4512C] transition-colors leading-snug">
                  {val.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#6B6660] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOW WE COLLABORATE (Working Models) */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-white border-y border-[#EDE9E4]">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4512C]/10 border border-[#F4512C]/20 text-[#F4512C] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <span>ENGAGEMENT MODELS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight">
              Flexible Ways to <span className="text-[#F4512C]">Work Together.</span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#6B6660] max-w-2xl mx-auto leading-relaxed">
              Whether you need an entire product built from scratch or dedicated engineering support, we adapt to your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {WORKING_MODELS.map((model) => (
              <div
                key={model.title}
                className="bg-[#FAF8F6] rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#EDE9E4] hover:border-[#F4512C]/30 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EDE9E4] flex items-center justify-center shadow-xs">
                    {model.icon}
                  </div>
                  <h3 className="text-lg font-extrabold text-[#111111]">
                    {model.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B6660] leading-relaxed">
                    {model.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EDE9E4]/80 space-y-1.5">
                  {model.points.map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#111111]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F4512C] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WORKING COMMITMENTS STRIP */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-xs text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4512C]/10 border border-[#F4512C]/20 text-[#F4512C] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>OUR COMMITMENT TO YOU</span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-[#111111]">
            Clear Standards for Every Engagement
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2 text-left">
            {WORKING_COMMITMENTS.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] flex items-center gap-2 text-xs font-semibold text-[#111111]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#F4512C] shrink-0" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="relative bg-[#111111] border border-[#2A2A2A] rounded-2xl sm:rounded-3xl p-6 sm:p-9 text-white text-center shadow-soft-lg overflow-hidden">
          {/* Background Decorative Tech Dots Mesh */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#F4512C_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Ambient Warm Glow */}
          <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-[#F4512C]/15 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#F4512C]/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Let's Build Something <span className="text-[#F4512C]">Great Together.</span>
            </h2>

            <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Tell us about your project or idea. We're ready to help you plan, architect, and build the right solution.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
              <button
                onClick={() => onOpenScheduleModal('General Inquiry & Project Scoping')}
                className="bg-[#F4512C] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold hover:bg-[#d83f1d] hover:shadow-[0_6px_20px_rgba(244,81,44,0.35)] transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-md cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('/contact')}
                className="bg-white/5 text-white border border-white/20 hover:bg-white/10 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#F4512C]" />
                <span>Contact Our Team</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
