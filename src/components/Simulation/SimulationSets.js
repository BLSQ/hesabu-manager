import React from "react";
import PropTypes from "prop-types";
import SimulationHeader from "./Header";
import SimulationPart from "./SimulationPart";

const SimulationSets = props => {
  const { setsByCode } = props;
  return Object.keys(setsByCode).map(key => {
    const simulations = setsByCode[key];
    return (
      <div key={key}>
        <SimulationHeader title={key} />
        {simulations.map(simulation => {
          return (
            <SimulationPart
              key={[
                simulation.orgunit_ext_id,
                simulation.period,
                simulation.code,
              ].join("-")}
              simulation={simulation}
            />
          );
        })}
      </div>
    );
  });
};

SimulationSets.propTypes = {
  simulations: PropTypes.array,
};

export default SimulationSets;
