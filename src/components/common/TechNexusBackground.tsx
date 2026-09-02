import React, { Suspense, lazy } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const TechNexusCanvas = lazy(() =>
  import('./TechNexusCanvas').then((m) => ({ default: m.TechNexusCanvas }))
);

export interface TechNexusBackgroundProps {
  density?: 'hero' | 'dense' | 'medium' | 'subtle';
  interactive?: boolean;
  speed?: number;
  opacity?: number;
  showAuroraGlows?: boolean;
  showTextContrastMask?: boolean;
  contrastMaskTone?: 'light' | 'dark';
  className?: string;
}

export const TechNexusBackground: React.FC<TechNexusBackgroundProps> = ({
  density = 'hero',
  interactive = true,
  speed = 1.0,
  opacity = 0.85,
  showAuroraGlows = true,
  showTextContrastMask = true,
  contrastMaskTone = 'light',
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 select-none ${className}`}
    >
      {/* 1. Luminous Brand Aurora Glow Underlays */}
      {showAuroraGlows && (
        <>
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    scale: [1, 1.1, 0.95, 1],
                    opacity: [0.42, 0.58, 0.42],
                  }
            }
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1150px] h-[500px] sm:h-[800px] rounded-full bg-gradient-to-tr from-[#3B4FD9]/28 via-[#7DE8FF]/20 to-[#7B5CE8]/22 blur-[130px]"
          />

          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    x: [0, 35, -30, 0],
                    y: [0, -30, 25, 0],
                  }
            }
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-4 right-1/10 w-[380px] sm:w-[650px] h-[380px] sm:h-[650px] rounded-full bg-gradient-to-br from-[#7B5CE8]/20 via-[#9C7DF0]/14 to-transparent blur-[110px]"
          />
        </>
      )}

      {/* 2. WebGL 3D Neural Network / Data Nexus Scene */}
      <Suspense fallback={null}>
        <TechNexusCanvas
          density={density}
          interactive={interactive}
          speed={speed}
          opacity={opacity}
        />
      </Suspense>

      {/* 3. Text Contrast & Boundary Blending Mask */}
      {showTextContrastMask && (
        <>
          {contrastMaskTone === 'light' ? (
            <>
              {/* Radial gradient mask softly behind the center to guarantee AAA text contrast */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_46%,rgba(246,245,252,0.72)_0%,rgba(246,245,252,0.35)_60%,transparent_100%)] pointer-events-none" />
              {/* Vertical blend into adjacent page sections */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#F6F5FC]/30 via-transparent to-[#F6F5FC]/95 pointer-events-none" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_46%,rgba(10,14,42,0.72)_0%,rgba(10,14,42,0.35)_60%,transparent_100%)] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E2A]/30 via-transparent to-[#0A0E2A]/95 pointer-events-none" />
            </>
          )}
        </>
      )}
    </div>
  );
};
