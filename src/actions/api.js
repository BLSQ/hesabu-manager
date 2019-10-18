import wretch from "wretch";
import { RECEIVE_TOKEN, RECEIVE_TOKEN_ERROR } from "../constants/types";

import i18n from "../lib/i18n";
import store from "../store";

export const receiveToken = token => ({
  type: RECEIVE_TOKEN,
  token,
});

export const receiveTokenError = error => ({
  type: RECEIVE_TOKEN_ERROR,
  error,
});

export const externalApi = () => {
  const state = store.getState();
  const { token } = state.api;
  const url = `${process.env.REACT_APP_MANAGER_URL}/api`;
  return wretch()
    .url(url)
    .headers({ "Accept-Language": i18n.language })
    .auth(token)
    .options({ credentials: "include", mode: "cors" });
};
