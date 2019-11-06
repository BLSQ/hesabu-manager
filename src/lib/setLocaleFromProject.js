import i18n from "i18next";
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import fr from 'javascript-time-ago/locale/en';

export const setLocaleFromProject = project => {
  const currentLanguage = i18n.language;
  if (project.defaultLocale && project.defaultLocale !== currentLanguage) {
    i18n.changeLanguage(project.defaultLocale);
  }
  // AB: Ask about the languageChanged hook from i18next
  JavascriptTimeAgo.locale(i18n.language);
};
