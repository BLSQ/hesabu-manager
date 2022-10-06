import React, { Fragment } from "react";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core";
import SimulationListItem from "./SimulationListItem";

const styles = theme => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
});

const SimulationList = props => {
  const { simulations } = props;

  return (
    <Fragment>
      {simulations.map((simulation, index) => (
        <SimulationListItem key={index} {...simulation} />
      ))}
    </Fragment>
  );
};

export default withTranslation("translations")(
  withStyles(styles)(SimulationList),
);
