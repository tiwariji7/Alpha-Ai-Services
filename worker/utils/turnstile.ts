/**
 * Cloudflare Turnstile Server-Side Verification Utility for Worker
 */

export interface TurnstileVerifyResult {
  success: boolean;
  errorCodes?: string[];
  challengeTs?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export async function verifyTurnstileToken(
  token: string,
  secretKey: string,
  expectedAction: string,
  clientIp?: string
): Promise<{ valid: boolean; error?: string }> {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Missing security verification token. Please complete the verification.' };
  }

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not configured in the worker environment.');
    return { valid: false, error: 'Server security configuration error. Please try again later.' };
  }

  try {
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (clientIp) {
      formData.append('remoteip', clientIp);
    }

    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    if (!verifyResponse.ok) {
      return { valid: false, error: 'Failed to communicate with security verification service.' };
    }

    const data: TurnstileVerifyResult = await verifyResponse.json();

    if (!data.success) {
      console.warn('Turnstile verification failed:', data.errorCodes);
      return { valid: false, error: 'Security verification failed or expired. Please verify and try again.' };
    }

    // Verify action match if returned in response
    if (data.action && data.action !== expectedAction) {
      console.warn(`Turnstile action mismatch: expected ${expectedAction}, got ${data.action}`);
      return { valid: false, error: 'Security token action mismatch. Please refresh and try again.' };
    }

    // Verify hostname match if returned in response
    const ALLOWED_HOSTNAMES = [
      'alphaaiservices.in',
      'www.alphaaiservices.in',
      'localhost',
      '127.0.0.1',
    ];

    if (data.hostname && !ALLOWED_HOSTNAMES.includes(data.hostname.toLowerCase())) {
      console.warn(`Turnstile hostname mismatch: got ${data.hostname}`);
      return { valid: false, error: 'Security token domain mismatch.' };
    }

    return { valid: true };
  } catch (err) {
    console.error('Exception during Turnstile verification in worker:', err);
    return { valid: false, error: 'Verification service error. Please try again.' };
  }
}
