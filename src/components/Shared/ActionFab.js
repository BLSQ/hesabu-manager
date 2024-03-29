import { Fab, withStyles } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import React from "react";

import Add from "@material-ui/icons/Add";
import classNames from "classnames";

const styles = theme => ({
  button: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
});

const ActionFab = props => {
  const { classes, match, extended, disabled } = props;

  return (
    <Fab
      disabled={disabled}
      variant={extended ? "extended" : "round"}
      aria-label="Delete"
      color="secondary"
      className={classNames(classes.button, props.className)}
      component={Link}
      to={props.to || `${match.url}/new`}
    >
      <Add className={props.text && classes.extendedIcon} />
      {props.text}
    </Fab>
  );
};

export default withRouter(withStyles(styles)(ActionFab));
