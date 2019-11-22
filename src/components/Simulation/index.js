import {
  Grid,
  withStyles,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Table from "../Table/table";
import SimulationHeader from "./SimulationHeader";
import { KeyNumberBlock } from "@blsq/manager-ui";
import humanize from "string-humanize";

const styles = theme => ({
  header: {},
});

export const Simulation = props => {
  const { classes } = props;

  return (
    <Fragment>
      <SimulationHeader key="header" invoice={props.simulation} className={classes.header} />
      <Grid container item xs={12} spacing={3}>
        {props.simulation.total_items.map(item => (
          <Grid item xs={3}>
          <KeyNumberBlock
            text={humanize(item.formula)}
            value={item.solution}
            />
          </Grid>
        ))}
      </Grid>
      <Table key="invoice" invoice={props.simulation} />
    </Fragment>
  );
};

const mapStateToProps = state => ({});

export default withTranslation("translations")(
  withStyles(styles)(
    connect(mapStateToProps)(Simulation)
  )
);
