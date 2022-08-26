import wretch from "wretch";
import { RECEIVE_TOKEN, RECEIVE_TOKEN_ERROR } from "../constants/types";
import store from "../store";
import i18n from "../lib/i18n";

export const receiveToken = ({
  token,
  url,
  invoiceAppPath,
  programId,
  user,
}) => ({
  type: RECEIVE_TOKEN,
  invoiceAppPath,
  programId,
  token,
  user,
  url,
});

export const receiveTokenError = error => ({
  type: RECEIVE_TOKEN_ERROR,
  error,
});

export const externalApi = () => {
  const state = store.getState();
  const { token, url, user } = state.api;

  const finalUrl = process.env.REACT_APP_API_URL || `${url}/api`;
  const finalToken = process.env.REACT_APP_API_TOKEN || token;

  const headers = {
    "Accept-Language": i18n.language,
    Accept: "application/vnd.api+json;version=2",
    "X-Token": finalToken,
    "X-Dhis2UserId": user.id,
  };

  return wretch()
    .url(finalUrl)
    .headers(headers)
    .options({ encoding: "same-origin", headers });
};

export const canEdit = () => {
  const state = store.getState();
  const { user } = state.api;
  return user.canEdit;
};
