import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

// "filter" keeps its original key, other params get their own
const storageKey = (pathname, param) =>
  param === "filter"
    ? `hesabu-filter:${pathname}`
    : `hesabu-filter:${pathname}:${param}`;

const readStored = (pathname, param) => {
  try {
    return window.sessionStorage.getItem(storageKey(pathname, param)) || "";
  } catch (e) {
    return "";
  }
};

const writeStored = (pathname, param, value) => {
  try {
    if (value) {
      window.sessionStorage.setItem(storageKey(pathname, param), value);
    } else {
      window.sessionStorage.removeItem(storageKey(pathname, param));
    }
  } catch (e) {
    // storage unavailable (private mode,...), the url still keeps the filter
  }
};

export const searchWithParam = (search, param, value) => {
  const params = new URLSearchParams(search);
  if (value) {
    params.set(param, value);
  } else {
    params.delete(param);
  }
  const newSearch = params.toString();
  return newSearch ? `?${newSearch}` : "";
};

// a text filter kept in the url query (survives refresh, shareable) and
// remembered per screen in the session (survives switching tabs, whose links
// don't carry the query)
const useUrlFilter = (param = "filter") => {
  const history = useHistory();
  const location = useLocation();
  const value = new URLSearchParams(location.search).get(param) || "";

  // history.location rather than location: several params of the same screen
  // can be written in the same render, each must keep the others
  const setValue = newValue => {
    writeStored(location.pathname, param, newValue);
    history.replace({
      ...history.location,
      search: searchWithParam(history.location.search, param, newValue),
    });
  };

  useEffect(() => {
    if (!value) {
      const stored = readStored(location.pathname, param);
      if (stored) {
        history.replace({
          ...history.location,
          search: searchWithParam(history.location.search, param, stored),
        });
      }
    }
    // only when arriving on a screen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return [value, setValue];
};

export default useUrlFilter;
