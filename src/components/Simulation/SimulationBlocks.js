import React from "react";
import PropTypes from "prop-types";
import SimulationBlock from "./SimulationBlock";

const SimulationBlocks = props => {
  const { setsByCode } = props;
  return Object.keys(setsByCode).map(key => {
    const simulations = setsByCode[key];
    return <SimulationBlock key={key} title={key} simulations={simulations} />;
  });
};

SimulationBlocks.propTypes = {
  simulations: PropTypes.array,
};

export default SimulationBlocks;
