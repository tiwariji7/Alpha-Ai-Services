/**
 * Alpha AI Services — Cloudflare Worker Full-Stack Entry Point
 * 
 * Serves:
 * 1. React + Vite Static Assets (via env.ASSETS)
 * 2. API Endpoint: POST /api/project-enquiry
 * 3. API Endpoint: POST /api/quick-inquiry
 */

import { Env } from './types';
import { verifyTurnstileToken } from './utils/turnstile';
import { validateProjectEnquiry, validateQuickInquiry } from './utils/validation';
import { checkRateLimit } from './utils/rate-limit';
import {
  sendEmailWithResend,
  buildProjectEnquiryAdminEmail,
  buildProjectEnquiryCustomerEmail,
  buildQuickInquiryAdminEmail,
  buildQuickInquiryCustomerEmail,
} from './utils/resend';

const MAX_BODY_SIZE = 50 * 1024; // 50 KB

/**
 * Validates request Origin against allowed production and local development origins
 */
export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (
    origin === 'https://alphaaiservices.in' ||
    origin === 'https://www.alphaaiservices.in'
  ) {
    return true;
  }
  // Allow localhost / 127.0.0.1 on any port for local development
  return /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('origin');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };

  if (origin && isAllowedOrigin(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  return headers;
}

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; frame-src 'self' https://challenges.cloudflare.com; connect-src 'self' https://challenges.cloudflare.com https://fonts.googleapis.com https://fonts.gstatic.com;",
};

function jsonResponse(
  request: Request,
  data: any,
  status = 200,
  extraHeaders: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...getCorsHeaders(request),
      ...SECURITY_HEADERS,
      ...extraHeaders,
    },
  });
}

function getClientIp(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    '127.0.0.1'
  );
}

/**
 * Handles POST /api/project-enquiry
 */
async function handleProjectEnquiry(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get('origin');
  if (origin && !isAllowedOrigin(origin)) {
    return jsonResponse(request, { success: false, error: 'Origin not allowed.' }, 403);
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return jsonResponse(request, { success: false, error: 'Invalid content type. Expected application/json.' }, 415);
  }

  const clientIp = getClientIp(request);

  let body: any;
  try {
    const rawText = await request.text();
    if (rawText.length > MAX_BODY_SIZE) {
      return jsonResponse(request, { success: false, error: 'Payload too large.' }, 413);
    }
    body = JSON.parse(rawText);
  } catch {
    return jsonResponse(request, { success: false, error: 'Malformed JSON payload in request.' }, 400);
  }

  // 1. Honeypot check
  if (body.website && typeof body.website === 'string' && body.website.trim() !== '') {
    console.warn(`Honeypot triggered for project-enquiry from IP: ${clientIp}`);
    return jsonResponse(request, {
      success: true,
      message: 'Your project enquiry has been submitted successfully.',
    });
  }

  // 2. Rate Limiting check (~5 submissions / 10 min / IP)
  const rateCheck = await checkRateLimit(clientIp, 'project-enquiry', env);
  if (!rateCheck.allowed) {
    return jsonResponse(
      request,
      {
        success: false,
        error: 'Too many submission attempts. Please wait a few minutes before trying again.',
      },
      429,
      { 'Retry-After': String(rateCheck.resetSeconds) }
    );
  }

  // 3. Turnstile token verification
  const turnstileSecret = env.TURNSTILE_SECRET_KEY;
  const turnstileResult = await verifyTurnstileToken(
    body.turnstileToken,
    turnstileSecret,
    'contact_form',
    clientIp
  );

  if (!turnstileResult.valid) {
    return jsonResponse(request, { success: false, error: turnstileResult.error || 'Security verification failed.' }, 400);
  }

  // 4. Strict Schema Validation
  const validation = validateProjectEnquiry(body);
  if (!validation.valid || !validation.sanitizedData) {
    return jsonResponse(
      request,
      {
        success: false,
        error: 'Please correct the validation errors on the form.',
        errors: validation.errors,
      },
      422
    );
  }

  const data = validation.sanitizedData;

  // 5. Resend Email Dispatch
  const resendApiKey = env.RESEND_API_KEY;
  const adminEmail = env.ADMIN_EMAIL || 'info@alphaaiservices.in';
  const emailFrom = env.EMAIL_FROM || 'Alpha AI Services <noreply@alphaaiservices.in>';

  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not configured in Cloudflare environment.');
    return jsonResponse(
      request,
      {
        success: false,
        error: 'Service temporarily unavailable. Please contact us directly at info@alphaaiservices.in.',
      },
      500
    );
  }

  // Send Admin Notification
  const adminTemplate = buildProjectEnquiryAdminEmail({
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    service: data.service,
    stage: data.stage,
    budget: data.budget,
    timeline: data.timeline,
    projectDetails: data.projectDetails,
  });

  const adminSend = await sendEmailWithResend({
    apiKey: resendApiKey,
    from: emailFrom,
    to: adminEmail,
    replyTo: data.email,
    subject: adminTemplate.subject,
    html: adminTemplate.html,
    text: adminTemplate.text,
  });

  if (!adminSend.success) {
    console.error('Failed to dispatch Admin notification email:', adminSend.error);
    return jsonResponse(
      request,
      {
        success: false,
        error: 'Failed to process enquiry delivery. Please try again or reach out directly via WhatsApp.',
      },
      500
    );
  }

  // Send Customer Confirmation (asynchronous dispatch)
  const customerTemplate = buildProjectEnquiryCustomerEmail({
    name: data.name,
    service: data.service,
  });

  sendEmailWithResend({
    apiKey: resendApiKey,
    from: emailFrom,
    to: data.email,
    replyTo: adminEmail,
    subject: customerTemplate.subject,
    html: customerTemplate.html,
    text: customerTemplate.text,
  }).catch((err) => {
    console.warn('Customer confirmation email send error:', err);
  });

  return jsonResponse(request, {
    success: true,
    message: 'Your project enquiry has been submitted successfully. We will reach out shortly.',
  });
}

/**
 * Handles POST /api/quick-inquiry
 */
async function handleQuickInquiry(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get('origin');
  if (origin && !isAllowedOrigin(origin)) {
    return jsonResponse(request, { success: false, error: 'Origin not allowed.' }, 403);
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return jsonResponse(request, { success: false, error: 'Invalid content type. Expected application/json.' }, 415);
  }

  const clientIp = getClientIp(request);

  let body: any;
  try {
    const rawText = await request.text();
    if (rawText.length > MAX_BODY_SIZE) {
      return jsonResponse(request, { success: false, error: 'Payload too large.' }, 413);
    }
    body = JSON.parse(rawText);
  } catch {
    return jsonResponse(request, { success: false, error: 'Malformed JSON payload in request.' }, 400);
  }

  // 1. Honeypot check
  if (body.website && typeof body.website === 'string' && body.website.trim() !== '') {
    console.warn(`Honeypot triggered for quick-inquiry from IP: ${clientIp}`);
    return jsonResponse(request, {
      success: true,
      message: 'Your inquiry has been submitted successfully.',
    });
  }

  // 2. Rate Limiting check (~5 submissions / 10 min / IP)
  const rateCheck = await checkRateLimit(clientIp, 'quick-inquiry', env);
  if (!rateCheck.allowed) {
    return jsonResponse(
      request,
      {
        success: false,
        error: 'Too many submission attempts. Please wait a few minutes before trying again.',
      },
      429,
      { 'Retry-After': String(rateCheck.resetSeconds) }
    );
  }

  // 3. Turnstile token verification
  const turnstileSecret = env.TURNSTILE_SECRET_KEY;
  const turnstileResult = await verifyTurnstileToken(
    body.turnstileToken,
    turnstileSecret,
    'quick_inquiry',
    clientIp
  );

  if (!turnstileResult.valid) {
    return jsonResponse(request, { success: false, error: turnstileResult.error || 'Security verification failed.' }, 400);
  }

  // 4. Strict Schema Validation
  const validation = validateQuickInquiry(body);
  if (!validation.valid || !validation.sanitizedData) {
    return jsonResponse(
      request,
      {
        success: false,
        error: 'Please correct the validation errors on the form.',
        errors: validation.errors,
      },
      422
    );
  }

  const data = validation.sanitizedData;

  // 5. Resend Email Dispatch
  const resendApiKey = env.RESEND_API_KEY;
  const adminEmail = env.ADMIN_EMAIL || 'info@alphaaiservices.in';
  const emailFrom = env.EMAIL_FROM || 'Alpha AI Services <noreply@alphaaiservices.in>';

  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not configured in Cloudflare environment.');
    return jsonResponse(
      request,
      {
        success: false,
        error: 'Service temporarily unavailable. Please contact us directly at info@alphaaiservices.in.',
      },
      500
    );
  }

  // Send Admin Notification
  const adminTemplate = buildQuickInquiryAdminEmail({
    name: data.name,
    phone: data.phone,
    email: data.email,
    service: data.service,
    contactMethod: data.contactMethod,
    message: data.message,
  });

  const adminSend = await sendEmailWithResend({
    apiKey: resendApiKey,
    from: emailFrom,
    to: adminEmail,
    replyTo: data.email,
    subject: adminTemplate.subject,
    html: adminTemplate.html,
    text: adminTemplate.text,
  });

  if (!adminSend.success) {
    console.error('Failed to dispatch Admin quick inquiry email:', adminSend.error);
    return jsonResponse(
      request,
      {
        success: false,
        error: 'Failed to process inquiry delivery. Please try again or reach out directly via WhatsApp.',
      },
      500
    );
  }

  // Send Customer Confirmation (asynchronous dispatch)
  const customerTemplate = buildQuickInquiryCustomerEmail({
    name: data.name,
    service: data.service,
    contactMethod: data.contactMethod,
  });

  sendEmailWithResend({
    apiKey: resendApiKey,
    from: emailFrom,
    to: data.email,
    replyTo: adminEmail,
    subject: customerTemplate.subject,
    html: customerTemplate.html,
    text: customerTemplate.text,
  }).catch((err) => {
    console.warn('Customer confirmation email send error:', err);
  });

  return jsonResponse(request, {
    success: true,
    message: 'Your inquiry has been received successfully. We will connect with you shortly.',
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      const origin = request.headers.get('origin');
      if (origin && !isAllowedOrigin(origin)) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, {
        status: 204,
        headers: {
          ...getCorsHeaders(request),
          ...SECURITY_HEADERS,
        },
      });
    }

    // API Routing
    if (pathname === '/api/project-enquiry') {
      if (request.method !== 'POST') {
        return jsonResponse(request, { success: false, error: 'Method Not Allowed' }, 405);
      }
      return handleProjectEnquiry(request, env);
    }

    if (pathname === '/api/quick-inquiry') {
      if (request.method !== 'POST') {
        return jsonResponse(request, { success: false, error: 'Method Not Allowed' }, 405);
      }
      return handleQuickInquiry(request, env);
    }

    if (pathname.startsWith('/api/')) {
      return jsonResponse(request, { success: false, error: 'API route not found' }, 404);
    }

    // Static Asset & SPA Handling via Cloudflare Workers Assets binding
    if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      try {
        const assetResponse = await env.ASSETS.fetch(request);
        
        // If static asset exists, return with security headers
        if (assetResponse.status !== 404) {
          const newHeaders = new Headers(assetResponse.headers);
          for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
            if (!newHeaders.has(key)) {
              newHeaders.set(key, value);
            }
          }
          return new Response(assetResponse.body, {
            status: assetResponse.status,
            statusText: assetResponse.statusText,
            headers: newHeaders,
          });
        }

        // SPA Fallback: If 404 on HTML route, serve index.html
        const spaRequest = new Request(new URL('/index.html', request.url).toString(), request);
        const spaResponse = await env.ASSETS.fetch(spaRequest);
        const spaHeaders = new Headers(spaResponse.headers);
        for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
          if (!spaHeaders.has(key)) {
            spaHeaders.set(key, value);
          }
        }
        return new Response(spaResponse.body, {
          status: 200,
          headers: spaHeaders,
        });
      } catch (assetErr) {
        console.error('Error fetching static asset from binding:', assetErr);
      }
    }

    return new Response('Not Found', { status: 404 });
  },
};
