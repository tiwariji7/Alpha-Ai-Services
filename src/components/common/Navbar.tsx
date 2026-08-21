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
        return <Sparkles className="w-4 h-4 text-[#FF5A1F]" />;
      case 'Globe':
      case 'web':
        return <Globe className="w-4 h-4 text-blue-500" />;
      case 'Smartphone':
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-emerald-500" />;
      case 'Cloud':
      case 'cloud':
        return <Cloud className="w-4 h-4 text-purple-500" />;
      case 'ShieldCheck':
      case 'Shield':
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-red-500" />;
      case 'Palette':
      case 'design':
        return <Palette className="w-4 h-4 text-pink-500" />;
      case 'Workflow':
      case 'Zap':
      case 'automation':
        return <Workflow className="w-4 h-4 text-indigo-500" />;
      default:
        return <Code2 className="w-4 h-4 text-[#FF5A1F]" />;
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-[#EDE9E4]/80 shadow-xs'
          : 'bg-white/70 backdrop-blur-xl border-b border-[#EDE9E4]/40'
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
                width="60"
                height="40"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="brand-logo-header"
              />
            </picture>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight leading-tight">
                <span className="text-[#FF5A1F]">Alpha</span> <span className="text-[#111111]">Ai</span> <span className="text-[#FF5A1F]">Services</span>
              </span>
              <span className="text-[10px] text-[#6B6660] font-medium tracking-wider uppercase">
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
                    ? 'text-[#FF5A1F] bg-[#FF5A1F]/5'
                    : 'text-[#111111] hover:text-[#FF5A1F] hover:bg-[#111111]/5'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'services' ? 'rotate-180 text-[#FF5A1F]' : ''
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
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[720px] bg-white/95 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border border-[#EDE9E4] z-50 text-left"
                  >
                    <div className="grid grid-cols-12 gap-6">
                      {/* Left: Highlight / Quick pitch */}
                      <div className="col-span-4 bg-[#FAF8F6] p-4 rounded-2xl border border-[#EDE9E4] flex flex-col justify-between">
                        <div>
                          <div className="w-8 h-8 rounded-xl bg-[#FF5A1F]/10 flex items-center justify-center text-[#FF5A1F] mb-3">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF5A1F] mb-1">
                            Engineered for Scale
                          </h4>
                          <p className="text-xs text-[#6B6660] leading-relaxed">
                            From AI agents and high-throughput backends to mission-critical platforms.
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#EDE9E4] space-y-2">
                          <button
                            onClick={() => handleNavClick('/services')}
                            className="text-xs font-bold text-[#111111] hover:text-[#FF5A1F] flex items-center gap-1.5 group"
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
                            className="p-2.5 rounded-xl hover:bg-[#FAF8F6] transition-colors cursor-pointer group flex items-start gap-2.5"
                          >
                            <div className="w-7 h-7 rounded-lg bg-white border border-[#EDE9E4] flex items-center justify-center shrink-0 group-hover:border-[#FF5A1F]/30 transition-colors shadow-xs">
                              {getCategoryIcon(service.iconName)}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#111111] group-hover:text-[#FF5A1F] transition-colors leading-tight">
                                {service.title}
                              </div>
                              <div className="text-[11px] text-[#6B6660] line-clamp-1 mt-0.5">
                                {service.shortDesc}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Quick Row */}
                    <div className="mt-3 pt-3 border-t border-[#EDE9E4] bg-[#FAF8F6] -mx-5 -mb-5 p-4 flex items-center justify-between">
                      <div className="text-xs text-[#6B6660]">
                        Need custom scoping or multi-stack architecture?
                      </div>
                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          handleNavClick('/contact');
                        }}
                        className="text-xs font-bold text-[#111111] hover:text-[#FF5A1F] flex items-center gap-1.5"
                      >
                        <span>Get In Touch</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#FF5A1F]" />
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
                  ? 'text-[#FF5A1F] bg-[#FF5A1F]/5'
                  : 'text-[#111111] hover:text-[#FF5A1F] hover:bg-[#111111]/5'
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
                    ? 'text-[#FF5A1F] bg-[#FF5A1F]/5'
                    : 'text-[#111111] hover:text-[#FF5A1F] hover:bg-[#111111]/5'
                }`}
              >
                <span>Company</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'company' ? 'rotate-180 text-[#FF5A1F]' : ''
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
                    className="absolute left-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-2xl rounded-3xl p-3 shadow-2xl border border-[#EDE9E4] z-50 text-left"
                  >
                    <div className="space-y-1">
                      <div
                        onClick={() => handleNavClick('/company/about')}
                        className="p-3 rounded-2xl hover:bg-[#FAF8F6] transition-colors cursor-pointer group flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF5A1F] flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111111] group-hover:text-[#FF5A1F]">
                            About Us & Leadership
                          </div>
                          <div className="text-[10px] text-[#6B6660]">Engineering DNA & values</div>
                        </div>
                      </div>

                      <div
                        onClick={() => handleNavClick('/company/story')}
                        className="p-3 rounded-2xl hover:bg-[#FAF8F6] transition-colors cursor-pointer group flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <History className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111111] group-hover:text-[#FF5A1F]">
                            Our Story
                          </div>
                          <div className="text-[10px] text-[#6B6660]">Why we started Alpha AI Services</div>
                        </div>
                      </div>

                      <div
                        onClick={() => handleNavClick('/company/process')}
                        className="p-3 rounded-2xl hover:bg-[#FAF8F6] transition-colors cursor-pointer group flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111111] group-hover:text-[#FF5A1F]">
                            5-Stage Agile Process
                          </div>
                          <div className="text-[10px] text-[#6B6660]">PRD to production telemetry</div>
                        </div>
                      </div>

                      <div
                        onClick={() => handleNavClick('/company/industries')}
                        className="p-3 rounded-2xl hover:bg-[#FAF8F6] transition-colors cursor-pointer group flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                          <Boxes className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111111] group-hover:text-[#FF5A1F]">
                            Industries We Serve
                          </div>
                          <div className="text-[10px] text-[#6B6660]">Fintech, Health, SaaS & Retail</div>
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
                  ? 'text-[#FF5A1F] bg-[#FF5A1F]/5'
                  : 'text-[#111111] hover:text-[#FF5A1F] hover:bg-[#111111]/5'
              }`}
            >
              Pricing
            </button>

            {/* Contact Link */}
            <button
              onClick={() => handleNavClick('/contact')}
              className={`px-3.5 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all ${
                currentPath === '/contact'
                  ? 'text-[#FF5A1F] bg-[#FF5A1F]/5'
                  : 'text-[#111111] hover:text-[#FF5A1F] hover:bg-[#111111]/5'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Right Action CTA */}
          <div className="flex items-center gap-2.5">
            {/* Desktop Only: Clean Solid Pill CTA */}
            <button
              onClick={() => onOpenScheduleModal()}
              className="hidden lg:inline-flex items-center gap-2 bg-[#111111] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold hover:bg-[#262626] hover:shadow-md transition-all group active:scale-95 shadow-xs"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Mobile Hamburger Toggle: Sole Trigger on Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#111111] hover:bg-[#111111]/5 rounded-full transition-colors"
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
            className="lg:hidden fixed inset-x-3 top-20 bg-white rounded-3xl p-5 shadow-2xl border border-[#EDE9E4] z-50 max-h-[85vh] overflow-y-auto"
          >
            <div className="space-y-2">
              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-[#111111] hover:bg-[#FAF8F6]"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileServicesOpen ? 'rotate-180 text-[#FF5A1F]' : ''
                    }`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-1 bg-[#FAF8F6] rounded-2xl my-1">
                    <button
                      onClick={() => handleNavClick('/services')}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-[#FF5A1F]"
                    >
                      → View All Services Overview
                    </button>
                    {SERVICES_DATA.map((s) => (
                      <button
                        key={s.slug}
                        onClick={() => handleNavClick(`/services/${s.slug}`)}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-[#6B6660] hover:text-[#111111] block"
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
                className="w-full text-left px-4 py-3 rounded-2xl text-sm font-bold text-[#111111] hover:bg-[#FAF8F6]"
              >
                Portfolio & Case Studies
              </button>

              {/* Mobile Company Accordion */}
              <div>
                <button
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-[#111111] hover:bg-[#FAF8F6]"
                >
                  <span>Company</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileCompanyOpen ? 'rotate-180 text-[#FF5A1F]' : ''
                    }`}
                  />
                </button>
                {mobileCompanyOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-1 bg-[#FAF8F6] rounded-2xl my-1">
                    <button
                      onClick={() => handleNavClick('/company/about')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#6B6660] hover:text-[#111111] block"
                    >
                      About Us & Leadership
                    </button>
                    <button
                      onClick={() => handleNavClick('/company/story')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#6B6660] hover:text-[#111111] block"
                    >
                      Our Story & Mission
                    </button>
                    <button
                      onClick={() => handleNavClick('/company/process')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#6B6660] hover:text-[#111111] block"
                    >
                      5-Stage Agile Process
                    </button>
                    <button
                      onClick={() => handleNavClick('/company/industries')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-[#6B6660] hover:text-[#111111] block"
                    >
                      Industries We Serve
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Pricing */}
              <button
                onClick={() => handleNavClick('/pricing')}
                className="w-full text-left px-4 py-3 rounded-2xl text-sm font-bold text-[#111111] hover:bg-[#FAF8F6]"
              >
                Pricing & Sprint Models
              </button>

              {/* Mobile Contact */}
              <button
                onClick={() => handleNavClick('/contact')}
                className="w-full text-left px-4 py-3 rounded-2xl text-sm font-bold text-[#111111] hover:bg-[#FAF8F6]"
              >
                Contact & Project Scoping
              </button>

              <div className="pt-3 border-t border-[#EDE9E4]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenScheduleModal();
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#111111] text-white text-xs font-bold text-center flex items-center justify-center gap-2 hover:bg-[#262626] transition-colors shadow-xs active:scale-95"
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
