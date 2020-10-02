import { DHIS2_RECEIVE_DE, DHIS2_REQUEST_DE } from "../constants/types";

export const dhis2RequestDe = () => ({
  type: DHIS2_REQUEST_DE,
});

export const dhis2ReceiveDe = ({
  dataElements,
  indicators,
  categoryOptionCombos,
}) => ({
  type: DHIS2_RECEIVE_DE,
  dataElements,
  indicators,
  categoryOptionCombos,
});
