import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Users,
  Target,
  CheckCircle2,
  HeartHandshake,
  MessageSquare,
  Compass,
  Zap,
  Terminal,
} from 'lucide-react';
import {
  fadeUp,
  pageTransition,
} from '../utils/motion';
import { FlowingHeading } from '../components/common/FlowingHeading';
import { ModernCard } from '../components/common/ModernCard';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { InteractiveButton } from '../components/common/InteractiveButton';
import { PageHeroAmbient } from '../components/common/PageHeroAmbient';

interface StoryPageProps {
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}

const STORY_CHAPTERS = [
  {
    phase: 'Chapter 01',
    title: 'The Real-World Problem We Saw',
    subtitle: 'Too much noise, too much jargon, and too little practical delivery.',
    desc: 'As software engineers working across startups, digital products, and established businesses, we noticed a persistent issue: building software had become unnecessarily confusing and overpriced. Too many agencies sell complex buzzwords, bloated architectures, and disconnected tools that leave business owners frustrated rather than empowered.',
    icon: <Terminal className="w-5 h-5 text-[#3B4FD9]" />,
  },
  {
    phase: 'Chapter 02',
    title: 'Why We Started Alpha AI Services',
    subtitle: 'An engineering team dedicated to making digital transformation make clear sense.',
    desc: 'We founded Alpha AI Services with a simple mission: to help businesses build clean, sensible digital products and integrate modern AI capabilities without the fluff. We believe that whether a company needs an intuitive web app, a mobile product, or automated internal workflows, technology should save time, increase efficiency, and make clear business sense.',
    icon: <Code2 className="w-5 h-5 text-[#2A3FA8]" />,
  },
  {
    phase: 'Chapter 03',
    title: 'Our Approach to Practical Engineering',
    subtitle: 'Direct collaboration, clean architecture, and honest craftsmanship.',
    desc: 'We deliberately operate as a lean, senior-focused engineering studio. When you work with us, you speak directly with the engineers building your systems. We focus on clean code, transparent weekly demos, and writing maintainable software that your business can comfortably own and scale long into the future.',
    icon: <Target className="w-5 h-5 text-[#5B4FE0]" />,
  },
];

const CORE_CONVICTIONS = [
  {
    number: '01',
    title: 'Clarity Over Jargon',
    desc: 'We explain technical architecture in plain business terms. If a technology does not directly benefit your business goals, we will not recommend it.',
    icon: <Compass className="w-5 h-5 text-[#3B4FD9]" />,
  },
  {
    number: '02',
    title: 'Practical Innovation',
    desc: 'We implement modern AI models and automated workflows where they generate measurable efficiency — not just because they are trending.',
    icon: <Zap className="w-5 h-5 text-[#2A3FA8]" />,
  },
  {
    number: '03',
    title: 'Direct Engineer Access',
    desc: 'No account manager layers or delayed games of telephone. You work in real-time with the developers writing your code.',
    icon: <Users className="w-5 h-5 text-[#4D6BFF]" />,
  },
  {
    number: '04',
    title: 'Complete Client Ownership',
    desc: 'You retain 100% ownership of your source code, infrastructure, and design assets from day one. Zero vendor lock-in.',
    icon: <HeartHandshake className="w-5 h-5 text-[#5B4FE0]" />,
  },
];

export const StoryPage: React.FC<StoryPageProps> = ({
  onNavigate,
  onOpenScheduleModal,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-12 sm:space-y-16 md:space-y-24 pb-16 sm:pb-24 overflow-x-hidden bg-[#F6F5FC]"
    >
      {/* 1. HERO SECTION WITH 3D AMBIENT PARTICLES */}
      <section className="pt-8 sm:pt-14 pb-4 sm:pb-8 px-4 sm:px-6 relative overflow-hidden">
        <PageHeroAmbient theme="page" />

        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 relative z-10">
          <ScrollReveal variant="fadeScale">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OUR STORY &amp; MISSION</span>
            </div>
          </ScrollReveal>

          <FlowingHeading
            as="h1"
            text="Built by Engineers. Driven by Practical Purpose."
            highlightWords={['Practical', 'Purpose.']}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
          />

          <ScrollReveal variant="fadeUp" delay={0.12}>
            <p className="text-base sm:text-lg md:text-xl text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
              We are a team of software engineers who started Alpha AI Services to help businesses build sensible digital products and harness modern AI without unnecessary complexity.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. THE FOUNDING STORY (Editorial 3-Chapter Journey) */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto space-y-6 sm:space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <ScrollReveal variant="fadeScale">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <span>THE ORIGIN</span>
            </div>
          </ScrollReveal>

          <FlowingHeading
            as="h2"
            text="Why We Started This Studio"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151235] tracking-tight justify-center"
          />
        </div>

        <div className="space-y-6">
          {STORY_CHAPTERS.map((chapter, idx) => (
            <ModernCard
              key={chapter.phase}
              variant="white"
              delay={idx * 0.08}
              className="p-6 sm:p-8 lg:p-10 text-left space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EDEAFB] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EDEAFB] border border-[#7B5CE8]/20 flex items-center justify-center shadow-2xs group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    {chapter.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#3B4FD9] uppercase tracking-wider block">
                      {chapter.phase}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#151235]">
                      {chapter.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="text-xs sm:text-sm font-semibold text-[#151235] italic">
                &ldquo;{chapter.subtitle}&rdquo;
              </div>

              <p className="text-xs sm:text-sm md:text-base text-[#5B5876] leading-relaxed">
                {chapter.desc}
              </p>
            </ModernCard>
          ))}
        </div>
      </section>

      {/* 3. CORE PRINCIPLES & CONVICTIONS */}
      <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-white border-y border-[#EDEAFB]">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
            <ScrollReveal variant="fadeScale">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <span>OUR CONVICTIONS</span>
              </div>
            </ScrollReveal>

            <FlowingHeading
              as="h2"
              text="Principles We Stand By."
              highlightWords={['Stand', 'By.']}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
            />

            <ScrollReveal variant="fadeUp" delay={0.08}>
              <p className="text-xs sm:text-sm md:text-base text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
                We hold ourselves to high standards of honesty, craft, and technical clarity in every client partnership.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-left">
            {CORE_CONVICTIONS.map((item, idx) => (
              <ModernCard
                key={item.number}
                variant="white"
                delay={idx * 0.08}
                className="p-6 sm:p-7 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#EDEAFB] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-xs font-mono font-black text-[#5B5876]">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-[#151235]">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5B5876] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT WE PROMISE EVERY CLIENT */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ModernCard variant="white" className="p-6 sm:p-10 text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>OUR PROMISE</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#151235] max-w-xl mx-auto">
            Practical Software That Moves Your Business Forward
          </h3>

          <p className="text-xs sm:text-sm text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
            Whether you are digitizing manual business processes, launching a new software product, or automating your customer operations, we are here to provide clear guidance, robust engineering, and long-term support.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold text-[#151235]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#3B4FD9]" />
              No Hidden Complexity
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#3B4FD9]" />
              Direct Communication
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#3B4FD9]" />
              Long-Term Partnership
            </span>
          </div>
        </ModernCard>
      </section>

      {/* 5. FINAL CTA BANNER */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <ScrollReveal variant="fadeScale">
          <div className="relative bg-gradient-to-br from-[#0A0E2A] via-[#141B5C] to-[#2A3FA8] border border-[#3B4FD9]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-9 text-white text-center shadow-soft-lg overflow-hidden">
            {/* Background Decorative Tech Dots Mesh */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B4FD9_1px,transparent_1px)] [background-size:16px_16px]" />
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-[#3B4FD9]/20 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#7B5CE8]/15 blur-[80px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
                Want to Build <span className="text-[#7DE8FF]">Together?</span>
              </h2>

              <p className="text-[#B8BEDC] text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                Tell us where your business is today and where you want to go. We'll help you chart the clearest technical path forward.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
                <InteractiveButton
                  variant="primary"
                  glow={true}
                  onClick={() => onOpenScheduleModal('Project Discussion')}
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </InteractiveButton>

                <InteractiveButton
                  variant="ghost"
                  onClick={() => onNavigate('/contact')}
                  className="text-white border border-white/20 bg-white/10 hover:bg-white/20"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#7DE8FF]" />
                  <span>Talk to Our Engineers</span>
                </InteractiveButton>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </motion.div>
  );
};
