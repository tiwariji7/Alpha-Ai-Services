import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/siteData';
import { pageTransition } from '../utils/motion';
import { FlowingHeading } from '../components/common/FlowingHeading';
import { ModernCard } from '../components/common/ModernCard';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { InteractiveButton } from '../components/common/InteractiveButton';

interface PortfolioPageProps {
  onNavigate: (path: string) => void;
  onOpenScheduleModal: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onNavigate,
  onOpenScheduleModal: _onOpenScheduleModal,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', 'AI', 'Android', 'React', 'Prototype', 'Internal Product'];

  const filteredItems =
    selectedFilter === 'All'
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter(
          (item) =>
            item.tags.includes(selectedFilter) ||
            item.projectType === selectedFilter
        );

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-4 pb-16 sm:pt-6 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-12 overflow-x-hidden"
    >
      {/* Hero Header */}
      <div className="relative pt-6 sm:pt-10 pb-2 text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <ScrollReveal variant="fadeScale">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED CASE STUDIES</span>
          </div>
        </ScrollReveal>

        <FlowingHeading
          as="h1"
          text="Work That Speaks for Itself"
          highlightWords={['Itself']}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
        />

        <ScrollReveal variant="fadeUp" delay={0.1}>
          <p className="text-[#5B5876] text-sm sm:text-base md:text-lg leading-relaxed">
            Explore a selection of products, prototypes and digital experiences built by our team.
          </p>
        </ScrollReveal>

        {/* Filter Pills */}
        <ScrollReveal variant="fadeUp" delay={0.15}>
          <div className="pt-2 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-gradient-to-r from-[#3B4FD9] to-[#7B5CE8] text-white border-transparent shadow-xs'
                    : 'bg-white text-[#5B5876] border-[#EDEAFB] hover:bg-[#F6F5FC]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Case Studies Modern Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredItems.map((item, idx) => (
          <ModernCard
            key={item.slug}
            variant="white"
            delay={idx * 0.06}
            onClick={() => onNavigate(`/portfolio/${item.slug}`)}
            className="flex flex-col justify-between text-left"
          >
            {/* Image */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#F6F5FC]">
              <img
                src={item.coverImage}
                alt={item.title}
                width="600"
                height="340"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold text-[#151235] border border-[#EDEAFB] shadow-xs">
                {item.name}
              </div>
              <div className="absolute top-3.5 right-3.5 bg-[#0F1442]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-xs font-mono">
                {item.projectType}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md bg-[#EDEAFB] text-[10px] font-bold text-[#5B4FE0] border border-[#7B5CE8]/20 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-[#151235] group-hover:text-[#3B4FD9] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#5B5876] leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EDEAFB] flex items-center justify-between">
                <span className="text-xs font-bold text-[#3B4FD9] inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </ModernCard>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <ScrollReveal variant="fadeScale">
        <div className="relative bg-gradient-to-br from-[#0A0E2A] via-[#141B5C] to-[#2A3FA8] text-white rounded-3xl p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md overflow-hidden border border-[#3B4FD9]/30">
          {/* Background Decorative Tech Dots Mesh */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B4FD9_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Have a project in mind?
            </h3>
            <p className="text-xs sm:text-sm text-[#B8BEDC]">
              Let's discuss how we can bring your software or AI product to life.
            </p>
          </div>
          <InteractiveButton
            variant="primary"
            glow={true}
            onClick={() => onNavigate('/contact')}
            className="relative z-10 whitespace-nowrap"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </InteractiveButton>
        </div>
      </ScrollReveal>
    </motion.div>
  );
};
