import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/siteData';

interface PortfolioPreviewProps {
  onNavigate: (path: string) => void;
}

export const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ onNavigate }) => {
  const portfolioItems = PORTFOLIO_DATA.slice(0, 3); // 3 featured projects

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-[#FF5A1F]/5 via-[#D97706]/3 to-transparent rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight">
            Work That Speaks for <span className="text-[#FF5A1F]">Itself</span>
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-[#6B6660] max-w-2xl mx-auto leading-relaxed">
            Explore a selection of products, prototypes and digital experiences built by our team.
          </p>
        </motion.div>

        {/* 3 Horizontal Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {portfolioItems.map((item, idx) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => onNavigate(`/portfolio/${item.slug}`)}
              className="bg-white rounded-2xl sm:rounded-3xl border border-[#EDE9E4] hover:border-[#FF5A1F]/40 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer text-left relative"
            >
              <div>
                {/* Window Accent Header */}
                <div className="px-4 py-2.5 bg-[#FAF8F6] border-b border-[#EDE9E4] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                  </div>
                  <div className="text-[10px] font-mono text-[#8C867F] px-2 py-0.5 rounded bg-white border border-[#EDE9E4]/60">
                    {item.name}
                  </div>
                  <div className="text-[9px] font-extrabold uppercase tracking-wider text-[#FF5A1F]">
                    {item.projectType}
                  </div>
                </div>

                {/* Cover Image Container */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#FAF8F6]">
                  <img
                    src={item.coverImage}
                    alt={item.title}
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
                        className="text-[10px] font-bold text-[#6B6660] bg-[#FAF8F6] px-2.5 py-0.5 rounded-md border border-[#EDE9E4] group-hover:border-[#FF5A1F]/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-extrabold text-[#111111] group-hover:text-[#FF5A1F] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-[#6B6660] leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Bottom Action Line */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#EDE9E4]/80 flex items-center justify-between">
                <span className="text-xs font-bold text-[#FF5A1F] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>

                <div className="w-7 h-7 rounded-full bg-[#FAF8F6] border border-[#EDE9E4] flex items-center justify-center text-[#6B6660] group-hover:text-[#FF5A1F] group-hover:border-[#FF5A1F]/30 transition-all">
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="pt-2 sm:pt-4 flex justify-center"
        >
          <button
            onClick={() => onNavigate('/portfolio')}
            className="inline-flex items-center gap-2 bg-[#111111] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-bold hover:bg-[#262626] hover:shadow-lg transition-all group active:scale-95 shadow-sm"
          >
            <span>View All Work</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
