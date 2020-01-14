export const AVAILABLE_LOCALES = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
];

export const TOUR_CONFIG = t => {
  return [
    {
      placement: "center",
      target: "body",
      title: t("tours.welcome.title"),
      content: t("tours.welcome.content"),
    },
    {
      placement: "right",
      target: "a[href='#/sets']",
      title: t("tours.welcome.sets.title"),
      content: t("tours.welcome.sets.content"),
    },
    {
      placement: "right",
      target: "a[href='#/compounds']",
      title: t("tours.welcome.compounds.title"),
      content: t("tours.welcome.compounds.content"),
    },
    {
      placement: "right",
      target: "a[href='#/simulations']",
      title: t("tours.welcome.simulations.title"),
      content: t("tours.welcome.simulations.content"),
    },
  ];
};
