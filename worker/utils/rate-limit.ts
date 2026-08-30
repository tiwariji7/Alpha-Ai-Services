/**
 * Cloudflare Worker Native Rate Limiting Utility
 * 
 * Target: ~5 submissions per 10 minutes (600s) per IP per endpoint.
 * Supports:
 * 1. Cloudflare Native RateLimiter binding (env.PROJECT_ENQUIRY_LIMITER / env.QUICK_INQUIRY_LIMITER)
 * 2. Cloudflare KV namespace binding (env.RATE_LIMIT_KV)
 * 3. Cloudflare Edge Cache API (caches.default)
 * 4. Resilient local fallback window
 */

import { Env } from '../types';

export interface RateLimitResult {
  allowed: boolean;
  remaining?: number;
  resetSeconds: number;
}

const LIMIT = 5;
const WINDOW_SECONDS = 600; // 10 minutes

// In-memory fallback map for local dev / testing environments
const localDevRateLimitMap = new Map<string, { count: number; expiresAt: number }>();

export async function checkRateLimit(
  ip: string,
  endpoint: 'project-enquiry' | 'quick-inquiry',
  env?: Env
): Promise<RateLimitResult> {
  const safeIp = ip || '127.0.0.1';
  const key = `${endpoint}:${safeIp}`;

  // 1. Cloudflare Native Workers Rate Limiting API (ratelimits binding)
  const nativeLimiter =
    endpoint === 'project-enquiry'
      ? env?.PROJECT_ENQUIRY_LIMITER
      : env?.QUICK_INQUIRY_LIMITER;

  if (nativeLimiter && typeof nativeLimiter.limit === 'function') {
    try {
      const { success } = await nativeLimiter.limit({ key: safeIp });
      return {
        allowed: success,
        resetSeconds: WINDOW_SECONDS,
      };
    } catch (err) {
      console.warn(`Native RateLimiter binding error on ${endpoint}, falling back:`, err);
    }
  }

  // 2. Cloudflare KV Namespace binding (if bound as env.RATE_LIMIT_KV)
  if (env?.RATE_LIMIT_KV && typeof env.RATE_LIMIT_KV.get === 'function') {
    try {
      const kvKey = `ratelimit:${key}`;
      const currentVal = await env.RATE_LIMIT_KV.get(kvKey);
      const count = currentVal ? parseInt(currentVal, 10) : 0;

      if (count >= LIMIT) {
        return {
          allowed: false,
          remaining: 0,
          resetSeconds: WINDOW_SECONDS,
        };
      }

      const nextCount = count + 1;
      await env.RATE_LIMIT_KV.put(kvKey, nextCount.toString(), {
        expirationTtl: WINDOW_SECONDS,
      });

      return {
        allowed: true,
        remaining: Math.max(0, LIMIT - nextCount),
        resetSeconds: WINDOW_SECONDS,
      };
    } catch (kvErr) {
      console.warn('KV rate limit error, falling back:', kvErr);
    }
  }

  // 3. Cloudflare Edge Cache API (Native to Cloudflare Workers runtime)
  if (typeof caches !== 'undefined' && (caches as any).default) {
    try {
      const cache = (caches as any).default;
      const cacheUrl = new URL(`https://worker-ratelimit.internal/${encodeURIComponent(key)}`);
      const cacheReq = new Request(cacheUrl.toString());
      const cachedRes = await cache.match(cacheReq);

      let count = 0;
      if (cachedRes) {
        const body = (await cachedRes.json()) as { count?: number };
        count = body?.count || 0;
      }

      if (count >= LIMIT) {
        return {
          allowed: false,
          remaining: 0,
          resetSeconds: WINDOW_SECONDS,
        };
      }

      const nextCount = count + 1;
      const newRes = new Response(JSON.stringify({ count: nextCount, timestamp: Date.now() }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `public, max-age=${WINDOW_SECONDS}`,
        },
      });

      await cache.put(cacheReq, newRes);

      return {
        allowed: true,
        remaining: Math.max(0, LIMIT - nextCount),
        resetSeconds: WINDOW_SECONDS,
      };
    } catch (cacheErr) {
      console.warn('Edge cache rate limit error, using local tracker:', cacheErr);
    }
  }

  // 4. Local dev / in-memory window fallback
  const now = Date.now();
  const entry = localDevRateLimitMap.get(key);

  if (!entry || now > entry.expiresAt) {
    localDevRateLimitMap.set(key, { count: 1, expiresAt: now + WINDOW_SECONDS * 1000 });
    return {
      allowed: true,
      remaining: LIMIT - 1,
      resetSeconds: WINDOW_SECONDS,
    };
  }

  if (entry.count >= LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      resetSeconds: Math.ceil((entry.expiresAt - now) / 1000),
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: LIMIT - entry.count,
    resetSeconds: Math.ceil((entry.expiresAt - now) / 1000),
  };
}
