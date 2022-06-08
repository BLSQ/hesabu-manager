import { RECEIVE_TOKEN, RECEIVE_TOKEN_ERROR } from "../constants/types";

function api(
  state = {
    token: null,
    error: null,
    user: null,
  },
  action,
) {
  switch (action.type) {
    case RECEIVE_TOKEN:
      return {
        ...state,
        token: action.token,
        url: action.url,
        user: action.user,
        invoiceAppPath: action.invoiceAppPath,
        programId: action.programId,
      };
    case RECEIVE_TOKEN_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}

export default api;
