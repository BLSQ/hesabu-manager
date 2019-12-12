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
  // const state = store.getState();
  // const { token } = state.api;
  return wretch()
    .url(process.env.REACT_APP_API_URL)
    .headers({ "Accept-Language": i18n.language })
    .options({ credentials: "include", mode: "cors" });
  // .auth(token)
};
