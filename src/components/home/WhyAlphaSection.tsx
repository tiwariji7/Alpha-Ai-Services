import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Zap, Brain, Users2, Rocket, Sparkles, CheckCircle2 } from 'lucide-react';
import { FlowingHeading } from '../common/FlowingHeading';
import { ModernCard } from '../common/ModernCard';
import { ScrollReveal } from '../common/ScrollReveal';

interface WhyAlphaSectionProps {
  onNavigate?: (path: string) => void;
}

interface ReasonBanner {
  number: string;
  ribbonLabel: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  lightBg: string;
}

const REASONS: ReasonBanner[] = [
  {
    number: '01',
    ribbonLabel: 'VALUE-DRIVEN AI',
    title: 'AI-First Thinking',
    desc: 'We identify where AI can create real value — not where it simply looks impressive.',
    icon: <Zap className="w-5 h-5 text-[#3B4FD9]" />,
    color: '#3B4FD9',
    lightBg: '#EDEAFB',
  },
  {
    number: '02',
    ribbonLabel: 'CLEAN ARCHITECTURE',
    title: 'Engineering-Led Development',
    desc: 'Clean architecture, maintainable code and thoughtful technology choices from the foundation up.',
    icon: <Brain className="w-5 h-5 text-[#2A3FA8]" />,
    color: '#2A3FA8',
    lightBg: '#EDEAFB',
  },
  {
    number: '03',
    ribbonLabel: 'ZERO MIDDLEMEN',
    title: 'Direct Collaboration',
    desc: 'Work directly with the people building your product, with clear communication throughout the process.',
    icon: <Users2 className="w-5 h-5 text-[#5B4FE0]" />,
    color: '#5B4FE0',
    lightBg: '#EDEAFB',
  },
  {
    number: '04',
    ribbonLabel: 'FUTURE-PROOF SCALE',
    title: 'Built to Grow',
    desc: 'We design products with the future in mind, so your software can evolve as your business grows.',
    icon: <Rocket className="w-5 h-5 text-[#7B5CE8]" />,
    color: '#7B5CE8',
    lightBg: '#EDEAFB',
  },
];

export const WhyAlphaSection: React.FC<WhyAlphaSectionProps> = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle Blue Ambient Background Highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#3B4FD9]/8 via-[#7B5CE8]/4 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12 relative z-10">
        {/* Centered Editorial Heading Block */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
          <ScrollReveal variant="fadeScale">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why Partner With Us</span>
            </div>
          </ScrollReveal>

          <FlowingHeading
            as="h2"
            text="Why Alpha AI Services?"
            highlightWords={['Alpha', 'AI', 'Services?']}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151235] tracking-tight justify-center"
          />

          <ScrollReveal variant="fadeUp" delay={0.08}>
            <p className="text-base sm:text-lg lg:text-xl font-bold text-[#151235] leading-snug">
              Technology is easy to build. Building it right is what matters.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.15}>
            <p className="text-xs sm:text-sm md:text-base text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
              We combine AI, software engineering and product thinking to build solutions that are practical, scalable and designed around your goals.
            </p>
          </ScrollReveal>
        </div>

        {/* 2x2 Grid of 3D Layered Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {REASONS.map((item, idx) => (
            <ModernCard
              key={item.number}
              variant="white"
              accentColor={item.color}
              delay={idx * 0.08}
              className="p-6 sm:p-7 flex flex-col justify-between"
            >
              {/* Subtle Ambient Gradient Corner Glow */}
              <div
                className="absolute top-0 right-0 w-36 h-36 rounded-full blur-[45px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: item.color }}
              />

              {/* Large Subtle Watermark Number in Background */}
              <span
                className="absolute -bottom-3 right-3 text-7xl sm:text-8xl font-black opacity-[0.06] group-hover:opacity-[0.12] transition-opacity select-none pointer-events-none font-mono"
                style={{ color: item.color }}
              >
                {item.number}
              </span>

              {/* Top Header: Badge Label & Floating Isometric Icon Badge */}
              <div className="flex items-start justify-between mb-4 relative z-10">
                <span
                  className="text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full border shadow-2xs"
                  style={{
                    color: item.color,
                    borderColor: `${item.color}35`,
                    backgroundColor: item.lightBg,
                  }}
                >
                  {item.ribbonLabel}
                </span>

                <div
                  className="w-11 h-11 rounded-2xl bg-[#EDEAFB] border border-[#7B5CE8]/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xs"
                  style={{ borderColor: `${item.color}30` }}
                >
                  {item.icon}
                </div>
              </div>

              {/* Content Block */}
              <div className="space-y-2 relative z-10 my-1">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-black tracking-wider uppercase font-mono"
                    style={{ color: item.color }}
                  >
                    REASON {item.number}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-[#151235] group-hover:text-[#3B4FD9] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5B5876] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Subtle Colored Accent Bar */}
              <div className="pt-4 mt-2 relative z-10">
                <div
                  className="h-1 rounded-full w-12 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </ModernCard>
          ))}
        </div>

        {/* Small Trust Strip / Commitment Line */}
        <ScrollReveal variant="fadeUp" delay={0.25}>
          <div className="pt-4 sm:pt-6 border-t border-[#EDEAFB] text-center space-y-2.5">
            <div className="text-[11px] sm:text-xs font-extrabold text-[#151235] uppercase tracking-wider flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3B4FD9]" />
              <span>Our Quality Commitment</span>
            </div>
            <p className="text-xs sm:text-sm text-[#5B5876] font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span>Clear Scope</span>
              <span className="text-[#3B4FD9] font-bold">·</span>
              <span>Transparent Communication</span>
              <span className="text-[#3B4FD9] font-bold">·</span>
              <span>Secure Development</span>
              <span className="text-[#3B4FD9] font-bold">·</span>
              <span>Long-Term Support</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
