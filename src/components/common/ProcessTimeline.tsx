import React, { Suspense, lazy, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { CheckCircle2, Sparkles } from 'lucide-react';

const ProcessTimelineCanvas = lazy(() =>
  import('./ProcessTimelineCanvas').then((m) => ({ default: m.ProcessTimelineCanvas }))
);

export interface ProcessTimelineStep {
  number: string;
  title: string;
  desc?: string;
  description?: string;
  subline?: string;
  keyPoints?: string[];
  icon?: React.ReactNode;
}

interface ProcessTimelineProps {
  steps: ProcessTimelineStep[];
  variant?: 'light' | 'gradient';
  className?: string;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  steps,
  variant = 'light',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [canvasProgress, setCanvasProgress] = useState(0.1);

  // Responsive screen detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll progress through the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 35%'],
  });

  // Smooth spring physics for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      setCanvasProgress(1.0);
      return;
    }

    const unsubscribe = smoothProgress.on('change', (v) => {
      setCanvasProgress(Math.max(0.02, Math.min(1.0, v)));
    });

    return () => unsubscribe();
  }, [smoothProgress, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-6xl mx-auto py-8 sm:py-12 ${className}`}
    >
      {/* 1. 3D Connected Ribbon/Tube Path Layer */}
      <Suspense fallback={null}>
        <ProcessTimelineCanvas
          stepCount={steps.length}
          scrollProgress={canvasProgress}
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Suspense>

      {/* 2. Alternating Cards Sequence (Desktop Zigzag / Mobile Single Column) */}
      <div className="relative z-10 space-y-12 sm:space-y-16 md:space-y-20">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          const descriptionText = step.desc || step.description || '';

          return (
            <div
              key={step.number}
              className={`flex items-center w-full ${
                isMobile
                  ? 'justify-start pl-3 sm:pl-6'
                  : isEven
                  ? 'justify-start md:pr-[52%]'
                  : 'justify-end md:pl-[52%]'
              }`}
            >
              {/* Card Container with Motion entrance & hover micro-interaction */}
              <motion.div
                initial={
                  prefersReducedMotion
                    ? false
                    : {
                        opacity: 0,
                        x: isMobile ? -20 : isEven ? -28 : 28,
                      }
                }
                whileInView={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      }
                }
                viewport={{ once: true, amount: 0.25 }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: 1.025,
                        transition: { duration: 0.22, ease: 'easeOut' },
                      }
                }
                className={`w-full rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 transition-all duration-300 relative group overflow-hidden ${
                  variant === 'gradient'
                    ? 'bg-gradient-to-br from-[#101440] via-[#141B5C] to-[#2D3DB7] text-white border border-[#5B86FF]/30 shadow-lg'
                    : 'bg-white/95 backdrop-blur-md text-[#151235] border border-[#2D3DB7]/14 shadow-[0_4px_24px_rgba(45,61,183,0.06)] hover:shadow-[0_10px_32px_rgba(45,61,183,0.12)]'
                }`}
              >
                {/* Subtle card decorative ambient gradient line */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#3B4FD9]/30 to-transparent pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  {/* Left: Circular Glassmorphic Icon Badge + Step Phase */}
                  <div className="flex items-center gap-3.5">
                    {/* Icon Badge with playful pop entrance */}
                    <motion.div
                      initial={prefersReducedMotion ? false : { scale: 0.8 }}
                      whileInView={
                        prefersReducedMotion
                          ? undefined
                          : {
                              scale: 1,
                              transition: {
                                delay: 0.12,
                                duration: 0.4,
                                ease: [0.34, 1.56, 0.64, 1], // Playful bounce pop
                              },
                            }
                      }
                      viewport={{ once: true }}
                      className="w-12 h-12 rounded-full bg-[#EDEAFB]/90 backdrop-blur-md border border-[#7B5CE8]/30 flex items-center justify-center text-[#3B4FD9] shadow-2xs group-hover:border-[#3B4FD9]/50 group-hover:scale-105 transition-all duration-300 shrink-0"
                    >
                      {step.icon || <Sparkles className="w-5 h-5 text-[#3B4FD9]" />}
                    </motion.div>

                    <div>
                      <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#3B4FD9]">
                        Step {step.number}
                      </span>
                      {step.subline && (
                        <p className="text-[11px] text-[#5B5876] font-medium hidden sm:block">
                          {step.subline}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Step Number Watermark */}
                  <span className="text-2xl sm:text-3xl font-mono font-black text-[#EDEAFB] group-hover:text-[#3B4FD9]/40 transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight mb-2 group-hover:text-[#3B4FD9] transition-colors leading-snug">
                  {step.title}
                </h3>

                {/* Description */}
                {descriptionText && (
                  <p className="text-xs sm:text-sm text-[#5B5876] leading-relaxed mb-3">
                    {descriptionText}
                  </p>
                )}

                {/* Key Deliverables / Highlights (if present) */}
                {step.keyPoints && step.keyPoints.length > 0 && (
                  <div className="pt-3 border-t border-[#2D3DB7]/10 flex flex-wrap gap-2">
                    {step.keyPoints.map((point, pIdx) => (
                      <div
                        key={pIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#F6F5FC] border border-[#2D3DB7]/10 text-[11px] font-semibold text-[#151235]"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#3B4FD9] shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
