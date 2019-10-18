import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import React from "react";
import { withTranslation } from "react-i18next";

function ConfirmBox(props) {
  const { t } = props;
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.title || t("confirmBox.title")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.content || t("confirmBox.content")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          {t("buttons.cancel")}
        </Button>
        <Button onClick={props.onConfirm} color="primary" autoFocus>
          {t("buttons.agree")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withTranslation("translations")(ConfirmBox);
