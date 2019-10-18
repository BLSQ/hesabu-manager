import { RECEIVE_TOKEN, RECEIVE_TOKEN_ERROR } from "../constants/types";

function api(
  state = {
    token: null,
    error: null,
  },
  action,
) {
  console.log("API", { state });

  switch (action.type) {
    case RECEIVE_TOKEN:
      return { ...state, token: action.token };
    case RECEIVE_TOKEN_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}

export default api;
