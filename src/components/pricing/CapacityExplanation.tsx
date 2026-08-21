import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageSquarePlus, ListFilter, Code2, ShieldCheck, Rocket, FileSpreadsheet, ArrowRight } from 'lucide-react';

export const CapacityExplanation: React.FC = () => {
  const steps = [
    { num: '01', title: 'REQUEST', desc: 'Submit tasks, feature requests, or bug reports', icon: <MessageSquarePlus className="w-4 h-4 text-[#FF5A1F]" /> },
    { num: '02', title: 'PRIORITIZE', desc: 'Agree on priority sprint queue for the cycle', icon: <ListFilter className="w-4 h-4 text-[#FF5A1F]" /> },
    { num: '03', title: 'BUILD / FIX', desc: 'Dedicated engineer executes the approved tasks', icon: <Code2 className="w-4 h-4 text-[#FF5A1F]" /> },
    { num: '04', title: 'TEST', desc: 'Quality assurance, staging verification & review', icon: <ShieldCheck className="w-4 h-4 text-[#FF5A1F]" /> },
    { num: '05', title: 'DEPLOY', desc: 'Live release to your server, app or website', icon: <Rocket className="w-4 h-4 text-[#FF5A1F]" /> },
    { num: '06', title: 'REPORT', desc: 'Monthly summary of completed work & next steps', icon: <FileSpreadsheet className="w-4 h-4 text-[#FF5A1F]" /> },
  ];

  return (
    <section className="px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#EDE9E4] shadow-soft text-left space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SPRINT WORKFLOW</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111111] tracking-tight">
            How Monthly Engineering Capacity Works
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#6B6660] leading-relaxed">
            Your monthly plan includes a defined amount of engineering capacity. At the beginning of each cycle, we prioritize the work that matters most to your business.
          </p>
        </div>

        {/* 6 Step Interactive Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
              className="bg-[#FAF8F6] p-4 rounded-2xl border border-[#EDE9E4] hover:border-[#FF5A1F]/40 transition-all flex flex-col justify-between space-y-3 group text-left"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#EDE9E4] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  {step.icon}
                </div>
                <span className="text-[10px] font-extrabold text-[#8C867F]">{step.num}</span>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-extrabold text-[#111111] tracking-wider">
                  {step.title}
                </div>
                <div className="text-[11px] text-[#6B6660] leading-snug">
                  {step.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clear Capacity Concept Explanation */}
        <div className="p-4 sm:p-5 bg-[#FAF8F6] rounded-2xl border border-[#EDE9E4] text-xs sm:text-[13px] text-[#6B6660] leading-relaxed flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-[#FF5A1F] shrink-0 mt-1.5" />
          <span>
            <strong className="text-[#111111]">Transparent Scope Management:</strong> Small improvements, continuous maintenance, bug fixing and technical support are handled seamlessly within your plan. Larger projects or major new applications outside monthly capacity are separately scoped so timelines and costs remain completely transparent.
          </span>
        </div>
      </div>
    </section>
  );
};
