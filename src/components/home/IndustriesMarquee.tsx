import React from 'react';
import { motion } from 'motion/react';
import {
  Landmark,
  HeartPulse,
  Stethoscope,
  ShoppingBag,
  Layers,
  Building2,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';

interface IndustriesMarqueeProps {
  onNavigate: (path: string) => void;
}

interface IndustryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const INDUSTRIES_LIST: IndustryItem[] = [
  {
    id: 'fintech',
    name: 'Fintech & Finance',
    icon: <Landmark className="w-4 h-4 text-emerald-600" />,
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: <HeartPulse className="w-4 h-4 text-rose-500" />,
  },
  {
    id: 'medtech',
    name: 'MedTech',
    icon: <Stethoscope className="w-4 h-4 text-blue-500" />,
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    icon: <ShoppingBag className="w-4 h-4 text-amber-500" />,
  },
  {
    id: 'saas-tech',
    name: 'B2B SaaS & Tech',
    icon: <Layers className="w-4 h-4 text-purple-500" />,
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: <Building2 className="w-4 h-4 text-sky-500" />,
  },
  {
    id: 'education',
    name: 'Education',
    icon: <GraduationCap className="w-4 h-4 text-[#FF5A1F]" />,
  },
];

export const IndustriesMarquee: React.FC<IndustriesMarqueeProps> = ({ onNavigate }) => {
  // Duplicate array 4 times for seamless infinite loop
  const marqueeItems = [
    ...INDUSTRIES_LIST,
    ...INDUSTRIES_LIST,
    ...INDUSTRIES_LIST,
    ...INDUSTRIES_LIST,
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Centered Heading Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 mb-8 sm:mb-12"
        >
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF5A1F]">
            Domain Specialization
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight">
            Industries We <span className="text-[#FF5A1F]">Empower</span>
          </h2>
          <div className="pt-1">
            <button
              onClick={() => onNavigate('/company/industries')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#111111] hover:text-[#FF5A1F] transition-colors group"
            >
              <span>View All Industry Solutions</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right-to-Left Continuous Scrolling Marquee */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max gap-3.5 sm:gap-4 py-2 animate-marquee hover:[animation-play-state:paused]">
          {marqueeItems.map((ind, idx) => (
            <div
              key={`${ind.id}-${idx}`}
              onClick={() => onNavigate('/company/industries')}
              className="bg-white rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 border border-[#EDE9E4] shadow-soft hover:shadow-soft-lg hover:border-[#FF5A1F]/40 transition-all cursor-pointer flex items-center gap-3 shrink-0 group select-none"
            >
              <div className="w-8 h-8 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] flex items-center justify-center group-hover:bg-white group-hover:border-[#FF5A1F]/20 group-hover:scale-110 transition-all shadow-xs">
                {ind.icon}
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#111111] group-hover:text-[#FF5A1F] transition-colors whitespace-nowrap">
                {ind.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
