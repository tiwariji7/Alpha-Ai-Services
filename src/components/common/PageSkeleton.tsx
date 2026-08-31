import React from 'react';

export const PageSkeleton: React.FC = () => {
  return (
    <div
      className="w-full min-h-[75vh] px-4 sm:px-6 lg:px-8 py-10 sm:py-16 max-w-6xl mx-auto space-y-10 animate-pulse pointer-events-none"
      aria-label="Loading page content"
      aria-busy="true"
    >
      {/* Hero Skeleton Area */}
      <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
        {/* Eyebrow badge skeleton */}
        <div className="h-6 w-36 bg-[#EBE7E1] rounded-full" />
        
        {/* Main Heading skeleton */}
        <div className="h-10 sm:h-12 w-4/5 sm:w-3/5 bg-[#E2DCD5] rounded-2xl" />
        <div className="h-7 sm:h-9 w-3/5 sm:w-2/5 bg-[#E8E3DC] rounded-xl" />

        {/* Subtitle skeleton */}
        <div className="h-4 w-5/6 sm:w-4/6 bg-[#EBE7E1] rounded-md mt-2" />
        <div className="h-4 w-4/6 sm:w-3/6 bg-[#EBE7E1] rounded-md" />

        {/* Action buttons skeleton */}
        <div className="flex items-center gap-3 pt-3">
          <div className="h-11 w-36 bg-[#E2DCD5] rounded-full" />
          <div className="h-11 w-32 bg-[#EBE7E1] rounded-full" />
        </div>
      </div>

      {/* Content Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-white/70 border border-[#E7E2DA] space-y-4 shadow-2xs"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#EBE7E1]" />
            <div className="h-5 w-3/4 bg-[#E2DCD5] rounded-lg" />
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-[#EBE7E1] rounded-md" />
              <div className="h-3.5 w-5/6 bg-[#EBE7E1] rounded-md" />
              <div className="h-3.5 w-4/6 bg-[#EBE7E1] rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
