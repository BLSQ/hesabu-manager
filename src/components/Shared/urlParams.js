export const anchorQueryParams = () =>
  new URLSearchParams(window.location.hash.split("?")[1]);

export const urlWith = queryParams => {
  const hash = window.location.hash.split("?")[0];
  const newUrl = `${window.location.protocol}//${window.location.host}${
    window.location.pathname
  }${hash}?${queryParams.toString()}`;
  return newUrl;
};
