import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/siteData';
import { pageTransition } from '../utils/motion';

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
      className="pt-4 pb-16 sm:pt-6 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-12"
    >
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight">
          Work That Speaks for <span className="text-[#FF5A1F]">Itself</span>
        </h1>

        <p className="text-[#6B6660] text-sm sm:text-base md:text-lg leading-relaxed">
          Explore a selection of products, prototypes and digital experiences built by our team.
        </p>

        {/* Filter Pills */}
        <div className="pt-2 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                selectedFilter === cat
                  ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                  : 'bg-white text-[#6B6660] border-[#EDE9E4] hover:bg-[#FAF8F6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={() => onNavigate(`/portfolio/${item.slug}`)}
            className="bg-white rounded-3xl overflow-hidden border border-[#EDE9E4] hover:border-[#FF5A1F]/30 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group text-left"
          >
            {/* Image */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-gray-100">
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold text-[#111111] border border-[#EDE9E4] shadow-xs">
                {item.name}
              </div>
              <div className="absolute top-3.5 right-3.5 bg-[#111111]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-xs">
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
                      className="px-2.5 py-0.5 rounded-md bg-[#FAF8F6] text-[10px] font-bold text-[#6B6660] border border-[#EDE9E4]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-[#111111] group-hover:text-[#FF5A1F] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#6B6660] leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EDE9E4]/80 flex items-center justify-between">
                <span className="text-xs font-bold text-[#FF5A1F] inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Have a project in mind?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300">
            Let's discuss how we can bring your software or AI product to life.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/contact')}
          className="bg-[#FF5A1F] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold hover:bg-[#e04c15] transition-all whitespace-nowrap active:scale-95 shadow-md"
        >
          Start Your Project →
        </button>
      </div>
    </motion.div>
  );
};
