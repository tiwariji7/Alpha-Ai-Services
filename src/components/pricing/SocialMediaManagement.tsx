import React from 'react';
import { Sparkles, Check, DollarSign } from 'lucide-react';

export const SocialMediaManagement: React.FC = () => {
  const stackItems = [
    { title: 'Website Management', desc: 'Uptime, layout fixes, and speed' },
    { title: 'SEO Maintenance', desc: 'Search visibility & indexing checks' },
    { title: 'Social Media', desc: 'Planned organic brand presence' },
    { title: 'Analytics & Tracking', desc: 'Traffic telemetry & conversion data' },
    { title: 'Technical Maintenance', desc: 'Security, backups & infrastructure' },
  ];

  const levels = [
    {
      tier: 'Digital Starter',
      name: 'Social Media Support',
      desc: 'Foundational social presence assistance, brand templates, and scheduled publishing support.',
      badge: 'Starter',
      bullets: [
        'Single primary social platform support',
        'Basic post template guidance & captions',
        'Monthly publishing schedule',
        'Basic engagement monitoring',
      ],
    },
    {
      tier: 'Business Growth',
      name: 'Social Media Management',
      desc: 'Active, consistent management across core channels with planned brand creatives & performance analytics.',
      badge: 'Included in Growth',
      highlight: true,
      bullets: [
        'Core business social channels management',
        'Regular planned brand creative posting',
        'Content calendar & copy approval',
        'Monthly performance insights',
      ],
    },
    {
      tier: 'Technology Partner',
      name: 'Advanced Social Media Management',
      desc: 'Comprehensive multi-platform organic management, cross-channel synchronization, and in-depth growth reporting.',
      badge: 'Included in Partner',
      bullets: [
        'Multi-platform comprehensive management',
        'Custom visual assets & campaign alignment',
        'Multi-channel synchronization',
        'Comprehensive monthly analytics review',
      ],
    },
  ];

  return (
    <section className="px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#EDEAFB] shadow-soft text-left space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UNIFIED DIGITAL PRESENCE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151235] tracking-tight">
            Keep Your Technology and <span className="text-[#3B4FD9]">Digital Presence Connected.</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#5B5876] leading-relaxed">
            Instead of coordinating isolated marketing agencies and developers separately, Alpha connects your website, SEO, social media, analytics, and software maintenance under one single team.
          </p>
        </div>

        {/* 5 Connected Stack Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {stackItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-[#F6F5FC] rounded-xl border border-[#EDEAFB] space-y-1 text-left"
            >
              <div className="text-xs font-extrabold text-[#151235]">{item.title}</div>
              <div className="text-[11px] text-[#5B5876] leading-tight">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* 3 Tier Levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {levels.map((lvl, idx) => (
            <div
              key={idx}
              className={`p-5 sm:p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${
                lvl.highlight
                  ? 'bg-white border-[#3B4FD9] shadow-[0_8px_30px_rgba(91,79,224,0.12)]'
                  : 'bg-[#F6F5FC] border-[#EDEAFB]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B5876]">
                    {lvl.tier}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      lvl.highlight
                        ? 'bg-[#EDEAFB] text-[#5B4FE0]'
                        : 'bg-[#EDEAFB] text-[#5B5876]'
                    }`}
                  >
                    {lvl.badge}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-[#151235]">{lvl.name}</h3>
                <p className="text-xs text-[#5B5876] leading-relaxed">{lvl.desc}</p>
              </div>

              <ul className="space-y-1.5 text-xs text-[#151235] border-t border-[#EDEAFB] pt-3">
                {lvl.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#3B4FD9] shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Advertising Exclusions Disclaimer */}
        <div className="p-4 bg-[#EDEAFB]/50 rounded-2xl border border-[#EDEAFB] flex items-start gap-3 text-xs sm:text-[13px] text-[#5B5876]">
          <DollarSign className="w-4 h-4 text-[#3B4FD9] shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#151235]">Ad Spend Transparency:</strong> Paid advertising budgets (Meta Ads, Google Ads, LinkedIn Ads) are separate and controlled directly by the client. Monthly retainers cover organic management, creative scheduling, and technical optimization.
          </span>
        </div>
      </div>
    </section>
  );
};
