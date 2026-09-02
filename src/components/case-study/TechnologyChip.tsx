import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  BrainCircuit,
  Smartphone,
  Server,
  FileScan,
  Cloud,
  HeartPulse,
  Sparkles,
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';

export const TechnologyStackSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Summary chips requested
  const highlightChips = [
    'AI & RAG',
    'Android (Kotlin)',
    'Python',
    'FastAPI',
    'FAISS',
    'SentenceTransformers',
    'OCR',
    'Firebase',
    'Hugging Face',
  ];

  // Categorized technology stack
  const stackCategories = [
    {
      category: 'AI & RAG',
      icon: BrainCircuit,
      accent: 'text-[#2D3DB7] bg-[#F1F2FF] border-[#2D3DB7]/20',
      items: [
        'Medical Large Language Model',
        'Retrieval-Augmented Generation',
        'SentenceTransformers',
        'FAISS',
        'Semantic Embeddings',
      ],
    },
    {
      category: 'Android',
      icon: Smartphone,
      accent: 'text-[#5B86FF] bg-[#EBF2FF] border-[#5B86FF]/30',
      items: ['Android Studio', 'Kotlin / Java'],
    },
    {
      category: 'Backend',
      icon: Server,
      accent: 'text-[#101440] bg-[#EEF1FF] border-[#101440]/20',
      items: ['Python', 'FastAPI', 'Gradio'],
    },
    {
      category: 'OCR',
      icon: FileScan,
      accent: 'text-[#22D3EE] bg-[#ECFEFF] border-[#22D3EE]/40',
      items: ['Tesseract OCR'],
    },
    {
      category: 'Cloud & Data',
      icon: Cloud,
      accent: 'text-[#7C3AED] bg-[#F5F1FF] border-[#7C3AED]/25',
      items: [
        'Hugging Face Spaces',
        'Firebase Authentication',
        'Firebase Firestore',
        'Firebase Cloud Storage',
      ],
    },
    {
      category: 'Healthcare',
      icon: HeartPulse,
      accent: 'text-[#2D3DB7] bg-[#F1F2FF] border-[#2D3DB7]/20',
      items: [
        'Symptom Analysis',
        'Medical Report Analysis',
        'Medical Knowledge Retrieval',
        'Health Assistance',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        index="05 — TECHNOLOGY STACK"
        title="Tools & Frameworks Used"
        subtitle="Specialized AI engineering tools, vector retrieval algorithms, and modern native Android frameworks."
        icon={BrainCircuit}
      />

      {/* Primary Highlights Bar */}
      <div className="rounded-2xl bg-[#F1F2FF]/70 border border-[#2D3DB7]/14 p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#2D3DB7] uppercase tracking-wider font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Technology Highlights</span>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {highlightChips.map((chip) => (
            <motion.div
              key={chip}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { y: -2, scale: 1.02, transition: { duration: 0.2 } }
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#2D3DB7]/20 text-xs sm:text-sm font-bold text-[#0B1235] shadow-2xs hover:border-[#2D3DB7]/50 hover:shadow-xs transition-all cursor-default font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B86FF]" />
              <span>{chip}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Categorized Detailed Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {stackCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.category}
              className="rounded-[22px] bg-white border border-[#2D3DB7]/14 p-5 sm:p-6 shadow-[0_4px_24px_rgba(45,61,183,0.04)] hover:shadow-md transition-shadow duration-300 space-y-4"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center border ${cat.accent}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-base font-extrabold text-[#0B1235] tracking-tight">
                  {cat.category}
                </h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="inline-block px-3 py-1 rounded-xl bg-[#F7F8FF] border border-[#2D3DB7]/10 text-xs font-semibold text-[#0B1235]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
