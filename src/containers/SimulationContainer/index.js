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
  const timer = useRef(null);

  const valuesFromParams = queryString.parse(props.location.search);
  // const url = `http://localhost:4567/api/simulations/1`;

  useEffect(() => {
    externalApi()
      .errorType("json")
      .url(`/simulation?${queryString.stringify(valuesFromParams)}`)
      .get()
      .then(data => {
        console.log(data);

        // setSimulation(data.data)
      });
  }, [valuesFromParams]);
  // useEffect(() => {
  // const fetchSimulationResult = async simUrl => {
  //   const response = await fetchJSON(simUrl);
  //   if (response.success) {
  //     setLoading(false);
  //     setSimulation(response.payload);
  //   } else {
  //     showError(response.payload);
  //   }
  // };
  // const apiFetch = async simUrl => {
  //   const response = await fetchJSON(simUrl);
  //   if (response.success) {
  //     const {
  //       isAlive,
  //       status,
  //       lastError,
  //       resultUrl,
  //     } = response.payload.data.attributes;
  //     if (isAlive) {
  //       // I'm still alive, keep polling.
  //     } else {
  //       // I finished processing
  //       clearInterval(timer.current);
  //       if (status === "processed") {
  //         fetchSimulationResult(resultUrl);
  //       } else {
  //         showError({ message: lastError });
  //       }
  //     }
  //   } else {
  //     clearInterval(timer.current);
  //     showError(response.payload);
  //   }
  // };
  // if (!timer.current) {
  //   timer.current = setInterval(() => apiFetch(url), 1000);
  // }
  // return function cleanup() {
  //   clearInterval(timer.current);
  // };
  // }, [simulationId, url]);

  // const fetchJSON = async url => {
  //   try {
  //     const response = await fetch(url, {});
  //     const json = await response.json();
  //     return { success: true, payload: json };
  //   } catch (error) {
  //     return { success: false, payload: error };
  //   }
  // };

  // const showError = error => {
  //   setLoading(false);
  //   setErrorMessage(error.message);
  // };

  return (
    <Simulation
      errorMessage={errorMessage}
      loading={loading}
      {...simulation}
      valuesFromParams={valuesFromParams}
      open={true}
    />
  );
};

export default withStyles(styles)(withRouter(SimulationContainer));
