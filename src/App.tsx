import React, { useState, useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { GlowBackground } from './components/common/GlowBackground';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { SEO } from './components/common/SEO';

// Code-split route components on demand
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage })));
const PortfolioDetailPage = lazy(() => import('./pages/PortfolioDetailPage').then((m) => ({ default: m.PortfolioDetailPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const StoryPage = lazy(() => import('./pages/StoryPage').then((m) => ({ default: m.StoryPage })));
const ProcessPage = lazy(() => import('./pages/ProcessPage').then((m) => ({ default: m.ProcessPage })));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage').then((m) => ({ default: m.IndustriesPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then((m) => ({ default: m.PricingPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));

// Lazy load modal only when needed
const ScheduleCallModal = lazy(() =>
  import('./components/common/ScheduleCallModal').then((m) => ({ default: m.ScheduleCallModal }))
);

// Scroll to top instantly before paint on route change so page transition is smooth with zero jump
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Disable automatic browser scroll restoration to avoid scroll fighting
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Instant scroll reset before paint
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Fallback skeleton placeholder for Suspense transitions
function PageLoadingFallback() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#FF5A1F] border-t-transparent rounded-full animate-spin" />
    </div>
  );
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
    <div className="min-h-screen bg-[#FAF8F6] text-[#111111] font-sans antialiased flex flex-col justify-between selection:bg-[#FF5A1F]/20 selection:text-[#FF5A1F] relative overflow-x-clip">
      {/* Dynamic SEO Meta Tags, Social Cards, Canonical Links & JSON-LD Structured Data */}
      <SEO />
      {/* Dynamic Ambient Background Glow */}
      <GlowBackground />
      <ScrollToTop />

      {/* Sticky Floating Navbar */}
      <Navbar
        currentPath={location.pathname}
        onNavigate={handleNavigate}
        onOpenScheduleModal={() => handleOpenSchedule()}
      />

      {/* Main Multi-Page Route Outlet with Suspense */}
      <main className="flex-grow z-10">
        <Suspense fallback={<PageLoadingFallback />}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
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
