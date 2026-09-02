import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  User,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  Clock,
  MessageCircle,
  Send,
  Lock,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TurnstileWidget } from './TurnstileWidget';

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

const QUICK_SERVICES = [
  'Website Development',
  'Web Application / SaaS',
  'Mobile App Development',
  'AI & Machine Learning',
  'Custom Software',
  'Monthly Retainer Support',
  'UI/UX Design',
  'Other',
];

const CONTACT_PREFERENCES = [
  { id: 'WhatsApp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'Phone Call', label: 'Phone Call', icon: Phone },
  { id: 'Email', label: 'Email', icon: Mail },
];

export const ScheduleCallModal: React.FC<ScheduleCallModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
}) => {
  const [website, setWebsite] = useState(''); // Honeypot
  const [turnstileToken, setTurnstileToken] = useState('');
  const [resetSignal, setResetSignal] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialTopic || 'Website Development',
    contactMethod: 'WhatsApp',
    message: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    service: false,
  });

  // Sync initial topic when modal opens
  useEffect(() => {
    if (initialTopic) {
      setFormData((prev) => ({
        ...prev,
        service: initialTopic,
      }));
    }
  }, [initialTopic]);

  // Reset modal state on open/close
  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
      setIsSubmitting(false);
      setTouched({
        name: false,
        email: false,
        phone: false,
        service: false,
      });
      setWebsite('');
      setTurnstileToken('');
      setSubmitError(null);
      setResetSignal((prev) => prev + 1);
    }
  }, [isOpen]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Validation rules
  const isNameValid = /^[a-zA-Z\s.'-]{2,50}$/.test(formData.name.trim());
  const isPhoneValid = /^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''));
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim());

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: val });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^a-zA-Z\s.'-]/g, '').slice(0, 50);
    setFormData({ ...formData, name: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
    });

    if (!isNameValid || !isPhoneValid || !isEmailValid) {
      return;
    }

    // Bot detection via honeypot field
    if (website) {
      console.warn('Bot submission blocked via honeypot');
      setIsSuccess(true);
      return;
    }

    // Require Cloudflare Turnstile token
    if (!turnstileToken) {
      setSubmitError('Please complete security verification before sending your inquiry.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: '',
      service: formData.service,
      budget: 'Flexible',
      timeline: 'Immediately',
      details: formData.message.trim() || `Quick Inquiry via Modal — Preferred Contact: ${formData.contactMethod}`,
      contactMethod: formData.contactMethod,
      source: 'quick_inquiry_modal',
      timestamp: new Date().toISOString(),
      turnstileToken: turnstileToken,
    };

    try {
      // Direct Worker POST (works locally and deployed)
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSuccess(true);
        // Delightful victory confetti burst
        try {
          confetti({
            particleCount: 75,
            spread: 60,
            origin: { y: 0.65 },
          });
        } catch {
          // Ignore confetti errors if blocked
        }
      } else {
        const errorData = await res.json().catch(() => ({}));
        setSubmitError((errorData as any).message || 'Unable to submit right now. Please try reaching us directly on WhatsApp or Email.');
        setTurnstileToken('');
        setResetSignal((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Submission fetch error:', err);
      setSubmitError('Network error while sending inquiry. Please check your connection or reach us on WhatsApp.');
      setTurnstileToken('');
      setResetSignal((prev) => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A0E2A]/70 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white rounded-3xl border border-[#EDEAFB] shadow-2xl w-full max-w-xl overflow-hidden z-10 my-auto text-left"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#EDEAFB] bg-white flex items-start justify-between gap-4">
              <div className="space-y-1 pr-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[10.5px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>QUICK INQUIRY</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-[#151235] tracking-tight leading-tight">
                  Let's Build Something <span className="text-[#3B4FD9]">Great Together.</span>
                </h3>

                <p className="text-xs text-[#5B5876] leading-relaxed">
                  Leave your details below. We'll connect with you directly as soon as possible.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-[#F6F5FC] border border-[#EDEAFB] text-[#5B5876] hover:text-[#151235] hover:border-[#3B4FD9]/40 flex items-center justify-center transition-all shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6">
              {isSuccess ? (
                /* Success Screen */
                <div className="text-center py-6 sm:py-8 space-y-4">
                  <div className="w-14 h-14 bg-[#EDEAFB] text-[#5B4FE0] rounded-full flex items-center justify-center mx-auto border border-[#7B5CE8]/30 shadow-2xs">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xl font-extrabold text-[#151235]">
                      Thank You, {formData.name}!
                    </h4>
                    <p className="text-xs text-[#5B5876] max-w-sm mx-auto leading-relaxed">
                      We've received your request for <strong>{formData.service}</strong>. We'll reach out via <strong>{formData.contactMethod}</strong> as soon as possible.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-3.5 bg-[#EDEAFB]/50 border border-[#EDEAFB] rounded-2xl text-xs text-[#5B5876] max-w-sm mx-auto space-y-1.5 text-left">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Phone:</span>
                      <span className="font-bold text-[#151235]">+91 {formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Email:</span>
                      <span className="font-bold text-[#151235]">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Service:</span>
                      <span className="font-bold text-[#3B4FD9]">{formData.service}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <button
                      onClick={onClose}
                      className="w-full sm:w-auto bg-gradient-to-r from-[#3B4FD9] to-[#7B5CE8] text-white py-2.5 px-6 rounded-full font-bold text-xs transition-all cursor-pointer shadow-xs"
                    >
                      Back to Website
                    </button>

                    <a
                      href="https://wa.me/918381835420"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-[#F6F5FC] text-[#151235] border border-[#EDEAFB] hover:bg-[#25D366]/10 hover:border-[#25D366]/30 hover:text-[#25D366] py-2.5 px-5 rounded-full font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Chat on WhatsApp →</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* Short High-Conversion Form */
                <form onSubmit={handleSubmit} className="space-y-4">
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
                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#151235]">
                        Full Name <span className="text-[#3B4FD9]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onBlur={() => setTouched({ ...touched, name: true })}
                          onChange={handleNameChange}
                          placeholder="e.g. Rahul Sharma"
                          className={`w-full pl-8 pr-3 py-2 bg-[#F6F5FC]/70 border rounded-xl text-xs sm:text-sm text-[#151235] placeholder:text-gray-400 focus:outline-none transition-all ${touched.name && !isNameValid
                              ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                              : 'border-[#EDEAFB] focus:border-[#3B4FD9] focus:bg-white'
                            }`}
                        />
                      </div>
                      {touched.name && !isNameValid && (
                        <p className="text-[10.5px] text-red-500 font-medium">
                          Please enter your name (letters only).
                        </p>
                      )}
                    </div>

                    {/* Phone / WhatsApp */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#151235]">
                        WhatsApp / Phone <span className="text-[#3B4FD9]">*</span>
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-[#EDEAFB] bg-[#EDEAFB] text-[#151235] text-xs font-bold shrink-0">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onBlur={() => setTouched({ ...touched, phone: true })}
                          onChange={handlePhoneChange}
                          placeholder="98765 43210"
                          maxLength={10}
                          className={`w-full px-3 py-2 bg-[#F6F5FC]/70 border rounded-r-xl text-xs sm:text-sm text-[#151235] placeholder:text-gray-400 focus:outline-none transition-all ${touched.phone && !isPhoneValid
                              ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                              : 'border-[#EDEAFB] focus:border-[#3B4FD9] focus:bg-white'
                            }`}
                        />
                      </div>
                      {touched.phone && !isPhoneValid && (
                        <p className="text-[10.5px] text-red-500 font-medium">
                          Please enter a valid 10-digit mobile number.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Work Email */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#151235]">
                      Work Email <span className="text-[#3B4FD9]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onBlur={() => setTouched({ ...touched, email: true })}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@company.com"
                        className={`w-full pl-8 pr-3 py-2 bg-[#F6F5FC]/70 border rounded-xl text-xs sm:text-sm text-[#151235] placeholder:text-gray-400 focus:outline-none transition-all ${touched.email && !isEmailValid
                            ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                            : 'border-[#EDEAFB] focus:border-[#3B4FD9] focus:bg-white'
                          }`}
                      />
                    </div>
                    {touched.email && !isEmailValid && (
                      <p className="text-[10.5px] text-red-500 font-medium">
                        Please enter a valid work email address.
                      </p>
                    )}
                  </div>

                  {/* Row 3: Service Selection */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#151235]">
                      What service do you need? <span className="text-[#3B4FD9]">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {QUICK_SERVICES.map((srv) => {
                        const isSelected = formData.service === srv;
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => setFormData({ ...formData, service: srv })}
                            className={`p-2 rounded-xl text-[11px] font-bold border text-center transition-all cursor-pointer truncate ${isSelected
                                ? 'bg-gradient-to-r from-[#3B4FD9] to-[#7B5CE8] text-white border-transparent shadow-2xs'
                                : 'bg-[#F6F5FC]/80 text-[#5B5876] border-[#EDEAFB] hover:border-[#3B4FD9]/40 hover:text-[#151235]'
                              }`}
                          >
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 4: Preferred Contact Method */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#151235]">
                      Preferred way to connect:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {CONTACT_PREFERENCES.map((method) => {
                        const isSelected = formData.contactMethod === method.id;
                        const Icon = method.icon;
                        return (
                          <button
                            type="button"
                            key={method.id}
                            onClick={() => setFormData({ ...formData, contactMethod: method.id })}
                            className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${isSelected
                                ? 'bg-[#0F1442] text-white border-[#0F1442] shadow-2xs'
                                : 'bg-[#F6F5FC]/80 text-[#5B5876] border-[#EDEAFB] hover:text-[#151235]'
                              }`}
                          >
                            <Icon className="w-3.5 h-3.5 text-[#3B4FD9]" />
                            <span>{method.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 5: Short Project Note */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#151235]">
                      Project Note <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe what you want to build or improve..."
                      className="w-full px-3 py-2 bg-[#F6F5FC]/70 border border-[#EDEAFB] rounded-xl text-xs sm:text-sm text-[#151235] placeholder:text-gray-400 focus:outline-none focus:border-[#3B4FD9] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Cloudflare Turnstile Verification (Managed Mode) */}
                  <div className="pt-1">
                    <TurnstileWidget
                      action="quick_inquiry"
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
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{submitError}</span>
                    </div>
                  )}

                  {/* Submit Button & Trust Note */}
                  <div className="pt-1 space-y-2.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#3B4FD9] to-[#7B5CE8] hover:shadow-md hover:shadow-[#3B4FD9]/30 text-white py-3 px-6 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-md cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Details...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Inquiry</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-3 text-[11px] text-[#5B5876]">
                      <span className="flex items-center gap-1">
                        <Lock className="w-3 h-3 text-[#5B4FE0]" />
                        100% Confidential
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#3B4FD9]" />
                        Replies in &lt; 24h
                      </span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
