import React from 'react';
import { Sparkles, Globe, Smartphone, Cpu, Repeat, Server, TrendingUp, ArrowRight } from 'lucide-react';

export const PremiumPartnership: React.FC = () => {
  const stackNodes = [
    { title: 'Website', sub: 'Marketing & SEO', icon: <Globe className="w-4 h-4 text-[#FF5A1F]" /> },
    { title: 'Apps', sub: 'Web & Mobile', icon: <Smartphone className="w-4 h-4 text-[#FF5A1F]" /> },
    { title: 'AI', sub: 'LLMs & Bots', icon: <Cpu className="w-4 h-4 text-[#FF5A1F]" /> },
    { title: 'Automation', sub: 'Workflows & APIs', icon: <Repeat className="w-4 h-4 text-[#FF5A1F]" /> },
    { title: 'Cloud', sub: 'Hosting & Security', icon: <Server className="w-4 h-4 text-[#FF5A1F]" /> },
    { title: 'Growth', sub: 'Analytics & Social', icon: <TrendingUp className="w-4 h-4 text-[#FF5A1F]" /> },
  ];

  return (
    <section className="px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="relative bg-[#111111] border border-[#2A2A2A] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 text-white text-center shadow-soft-lg overflow-hidden space-y-8">
        {/* Ambient Warm Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[260px] bg-[#FF5A1F]/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/20 border border-[#FF5A1F]/30 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UNIFIED ARCHITECTURE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            One Partner. <span className="text-[#FF5A1F]">Your Entire Digital Stack.</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Instead of coordinating a developer, designer, hosting provider, social media manager and AI specialist separately, Alpha AI Services can become your single technology partner.
          </p>
        </div>

        {/* Connected Visual Diagram */}
        <div className="relative z-10 pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {stackNodes.map((node, idx) => (
              <div key={idx} className="relative group">
                <div className="p-4 bg-[#1A1A1A] rounded-2xl border border-[#2E2E2E] hover:border-[#FF5A1F]/50 transition-all flex flex-col items-center justify-center space-y-2 text-center shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {node.icon}
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white">{node.title}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{node.sub}</div>
                  </div>
                </div>

                {/* Connector arrow on desktop */}
                {idx < stackNodes.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-gray-600">
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF5A1F]/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-2 text-center text-xs text-gray-400">
          Everything managed seamlessly through one structured monthly retainer.
        </div>
      </div>
    </section>
  );
};
