import store from "../store";

export const dhis2LookupCategoryOptionCombo = externalReference => {
  const cache = store.getState().dhis2;
  if (cache && cache.categoryOptionCombos) {
    return cache.categoryOptionCombos[externalReference];
  }
  return undefined;
};
export const dhis2LookupDataElement = externalReference => {
  const cache = store.getState().dhis2;
  if (cache && cache.dataElements) {
    return cache.dataElements[externalReference];
  }
  return undefined;
};

export const dhis2LookupIndicator = externalReference => {
  const cache = store.getState().dhis2;
  if (cache && cache.indicators) {
    return cache.indicators[externalReference];
  }
};

export const dhis2LookupElement = externalReference => {
  if (externalReference && externalReference.includes(".")) {
    const components = externalReference.split(".");
    const dataElement = dhis2LookupDataElement(components[0]);
    const categoryOptionCombo = dhis2LookupCategoryOptionCombo(components[1]);
    return {
      ...dataElement,
      categoryOptionCombo: categoryOptionCombo,
    };
  }
  return (
    dhis2LookupDataElement(externalReference) ||
    dhis2LookupIndicator(externalReference)
  );
};
