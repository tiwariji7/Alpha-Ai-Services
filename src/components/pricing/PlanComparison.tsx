import React from 'react';
import { Sparkles, Check, Minus } from 'lucide-react';
import { COMPARISON_TABLE_ROWS } from '../../data/pricingData';

export const PlanComparison: React.FC = () => {
  const renderCellContent = (value: string) => {
    if (value.startsWith('✓')) {
      return (
        <span className="inline-flex items-center gap-1 text-[#151235] font-bold">
          <Check className="w-3.5 h-3.5 text-[#3B4FD9] shrink-0" />
          <span>{value.replace('✓ ', '')}</span>
        </span>
      );
    }
    if (value === '—') {
      return <Minus className="w-4 h-4 text-[#5B5876]/40 mx-auto" />;
    }
    return <span className="font-medium text-[#151235]">{value}</span>;
  };

  return (
    <section id="plan-comparison-section" className="px-4 sm:px-6 max-w-6xl mx-auto space-y-6 sm:space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FEATURE MATRIX</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151235] tracking-tight">
          Compare Your Technology Partnership
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#5B5876]">
          See exactly how support, engineering access and capabilities increase with each plan.
        </p>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#EDEAFB] shadow-soft overflow-hidden">
        {/* Mobile Horizontal Scroll inside Table with Sticky First Column */}
        <div className="overflow-x-auto relative">
          <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[620px] sm:min-w-[720px]">
            <thead>
              <tr className="border-b border-[#EDEAFB] bg-[#F6F5FC]">
                <th className="py-4 px-4 sm:px-6 font-extrabold text-[#151235] sticky left-0 bg-[#F6F5FC] z-10 w-1/3 sm:w-2/5 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                  Capability & Support
                </th>
                <th className="py-4 px-3 sm:px-4 font-extrabold text-[#151235] text-center w-1/5">
                  <div>Digital Starter</div>
                  <div className="text-[11px] font-bold text-[#3B4FD9] mt-0.5">₹9,999/mo</div>
                </th>
                <th className="py-4 px-3 sm:px-4 font-extrabold text-[#151235] text-center w-1/5 bg-[#EDEAFB]/60 border-x border-[#EDEAFB]">
                  <div>Business Growth</div>
                  <div className="text-[11px] font-bold text-[#3B4FD9] mt-0.5">₹24,999/mo</div>
                </th>
                <th className="py-4 px-3 sm:px-4 font-extrabold text-[#151235] text-center w-1/5">
                  <div>Tech Partner</div>
                  <div className="text-[11px] font-bold text-[#3B4FD9] mt-0.5">₹49,999/mo</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDEAFB]">
              {COMPARISON_TABLE_ROWS.map((row, idx) => {
                const isHighlight = row.highlight;
                return (
                  <tr
                    key={idx}
                    className={`hover:bg-[#F6F5FC]/80 transition-colors ${
                      isHighlight ? 'bg-[#EDEAFB]/30' : idx % 2 === 1 ? 'bg-[#F6F5FC]/30' : ''
                    }`}
                  >
                    <td
                      className={`py-3.5 px-4 sm:px-6 font-semibold sticky left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] ${
                        isHighlight
                          ? 'bg-[#EDEAFB]/60 font-bold text-[#151235]'
                          : idx % 2 === 1
                          ? 'bg-[#F6F5FC]/60 text-[#151235]'
                          : 'bg-white text-[#151235]'
                      }`}
                    >
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-3 sm:px-4 text-center text-[#5B5876]">
                      {renderCellContent(row.starter)}
                    </td>
                    <td className="py-3.5 px-3 sm:px-4 text-center bg-[#EDEAFB]/40 border-x border-[#EDEAFB] font-semibold text-[#151235]">
                      {renderCellContent(row.growth)}
                    </td>
                    <td className="py-3.5 px-3 sm:px-4 text-center text-[#151235] font-semibold">
                      {renderCellContent(row.partner)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
