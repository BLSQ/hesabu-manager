// dhis2 maintenance app (dhis-web-maintenance, dhis2 <= 2.40) edit pages
const MAINTENANCE_SECTIONS = {
  DATA_ELEMENT: "dataElementSection/dataElement",
  INDICATOR: "indicatorSection/indicator",
};

// url of the maintenance page of a data element or indicator (as cached by
// dhis2Lookups, with its dimensionItemType), undefined for anything else
export const dhis2MaintenanceUrl = (dhis2Object, dhis2Url) => {
  const section =
    dhis2Object && MAINTENANCE_SECTIONS[dhis2Object.dimensionItemType];
  if (!section || !dhis2Object.id || !dhis2Url) {
    return undefined;
  }
  // a data element mapped with its category option combo: "de.coc"
  const id = dhis2Object.id.split(".")[0];
  return `${dhis2Url.replace(
    /\/+$/,
    "",
  )}/dhis-web-maintenance/index.html#/edit/${section}/${id}`;
};
