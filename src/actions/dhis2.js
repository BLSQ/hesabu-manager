import { DHIS2_RECEIVE_DE } from "../constants/types";

export const dhis2ReceiveDe = ({ dataElements, indicators }) => ({
  type: DHIS2_RECEIVE_DE,
  dataElements,
  indicators,
});
