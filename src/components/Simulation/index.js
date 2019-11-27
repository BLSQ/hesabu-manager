import { Grid, withStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Table from "./Table/table";
import SimulationHeader from "./SimulationHeader";
import { KeyNumberBlock } from "@blsq/manager-ui";
import humanize from "string-humanize";

const styles = theme => ({
  header: {
    padding: "5px",
  },
});

export const Simulation = props => {
  const { simulation } = props;
  console.log(props);
  return (
    <Fragment>
      <SimulationHeader key="header" invoice={simulation} />
      <Grid container item xs={12} spacing={3}>
        {simulation.total_items.map(item => (
          <Grid item xs={3}>
            <KeyNumberBlock
              text={humanize(item.formula)}
              value={item.solution}
            />
          </Grid>
        ))}
      </Grid>
      <Table key="invoice" invoice={simulation} />
    </Fragment>
  );
};

const mapStateToProps = state => ({});

export default withTranslation("translations")(
  withStyles(styles)(connect(mapStateToProps)(Simulation)),
);
