import wretch from "wretch";
import { RECEIVE_TOKEN, RECEIVE_TOKEN_ERROR } from "../constants/types";

import i18n from "../lib/i18n";

export const receiveToken = token => ({
  type: RECEIVE_TOKEN,
  token,
});

export const receiveTokenError = error => ({
  type: RECEIVE_TOKEN_ERROR,
  error,
});

export const externalApi = () => {
  // TODO: Fetch token from Dhis instead of baking it in at compile time
  // const state = store.getState();
  // const { token } = state.api;
  const token = process.env.REACT_APP_API_TOKEN;
  const headers = {
    "Accept-Language": i18n.language,
    Accept: "application/vnd.api+json;version=2",
    "X-Token": token,
  };

  return wretch()
    .url(process.env.REACT_APP_API_URL)
    .headers(headers)
    .options({ encoding: "same-origin", headers });
};
