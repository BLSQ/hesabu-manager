import { combineReducers } from "redux";
import api from "./api";
import snackBar from "./snackBar";

const index = {
  api,
  snackBar,
};

export default combineReducers(index);
