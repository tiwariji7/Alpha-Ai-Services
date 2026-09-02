import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Globe, LayoutGrid, Smartphone, Cpu, Server, TrendingUp, Check } from 'lucide-react';
import { MANAGED_SYSTEMS_CATEGORIES } from '../../data/pricingData';

export const ManagedSystems: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Globe': return <Globe className="w-5 h-5 text-[#3B4FD9]" />;
      case 'LayoutGrid': return <LayoutGrid className="w-5 h-5 text-[#2A3FA8]" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-[#4D6BFF]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#5B4FE0]" />;
      case 'Server': return <Server className="w-5 h-5 text-[#7B5CE8]" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-[#3B4FD9]" />;
      default: return <Sparkles className="w-5 h-5 text-[#3B4FD9]" />;
    }
  };

  return (
    <section className="px-4 sm:px-6 max-w-6xl mx-auto space-y-6 sm:space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WHAT WE MANAGE & SUPPORT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151235] tracking-tight">
          Systems We Maintain, Improve and Scale
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#5B5876]">
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
            className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-[#EDEAFB] hover:border-[#3B4FD9]/40 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between text-left space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#EDEAFB] border border-[#7B5CE8]/20 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  {getIcon(cat.iconName)}
                </div>
                <span className="text-xs font-extrabold text-[#5B5876]">{cat.num}</span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#151235] group-hover:text-[#3B4FD9] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#5B5876] font-medium">{cat.tagline}</p>
              </div>

              <ul className="space-y-1.5 text-xs text-[#151235] pt-2 border-t border-[#EDEAFB]">
                {cat.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#3B4FD9] shrink-0" />
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
