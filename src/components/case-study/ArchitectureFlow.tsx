import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  User,
  Smartphone,
  Server,
  Cpu,
  Database,
  BrainCircuit,
  HeartPulse,
  ArrowRight,
  ArrowDown,
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface ArchitectureStep {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bgColor: string;
  borderColor: string;
}

export const ArchitectureFlow: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const steps: ArchitectureStep[] = [
    {
      id: 'user',
      label: 'User',
      sublabel: 'Patient / Inquirer',
      icon: User,
      accentColor: 'text-[#2D3DB7]',
      bgColor: 'bg-[#F1F2FF]',
      borderColor: 'border-[#2D3DB7]/20',
    },
    {
      id: 'android',
      label: 'Android App',
      sublabel: 'Kotlin Client UI',
      icon: Smartphone,
      accentColor: 'text-[#5B86FF]',
      bgColor: 'bg-[#EBF2FF]',
      borderColor: 'border-[#5B86FF]/30',
    },
    {
      id: 'fastapi',
      label: 'FastAPI Backend',
      sublabel: 'Async API Gateway',
      icon: Server,
      accentColor: 'text-[#101440]',
      bgColor: 'bg-[#EEF1FF]',
      borderColor: 'border-[#101440]/20',
    },
    {
      id: 'ai-proc',
      label: 'AI Processing',
      sublabel: 'Pipelines & Embeddings',
      icon: Cpu,
      accentColor: 'text-[#7C3AED]',
      bgColor: 'bg-[#F5F1FF]',
      borderColor: 'border-[#7C3AED]/25',
    },
    {
      id: 'faiss',
      label: 'FAISS Knowledge Retrieval',
      sublabel: 'Vector Similarity Index',
      icon: Database,
      accentColor: 'text-[#22D3EE]',
      bgColor: 'bg-[#ECFEFF]',
      borderColor: 'border-[#22D3EE]/40',
    },
    {
      id: 'llm',
      label: 'Medical LLM',
      sublabel: 'Contextual RAG Inference',
      icon: BrainCircuit,
      accentColor: 'text-[#2D3DB7]',
      bgColor: 'bg-[#F1F2FF]',
      borderColor: 'border-[#2D3DB7]/25',
    },
    {
      id: 'insight',
      label: 'Health Insight',
      sublabel: 'Actionable Guidance',
      icon: HeartPulse,
      accentColor: 'text-[#5B86FF]',
      bgColor: 'bg-[#EBF2FF]',
      borderColor: 'border-[#5B86FF]/30',
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        index="ARCHITECTURE OVERVIEW"
        title="HOW IT WORKS"
        subtitle="End-to-end data pipeline connecting patient query inputs to verified contextual health insights."
        icon={BrainCircuit}
      />

      {/* Main Architecture Diagram Container */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-gradient-to-b from-white via-white to-[#F7F8FF] border border-[#2D3DB7]/14 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(45,61,183,0.06)] relative overflow-hidden">
        {/* Subtle decorative background mesh */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2D3DB7_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        {/* Horizontal on Desktop (lg), Vertical on Mobile */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <React.Fragment key={step.id}>
                {/* Node Box */}
                <motion.div
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { y: -3, transition: { duration: 0.2 } }
                  }
                  className={`w-full lg:w-auto lg:flex-1 min-w-[125px] p-4 rounded-2xl bg-white border ${step.borderColor} shadow-xs hover:shadow-md transition-all text-center flex flex-row lg:flex-col items-center justify-start lg:justify-center gap-3.5 group`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${step.bgColor} ${step.borderColor} border flex items-center justify-center ${step.accentColor} shrink-0 group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left lg:text-center">
                    <p className="text-xs sm:text-sm font-bold text-[#0B1235] tracking-tight leading-snug">
                      {step.label}
                    </p>
                    <p className="text-[11px] text-[#4B5563] font-mono mt-0.5">
                      {step.sublabel}
                    </p>
                  </div>
                </motion.div>

                {/* Connector Arrow */}
                {!isLast && (
                  <div className="flex items-center justify-center text-[#2D3DB7]/40 shrink-0 py-1 lg:py-0 lg:px-1">
                    {/* Desktop Arrow */}
                    <div className="hidden lg:flex items-center">
                      <div className="w-2.5 h-[2px] bg-gradient-to-r from-[#2D3DB7]/30 to-[#5B86FF]/60" />
                      <ArrowRight className="w-4 h-4 text-[#5B86FF]" />
                    </div>
                    {/* Mobile Arrow */}
                    <div className="flex lg:hidden items-center justify-center">
                      <div className="h-2.5 w-[2px] bg-gradient-to-b from-[#2D3DB7]/30 to-[#5B86FF]/60" />
                      <ArrowDown className="w-4 h-4 text-[#5B86FF]" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
