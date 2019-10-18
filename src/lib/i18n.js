import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import enTranslations from "./translations/en";
import frTranslations from "./translations/fr";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    ...enTranslations,
    ...frTranslations,
  },
  fallbackLng: "fr",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ",",
  },

  react: {
    wait: true,
  },
});

export default i18n;
