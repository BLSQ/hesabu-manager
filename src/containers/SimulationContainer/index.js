import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import Simulation from "../../components/Simulation";

const SimulationContainer = props => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [simulation, setSimulation] = useState();
  const timer = useRef(null);
  const { simulationId } = props;

  useEffect(() => {
    const url = `http://localhost:4567/api/simulations/${props.simulationId}`;
    if (!timer.current) {
      timer.current = setInterval(() => apiFetch(url), 1000);
    }

    return function cleanup() {
      clearInterval(timer.current);
    };
  }, [simulationId]);

  const fetchJSON = async url => {
    try {
      const response = await fetch(url, {});
      const json = await response.json();
      return { success: true, payload: json };
    } catch (error) {
      return { success: false, payload: error };
    }
  };

  const apiFetch = async url => {
    const response = await fetchJSON(url);
    if (response.success) {
      const {
        isAlive,
        status,
        lastError,
        resultUrl,
      } = response.payload.data.attributes;
      if (isAlive) {
        // I'm still alive, keep polling.
      } else {
        // I finished processing
        clearInterval(timer.current);
        if (status === "processed") {
          fetchSimulationResult(resultUrl);
        } else {
          showError({ message: lastError });
        }
      }
    } else {
      clearInterval(timer.current);
      showError(response.payload);
    }
  };

  const fetchSimulationResult = async url => {
    const response = await fetchJSON(url);
    if (response.success) {
      setLoading(false);
      setSimulation(response.payload);
    } else {
      showError(response.payload);
    }
  };

  const showError = error => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  return (
    <Simulation
      errorMessage={errorMessage}
      loading={loading}
      {...simulation}
      open={props.open}
    />
  );
};

export default withStyles(styles)(withRouter(SimulationContainer));
