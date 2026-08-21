import React from 'react';
import { motion } from 'motion/react';
import {
  Bot,
  Code2,
  Globe,
  Smartphone,
  Cloud,
  ShieldCheck,
  Palette,
  Workflow,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface ServicesPreviewProps {
  onNavigate: (path: string) => void;
}

interface ServiceCardItem {
  number: string;
  stepLabel: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  lightBg: string;
  path: string;
}

const SERVICES_DATA: ServiceCardItem[] = [
  {
    number: '01',
    stepLabel: 'STEP',
    title: 'AI & Machine Learning',
    desc: 'Build intelligent systems that understand your data, automate decisions and assist your team.',
    icon: <Bot className="w-5 h-5" />,
    color: '#FF5A1F',
    lightBg: '#FFF6F0',
    path: '/services/ai-development',
  },
  {
    number: '02',
    stepLabel: 'STEP',
    title: 'Custom Software Engineering',
    desc: 'Purpose-built software engineered around your workflows, users and business requirements.',
    icon: <Code2 className="w-5 h-5" />,
    color: '#D97706',
    lightBg: '#FFFBEB',
    path: '/services/software-development',
  },
  {
    number: '03',
    stepLabel: 'STEP',
    title: 'Web Application Development',
    desc: 'Fast, responsive and scalable web applications designed for real users and real business needs.',
    icon: <Globe className="w-5 h-5" />,
    color: '#B84A1F',
    lightBg: '#FFF7F2',
    path: '/services/web-development',
  },
  {
    number: '04',
    stepLabel: 'STEP',
    title: 'Mobile App Development',
    desc: 'User-focused mobile applications built for performance, usability and long-term growth.',
    icon: <Smartphone className="w-5 h-5" />,
    color: '#FF7A50',
    lightBg: '#FFF5F0',
    path: '/services/mobile-apps',
  },
  {
    number: '05',
    stepLabel: 'STEP',
    title: 'Cloud & Backend Engineering',
    desc: 'Reliable backend systems and infrastructure designed to support your product as it grows.',
    icon: <Cloud className="w-5 h-5" />,
    color: '#F5A623',
    lightBg: '#FEF9EE',
    path: '/services/cloud-devops',
  },
  {
    number: '06',
    stepLabel: 'STEP',
    title: 'Cybersecurity',
    desc: 'Identify security weaknesses and build stronger, more resilient applications.',
    icon: <ShieldCheck className="w-5 h-5" />,
    color: '#9A3B12',
    lightBg: '#FFF5F0',
    path: '/services/cyber-security',
  },
  {
    number: '07',
    stepLabel: 'STEP',
    title: 'UI/UX Design',
    desc: 'Clear, intuitive interfaces that make complex products easier to understand and use.',
    icon: <Palette className="w-5 h-5" />,
    color: '#C25E2E',
    lightBg: '#FFF7F2',
    path: '/services/ui-ux-design',
  },
  {
    number: '08',
    stepLabel: 'STEP',
    title: 'Business Automation',
    desc: 'Reduce repetitive work by connecting your systems and automating everyday business processes.',
    icon: <Workflow className="w-5 h-5" />,
    color: '#E65100',
    lightBg: '#FFF4EE',
    path: '/services/workflow-automation',
  },
];

export const ServicesPreview: React.FC<ServicesPreviewProps> = ({ onNavigate }) => {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Soft Glow Highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#FF5A1F]/5 via-[#D97706]/3 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
        {/* Centered Editorial Heading Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full-Spectrum Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
            Technology We <span className="text-[#FF5A1F]">Deliver</span>
          </h2>

          <p className="text-xs sm:text-base md:text-lg text-[#6B6660] max-w-2xl mx-auto leading-relaxed">
            From AI systems to complete digital products, we provide the technology and engineering expertise to turn ideas into reality.
          </p>
        </motion.div>

        {/* 8-Card Infographic Grid: 4-col desktop, 2-col tablet, 1-col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: 'easeOut',
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              onClick={() => onNavigate(service.path)}
              className="bg-white rounded-2xl sm:rounded-3xl border border-[#EDE9E4] hover:border-[#FF5A1F]/40 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
            >
              <div>
                {/* Top Section: Top-Left Arch Ribbon + Top-Right Icon */}
                <div className="flex items-start justify-between">
                  {/* Top-Left Color Arch Ribbon */}
                  <div
                    className="rounded-br-2xl sm:rounded-br-3xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-white flex flex-col items-center justify-center shrink-0 select-none shadow-xs"
                    style={{ backgroundColor: service.color }}
                  >
                    <span className="text-base sm:text-lg font-black tracking-tight leading-none drop-shadow-2xs">
                      {service.number}
                    </span>
                    <span className="text-[7.5px] sm:text-[8.5px] font-extrabold tracking-widest uppercase opacity-90 leading-tight mt-0.5">
                      {service.stepLabel}
                    </span>
                  </div>

                  {/* Top-Right Category Icon */}
                  <div className="p-3.5 sm:p-4">
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                      style={{ color: service.color }}
                    >
                      {service.icon}
                    </div>
                  </div>
                </div>

                {/* Middle Content: Category Title + Short Description */}
                <div className="p-4 sm:p-5 pt-2 sm:pt-3 space-y-1.5">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#111111] group-hover:text-[#FF5A1F] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#6B6660] leading-relaxed line-clamp-3">
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Expandable Color Bar */}
              <div className="pt-3 pb-0 px-0">
                <div className="w-full flex justify-center">
                  <div
                    className="w-16 sm:w-20 h-1.5 rounded-t-full transition-all duration-300 group-hover:w-full group-hover:rounded-none group-hover:h-2"
                    style={{ backgroundColor: service.color }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rhythm Indicator Legend Below Grid (8 Colored Dots matching cards in order) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="flex flex-col items-center justify-center space-y-2 pt-2"
        >
          <div className="flex items-center gap-2 sm:gap-2.5">
            {SERVICES_DATA.map((service) => (
              <div
                key={`legend-${service.number}`}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-transform hover:scale-125 cursor-default shadow-2xs"
                style={{ backgroundColor: service.color }}
                title={`${service.number} — ${service.title}`}
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold text-[#8C867F] uppercase tracking-wider">
            Capabilities 01 — 08
          </span>
        </motion.div>

        {/* Bottom CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="flex justify-center pt-2"
        >
          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-2 bg-[#111111] text-white px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold hover:bg-[#262626] hover:shadow-lg transition-all group active:scale-95 shadow-sm"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
