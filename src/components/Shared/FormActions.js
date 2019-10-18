import React from "react";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    justifyContent: "flex-end",
    marginTop: theme.spacing(3),
    display: "flex",
  },
});

function FormActions(props) {
  return <div className={props.classes.root}>{props.children}</div>;
}

export default withStyles(styles)(FormActions);
