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

export const DEFAULT_PRODUCTION_HOSTNAMES: readonly string[] = [
  'alphaaiservices.in',
  'www.alphaaiservices.in',
];

export const DEFAULT_DEVELOPMENT_HOSTNAMES: readonly string[] = [
  'alphaaiservices.in',
  'www.alphaaiservices.in',
  'localhost',
  '127.0.0.1',
];

/**
 * Resolves the expected Turnstile hostnames based on the environment configuration.
 * - In Production: strictly allows alphaaiservices.in and www.alphaaiservices.in
 * - In Development (ENVIRONMENT='development'): additionally allows localhost and 127.0.0.1
 * - Custom override: ALLOWED_TURNSTILE_HOSTNAMES comma-separated list
 */
export function resolveAllowedHostnames(env?: {
  ENVIRONMENT?: string;
  ALLOWED_TURNSTILE_HOSTNAMES?: string;
}): string[] {
  if (env?.ALLOWED_TURNSTILE_HOSTNAMES && typeof env.ALLOWED_TURNSTILE_HOSTNAMES === 'string') {
    const parsed = env.ALLOWED_TURNSTILE_HOSTNAMES.split(',')
      .map((h) => h.trim().toLowerCase())
      .filter(Boolean);
    if (parsed.length > 0) {
      return parsed;
    }
  }

  if (env?.ENVIRONMENT === 'development') {
    return [...DEFAULT_DEVELOPMENT_HOSTNAMES];
  }

  return [...DEFAULT_PRODUCTION_HOSTNAMES];
}

export async function verifyTurnstileToken(
  token: string,
  secretKey: string,
  expectedAction: string,
  clientIp?: string,
  allowedHostnames: readonly string[] = DEFAULT_PRODUCTION_HOSTNAMES
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

    // Verify hostname match against allowed list
    if (data.hostname) {
      const normalizedHostname = data.hostname.toLowerCase();
      const isAllowed = allowedHostnames.some(
        (allowed) => allowed.toLowerCase() === normalizedHostname
      );

      if (!isAllowed) {
        console.warn(
          `Turnstile hostname mismatch: got ${data.hostname}, allowed: [${allowedHostnames.join(', ')}]`
        );
        return { valid: false, error: 'Security token domain mismatch.' };
      }
    }

    return { valid: true };
  } catch (err) {
    console.error('Exception during Turnstile verification in worker:', err);
    return { valid: false, error: 'Verification service error. Please try again.' };
  }
}
