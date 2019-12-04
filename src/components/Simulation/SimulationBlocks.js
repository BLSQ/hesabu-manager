import React from "react";
import PropTypes from "prop-types";
import SimulationBlock from "./SimulationBlock";

const SimulationBlocks = props => {
  const { setsByCode } = props;
  return Object.keys(setsByCode).map(key => {
    const periodViews = setsByCode[key];
    return <SimulationBlock key={key} title={key} periodViews={periodViews} />;
  });
};

SimulationBlocks.propTypes = {
  periodViews: PropTypes.array,
};

export default SimulationBlocks;
