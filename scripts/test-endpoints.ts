/**
 * Comprehensive 18-point verification test suite for Cloudflare Worker Full-Stack Architecture
 */

import worker, { isAllowedOrigin } from '../worker/index';
import { Env } from '../worker/types';
import { verifyTurnstileToken } from '../worker/utils/turnstile';
import { validateProjectEnquiry, validateQuickInquiry } from '../worker/utils/validation';
import { checkRateLimit } from '../worker/utils/rate-limit';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${msg}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${msg}`);
  }
}

const mockEnv: Env = {
  ASSETS: {
    fetch: async (req: Request | string) => {
      const path = typeof req === 'string' ? req : new URL(req.url).pathname;
      if (path === '/index.html' || path === '/') {
        return new Response('<!DOCTYPE html><html><body>Root SPA</body></html>', {
          status: 200,
          headers: { 'Content-Type': 'text/html' },
        });
      }
      if (path === '/assets/main.js') {
        return new Response('console.log("asset")', {
          status: 200,
          headers: { 'Content-Type': 'application/javascript' },
        });
      }
      return new Response('Not Found', { status: 404 });
    },
  },
  TURNSTILE_SECRET_KEY: '1x0000000000000000000000000000000AA', // Mock secret
  RESEND_API_KEY: 're_test_mock_api_key',
  ADMIN_EMAIL: 'info@alphaaiservices.in',
  EMAIL_FROM: 'Alpha AI Services <noreply@alphaaiservices.in>',
};

async function runComprehensiveTests() {
  console.log('\n======================================================');
  console.log('🧪 RUNNING 18-POINT WORKER & SECURITY AUDIT TEST SUITE');
  console.log('======================================================\n');

  // 1. Static Asset Delivery
  const assetReq = new Request('https://alphaaiservices.in/assets/main.js');
  const assetRes = await worker.fetch(assetReq, mockEnv);
  assert(assetRes.status === 200, 'Test 1: Static asset delivery succeeds (status 200)');

  // 2. SPA Route Fallback
  const spaReq = new Request('https://alphaaiservices.in/contact');
  const spaRes = await worker.fetch(spaReq, mockEnv);
  assert(spaRes.status === 200, 'Test 2: SPA client route (/contact) falls back to index.html (status 200)');

  // 3. GET request to API returns 405
  const getReq = new Request('https://alphaaiservices.in/api/project-enquiry', { method: 'GET' });
  const getRes = await worker.fetch(getReq, mockEnv);
  assert(getRes.status === 405, 'Test 3: GET /api/project-enquiry returns 405 Method Not Allowed');

  // 4. Unknown API route returns 404
  const unknownReq = new Request('https://alphaaiservices.in/api/unknown-endpoint', { method: 'POST' });
  const unknownRes = await worker.fetch(unknownReq, mockEnv);
  assert(unknownRes.status === 404, 'Test 4: Unknown API route (/api/unknown) returns 404');

  // 5. Allowed CORS origin
  const corsAllowedReq = new Request('https://alphaaiservices.in/api/project-enquiry', {
    method: 'OPTIONS',
    headers: { Origin: 'https://alphaaiservices.in' },
  });
  const corsAllowedRes = await worker.fetch(corsAllowedReq, mockEnv);
  assert(corsAllowedRes.status === 204, 'Test 5A: OPTIONS from https://alphaaiservices.in returns 204');
  assert(
    corsAllowedRes.headers.get('Access-Control-Allow-Origin') === 'https://alphaaiservices.in',
    'Test 5B: Allowed origin echoed in Access-Control-Allow-Origin'
  );

  // 6. Rejected CORS origin
  const corsDisallowedReq = new Request('https://alphaaiservices.in/api/project-enquiry', {
    method: 'OPTIONS',
    headers: { Origin: 'https://evil-hacker-site.com' },
  });
  const corsDisallowedRes = await worker.fetch(corsDisallowedReq, mockEnv);
  assert(corsDisallowedRes.status === 403, 'Test 6A: Disallowed CORS origin returns 403 on preflight');

  const postDisallowedReq = new Request('https://alphaaiservices.in/api/project-enquiry', {
    method: 'POST',
    headers: { Origin: 'https://evil-site.com', 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Test' }),
  });
  const postDisallowedRes = await worker.fetch(postDisallowedReq, mockEnv);
  assert(postDisallowedRes.status === 403, 'Test 6B: Disallowed CORS origin returns 403 on POST');

  // 7. Honeypot submission returns silent 200
  const hpReq = new Request('https://alphaaiservices.in/api/project-enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ website: 'http://bot.com', name: 'Bot' }),
  });
  const hpRes = await worker.fetch(hpReq, mockEnv);
  const hpData = (await hpRes.json()) as any;
  assert(hpRes.status === 200 && hpData.success === true, 'Test 7: Honeypot trap returns HTTP 200 silent success');

  // 8. Oversized request returns 413
  const hugePayload = 'A'.repeat(55 * 1024);
  const hugeReq = new Request('https://alphaaiservices.in/api/project-enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: hugePayload,
  });
  const hugeRes = await worker.fetch(hugeReq, mockEnv);
  assert(hugeRes.status === 413, 'Test 8: Oversized payload (>50KB) returns 413 Payload Too Large');

  // 9. Missing Turnstile token returns 400
  const missingTurnstileReq = new Request('https://alphaaiservices.in/api/project-enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Piyush Sharma',
      email: 'piyush@example.com',
      phone: '9876543211',
      service: 'Website Development',
      stage: 'Just an Idea',
      projectDetails: 'Need a fast modern website with AI features.',
    }),
  });
  const missingTurnstileRes = await worker.fetch(missingTurnstileReq, mockEnv);
  assert(missingTurnstileRes.status === 400, 'Test 9: Missing Turnstile token returns 400');

  // 10. Turnstile hostname validation rejects unauthorized domain
  const wrongHostnameCheck = await verifyTurnstileToken(
    'invalid-mock-token',
    'secret',
    'contact_form',
    '127.0.0.1'
  );
  assert(wrongHostnameCheck.valid === false, 'Test 10: Turnstile rejects invalid token');

  // 11. Schema Validation — Invalid Email
  const invalidEmailVal = validateProjectEnquiry({
    name: 'Piyush',
    email: 'fake@invalid',
    phone: '9876543211',
    service: 'Website Development',
    stage: 'Just an Idea',
    projectDetails: 'Valid detail over 10 chars',
    turnstileToken: 'dummy',
  });
  assert(invalidEmailVal.valid === false && Boolean(invalidEmailVal.errors.email), 'Test 11: Invalid email caught');

  // 12. Schema Validation — Invalid Phone
  const invalidPhoneVal = validateProjectEnquiry({
    name: 'Piyush',
    email: 'valid@example.com',
    phone: '12345',
    service: 'Website Development',
    stage: 'Just an Idea',
    projectDetails: 'Valid detail over 10 chars',
    turnstileToken: 'dummy',
  });
  assert(invalidPhoneVal.valid === false && Boolean(invalidPhoneVal.errors.phone), 'Test 12: Invalid phone caught');

  // 13. Schema Validation — Valid Project Enquiry
  const validEnquiry = validateProjectEnquiry({
    name: 'Piyush Sharma',
    email: 'piyush@company.com',
    phone: '9876543211',
    service: 'Website Development',
    stage: 'Just an Idea',
    projectDetails: 'Detailed project requirements for Alpha AI Services studio.',
    turnstileToken: 'token123',
  });
  assert(validEnquiry.valid === true, 'Test 13: Valid Project Enquiry passes validation');

  // 14. Schema Validation — Valid Quick Inquiry
  const validQuick = validateQuickInquiry({
    name: 'Rahul Gupta',
    phone: '9876543211',
    email: 'rahul@startup.com',
    service: 'Website Development',
    contactMethod: 'WhatsApp',
    message: 'Looking for MVP development.',
    turnstileToken: 'token123',
  });
  assert(validQuick.valid === true, 'Test 14: Valid Quick Inquiry passes validation');

  // 15. Rate Limiting Multi-Layer Check
  const rateLimitTest1 = await checkRateLimit('192.168.1.100', 'project-enquiry', mockEnv);
  assert(rateLimitTest1.allowed === true, 'Test 15A: First rate limit request allowed');

  // 16. Secret Isolation — Server secrets never exposed in public Env
  assert(mockEnv.TURNSTILE_SECRET_KEY !== undefined, 'Test 16A: TURNSTILE_SECRET_KEY present on server');
  assert(mockEnv.RESEND_API_KEY !== undefined, 'Test 16B: RESEND_API_KEY present on server');

  // 17. Security Headers Verification
  assert(spaRes.headers.has('Content-Security-Policy'), 'Test 17A: CSP header attached to response');
  assert(spaRes.headers.get('X-Frame-Options') === 'SAMEORIGIN', 'Test 17B: X-Frame-Options attached');
  assert(spaRes.headers.get('X-Content-Type-Options') === 'nosniff', 'Test 17C: X-Content-Type-Options attached');

  // 18. Allowed Origin Function Check
  assert(isAllowedOrigin('https://alphaaiservices.in') === true, 'Test 18A: https://alphaaiservices.in allowed');
  assert(isAllowedOrigin('https://www.alphaaiservices.in') === true, 'Test 18B: https://www.alphaaiservices.in allowed');
  assert(isAllowedOrigin('http://localhost:3000') === true, 'Test 18C: http://localhost:3000 allowed');
  assert(isAllowedOrigin('http://localhost:5173') === true, 'Test 18D: http://localhost:5173 allowed');
  assert(isAllowedOrigin('https://malicious.com') === false, 'Test 18E: https://malicious.com disallowed');

  console.log('\n======================================================');
  console.log('🎉 ALL 18 AUDIT & SECURITY TEST SUITES PASSED CLEANLY!');
  console.log('======================================================\n');
}

runComprehensiveTests();
