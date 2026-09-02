import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Activity,
  FileSearch,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  GitBranch,
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';

export const EngineFlows: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // 11. Symptom Checker Flow
  const symptomSteps = [
    'Symptoms',
    'LLM Extraction',
    'Preprocessing',
    'Embedding',
    'FAISS Search',
    'Similarity Scoring',
    'Top Disease Matches',
  ];

  // 12. Medical Report Analyzer Flow
  const reportSteps = [
    'Image/PDF',
    'OCR',
    'Parameter Extraction',
    'Reference Range Comparison',
    'Abnormal Value Detection',
    'Medical Explanation',
  ];

  // 13. AI Chatbot Flow
  const chatbotSteps = [
    'Question',
    'Language Detection',
    'Query Embedding',
    'FAISS Search',
    'Medical Context',
    'RAG Prompt',
    'Medical LLM',
    'Answer',
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        index="TECHNICAL WORKFLOWS"
        title="MEDICAL / AI ENGINE FLOW"
        subtitle="Step-by-step algorithmic data transformations powering the diagnosis matching, OCR report reasoning, and conversational intelligence."
        icon={GitBranch}
      />

      <div className="space-y-6">
        {/* 11. Symptom Checker Flow */}
        <div className="rounded-[24px] sm:rounded-[28px] bg-white border border-[#2D3DB7]/14 p-6 sm:p-8 shadow-[0_4px_24px_rgba(45,61,183,0.06)] relative overflow-hidden">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#F1F2FF] border border-[#2D3DB7]/20 flex items-center justify-center text-[#2D3DB7]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0B1235] tracking-tight">
                Symptom Checker Flow
              </h3>
              <p className="text-xs text-[#4B5563] font-mono">
                Similarity matching pipeline from natural language symptoms to ranked clinical entities
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {symptomSteps.map((step, idx) => (
              <React.Fragment key={step}>
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-b from-[#F7F8FF] to-[#F1F2FF] border border-[#2D3DB7]/14 text-xs font-bold text-[#0B1235] shadow-2xs font-mono flex items-center gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-[#2D3DB7]/10 text-[#2D3DB7] text-[10px] flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </motion.div>
                {idx < symptomSteps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-[#2D3DB7]/40 shrink-0 hidden sm:inline-block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 12. Medical Report Analyzer Flow */}
        <div className="rounded-[24px] sm:rounded-[28px] bg-white border border-[#22D3EE]/30 p-6 sm:p-8 shadow-[0_4px_24px_rgba(34,211,238,0.06)] relative overflow-hidden">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#ECFEFF] border border-[#22D3EE]/40 flex items-center justify-center text-[#0891B2]">
              <FileSearch className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0B1235] tracking-tight">
                Medical Report Analyzer Flow
              </h3>
              <p className="text-xs text-[#4B5563] font-mono">
                Structured OCR extraction and reference range validation for laboratory reports
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {reportSteps.map((step, idx) => (
              <React.Fragment key={step}>
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-b from-[#F8FAFC] to-[#ECFEFF]/60 border border-[#22D3EE]/25 text-xs font-bold text-[#0B1235] shadow-2xs font-mono flex items-center gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-[#22D3EE]/20 text-[#0891B2] text-[10px] flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </motion.div>
                {idx < reportSteps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#22D3EE]/60 shrink-0 hidden sm:inline-block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 13. AI Chatbot Flow */}
        <div className="rounded-[24px] sm:rounded-[28px] bg-white border border-[#7C3AED]/20 p-6 sm:p-8 shadow-[0_4px_24px_rgba(124,58,237,0.06)] relative overflow-hidden">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#F5F1FF] border border-[#7C3AED]/30 flex items-center justify-center text-[#7C3AED]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0B1235] tracking-tight">
                AI Chatbot Flow
              </h3>
              <p className="text-xs text-[#4B5563] font-mono">
                Multilingual RAG pipeline synthesizing semantic medical context into empathetic guidance
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {chatbotSteps.map((step, idx) => (
              <React.Fragment key={step}>
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-b from-[#FBF9FE] to-[#F5F1FF] border border-[#7C3AED]/20 text-xs font-bold text-[#0B1235] shadow-2xs font-mono flex items-center gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-[#7C3AED]/15 text-[#7C3AED] text-[10px] flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </motion.div>
                {idx < chatbotSteps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-[#7C3AED]/40 shrink-0 hidden sm:inline-block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
