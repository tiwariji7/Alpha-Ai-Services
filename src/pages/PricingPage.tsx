import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { pageTransition } from '../utils/motion';
import { PricingHero } from '../components/pricing/PricingHero';
import { PartnershipIntro } from '../components/pricing/PartnershipIntro';
import { PricingCards } from '../components/pricing/PricingCards';
import { CapacityExplanation } from '../components/pricing/CapacityExplanation';
import { PlanComparison } from '../components/pricing/PlanComparison';
import { ManagedSystems } from '../components/pricing/ManagedSystems';
import { RequestExamples } from '../components/pricing/RequestExamples';
import { DedicatedEngineer } from '../components/pricing/DedicatedEngineer';
import { EngineeringTeam } from '../components/pricing/EngineeringTeam';
import { SocialMediaManagement } from '../components/pricing/SocialMediaManagement';
import { ReportingTransparency } from '../components/pricing/ReportingTransparency';
import { ScopeExclusions } from '../components/pricing/ScopeExclusions';
import { OneTimeProjects } from '../components/pricing/OneTimeProjects';
import { PremiumPartnership } from '../components/pricing/PremiumPartnership';
import { PricingFAQ } from '../components/pricing/PricingFAQ';
import { FinalCTA } from '../components/pricing/FinalCTA';

interface PricingPageProps {
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onNavigate,
  onOpenScheduleModal,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToPlans = () => {
    const el = document.getElementById('pricing-cards-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-12 sm:space-y-16 md:space-y-24 pb-16 sm:pb-24 overflow-x-hidden bg-[#FAF8F6]"
    >
      {/* 1. HERO SECTION */}
      <PricingHero
        onScrollToPlans={handleScrollToPlans}
        onOpenScheduleModal={onOpenScheduleModal}
      />

      {/* 2. PARTNERSHIP CONCEPT INTRO */}
      <PartnershipIntro />

      {/* 3. 3 MONTHLY RETAINER CARDS (₹9,999 / ₹24,999 / ₹49,999) */}
      <PricingCards
        onOpenScheduleModal={onOpenScheduleModal}
      />

      {/* 4. HOW MONTHLY CAPACITY WORKS */}
      <CapacityExplanation />

      {/* 5. PLAN COMPARISON MATRIX (28 ROWS) */}
      <PlanComparison />

      {/* 6. WHAT WE MANAGE (6 CATEGORIES) */}
      <ManagedSystems />

      {/* 7. WHAT CAN YOU ASK US TO IMPROVE? */}
      <RequestExamples
        onOpenScheduleModal={onOpenScheduleModal}
      />

      {/* 8. WHAT DOES A DEDICATED ENGINEER MEAN? */}
      <DedicatedEngineer />

      {/* 9. WHEN ONE ENGINEER ISN'T ENOUGH (3-PERSON TEAM) */}
      <EngineeringTeam />

      {/* 10. SOCIAL MEDIA & UNIFIED DIGITAL PRESENCE */}
      <SocialMediaManagement />

      {/* 11. REPORTING & TRANSPARENCY */}
      <ReportingTransparency />

      {/* 12. SCOPE EXCLUSIONS ("CLEAR SCOPE. NO SURPRISES.") */}
      <ScopeExclusions
        onOpenScheduleModal={onOpenScheduleModal}
      />

      {/* 13. ONE-TIME PROJECTS ("NEED SOMETHING BUILT FROM SCRATCH?") */}
      <OneTimeProjects
        onOpenScheduleModal={onOpenScheduleModal}
      />

      {/* 14. PREMIUM PARTNERSHIP ("ONE PARTNER. YOUR ENTIRE DIGITAL STACK.") */}
      <PremiumPartnership />

      {/* 15. FAQ ACCORDION (13 QUESTIONS) */}
      <PricingFAQ />

      {/* 16. FINAL CTA ("ALREADY HAVE A DIGITAL PRODUCT? LET'S MAKE IT BETTER.") */}
      <FinalCTA
        onScrollToPlans={handleScrollToPlans}
        onOpenScheduleModal={onOpenScheduleModal}
      />
    </motion.div>
  );
};
export default PricingPage;
