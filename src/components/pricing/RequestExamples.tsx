import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageSquareCode, CheckCircle2, ArrowRight } from 'lucide-react';
import { REQUEST_EXAMPLES } from '../../data/pricingData';

interface RequestExamplesProps {
  onOpenScheduleModal: (topic?: string) => void;
}

export const RequestExamples: React.FC<RequestExamplesProps> = ({
  onOpenScheduleModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All Requests' },
    { id: 'web', label: 'Web & UI' },
    { id: 'integrations', label: 'APIs & Integrations' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'infrastructure', label: 'Hosting & Speed' },
  ];

  const getFilteredExamples = () => {
    if (activeFilter === 'web') {
      return REQUEST_EXAMPLES.filter((_, i) => [0, 1, 5, 12, 14].includes(i));
    }
    if (activeFilter === 'integrations') {
      return REQUEST_EXAMPLES.filter((_, i) => [2, 3, 7, 8, 11].includes(i));
    }
    if (activeFilter === 'ai') {
      return REQUEST_EXAMPLES.filter((_, i) => [9, 15].includes(i));
    }
    if (activeFilter === 'infrastructure') {
      return REQUEST_EXAMPLES.filter((_, i) => [4, 6, 10, 13].includes(i));
    }
    return REQUEST_EXAMPLES;
  };

  return (
    <section className="px-4 sm:px-6 max-w-6xl mx-auto space-y-6 sm:space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>REAL-WORLD SPRINT TASKS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151235] tracking-tight">
          What Can You Ask Us To Improve?
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#5B5876]">
          Here are examples of common requests, tickets, and improvements handled in monthly sprints.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeFilter === f.id
                ? 'bg-gradient-to-r from-[#3B4FD9] to-[#7B5CE8] text-white shadow-2xs'
                : 'bg-white text-[#5B5876] border border-[#EDEAFB] hover:bg-[#F6F5FC]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Examples Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        {getFilteredExamples().map((req, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: idx * 0.03 }}
            onClick={() => onOpenScheduleModal(`Request Improvement: "${req}"`)}
            className="p-4 rounded-2xl bg-white border border-[#EDEAFB] hover:border-[#3B4FD9]/50 hover:shadow-soft transition-all text-left flex items-start gap-3 group cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-[#EDEAFB] text-[#5B4FE0] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#3B4FD9] group-hover:text-white transition-colors">
              <MessageSquareCode className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-[#151235] group-hover:text-[#3B4FD9] transition-colors leading-snug">
                "{req}"
              </p>
              <span className="text-[10px] text-[#5B5876] font-medium block">
                Click to request this item →
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
