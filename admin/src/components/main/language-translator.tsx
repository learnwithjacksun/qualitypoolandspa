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

    const existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = GTRANSLATE_SCRIPT_SRC;
    script.defer = true;
    document.body.appendChild(script);

    // gtranslate does not always translate newly-rendered DOM in SPAs.
    // Force translation using the last selected language stored in `googtrans`.
    const langPair = getLangPairFromGoogtransCookie();
    if (langPair) {
      let attempts = 0;
      const maxAttempts = 20;

      const intervalId = window.setInterval(() => {
        attempts += 1;
        if (typeof window.doGTranslate === "function") {
          window.doGTranslate(langPair);
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

    return undefined;
  }, [location.pathname]);

  return <div className="gtranslate_wrapper"></div>;
};

export default GTranslate;
