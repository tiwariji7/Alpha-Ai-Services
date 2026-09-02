import React from 'react';

interface GlowBackgroundProps {
  intensity?: 'subtle' | 'medium' | 'vibrant';
  showGridLines?: boolean;
}

export const GlowBackground: React.FC<GlowBackgroundProps> = ({
  intensity = 'medium',
}) => {
  const opacityClass =
    intensity === 'vibrant'
      ? 'opacity-70'
      : intensity === 'subtle'
        ? 'opacity-30'
        : 'opacity-50';

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Top right dominant glowing royal blue orb */}
      <div
        className={`absolute -top-32 -right-32 w-[600px] h-[600px] md:w-[850px] md:h-[850px] rounded-full blur-[120px] md:blur-[160px] animate-orb-slow ${opacityClass}`}
        style={{
          background:
            'radial-gradient(circle, rgba(59,79,217,0.32) 0%, rgba(123,92,232,0.20) 40%, rgba(156,125,240,0.10) 70%, transparent 85%)',
        }}
      />

      {/* Center-left soft electric indigo/violet diffuse glow */}
      <div
        className={`absolute top-[40%] -left-48 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[140px] md:blur-[180px] animate-orb-slower ${opacityClass}`}
        style={{
          background:
            'radial-gradient(circle, rgba(91,79,224,0.22) 0%, rgba(59,79,217,0.12) 45%, transparent 75%)',
        }}
      />

      {/* Bottom right supportive celestial blue glow */}
      <div
        className={`absolute bottom-[-10%] right-[15%] w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full blur-[130px] md:blur-[170px] ${opacityClass}`}
        style={{
          background:
            'radial-gradient(circle, rgba(42,63,168,0.18) 0%, rgba(123,92,232,0.08) 50%, transparent 80%)',
        }}
      />
    </div>
  );
};
