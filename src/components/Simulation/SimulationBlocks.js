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

  // Placeholder before future split async fetch of Periodviews
  // At least now the list can be filtered by code from url params
  // Which mean we can link to that url from the set edit page
  // Ex:
  // ?sets=cospro__b_1__gestion_manuel,cospro__a_4__reduction_des_frais

  const displayedSetCodes = (props.searchQuery.sets || "")
    .split(",")
    .filter(i => i);

  const sets = Object.keys(setsByCode);
  const filteredSets = displayedSetCodes.length
    ? sets.filter(setKey => displayedSetCodes.includes(setKey))
    : sets;
  return filteredSets.map(key => (
    <SimulationBlock key={key} title={key} periodViews={setsByCode[key]} />
  ));
};

SimulationBlocks.propTypes = {
  periodViews: PropTypes.array,
};

export default SimulationBlocks;
