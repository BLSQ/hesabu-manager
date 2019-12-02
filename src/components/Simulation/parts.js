import React from "react";
import PropTypes from "prop-types";
import { SimulationPart } from "./SimulationPart";

const SimulationParts = props => {
  const { simulations } = props;

  return (
    <div>
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

SimulationParts.propTypes = {
  simulations: PropTypes.array,
};

export default SimulationParts;
