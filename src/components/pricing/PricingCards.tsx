import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, X as Cross, ArrowRight, Sparkles, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';
import { PRICING_PLANS } from '../../data/pricingData';

interface PricingCardsProps {
  onOpenScheduleModal: (topic?: string) => void;
}

export const PricingCards: React.FC<PricingCardsProps> = ({
  onOpenScheduleModal,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [expandedMobile, setExpandedMobile] = useState<Record<string, boolean>>({
    starter: false,
    growth: false,
    partner: false,
  });

  const toggleMobileExpand = (id: string) => {
    setExpandedMobile((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="pricing-cards-section" className="px-4 sm:px-6 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>MONTHLY RETAINER PLANS</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
          Transparent, Predictable Monthly Retainers
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#6B6660]">
          Ongoing engineering support for existing websites, applications, AI and digital systems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
        {PRICING_PLANS.map((plan, idx) => {
          const isPopular = plan.popular;
          const isExpanded = expandedMobile[plan.id];

          return (
            <motion.div
              key={plan.id}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left relative transition-all duration-300 ${
                isPopular
                  ? 'border-2 border-[#FF5A1F] shadow-[0_16px_45px_rgba(255,90,31,0.12)] lg:-translate-y-2 z-10'
                  : 'border border-[#EDE9E4] hover:border-[#111111]/30 shadow-soft hover:shadow-soft-lg'
              }`}
            >
              {/* Most Popular Badge */}
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF5A1F] text-white px-4 py-1 rounded-full text-[11px] font-extrabold shadow-md uppercase tracking-wider">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-6">
                {/* Header info */}
                <div className="space-y-2 border-b border-[#EDE9E4] pb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF5A1F]">
                      {plan.label}
                    </span>
                    {!isPopular && plan.badge && (
                      <span className="bg-[#111111] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                    {plan.name}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#6B6660] leading-relaxed min-h-[38px]">
                    {plan.description}
                  </p>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-xs text-[#8C867F] font-semibold">{plan.period}</span>
                    </div>
                  </div>
                </div>

                {/* Included Section */}
                <div className="space-y-3.5">
                  <div className="text-xs font-extrabold text-[#111111] uppercase tracking-wider">
                    {plan.includedHeader}
                  </div>

                  <ul className="space-y-2 text-xs sm:text-[13px] text-[#111111]">
                    {plan.included.slice(0, isExpanded ? undefined : 6).map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 leading-snug">
                        <div className="w-4 h-4 rounded-full bg-[#FF5A1F]/10 text-[#FF5A1F] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className={item.includes('Dedicated Engineer') || item.includes('3-Person Engineering Team') || item.includes('Direct engineer') ? 'font-bold text-[#111111]' : ''}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.included.length > 6 && (
                    <button
                      onClick={() => toggleMobileExpand(plan.id)}
                      className="text-xs font-bold text-[#FF5A1F] hover:underline flex items-center gap-1 cursor-pointer pt-1"
                    >
                      <span>{isExpanded ? 'Show fewer items' : `+ ${plan.included.length - 6} more included capabilities`}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>

                {/* Examples of Requests / Improvements */}
                {(plan.smallImprovements || plan.examples) && (
                  <div className="bg-[#FAF8F6] p-3.5 rounded-2xl border border-[#EDE9E4] space-y-2">
                    <div className="text-[11px] font-bold text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#FF5A1F]" />
                      <span>Examples of Monthly Requests:</span>
                    </div>
                    <ul className="space-y-1 text-xs text-[#6B6660]">
                      {(plan.smallImprovements || plan.examples || []).slice(0, 4).map((ex, exIdx) => (
                        <li key={exIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 text-[#FF5A1F] shrink-0 mt-0.5" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Not Included Area */}
                <div className="bg-[#FAF8F6] p-3.5 rounded-2xl border border-[#EDE9E4] space-y-1.5">
                  <div className="text-[11px] font-bold text-[#8C867F] uppercase tracking-wider">
                    NOT INCLUDED IN MONTHLY PLAN:
                  </div>
                  <ul className="space-y-1 text-[11px] text-[#8C867F]">
                    {plan.notIncluded.slice(0, 4).map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2">
                        <Cross className="w-3 h-3 text-gray-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Important Scope Concept Note */}
                {plan.scopeConcept && (
                  <p className="text-[11px] text-[#8C867F] italic leading-tight pt-0.5">
                    {plan.scopeConcept}
                  </p>
                )}
              </div>

              {/* Bottom CTA & Note */}
              <div className="pt-6 mt-6 border-t border-[#EDE9E4] space-y-3">
                <button
                  onClick={() => onOpenScheduleModal(`${plan.name} Plan (${plan.price}/mo)`)}
                  className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 group active:scale-95 cursor-pointer ${
                    isPopular
                      ? 'bg-[#FF5A1F] text-white hover:bg-[#e04c15] shadow-md hover:shadow-[0_8px_24px_rgba(255,90,31,0.35)]'
                      : 'bg-[#111111] text-white hover:bg-[#262626] shadow-2xs'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-[11px] text-[#8C867F] text-center leading-tight">
                  {plan.note}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
