import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GalleryLightboxProps {
  images: { url: string; title: string; subtitle: string }[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onSelect,
}) => {
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, onPrev, onNext]);

  if (currentIndex === null) return null;

  const currentItem = images[currentIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Backdrop blur with deep navy tint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#080B2A]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 max-w-5xl w-full max-h-[92vh] flex flex-col items-center"
        >
          {/* Top Bar with Title & Close button */}
          <div className="w-full flex items-center justify-between pb-3 text-white px-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#22D3EE] bg-[#22D3EE]/15 border border-[#22D3EE]/30 px-2.5 py-0.5 rounded-md">
                {currentIndex + 1} / {images.length}
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white leading-tight">
                  {currentItem.title}
                </h4>
                <p className="text-xs text-[#B8BEDC] hidden sm:block">
                  {currentItem.subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image Container */}
          <div className="relative w-full rounded-[22px] overflow-hidden bg-[#080B2A] border border-white/15 flex items-center justify-center max-h-[78vh] shadow-2xl">
            <img
              src={currentItem.url}
              alt={currentItem.title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg select-none"
            />

            {/* Left Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex items-center justify-center gap-2 pt-3 overflow-x-auto max-w-full px-2">
            {images.map((img, idx) => (
              <button
                key={img.url}
                onClick={() => onSelect(idx)}
                aria-label={`View ${img.title}`}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  idx === currentIndex
                    ? 'border-[#22D3EE] scale-105 shadow-md'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
