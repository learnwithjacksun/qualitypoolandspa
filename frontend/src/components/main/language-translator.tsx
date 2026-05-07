import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  type GTranslateSettings = {
    default_language: string;
    detect_browser_language: boolean;
    languages: string[];
    wrapper_selector: string;
    switcher_horizontal_position: string;
    float_switcher_open_direction: string;
  };

  interface Window {
    gtranslateSettings: GTranslateSettings;
    doGTranslate?: (langPair: string) => void;
  }
}

const SCRIPT_ID = "gtranslate-script";
const GTRANSLATE_SCRIPT_SRC =
  "https://cdn.gtranslate.net/widgets/latest/float.js";

const getCookie = (name: string): string | null => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  if (!cookieValue) return null;
  return decodeURIComponent(cookieValue.split("=").slice(1).join("="));
};

const getLangPairFromGoogtransCookie = (): string | null => {
  // Example: googtrans=/en/es
  const value = getCookie("googtrans");
  if (!value) return null;

  const parts = value.replace(/^\//, "").split("/");
  const source = parts[0] ?? window.gtranslateSettings?.default_language;
  const target = parts[1];

  if (!source || !target) return null;
  if (source === target) return null;

  return `${source}|${target}`;
};

const tryApplySavedTranslation = (): boolean => {
  const langPair = getLangPairFromGoogtransCookie();
  if (!langPair) return false;
  if (typeof window.doGTranslate !== "function") return false;

  window.doGTranslate(langPair);
  return true;
};

// Header renders `GTranslate` twice (desktop + mobile). When React re-renders
// on navigation, both instances will run effects; we only want one script
// injection per route change to avoid conflicts.
let lastInjectedPath: string | null = null;
let cookieWatchIntervalId: number | null = null;
let lastGoogtransCookieValue: string | null = null;

const GTranslate = () => {
  const location = useLocation();

  useEffect(() => {
    // Global settings used by the gtranslate widget script.
    window.gtranslateSettings = {
      default_language: "en",
      detect_browser_language: true,
      languages: ["en", "fr", "es", "ru", "sv"],
      wrapper_selector: ".gtranslate_wrapper",
      switcher_horizontal_position: "inline",
      float_switcher_open_direction: "bottom",
    };

    // Re-initialize on SPA navigation so the widget appears immediately
    // after route changes (React can wipe the widget DOM during re-renders).
    if (lastInjectedPath === location.pathname) return;
    lastInjectedPath = location.pathname;

    const existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript) existingScript.remove();

    // Create script
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = GTRANSLATE_SCRIPT_SRC;
    script.defer = true;

    document.body.appendChild(script);

    // gtranslate does not always translate newly-rendered DOM in SPAs.
    // After route change, force translation using the last selected language.
    if (getLangPairFromGoogtransCookie()) {
      let attempts = 0;
      const maxAttempts = 20;

      const intervalId = window.setInterval(() => {
        attempts += 1;
        if (tryApplySavedTranslation()) {
          window.clearInterval(intervalId);
          return;
        }

        if (attempts >= maxAttempts) {
          window.clearInterval(intervalId);
        }
      }, 250);

      return () => {
        window.clearInterval(intervalId);
      };
    }

    return () => {
      // Optional cleanup
      // document.body.removeChild(script);
    };
  }, [location.pathname]);

  useEffect(() => {
    // Apply translation immediately when user changes language on first load.
    // The widget updates `googtrans`; we detect that change and call doGTranslate.
    if (cookieWatchIntervalId !== null) return;

    cookieWatchIntervalId = window.setInterval(() => {
      const currentCookieValue = getCookie("googtrans");
      if (!currentCookieValue || currentCookieValue === lastGoogtransCookieValue) {
        return;
      }

      lastGoogtransCookieValue = currentCookieValue;
      tryApplySavedTranslation();
    }, 300);
  }, []);

  return <div className="gtranslate_wrapper"></div>;
};

export default GTranslate;
