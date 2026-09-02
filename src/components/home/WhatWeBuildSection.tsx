import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Bot,
  Code2,
  Smartphone,
  Sparkles,
  Workflow,
  Cloud,
  ArrowRight,
} from 'lucide-react';
import { staggerContainer, staggerItem } from '../../utils/motion';
import { FlowingHeading } from '../common/FlowingHeading';
import { ModernCard } from '../common/ModernCard';
import { ScrollReveal } from '../common/ScrollReveal';

interface WhatWeBuildSectionProps {
  onNavigate: (path: string) => void;
}

interface BuildItem {
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  path: string;
}

const BUILD_ITEMS: BuildItem[] = [
  {
    number: '01',
    title: 'AI & Machine Learning',
    desc: 'AI assistants, RAG pipelines & custom intelligent software systems.',
    icon: <Bot className="w-5 h-5 text-[#3B4FD9]" />,
    color: '#3B4FD9',
    path: '/services/ai-development',
  },
  {
    number: '02',
    title: 'Web Applications',
    desc: 'Modern, high-performance web apps, SaaS products & portals.',
    icon: <Code2 className="w-5 h-5 text-[#2A3FA8]" />,
    color: '#2A3FA8',
    path: '/services/web-development',
  },
  {
    number: '03',
    title: 'Mobile Apps',
    desc: 'Native Android and cross-platform iOS & Android mobile applications.',
    icon: <Smartphone className="w-5 h-5 text-[#4D6BFF]" />,
    color: '#4D6BFF',
    path: '/services/mobile-apps',
  },
  {
    number: '04',
    title: 'SaaS & Products',
    desc: 'From MVP concept to scalable production-grade digital software.',
    icon: <Sparkles className="w-5 h-5 text-[#7B5CE8]" />,
    color: '#7B5CE8',
    path: '/services/enterprise-systems',
  },
  {
    number: '05',
    title: 'Business Automation',
    desc: 'Automate repetitive workflows, connect tools & eliminate bottlenecks.',
    icon: <Workflow className="w-5 h-5 text-[#5B4FE0]" />,
    color: '#5B4FE0',
    path: '/services/workflow-automation',
  },
  {
    number: '06',
    title: 'Cloud & Backend',
    desc: 'Scalable APIs, resilient database design & cloud infrastructure.',
    icon: <Cloud className="w-5 h-5 text-[#141B5C]" />,
    color: '#141B5C',
    path: '/services/cloud-devops',
  },
];

export const WhatWeBuildSection: React.FC<WhatWeBuildSectionProps> = ({ onNavigate }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-10 sm:py-14 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Soft Glow Highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#3B4FD9]/10 via-[#7B5CE8]/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Section Header with Flowing Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <ScrollReveal variant="fadeScale">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CORE CAPABILITIES</span>
            </div>
          </ScrollReveal>

          <FlowingHeading
            as="h2"
            text="Technology We Build"
            highlightWords={['Build']}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
          />

          <ScrollReveal variant="fadeUp" delay={0.12}>
            <p className="text-sm sm:text-base md:text-lg text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
              From AI-powered systems and custom software to mobile apps and automated workflows, we engineer technology around real business needs.
            </p>
          </ScrollReveal>
        </div>

        {/* 6 Modern Cards Responsive Grid */}
        <motion.div
          variants={prefersReducedMotion ? undefined : staggerContainer(0.06, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 text-left items-stretch"
        >
          {BUILD_ITEMS.map((item, idx) => (
            <motion.div
              key={item.number}
              variants={prefersReducedMotion ? undefined : staggerItem}
            >
              <ModernCard
                variant="white"
                accentColor={item.color}
                delay={idx * 0.05}
                onClick={() => onNavigate(item.path)}
                className="p-6 sm:p-7 flex flex-col justify-between h-full"
              >
                {/* Top Accent Gradient Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: item.color }}
                />

                <div className="space-y-3.5 pt-1">
                  {/* Header: Icon Container + Number Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#EDEAFB] border border-[#7B5CE8]/20 flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:rotate-3 group-hover:border-[#3B4FD9]/30 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <span
                      className="text-xs font-black text-white px-2.5 py-0.5 rounded-full shadow-2xs font-mono"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-[#151235] group-hover:text-[#3B4FD9] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5B5876] leading-relaxed mt-1.5">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Action Link */}
                <div className="pt-4 mt-4 border-t border-[#EDEAFB] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#3B4FD9] inline-flex items-center gap-1.5 group-hover:gap-2 transition-all">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] text-[#5B5876] font-medium group-hover:text-[#3B4FD9] transition-colors">
                    View Details →
                  </span>
                </div>
              </ModernCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Link with Micro-Interaction */}
        <div className="text-center pt-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#3B4FD9] hover:text-[#2A3FA8] transition-colors group py-1 cursor-pointer"
          >
            <span>Explore All 12 Engineering Practices</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
