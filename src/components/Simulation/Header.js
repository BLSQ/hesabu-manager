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
  const name = props.invoice.code;
  const classes = useStyles(props);
  return (
    <Typography
      variant="h6"
      data-period={props.invoice.period}
      data-orgunit={props.invoice.orgunit_ext_id}
      data-code={props.invoice.code}
      className={classes.root}
    >
      {humanize(name)}
    </Typography>
  );
};

Header.propTypes = {
  invoice: PropTypes.shape({
    code: PropTypes.string,
    period: PropTypes.string,
    orgunit_ext_id: PropTypes.string,
  }),
};

export default Header;
