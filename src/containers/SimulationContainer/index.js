import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import queryString from "query-string";
import PropTypes from "prop-types";
import styles from "./styles";
import Simulation from "../../components/Simulation";
import { externalApi } from "../../actions/api";
import { deserialize } from "../../utils/jsonApiUtils";
import wretch from "wretch";
import { dependencies } from "../../components/Formula/utils";

const toLookups = simulationResults => {
  const indexedItems = {};
  const reverseDependencies = {};

  const enabled = false;
  if (enabled) {
    simulationResults.invoices.forEach(invoice => {
      invoice.total_items.forEach(item => (indexedItems[item.key] = item));
      invoice.activity_items.forEach(item => {
        Object.values(item).forEach(v => {
          indexedItems[v.key] = v;

          if (v.instantiated_expression) {
            const deps = dependencies(v.instantiated_expression);

            deps.forEach(dep => {
              if (reverseDependencies[dep] == undefined) {
                reverseDependencies[dep] = [];
              }
              reverseDependencies[dep].push(v.key);
            });
          }
        });
      });
    });
  }
  return { reverseDependencies, indexedItems };
};

const SimulationContainer = props => {
  const [simulationResults, setSimulationResults] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [simulation, setSimulation] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [loading, setLoading] = useState(false);
  let params = new URLSearchParams(window.location.href.split("?")[1]);

  const result = {};
  for (var key of params.keys()) {
    result[key] = params.get(key);
  }

  const periods = result.periods;
  const orgUnit = result.orgUnit;

  const [polling, setPolling] = useState(!!(orgUnit && periods));

  useEffect(() => {
    setPolling(!!(orgUnit && periods));
  }, [orgUnit, periods]);

  useEffect(() => {
    if (simulation && simulation.resultUrl) {
      setLoading(true);
      wretch()
        .errorType("json")
        .options({ encoding: "same-origin" }, false)
        .url(simulation.resultUrl)
        .get()
        .json(response => {
          response["lookups"] = toLookups(response);
          setLoading(false);
          setSimulationResults(response);
        })
        .catch(e => {
          setLoading(false);
          setPolling(false);
          setErrorMessage(e.message);
          setStatus(undefined);
        });
    }
  }, [simulation]);

  const fetchSimulation = async () => {
    setLoading(true);
    let result = await externalApi()
      .errorType("json")
      .url(`/simulation${props.location.search}`)
      .get()
      .json();
    result = await deserialize(result);
    return result;
  };

  const simulationPollingQuery = useQuery(
    ["simulationPolling", periods, orgUnit],
    fetchSimulation,
    {
      enabled: polling,
      refetchInterval: 30000,
      onSuccess: response => {
        const newStatus = response.status;
        setLoading(false);
        setPolling(newStatus === "enqueued");
        setErrorMessage(undefined);

        if (newStatus !== status) {
          setSimulation(response);
        }
      },
      onError: error => {
        console.log("error", orgUnit, periods, error);
        setErrorMessage(error.message);
        setPolling(false);
        setLoading(false);
      },
    },
  );

  const handlePollingChange = () => {
    setPolling(!polling);
  };

  const valuesFromParams = queryString.parse(props.location.search);

  return (
    <Simulation
      errorMessage={errorMessage}
      loading={loading}
      simulation={simulation}
      simulationResults={simulationResults}
      valuesFromParams={valuesFromParams}
      polling={polling}
      onPollingChange={handlePollingChange}
      open={true}
    />
  );
};

SimulationContainer.propTypes = {
  location: PropTypes.object,
};

export default withRouter(withStyles(styles)(SimulationContainer));
