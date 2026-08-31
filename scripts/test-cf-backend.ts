/**
 * Test suite to verify Cloudflare Backend validations, sanitization, and handlers
 */

import {
  validateProjectEnquiry,
  validateQuickInquiry,
  sanitizeHtml,
  formatMultilineToHtml,
  isValidEmail,
  isValidPhone,
} from '../worker/utils/validation';
import {
  buildProjectEnquiryAdminEmail,
  buildProjectEnquiryCustomerEmail,
  buildQuickInquiryAdminEmail,
  buildQuickInquiryCustomerEmail,
} from '../worker/utils/resend';
import { checkRateLimit } from '../worker/utils/rate-limit';
import {
  resolveAllowedHostnames,
  DEFAULT_PRODUCTION_HOSTNAMES,
  DEFAULT_DEVELOPMENT_HOSTNAMES,
  verifyTurnstileToken,
} from '../worker/utils/turnstile';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${msg}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${msg}`);
  }
}

async function runTests() {
  console.log('\n--- 1. Validation & Phone/Email Tests ---');
  
  assert(isValidEmail('rahul@company.com'), 'Valid work email accepted');
  assert(!isValidEmail('fake@test.com'), 'Fake email rejected');
  assert(!isValidEmail('invalid-email'), 'Malformed email rejected');
  
  assert(isValidPhone('9876543211'), 'Valid Indian 10-digit phone accepted');
  assert(!isValidPhone('9876543210'), 'Dummy sequential phone rejected');
  assert(!isValidPhone('9999999999'), 'Repetitive phone rejected');
  assert(!isValidPhone('1234567890'), 'Phone not starting with 6-9 rejected');
  assert(!isValidPhone('98765'), 'Short phone rejected');

  console.log('\n--- 2. Project Enquiry Validation Tests ---');
  
  const validProject = validateProjectEnquiry({
    name: 'Aarav Sharma',
    email: 'aarav@techventures.com',
    phone: '9812345678',
    company: 'TechVentures Pvt Ltd',
    service: 'AI & Machine Learning',
    stage: 'Planning / Discovery',
    budget: '₹50,000 – ₹1 Lakh',
    timeline: 'Within 1 Month',
    projectDetails: 'We need an enterprise RAG pipeline fine-tuned on our internal knowledge base.',
    turnstileToken: 'valid_token_123',
    website: '',
  });
  assert(validProject.valid === true, 'Valid project enquiry passes validation');

  const invalidProjectMissing = validateProjectEnquiry({
    name: 'A', // Too short
    email: 'not-an-email',
    phone: '1234',
    service: 'Non Existent Service',
    stage: 'Unknown Stage',
    projectDetails: 'Too short',
    turnstileToken: '',
  });
  assert(invalidProjectMissing.valid === false, 'Invalid project enquiry fails validation');
  assert(Object.keys(invalidProjectMissing.errors).length >= 5, 'All validation error keys populated');

  console.log('\n--- 3. Quick Inquiry Validation Tests ---');
  
  const validQuick = validateQuickInquiry({
    name: 'Priya Mehta',
    phone: '9765432109',
    email: 'priya@startup.io',
    service: 'Web Application / SaaS',
    contactMethod: 'WhatsApp',
    message: 'Interested in building a MVP SaaS platform in Next.js/React.',
    turnstileToken: 'token_abc_456',
    website: '',
  });
  assert(validQuick.valid === true, 'Valid quick inquiry passes validation');

  console.log('\n--- 4. Sanitization & HTML Escaping Tests ---');
  
  const rawXSS = '<script>alert("XSS")</script>&"\'';
  const sanitized = sanitizeHtml(rawXSS);
  assert(!sanitized.includes('<script>'), 'Script tag stripped/escaped');
  assert(sanitized.includes('&lt;script&gt;'), 'Script tag properly converted to HTML entities');
  assert(sanitized.includes('&amp;'), 'Ampersand escaped');
  assert(sanitized.includes('&quot;'), 'Quotes escaped');

  const multiline = 'Line 1\nLine 2 <script>';
  const multilineHtml = formatMultilineToHtml(multiline);
  assert(multilineHtml.includes('<br/>'), 'Newlines converted to <br/>');
  assert(!multilineHtml.includes('<script>'), 'Multiline text escaped properly');

  console.log('\n--- 5. Email Template Construction Tests ---');
  
  const adminTemplate = buildProjectEnquiryAdminEmail({
    name: 'Dr. John <script>',
    email: 'john@medtech.com',
    phone: '9871234567',
    company: 'MedTech & Co',
    service: 'Custom Software',
    stage: 'Design Ready',
    budget: '₹1 Lakh – ₹3 Lakh',
    timeline: 'Immediately',
    projectDetails: 'Building a secure medical records system.\nMust adhere to HIPAA standards.',
  });
  assert(!adminTemplate.html.includes('<script>'), 'Admin email HTML does not contain unescaped script tag');
  assert(adminTemplate.html.includes('&amp; Co'), 'Company name escaped in email template');
  assert(adminTemplate.subject.includes('Dr. John'), 'Subject includes client name');

  const customerTemplate = buildProjectEnquiryCustomerEmail({
    name: 'Dr. John <script>',
    service: 'Custom Software',
  });
  assert(!customerTemplate.html.includes('<script>'), 'Customer email HTML does not contain unescaped script tag');
  assert(customerTemplate.subject === 'Thank You for Contacting Alpha Ai Services', 'Customer email subject matches specification');
  assert(customerTemplate.html.includes('Dr. John &lt;script&gt;'), 'Customer email HTML contains escaped client name');
  assert(customerTemplate.text.includes('We have successfully received your enquiry'), 'Customer text contains confirmation message');

  const quickCustomerTemplate = buildQuickInquiryCustomerEmail({
    name: 'Priya Mehta <script>',
    service: 'AI & Machine Learning',
    contactMethod: 'WhatsApp',
  });
  assert(quickCustomerTemplate.subject === 'Thank You for Contacting Alpha Ai Services', 'Quick inquiry customer email subject matches specification');
  assert(quickCustomerTemplate.html.includes('Priya Mehta &lt;script&gt;'), 'Quick inquiry customer email HTML contains escaped client name');

  console.log('\n--- 6. Rate Limiter Tests ---');
  const dummyEnv: any = {};
  const rateLimitResult = await checkRateLimit('192.168.1.1', 'project-enquiry', dummyEnv);
  assert(rateLimitResult.allowed === true, 'Rate limit initial request allowed');

  console.log('\n--- 7. Turnstile Environment & Hostname Verification Tests ---');
  
  // Production default strictly allows only official domains
  const prodHostnames = resolveAllowedHostnames({});
  assert(prodHostnames.includes('alphaaiservices.in'), 'Production includes alphaaiservices.in');
  assert(prodHostnames.includes('www.alphaaiservices.in'), 'Production includes www.alphaaiservices.in');
  assert(!prodHostnames.includes('localhost'), 'Production strictly disallows localhost');
  assert(!prodHostnames.includes('127.0.0.1'), 'Production strictly disallows 127.0.0.1');

  // Development mode allows localhost and 127.0.0.1
  const devHostnames = resolveAllowedHostnames({ ENVIRONMENT: 'development' });
  assert(devHostnames.includes('alphaaiservices.in'), 'Development includes alphaaiservices.in');
  assert(devHostnames.includes('localhost'), 'Development includes localhost');
  assert(devHostnames.includes('127.0.0.1'), 'Development includes 127.0.0.1');

  // Custom environment variable override
  const customHostnames = resolveAllowedHostnames({
    ALLOWED_TURNSTILE_HOSTNAMES: 'alphaaiservices.in, staging.alphaaiservices.in, localhost',
  });
  assert(customHostnames.length === 3, 'Custom hostnames parsed properly');
  assert(customHostnames.includes('staging.alphaaiservices.in'), 'Custom hostnames includes staging domain');

  // Missing token/secret validation
  const missingToken = await verifyTurnstileToken('', 'secret', 'contact_form');
  assert(missingToken.valid === false, 'Empty token rejected');

  const missingSecret = await verifyTurnstileToken('valid_token', '', 'contact_form');
  assert(missingSecret.valid === false, 'Missing secret rejected');

  console.log('\n=========================================');
  console.log('🎉 ALL BACKEND & SECURITY TESTS PASSED!');
  console.log('=========================================\n');
}

runTests();
