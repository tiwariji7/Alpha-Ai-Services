import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Bot,
  Code2,
  Globe,
  Smartphone,
  Palette,
  Workflow,
  Cloud,
  ShieldCheck,
  Share2,
  TrendingUp,
  RefreshCw,
  Compass,
  FileCode2,
  Rocket,
  Shield,
  Layers,
  Users,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import { SERVICES_LIST, ServiceItem } from '../data/servicesData';
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  staggerItem,
  pageTransition,
  cardHoverTransition,
} from '../utils/motion';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}

const SIX_STAGE_PROCESS = [
  {
    number: '01',
    title: 'Discover',
    desc: 'Deep-dive into your goals, user personas, existing systems and business constraints.',
  },
  {
    number: '02',
    title: 'Plan',
    desc: 'Define scope, technical architecture, database schemas, and a clear phased roadmap.',
  },
  {
    number: '03',
    title: 'Build',
    desc: 'Engineering in focused, testable sprint iterations with frequent progress updates.',
  },
  {
    number: '04',
    title: 'Test',
    desc: 'Rigorous automated unit testing, usability QA, security scans and performance audits.',
  },
  {
    number: '05',
    title: 'Launch',
    desc: 'Zero-downtime production deployment, telemetry setup and final launch checklist.',
  },
  {
    number: '06',
    title: 'Support',
    desc: 'Continuous monitoring, routine updates, performance tuning and iterative improvements.',
  },
];

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenScheduleModal,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Find matching service from the 12 curated services
  // Handle aliases gracefully
  const service =
    SERVICES_LIST.find((s) => s.slug === slug) ||
    SERVICES_LIST.find((s) => s.id === slug) ||
    (slug === 'ai-development' ? SERVICES_LIST[0] : null) ||
    (slug === 'software-development' ? SERVICES_LIST[1] : null) ||
    (slug === 'mobile-apps' ? SERVICES_LIST[3] : null) ||
    (slug === 'ui-ux-design' ? SERVICES_LIST[4] : null) ||
    (slug === 'workflow-automation' ? SERVICES_LIST[5] : null) ||
    (slug === 'cyber-security' ? SERVICES_LIST[7] : null) ||
    SERVICES_LIST[0];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-6 h-6 text-[#F4512C]" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-[#F4512C]" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#F4512C]" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-[#F4512C]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#F4512C]" />;
      case 'Workflow':
        return <Workflow className="w-6 h-6 text-[#F4512C]" />;
      case 'Cloud':
        return <Cloud className="w-6 h-6 text-[#F4512C]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#F4512C]" />;
      case 'Share2':
        return <Share2 className="w-6 h-6 text-[#F4512C]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#F4512C]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#F4512C]" />;
      case 'RefreshCw':
        return <RefreshCw className="w-6 h-6 text-[#F4512C]" />;
      default:
        return <Code2 className="w-6 h-6 text-[#F4512C]" />;
    }
  };

  const relatedServicesList = service.relatedServices
    .map((relSlug) => SERVICES_LIST.find((s) => s.slug === relSlug))
    .filter((s): s is ServiceItem => Boolean(s));

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-12 sm:space-y-16 md:space-y-24 pb-16 sm:pb-24 overflow-x-hidden bg-[#FAF8F6]"
    >
      {/* 1. HERO SECTION */}
      <section className="pt-6 sm:pt-12 pb-4 sm:pb-8 px-4 sm:px-6 relative overflow-hidden">
        {/* Ambient Warm Gradient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#F4512C]/6 via-[#FF7A45]/3 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto space-y-6 text-left">
          {/* Breadcrumb / Back button */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <button
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#6B6B6B] hover:text-[#F4512C] transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to All Services</span>
            </button>
          </motion.div>

          {/* Service Badge & Number */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E5E1] flex items-center justify-center shadow-xs">
              {getServiceIcon(service.iconName)}
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold text-[#F4512C] uppercase tracking-wider">
                Service {service.number}
              </div>
              <div className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                {service.category.replace('-', ' & ')}
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight"
          >
            {service.title}
          </motion.h1>

          {/* Supporting Paragraph */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg md:text-xl text-[#6B6B6B] leading-relaxed max-w-3xl"
          >
            {service.heroSupporting}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <button
              onClick={() => onOpenScheduleModal(service.title)}
              className="inline-flex items-center justify-center gap-2 bg-[#F4512C] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold hover:bg-[#d83f1d] hover:shadow-[0_8px_24px_rgba(244,81,44,0.3)] transition-all group active:scale-95 shadow-md cursor-pointer"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#111111] px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold border border-[#E8E5E1] hover:bg-[#F7F5F2] hover:border-[#F4512C]/40 transition-all group active:scale-95 shadow-2xs cursor-pointer"
            >
              <span>Back to Services</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. WHAT WE DO (Plain Business Language) */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#E8E5E1] shadow-soft text-left space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4512C]/10 border border-[#F4512C]/20 text-[#F4512C] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>WHAT WE DO</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight leading-tight">
            Solving Real Operational Problems Through Focused Engineering
          </h2>

          <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed">
            {service.whatWeDo}
          </p>
        </div>
      </section>

      {/* 3. CAPABILITIES GRID (4-6 Detailed Capabilities) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4512C]/10 border border-[#F4512C]/20 text-[#F4512C] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>CORE CAPABILITIES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight">
            What We Can Deliver for You
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 text-left">
          {service.capabilities.map((cap, idx) => (
            <div
              key={cap.title}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#E8E5E1] shadow-soft hover:shadow-soft-lg hover:border-[#F4512C]/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F7F5F2] border border-[#E8E5E1] flex items-center justify-center text-[#F4512C]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#111111]">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHAT WE CAN BUILD (Practical Example Cards) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4512C]/10 border border-[#F4512C]/20 text-[#F4512C] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>PRACTICAL EXAMPLES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight">
            What We Can Build
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left">
          {service.buildExamples.map((ex, i) => (
            <div
              key={ex.title}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8E5E1] shadow-2xs hover:border-[#F4512C]/30 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-xs font-black text-[#F4512C] font-mono block">
                  0{i + 1}
                </span>
                <h3 className="text-base font-extrabold text-[#111111] leading-snug">
                  {ex.title}
                </h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed mt-1">
                  {ex.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TECHNOLOGY STACK */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#E8E5E1] shadow-soft text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4512C]/10 border border-[#F4512C]/20 text-[#F4512C] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>TECHNOLOGIES WE USE</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
            Modern, Tested & Production-Proven Stack
          </h3>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-xl bg-[#F7F5F2] border border-[#E8E5E1] text-xs sm:text-sm font-bold text-[#111111] shadow-2xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR PROCESS (6-Stage Process) */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-white border-y border-[#E8E5E1]">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4512C]/10 border border-[#F4512C]/20 text-[#F4512C] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <span>OUR PROCESS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight">
              Predictable, Transparent <span className="text-[#F4512C]">Execution.</span>
            </h2>
          </div>

          {/* 6-Stage Process Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            {SIX_STAGE_PROCESS.map((stage) => (
              <div
                key={stage.number}
                className="bg-[#F7F5F2] rounded-2xl p-6 border border-[#E8E5E1] space-y-2.5 hover:border-[#F4512C]/30 transition-colors"
              >
                <span className="text-xs font-black text-[#F4512C] font-mono block">
                  Stage {stage.number}
                </span>
                <h3 className="text-base font-extrabold text-[#111111]">
                  {stage.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHO THIS SERVICE IS FOR */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto space-y-6 text-center">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4512C]/10 border border-[#F4512C]/20 text-[#F4512C] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>TARGET FIT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
            Who This Service Is For
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {service.idealFor.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#E8E5E1] shadow-2xs space-y-2"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F4512C]/10 text-[#F4512C] flex items-center justify-center font-bold text-xs">
                0{idx + 1}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#111111] leading-snug">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. RELATED SERVICES */}
      {relatedServicesList.length > 0 && (
        <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4512C]/10 border border-[#F4512C]/20 text-[#F4512C] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <span>EXPLORE MORE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
              Related Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-left">
            {relatedServicesList.map((rel) => (
              <div
                key={rel.slug}
                onClick={() => onNavigate(`/services/${rel.slug}`)}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-[#E8E5E1] hover:border-[#F4512C]/40 shadow-soft hover:shadow-soft-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#F7F5F2] border border-[#E8E5E1] flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getServiceIcon(rel.iconName)}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#6B6B6B]">
                      {rel.number}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-[#111111] group-hover:text-[#F4512C] transition-colors leading-snug">
                    {rel.title}
                  </h3>

                  <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">
                    {rel.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E8E5E1]/60 flex items-center justify-between text-xs font-bold text-[#111111] group-hover:text-[#F4512C]">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. FINAL SERVICE CTA BANNER */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="relative bg-[#111111] border border-[#2A2A2A] rounded-2xl sm:rounded-3xl p-6 sm:p-9 text-white text-center shadow-soft-lg overflow-hidden">
          {/* Background Decorative Tech Dots Mesh */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#F4512C_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-[#F4512C]/15 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#F4512C]/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Ready to Build <span className="text-[#F4512C]">Something Better?</span>
            </h2>

            <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Tell us what you're trying to achieve. We'll help you define the right solution and the next steps.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
              <button
                onClick={() => onOpenScheduleModal(service.title)}
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
                <span>Talk to Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
