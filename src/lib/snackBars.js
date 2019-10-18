import React from "react";
import {
  formSuccessFullMessageKey,
  formErrorMessageKey,
  buttonReloadMessageKey,
  reloadPageMessageKey,
  fetchingInfosrMessageKey,
} from "../constants/ui";
import LoadingSnackBar from "../components/SnackBar/LoadingSnackBar";

export const succesfullSnackBar = (messageKey = formSuccessFullMessageKey) => ({
  messageKey,
  options: {
    persist: false,
  },
});

export const errorSnackBar = (messageKey = formErrorMessageKey) => ({
  messageKey,
  options: {
    variant: "error",
    persist: false,
  },
});

export const reloadPageSnackBar = (
  buttonMessageKey = buttonReloadMessageKey,
  messageKey = reloadPageMessageKey,
) => ({
  messageKey,
  type: "reload",
  options: {
    maxsnack: 0, // always display snackBar
    variant: "info",
    persist: true,
  },
  buttonMessageKey,
  buttonAction: () => window.location.reload(true),
});

export const cacheInfosSnackBar = (messageKey = fetchingInfosrMessageKey) => ({
  type: "cacheInfos",
  options: {
    maxsnack: 0, // always display snackBar
    persist: true,
    children: <LoadingSnackBar messageKey={messageKey} />,
  },
});
