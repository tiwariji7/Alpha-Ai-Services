import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export const DisclaimerCard: React.FC = () => {
  return (
    <div className="rounded-[24px] bg-gradient-to-r from-[#F1F2FF] via-white to-[#F7F8FF] border border-[#2D3DB7]/20 p-6 sm:p-7 shadow-[0_4px_24px_rgba(45,61,183,0.06)] relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-11 h-11 rounded-2xl bg-[#F1F2FF] border border-[#2D3DB7]/25 flex items-center justify-center text-[#2D3DB7] shrink-0 shadow-2xs">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#2D3DB7] uppercase tracking-wider">
              PROJECT DISCLAIMER
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D3DB7]" />
            <span className="text-xs font-mono text-[#4B5563]">Clinical Advisory Notice</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#0B1235] leading-relaxed">
            SeHAT SmartCare is designed as a health assistance and information platform and does not replace professional medical diagnosis or consultation.
          </p>
        </div>
      </div>
    </div>
  );
};
