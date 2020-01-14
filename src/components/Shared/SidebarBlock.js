import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: "bold",
  },
}));

const SidebarBlock = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" className={classes.title}>
        {props.title}
      </Typography>
      {props.children}
    </div>
  );
};

SidebarBlock.propTypes = {
  children: PropTypes.oneOfType(PropTypes.string, PropTypes.array),
  title: PropTypes.string.isRequired,
};

export default SidebarBlock;
