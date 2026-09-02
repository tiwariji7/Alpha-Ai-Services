import React from 'react';
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  Github,
  Globe2,
  Terminal,
  Database,
  Cloud,
  Server,
  Workflow,
} from 'lucide-react';

interface TechItem {
  name: string;
  category: 'Tech' | 'Platform' | 'Ecosystem';
  icon: React.ReactNode;
}

const TECH_ITEMS: TechItem[] = [
  { name: 'React 19', category: 'Tech', icon: <Globe2 className="w-4 h-4 text-[#3B4FD9]" /> },
  { name: 'Next.js 15', category: 'Tech', icon: <Terminal className="w-4 h-4 text-[#151235]" /> },
  { name: 'TypeScript', category: 'Tech', icon: <Code2 className="w-4 h-4 text-[#3B4FD9]" /> },
  { name: 'Python', category: 'Tech', icon: <Cpu className="w-4 h-4 text-[#5B4FE0]" /> },
  { name: 'Node.js', category: 'Tech', icon: <Server className="w-4 h-4 text-[#7B5CE8]" /> },
  { name: 'Go (Golang)', category: 'Tech', icon: <Layers className="w-4 h-4 text-[#4D6BFF]" /> },
  { name: 'PyTorch & AI', category: 'Tech', icon: <Sparkles className="w-4 h-4 text-[#3B4FD9]" /> },
  { name: 'Amazon Web Services (AWS)', category: 'Platform', icon: <Cloud className="w-4 h-4 text-[#4D6BFF]" /> },
  { name: 'Cloudflare Edge', category: 'Platform', icon: <Cloud className="w-4 h-4 text-[#3B4FD9]" /> },
  { name: 'Firebase & GCP', category: 'Platform', icon: <Database className="w-4 h-4 text-[#5B4FE0]" /> },
  { name: 'Docker & Kubernetes', category: 'Platform', icon: <Layers className="w-4 h-4 text-[#3B4FD9]" /> },
  { name: 'pgvector & Vector DBs', category: 'Tech', icon: <Database className="w-4 h-4 text-[#7B5CE8]" /> },
  { name: 'GitHub Enterprise', category: 'Ecosystem', icon: <Github className="w-4 h-4 text-[#151235]" /> },
  { name: 'Open-Source Contributions', category: 'Ecosystem', icon: <GitBranch className="w-4 h-4 text-[#5B4FE0]" /> },
  { name: 'LangChain & LlamaIndex', category: 'Tech', icon: <Workflow className="w-4 h-4 text-[#3B4FD9]" /> },
];

interface TrustStripMarqueeProps {
  title?: string;
  subtitle?: string;
  showHeading?: boolean;
  className?: string;
}

export const TrustStripMarquee: React.FC<TrustStripMarqueeProps> = ({
  title = 'Technology trusted by ambitious teams.',
  subtitle = 'Production-tested modern frameworks, verified cloud providers, and open-source standards.',
  showHeading = true,
  className = '',
}) => {
  // Duplicate list to create a seamless infinite marquee loop
  const marqueeItems = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <section className={`py-8 sm:py-12 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        {showHeading && (
          <div className="text-center space-y-1.5 max-w-2xl mx-auto">
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#3B4FD9]">
              Technology & Platform Ecosystem
            </h3>
            <p className="text-xl sm:text-2xl font-extrabold text-[#151235] tracking-tight">
              {title}
            </p>
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#5B5876]">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Marquee Track with Smooth Infinite Animation & Pause on Hover */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-3 py-2 animate-marquee hover:[animation-play-state:paused]">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-2xl border border-[#EDEAFB] shadow-soft hover:border-[#3B4FD9]/40 hover:shadow-soft-lg transition-all cursor-default select-none shrink-0 group"
            >
              <div className="w-7 h-7 rounded-xl bg-[#EDEAFB] border border-[#7B5CE8]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#151235] group-hover:text-[#3B4FD9] transition-colors whitespace-nowrap">
                  {item.name}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-[#5B5876] font-semibold">
                  {item.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
