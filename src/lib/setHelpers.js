export const activeTab = (id, pathname) => {
  switch (pathname) {
    case `/sets/${id}/children`:
      return 1;
    case `/sets/${id}/set_formulas`:
      return 2;
    default:
      return 0;
  }
};
