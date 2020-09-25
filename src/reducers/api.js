import { RECEIVE_TOKEN, RECEIVE_TOKEN_ERROR } from "../constants/types";

function api(
  state = {
    token: null,
    error: null,
  },
  action,
) {
  switch (action.type) {
    case RECEIVE_TOKEN:
      return { ...state, token: action.token, url: action.url };
    case RECEIVE_TOKEN_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}

export default api;
