import React from 'react';
import { motion } from 'motion/react';
import { Zap, Brain, Users2, Rocket, Sparkles, CheckCircle2 } from 'lucide-react';

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
    icon: <Zap className="w-5 h-5 text-[#FF5A1F]" />,
    color: '#FF5A1F',
    lightBg: '#FFF6F0',
  },
  {
    number: '02',
    ribbonLabel: 'CLEAN ARCHITECTURE',
    title: 'Engineering-Led Development',
    desc: 'Clean architecture, maintainable code and thoughtful technology choices from the foundation up.',
    icon: <Brain className="w-5 h-5 text-[#D97706]" />,
    color: '#D97706',
    lightBg: '#FFFBEB',
  },
  {
    number: '03',
    ribbonLabel: 'ZERO MIDDLEMEN',
    title: 'Direct Collaboration',
    desc: 'Work directly with the people building your product, with clear communication throughout the process.',
    icon: <Users2 className="w-5 h-5 text-[#B84A1F]" />,
    color: '#B84A1F',
    lightBg: '#FFF7F2',
  },
  {
    number: '04',
    ribbonLabel: 'FUTURE-PROOF SCALE',
    title: 'Built to Grow',
    desc: 'We design products with the future in mind, so your software can evolve as your business grows.',
    icon: <Rocket className="w-5 h-5 text-[#9A3B12]" />,
    color: '#9A3B12',
    lightBg: '#FFF5F0',
  },
];

export const WhyAlphaSection: React.FC<WhyAlphaSectionProps> = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle Warm Ambient Background Highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#FF5A1F]/5 via-[#D97706]/3 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12 relative z-10">
        {/* Centered Editorial Heading Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why Partner With Us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight">
            Why <span className="text-[#FF5A1F]">Alpha AI Services?</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl font-bold text-[#111111] leading-snug">
            Technology is easy to build. Building it right is what matters.
          </p>
          <p className="text-xs sm:text-sm md:text-base text-[#6B6660] max-w-2xl mx-auto leading-relaxed">
            We combine AI, software engineering and product thinking to build solutions that are practical, scalable and designed around your goals.
          </p>
        </motion.div>

        {/* 2x2 Grid of 3D Layered Numbered Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {REASONS.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#EDE9E4] hover:border-[#FF5A1F]/40 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-default text-left"
            >
              {/* Subtle Ambient Gradient Corner Glow */}
              <div
                className="absolute top-0 right-0 w-36 h-36 rounded-full blur-[45px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: item.color }}
              />

              {/* Large Subtle Watermark Number in Background */}
              <span
                className="absolute -bottom-3 right-3 text-7xl sm:text-8xl font-black opacity-[0.06] group-hover:opacity-[0.12] transition-opacity select-none pointer-events-none"
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
                  className="w-11 h-11 rounded-2xl bg-[#FAF8F6] border border-[#EDE9E4] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xs"
                  style={{ borderColor: `${item.color}30` }}
                >
                  {item.icon}
                </div>
              </div>

              {/* Content Block */}
              <div className="space-y-2 relative z-10 my-1">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-black tracking-wider uppercase"
                    style={{ color: item.color }}
                  >
                    REASON {item.number}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-[#111111] group-hover:text-[#FF5A1F] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#6B6660] leading-relaxed">
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
            </motion.div>
          ))}
        </div>

        {/* Small Trust Strip / Commitment Line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="pt-4 sm:pt-6 border-t border-[#EDE9E4] text-center space-y-2.5"
        >
          <div className="text-[11px] sm:text-xs font-extrabold text-[#111111] uppercase tracking-wider flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span>Our Quality Commitment</span>
          </div>
          <p className="text-xs sm:text-sm text-[#6B6660] font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>Clear Scope</span>
            <span className="text-[#FF5A1F] font-bold">·</span>
            <span>Transparent Communication</span>
            <span className="text-[#FF5A1F] font-bold">·</span>
            <span>Secure Development</span>
            <span className="text-[#FF5A1F] font-bold">·</span>
            <span>Long-Term Support</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
