import React from "react";
import { makeStyles } from "@material-ui/core";
import Check from "@material-ui/icons/Check";
import Cached from "@material-ui/icons/Cached";
import Warning from "@material-ui/icons/Warning";
import { green } from "@material-ui/core/colors";
import classNames from "classnames";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    color: "white",
    borderRadius: "50%",
    width: 18,
    height: 18,
    marginRight: theme.spacing(),
    position: "relative",
    float: "left",
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  errored: {
    background: theme.palette.primary.main,
  },
  processed: {
    background: green[500],
  },
  enqueued: {
    background: "#ccc",
  },
}));

const SimulationStateIcon = props => {
  const classes = useStyles(props);
  const { status } = props;

  if (status === "errored") {
    return (
      <div className={classNames(classes.root, classes.errored)}>
        <Warning fontSize="inherit" />
      </div>
    );
  }

  if (status === "enqueued") {
    return (
      <div className={classNames(classes.root, classes.enqueued)}>
        <Cached fontSize="inherit" />
      </div>
    );
  }

  return (
    <div className={classNames(classes.root, classes.processed)}>
      <Check fontSize="inherit" />
    </div>
  );
};

SimulationStateIcon.propTypes = {
  status: PropTypes.object,
};

export default SimulationStateIcon;
