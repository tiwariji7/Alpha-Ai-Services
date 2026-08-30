import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { pageTransition } from '../utils/motion';
import { HeroSection } from '../components/home/HeroSection';
import { TrustStripMarquee } from '../components/common/TrustStripMarquee';
import { WhatWeBuildSection } from '../components/home/WhatWeBuildSection';
import { WhyAlphaSection } from '../components/home/WhyAlphaSection';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { ProcessPreview } from '../components/home/ProcessPreview';
import { PortfolioPreview } from '../components/home/PortfolioPreview';
import { IndustriesMarquee } from '../components/home/IndustriesMarquee';
import { FinalCtaBanner } from '../components/home/FinalCtaBanner';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
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
      className="w-full overflow-x-hidden"
    >
      <HeroSection
        onNavigate={onNavigate}
        onOpenScheduleModal={onOpenScheduleModal}
      />
      {/* Technology Ecosystem Trust Strip */}
      <TrustStripMarquee />

      <WhatWeBuildSection onNavigate={onNavigate} />
      <WhyAlphaSection onNavigate={onNavigate} />
      <ServicesPreview onNavigate={onNavigate} />
      <ProcessPreview onNavigate={onNavigate} />
      <PortfolioPreview onNavigate={onNavigate} />
      <IndustriesMarquee onNavigate={onNavigate} />
      <FinalCtaBanner
        onNavigate={onNavigate}
        onOpenScheduleModal={onOpenScheduleModal}
      />
    </motion.div>
  );
};
