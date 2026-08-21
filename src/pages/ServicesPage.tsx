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
  Compass,
  FileCode2,
  Rocket,
  MessageSquare,
  Target,
  Cpu,
  Layers,
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
    icon: <Target className="w-5 h-5 text-[#F4512C]" />,
    title: 'Strategy',
    desc: 'Understand the problem and user needs before writing a single line of code.',
  },
  {
    icon: <Cpu className="w-5 h-5 text-[#F4512C]" />,
    title: 'Engineering',
    desc: 'Build reliable, maintainable and secure technology using clean architecture.',
  },
  {
    icon: <Layers className="w-5 h-5 text-[#F4512C]" />,
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
        return <Bot className="w-5 h-5 text-[#F4512C]" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-[#F4512C]" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-[#F4512C]" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-[#F4512C]" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-[#F4512C]" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-[#F4512C]" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-[#F4512C]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#F4512C]" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-[#F4512C]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-[#F4512C]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#F4512C]" />;
      case 'RefreshCw':
        return <RefreshCw className="w-5 h-5 text-[#F4512C]" />;
      default:
        return <Code2 className="w-5 h-5 text-[#F4512C]" />;
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-12 sm:space-y-16 md:space-y-24 pb-16 sm:pb-24 overflow-x-hidden bg-[#FAF8F6]"
    >
      {/* 1. SERVICES HERO SECTION (Editorial Directory Style - No Landing Page CTAs) */}
      <section className="pt-8 sm:pt-14 pb-2 sm:pb-4 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle Ambient Background Highlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#F4512C]/6 via-[#FF7A45]/3 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F4512C]/10 border border-[#F4512C]/20 text-[#F4512C] text-[11px] sm:text-xs font-bold uppercase tracking-wider"
          >
            <span>PRACTICES & CAPABILITIES</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight"
          >
            Technology That Moves <br />
            <span className="text-[#F4512C]">Your Business Forward.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg md:text-xl text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed"
          >
            From AI-powered systems and custom software to websites, mobile apps, automation and digital growth, we build technology around real business needs.
          </motion.p>

          {/* Editorial Capability Scope Strip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.22 }}
            className="pt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-[#6B6B6B]"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8E5E1] shadow-2xs font-semibold text-[#111111]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4512C]" />
              12 Engineering Practices
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8E5E1] shadow-2xs font-semibold text-[#111111]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4512C]" />
              End-to-End Delivery
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8E5E1] shadow-2xs font-semibold text-[#111111]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4512C]" />
              Modular Architecture
            </span>
          </motion.div>
        </div>
      </section>

      {/* 2. STICKY CATEGORY NAVIGATION & 3. 3-COLUMN EDITORIAL SERVICE CARDS GRID */}
      <section
        id="services-grid-section"
        className="px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24 space-y-8 sm:space-y-10"
      >
        {/* Sticky Minimal Category Navigation */}
        <div className="sticky top-20 z-30 flex justify-center py-2 bg-[#FAF8F6]/80 backdrop-blur-md">
          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <div className="inline-flex items-center gap-1.5 bg-white p-1.5 rounded-2xl sm:rounded-full border border-[#E8E5E1] shadow-xs">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl sm:rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'text-[#6B6B6B] hover:text-[#111111] hover:bg-[#F7F5F2]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3-Column Service Grid (Desktop: 3 cols, Tablet: 2 cols, Mobile: 1 col) */}
        <motion.div
          layout
          variants={prefersReducedMotion ? undefined : staggerContainer(0.06, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch"
        >
          {filteredServices.map((service) => (
            <motion.div
              layout
              key={service.slug}
              variants={prefersReducedMotion ? undefined : staggerItem}
              whileHover={prefersReducedMotion ? undefined : cardHoverTransition}
              onClick={() => onNavigate(`/services/${service.slug}`)}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#E8E5E1] hover:border-[#F4512C]/40 shadow-soft hover:shadow-soft-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer text-left relative overflow-hidden"
            >
              {/* Card Header & Content */}
              <div className="space-y-4">
                {/* Top: Number + Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#F7F5F2] border border-[#E8E5E1] flex items-center justify-center group-hover:scale-105 group-hover:border-[#F4512C]/30 transition-all shadow-2xs">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-black text-[#6B6B6B] group-hover:text-[#F4512C] transition-colors font-mono">
                    {service.number}
                  </span>
                </div>

                {/* Middle: Service Title */}
                <h3 className="text-lg sm:text-xl font-extrabold text-[#111111] group-hover:text-[#F4512C] transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Below: 1-2 Line Description */}
                <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed line-clamp-2">
                  {service.shortDescription}
                </p>

                {/* Bottom: 3 Small Capability Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-[10.5px] font-semibold text-[#111111] bg-[#F7F5F2] px-2.5 py-1 rounded-lg border border-[#E8E5E1]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer: Explore Service Link with subtle arrow movement on hover */}
              <div className="pt-5 mt-5 border-t border-[#E8E5E1]/70 flex items-center justify-between">
                <span className="text-xs font-bold text-[#111111] group-hover:text-[#F4512C] inline-flex items-center gap-1.5 transition-colors">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                </span>
                <span className="text-[10px] text-[#8C867F] font-medium group-hover:text-[#F4512C]">
                  View Detail →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. WHY THESE SERVICES MATTER ("More Than Development.") */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-white border-y border-[#E8E5E1]">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4512C]/10 border border-[#F4512C]/20 text-[#F4512C] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <span>OUR PHILOSOPHY</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight">
              More Than <span className="text-[#F4512C]">Development.</span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
              Technology works best when strategy, design and engineering move together.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-left">
            {THREE_PILLARS.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="bg-[#F7F5F2] rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#E8E5E1] shadow-2xs space-y-3 hover:border-[#F4512C]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E5E1] flex items-center justify-center shadow-xs">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-extrabold text-[#111111]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="relative bg-[#111111] border border-[#2A2A2A] rounded-2xl sm:rounded-3xl p-6 sm:p-9 text-white text-center shadow-soft-lg overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-[#F4512C]/15 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#F4512C]/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Have a Project <span className="text-[#F4512C]">in Mind?</span>
            </h2>

            <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Tell us what you need to build, improve or automate. We'll help you figure out the right next step.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
              <button
                onClick={() => onOpenScheduleModal('New Project Scoping')}
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
                <span>Contact Us</span>
              </button>
            </div>

            {/* Small Trust Line */}
            <div className="pt-4 border-t border-white/10 mt-3 text-[11px] text-gray-400 font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span>Clear communication</span>
              <span className="text-[#F4512C] font-bold">·</span>
              <span>Practical solutions</span>
              <span className="text-[#F4512C] font-bold">·</span>
              <span>Long-term support</span>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
