import React from "react";
import { Button } from "@material-ui/core";
import { withTranslation } from "react-i18next";

const SnackBarButton = props => {
  const { messageKey, onClick, t } = props;
  return (
    <Button size="small" onClick={onClick}>
      {t(messageKey)}
    </Button>
  );
};

export default withTranslation("translations")(SnackBarButton);
