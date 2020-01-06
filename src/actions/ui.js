import { TOGGLE_DRAWER, SET_SELECTED_CELL } from "../constants/types";

export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER,
  };
}

export function setSelectedCell(cell) {
  return {
    type: SET_SELECTED_CELL,
    cell,
  };
}
