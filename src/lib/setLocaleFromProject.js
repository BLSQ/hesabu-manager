import i18n from "i18next";

export const setLocaleFromProject = project => {
  const currentLanguage = i18n.language;
  if (project.defaultLocale && project.defaultLocale !== currentLanguage) {
    i18n.changeLanguage(project.defaultLocale);
  }
};
