import { combineReducers } from "redux";
import api from "./api";
import snackBar from "./snackBar";
import project from "./project";

const index = {
  api,
  snackBar,
  project,
};

export default combineReducers(index);
