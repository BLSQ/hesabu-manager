import { REQUEST_PROJECT, RECEIVE_PROJECT } from "../constants/types";

export function requestProject() {
  return {
    type: REQUEST_PROJECT,
  };
}

export function receiveProject(project) {
  return {
    type: RECEIVE_PROJECT,
    project,
  };
}
