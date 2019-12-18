import React from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { HelpAvatar } from "@blsq/manager-ui";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    textAlign: "center",
  },
  avatar: {
    marginBottom: theme.spacing(2),
  },
}));

const EmptySection = props => {
  const { t } = useTranslation();
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.avatar}>
          <HelpAvatar variant="sad" />
        </div>
        {props.children || (
          <>
            <Typography variant="h6">
              {t("emptySection.title", { resourceName: props.resourceName })}
            </Typography>
            <Typography variant="body2">{t("emptySection.body")}</Typography>
          </>
        )}
      </div>
    </div>
  );
};

EmptySection.propTypes = {
  onClick: PropTypes.func,
  variant: PropTypes.string,
  resourceName: PropTypes.string,
};

export default EmptySection;
