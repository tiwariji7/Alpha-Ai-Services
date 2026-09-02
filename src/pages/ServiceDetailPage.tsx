import React from 'react';
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
  MessageSquare,
} from 'lucide-react';
import { SERVICES_LIST, ServiceItem } from '../data/servicesData';
import {
  fadeUp,
  pageTransition,
} from '../utils/motion';
import { FlowingHeading } from '../components/common/FlowingHeading';
import { ModernCard } from '../components/common/ModernCard';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { InteractiveButton } from '../components/common/InteractiveButton';
import { PageHeroAmbient } from '../components/common/PageHeroAmbient';

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
        return <Bot className="w-6 h-6 text-[#3B4FD9]" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-[#2A3FA8]" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#4D6BFF]" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-[#5B4FE0]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#9C7DF0]" />;
      case 'Workflow':
        return <Workflow className="w-6 h-6 text-[#3B4FD9]" />;
      case 'Cloud':
        return <Cloud className="w-6 h-6 text-[#7B5CE8]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#141B5C]" />;
      case 'Share2':
        return <Share2 className="w-6 h-6 text-[#5B4FE0]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-[#3B4FD9]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#7B5CE8]" />;
      case 'RefreshCw':
        return <RefreshCw className="w-6 h-6 text-[#3B4FD9]" />;
      default:
        return <Code2 className="w-6 h-6 text-[#3B4FD9]" />;
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
      className="space-y-12 sm:space-y-16 md:space-y-24 pb-16 sm:pb-24 overflow-x-hidden bg-[#F6F5FC]"
    >
      {/* 1. HERO SECTION WITH 3D AMBIENT PARTICLES */}
      <section className="pt-6 sm:pt-12 pb-4 sm:pb-8 px-4 sm:px-6 relative overflow-hidden">
        <PageHeroAmbient theme="page" />

        <div className="max-w-4xl mx-auto space-y-6 text-left relative z-10">
          {/* Breadcrumb / Back button */}
          <ScrollReveal variant="fadeIn">
            <motion.button
              whileHover={{ x: -3 }}
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#5B5876] hover:text-[#3B4FD9] transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to All Services</span>
            </motion.button>
          </ScrollReveal>

          {/* Service Badge & Number */}
          <ScrollReveal variant="fadeScale" delay={0.05}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#EDEAFB] flex items-center justify-center shadow-xs">
                {getServiceIcon(service.iconName)}
              </div>
              <div>
                <div className="text-[11px] font-mono font-bold text-[#3B4FD9] uppercase tracking-wider">
                  Service {service.number}
                </div>
                <div className="text-xs font-semibold text-[#5B5876] uppercase tracking-wider">
                  {service.category.replace('-', ' & ')}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Heading */}
          <FlowingHeading
            as="h1"
            text={service.title}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#151235] tracking-tight leading-tight"
          />

          {/* Supporting Paragraph */}
          <ScrollReveal variant="fadeUp" delay={0.15}>
            <p className="text-base sm:text-lg md:text-xl text-[#5B5876] leading-relaxed max-w-3xl">
              {service.heroSupporting}
            </p>
          </ScrollReveal>

          {/* Action Buttons */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <InteractiveButton
                variant="primary"
                glow={true}
                onClick={() => onOpenScheduleModal(service.title)}
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </InteractiveButton>

              <InteractiveButton
                variant="outline"
                onClick={() => onNavigate('/services')}
              >
                <span>Back to Services</span>
              </InteractiveButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. WHAT WE DO (Plain Business Language) */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ModernCard variant="white" className="p-6 sm:p-10 text-left space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>WHAT WE DO</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151235] tracking-tight leading-tight">
            Solving Real Operational Problems Through Focused Engineering
          </h2>

          <p className="text-sm sm:text-base text-[#5B5876] leading-relaxed">
            {service.whatWeDo}
          </p>
        </ModernCard>
      </section>

      {/* 3. CAPABILITIES GRID */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
          <ScrollReveal variant="fadeScale">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <span>CORE CAPABILITIES</span>
            </div>
          </ScrollReveal>

          <FlowingHeading
            as="h2"
            text="What We Can Deliver for You"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 text-left">
          {service.capabilities.map((cap, idx) => (
            <ModernCard
              key={cap.title}
              variant="white"
              delay={idx * 0.08}
              className="p-6 sm:p-8 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDEAFB] border border-[#7B5CE8]/20 flex items-center justify-center text-[#5B4FE0] group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#151235]">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B5876] leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            </ModernCard>
          ))}
        </div>
      </section>

      {/* 4. WHAT WE CAN BUILD */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
          <ScrollReveal variant="fadeScale">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <span>PRACTICAL EXAMPLES</span>
            </div>
          </ScrollReveal>

          <FlowingHeading
            as="h2"
            text="What We Can Build"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left">
          {service.buildExamples.map((ex, i) => (
            <ModernCard
              key={ex.title}
              variant="white"
              delay={i * 0.05}
              className="p-5 sm:p-6 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-xs font-black text-[#3B4FD9] font-mono block">
                  0{i + 1}
                </span>
                <h3 className="text-base font-extrabold text-[#151235] leading-snug">
                  {ex.title}
                </h3>
                <p className="text-xs text-[#5B5876] leading-relaxed mt-1">
                  {ex.desc}
                </p>
              </div>
            </ModernCard>
          ))}
        </div>
      </section>

      {/* 5. TECHNOLOGY STACK */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ModernCard variant="white" className="p-6 sm:p-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>TECHNOLOGIES WE USE</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#151235]">
            Modern, Tested &amp; Production-Proven Stack
          </h3>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-xl bg-[#F6F5FC] border border-[#EDEAFB] text-xs sm:text-sm font-bold text-[#151235] shadow-2xs hover:border-[#3B4FD9]/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </ModernCard>
      </section>

      {/* 6. OUR PROCESS */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-white border-y border-[#EDEAFB]">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
            <ScrollReveal variant="fadeScale">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <span>OUR PROCESS</span>
              </div>
            </ScrollReveal>

            <FlowingHeading
              as="h2"
              text="Predictable, Transparent Execution."
              highlightWords={['Execution.']}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
            />
          </div>

          {/* 6-Stage Process Grid with Modern Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            {SIX_STAGE_PROCESS.map((stage, idx) => (
              <ModernCard
                key={stage.number}
                variant="white"
                delay={idx * 0.05}
                className="p-6 space-y-2.5"
              >
                <span className="text-xs font-black text-[#3B4FD9] font-mono block">
                  Stage {stage.number}
                </span>
                <h3 className="text-base font-extrabold text-[#151235]">
                  {stage.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B5876] leading-relaxed">
                  {stage.desc}
                </p>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHO THIS SERVICE IS FOR */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto space-y-6 text-center">
        <div className="space-y-2">
          <ScrollReveal variant="fadeScale">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <span>TARGET FIT</span>
            </div>
          </ScrollReveal>

          <FlowingHeading
            as="h2"
            text="Who This Service Is For"
            className="text-2xl sm:text-3xl font-extrabold text-[#151235] tracking-tight justify-center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {service.idealFor.map((item, idx) => (
            <ModernCard
              key={idx}
              variant="white"
              delay={idx * 0.08}
              className="p-5 space-y-2"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EDEAFB] text-[#5B4FE0] border border-[#7B5CE8]/20 flex items-center justify-center font-bold text-xs font-mono">
                0{idx + 1}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#151235] leading-snug">
                {item}
              </p>
            </ModernCard>
          ))}
        </div>
      </section>

      {/* 8. RELATED SERVICES */}
      {relatedServicesList.length > 0 && (
        <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <ScrollReveal variant="fadeScale">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <span>EXPLORE MORE</span>
              </div>
            </ScrollReveal>

            <FlowingHeading
              as="h2"
              text="Related Services"
              className="text-2xl sm:text-3xl font-extrabold text-[#151235] tracking-tight justify-center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-left">
            {relatedServicesList.map((rel, idx) => (
              <ModernCard
                key={rel.slug}
                variant="white"
                delay={idx * 0.08}
                onClick={() => onNavigate(`/services/${rel.slug}`)}
                className="p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#EDEAFB] border border-[#7B5CE8]/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all">
                      {getServiceIcon(rel.iconName)}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#5B5876]">
                      {rel.number}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-[#151235] group-hover:text-[#3B4FD9] transition-colors leading-snug">
                    {rel.title}
                  </h3>

                  <p className="text-xs text-[#5B5876] line-clamp-2 leading-relaxed">
                    {rel.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EDEAFB] flex items-center justify-between text-xs font-bold text-[#151235] group-hover:text-[#3B4FD9]">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </ModernCard>
            ))}
          </div>
        </section>
      )}

      {/* 9. FINAL SERVICE CTA BANNER */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal variant="fadeScale">
          <div className="relative bg-gradient-to-br from-[#0A0E2A] via-[#141B5C] to-[#2A3FA8] border border-[#3B4FD9]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-9 text-white text-center shadow-soft-lg overflow-hidden">
            {/* Background Decorative Tech Dots Mesh */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B4FD9_1px,transparent_1px)] [background-size:16px_16px]" />
            {/* Subtle Ambient Glow */}
            <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-[#3B4FD9]/20 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#7B5CE8]/15 blur-[80px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
                Ready to Build <span className="text-[#7DE8FF]">Something Better?</span>
              </h2>

              <p className="text-[#B8BEDC] text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                Tell us what you're trying to achieve. We'll help you define the right solution and the next steps.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
                <InteractiveButton
                  variant="primary"
                  glow={true}
                  onClick={() => onOpenScheduleModal(service.title)}
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
                  <span>Talk to Us</span>
                </InteractiveButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </motion.div>
  );
};
