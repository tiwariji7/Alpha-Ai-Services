import React from 'react';
import { X as Cross, ArrowRight, ShieldAlert } from 'lucide-react';

interface ScopeExclusionsProps {
  onOpenScheduleModal: (topic?: string) => void;
}

export const ScopeExclusions: React.FC<ScopeExclusionsProps> = ({
  onOpenScheduleModal,
}) => {
  const exclusions = [
    'New large-scale websites from scratch',
    'New mobile apps from scratch',
    'New SaaS products & platforms',
    'New ERP / complex custom systems',
    'Major software architectural rewrites',
    'Enterprise infrastructure migrations',
    'Unlimited development hours',
    'Paid advertising campaigns (Google/Meta)',
    'Third-party software subscriptions',
    'Direct cloud & API usage charges',
  ];

  return (
    <section className="px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="relative bg-[#111111] border border-[#2A2A2A] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 text-white text-left shadow-soft-lg overflow-hidden space-y-8">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#FF5A1F]/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/20 border border-[#FF5A1F]/30 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>SCOPE INTEGRITY</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Clear Scope. <span className="text-[#FF5A1F]">No Surprises.</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
            Monthly plans are designed for ongoing maintenance, improvements and technical support of existing systems. Completely new or large-scale products are scoped and delivered separately.
          </p>
        </div>

        {/* Exclusions Grid */}
        <div className="relative z-10 bg-[#1A1A1A] rounded-2xl p-5 sm:p-6 border border-[#2E2E2E] space-y-4">
          <div className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
            NOT INCLUDED IN MONTHLY RETAINERS:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {exclusions.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-300">
                <Cross className="w-4 h-4 text-red-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to Standalone Project */}
        <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-white/10">
          <div className="text-xs sm:text-sm text-gray-300">
            Building a brand new website, mobile app, or SaaS platform from scratch?
          </div>
          <button
            onClick={() => onOpenScheduleModal('New Standalone Project Quote')}
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#FF5A1F] text-white hover:bg-[#e04c15] hover:shadow-[0_6px_20px_rgba(255,90,31,0.35)] transition-all flex items-center justify-center gap-2 group active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>Need Something Bigger? Get a Project Quote</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
