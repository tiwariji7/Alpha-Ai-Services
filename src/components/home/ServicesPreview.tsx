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
import { FlowingHeading } from '../common/FlowingHeading';
import { ModernCard } from '../common/ModernCard';
import { ScrollReveal } from '../common/ScrollReveal';
import { InteractiveButton } from '../common/InteractiveButton';

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
    stepLabel: 'AI/ML',
    title: 'AI & Machine Learning',
    desc: 'Build intelligent systems that understand your data, automate decisions and assist your team.',
    icon: <Bot className="w-5 h-5" />,
    color: '#3B4FD9',
    lightBg: '#EDEAFB',
    path: '/services/ai-development',
  },
  {
    number: '02',
    stepLabel: 'CORE',
    title: 'Custom Software Engineering',
    desc: 'Purpose-built software engineered around your workflows, users and business requirements.',
    icon: <Code2 className="w-5 h-5" />,
    color: '#2A3FA8',
    lightBg: '#EDEAFB',
    path: '/services/software-development',
  },
  {
    number: '03',
    stepLabel: 'WEB',
    title: 'Web Application Development',
    desc: 'Fast, responsive and scalable web applications designed for real users and real business needs.',
    icon: <Globe className="w-5 h-5" />,
    color: '#4D6BFF',
    lightBg: '#EDEAFB',
    path: '/services/web-development',
  },
  {
    number: '04',
    stepLabel: 'APP',
    title: 'Mobile App Development',
    desc: 'User-focused mobile applications built for performance, usability and long-term growth.',
    icon: <Smartphone className="w-5 h-5" />,
    color: '#5B4FE0',
    lightBg: '#EDEAFB',
    path: '/services/mobile-apps',
  },
  {
    number: '05',
    stepLabel: 'INFRA',
    title: 'Cloud & Backend Engineering',
    desc: 'Reliable backend systems and infrastructure designed to support your product as it grows.',
    icon: <Cloud className="w-5 h-5" />,
    color: '#7B5CE8',
    lightBg: '#EDEAFB',
    path: '/services/cloud-devops',
  },
  {
    number: '06',
    stepLabel: 'SEC',
    title: 'Cybersecurity',
    desc: 'Identify security weaknesses and build stronger, more resilient applications.',
    icon: <ShieldCheck className="w-5 h-5" />,
    color: '#141B5C',
    lightBg: '#EDEAFB',
    path: '/services/cyber-security',
  },
  {
    number: '07',
    stepLabel: 'UX/UI',
    title: 'UI/UX Design',
    desc: 'Clear, intuitive interfaces that make complex products easier to understand and use.',
    icon: <Palette className="w-5 h-5" />,
    color: '#9C7DF0',
    lightBg: '#EDEAFB',
    path: '/services/ui-ux-design',
  },
  {
    number: '08',
    stepLabel: 'AUTO',
    title: 'Business Automation',
    desc: 'Reduce repetitive work by connecting your systems and automating everyday business processes.',
    icon: <Workflow className="w-5 h-5" />,
    color: '#3B4FD9',
    lightBg: '#EDEAFB',
    path: '/services/workflow-automation',
  },
];

export const ServicesPreview: React.FC<ServicesPreviewProps> = ({ onNavigate }) => {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Soft Glow Highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#3B4FD9]/8 via-[#7B5CE8]/4 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
        {/* Centered Editorial Heading Block */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
          <ScrollReveal variant="fadeScale">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Spectrum Capabilities</span>
            </div>
          </ScrollReveal>

          <FlowingHeading
            as="h2"
            text="Technology We Deliver"
            highlightWords={['Deliver']}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
          />

          <ScrollReveal variant="fadeUp" delay={0.1}>
            <p className="text-xs sm:text-base md:text-lg text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
              From AI systems to complete digital products, we provide the technology and engineering expertise to turn ideas into reality.
            </p>
          </ScrollReveal>
        </div>

        {/* 8-Card Infographic Grid: 4-col desktop, 2-col tablet, 1-col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left">
          {SERVICES_DATA.map((service, idx) => {
            const isFeatured = idx === 0;

            return (
              <ModernCard
                key={service.number}
                variant={isFeatured ? 'gradient' : 'white'}
                accentColor={service.color}
                delay={idx * 0.05}
                onClick={() => onNavigate(service.path)}
                className="flex flex-col justify-between"
              >
                <div>
                  {/* Top Section: Top-Left Arch Ribbon + Top-Right Icon */}
                  <div className="flex items-start justify-between">
                    {/* Top-Left Color Arch Ribbon */}
                    <div
                      className={`rounded-br-2xl sm:rounded-br-3xl px-3.5 sm:px-4 py-2 sm:py-2.5 flex flex-col items-center justify-center shrink-0 select-none shadow-xs ${
                        isFeatured ? 'bg-white/20 text-white' : 'text-white'
                      }`}
                      style={{ backgroundColor: isFeatured ? undefined : service.color }}
                    >
                      <span className="text-base sm:text-lg font-black tracking-tight leading-none drop-shadow-2xs font-mono">
                        {service.number}
                      </span>
                      <span className="text-[7.5px] sm:text-[8.5px] font-extrabold tracking-widest uppercase opacity-90 leading-tight mt-0.5">
                        {service.stepLabel}
                      </span>
                    </div>

                    {/* Top-Right Category Icon */}
                    <div className="p-3.5 sm:p-4">
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${
                          isFeatured
                            ? 'bg-white/15 border border-white/25 text-white'
                            : 'bg-[#EDEAFB] border border-[#7B5CE8]/20'
                        }`}
                        style={{ color: isFeatured ? '#FFFFFF' : service.color }}
                      >
                        {service.icon}
                      </div>
                    </div>
                  </div>

                  {/* Middle Content: Category Title + Short Description */}
                  <div className="p-4 sm:p-5 pt-2 sm:pt-3 space-y-1.5">
                    <h3
                      className={`text-sm sm:text-base font-extrabold transition-colors leading-snug ${
                        isFeatured
                          ? 'text-white'
                          : 'text-[#151235] group-hover:text-[#3B4FD9]'
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`text-[11px] sm:text-xs leading-relaxed line-clamp-3 ${
                        isFeatured ? 'text-[#B8BEDC]' : 'text-[#5B5876]'
                      }`}
                    >
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Action / Expandable Color Bar */}
                <div className="p-4 pt-0 flex items-center justify-between">
                  <span
                    className={`text-xs font-bold inline-flex items-center gap-1 transition-transform group-hover:translate-x-1 ${
                      isFeatured ? 'text-white' : 'text-[#3B4FD9]'
                    }`}
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </ModernCard>
            );
          })}
        </div>

        {/* Rhythm Indicator Legend Below Grid */}
        <ScrollReveal variant="fadeUp" delay={0.25}>
          <div className="flex flex-col items-center justify-center space-y-2 pt-2">
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
            <span className="text-[10px] sm:text-[11px] font-bold text-[#5B5876] uppercase tracking-wider">
              Capabilities 01 — 08
            </span>
          </div>
        </ScrollReveal>

        {/* Bottom CTA Button with InteractiveButton */}
        <ScrollReveal variant="fadeUp" delay={0.3}>
          <div className="flex justify-center pt-2">
            <InteractiveButton
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/services')}
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </InteractiveButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
