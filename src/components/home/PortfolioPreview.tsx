import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/siteData';
import { FlowingHeading } from '../common/FlowingHeading';
import { ModernCard } from '../common/ModernCard';
import { ScrollReveal } from '../common/ScrollReveal';
import { InteractiveButton } from '../common/InteractiveButton';

interface PortfolioPreviewProps {
  onNavigate: (path: string) => void;
}

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ onNavigate }) => {
  const portfolioItems = PORTFOLIO_DATA.slice(0, 3); // 3 featured projects

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-[#3B4FD9]/8 via-[#7B5CE8]/4 to-transparent rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
          <ScrollReveal variant="fadeScale">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Case Studies</span>
            </div>
          </ScrollReveal>

          <FlowingHeading
            as="h2"
            text="Work That Speaks for Itself"
            highlightWords={['Itself']}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151235] tracking-tight justify-center"
          />

          <ScrollReveal variant="fadeUp" delay={0.08}>
            <p className="text-xs sm:text-base md:text-lg text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
              Explore a selection of products, prototypes and digital experiences built by our team.
            </p>
          </ScrollReveal>
        </div>

        {/* 3 Horizontal Side-by-Side Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {portfolioItems.map((item, idx) => (
            <ModernCard
              key={item.slug}
              variant="white"
              delay={idx * 0.08}
              onClick={() => onNavigate(`/portfolio/${item.slug}`)}
              className="flex flex-col justify-between text-left"
            >
              <div>
                {/* Window Accent Header */}
                <div className="px-4 py-2.5 bg-[#F6F5FC] border-b border-[#EDEAFB] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
                  </div>
                  <div className="text-[10px] font-mono text-[#5B5876] px-2 py-0.5 rounded bg-white border border-[#EDEAFB] font-bold">
                    {item.name}
                  </div>
                  <div className="text-[9px] font-extrabold uppercase tracking-wider text-[#3B4FD9] font-mono">
                    {item.projectType}
                  </div>
                </div>

                {/* Cover Image Container */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#F6F5FC]">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    width="600"
                    height="340"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Details */}
                <div className="p-5 sm:p-6 space-y-3">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold text-[#5B4FE0] bg-[#EDEAFB] px-2.5 py-0.5 rounded-md border border-[#7B5CE8]/20 group-hover:border-[#3B4FD9]/30 transition-colors font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-extrabold text-[#151235] group-hover:text-[#3B4FD9] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-[#5B5876] leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Action Line */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#EDEAFB] flex items-center justify-between">
                <span className="text-xs font-bold text-[#3B4FD9] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>

                <div className="w-7 h-7 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/20 flex items-center justify-center text-[#5B4FE0] group-hover:text-[#3B4FD9] group-hover:border-[#3B4FD9]/40 transition-all">
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </ModernCard>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <ScrollReveal variant="fadeUp" delay={0.25}>
          <div className="pt-2 sm:pt-4 flex justify-center">
            <InteractiveButton
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/portfolio')}
            >
              <span>View All Work</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </InteractiveButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
