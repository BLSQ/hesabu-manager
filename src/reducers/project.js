import { RECEIVE_PROJECT } from "../constants/types";

function project(state = {}, action) {
  switch (action.type) {
    case RECEIVE_PROJECT:
      return action.project;
    default:
      return state;
  }
}

export default project;
