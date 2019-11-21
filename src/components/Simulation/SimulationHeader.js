import React, {Fragment} from "react";
import humanize from "string-humanize";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
}));

const SimulationHeader = function(props) {
  const name = props.invoice.code;
  const formatted_date = props.invoice.period;
  const nameWithDate = `${name}-${formatted_date}`;
  const { code } = props.invoice;
  const classes = useStyles(props);
  return (
    <Fragment data-period={props.invoice.period}
              data-orgunit={props.invoice.orgunit_ext_id}
              data-code={props.invoice.code}>
      <Typography
        variant="body2"
        component="div"
        color="primary"
        className={classes.content}>
        {humanize(name)}
      </Typography>
    </Fragment>
  );
};

export default SimulationHeader;
