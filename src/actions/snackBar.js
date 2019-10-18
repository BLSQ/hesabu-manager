import {
  ENQUEUE_SNACKBAR,
  REMOVE_SNACKBAR,
  CLOSE_FIXED_SNACKBAR,
} from "../constants/types";

export const enqueueSnackbar = notification => ({
  type: ENQUEUE_SNACKBAR,
  notification: {
    key: new Date().getTime() + Math.random(),
    ...notification,
  },
});

export const removeSnackbar = key => ({
  type: REMOVE_SNACKBAR,
  key,
});

export const closeFixedSnackbar = key => ({
  type: CLOSE_FIXED_SNACKBAR,
  key,
});
