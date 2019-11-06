import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import {
  Divider,
  withStyles
} from "@material-ui/core";
import SimulationListItem from "./SimulationListItem";

const styles = theme => ({
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  }
});

class SimulationList extends Component {
  render() {
    const { classes, simulations, t } = this.props;
    return (
      <Fragment>
        {simulations.map((simulation, index) => (
          [
            <SimulationListItem title={simulation.name}
                                key={index}
                                groups={simulation.groupNames}
                                createdAt={simulation.createdAt}
                                buildDuration={simulation.buildDuration}
                                period={simulation.period}
            />,
            <Divider className={classNames(classes.divider)}/>
            ]
        ))}
      </Fragment>
    );
  }
}

export default withTranslation("translations")(
  withStyles(styles)(SimulationList),
);
