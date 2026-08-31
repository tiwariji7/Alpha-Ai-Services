import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          theme?: 'light' | 'dark' | 'auto';
          callback?: (token: string) => void;
          'error-callback'?: (error?: string) => void;
          'expired-callback'?: () => void;
          appearance?: 'always' | 'execute' | 'interaction-only';
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

interface TurnstileWidgetProps {
  action: 'contact_form' | 'quick_inquiry';
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (err?: string) => void;
  resetSignal?: number;
}

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  action,
  onVerify,
  onExpire,
  onError,
  resetSignal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAEiF7Zt_YsytE0Wk';

  useEffect(() => {
    let isMounted = true;
    let pollInterval: any = null;

    const renderWidget = () => {
      if (!isMounted || !containerRef.current || !window.turnstile) return;

      // Clean up previous widget instance if any
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Ignore removal error
        }
        widgetIdRef.current = null;
      }

      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          theme: 'light',
          appearance: 'always',
          callback: (token: string) => {
            if (isMounted) {
              onVerify(token);
            }
          },
          'expired-callback': () => {
            if (isMounted && onExpire) {
              onExpire();
            }
          },
          'error-callback': (err?: string) => {
            if (isMounted && onError) {
              onError(err);
            }
          },
        });
      } catch (e) {
        console.warn('Turnstile render error:', e);
      }
    };

    // Ensure Turnstile script is loaded dynamically on demand
    const loadScript = () => {
      if (document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')) {
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    loadScript();

    if (window.turnstile) {
      renderWidget();
    } else {
      // Poll until Turnstile script is initialized
      pollInterval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(pollInterval);
          renderWidget();
        }
      }, 100);
    }

    return () => {
      isMounted = false;
      if (pollInterval) clearInterval(pollInterval);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Ignore
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, action]);

  // Handle imperative reset signal
  useEffect(() => {
    if (resetSignal && resetSignal > 0 && widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch (err) {
        console.warn('Turnstile reset error:', err);
      }
    }
  }, [resetSignal]);

  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-[68px]">
      <div ref={containerRef} className="flex justify-center" />
    </div>
  );
};
