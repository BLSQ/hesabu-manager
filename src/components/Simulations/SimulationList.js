import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core";
import SimulationListItem from "./SimulationListItem";

const styles = theme => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
});

class SimulationList extends Component {
  render() {
    const { simulations } = this.props;
    return (
      <Fragment>
        {simulations.map((simulation, index) => <SimulationListItem key={index} {...simulation} />)}
      </Fragment>
    );
  }
}

export default withTranslation("translations")(
  withStyles(styles)(SimulationList),
);
