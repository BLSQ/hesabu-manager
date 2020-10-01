import { DHIS2_REQUEST_DE, DHIS2_RECEIVE_DE } from "../constants/types";

function dhis2(
  state = {
    dataElements: null,
    indicators: null,
    categoryOptionCombos: null,
    status: null,
  },
  action,
) {
  switch (action.type) {
    case DHIS2_RECEIVE_DE:
      return {
        ...state,
        status: "LOADED",
        dataElements: action.dataElements,
        indicators: action.indicators,
        categoryOptionCombos: action.categoryOptionCombos,
      };
    case DHIS2_REQUEST_DE:
      return {
        ...state,
        status: "LOADING",
      };
    default:
      return state;
  }
}

export default dhis2;
