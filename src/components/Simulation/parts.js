import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { SimulationPart } from "./SimulationPart";
import { APPBAR_WITH_TABS_HEIGHT } from "../../constants/ui";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: APPBAR_WITH_TABS_HEIGHT,
    padding: theme.spacing(2),
  },
}));

const SimulationParts = props => {
  const classes = useStyles(props);
  const { simulations } = props;

  return (
    <div className={classes.root}>
      {simulations.map((simulation, i) => {
        const key = [
          simulation.orgunit_ext_id,
          simulation.period,
          simulation.code,
        ].join("-");
        return <SimulationPart key={key} simulation={simulation} />;
      })}
    </div>
  );
};

const mapStateToProps = state => ({});

SimulationParts.propTypes = {
  simulations: PropTypes.array,
};

export default SimulationParts;
