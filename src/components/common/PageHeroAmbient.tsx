import React from 'react';
import { TechNexusBackground } from './TechNexusBackground';

interface PageHeroAmbientProps {
  theme?: 'hero' | 'page' | 'subtle';
  className?: string;
  glowIntensity?: 'normal' | 'soft' | 'subtle';
}

export const PageHeroAmbient: React.FC<PageHeroAmbientProps> = ({
  theme = 'page',
  className = '',
  glowIntensity = 'normal',
}) => {
  const density = theme === 'hero' ? 'dense' : theme === 'page' ? 'medium' : 'subtle';
  const opacity = glowIntensity === 'subtle' ? 0.45 : glowIntensity === 'soft' ? 0.6 : 0.75;

  return (
    <TechNexusBackground
      density={density}
      opacity={opacity}
      speed={theme === 'subtle' ? 0.75 : 0.9}
      interactive={true}
      showAuroraGlows={true}
      showTextContrastMask={true}
      contrastMaskTone="light"
      className={className}
    />
  );
};

