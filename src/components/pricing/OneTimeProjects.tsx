import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Check, FileCode2 } from 'lucide-react';
import { ONE_TIME_PROJECTS } from '../../data/pricingData';

interface OneTimeProjectsProps {
  onOpenScheduleModal: (topic?: string) => void;
}

export const OneTimeProjects: React.FC<OneTimeProjectsProps> = ({
  onOpenScheduleModal,
}) => {
  return (
    <section className="px-4 sm:px-6 max-w-6xl mx-auto space-y-6 sm:space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>STANDALONE DEVELOPMENT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111111] tracking-tight">
          Need Something Built From Scratch?
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#6B6660] max-w-2xl mx-auto">
          If you don't already have a digital product, or you need a major new system, we'll scope it as a separate project.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {ONE_TIME_PROJECTS.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-[#EDE9E4] hover:border-[#FF5A1F]/40 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between text-left space-y-5 group"
          >
            <div className="space-y-4">
              <div className="space-y-1.5 border-b border-[#EDE9E4] pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold text-[#111111] group-hover:text-[#FF5A1F] transition-colors">
                    {proj.title}
                  </h3>
                  <FileCode2 className="w-4 h-4 text-[#8C867F] group-hover:text-[#FF5A1F] transition-colors" />
                </div>
                <div className="text-sm font-extrabold text-[#FF5A1F]">
                  {proj.price}
                </div>
              </div>

              <p className="text-xs text-[#6B6660] leading-relaxed min-h-[36px]">
                {proj.description}
              </p>

              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-bold text-[#111111] uppercase tracking-wider">
                  Key Deliverables:
                </div>
                <ul className="space-y-1.5 text-xs text-[#111111]">
                  {proj.deliverables.map((del, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EDE9E4]/60">
              <button
                onClick={() => onOpenScheduleModal(`One-Time Project: ${proj.title}`)}
                className="w-full py-2.5 px-4 rounded-full text-xs font-bold bg-[#FAF8F6] text-[#111111] border border-[#EDE9E4] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center text-xs text-[#8C867F] italic pt-1">
        * Final pricing depends on project scope, custom architecture, database models, and third-party integrations.
      </div>
    </section>
  );
};
