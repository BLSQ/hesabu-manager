import { combineReducers } from "redux";
import api from "./api";
import ui from "./ui";
import snackBar from "./snackBar";
import project from "./project";
import dhis2 from "./dhis2";

const index = {
  api,
  ui,
  snackBar,
  project,
  dhis2,
};

export default combineReducers(index);
