import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(async (language: string, namespace: string) => {
      const response = await fetch(`/locales/${language}/${namespace}.json`);
      if (!response.ok) {
        throw new Error(
          `Failed to load translations: ${language}/${namespace} (${response.status})`
        );
      }
      return response.json();
    })
  )
  .init({
    returnEmptyString: false,
    interpolation: {
      escapeValue: false,
    },
    lng: "en",
    fallbackLng: "en",
    supportedLngs: ["en", "fr", "es", "de", "sv", "ru"],
    nonExplicitSupportedLngs: true,
    ns: ["translation"],
    defaultNS: "translation",
  });

export default i18next;