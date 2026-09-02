import React from 'react';
import { Sparkles, Globe, Smartphone, Cpu, Repeat, Server, TrendingUp, ArrowRight } from 'lucide-react';

export const PremiumPartnership: React.FC = () => {
  const stackNodes = [
    { title: 'Website', sub: 'Marketing & SEO', icon: <Globe className="w-4 h-4 text-[#7DE8FF]" /> },
    { title: 'Apps', sub: 'Web & Mobile', icon: <Smartphone className="w-4 h-4 text-[#3B4FD9]" /> },
    { title: 'AI', sub: 'LLMs & Bots', icon: <Cpu className="w-4 h-4 text-[#5EEAD4]" /> },
    { title: 'Automation', sub: 'Workflows & APIs', icon: <Repeat className="w-4 h-4 text-[#4D6BFF]" /> },
    { title: 'Cloud', sub: 'Hosting & Security', icon: <Server className="w-4 h-4 text-[#7DE8FF]" /> },
    { title: 'Growth', sub: 'Analytics & Social', icon: <TrendingUp className="w-4 h-4 text-[#5B4FE0]" /> },
  ];

  return (
    <section className="px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="relative bg-gradient-to-br from-[#0A0E2A] via-[#141B5C] to-[#2A3FA8] border border-[#3B4FD9]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 text-white text-center shadow-soft-lg overflow-hidden space-y-8">
        {/* Background Decorative Tech Dots Mesh */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B4FD9_1px,transparent_1px)] [background-size:16px_16px]" />
        {/* Ambient Royal Blue Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[260px] bg-[#3B4FD9]/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1442] border border-[#3B4FD9]/40 text-[#7DE8FF] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#7DE8FF]" />
            <span>UNIFIED ARCHITECTURE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            One Partner. <span className="text-[#7DE8FF]">Your Entire Digital Stack.</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#B8BEDC] leading-relaxed max-w-2xl mx-auto">
            Instead of coordinating a developer, designer, hosting provider, social media manager and AI specialist separately, Alpha AI Services can become your single technology partner.
          </p>
        </div>

        {/* Connected Visual Diagram */}
        <div className="relative z-10 pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {stackNodes.map((node, idx) => (
              <div key={idx} className="relative group">
                <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-[#3B4FD9]/20 hover:border-[#7DE8FF]/60 transition-all flex flex-col items-center justify-center space-y-2 text-center shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#3B4FD9]/10 border border-[#3B4FD9]/20 flex items-center justify-center">
                    {node.icon}
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-white">{node.title}</div>
                    <div className="text-[10px] text-[#B8BEDC] font-medium">{node.sub}</div>
                  </div>
                </div>

                {/* Connector arrow on desktop */}
                {idx < stackNodes.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-[#7DE8FF]/40">
                    <ArrowRight className="w-3.5 h-3.5 text-[#7DE8FF]/60" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-2 text-center text-xs text-[#B8BEDC]">
          Everything managed seamlessly through one structured monthly retainer.
        </div>
      </div>
    </section>
  );
};
