// Google Analytics Integration Helper

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Dynamically initializes Google Analytics (gtag.js) using the provided Measurement ID.
 * This runs only on the client-side and avoids injecting duplicate scripts.
 */
export function initGA(measurementId: string) {
  if (!measurementId || typeof window === "undefined") return;

  // If already loaded, do not re-inject
  if (window.gtag) return;

  // Create standard global site tag scripts
  const scriptElement = document.createElement("script");
  scriptElement.async = true;
  scriptElement.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(scriptElement);

  const initElement = document.createElement("script");
  initElement.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      page_path: window.location.pathname,
    });
  `;
  document.head.appendChild(initElement);

  console.log(`[Google Analytics] Initialized successfully with ID: ${measurementId}`);
}

/**
 * Utility to track custom events (e.g. CTA clicks, form load).
 */
export function trackGAEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
    console.log(`[Google Analytics] Tracked event: ${action} (${category})`, { label, value });
  }
}

/**
 * Utility to track page view paths dynamically.
 */
export function trackGAPageView(path: string) {
  const measurementId = (import.meta as any).env.VITE_GA_MEASUREMENT_ID;
  if (measurementId && typeof window !== "undefined" && window.gtag) {
    window.gtag("config", measurementId, {
      page_path: path,
    });
    console.log(`[Google Analytics] Tracked pageview: ${path}`);
  }
}
