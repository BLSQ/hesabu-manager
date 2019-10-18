import React from "react";
import { Typography, withStyles } from "@material-ui/core";

import classNames from "classnames";

const styles = theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  first: {
    marginTop: 0,
  },
  headersActions: {
    marginLeft: "auto",
    marginRight: theme.spacing(1),
    display: "block",
  },
});

const FormSectionHeader = props => {
  const { classes } = props;
  return (
    <div
      className={classNames(classes.root, {
        [classes.first]: props.first,
      })}
    >
      <Typography variant="h6">{props.title}</Typography>

      {props.children && (
        <div className={classes.headersActions}>{props.children}</div>
      )}
    </div>
  );
};

export default withStyles(styles)(FormSectionHeader);
