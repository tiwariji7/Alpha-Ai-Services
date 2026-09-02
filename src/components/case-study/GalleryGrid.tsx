import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Image as ImageIcon, ZoomIn, Eye } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { GalleryLightbox } from './GalleryLightbox';

export const GalleryGrid: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const galleryItems = [
    {
      url: 'https://raw.githubusercontent.com/tiwariji7/SeHAT-SmartCare/main/assets/images/home-symptom.png',
      title: 'Home & Symptom Checker',
      subtitle: 'Primary mobile dashboard with intelligent conversational symptom analysis intake',
      featured: true,
    },
    {
      url: 'https://raw.githubusercontent.com/tiwariji7/SeHAT-SmartCare/main/assets/images/report-chatbot.png',
      title: 'Report Analyzer & AI Chatbot',
      subtitle: 'OCR parameter extraction and contextual medical question-answering',
      featured: true,
    },
    {
      url: 'https://raw.githubusercontent.com/tiwariji7/SeHAT-SmartCare/main/assets/images/insights-reminders.png',
      title: 'Health Insights & Medicine Reminders',
      subtitle: 'Adherence tracking, scheduled dosages, and proactive health recommendations',
      featured: false,
    },
    {
      url: 'https://raw.githubusercontent.com/tiwariji7/SeHAT-SmartCare/main/assets/images/tips-sos.png',
      title: 'Health Tips & Emergency SOS',
      subtitle: 'Curated preventative guidance and immediate one-touch emergency escalation',
      featured: false,
    },
    {
      url: 'https://raw.githubusercontent.com/tiwariji7/SeHAT-SmartCare/main/assets/images/login-signup.png',
      title: 'Authentication & Access',
      subtitle: 'Secure credential verification with biometric & passwordless login',
      featured: false,
    },
    {
      url: 'https://raw.githubusercontent.com/tiwariji7/SeHAT-SmartCare/main/assets/images/positive-login-signup.png',
      title: 'Verified Registration Flow',
      subtitle: 'Compliant user onboarding and profile initialization',
      featured: false,
    },
    {
      url: 'https://raw.githubusercontent.com/tiwariji7/SeHAT-SmartCare/main/assets/images/positive-nagative-signup.png',
      title: 'Validation & Security Guards',
      subtitle: 'Real-time client input verification and state handling',
      featured: false,
    },
  ];

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex(
      (activeLightboxIndex - 1 + galleryItems.length) % galleryItems.length
    );
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        index="PRODUCT VISUALS"
        title="Product Gallery / Visual Artifacts"
        subtitle="High-fidelity interface previews demonstrating the native Android UI, symptom intake screens, and interactive medical diagnostics."
        icon={ImageIcon}
      />

      {/* Asymmetric Responsive Grid:
          - Desktop (lg): 12-column asymmetric layout with 2 featured cards (col-span-6 each or col-span-7 / col-span-5) followed by 3-column supporting cards
          - Tablet (md): 2-column layout
          - Mobile: 1-column layout
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Item 0: Featured primary (Desktop col-span-7) */}
        <motion.div
          whileHover={prefersReducedMotion ? undefined : { y: -3 }}
          onClick={() => setActiveLightboxIndex(0)}
          className="lg:col-span-7 rounded-[22px] overflow-hidden border border-[#2D3DB7]/14 bg-white shadow-[0_4px_24px_rgba(45,61,183,0.06)] hover:shadow-[0_12px_32px_rgba(45,61,183,0.12)] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
        >
          <div className="relative overflow-hidden bg-[#080B2A]/5 aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center p-3">
            <img
              src={galleryItems[0].url}
              alt={galleryItems[0].title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-[#080B2A]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#0B1235] text-xs font-bold shadow-lg">
                <ZoomIn className="w-4 h-4 text-[#2D3DB7]" />
                <span>View Fullscreen</span>
              </span>
            </div>
          </div>
          <div className="p-4 sm:p-5 border-t border-[#2D3DB7]/10 flex items-center justify-between">
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-[#0B1235]">
                {galleryItems[0].title}
              </h4>
              <p className="text-xs text-[#4B5563] mt-0.5 line-clamp-1">
                {galleryItems[0].subtitle}
              </p>
            </div>
            <Eye className="w-4 h-4 text-[#2D3DB7]/60 group-hover:text-[#2D3DB7] transition-colors shrink-0 ml-2" />
          </div>
        </motion.div>

        {/* Item 1: Featured secondary (Desktop col-span-5) */}
        <motion.div
          whileHover={prefersReducedMotion ? undefined : { y: -3 }}
          onClick={() => setActiveLightboxIndex(1)}
          className="lg:col-span-5 rounded-[22px] overflow-hidden border border-[#2D3DB7]/14 bg-white shadow-[0_4px_24px_rgba(45,61,183,0.06)] hover:shadow-[0_12px_32px_rgba(45,61,183,0.12)] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
        >
          <div className="relative overflow-hidden bg-[#080B2A]/5 aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center p-3">
            <img
              src={galleryItems[1].url}
              alt={galleryItems[1].title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-[#080B2A]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#0B1235] text-xs font-bold shadow-lg">
                <ZoomIn className="w-4 h-4 text-[#2D3DB7]" />
                <span>View Fullscreen</span>
              </span>
            </div>
          </div>
          <div className="p-4 sm:p-5 border-t border-[#2D3DB7]/10 flex items-center justify-between">
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-[#0B1235]">
                {galleryItems[1].title}
              </h4>
              <p className="text-xs text-[#4B5563] mt-0.5 line-clamp-1">
                {galleryItems[1].subtitle}
              </p>
            </div>
            <Eye className="w-4 h-4 text-[#2D3DB7]/60 group-hover:text-[#2D3DB7] transition-colors shrink-0 ml-2" />
          </div>
        </motion.div>

        {/* Items 2, 3, 4: Row of 3 on desktop (col-span-4 each) */}
        {galleryItems.slice(2, 5).map((item, idx) => {
          const actualIndex = idx + 2;
          return (
            <motion.div
              key={item.url}
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              onClick={() => setActiveLightboxIndex(actualIndex)}
              className="lg:col-span-4 rounded-[22px] overflow-hidden border border-[#2D3DB7]/14 bg-white shadow-[0_4px_24px_rgba(45,61,183,0.06)] hover:shadow-[0_12px_32px_rgba(45,61,183,0.12)] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative overflow-hidden bg-[#080B2A]/5 aspect-[4/3] flex items-center justify-center p-3">
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-[#080B2A]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#0B1235] text-xs font-bold shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5 text-[#2D3DB7]" />
                    <span>Enlarge</span>
                  </span>
                </div>
              </div>
              <div className="p-4 border-t border-[#2D3DB7]/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#0B1235]">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#4B5563] mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
                <Eye className="w-3.5 h-3.5 text-[#2D3DB7]/60 group-hover:text-[#2D3DB7] transition-colors shrink-0 ml-2" />
              </div>
            </motion.div>
          );
        })}

        {/* Items 5, 6: Balanced bottom pair (col-span-6 each on desktop) */}
        {galleryItems.slice(5, 7).map((item, idx) => {
          const actualIndex = idx + 5;
          return (
            <motion.div
              key={item.url}
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              onClick={() => setActiveLightboxIndex(actualIndex)}
              className="lg:col-span-6 rounded-[22px] overflow-hidden border border-[#2D3DB7]/14 bg-white shadow-[0_4px_24px_rgba(45,61,183,0.06)] hover:shadow-[0_12px_32px_rgba(45,61,183,0.12)] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative overflow-hidden bg-[#080B2A]/5 aspect-[16/10] flex items-center justify-center p-3">
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-[#080B2A]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#0B1235] text-xs font-bold shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5 text-[#2D3DB7]" />
                    <span>Enlarge</span>
                  </span>
                </div>
              </div>
              <div className="p-4 border-t border-[#2D3DB7]/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#0B1235]">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#4B5563] mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
                <Eye className="w-3.5 h-3.5 text-[#2D3DB7]/60 group-hover:text-[#2D3DB7] transition-colors shrink-0 ml-2" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        images={galleryItems}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelect={(idx) => setActiveLightboxIndex(idx)}
      />
    </div>
  );
};
