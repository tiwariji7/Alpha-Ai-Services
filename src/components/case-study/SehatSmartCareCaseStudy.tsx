import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  Sparkles,
  Target,
  Compass,
  CheckCircle2,
  ArrowDown,
  Layers,
  Smartphone,
  Server,
  Brain,
  FileCheck2,
  MessageSquareCode,
  DatabaseZap,
  ArrowRight,
} from 'lucide-react';
import { pageTransition } from '../../utils/motion';
import { ScrollReveal } from '../common/ScrollReveal';
import { InteractiveButton } from '../common/InteractiveButton';
import { SectionHeader } from './SectionHeader';
import { CaseStudyHero } from './CaseStudyHero';
import { ProjectTags } from './ProjectTags';
import { ContentCard } from './ContentCard';
import { EngineCard } from './EngineCard';
import { ArchitectureFlow } from './ArchitectureFlow';
import { TechnologyStackSection } from './TechnologyChip';
import { GalleryGrid } from './GalleryGrid';
import { EngineFlows } from './EngineFlows';
import { DisclaimerCard } from './DisclaimerCard';

interface SehatSmartCareCaseStudyProps {
  onNavigate: (path: string) => void;
  onOpenScheduleModal?: (topic?: string) => void;
}

export const SehatSmartCareCaseStudy: React.FC<SehatSmartCareCaseStudyProps> = ({
  onNavigate,
  onOpenScheduleModal: _onOpenScheduleModal,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // 03 - Approach step-down visualization items
  const approachPipeline = [
    { label: 'Android App', detail: 'Mobile Client UI' },
    { label: 'FastAPI', detail: 'Asynchronous Services' },
    { label: 'AI Processing', detail: 'Embeddings & Pipelines' },
    { label: 'Semantic Retrieval', detail: 'Dense Vector Search' },
    { label: 'RAG', detail: 'Grounded Context Synthesis' },
    { label: 'Medical LLM', detail: 'Clinical Model Inference' },
  ];

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-3 pb-16 sm:pt-6 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-16 overflow-x-hidden text-[#0B1235]"
    >
      {/* B. Breadcrumb / Back to Portfolio */}
      <ScrollReveal variant="fadeIn">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#4B5563]">
          <motion.button
            whileHover={prefersReducedMotion ? undefined : { x: -2 }}
            onClick={() => onNavigate('/portfolio')}
            className="hover:text-[#0B1235] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#2D3DB7]" />
            <span>Back to Portfolio</span>
          </motion.button>
          <span>/</span>
          <span className="text-[#2D3DB7] font-bold">SeHAT SmartCare</span>
        </div>
      </ScrollReveal>

      {/* C & D. Project Hero & Summary / Tags */}
      <ScrollReveal variant="fadeUp" delay={0.05}>
        <CaseStudyHero onBackToPortfolio={() => onNavigate('/portfolio')} />
      </ScrollReveal>

      {/* E. 01 — OVERVIEW */}
      <ScrollReveal variant="fadeUp">
        <ContentCard className="p-7 sm:p-10 lg:p-12 space-y-6" glowAccent="blue">
          <SectionHeader
            index="01 — OVERVIEW"
            title="What Was Built"
            icon={Sparkles}
          />

          <div className="space-y-4 text-sm sm:text-base md:text-lg text-[#4B5563] leading-relaxed max-w-4xl">
            <p>
              SeHAT SmartCare is an AI-powered mobile health assistant designed to simplify symptom understanding, medical report interpretation, and access to reliable health information.
            </p>
            <p>
              The platform combines an intuitive Android application with Artificial Intelligence, Retrieval-Augmented Generation (RAG), semantic search, and medical language models to provide users with accessible, context-aware health assistance.
            </p>
            <p>
              It supports English, Hindi, and Hinglish interactions through text and voice-based inputs.
            </p>
          </div>

          <div className="pt-3 border-t border-[#2D3DB7]/14">
            <ProjectTags
              tags={['AI', 'Android', 'RAG', 'Healthcare']}
              variant="pill"
            />
          </div>
        </ContentCard>
      </ScrollReveal>

      {/* F. 02 — CHALLENGE */}
      <ScrollReveal variant="fadeUp">
        <ContentCard className="p-7 sm:p-10 lg:p-12 space-y-6" glowAccent="lavender">
          <SectionHeader
            index="02 — CHALLENGE"
            title="The Problem to Solve"
            icon={Target}
            badgeColor="text-[#2D3DB7] bg-[#F1F2FF] border-[#2D3DB7]/20"
          />

          {/* Editorial Card Layout with Strong Visual Separation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Problem Statement */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#F7F8FF] to-[#F1F2FF] border border-[#2D3DB7]/14 space-y-2">
              <div className="text-xs font-mono font-bold text-[#2D3DB7] uppercase tracking-wider">
                Problem Statement
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0B1235] leading-relaxed">
                Understanding health information can be difficult for everyday users.
              </p>
            </div>

            {/* Supporting Explanation */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#2D3DB7]/14 space-y-2">
              <div className="text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-wider">
                Supporting Explanation
              </div>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                Symptoms may be confusing, medical reports often contain complex terminology, and finding relevant health information through conventional search can produce fragmented or difficult-to-understand results.
              </p>
            </div>

            {/* Final Objective */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#F7F8FF] to-white border border-[#2D3DB7]/14 space-y-2">
              <div className="text-xs font-mono font-bold text-[#5B86FF] uppercase tracking-wider">
                Final Objective
              </div>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                SeHAT SmartCare was designed to address these challenges by providing a single mobile platform for symptom analysis, medical report understanding, and AI-assisted health conversations.
              </p>
            </div>
          </div>
        </ContentCard>
      </ScrollReveal>

      {/* G. 03 — APPROACH */}
      <ScrollReveal variant="fadeUp">
        <ContentCard className="p-7 sm:p-10 lg:p-12 space-y-6" glowAccent="blue">
          <SectionHeader
            index="03 — APPROACH"
            title="How We Approached It"
            icon={Compass}
          />

          {/* Two-Column Composition: Left = Approach Explanation, Right = Visual Step-Down Representation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Approach Explanation */}
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[#4B5563] leading-relaxed">
              <p>
                We designed a privacy-conscious, AI-assisted healthcare system that combines semantic medical knowledge retrieval with generative AI.
              </p>
              <p>
                The system uses Retrieval-Augmented Generation (RAG) to retrieve relevant medical knowledge before generating responses, helping provide more context-aware answers and reducing unsupported AI-generated information.
              </p>
              <p>
                An Android application provides the user interface, while a Python/FastAPI backend handles AI processing, vector search, report analysis, and chatbot workflows.
              </p>
            </div>

            {/* Right: Visual Step-down Representation of the pipeline */}
            <div className="lg:col-span-5 p-6 rounded-[22px] bg-gradient-to-b from-[#F1F2FF] to-[#F7F8FF] border border-[#2D3DB7]/14 space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#2D3DB7]/14">
                <span className="text-xs font-mono font-bold text-[#0B1235]">
                  Architecture Flow
                </span>
                <span className="text-[11px] font-mono text-[#2D3DB7]">
                  Informational View
                </span>
              </div>

              <div className="space-y-1.5">
                {approachPipeline.map((item, idx) => (
                  <React.Fragment key={item.label}>
                    <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white border border-[#2D3DB7]/14 shadow-2xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#F1F2FF] text-[#2D3DB7] text-[10px] font-mono font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-[#0B1235]">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#4B5563]">
                        {item.detail}
                      </span>
                    </div>

                    {idx < approachPipeline.length - 1 && (
                      <div className="flex justify-center py-0.5">
                        <ArrowDown className="w-3.5 h-3.5 text-[#5B86FF]" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </ContentCard>
      </ScrollReveal>

      {/* H. 04 — SOLUTION */}
      <ScrollReveal variant="fadeUp">
        <div className="space-y-8">
          <SectionHeader
            index="04 — SOLUTION"
            title="Engineered Solution"
            subtitle="Built an AI-assisted health platform featuring intelligent symptom analysis, medical report interpretation, contextual medical knowledge retrieval, multilingual conversational assistance, voice/text interaction, and health-focused recommendations."
            icon={CheckCircle2}
          />

          {/* Modular Solution Cards (6 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CARD 1: Android Mobile Application */}
            <EngineCard
              title="Android Mobile Application"
              category="Card 1 — Client Interface"
              description="The user-facing application provides:"
              items={[
                'Symptom Checker',
                'Medical Report Analyzer',
                'AI Medical Chatbot',
                'Voice Input',
                'Health Insights',
                'Medicine Reminders',
                'Health Tips',
                'Emergency SOS',
              ]}
              icon={Smartphone}
              badgeAccent="text-[#2D3DB7] bg-[#F1F2FF] border-[#2D3DB7]/20"
            />

            {/* CARD 2: AI Backend */}
            <EngineCard
              title="AI Backend"
              category="Card 2 — Server Services"
              description="The backend is developed using:"
              items={[
                'Python',
                'FastAPI',
                'AI/LLM pipelines',
                'SentenceTransformers',
                'FAISS',
                'OCR processing',
                'RAG',
              ]}
              extraText="It contains three primary AI engines:"
              icon={Server}
              badgeAccent="text-[#101440] bg-[#EEF1FF] border-[#101440]/20"
            />

            {/* CARD 3: Symptom Intelligence Engine */}
            <EngineCard
              title="Symptom Intelligence Engine"
              category="Card 3 — AI Engine"
              description="Analyzes symptoms, generates embeddings, performs FAISS similarity search, and returns possible disease matches."
              icon={Brain}
              badgeAccent="text-[#5B86FF] bg-[#EBF2FF] border-[#5B86FF]/30"
            />

            {/* CARD 4: Medical Report Analyzer Engine */}
            <EngineCard
              title="Medical Report Analyzer Engine"
              category="Card 4 — AI Engine"
              description="Extracts text from uploaded reports using OCR, identifies medical parameters, detects abnormal values, and generates simplified explanations."
              icon={FileCheck2}
              badgeAccent="text-[#22D3EE] bg-[#ECFEFF] border-[#22D3EE]/40"
            />

            {/* CARD 5: Medical Chatbot Engine */}
            <EngineCard
              title="Medical Chatbot Engine"
              category="Card 5 — AI Engine"
              description="Uses language detection, semantic retrieval, RAG, and a medical language model to generate contextual health responses."
              icon={MessageSquareCode}
              badgeAccent="text-[#7C3AED] bg-[#F5F1FF] border-[#7C3AED]/25"
            />

            {/* CARD 6: Medical Knowledge Layer */}
            <EngineCard
              title="Medical Knowledge Layer"
              category="Card 6 — Vector Store"
              description="Medical information is converted into vector embeddings and stored in a FAISS index."
              extraText="During queries, relevant medical knowledge is retrieved and supplied as context to the language model."
              icon={DatabaseZap}
              badgeAccent="text-[#2D3DB7] bg-[#F1F2FF] border-[#2D3DB7]/20"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* I. HOW IT WORKS / PROJECT ARCHITECTURE */}
      <ScrollReveal variant="fadeUp">
        <ArchitectureFlow />
      </ScrollReveal>

      {/* J. 05 — TECHNOLOGY STACK */}
      <ScrollReveal variant="fadeUp">
        <TechnologyStackSection />
      </ScrollReveal>

      {/* K. PRODUCT GALLERY / VISUAL ARTIFACTS */}
      <ScrollReveal variant="fadeUp">
        <GalleryGrid />
      </ScrollReveal>

      {/* L. MEDICAL / AI ENGINE FLOW */}
      <ScrollReveal variant="fadeUp">
        <EngineFlows />
      </ScrollReveal>

      {/* M. PROJECT DISCLAIMER */}
      <ScrollReveal variant="fadeUp">
        <DisclaimerCard />
      </ScrollReveal>

      {/* N. Bottom Action CTA Banner */}
      <ScrollReveal variant="fadeScale">
        <div className="relative bg-gradient-to-br from-[#080B2A] via-[#101440] to-[#2D3DB7] text-white rounded-[24px] sm:rounded-[28px] p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl overflow-hidden border border-[#5B86FF]/30">
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#5B86FF_1px,transparent_1px)] [background-size:18px_18px]" />
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#22D3EE] text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Alpha Ai Engineering Studio</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              Interested in building an AI-powered system?
            </h3>
            <p className="text-xs sm:text-sm text-[#B8BEDC] max-w-xl">
              Let's discuss your product goals, vector database architecture, and native mobile engineering timeline.
            </p>
          </div>
          <InteractiveButton
            variant="primary"
            glow={true}
            onClick={() => onNavigate('/contact')}
            className="relative z-10 whitespace-nowrap"
          >
            <span>Talk to Our Team</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </InteractiveButton>
        </div>
      </ScrollReveal>
    </motion.div>
  );
};
