import truncate from "lodash/truncate";

export const getExcerpt = (stringItem, length = 200) =>
  truncate(stringItem.replace(/<\/?[^>]+(>|$)/g, ""), { length });
