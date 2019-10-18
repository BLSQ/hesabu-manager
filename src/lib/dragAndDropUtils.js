export const reorderItems = (menuItems, dropResults) => {
  let oldMenuItems = [...menuItems];

  const [removed] = oldMenuItems.splice(dropResults.source.index, 1);
  oldMenuItems.splice(dropResults.destination.index, 0, removed);

  return oldMenuItems.map((section, index) => ({
    ...section,
    position: index,
  }));
};
