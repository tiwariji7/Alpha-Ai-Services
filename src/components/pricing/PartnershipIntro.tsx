import React from 'react';
import { motion } from 'motion/react';
import { Layers, Wrench, TrendingUp, Sparkles } from 'lucide-react';

export const PartnershipIntro: React.FC = () => {
  const pillars = [
    {
      step: '01',
      title: 'Maintain & Support',
      desc: 'Keep your existing digital systems running, secure, updated and bug-free.',
      icon: <Layers className="w-5 h-5 text-[#FF5A1F]" />,
      detail: 'Continuous uptime monitoring, bug fixing, hosting support, SSL management, security checks, and mobile layout fixes.',
    },
    {
      step: '02',
      title: 'Improve & Add Features',
      desc: 'Regularly add new features, pages, workflows and integrations to existing systems.',
      icon: <Wrench className="w-5 h-5 text-[#FF5A1F]" />,
      detail: 'Add website sections, landing pages, booking forms, payment gateways, CRM connections, and web/app improvements.',
    },
    {
      step: '03',
      title: 'Optimize & Grow',
      desc: 'Enhance performance, add AI capabilities, and streamline automations.',
      icon: <TrendingUp className="w-5 h-5 text-[#FF5A1F]" />,
      detail: 'Speed optimization, database tuning, SEO maintenance, AI chatbot integrations, and repetitive workflow automation.',
    },
  ];

  return (
    <section className="px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#EDE9E4] shadow-soft text-left space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HOW THE PARTNERSHIP WORKS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111111] tracking-tight">
            More Than a Service. <span className="text-[#FF5A1F]">A Long-Term Technical Partner.</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#6B6660] leading-relaxed">
            Instead of hiring developers, designers and technical specialists separately, work with Alpha AI Services through a predictable monthly technology partnership designed to maintain and improve your existing systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#FAF8F6] p-5 sm:p-6 rounded-2xl border border-[#EDE9E4] hover:border-[#FF5A1F]/40 transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#EDE9E4] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  {pillar.icon}
                </div>
                <span className="text-xs font-extrabold text-[#8C867F] tracking-widest uppercase">
                  {pillar.step}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-extrabold text-[#111111] group-hover:text-[#FF5A1F] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#111111] leading-snug">
                  {pillar.desc}
                </p>
                <p className="text-xs text-[#6B6660] leading-relaxed pt-1">
                  {pillar.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
