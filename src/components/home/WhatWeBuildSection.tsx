import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bot,
  Code2,
  Smartphone,
  Sparkles,
  Workflow,
  Cloud,
  ArrowRight,
} from 'lucide-react';

interface WhatWeBuildSectionProps {
  onNavigate: (path: string) => void;
}

interface PetalItem {
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  accentBarColor: string;
  path: string;
  rotationDeg: number;
  contentX: number;
  contentY: number;
  numberX: number;
  numberY: number;
}

const PETAL_ITEMS: PetalItem[] = [
  {
    number: '01',
    title: 'AI & Machine Learning',
    desc: 'AI assistants, RAG & custom AI systems.',
    icon: <Bot className="w-5 h-5 text-[#FF5A1F]" />,
    color: '#FF5A1F',
    accentBarColor: '#FF5A1F',
    path: '/services/ai-development',
    rotationDeg: 0,
    contentX: 300,
    contentY: 140,
    numberX: 300,
    numberY: 245,
  },
  {
    number: '02',
    title: 'Web Applications',
    desc: 'Modern web apps, SaaS & platforms.',
    icon: <Code2 className="w-5 h-5 text-[#D97706]" />,
    color: '#D97706',
    accentBarColor: '#D97706',
    path: '/services/web-development',
    rotationDeg: 60,
    contentX: 439,
    contentY: 220,
    numberX: 349,
    numberY: 272,
  },
  {
    number: '03',
    title: 'Mobile Apps',
    desc: 'Android & cross-platform apps.',
    icon: <Smartphone className="w-5 h-5 text-[#B84A1F]" />,
    color: '#B84A1F',
    accentBarColor: '#B84A1F',
    path: '/services/mobile-apps',
    rotationDeg: 120,
    contentX: 439,
    contentY: 380,
    numberX: 349,
    numberY: 328,
  },
  {
    number: '04',
    title: 'SaaS & Products',
    desc: 'MVP to production scalable software.',
    icon: <Sparkles className="w-5 h-5 text-[#FF7A50]" />,
    color: '#FF7A50',
    accentBarColor: '#FF7A50',
    path: '/services/enterprise-systems',
    rotationDeg: 180,
    contentX: 300,
    contentY: 460,
    numberX: 300,
    numberY: 355,
  },
  {
    number: '05',
    title: 'Business Automation',
    desc: 'Automate workflows & connect tools.',
    icon: <Workflow className="w-5 h-5 text-[#F5A623]" />,
    color: '#F5A623',
    accentBarColor: '#F5A623',
    path: '/services/workflow-automation',
    rotationDeg: 240,
    contentX: 161,
    contentY: 380,
    numberX: 251,
    numberY: 328,
  },
  {
    number: '06',
    title: 'Cloud & Backend',
    desc: 'Secure APIs, cloud infra & backends.',
    icon: <Cloud className="w-5 h-5 text-[#3D2E24]" />,
    color: '#3D2E24',
    accentBarColor: '#3D2E24',
    path: '/services/cloud-devops',
    rotationDeg: 300,
    contentX: 161,
    contentY: 220,
    numberX: 251,
    numberY: 272,
  },
];

export const WhatWeBuildSection: React.FC<WhatWeBuildSectionProps> = ({ onNavigate }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Soft Glow Highlight */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#FF5A1F]/6 via-[#FFB347]/3 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Minimal Scannable Content (Width: 40%) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-5 text-left flex flex-col justify-center space-y-3.5 sm:space-y-4 lg:pr-8"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Core Capabilities</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
              Technology We <span className="text-[#FF5A1F]">Build</span>
            </h2>

            <div className="space-y-2 max-w-md">
              <p className="text-xs sm:text-base md:text-lg text-[#6B6660] leading-relaxed">
                From AI-powered products to modern digital platforms, we design and build technology around real business needs.
              </p>

              <p className="text-[11.5px] sm:text-xs md:text-sm text-[#8C867F] leading-relaxed">
                <span className="hidden lg:inline">
                  Explore the 6 core areas we specialize in — hover or tap each petal to see what we build.
                </span>
                <span className="lg:hidden">
                  Explore the 6 core areas we specialize in below.
                </span>
              </p>
            </div>

            <div className="pt-1 sm:pt-1.5">
              <button
                onClick={() => onNavigate('/services')}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#FF5A1F] hover:text-[#e04c15] transition-colors group py-1"
              >
                <span>Explore All Services</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Hexagonal Petal Graphic */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end items-center">
            {/* Desktop Clean Fixed Hexagonal Petal Infographic */}
            <div className="hidden lg:block relative w-[540px] h-[540px] select-none">
              {/* Soft Ambient Center Radial Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-gradient-to-tr from-[#FF5A1F]/15 via-[#FFB347]/10 to-transparent blur-xl pointer-events-none z-0" />

              {/* Clean Concentric SVG Infographic */}
              <svg
                viewBox="0 0 600 600"
                className="w-full h-full overflow-visible relative z-10 drop-shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
              >
                <defs>
                  {/* Soft Drop Shadow Filter for Petal Cards */}
                  <filter id="cleanPetalShadow" x="-10%" y="-10%" width="125%" height="125%">
                    <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#000000" floodOpacity="0.06" />
                  </filter>
                </defs>

                {/* 1. Concentric Outer Decorative Ring (Centered at exact 300, 300) */}
                <circle
                  cx="300"
                  cy="300"
                  r="276"
                  fill="none"
                  stroke="#EDE9E4"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                  opacity="0.8"
                />

                {/* 2. 6 Fixed Triangular Petals (Sequential Entrance, Fixed in Place) */}
                {PETAL_ITEMS.map((item, idx) => {
                  const isHovered = hoveredIndex === idx;
                  const isOtherHovered = hoveredIndex !== null && !isHovered;

                  return (
                    <motion.g
                      key={item.number}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.12,
                        ease: 'easeOut',
                      }}
                      style={{ originX: '300px', originY: '300px' }}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => onNavigate(item.path)}
                      className="cursor-pointer"
                    >
                      {/* Petal Geometry Rotated Around Shared Exact Center (300, 300) */}
                      <g
                        transform={`rotate(${item.rotationDeg} 300 300)`}
                        className="transition-all duration-300"
                        style={{
                          opacity: isOtherHovered ? 0.65 : 1,
                          transform: isHovered
                            ? `rotate(${item.rotationDeg}deg) scale(1.03)`
                            : `rotate(${item.rotationDeg}deg) scale(1)`,
                          transformOrigin: '300px 300px',
                        }}
                      >
                        {/* Outer Accent Color Bar */}
                        <path
                          d="M 230 40 Q 300 24 370 40"
                          stroke={item.accentBarColor}
                          strokeWidth="4.5"
                          strokeLinecap="round"
                          fill="none"
                          className="opacity-95"
                        />

                        {/* White Petal Card Body */}
                        <path
                          d="M 226 58 Q 300 38 374 58 Q 396 78 372 165 L 333 234 A 75 75 0 0 0 267 234 L 228 165 Q 204 78 226 58 Z"
                          fill={isHovered ? '#FAF8F6' : '#FFFFFF'}
                          stroke={isHovered ? item.color : '#EDE9E4'}
                          strokeWidth={isHovered ? '2' : '1.5'}
                          filter="url(#cleanPetalShadow)"
                          className="transition-all duration-200"
                        />

                        {/* Inner Number Wedge at Base (Fits perfectly at hub edge) */}
                        <path
                          d="M 267 234 A 75 75 0 0 1 333 234 L 317 264 A 40 40 0 0 0 283 264 Z"
                          fill={item.color}
                          className="transition-all duration-200"
                        />
                      </g>

                      {/* Number Badge Text Inside the Colored Wedge (Aligned in 60° increments) */}
                      <text
                        x={item.numberX}
                        y={item.numberY}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#FFFFFF"
                        fontSize="11"
                        fontWeight="900"
                        className="pointer-events-none select-none tracking-tight"
                      >
                        {item.number}
                      </text>

                      {/* Upright Content Fixed Inside the Petal */}
                      <foreignObject
                        x={item.contentX - 68}
                        y={item.contentY - 50}
                        width="136"
                        height="100"
                        className="overflow-visible pointer-events-none"
                      >
                        <div
                          className="w-full h-full flex flex-col items-center justify-center text-center p-1 space-y-1 transition-opacity duration-200"
                          style={{ opacity: isOtherHovered ? 0.65 : 1 }}
                        >
                          <div
                            className="w-7 h-7 rounded-lg bg-[#FAF8F6] border border-[#EDE9E4] flex items-center justify-center shadow-2xs transition-all duration-200"
                            style={{
                              transform: isHovered ? 'scale(1.12)' : 'scale(1)',
                              borderColor: isHovered ? `${item.color}50` : '#EDE9E4',
                            }}
                          >
                            {item.icon}
                          </div>
                          <div
                            className="text-[12px] font-extrabold transition-colors leading-tight line-clamp-1"
                            style={{ color: isHovered ? '#FF5A1F' : '#111111' }}
                          >
                            {item.title}
                          </div>
                          <div className="text-[9.5px] text-[#6B6660] leading-tight line-clamp-2">
                            {item.desc}
                          </div>
                        </div>
                      </foreignObject>
                    </motion.g>
                  );
                })}

                {/* 3. Center Hub (Perfect Fixed Circle at exact Convergence Point 300, 300) */}
                <circle
                  cx="300"
                  cy="300"
                  r="38"
                  fill="#FFFFFF"
                  stroke="#EDE9E4"
                  strokeWidth="2.5"
                  className="shadow-sm"
                />
                <circle
                  cx="300"
                  cy="300"
                  r="16"
                  fill="#FAF8F6"
                  stroke="#EDE9E4"
                  strokeWidth="1.5"
                />
                <circle
                  cx="300"
                  cy="300"
                  r="6"
                  fill="#FF5A1F"
                />
              </svg>
            </div>

            {/* Mobile / Tablet 2-Column Grid Fallback */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:hidden text-left">
              {PETAL_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  onClick={() => onNavigate(item.path)}
                  className="bg-white rounded-2xl p-4 border border-[#EDE9E4] shadow-soft hover:shadow-soft-lg hover:border-[#FF5A1F]/40 transition-all flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                >
                  {/* Top Ambient Accent Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: item.color }}
                  />

                  <div className="space-y-2.5 pt-1">
                    {/* Header: Icon + Colored Number Pill */}
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] flex items-center justify-center shadow-2xs group-hover:border-[#FF5A1F]/30 transition-colors">
                        {item.icon}
                      </div>
                      <span
                        className="text-[10px] font-black text-white px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.number}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-extrabold text-[#111111] group-hover:text-[#FF5A1F] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[10.5px] sm:text-xs text-[#6B6660] leading-relaxed mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2.5 mt-2.5 border-t border-[#EDE9E4]/80 flex items-center justify-between">
                    <span className="text-[10.5px] font-bold text-[#FF5A1F] inline-flex items-center gap-1">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
