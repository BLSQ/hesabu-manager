import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

const storageKey = pathname => `hesabu-filter:${pathname}`;

const readStored = pathname => {
  try {
    return window.sessionStorage.getItem(storageKey(pathname)) || "";
  } catch (e) {
    return "";
  }
};

const writeStored = (pathname, value) => {
  try {
    if (value) {
      window.sessionStorage.setItem(storageKey(pathname), value);
    } else {
      window.sessionStorage.removeItem(storageKey(pathname));
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

  const setValue = newValue => {
    writeStored(location.pathname, newValue);
    history.replace({
      ...location,
      search: searchWithParam(location.search, param, newValue),
    });
  };

  useEffect(() => {
    if (!value) {
      const stored = readStored(location.pathname);
      if (stored) {
        history.replace({
          ...location,
          search: searchWithParam(location.search, param, stored),
        });
      }
    }
    // only when arriving on a screen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return [value, setValue];
};

export default useUrlFilter;
