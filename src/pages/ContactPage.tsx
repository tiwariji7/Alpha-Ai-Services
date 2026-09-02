import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Sparkles,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Lock,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TurnstileWidget } from '../components/common/TurnstileWidget';
import {
  fadeUp,
  pageTransition,
} from '../utils/motion';
import { FlowingHeading } from '../components/common/FlowingHeading';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { PageHeroAmbient } from '../components/common/PageHeroAmbient';

interface ContactPageProps {
  onOpenScheduleModal: (topic?: string) => void;
  onNavigate?: (path: string) => void;
}

const SERVICE_OPTIONS = [
  'Website Development',
  'Web Application / SaaS',
  'Mobile App Development',
  'Custom Software',
  'AI & Machine Learning',
  'Automation & Integrations',
  'UI/UX Design',
  'Social Media Management',
  'Website Management & Maintenance',
  'Cloud & DevOps',
  'Cybersecurity',
  'Other',
];

const PROJECT_STAGES = [
  'Just an Idea',
  'Planning / Discovery',
  'Design Ready',
  'Development Started',
  'Existing Product / Website',
  'Need Ongoing Management',
];

const BUDGET_RANGES = [
  'Under ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1 Lakh',
  '₹1 Lakh – ₹3 Lakh',
  '₹3 Lakh+',
  'Not Sure Yet',
];

const TIMELINES = [
  'Immediately',
  'Within 2 Weeks',
  'Within 1 Month',
  '1–3 Months',
  'Just Exploring',
];

const FAQ_ITEMS = [
  {
    q: 'Do you work with startups and small businesses?',
    a: 'Yes. We work with startups, small businesses and growing organizations depending on the project requirements.',
  },
  {
    q: 'Can you manage an existing website or application?',
    a: 'Yes. We can provide maintenance, troubleshooting, improvements, hosting support and ongoing development.',
  },
  {
    q: 'Do you offer monthly support?',
    a: 'Yes. Monthly technology support plans are available for businesses that need ongoing development and maintenance.',
  },
  {
    q: 'Can I contact you before submitting a project?',
    a: 'Yes. You can contact us directly through email or WhatsApp to discuss your requirements.',
  },
];

// Helper to check for repetitive or fake phone numbers
const isRealPhoneNumber = (digits: string): boolean => {
  if (digits.length !== 10) return false;
  // Must start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(digits)) return false;
  // Disallow all identical digits like 9999999999, 8888888888
  if (/^(\d)\1{9}$/.test(digits)) return false;
  // Disallow known fake sequences
  const fakeSequences = [
    '9876543210',
    '9898989898',
    '9090909090',
    '6789012345',
    '7890123456',
  ];
  if (fakeSequences.includes(digits)) return false;
  return true;
};

// Helper for spam email detection
const isRealEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return false;
  const spamKeywords = ['test@test', 'fake@', 'temp@', 'spam@', 'dummy@'];
  if (spamKeywords.some((kw) => email.toLowerCase().includes(kw))) return false;
  return true;
};

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenScheduleModal,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '', // No auto-selection
    stage: '', // No auto-selection
    budget: '', // Optional, no auto-selection
    timeline: '', // Optional, no auto-selection
    projectDetails: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    service: false,
    stage: false,
    projectDetails: false,
  });

  const [website, setWebsite] = useState(''); // Honeypot field
  const [turnstileToken, setTurnstileToken] = useState('');
  const [resetSignal, setResetSignal] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Field Validations
  // 1. Name: Only characters (and spaces), at least 2 chars
  const isNameValid = /^[a-zA-Z\s.]{2,50}$/.test(formData.name.trim());

  // 2. Email: Proper email regex and not spam
  const isEmailValid = isRealEmail(formData.email.trim());

  // 3. Phone: Required, exactly 10 valid digits
  const cleanPhone = formData.phone.replace(/\D/g, '');
  const isPhoneValid = isRealPhoneNumber(cleanPhone);

  // 4. Service: Required, must not be empty
  const isServiceValid = formData.service.trim() !== '';

  // 5. Stage: Required, must not be empty
  const isStageValid = formData.stage.trim() !== '';

  // 6. Project Details: Minimum 10 characters
  const isDetailsValid = formData.projectDetails.trim().length >= 10;

  const isFormValid =
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isServiceValid &&
    isStageValid &&
    isDetailsValid;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Restrict name to only characters, spaces, and periods
    const val = e.target.value;
    if (val === '' || /^[a-zA-Z\s.]*$/.test(val)) {
      setFormData({ ...formData, name: val });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits up to 10 characters
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
      stage: true,
      projectDetails: true,
    });

    if (!isFormValid) {
      return;
    }

    if (!turnstileToken) {
      setSubmitError('Please complete the security verification below before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/project-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
          website,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        try {
          confetti({
            particleCount: 85,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#3B4FD9', '#4D6BFF', '#7B5CE8', '#7DE8FF'],
          });
        } catch {
          // Confetti fallback
        }
      } else {
        const errorMsg =
          result.error ||
          (result.errors ? Object.values(result.errors).join(' ') : 'Failed to submit enquiry.');
        setSubmitError(errorMsg);
        setTurnstileToken('');
        setResetSignal((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Submission fetch error:', err);
      setSubmitError('Network error while sending enquiry. Please check your connection or reach us on WhatsApp.');
      setTurnstileToken('');
      setResetSignal((prev) => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      stage: '',
      budget: '',
      timeline: '',
      projectDetails: '',
    });
    setTouched({
      name: false,
      email: false,
      phone: false,
      service: false,
      stage: false,
      projectDetails: false,
    });
    setWebsite('');
    setTurnstileToken('');
    setSubmitError(null);
    setResetSignal((prev) => prev + 1);
    setSubmitted(false);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-12 sm:space-y-16 md:space-y-24 pb-16 sm:pb-24 overflow-x-hidden bg-[#F6F5FC]"
    >
      {/* 1. CONTACT HERO SECTION */}
      <section className="pt-8 sm:pt-14 pb-2 sm:pb-4 px-4 sm:px-6 relative overflow-hidden">
        <PageHeroAmbient theme="page" />

        <div className="max-w-4xl mx-auto text-center space-y-3.5 sm:space-y-4 relative z-10">
          <ScrollReveal variant="fadeScale">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LET'S BUILD SOMETHING USEFUL</span>
            </div>
          </ScrollReveal>

          <FlowingHeading
            as="h1"
            text="Have a Project in Mind?"
            highlightWords={['Project', 'in', 'Mind?']}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#151235] tracking-tight leading-tight justify-center"
          />

          <ScrollReveal variant="fadeUp" delay={0.12}>
            <p className="text-sm sm:text-base md:text-lg text-[#5B5876] max-w-2xl mx-auto leading-relaxed">
              Tell us what you're building, what you're trying to improve, or what problem you're trying to solve. We'll review your requirements and get back to you with the right next step.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.18}>
            <p className="text-xs font-semibold text-[#151235] italic">
              ⚡ We typically respond within 1 business day.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.24}>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-[#5B5876]">
              <span className="flex items-center gap-1.5 text-[#151235]">
                <CheckCircle2 className="w-4 h-4 text-[#3B4FD9]" />
                Clear communication
              </span>
              <span className="flex items-center gap-1.5 text-[#151235]">
                <CheckCircle2 className="w-4 h-4 text-[#3B4FD9]" />
                Transparent scope
              </span>
              <span className="flex items-center gap-1.5 text-[#151235]">
                <CheckCircle2 className="w-4 h-4 text-[#3B4FD9]" />
                Practical technology solutions
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. MAIN 2-COLUMN CONTACT LAYOUT */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          {/* LEFT COLUMN: Project Enquiry Form (approx 60% on desktop) - Midnight Navy Card */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#0A0E2A] via-[#141B5C] to-[#2A3FA8] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#3B4FD9]/30 shadow-soft-lg relative overflow-hidden text-white">
            {/* Top Edge Glow Accent */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#3B4FD9] to-transparent opacity-80" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#3B4FD9]/10 blur-[80px] pointer-events-none" />

            {/* Background Decorative Tech Dots Mesh */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B4FD9_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10">
              {submitted ? (
                /* Success State */
                <div className="text-center py-10 sm:py-14 space-y-5">
                  <div className="w-16 h-16 bg-[#3B4FD9]/15 text-[#7DE8FF] rounded-full flex items-center justify-center mx-auto border border-[#3B4FD9]/30 shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Thanks — We've Received Your Enquiry.
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B8BEDC] max-w-md mx-auto leading-relaxed">
                      Our team will review your requirements and get back to you as soon as possible at <strong className="text-white">{formData.email}</strong>.
                    </p>
                  </div>

                  {/* Submitted Summary */}
                  <div className="bg-[#0A0E2A]/90 p-4 sm:p-5 rounded-2xl border border-[#3B4FD9]/20 text-left text-xs text-[#B8BEDC] space-y-2 max-w-md mx-auto">
                    <div className="flex justify-between border-b border-[#3B4FD9]/20 pb-1.5">
                      <span className="text-[#B8BEDC]/60">Contact:</span>
                      <span className="font-bold text-white">{formData.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#3B4FD9]/20 pb-1.5">
                      <span className="text-[#B8BEDC]/60">Phone:</span>
                      <span className="font-bold text-white">+91 {formData.phone}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#3B4FD9]/20 pb-1.5">
                      <span className="text-[#B8BEDC]/60">Service:</span>
                      <span className="font-bold text-white">{formData.service}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#3B4FD9]/20 pb-1.5">
                      <span className="text-[#B8BEDC]/60">Project Stage:</span>
                      <span className="font-bold text-white">{formData.stage}</span>
                    </div>
                    {formData.timeline && (
                      <div className="flex justify-between pt-0.5">
                        <span className="text-[#B8BEDC]/60">Timeline:</span>
                        <span className="font-bold text-[#7DE8FF]">{formData.timeline}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={handleReset}
                      className="bg-gradient-to-r from-[#3B4FD9] to-[#7B5CE8] text-white py-3 px-8 rounded-full font-bold text-xs sm:text-sm hover:shadow-[0_8px_25px_rgba(59,79,217,0.45)] transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Hidden Honeypot field for bot detection */}
                  <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  {/* Form Header */}
                  <div className="space-y-1 border-b border-[#3B4FD9]/20 pb-4">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                      Project Inquiry Form
                    </h2>
                    <p className="text-xs text-[#B8BEDC]">
                      Share your requirements below and we'll get back to you as soon as possible.
                    </p>
                  </div>

                  {/* CSS Grid for Inputs - Strict Zero Overflow Architecture */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* ROW 1: Full Name (Only characters) */}
                    <div className="min-w-0 w-full space-y-1">
                      <label className="block text-xs font-bold text-gray-200">
                        Full Name <span className="text-[#7DE8FF]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onBlur={() => setTouched({ ...touched, name: true })}
                        onChange={handleNameChange}
                        placeholder="e.g. Alex Morgan (letters only)"
                        className={`w-full box-border px-3.5 py-2.5 bg-[#0F1442] border rounded-xl text-xs sm:text-sm text-white placeholder:text-[#B8BEDC]/40 focus:outline-none transition-all ${
                          touched.name && !isNameValid
                            ? 'border-red-500/80 focus:border-red-500 bg-red-950/20'
                            : 'border-[#3B4FD9]/30 focus:border-[#3B4FD9] focus:bg-[#141B5C]'
                        }`}
                      />
                      {touched.name && !isNameValid && (
                        <p className="text-[11px] text-red-400 font-medium">
                          Please enter a valid name using letters only (min 2 chars).
                        </p>
                      )}
                    </div>

                    {/* ROW 1: Work Email (Strict, not spam) */}
                    <div className="min-w-0 w-full space-y-1">
                      <label className="block text-xs font-bold text-gray-200">
                        Work Email <span className="text-[#7DE8FF]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onBlur={() => setTouched({ ...touched, email: true })}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@company.com"
                        className={`w-full box-border px-3.5 py-2.5 bg-[#0F1442] border rounded-xl text-xs sm:text-sm text-white placeholder:text-[#B8BEDC]/40 focus:outline-none transition-all ${
                          touched.email && !isEmailValid
                            ? 'border-red-500/80 focus:border-red-500 bg-red-950/20'
                            : 'border-[#3B4FD9]/30 focus:border-[#3B4FD9] focus:bg-[#141B5C]'
                        }`}
                      />
                      {touched.email && !isEmailValid && (
                        <p className="text-[11px] text-red-400 font-medium">
                          Please enter a valid, non-spam work email address.
                        </p>
                      )}
                    </div>

                    {/* ROW 2: Phone / WhatsApp (Required with star, exact 10 valid digits) */}
                    <div className="min-w-0 w-full space-y-1">
                      <label className="block text-xs font-bold text-gray-200">
                        Phone / WhatsApp <span className="text-[#7DE8FF]">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#B8BEDC]/60">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onBlur={() => setTouched({ ...touched, phone: true })}
                          onChange={handlePhoneChange}
                          placeholder="10-digit mobile number"
                          className={`w-full box-border pl-12 pr-3.5 py-2.5 bg-[#0F1442] border rounded-xl text-xs sm:text-sm text-white placeholder:text-[#B8BEDC]/40 focus:outline-none transition-all ${
                            touched.phone && !isPhoneValid
                              ? 'border-red-500/80 focus:border-red-500 bg-red-950/20'
                              : 'border-[#3B4FD9]/30 focus:border-[#3B4FD9] focus:bg-[#141B5C]'
                          }`}
                        />
                      </div>
                      {touched.phone && !isPhoneValid && (
                        <p className="text-[11px] text-red-400 font-medium">
                          Please enter a valid 10-digit number starting with 6, 7, 8, or 9.
                        </p>
                      )}
                    </div>

                    {/* ROW 2: Company / Organization (Optional) */}
                    <div className="min-w-0 w-full space-y-1">
                      <label className="block text-xs font-bold text-gray-200">
                        Company / Organization <span className="text-[#B8BEDC]/60 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Acme Labs Inc."
                        className="w-full box-border px-3.5 py-2.5 bg-[#0F1442] border border-[#3B4FD9]/30 rounded-xl text-xs sm:text-sm text-white placeholder:text-[#B8BEDC]/40 focus:outline-none focus:border-[#3B4FD9] focus:bg-[#141B5C] transition-all"
                      />
                    </div>

                    {/* ROW 3: What do you need help with? (No auto-selection) */}
                    <div className="min-w-0 w-full space-y-1">
                      <label className="block text-xs font-bold text-gray-200">
                        What do you need help with? <span className="text-[#7DE8FF]">*</span>
                      </label>
                      <select
                        required
                        value={formData.service}
                        onBlur={() => setTouched({ ...touched, service: true })}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className={`w-full box-border px-3.5 py-2.5 bg-[#0F1442] border rounded-xl text-xs sm:text-sm focus:outline-none transition-all truncate ${
                          !formData.service ? 'text-[#B8BEDC]/40' : 'text-white'
                        } ${
                          touched.service && !isServiceValid
                            ? 'border-red-500/80 focus:border-red-500 bg-red-950/20'
                            : 'border-[#3B4FD9]/30 focus:border-[#3B4FD9] focus:bg-[#141B5C]'
                        }`}
                      >
                        <option value="" disabled className="bg-[#0A0E2A] text-gray-500">
                          Select a service...
                        </option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0A0E2A] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      {touched.service && !isServiceValid && (
                        <p className="text-[11px] text-red-400 font-medium">
                          Please select a service.
                        </p>
                      )}
                    </div>

                    {/* ROW 4: Project Stage (No auto-selection) */}
                    <div className="min-w-0 w-full space-y-1">
                      <label className="block text-xs font-bold text-gray-200">
                        Project Stage <span className="text-[#7DE8FF]">*</span>
                      </label>
                      <select
                        required
                        value={formData.stage}
                        onBlur={() => setTouched({ ...touched, stage: true })}
                        onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                        className={`w-full box-border px-3.5 py-2.5 bg-[#0F1442] border rounded-xl text-xs sm:text-sm focus:outline-none transition-all truncate ${
                          !formData.stage ? 'text-[#B8BEDC]/40' : 'text-white'
                        } ${
                          touched.stage && !isStageValid
                            ? 'border-red-500/80 focus:border-red-500 bg-red-950/20'
                            : 'border-[#3B4FD9]/30 focus:border-[#3B4FD9] focus:bg-[#141B5C]'
                        }`}
                      >
                        <option value="" disabled className="bg-[#0A0E2A] text-gray-500">
                          Select project stage...
                        </option>
                        {PROJECT_STAGES.map((stg) => (
                          <option key={stg} value={stg} className="bg-[#0A0E2A] text-white">
                            {stg}
                          </option>
                        ))}
                      </select>
                      {touched.stage && !isStageValid && (
                        <p className="text-[11px] text-red-400 font-medium">
                          Please select your project stage.
                        </p>
                      )}
                    </div>

                    {/* ROW 5: Estimated Budget (No auto-selection, Optional) */}
                    <div className="min-w-0 w-full space-y-1">
                      <label className="block text-xs font-bold text-gray-200">
                        Estimated Budget <span className="text-[#B8BEDC]/60 font-normal">(Optional)</span>
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className={`w-full box-border px-3.5 py-2.5 bg-[#0F1442] border border-[#3B4FD9]/30 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#3B4FD9] focus:bg-[#141B5C] transition-all truncate ${
                          !formData.budget ? 'text-[#B8BEDC]/40' : 'text-white'
                        }`}
                      >
                        <option value="" className="bg-[#0A0E2A] text-gray-500">Select budget range (Optional)...</option>
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b} className="bg-[#0A0E2A] text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* ROW 6: Preferred Start Timeline (No auto-selection, Optional) */}
                    <div className="min-w-0 w-full space-y-1">
                      <label className="block text-xs font-bold text-gray-200">
                        Preferred Start Timeline <span className="text-[#B8BEDC]/60 font-normal">(Optional)</span>
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className={`w-full box-border px-3.5 py-2.5 bg-[#0F1442] border border-[#3B4FD9]/30 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#3B4FD9] focus:bg-[#141B5C] transition-all truncate ${
                          !formData.timeline ? 'text-[#B8BEDC]/40' : 'text-white'
                        }`}
                      >
                        <option value="" className="bg-[#0A0E2A] text-gray-500">Select start timeline (Optional)...</option>
                        {TIMELINES.map((t) => (
                          <option key={t} value={t} className="bg-[#0A0E2A] text-white">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* FULL WIDTH: Project Details Textarea (Minimum 10 chars) */}
                  <div className="w-full space-y-1 pt-1">
                    <label className="block text-xs font-bold text-gray-200">
                      Project Details <span className="text-[#7DE8FF]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.projectDetails}
                      onBlur={() => setTouched({ ...touched, projectDetails: true })}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      placeholder="Briefly tell us what you're building, what you need help with, and any important requirements..."
                      className={`w-full box-border px-3.5 py-2.5 bg-[#0F1442] border rounded-xl text-xs sm:text-sm text-white placeholder:text-[#B8BEDC]/40 focus:outline-none transition-all resize-none ${
                        touched.projectDetails && !isDetailsValid
                          ? 'border-red-500/80 focus:border-red-500 bg-red-950/20'
                          : 'border-[#3B4FD9]/30 focus:border-[#3B4FD9] focus:bg-[#141B5C]'
                      }`}
                    />
                    <div className="flex items-center justify-between text-[11px]">
                      {touched.projectDetails && !isDetailsValid ? (
                        <p className="text-red-400 font-medium">
                          Please provide at least 10 characters of project details.
                        </p>
                      ) : (
                        <span className="text-[#B8BEDC]/60">Minimum 10 characters</span>
                      )}
                      <span className="text-[#B8BEDC]/60">{formData.projectDetails.length} chars</span>
                    </div>
                  </div>

                  {/* Cloudflare Turnstile Verification (Managed Mode) */}
                  <div className="pt-2">
                    <TurnstileWidget
                      action="contact_form"
                      onVerify={(token) => {
                        setTurnstileToken(token);
                        setSubmitError(null);
                      }}
                      onExpire={() => setTurnstileToken('')}
                      onError={() => setTurnstileToken('')}
                      resetSignal={resetSignal}
                    />
                  </div>

                  {/* Inline Error Alert */}
                  {submitError && (
                    <div className="p-3.5 bg-red-950/40 border border-red-500/40 rounded-2xl text-xs text-red-300 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                      <span className="leading-relaxed">{submitError}</span>
                    </div>
                  )}

                  {/* Submit Action Button */}
                  <div className="pt-1 space-y-3">
                    <button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className={`w-full py-3.5 sm:py-4 px-6 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                        isFormValid && !isSubmitting
                          ? 'bg-gradient-to-r from-[#3B4FD9] to-[#7B5CE8] text-white hover:shadow-[0_8px_25px_rgba(59,79,217,0.45)] active:scale-95 cursor-pointer'
                          : 'bg-[#0F1442] text-gray-500 border border-[#3B4FD9]/20 cursor-not-allowed shadow-none'
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      ) : (
                        <>
                          <span>Send Project Enquiry</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {/* Privacy / NDA note */}
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#B8BEDC] font-medium text-center">
                      <Lock className="w-3.5 h-3.5 text-[#7DE8FF]" />
                      <span>Your information stays private. Handled under mutual NDA upon request.</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Channels, Presence & Hours (approx 40% on desktop) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Information Card */}
            <div className="bg-gradient-to-br from-[#0A0E2A] via-[#141B5C] to-[#2A3FA8] rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#3B4FD9]/30 shadow-soft-lg space-y-4 relative overflow-hidden text-white">
              {/* Background Tech Dots */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B4FD9_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    Let's Talk
                  </h3>
                  <p className="text-xs text-[#B8BEDC] leading-relaxed">
                    Whether you're starting something new or improving an existing product, we're happy to discuss your requirements.
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  {/* Email */}
                  <a
                    href="mailto:info@alphaaiservices.in"
                    className="flex items-start gap-3 p-3 rounded-2xl bg-[#0F1442] border border-[#3B4FD9]/20 hover:border-[#3B4FD9]/50 hover:bg-[#141B5C] transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#141B5C] border border-[#3B4FD9]/30 flex items-center justify-center text-[#7DE8FF] shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#B8BEDC]/60 block">
                        Email Us
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#7DE8FF] transition-colors truncate block">
                        info@alphaaiservices.in
                      </span>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/918381835420"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 rounded-2xl bg-[#0F1442] border border-[#3B4FD9]/20 hover:border-[#25D366]/50 hover:bg-[#141B5C] transition-all group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#141B5C] border border-[#3B4FD9]/30 flex items-center justify-center text-[#25D366] shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#B8BEDC]/60 block">
                        WhatsApp Us
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#25D366] transition-colors truncate block">
                        Send Direct Message on WhatsApp
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Our Presence / Office Locations */}
            <div className="bg-gradient-to-br from-[#0A0E2A] via-[#141B5C] to-[#2A3FA8] rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#3B4FD9]/30 shadow-soft-lg space-y-4 relative overflow-hidden text-white">
              {/* Background Tech Dots */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#3B4FD9_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B4FD9]/10 blur-[40px] pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#7DE8FF]" />
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                    Our Presence
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* Location 1 */}
                  <div className="p-3.5 rounded-2xl bg-[#0F1442] border border-[#3B4FD9]/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-extrabold text-white">
                        Prayagraj, Uttar Pradesh
                      </h4>
                      <span className="px-2 py-0.5 rounded-md bg-[#141B5C] border border-[#3B4FD9]/40 text-[9.5px] font-bold text-[#7DE8FF]">
                        Office
                      </span>
                    </div>
                    <p className="text-[11px] text-[#B8BEDC]">
                      Our primary office presence in Uttar Pradesh, India.
                    </p>
                  </div>

                  {/* Location 2 */}
                  <div className="p-3.5 rounded-2xl bg-[#0F1442] border border-[#3B4FD9]/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-extrabold text-white">
                        Pune, Maharashtra
                      </h4>
                      <span className="px-2 py-0.5 rounded-md bg-[#141B5C] border border-[#3B4FD9]/20 text-[9.5px] font-bold text-[#B8BEDC]">
                        Remote / Hybrid
                      </span>
                    </div>
                    <p className="text-[11px] text-[#B8BEDC]">
                      Available for remote and hybrid collaboration with clients and teams in Pune, India.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-gradient-to-br from-[#0A0E2A] via-[#141B5C] to-[#2A3FA8] rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#3B4FD9]/30 shadow-soft-lg space-y-3.5 relative overflow-hidden text-white">
              {/* Background Tech Dots */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B4FD9_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 space-y-3.5">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#7DE8FF]" />
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                    Working Hours
                  </h3>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-[#3B4FD9]/20">
                    <span className="font-semibold text-white">Monday – Friday</span>
                    <span className="font-bold text-[#7DE8FF]">9:00 AM – 5:00 PM IST</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#3B4FD9]/20">
                    <span className="text-[#B8BEDC]/60">Saturday</span>
                    <span className="text-gray-400 font-medium">Closed</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[#B8BEDC]/60">Sunday</span>
                    <span className="text-gray-400 font-medium">Closed</span>
                  </div>
                </div>

                <p className="text-[10.5px] text-[#B8BEDC]/60 italic leading-tight pt-1">
                  * Messages received outside working hours will be reviewed on the next business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST STRIP */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDEAFB] shadow-soft text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>TRANSPARENT COLLABORATION</span>
          </div>

          <h3 className="text-base sm:text-lg font-extrabold text-[#151235]">
            Your Information Stays Private &amp; Protected
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-1 text-xs font-semibold text-[#151235]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3B4FD9]" />
              No spam guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3B4FD9]" />
              Clear communication
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3B4FD9]" />
              Transparent scope
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3B4FD9]" />
              No obligation review
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3B4FD9]" />
              Mutual NDA on request
            </span>
          </div>
        </div>
      </section>

      {/* 4. COMPACT FAQ ACCORDION ("Before You Reach Out") */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span>FREQUENTLY ASKED</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151235] tracking-tight">
            Before You Reach Out
          </h2>
        </div>

        <div className="space-y-3 text-left">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white border border-[#EDEAFB] rounded-2xl overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F6F5FC] transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-[#151235]">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#3B4FD9] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#5B5876] shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-[#5B5876] leading-relaxed border-t border-[#EDEAFB] pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FINAL CTA BANNER */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-br from-[#0A0E2A] via-[#141B5C] to-[#2A3FA8] border border-[#3B4FD9]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-9 text-white text-center shadow-soft-lg overflow-hidden">
          {/* Background Decorative Tech Dots Mesh */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B4FD9_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Ambient Royal Blue Glow */}
          <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-[#3B4FD9]/20 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[#7B5CE8]/15 blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Ready to Build or <span className="text-[#7DE8FF]">Improve Your Product?</span>
            </h2>

            <p className="text-[#B8BEDC] text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Let's discuss how we can turn your business vision into clean, robust production software.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
              <button
                onClick={() => onOpenScheduleModal('New Product Scoping')}
                className="bg-gradient-to-r from-[#3B4FD9] to-[#7B5CE8] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold hover:shadow-[0_8px_25px_rgba(59,79,217,0.45)] transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-md cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onOpenScheduleModal('General Direct Inquiry')}
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#7DE8FF]" />
                <span>Talk to Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
