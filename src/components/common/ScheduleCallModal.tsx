import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  User,
  Mail,
  Phone,
  Building,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  Clock,
  MessageCircle,
  Layers,
  Wrench,
  Rocket,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

type ProjectCategoryType =
  | 'build_new'
  | 'improve_existing'
  | 'maintain_manage';

const PROJECT_TYPE_OPTIONS: {
  id: ProjectCategoryType;
  title: string;
  desc: string;
  icon: typeof Rocket;
}[] = [
  {
    id: 'build_new',
    title: 'Build Something New',
    desc: 'New website, app, software or AI product from scratch.',
    icon: Rocket,
  },
  {
    id: 'improve_existing',
    title: 'Improve an Existing Product',
    desc: 'Add features, integrations or improvements to something you already have.',
    icon: Wrench,
  },
  {
    id: 'maintain_manage',
    title: 'Maintain & Manage an Existing System',
    desc: 'Ongoing technical support, maintenance and digital management.',
    icon: Layers,
  },
];

const CONDITIONAL_QUESTIONS = {
  build_new: {
    question: 'What are you planning to build?',
    options: ['Website', 'Mobile App', 'Web Application', 'Custom Software', 'AI Product', 'Other'],
  },
  improve_existing: {
    question: 'What do you already have?',
    options: ['Website', 'Web App', 'Mobile App', 'Software', 'AI System', 'Other'],
  },
  maintain_manage: {
    question: 'What needs ongoing support?',
    options: ['Website', 'App', 'Hosting / Server', 'Software', 'Social Media', 'SEO', 'Multiple Systems'],
  },
};

const SERVICES_LIST = [
  'Website',
  'Web Application',
  'Mobile App',
  'Custom Software',
  'AI & Machine Learning',
  'Automation',
  'UI/UX Design',
  'Cloud & DevOps',
  'Cyber Security',
  'SEO & Digital Growth',
  'Social Media Management',
  'Existing Product Improvement',
  'Technical Maintenance & Support',
  'Other',
];

const BUDGET_OPTIONS = [
  'Under ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1 Lakh',
  '₹1 Lakh – ₹3 Lakh',
  '₹3 Lakh+',
  'Not sure yet',
];

const TIMELINE_OPTIONS = [
  'Immediately',
  'Within 2–4 weeks',
  'Within 1–2 months',
  '2–3 months',
  'Just exploring',
];

const CONTACT_METHODS = [
  { id: 'Email', label: 'Email', icon: Mail },
  { id: 'WhatsApp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'Phone Call', label: 'Phone Call', icon: Phone },
];

const TIME_PREFERENCES = ['Morning', 'Afternoon', 'Evening', 'Anytime'];

export const ScheduleCallModal: React.FC<ScheduleCallModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [projectType, setProjectType] = useState<ProjectCategoryType>('improve_existing');
  const [conditionalChoice, setConditionalChoice] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectDetails: '',
    budget: '',
    timeline: '',
    contactMethod: 'Email',
    timePreference: 'Anytime',
    consent: true,
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    services: false,
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Initial Topic Pre-Fill & Reset on Open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentStep(1);
      setIsSuccess(false);

      if (initialTopic) {
        if (initialTopic.includes('Plan') || initialTopic.includes('Care') || initialTopic.includes('Retainer') || initialTopic.includes('Support')) {
          setProjectType('maintain_manage');
        } else if (initialTopic.includes('Project') || initialTopic.includes('Starting from')) {
          setProjectType('build_new');
        }

        // Map topic to services if matching
        const matched = SERVICES_LIST.filter(
          (s) => initialTopic.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(initialTopic.toLowerCase())
        );
        setSelectedServices(matched.length > 0 ? matched : [initialTopic]);
      } else {
        setSelectedServices(['Website']);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialTopic]);

  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Validation Helpers
  const isNameValid = (name: string) => {
    const trimmed = name.trim();
    return trimmed.length >= 2 && /^[A-Za-z\s.'-]+$/.test(trimmed);
  };

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const isPhoneValid = (phone: string) => {
    if (!phone.trim()) return true; // Phone is optional
    return /^\d{10}$/.test(phone.trim());
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const digitsOnly = rawValue.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: digitsOnly });
  };

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== service));
      }
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  // Step 1 Validation
  const isStep1Valid = selectedServices.length > 0;

  // Step 2 Validation
  const isStep2Valid =
    isNameValid(formData.name) &&
    isEmailValid(formData.email) &&
    isPhoneValid(formData.phone);

  // Step 3 Validation
  const isStep3Valid = !!formData.contactMethod && formData.consent;

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!isStep1Valid) {
        setTouched((t) => ({ ...t, services: true }));
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!isStep2Valid) {
        setTouched((t) => ({ ...t, name: true, email: true, phone: true }));
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 3) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep1Valid || !isStep2Valid || !isStep3Valid) {
      setTouched({
        name: true,
        email: true,
        phone: true,
        services: true,
        consent: true,
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF5A1F', '#FF7A45', '#111111', '#FFA07A'],
        });
      } catch {
        // Confetti fallback
      }
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setCurrentStep(1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectDetails: '',
      budget: '',
      timeline: '',
      contactMethod: 'Email',
      timePreference: 'Anytime',
      consent: true,
    });
    setSelectedServices([]);
    setTouched({ name: false, email: false, phone: false, services: false, consent: false });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl sm:max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#EDE9E4] z-10 my-auto max-h-[90vh] sm:max-h-[88vh] flex flex-col overflow-hidden text-left"
        >
          {/* 1. FIXED MODAL HEADER */}
          <div className="p-5 sm:p-7 border-b border-[#EDE9E4] bg-white sticky top-0 z-20 flex items-start justify-between gap-4">
            <div className="space-y-1.5 pr-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>LET'S TALK ABOUT YOUR PROJECT</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#111111] tracking-tight leading-tight">
                Let's Build Something <span className="text-[#FF5A1F]">Great Together.</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#6B6660] leading-relaxed">
                Tell us what you're working on. We'll review your requirements and recommend the right next step.
              </p>

              <div className="flex items-center gap-2 text-[11px] text-[#8C867F] font-medium pt-0.5">
                <Clock className="w-3 h-3 text-[#FF5A1F]" />
                <span>Typically replies within 1 business day.</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FAF8F6] border border-[#EDE9E4] text-[#6B6660] hover:text-[#111111] hover:border-gray-300 flex items-center justify-center transition-all shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 2. PROGRESS STEPPER BAR (01 Project → 02 Details → 03 Next Step) */}
          {!isSuccess && (
            <div className="px-5 sm:px-7 py-2.5 bg-[#FAF8F6] border-b border-[#EDE9E4] flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4 text-xs font-bold">
                <span className={`flex items-center gap-1.5 ${currentStep === 1 ? 'text-[#FF5A1F]' : currentStep > 1 ? 'text-[#111111]' : 'text-gray-400'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 1 ? 'bg-[#FF5A1F] text-white' : currentStep > 1 ? 'bg-[#111111] text-white' : 'bg-gray-200 text-gray-500'}`}>
                    1
                  </span>
                  <span>Project</span>
                </span>

                <span className="text-gray-300">→</span>

                <span className={`flex items-center gap-1.5 ${currentStep === 2 ? 'text-[#FF5A1F]' : currentStep > 2 ? 'text-[#111111]' : 'text-gray-400'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 2 ? 'bg-[#FF5A1F] text-white' : currentStep > 2 ? 'bg-[#111111] text-white' : 'bg-gray-200 text-gray-500'}`}>
                    2
                  </span>
                  <span>Your Details</span>
                </span>

                <span className="text-gray-300">→</span>

                <span className={`flex items-center gap-1.5 ${currentStep === 3 ? 'text-[#FF5A1F]' : 'text-gray-400'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 3 ? 'bg-[#FF5A1F] text-white' : 'bg-gray-200 text-gray-500'}`}>
                    3
                  </span>
                  <span>Next Step</span>
                </span>
              </div>

              <div className="text-[11px] font-extrabold text-[#8C867F]">
                0{currentStep} / 03
              </div>
            </div>
          )}

          {/* 3. SCROLLABLE MODAL CONTENT BODY */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} id="project-inquiry-form" className="space-y-6">
                {/* ================= STEP 01 ================= */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {/* Primary Engagement Choice */}
                    <div className="space-y-2.5">
                      <label className="block text-xs font-extrabold text-[#111111] uppercase tracking-wider">
                        What are you looking for? <span className="text-[#FF5A1F]">*</span>
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {PROJECT_TYPE_OPTIONS.map((opt) => {
                          const isSelected = projectType === opt.id;
                          const IconComponent = opt.icon;
                          return (
                            <button
                              type="button"
                              key={opt.id}
                              onClick={() => {
                                setProjectType(opt.id);
                                setConditionalChoice('');
                              }}
                              className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#FF5A1F] bg-[#FF5A1F]/5 shadow-2xs'
                                  : 'border-[#EDE9E4] bg-white hover:bg-[#FAF8F6] hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#FF5A1F] text-white' : 'bg-[#FAF8F6] text-[#8C867F]'}`}>
                                  <IconComponent className="w-3.5 h-3.5" />
                                </div>
                                {isSelected && (
                                  <div className="w-4 h-4 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="text-xs font-extrabold text-[#111111]">{opt.title}</div>
                                <p className="text-[11px] text-[#6B6660] leading-snug pt-1">{opt.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Smart Conditional Sub-Question */}
                    <div className="space-y-2 pt-1 border-t border-[#EDE9E4]/60">
                      <label className="block text-xs font-bold text-[#111111]">
                        {CONDITIONAL_QUESTIONS[projectType].question}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {CONDITIONAL_QUESTIONS[projectType].options.map((opt) => {
                          const isSelected = conditionalChoice === opt;
                          return (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => setConditionalChoice(isSelected ? '' : opt)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#111111] text-white border-[#111111]'
                                  : 'bg-[#FAF8F6] text-[#6B6660] border-[#EDE9E4] hover:bg-white hover:text-[#111111]'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Service Selection Chips */}
                    <div className="space-y-2 pt-1 border-t border-[#EDE9E4]/60">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-extrabold text-[#111111] uppercase tracking-wider">
                          What can we help you with? <span className="text-[#FF5A1F]">*</span>
                        </label>
                        <span className="text-[11px] text-[#8C867F]">Choose everything that applies</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {SERVICES_LIST.map((service) => {
                          const isSelected = selectedServices.includes(service);
                          return (
                            <button
                              type="button"
                              key={service}
                              onClick={() => toggleService(service)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#FF5A1F]/10 border-[#FF5A1F] text-[#111111] shadow-2xs'
                                  : 'bg-[#FAF8F6] text-[#6B6660] border-[#EDE9E4] hover:border-gray-300 hover:text-[#111111]'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-[#FF5A1F] stroke-[3]" />}
                              <span>{service}</span>
                            </button>
                          );
                        })}
                      </div>

                      {touched.services && selectedServices.length === 0 && (
                        <p className="text-[11px] text-red-500 font-medium">
                          Please select at least one service.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ================= STEP 02 ================= */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div>
                      <h4 className="text-sm font-extrabold text-[#111111]">
                        Tell us a little about you.
                      </h4>
                      <p className="text-xs text-[#6B6660]">
                        We only ask for the details needed to review and get back to you.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Full Name */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-[#111111]">
                          FULL NAME <span className="text-[#FF5A1F]">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onBlur={() => setTouched({ ...touched, name: true })}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your full name"
                            className={`w-full pl-9 pr-3 py-2 bg-[#FAF8F6] border rounded-xl text-xs sm:text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none transition-all ${
                              touched.name && !isNameValid(formData.name)
                                ? 'border-red-400 bg-red-50/20'
                                : 'border-[#EDE9E4] focus:border-[#FF5A1F] focus:bg-white'
                            }`}
                          />
                        </div>
                        {touched.name && !isNameValid(formData.name) && (
                          <p className="text-[11px] text-red-500 font-medium">
                            Please enter your full name (letters only).
                          </p>
                        )}
                      </div>

                      {/* Work Email */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-[#111111]">
                          WORK EMAIL <span className="text-[#FF5A1F]">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onBlur={() => setTouched({ ...touched, email: true })}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@company.com"
                            className={`w-full pl-9 pr-3 py-2 bg-[#FAF8F6] border rounded-xl text-xs sm:text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none transition-all ${
                              touched.email && !isEmailValid(formData.email)
                                ? 'border-red-400 bg-red-50/20'
                                : 'border-[#EDE9E4] focus:border-[#FF5A1F] focus:bg-white'
                            }`}
                          />
                        </div>
                        {touched.email && !isEmailValid(formData.email) && (
                          <p className="text-[11px] text-red-500 font-medium">
                            Please enter a valid work email address.
                          </p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-[#111111]">
                          PHONE NUMBER <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onBlur={() => setTouched({ ...touched, phone: true })}
                            onChange={handlePhoneChange}
                            placeholder="+91 XXXXX XXXXX"
                            maxLength={10}
                            className={`w-full pl-9 pr-3 py-2 bg-[#FAF8F6] border rounded-xl text-xs sm:text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none transition-all ${
                              touched.phone && !isPhoneValid(formData.phone)
                                ? 'border-red-400 bg-red-50/20'
                                : 'border-[#EDE9E4] focus:border-[#FF5A1F] focus:bg-white'
                            }`}
                          />
                        </div>
                        {touched.phone && !isPhoneValid(formData.phone) && (
                          <p className="text-[11px] text-red-500 font-medium">
                            Please enter a valid 10-digit number.
                          </p>
                        )}
                      </div>

                      {/* Company Name */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-[#111111]">
                          COMPANY / ORGANIZATION <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Company name"
                            className="w-full pl-9 pr-3 py-2 bg-[#FAF8F6] border border-[#EDE9E4] rounded-xl text-xs sm:text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-[#FF5A1F] focus:bg-white transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Project Details Textarea */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-[#111111]">
                          Tell us about your project <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <span className="text-[10px] text-gray-400">
                          {formData.projectDetails.length} / 1000
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        maxLength={1000}
                        value={formData.projectDetails}
                        onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                        placeholder="Briefly describe what you have, what you want to improve or what you want to build..."
                        className="w-full p-3 bg-[#FAF8F6] border border-[#EDE9E4] rounded-xl text-xs sm:text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-[#FF5A1F] focus:bg-white transition-all resize-none"
                      />
                    </div>

                    {/* Budget & Timeline Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-[#111111]">
                          Estimated Budget <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF8F6] border border-[#EDE9E4] rounded-xl text-xs sm:text-sm text-[#111111] focus:outline-none focus:border-[#FF5A1F] focus:bg-white transition-all cursor-pointer"
                        >
                          <option value="">Select budget range...</option>
                          {BUDGET_OPTIONS.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                        <p className="text-[10px] text-[#8C867F]">
                          Not sure? That's completely fine.
                        </p>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-[#111111]">
                          When would you like to start? <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF8F6] border border-[#EDE9E4] rounded-xl text-xs sm:text-sm text-[#111111] focus:outline-none focus:border-[#FF5A1F] focus:bg-white transition-all cursor-pointer"
                        >
                          <option value="">Select timeline...</option>
                          {TIMELINE_OPTIONS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ================= STEP 03 ================= */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div>
                      <h4 className="text-sm font-extrabold text-[#111111]">
                        How should we contact you?
                      </h4>
                      <p className="text-xs text-[#6B6660]">
                        Select your preferred channel and response schedule.
                      </p>
                    </div>

                    {/* Preferred Contact Method */}
                    <div className="grid grid-cols-3 gap-2.5">
                      {CONTACT_METHODS.map((method) => {
                        const isSelected = formData.contactMethod === method.id;
                        const IconComp = method.icon;
                        return (
                          <button
                            type="button"
                            key={method.id}
                            onClick={() => setFormData({ ...formData, contactMethod: method.id })}
                            className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#FF5A1F]/10 border-[#FF5A1F] text-[#111111] shadow-2xs font-bold'
                                : 'bg-[#FAF8F6] border-[#EDE9E4] text-[#6B6660] hover:bg-white hover:text-[#111111]'
                            }`}
                          >
                            <IconComp className={`w-4 h-4 ${isSelected ? 'text-[#FF5A1F]' : 'text-gray-400'}`} />
                            <span className="text-xs">{method.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Preferred Response Time */}
                    <div className="space-y-1.5 pt-1">
                      <label className="block text-xs font-bold text-[#111111]">
                        Preferred response time <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {TIME_PREFERENCES.map((time) => {
                          const isSelected = formData.timePreference === time;
                          return (
                            <button
                              type="button"
                              key={time}
                              onClick={() => setFormData({ ...formData, timePreference: time })}
                              className={`py-1.5 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#111111] text-white border-[#111111]'
                                  : 'bg-[#FAF8F6] border-[#EDE9E4] text-[#6B6660] hover:bg-white hover:text-[#111111]'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Consent Checkbox */}
                    <div className="pt-2 border-t border-[#EDE9E4]/60 space-y-1.5">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.consent}
                          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                          className="mt-0.5 w-4 h-4 rounded text-[#FF5A1F] accent-[#FF5A1F] focus:ring-[#FF5A1F]"
                        />
                        <span className="text-xs text-[#111111] font-medium leading-snug">
                          I agree to be contacted regarding this inquiry.
                        </span>
                      </label>
                      <p className="text-[11px] text-[#8C867F] pl-6.5">
                        Your information is used only to respond to your request.
                      </p>
                    </div>

                    {/* Subtle Trust Line */}
                    <div className="p-3 bg-[#FAF8F6] rounded-xl border border-[#EDE9E4] flex items-center justify-center gap-3 text-[11px] text-[#6B6660] font-medium flex-wrap">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A1F]" />
                        <span>Confidential inquiry</span>
                      </span>
                      <span>•</span>
                      <span>No obligation</span>
                      <span>•</span>
                      <span>Professional technical review</span>
                    </div>
                  </motion.div>
                )}
              </form>
            ) : (
              /* ================= SUCCESS STATE ================= */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="text-center py-4 sm:py-6 space-y-4"
              >
                <div className="w-14 h-14 bg-[#FF5A1F]/10 text-[#FF5A1F] rounded-full flex items-center justify-center mx-auto border border-[#FF5A1F]/20 shadow-xs">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
                    Thanks — we've got it.
                  </h3>
                  <p className="text-[#6B6660] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Your project details have been received. Our team will review your requirements and get back to you with the next steps.
                  </p>
                </div>

                {/* Clean Summary Card */}
                <div className="bg-[#FAF8F6] p-4 sm:p-5 rounded-2xl border border-[#EDE9E4] text-left text-xs text-[#6B6660] space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-[#EDE9E4]/60 pb-1.5">
                    <span className="font-medium text-gray-500">PROJECT:</span>
                    <span className="font-bold text-[#111111] text-right line-clamp-1 max-w-[220px]">
                      {selectedServices.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#EDE9E4]/60 pb-1.5">
                    <span className="font-medium text-gray-500">ENGAGEMENT:</span>
                    <span className="font-bold text-[#FF5A1F]">
                      {PROJECT_TYPE_OPTIONS.find((o) => o.id === projectType)?.title}
                    </span>
                  </div>
                  <div className="flex justify-between pt-0.5">
                    <span className="font-medium text-gray-500">CONTACT VIA:</span>
                    <span className="font-bold text-[#111111]">
                      {formData.contactMethod} ({formData.email || formData.phone})
                    </span>
                  </div>
                </div>

                {/* Return Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleResetAndClose}
                    className="w-full sm:w-auto bg-[#111111] text-white py-3 px-8 rounded-full font-bold text-xs sm:text-sm hover:bg-[#262626] transition-all shadow-2xs cursor-pointer"
                  >
                    Back to Website
                  </button>

                  <a
                    href="https://wa.me/918381835420"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#FAF8F6] text-[#111111] border border-[#EDE9E4] hover:bg-[#FF5A1F]/10 hover:border-[#FF5A1F]/30 hover:text-[#FF5A1F] py-3 px-6 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#FF5A1F]" />
                    <span>Talk to us on WhatsApp →</span>
                  </a>
                </div>
              </motion.div>
            )}
          </div>

          {/* 4. FIXED BOTTOM ACTIONS / FOOTER */}
          {!isSuccess && (
            <div className="p-4 sm:p-5 border-t border-[#EDE9E4] bg-white sticky bottom-0 z-20 flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2.5 rounded-full text-xs font-bold text-[#6B6660] hover:text-[#111111] hover:bg-[#FAF8F6] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div className="text-[11px] text-[#8C867F] hidden sm:block">
                  Confidential & No Obligation
                </div>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="ml-auto px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold bg-[#111111] text-white hover:bg-[#262626] transition-all flex items-center gap-2 group cursor-pointer shadow-2xs"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <div className="ml-auto flex flex-col items-end">
                  <button
                    type="submit"
                    form="project-inquiry-form"
                    disabled={isSubmitting || !formData.consent}
                    className={`px-7 py-3 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 group shadow-md cursor-pointer ${
                      isSubmitting || !formData.consent
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#FF5A1F] text-white hover:bg-[#e04c15] hover:shadow-[0_6px_20px_rgba(255,90,31,0.35)] active:scale-95'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <span>Send Project Inquiry</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <span className="text-[10px] text-[#8C867F] mt-1">
                    No commitment. We'll review your requirements first.
                  </span>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
