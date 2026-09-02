import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Code2,
  Globe,
  Smartphone,
  Cloud,
  ShieldCheck,
  Palette,
  Workflow,
  Compass,
  History,
  Boxes,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/siteData';
import brandLogo from '../../assets/images/brandlogo.png';
import brandLogoWebp from '../../assets/images/brandlogo.webp';

interface NavbarProps {
  currentPath?: string;
  onNavigate: (path: string) => void;
  onOpenScheduleModal: (topic?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath = '',
  onNavigate,
  onOpenScheduleModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'company' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-close mobile navigation menu when user scrolls vertically
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleScroll = () => {
      setMobileMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const handleMouseEnter = (menu: 'services' | 'company') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleNavClick = (path: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
      case 'Cpu':
      case 'Bot':
      case 'ai-ml':
        return <Sparkles className="w-4 h-4 text-[#3B4FD9]" />;
      case 'Globe':
      case 'web':
        return <Globe className="w-4 h-4 text-[#4D6BFF]" />;
      case 'Smartphone':
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-[#5B4FE0]" />;
      case 'Cloud':
      case 'cloud':
        return <Cloud className="w-4 h-4 text-[#7B5CE8]" />;
      case 'ShieldCheck':
      case 'Shield':
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-[#3B4FD9]" />;
      case 'Palette':
      case 'design':
        return <Palette className="w-4 h-4 text-[#9C7DF0]" />;
      case 'Workflow':
      case 'Zap':
      case 'automation':
        return <Workflow className="w-4 h-4 text-[#5B4FE0]" />;
      default:
        return <Code2 className="w-4 h-4 text-[#3B4FD9]" />;
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-[#EDEAFB]/80 shadow-xs'
          : 'bg-white/70 backdrop-blur-xl border-b border-[#EDEAFB]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo and Name */}
          <div
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <picture className="flex items-center shrink-0">
              <source srcSet={brandLogoWebp} type="image/webp" />
              <img
                src={brandLogo}
                alt="Alpha AI Services Logo"
                width="48"
                height="32"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="brand-logo-header"
              />
            </picture>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight leading-tight">
                <span className="text-[#3B4FD9]">Alpha</span> <span className="text-[#151235]">Ai</span> <span className="text-[#3B4FD9]">Services</span>
              </span>
              <span className="text-[10px] text-[#5B5876] font-medium tracking-wider uppercase">
                Software Engineering Studio
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Mega Dropdown: Services */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavClick('/services')}
                className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  currentPath.startsWith('/services')
                    ? 'text-[#3B4FD9] bg-[#3B4FD9]/10 font-bold'
                    : 'text-[#151235] hover:text-[#3B4FD9] hover:bg-[#EDEAFB]/60'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'services' ? 'rotate-180 text-[#3B4FD9]' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[720px] bg-white/95 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border border-[#EDEAFB] z-50 text-left"
                  >
                    <div className="grid grid-cols-12 gap-6">
                      {/* Left: Highlight / Quick pitch */}
                      <div className="col-span-4 bg-gradient-to-br from-[#EDEAFB] to-[#F4F3FB] p-4 rounded-2xl border border-[#EDEAFB] flex flex-col justify-between">
                        <div>
                          <div className="w-8 h-8 rounded-xl bg-[#3B4FD9]/10 flex items-center justify-center text-[#3B4FD9] mb-3">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B4FD9] mb-1">
                            Engineered for Scale
                          </h4>
                          <p className="text-xs text-[#5B5876] leading-relaxed">
                            From AI agents and high-throughput backends to mission-critical platforms.
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#EDEAFB] space-y-2">
                          <button
                            onClick={() => handleNavClick('/services')}
                            className="text-xs font-bold text-[#151235] hover:text-[#3B4FD9] flex items-center gap-1.5 group"
                          >
                            <span>Explore All Services</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </button>
                        </div>
                      </div>

                      {/* Right: 2-column Grid of Services */}
                      <div className="col-span-8 grid grid-cols-2 gap-2">
                        {SERVICES_DATA.slice(0, 8).map((service) => (
                          <div
                            key={service.slug}
                            onClick={() => handleNavClick(`/services/${service.slug}`)}
                            className="p-2.5 rounded-xl hover:bg-[#EDEAFB]/50 transition-colors cursor-pointer group flex items-start gap-2.5"
                          >
                            <div className="w-7 h-7 rounded-lg bg-white border border-[#EDEAFB] flex items-center justify-center shrink-0 group-hover:border-[#3B4FD9]/40 group-hover:shadow-xs transition-all">
                              {getCategoryIcon(service.iconName)}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#151235] group-hover:text-[#3B4FD9] transition-colors leading-tight">
                                {service.title}
                              </div>
                              <div className="text-[11px] text-[#5B5876] line-clamp-1 mt-0.5">
                                {service.shortDesc}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Quick Row */}
                    <div className="mt-3 pt-3 border-t border-[#EDEAFB] bg-[#EDEAFB]/40 -mx-5 -mb-5 p-4 flex items-center justify-between">
                      <div className="text-xs text-[#5B5876]">
                        Need custom scoping or multi-stack architecture?
                      </div>
                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          handleNavClick('/contact');
                        }}
                        className="text-xs font-bold text-[#151235] hover:text-[#3B4FD9] flex items-center gap-1.5"
                      >
                        <span>Get In Touch</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#3B4FD9]" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Portfolio Link */}
            <button
              onClick={() => handleNavClick('/portfolio')}
              className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all ${
                currentPath.startsWith('/portfolio')
                  ? 'text-[#3B4FD9] bg-[#3B4FD9]/10 font-bold'
                  : 'text-[#151235] hover:text-[#3B4FD9] hover:bg-[#EDEAFB]/60'
              }`}
            >
              Portfolio
            </button>

            {/* Dropdown: Company */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('company')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavClick('/company/about')}
                className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  currentPath.startsWith('/company')
                    ? 'text-[#3B4FD9] bg-[#3B4FD9]/10 font-bold'
                    : 'text-[#151235] hover:text-[#3B4FD9] hover:bg-[#EDEAFB]/60'
                }`}
              >
                <span>Company</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'company' ? 'rotate-180 text-[#3B4FD9]' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'company' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute left-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-2xl rounded-3xl p-3 shadow-2xl border border-[#EDEAFB] z-50 text-left"
                  >
                    <div className="space-y-1">
                      <div
                        onClick={() => handleNavClick('/company/about')}
                        className="p-3 rounded-2xl hover:bg-[#EDEAFB]/50 transition-colors cursor-pointer group flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#EDEAFB] text-[#5B4FE0] flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#151235] group-hover:text-[#3B4FD9]">
                            About Us & Leadership
                          </div>
                          <div className="text-[10px] text-[#5B5876]">Engineering DNA & values</div>
                        </div>
                      </div>

                      <div
                        onClick={() => handleNavClick('/company/story')}
                        className="p-3 rounded-2xl hover:bg-[#EDEAFB]/50 transition-colors cursor-pointer group flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#EDEAFB] text-[#5B4FE0] flex items-center justify-center shrink-0">
                          <History className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#151235] group-hover:text-[#3B4FD9]">
                            Our Story
                          </div>
                          <div className="text-[10px] text-[#5B5876]">Why we started Alpha AI Services</div>
                        </div>
                      </div>

                      <div
                        onClick={() => handleNavClick('/company/process')}
                        className="p-3 rounded-2xl hover:bg-[#EDEAFB]/50 transition-colors cursor-pointer group flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#EDEAFB] text-[#5B4FE0] flex items-center justify-center shrink-0">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#151235] group-hover:text-[#3B4FD9]">
                            5-Stage Agile Process
                          </div>
                          <div className="text-[10px] text-[#5B5876]">PRD to production telemetry</div>
                        </div>
                      </div>

                      <div
                        onClick={() => handleNavClick('/company/industries')}
                        className="p-3 rounded-2xl hover:bg-[#EDEAFB]/50 transition-colors cursor-pointer group flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#EDEAFB] text-[#5B4FE0] flex items-center justify-center shrink-0">
                          <Boxes className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#151235] group-hover:text-[#3B4FD9]">
                            Industries We Serve
                          </div>
                          <div className="text-[10px] text-[#5B5876]">Fintech, Health, SaaS & Retail</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pricing Link */}
            <button
              onClick={() => handleNavClick('/pricing')}
              className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all ${
                currentPath === '/pricing'
                  ? 'text-[#3B4FD9] bg-[#3B4FD9]/10 font-bold'
                  : 'text-[#151235] hover:text-[#3B4FD9] hover:bg-[#EDEAFB]/60'
              }`}
            >
              Pricing
            </button>

            {/* Contact Link */}
            <button
              onClick={() => handleNavClick('/contact')}
              className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all ${
                currentPath === '/contact'
                  ? 'text-[#3B4FD9] bg-[#3B4FD9]/10 font-bold'
                  : 'text-[#151235] hover:text-[#3B4FD9] hover:bg-[#EDEAFB]/60'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Right Action CTA */}
          <div className="flex items-center gap-2.5">
            {/* Desktop Only: Royal Blue Pill CTA matching Reference Image */}
            <button
              onClick={() => onOpenScheduleModal()}
              className="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-[#3B4FD9] to-[#7B5CE8] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold hover:shadow-[0_10px_25px_-5px_rgba(59,79,217,0.4)] transition-all group active:scale-95 shadow-xs"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#151235] hover:bg-[#EDEAFB] rounded-full transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-x-3 top-20 bg-white rounded-3xl p-5 shadow-2xl border border-[#EDEAFB] z-50 max-h-[85vh] overflow-y-auto"
          >
            <div className="space-y-2">
              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-[#151235] hover:bg-[#EDEAFB]/50"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileServicesOpen ? 'rotate-180 text-[#3B4FD9]' : ''
                    }`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-1 bg-[#EDEAFB]/40 rounded-2xl my-1">
                    <button
                      onClick={() => handleNavClick('/services')}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-[#3B4FD9]"
                    >
                      → View All Services Overview
                    </button>
                    {SERVICES_DATA.map((s) => (
                      <button
                        key={s.slug}
                        onClick={() => handleNavClick(`/services/${s.slug}`)}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-[#5B5876] hover:text-[#151235] block"
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Portfolio */}
              <button
                onClick={() => handleNavClick('/portfolio')}
                className="w-full text-left px-4 py-3 rounded-2xl text-sm font-bold text-[#151235] hover:bg-[#EDEAFB]/50"
              >
                Portfolio & Case Studies
              </button>

              {/* Mobile Company Accordion */}
              <div>
                <button
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-[#151235] hover:bg-[#EDEAFB]/50"
                >
                  <span>Company</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileCompanyOpen ? 'rotate-180 text-[#3B4FD9]' : ''
                    }`}
                  />
                </button>
                {mobileCompanyOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-1 bg-[#EDEAFB]/40 rounded-2xl my-1">
                    <button
                      onClick={() => handleNavClick('/company/about')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#5B5876] hover:text-[#151235] block"
                    >
                      About Us & Leadership
                    </button>
                    <button
                      onClick={() => handleNavClick('/company/story')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#5B5876] hover:text-[#151235] block"
                    >
                      Our Story & Mission
                    </button>
                    <button
                      onClick={() => handleNavClick('/company/process')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#5B5876] hover:text-[#151235] block"
                    >
                      5-Stage Agile Process
                    </button>
                    <button
                      onClick={() => handleNavClick('/company/industries')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#5B5876] hover:text-[#151235] block"
                    >
                      Industries We Serve
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Pricing */}
              <button
                onClick={() => handleNavClick('/pricing')}
                className="w-full text-left px-4 py-3 rounded-2xl text-sm font-bold text-[#151235] hover:bg-[#EDEAFB]/50"
              >
                Pricing & Sprint Models
              </button>

              {/* Mobile Contact */}
              <button
                onClick={() => handleNavClick('/contact')}
                className="w-full text-left px-4 py-3 rounded-2xl text-sm font-bold text-[#151235] hover:bg-[#EDEAFB]/50"
              >
                Contact & Project Scoping
              </button>

              <div className="pt-3 border-t border-[#EDEAFB]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenScheduleModal();
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#3B4FD9] to-[#7B5CE8] text-white text-xs font-bold text-center flex items-center justify-center gap-2 hover:shadow-[0_10px_25px_-5px_rgba(59,79,217,0.4)] transition-all shadow-xs active:scale-95"
                >
                  <span>Let's Talk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
