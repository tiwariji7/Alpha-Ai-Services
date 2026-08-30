import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../data/siteData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const active = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-12 lg:p-16 border border-[#EDE9E4] shadow-soft relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Client Verification</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight">
                Trusted by engineering <br />
                <span className="text-[#FF5A1F]">leaders globally.</span>
              </h2>
              <p className="text-[#6B6660] text-sm leading-relaxed">
                Read how forward-thinking CTOs and product executives accelerate roadmap execution with our dedicated pods.
              </p>

              <div className="pt-4 flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  aria-label="Previous review"
                  className="w-10 h-10 rounded-full border border-[#EDE9E4] bg-[#FAF8F6] hover:bg-white flex items-center justify-center text-[#111111] transition-all shadow-sm active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  aria-label="Next review"
                  className="w-10 h-10 rounded-full border border-[#EDE9E4] bg-[#FAF8F6] hover:bg-white flex items-center justify-center text-[#111111] transition-all shadow-sm active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-[#6B6660] font-semibold ml-2">
                  {currentIndex + 1} of {TESTIMONIALS_DATA.length}
                </span>
              </div>
            </div>

            {/* Right Active Testimonial Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="bg-[#FAF8F6] rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] relative text-left shadow-sm"
                >
                  {/* Stars & Metric badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1 text-amber-500">
                      {[...Array(active.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {active.highlightMetric && (
                      <span className="text-xs font-extrabold text-[#FF5A1F] bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 px-3 py-1 rounded-full">
                        {active.highlightMetric}
                      </span>
                    )}
                  </div>

                  {/* Quote */}
                  <p className="text-base sm:text-lg text-[#111111] font-medium leading-relaxed mb-6 italic">
                    "{active.quote}"
                  </p>

                  {/* Author Meta */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-[#EDE9E4]">
                    <img
                      src={active.avatar}
                      alt={active.author}
                      loading="lazy"
                      decoding="async"
                      className="w-11 h-11 rounded-full object-cover border border-white shadow-sm"
                    />
                    <div>
                      <div className="text-sm font-extrabold text-[#111111]">{active.author}</div>
                      <div className="text-xs text-[#6B6660]">
                        {active.role} • <strong className="text-[#111111]">{active.company}</strong>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
