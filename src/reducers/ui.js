import { SET_SELECTED_CELL } from "../constants/types";

function ui(
  state = {
    selectedCell: undefined,
  },
  action,
) {
  switch (action.type) {
    case SET_SELECTED_CELL:
      return { ...state, selectedCell: action.cell };
    default:
      return state;
  }
}

export default ui;
