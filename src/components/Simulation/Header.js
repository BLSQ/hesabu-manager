import React from "react";
import humanize from "string-humanize";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}));

const Header = function(props) {
  const classes = useStyles(props);
  return (
    <Typography variant="h5" className={classes.root}>
      {humanize(props.title)}
    </Typography>
  );
};

Header.propTypes = {
  invoice: PropTypes.shape({
    code: PropTypes.string,
    period: PropTypes.string,
  }),
};

export default Header;
