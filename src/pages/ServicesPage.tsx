import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
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
  Target,
  Cpu,
  Layers,
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  pageTransition,
} from '../utils/motion';
import { FlowingHeading } from '../components/common/FlowingHeading';
import { ModernCard } from '../components/common/ModernCard';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { InteractiveButton } from '../components/common/InteractiveButton';
import { PageHeroAmbient } from '../components/common/PageHeroAmbient';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All' },
  { id: 'ai-software', label: 'AI & Software' },
  { id: 'web-mobile', label: 'Web & Mobile' },
  { id: 'automation', label: 'Automation' },
  { id: 'cloud-security', label: 'Cloud & Security' },
  { id: 'design-marketing', label: 'Design & Marketing' },
];

const THREE_PILLARS = [
  {
    icon: <Target className="w-5 h-5 text-[#3B4FD9]" />,
    title: 'Strategy',
    desc: 'Understand the problem and user needs before writing a single line of code.',
  },
  {
    icon: <Cpu className="w-5 h-5 text-[#2A3FA8]" />,
    title: 'Engineering',
    desc: 'Build reliable, maintainable and secure technology using clean architecture.',
  },
  {
    icon: <Layers className="w-5 h-5 text-[#5B4FE0]" />,
    title: 'Growth',
    desc: 'Create modular digital products that can easily evolve as your business scales.',
  },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenScheduleModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const prefersReducedMotion = useReducedMotion();

  const filteredServices = SERVICES_LIST.filter((service) => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-5 h-5 text-[#3B4FD9]" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-[#2A3FA8]" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-[#4D6BFF]" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-[#5B4FE0]" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-[#9C7DF0]" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-[#3B4FD9]" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-[#7B5CE8]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#141B5C]" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-[#5B4FE0]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-[#3B4FD9]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#7B5CE8]" />;
      case 'RefreshCw':
        return <RefreshCw className="w-5 h-5 text-[#3B4FD9]" />;
      default:
        return <Code2 className="w-5 h-5 text-[#3B4FD9]" />;
    }
  };

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-12 sm:space-y-16 md:space-y-24 pb-16 sm:pb-24 overflow-x-hidden bg-[#F6F5FC]"
    >
      {/* 1. SERVICES HERO SECTION WITH 3D AMBIENT PARTICLES */}
      <section className="pt-8 sm:pt-14 pb-2 sm:pb-4 px-4 sm:px-6 relative overflow-hidden">
        <PageHeroAmbient theme="page" />

        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 relative z-10">
          {/* Eyebrow */}
          <ScrollReveal variant="fadeScale">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs">
              <span>PRACTICES &amp; CAPABILITIES</span>
            </div>
          </ScrollReveal>

          {/* Main Heading with Flowing Text */}
          <FlowingHeading
            as="h1"
            text="Technology That Moves Your Business Forward."
            highlightWords={['Your', 'Business', 'Forward.']}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
          />

          {/* Supporting Text */}
          <ScrollReveal variant="fadeUp" delay={0.12}>
            <p className="text-base sm:text-lg md:text-xl text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
              From AI-powered systems and custom software to websites, mobile apps, automation and digital growth, we build technology around real business needs.
            </p>
          </ScrollReveal>

          {/* Editorial Capability Scope Strip */}
          <ScrollReveal variant="fadeUp" delay={0.18}>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-[#5B5876]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#EDEAFB] shadow-2xs font-semibold text-[#151235]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B4FD9]" />
                12 Engineering Practices
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#EDEAFB] shadow-2xs font-semibold text-[#151235]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B4FD9]" />
                End-to-End Delivery
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#EDEAFB] shadow-2xs font-semibold text-[#151235]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B4FD9]" />
                Modular Architecture
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. STICKY CATEGORY NAVIGATION & 3. 3-COLUMN MODERN SERVICE CARDS GRID */}
      <section
        id="services-grid-section"
        className="px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24 space-y-8 sm:space-y-10"
      >
        {/* Sticky Minimal Category Navigation */}
        <div className="sticky top-20 z-30 flex justify-center py-2 bg-[#F6F5FC]/80 backdrop-blur-md">
          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <div className="inline-flex items-center gap-1.5 bg-white p-1.5 rounded-2xl sm:rounded-full border border-[#EDEAFB] shadow-xs">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl sm:rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-gradient-to-r from-[#3B4FD9] to-[#7B5CE8] text-white shadow-xs'
                      : 'text-[#5B5876] hover:text-[#151235] hover:bg-[#F6F5FC]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3-Column Modern Service Grid */}
        <motion.div
          layout
          variants={prefersReducedMotion ? undefined : staggerContainer(0.06, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch"
        >
          {filteredServices.map((service, idx) => (
            <motion.div
              layout
              key={service.slug}
              variants={prefersReducedMotion ? undefined : staggerItem}
            >
              <ModernCard
                variant="white"
                delay={idx * 0.04}
                onClick={() => onNavigate(`/services/${service.slug}`)}
                className="p-6 sm:p-7 flex flex-col justify-between h-full text-left"
              >
                {/* Card Header & Content */}
                <div className="space-y-4">
                  {/* Top: Number + Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#EDEAFB] border border-[#7B5CE8]/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 group-hover:border-[#3B4FD9]/30 transition-all shadow-2xs">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-black text-[#5B5876] group-hover:text-[#3B4FD9] transition-colors font-mono">
                      {service.number}
                    </span>
                  </div>

                  {/* Middle: Service Title */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#151235] group-hover:text-[#3B4FD9] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  {/* Below: 1-2 Line Description */}
                  <p className="text-xs sm:text-sm text-[#5B5876] leading-relaxed line-clamp-2">
                    {service.shortDescription}
                  </p>

                  {/* Bottom: 3 Small Capability Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-[10.5px] font-semibold text-[#151235] bg-[#F6F5FC] px-2.5 py-1 rounded-lg border border-[#EDEAFB]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Explore Service Link */}
                <div className="pt-5 mt-5 border-t border-[#EDEAFB] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#151235] group-hover:text-[#3B4FD9] inline-flex items-center gap-1.5 transition-colors">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                  </span>
                  <span className="text-[10px] text-[#5B5876] font-medium group-hover:text-[#3B4FD9]">
                    View Detail →
                  </span>
                </div>
              </ModernCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. WHY THESE SERVICES MATTER */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-white border-y border-[#EDEAFB]">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
            <ScrollReveal variant="fadeScale">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <span>OUR PHILOSOPHY</span>
              </div>
            </ScrollReveal>

            <FlowingHeading
              as="h2"
              text="More Than Development."
              highlightWords={['Development.']}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
            />

            <ScrollReveal variant="fadeUp" delay={0.08}>
              <p className="text-xs sm:text-sm md:text-base text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
                Technology works best when strategy, design and engineering move together.
              </p>
            </ScrollReveal>
          </div>

          {/* 3 Pillars Grid with Modern Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-left">
            {THREE_PILLARS.map((pillar, idx) => (
              <ModernCard
                key={pillar.title}
                variant="white"
                delay={idx * 0.08}
                className="p-6 sm:p-7 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EDEAFB] border border-[#7B5CE8]/20 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-extrabold text-[#151235]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B5876] leading-relaxed">
                  {pillar.desc}
                </p>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BOTTOM DIRECT ACTION BANNER */}
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
                Have a Project <span className="text-[#7DE8FF]">in Mind?</span>
              </h2>

              <p className="text-[#B8BEDC] text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                Tell us what you're trying to build and let's explore the right technical approach.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
                <InteractiveButton
                  variant="primary"
                  glow={true}
                  onClick={() => onOpenScheduleModal('New Project Scoping')}
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
                  <span>Contact Us</span>
                </InteractiveButton>
              </div>

              {/* Small Trust Line */}
              <div className="pt-4 border-t border-white/10 mt-3 text-[11px] text-[#B8BEDC] font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <span>Clear communication</span>
                <span className="text-[#7DE8FF] font-bold">·</span>
                <span>Practical solutions</span>
                <span className="text-[#7DE8FF] font-bold">·</span>
                <span>Long-term support</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </motion.div>
  );
};
