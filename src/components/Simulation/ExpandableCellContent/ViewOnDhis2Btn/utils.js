import Api from "../../../../lib/Api";
import _ from "lodash";

export const dhis2UiUrl = (id, href, baseUrl) => {
  let dhis2UiUrl;

  if (href.includes("/dataElements/")) {
    dhis2UiUrl = `/dhis-web-maintenance/index.html#/edit/dataElementSection/dataElement/${id}`;
  }

  if (href.includes("/indicators/")) {
    dhis2UiUrl = `/dhis-web-maintenance/index.html#/edit/indicatorSection/indicator/${id}`;
  }

  if (dhis2UiUrl) {
    dhis2UiUrl = baseUrl + "/.." + dhis2UiUrl;
  }
  return dhis2UiUrl;
};

export const fetchIdentifiableObject = async (cell, isInput, isOutput) => {
  const api = await Api.instance();
  let dhis2Object = undefined;
  if (isInput && cell.state.ext_id) {
    // only look up indicators or data elements
    const ids = cell.state.ext_id.replace("inlined-", "").split(".");
    const dataElementId = ids[0]; // data element or indicator id
    const cocId = ids[1]; // optional combo
    dhis2Object = await api.get(`identifiableObjects/${dataElementId}`);
    if (cocId) {
      dhis2Object.categoryOptionCombo = await api.get(
        `categoryOptionCombos/${cocId}`,
        { fields: "id,name" },
      );
    }
  }

  if (isOutput && cell.dhis2_data_element) {
    dhis2Object = await api.get(
      `identifiableObjects/${cell.dhis2_data_element}`,
    );
  }

  if (_.isString(cell.is_output)) {
    dhis2Object = await api.get(`identifiableObjects/${cell.is_output}`);
  }

  if (dhis2Object) {
    dhis2Object.dhis2UiUrl = dhis2UiUrl(
      dhis2Object.id,
      dhis2Object.href,
      api.baseUrl,
    );
  }

  return dhis2Object;
};
