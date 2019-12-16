import React, { useState, useEffect, useRef } from "react";
import { withRouter, useQuery } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import queryString from "query-string";
import styles from "./styles";
import Simulation from "../../components/Simulation";
import { externalApi } from "../../actions/api";

const SimulationContainer = props => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [simulation, setSimulation] = useState();
  const valuesFromParams = queryString.parse(props.location.search);

  useEffect(() => {
    setLoading(true);
    externalApi()
      .errorType("json")
      .options({ encoding: "same-origin" }, false)
      .url(`/simulation${props.location.search}`)
      .get()
      .json(response => {
        setLoading(false);
        setSimulation(response.data);
        setErrorMessage(null);
      })
      .catch(e => {
        setErrorMessage(e.message);
        setLoading(false);
        setSimulation(null);
      });
  }, [props.location]);

  return (
    <Simulation
      errorMessage={errorMessage}
      loading={loading}
      simulation={simulation}
      valuesFromParams={valuesFromParams}
      open={true}
    />
  );
};

export default withStyles(styles)(withRouter(SimulationContainer));
