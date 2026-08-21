import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Globe, LayoutGrid, Smartphone, Cpu, Server, TrendingUp, Check } from 'lucide-react';
import { MANAGED_SYSTEMS_CATEGORIES } from '../../data/pricingData';

export const ManagedSystems: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Globe': return <Globe className="w-5 h-5 text-[#FF5A1F]" />;
      case 'LayoutGrid': return <LayoutGrid className="w-5 h-5 text-[#FF5A1F]" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-[#FF5A1F]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#FF5A1F]" />;
      case 'Server': return <Server className="w-5 h-5 text-[#FF5A1F]" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-[#FF5A1F]" />;
      default: return <Sparkles className="w-5 h-5 text-[#FF5A1F]" />;
    }
  };

  return (
    <section className="px-4 sm:px-6 max-w-6xl mx-auto space-y-6 sm:space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WHAT WE MANAGE & SUPPORT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111111] tracking-tight">
          Systems We Maintain, Improve and Scale
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#6B6660]">
          Bring your existing tech assets. We provide ongoing support across your entire digital stack.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {MANAGED_SYSTEMS_CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.num}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.07 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-[#EDE9E4] hover:border-[#FF5A1F]/40 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between text-left space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  {getIcon(cat.iconName)}
                </div>
                <span className="text-xs font-extrabold text-[#8C867F]">{cat.num}</span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#111111] group-hover:text-[#FF5A1F] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#8C867F] font-medium">{cat.tagline}</p>
              </div>

              <ul className="space-y-1.5 text-xs text-[#111111] pt-2 border-t border-[#EDE9E4]/60">
                {cat.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
