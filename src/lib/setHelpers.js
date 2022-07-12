export const activeTab = (id, pathname) => {
  switch (pathname) {
    case `/sets/${id}/topic_formulas`:
      return 0;
    case `/sets/${id}/set_formulas`:
      return 1;
    case `/sets/${id}/children_formulas`:
      return 2;
    case `/sets/${id}/zone_topic_formulas`:
      return 3;
    case `/sets/${id}/zone_formulas`:
      return 4;
    default:
      return 0;
  }
};
