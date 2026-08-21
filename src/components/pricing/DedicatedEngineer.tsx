import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, AlertCircle, Wrench, ShieldAlert, Workflow } from 'lucide-react';

export const DedicatedEngineer: React.FC = () => {
  const points = [
    {
      num: '01',
      title: 'UNDERSTANDS YOUR SYSTEM',
      desc: 'Becomes familiar with your codebase, databases, third-party integrations, and hosting setup. No need to repeatedly re-explain your stack.',
      icon: <Workflow className="w-5 h-5 text-[#FF5A1F]" />,
    },
    {
      num: '02',
      title: 'HANDLES TECHNICAL ISSUES',
      desc: 'Directly diagnoses and fixes bugs, deployment errors, responsive glitches, and server downtime with fast turnaround.',
      icon: <ShieldAlert className="w-5 h-5 text-[#FF5A1F]" />,
    },
    {
      num: '03',
      title: 'IMPLEMENTS PRIORITIZED IMPROVEMENTS',
      desc: 'Builds approved feature additions, connects new APIs, adds checkout forms, and optimizes speed on an agreed sprint schedule.',
      icon: <Wrench className="w-5 h-5 text-[#FF5A1F]" />,
    },
    {
      num: '04',
      title: 'HELPS PLAN WHAT COMES NEXT',
      desc: 'Provides practical architecture advice, tools recommendations, and monthly tech roadmaps so your business avoids expensive tech debt.',
      icon: <Compass className="w-5 h-5 text-[#FF5A1F]" />,
    },
  ];

  return (
    <section className="px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#EDE9E4] shadow-soft text-left space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ROLE CLARITY</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111111] tracking-tight">
            What Does a Dedicated Engineer Mean?
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#6B6660] leading-relaxed">
            Your engineer becomes familiar with your existing website, applications, integrations and technical requirements. Instead of repeatedly explaining your system to different freelancers, you have a consistent technical point of contact.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {points.map((pt, idx) => (
            <motion.div
              key={pt.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-[#FAF8F6] p-5 rounded-2xl border border-[#EDE9E4] space-y-3 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#EDE9E4] flex items-center justify-center shadow-2xs">
                  {pt.icon}
                </div>
                <span className="text-xs font-extrabold text-[#8C867F]">{pt.num}</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#111111] tracking-wide">
                  {pt.title}
                </h3>
                <p className="text-xs text-[#6B6660] leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Essential Realistic Boundary Callout */}
        <div className="p-4 sm:p-4.5 bg-[#FAF8F6] rounded-2xl border border-[#EDE9E4] flex items-start gap-3 text-xs sm:text-[13px] text-[#6B6660] leading-relaxed">
          <AlertCircle className="w-4 h-4 text-[#FF5A1F] shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#111111]">Important Capacity Note:</strong> Dedicated does not mean unlimited work. Tasks are handled within the agreed monthly capacity and prioritized sprint queue.
          </span>
        </div>
      </div>
    </section>
  );
};
