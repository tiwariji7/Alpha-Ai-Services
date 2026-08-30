import React from 'react';
import {
  Mail,
  MapPin,
  ChevronRight,
  ArrowRight,
  Headphones,
  Linkedin,
  Github,
  Instagram,
  MessageCircle,
} from 'lucide-react';
import footerBrandLogo from '../../assets/images/footerbrandlogo.png';
import footerBrandLogoWebp from '../../assets/images/footerbrandlogo.webp';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenScheduleModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const serviceLinks = [
    { title: 'AI & Machine Learning', path: '/services/ai-development' },
    { title: 'Custom Software', path: '/services/software-development' },
    { title: 'Web Applications', path: '/services/web-development' },
    { title: 'Mobile Applications', path: '/services/mobile-apps' },
    { title: 'Automation & Integrations', path: '/services/workflow-automation' },
    { title: 'Cloud & DevOps', path: '/services/cloud-devops' },
  ];

  const companyLinks = [
    { title: 'About Us', path: '/company/about' },
    { title: 'Our Work', path: '/portfolio' },
    { title: 'How We Work', path: '/company/process' },
    { title: 'Industries', path: '/company/industries' },
    { title: 'Technology', path: '/company/story' },
    { title: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: <Linkedin className="w-3.5 h-3.5" />, href: 'https://www.linkedin.com/in/tiwarijii' },
    { name: 'Instagram', icon: <Instagram className="w-3.5 h-3.5" />, href: 'https://www.instagram.com/alphaaiservices.in/?hl=en' },
    { name: 'GitHub', icon: <Github className="w-3.5 h-3.5" />, href: 'https://github.com/tiwariji7' },
  ];

  return (
    <footer className="relative bg-[#07090E] text-[#9EA3B0] pt-8 sm:pt-10 pb-5 px-4 sm:px-6 lg:px-10 overflow-hidden z-10 border-t border-[#161B26]">
      {/* Top Edge Glow Accent */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF5A1F] to-transparent opacity-80" />
      <div className="absolute top-0 left-1/4 w-96 h-16 bg-[#FF5A1F]/15 blur-[50px] pointer-events-none -z-0" />

      {/* Background Decorative Tech Dots Mesh */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none -z-0 bg-[radial-gradient(#FF5A1F_1px,transparent_1px)] [background-size:16px_16px]"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main 4-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-7 lg:gap-6 pb-8">
          {/* Column 1: Brand & Contact Info (LG Span 4) */}
          <div className="lg:col-span-4 space-y-3.5 text-left">
            {/* Brand Logo & Name */}
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
              aria-label="Alpha AI Services Home"
            >
              <picture className="flex items-center shrink-0">
                <source srcSet={footerBrandLogoWebp} type="image/webp" />
                <img
                  src={footerBrandLogo}
                  alt="Alpha AI Services Logo"
                  width="36"
                  height="36"
                  loading="lazy"
                  decoding="async"
                  className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0"
                />
              </picture>
              <div>
                <span className="font-extrabold text-sm sm:text-base tracking-tight leading-tight">
                  <span className="text-white">Alpha</span> <span className="text-[#FF5A1F]">Ai</span> <span className="text-white">Services</span>
                </span>
                <span className="block text-[9.5px] tracking-wider uppercase text-gray-400 font-semibold mt-0.5">
                  Software Engineering Studio
                </span>
              </div>
            </button>

            {/* Description */}
            <p className="text-xs text-[#9EA3B0] max-w-sm leading-relaxed">
              We design and build AI products, web applications, mobile apps and scalable software solutions for startups and growing businesses.
            </p>

            {/* Contact Details with Orange Icons */}
            <div className="space-y-1.5 text-xs text-[#CBD1DC]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                <a
                  href="mailto:info@alphaaiservices.in"
                  className="hover:text-white transition-colors"
                >
                  info@alphaaiservices.in
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/918381835420"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                <span>India &nbsp;•&nbsp; Remote / Hybrid</span>
              </div>
            </div>

            {/* Follow Us & Social Icons */}
            <div className="pt-1 space-y-1.5">
              <div className="text-[11px] text-[#8A90A0] font-medium">Follow us</div>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-7 h-7 rounded-lg bg-[#0F131D] border border-[#1E2433] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#FF5A1F]/50 hover:bg-[#161D2B] transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Services (LG Span 3) */}
          <div className="lg:col-span-3 space-y-2.5 text-left">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF5A1F]">
              SERVICES
            </h4>
            <ul className="space-y-2 text-xs">
              {serviceLinks.map((service) => (
                <li key={service.path}>
                  <button
                    onClick={() => onNavigate(service.path)}
                    className="w-full flex items-center justify-between text-[#B2B8C6] hover:text-white transition-colors group text-left py-0.5"
                  >
                    <span>{service.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#5A6275] group-hover:text-[#FF5A1F] group-hover:translate-x-0.5 transition-all" />
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button
                  onClick={() => onNavigate('/services')}
                  className="font-bold text-[#FF5A1F] hover:text-[#FF7A3D] flex items-center gap-1 group text-xs"
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company (LG Span 2) */}
          <div className="lg:col-span-2 space-y-2.5 text-left">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF5A1F]">
              COMPANY
            </h4>
            <ul className="space-y-2 text-xs">
              {companyLinks.map((company) => (
                <li key={company.path}>
                  <button
                    onClick={() => onNavigate(company.path)}
                    className="w-full flex items-center justify-between text-[#B2B8C6] hover:text-white transition-colors group text-left py-0.5"
                  >
                    <span>{company.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#5A6275] group-hover:text-[#FF5A1F] group-hover:translate-x-0.5 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Let's Work Together (LG Span 3) */}
          <div className="lg:col-span-3 space-y-2.5 text-left">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF5A1F]">
              LET'S WORK TOGETHER
            </h4>

            <p className="text-xs text-[#B2B8C6] leading-relaxed">
              Have a product idea or a business problem to solve?
            </p>

            {/* Buttons */}
            <div className="space-y-2 pt-0.5">
              <button
                onClick={() => onNavigate('/contact')}
                className="w-full bg-gradient-to-r from-[#FF5A1F] to-[#FF702E] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:brightness-110 hover:shadow-md hover:shadow-[#FF5A1F]/20 transition-all flex items-center justify-center gap-2 group active:scale-98 shadow-xs"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('/contact')}
                className="w-full bg-[#0D111A] text-white border border-[#FF5A1F]/40 hover:border-[#FF5A1F] hover:bg-[#131926] px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Response Time Badge */}
            <div className="pt-1 flex items-center gap-2.5 text-xs text-[#9EA3B0]">
              <div className="w-7 h-7 rounded-full bg-[#121622] border border-[#1E2536] flex items-center justify-center text-[#FF5A1F] shrink-0">
                <Headphones className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10.5px] leading-tight">
                We typically respond within one business day.
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-4 border-t border-[#161B26] flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#6C7282] text-center md:text-left">
          {/* Left: Copyright */}
          <div className="text-[11px]">
            © 2026 Alpha AI Services. All rights reserved.
          </div>

          {/* Center: AI • Software • Product Engineering */}
          <div className="hidden lg:flex items-center gap-2 text-[#7F8698] font-medium text-[11px]">
            <span>AI</span>
            <span className="text-[#FF5A1F]">•</span>
            <span>Software</span>
            <span className="text-[#FF5A1F]">•</span>
            <span>Product Engineering</span>
          </div>

          {/* Right: Legal Links with Vertical Dividers */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-[11px] text-[#8A90A0]">
            <button
              onClick={() => onNavigate('/privacy-policy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-[#2B3244]">|</span>
            <button
              onClick={() => onNavigate('/terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <span className="text-[#2B3244]">|</span>
            <button
              onClick={() => onNavigate('/sitemap')}
              className="hover:text-white transition-colors"
            >
              Sitemap
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
