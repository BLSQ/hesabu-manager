import React from "react";
import PropTypes from "prop-types";
import SimulationSet from "./SimulationSet";

const SimulationSets = props => {
  const { setsByCode } = props;
  return Object.keys(setsByCode).map(key => {
    const simulations = setsByCode[key];
    return <SimulationSet key={key} title={key} simulations={simulations} />;
  });
};

SimulationSets.propTypes = {
  simulations: PropTypes.array,
};

export default SimulationSets;
