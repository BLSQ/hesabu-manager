import { combineReducers } from "redux";
import api from "./api";
import ui from "./ui";
import snackBar from "./snackBar";
import project from "./project";

const index = {
  api,
  ui,
  snackBar,
  project,
};

export default combineReducers(index);
