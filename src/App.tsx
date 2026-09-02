import React, { useState, useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { pageTransition } from './utils/motion';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { SEO } from './components/common/SEO';
import { NavigationProgressBar } from './components/common/NavigationProgressBar';
import { PageSkeleton } from './components/common/PageSkeleton';

// Route loader definitions for preloading & lazy rendering
const routeLoaders = {
  home: () => import('./pages/HomePage').then((m) => ({ default: m.HomePage })),
  services: () => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })),
  serviceDetail: () => import('./pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })),
  portfolio: () => import('./pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage })),
  portfolioDetail: () => import('./pages/PortfolioDetailPage').then((m) => ({ default: m.PortfolioDetailPage })),
  about: () => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
  story: () => import('./pages/StoryPage').then((m) => ({ default: m.StoryPage })),
  process: () => import('./pages/ProcessPage').then((m) => ({ default: m.ProcessPage })),
  industries: () => import('./pages/IndustriesPage').then((m) => ({ default: m.IndustriesPage })),
  pricing: () => import('./pages/PricingPage').then((m) => ({ default: m.PricingPage })),
  contact: () => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
  privacy: () => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })),
  terms: () => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })),
};

// Code-split route components on demand
const HomePage = lazy(routeLoaders.home);
const ServicesPage = lazy(routeLoaders.services);
const ServiceDetailPage = lazy(routeLoaders.serviceDetail);
const PortfolioPage = lazy(routeLoaders.portfolio);
const PortfolioDetailPage = lazy(routeLoaders.portfolioDetail);
const AboutPage = lazy(routeLoaders.about);
const StoryPage = lazy(routeLoaders.story);
const ProcessPage = lazy(routeLoaders.process);
const IndustriesPage = lazy(routeLoaders.industries);
const PricingPage = lazy(routeLoaders.pricing);
const ContactPage = lazy(routeLoaders.contact);
const PrivacyPolicyPage = lazy(routeLoaders.privacy);
const TermsPage = lazy(routeLoaders.terms);

// Lazy load modal only when needed
const ScheduleCallModal = lazy(() =>
  import('./components/common/ScheduleCallModal').then((m) => ({ default: m.ScheduleCallModal }))
);

// Preload remaining routes on idle time for instant client-side transitions
function useRoutePreloader() {
  useEffect(() => {
    const preloadAll = () => {
      Object.values(routeLoaders).forEach((loader) => {
        try {
          loader();
        } catch {
          // Ignore background prefetch errors
        }
      });
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const id = (window as any).requestIdleCallback(preloadAll, { timeout: 2000 });
        return () => (window as any).cancelIdleCallback?.(id);
      } else {
        const id = setTimeout(preloadAll, 1200);
        return () => clearTimeout(id);
      }
    }
  }, []);
}

// Scroll to top instantly before paint on route change so page transition is smooth with zero jump
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Disable automatic browser scroll restoration to prevent scroll fighting
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Instant scroll reset before paint
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Wrapper for Dynamic Service Detail Page
function ServiceDetailWrapper({
  onNavigate,
  onOpenScheduleModal,
}: {
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}) {
  const { slug } = useParams<{ slug: string }>();
  return (
    <ServiceDetailPage
      slug={slug || 'ai-development'}
      onNavigate={onNavigate}
      onOpenScheduleModal={onOpenScheduleModal}
    />
  );
}

// Wrapper for Dynamic Portfolio Case Study Detail Page
function PortfolioDetailWrapper({
  onNavigate,
  onOpenScheduleModal,
}: {
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}) {
  const { slug } = useParams<{ slug: string }>();
  return (
    <PortfolioDetailPage
      slug={slug || 'fintech-retrieval-engine'}
      onNavigate={onNavigate}
      onOpenScheduleModal={onOpenScheduleModal}
    />
  );
}

// Inner App with Routing Context
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Background idle preloading of code-split page chunks
  useRoutePreloader();

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleTopic, setScheduleTopic] = useState<string | undefined>(undefined);

  const handleOpenSchedule = (topic?: string) => {
    setScheduleTopic(topic);
    setIsScheduleOpen(true);
  };

  const handleCloseSchedule = () => {
    setIsScheduleOpen(false);
    setScheduleTopic(undefined);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#F6F5FC] text-[#151235] font-sans antialiased flex flex-col justify-between selection:bg-[#3B4FD9]/20 selection:text-[#3B4FD9] relative overflow-x-clip">
      {/* Top of page slim loading progress bar on navigation */}
      <NavigationProgressBar />

      {/* Dynamic SEO Meta Tags, Social Cards, Canonical Links & JSON-LD Structured Data */}
      <SEO />
      <ScrollToTop />

      {/* Sticky Floating Navbar */}
      <Navbar
        currentPath={location.pathname}
        onNavigate={handleNavigate}
        onOpenScheduleModal={() => handleOpenSchedule()}
      />

      {/* Main Multi-Page Route Outlet with Suspense & AnimatePresence */}
      <main className="flex-grow z-10">
        <Suspense fallback={<PageSkeleton />}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <Routes location={location}>
              <Route
                path="/"
                element={
                  <HomePage
                    onNavigate={handleNavigate}
                    onOpenScheduleModal={handleOpenSchedule}
                  />
                }
              />
              <Route
                path="/services"
                element={
                  <ServicesPage
                    onNavigate={handleNavigate}
                    onOpenScheduleModal={handleOpenSchedule}
                  />
                }
              />
              <Route
                path="/services/:slug"
                element={
                  <ServiceDetailWrapper
                    onNavigate={handleNavigate}
                    onOpenScheduleModal={handleOpenSchedule}
                  />
                }
              />
              <Route
                path="/portfolio"
                element={
                  <PortfolioPage
                    onNavigate={handleNavigate}
                    onOpenScheduleModal={handleOpenSchedule}
                  />
                }
              />
              <Route
                path="/portfolio/:slug"
                element={
                  <PortfolioDetailWrapper
                    onNavigate={handleNavigate}
                    onOpenScheduleModal={handleOpenSchedule}
                  />
                }
              />

              <Route
                path="/company/about"
                element={
                  <AboutPage
                    onNavigate={handleNavigate}
                    onOpenScheduleModal={handleOpenSchedule}
                  />
                }
              />
              <Route
                path="/company/story"
                element={
                  <StoryPage
                    onNavigate={handleNavigate}
                    onOpenScheduleModal={handleOpenSchedule}
                  />
                }
              />
              <Route
                path="/company/process"
                element={
                  <ProcessPage
                    onNavigate={handleNavigate}
                    onOpenScheduleModal={handleOpenSchedule}
                  />
                }
              />
              <Route
                path="/company/industries"
                element={
                  <IndustriesPage
                    onNavigate={handleNavigate}
                    onOpenScheduleModal={handleOpenSchedule}
                  />
                }
              />
              <Route
                path="/pricing"
                element={
                  <PricingPage
                    onNavigate={handleNavigate}
                    onOpenScheduleModal={handleOpenSchedule}
                  />
                }
              />
              <Route
                path="/contact"
                element={
                  <ContactPage onOpenScheduleModal={() => handleOpenSchedule('General Inquiry')} />
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <PrivacyPolicyPage
                    onNavigate={handleNavigate}
                    onOpenScheduleModal={handleOpenSchedule}
                  />
                }
              />
              <Route
                path="/privacy"
                element={
                  <PrivacyPolicyPage
                    onNavigate={handleNavigate}
                    onOpenScheduleModal={handleOpenSchedule}
                  />
                }
              />
              <Route
                path="/terms"
                element={
                  <TermsPage
                    onNavigate={handleNavigate}
                    onOpenScheduleModal={handleOpenSchedule}
                  />
                }
              />
              {/* Catch-all fallback */}
              <Route
                path="*"
                element={
                  <HomePage
                    onNavigate={handleNavigate}
                    onOpenScheduleModal={handleOpenSchedule}
                  />
                }
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
        </Suspense>
      </main>

      {/* Global Comprehensive Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenScheduleModal={() => handleOpenSchedule()}
      />

      {/* Global Modals loaded on demand */}
      {isScheduleOpen && (
        <Suspense fallback={null}>
          <ScheduleCallModal
            isOpen={isScheduleOpen}
            onClose={handleCloseSchedule}
            initialTopic={scheduleTopic}
          />
        </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
