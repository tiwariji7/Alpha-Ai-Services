/**
 * Schema Validation and Sanitization Utility for Worker API
 */

export const ALLOWED_CONTACT_SERVICES = [
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

export const ALLOWED_STAGES = [
  'Just an Idea',
  'Planning / Discovery',
  'Design Ready',
  'Development Started',
  'Existing Product / Website',
  'Need Ongoing Management',
];

export const ALLOWED_BUDGETS = [
  '',
  'Under ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1 Lakh',
  '₹1 Lakh – ₹3 Lakh',
  '₹3 Lakh+',
  'Not Sure Yet',
];

export const ALLOWED_TIMELINES = [
  '',
  'Immediately',
  'Within 2 Weeks',
  'Within 1 Month',
  '1–3 Months',
  'Just Exploring',
];

export const ALLOWED_QUICK_SERVICES = [
  'Website Development',
  'Web Application / SaaS',
  'Mobile App Development',
  'AI & Machine Learning',
  'Custom Software',
  'Monthly Retainer Support',
  'UI/UX Design',
  'Other',
];

export const ALLOWED_CONTACT_METHODS = ['WhatsApp', 'Phone Call', 'Email'];

/**
 * Escapes HTML characters to prevent XSS / HTML injection in emails
 */
export function sanitizeHtml(input: unknown): string {
  if (input === null || input === undefined) return '';
  const str = String(input);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Formats multiline input into safe HTML with <br/> tags
 */
export function formatMultilineToHtml(input: unknown): string {
  const sanitized = sanitizeHtml(input);
  return sanitized.replace(/\r?\n/g, '<br/>');
}

/**
 * Strips CR, LF, and HTML tags from email subjects to prevent header injection
 */
export function sanitizeSubject(input: string): string {
  return input.replace(/[\r\n\t]/g, ' ').replace(/<[^>]*>/g, '').trim();
}

/**
 * Strict RFC email validation with spam keyword defense
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > 254) return false;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) return false;

  const spamKeywords = ['test@test', 'fake@', 'temp@', 'spam@', 'dummy@'];
  if (spamKeywords.some((kw) => trimmed.toLowerCase().includes(kw))) {
    return false;
  }

  return true;
}

/**
 * 10-digit Indian phone validation (starting with 6-9, disallowing common fake sequences)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== 10) return false;

  if (!/^[6-9]/.test(digits)) return false;
  if (/^(\d)\1{9}$/.test(digits)) return false;

  const fakeSequences = [
    '9876543210',
    '9898989898',
    '9090909090',
    '6789012345',
    '7890123456',
  ];
  if (fakeSequences.includes(digits)) return false;

  return true;
}

export interface ProjectEnquirySanitizedData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  stage: string;
  budget: string;
  timeline: string;
  projectDetails: string;
  turnstileToken: string;
  website: string;
}

export function validateProjectEnquiry(body: any): {
  valid: boolean;
  errors: Record<string, string>;
  sanitizedData?: ProjectEnquirySanitizedData;
} {
  const errors: Record<string, string> = {};

  if (!body || typeof body !== 'object') {
    return { valid: false, errors: { form: 'Invalid request body' } };
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const rawPhone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const company = typeof body.company === 'string' ? body.company.trim() : '';
  const service = typeof body.service === 'string' ? body.service.trim() : '';
  const stage = typeof body.stage === 'string' ? body.stage.trim() : '';
  const budget = typeof body.budget === 'string' ? body.budget.trim() : '';
  const timeline = typeof body.timeline === 'string' ? body.timeline.trim() : '';
  const projectDetails = typeof body.projectDetails === 'string' ? body.projectDetails.trim() : '';
  const turnstileToken = typeof body.turnstileToken === 'string' ? body.turnstileToken.trim() : '';
  const website = typeof body.website === 'string' ? body.website.trim() : '';

  // Name validation
  if (!name || name.length < 2 || name.length > 80 || !/^[a-zA-Z\s.'-]+$/.test(name)) {
    errors.name = 'Please provide a valid name (2–80 letters only).';
  }

  // Email validation
  if (!isValidEmail(email)) {
    errors.email = 'Please provide a valid work email address.';
  }

  // Phone validation
  if (!isValidPhone(cleanPhone)) {
    errors.phone = 'Please provide a valid 10-digit mobile number.';
  }

  // Company validation (optional, max 100 chars)
  if (company.length > 100) {
    errors.company = 'Company name cannot exceed 100 characters.';
  }

  // Service validation
  if (!service || !ALLOWED_CONTACT_SERVICES.includes(service)) {
    errors.service = 'Please select a valid service from the options provided.';
  }

  // Stage validation
  if (!stage || !ALLOWED_STAGES.includes(stage)) {
    errors.stage = 'Please select a valid project stage.';
  }

  // Budget validation (optional)
  if (budget && !ALLOWED_BUDGETS.includes(budget)) {
    errors.budget = 'Please select a valid budget range.';
  }

  // Timeline validation (optional)
  if (timeline && !ALLOWED_TIMELINES.includes(timeline)) {
    errors.timeline = 'Please select a valid timeline.';
  }

  // Project Details validation (required, 10 to 5000 chars)
  if (!projectDetails || projectDetails.length < 10 || projectDetails.length > 5000) {
    errors.projectDetails = 'Please provide project details (10 to 5000 characters).';
  }

  // Turnstile token check
  if (!turnstileToken) {
    errors.turnstileToken = 'Security verification is required.';
  }

  const valid = Object.keys(errors).length === 0;

  return {
    valid,
    errors,
    sanitizedData: valid
      ? {
          name,
          email,
          phone: cleanPhone,
          company,
          service,
          stage,
          budget: budget || 'Not Specified',
          timeline: timeline || 'Not Specified',
          projectDetails,
          turnstileToken,
          website,
        }
      : undefined,
  };
}

export interface QuickInquirySanitizedData {
  name: string;
  phone: string;
  email: string;
  service: string;
  contactMethod: string;
  message: string;
  turnstileToken: string;
  website: string;
}

export function validateQuickInquiry(body: any): {
  valid: boolean;
  errors: Record<string, string>;
  sanitizedData?: QuickInquirySanitizedData;
} {
  const errors: Record<string, string> = {};

  if (!body || typeof body !== 'object') {
    return { valid: false, errors: { form: 'Invalid request body' } };
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const rawPhone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const service = typeof body.service === 'string' ? body.service.trim() : '';
  const contactMethod = typeof body.contactMethod === 'string' ? body.contactMethod.trim() : 'WhatsApp';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const turnstileToken = typeof body.turnstileToken === 'string' ? body.turnstileToken.trim() : '';
  const website = typeof body.website === 'string' ? body.website.trim() : '';

  // Name validation
  if (!name || name.length < 2 || name.length > 80 || !/^[a-zA-Z\s.'-]+$/.test(name)) {
    errors.name = 'Please provide a valid name (2–80 letters only).';
  }

  // Email validation
  if (!isValidEmail(email)) {
    errors.email = 'Please provide a valid work email address.';
  }

  // Phone validation
  if (!isValidPhone(cleanPhone)) {
    errors.phone = 'Please provide a valid 10-digit mobile number.';
  }

  // Service validation
  if (!service || (!ALLOWED_QUICK_SERVICES.includes(service) && service.length > 100)) {
    errors.service = 'Please select a valid service.';
  }

  // Contact Method validation
  if (!contactMethod || !ALLOWED_CONTACT_METHODS.includes(contactMethod)) {
    errors.contactMethod = 'Please select a valid contact method (WhatsApp, Phone Call, or Email).';
  }

  // Message (optional, max 2000 chars)
  if (message.length > 2000) {
    errors.message = 'Message cannot exceed 2000 characters.';
  }

  // Turnstile token check
  if (!turnstileToken) {
    errors.turnstileToken = 'Security verification is required.';
  }

  const valid = Object.keys(errors).length === 0;

  return {
    valid,
    errors,
    sanitizedData: valid
      ? {
          name,
          phone: cleanPhone,
          email,
          service,
          contactMethod,
          message: message || 'None provided',
          turnstileToken,
          website,
        }
      : undefined,
  };
}
