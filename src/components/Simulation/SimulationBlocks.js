import React, { useEffect, useState } from "react";
import groupBy from "lodash/groupBy";
import PropTypes from "prop-types";
import wretch from "wretch";
import SimulationBlock from "./SimulationBlock";

const SimulationBlocks = props => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const setsByCode = groupBy((data || {}).invoices, "code");

  useEffect(() => {
    setLoading(true);
    wretch()
      .errorType("json")
      .options({ encoding: "same-origin" }, false)
      .url(props.resultUrl)
      .get()
      .json(response => {
        setLoading(false);
        setData(response);
        setError(null);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
        setData(null);
      });
  }, [props.resultUrl]);

  const { setSelectedCell } = props;

  return Object.keys(setsByCode).map(key => {
    const periodViews = setsByCode[key];
    return (
      <SimulationBlock
        key={key}
        title={key}
        periodViews={periodViews}
        setSelectedCell={setSelectedCell}
      />
    );
  });
};

SimulationBlocks.propTypes = {
  periodViews: PropTypes.array,
  setSelectedCell: PropTypes.func,
};

export default SimulationBlocks;
