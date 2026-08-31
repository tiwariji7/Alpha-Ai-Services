/**
 * Cloudflare Worker Environment and Binding Interfaces
 */

export interface RateLimiterBinding {
  limit: (options: { key: string }) => Promise<{ success: boolean }>;
}

export interface Env {
  // Cloudflare Static Assets Fetcher binding
  ASSETS: {
    fetch: (request: Request | string, init?: RequestInit) => Promise<Response>;
  };

  // Cloudflare Native Rate Limiting Bindings (optional / configured in wrangler.jsonc)
  PROJECT_ENQUIRY_LIMITER?: RateLimiterBinding;
  QUICK_INQUIRY_LIMITER?: RateLimiterBinding;

  // Cloudflare KV Namespace (optional fallback)
  RATE_LIMIT_KV?: any;

  // Environment Configuration
  ENVIRONMENT?: 'development' | 'production' | 'test' | string;
  ALLOWED_TURNSTILE_HOSTNAMES?: string;

  // Cloudflare Secrets / Environment Variables
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
  ADMIN_EMAIL?: string;
  EMAIL_FROM?: string;
}
