import React from "react";
import { withTranslation } from "react-i18next";
import Paper from "@material-ui/core/Paper";
import { CircularProgress, withStyles, Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    height: "45px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  content: {
    padding: theme.spacing(1),
    color: "white",
    display: "inline-block",
    marginRight: theme.spacing(3),
    minWidth: "250px",
    boxSizing: "border-box",
  },
  spinner: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
    position: "relative",
    top: "5px",
  },
});

const LoadingSnackBar = props => {
  const { classes, messageKey, t } = props;
  return (
    <Paper className={classes.root}>
      <CircularProgress className={classes.spinner} color="inherit" size={20} />
      <Typography className={classes.content}>{t(messageKey)}</Typography>
    </Paper>
  );
};

export default withTranslation("translations")(
  withStyles(styles)(LoadingSnackBar),
);
