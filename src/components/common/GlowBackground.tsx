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

      {/* Top right dominant glowing orange orb - directly inspired by LaunchDir reference */}
      <div
        className={`absolute -top-32 -right-32 w-[600px] h-[600px] md:w-[850px] md:h-[850px] rounded-full blur-[120px] md:blur-[160px] animate-orb-slow ${opacityClass}`}
        style={{
          background:
            'radial-gradient(circle, rgba(255,90,31,0.45) 0%, rgba(255,165,77,0.3) 40%, rgba(255,215,154,0.15) 70%, transparent 85%)',
        }}
      />

      {/* Center-left soft amber/peach diffuse glow */}
      <div
        className={`absolute top-[40%] -left-48 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[140px] md:blur-[180px] animate-orb-slower ${opacityClass}`}
        style={{
          background:
            'radial-gradient(circle, rgba(255,122,61,0.25) 0%, rgba(255,190,118,0.15) 45%, transparent 75%)',
        }}
      />

      {/* Bottom right supportive warm glow */}
      <div
        className={`absolute bottom-[-10%] right-[15%] w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full blur-[130px] md:blur-[170px] ${opacityClass}`}
        style={{
          background:
            'radial-gradient(circle, rgba(255,90,31,0.2) 0%, rgba(255,215,154,0.12) 50%, transparent 80%)',
        }}
      />
    </div>
  );
};

