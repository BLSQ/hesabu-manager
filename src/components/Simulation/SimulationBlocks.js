import React, { useEffect, useState } from "react";
import groupBy from "lodash/groupBy";
import PropTypes from "prop-types";
import wretch from "wretch";
import { CircularProgress } from "@material-ui/core";
import SimulationBlock from "./SimulationBlock";

const SimulationBlocks = props => {
  const [data, setData] = useState(undefined);
  // #TODO add some loading states
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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return Object.keys(setsByCode).map(key => {
    const periodViews = setsByCode[key];
    return <SimulationBlock key={key} title={key} periodViews={periodViews} />;
  });
};

SimulationBlocks.propTypes = {
  periodViews: PropTypes.array,
};

export default SimulationBlocks;
