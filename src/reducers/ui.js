import { SET_SELECTED_CELL, TOGGLE_DRAWER } from "../constants/types";

function ui(
  state = {
    drawerOpen: false,
    selectedCell: undefined,
  },
  action,
) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return { ...state, drawerOpen: !state.drawerOpen };
    case SET_SELECTED_CELL:
      return { ...state, selectedCell: action.cell };
    default:
      return state;
  }
}

export default ui;
