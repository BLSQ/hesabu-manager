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
import { dependencies } from "../../components/Formula/utils";
import wretch from "wretch";

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

// the result file of a simulation job: a pre-signed url valid 5 minutes, the
// content only changes with a new processing of the job
export const simulationResultKey = simulation => [
  "fetchSimulationDetails",
  simulation && simulation.id,
  simulation && simulation.processedAt,
];

// url params only used to filter what is displayed, not sent to the api
const DISPLAY_PARAMS = [
  "sets",
  "displayedOrgUnit",
  "displaySet",
  "displayPeriod",
];

// the query string of the simulation api: the url params minus the display ones
export const apiSearch = search => {
  const params = new URLSearchParams(search);
  DISPLAY_PARAMS.forEach(param => params.delete(param));
  const query = params.toString();
  return query ? `?${query}` : "";
};

const isRunning = simulation =>
  simulation && ["enqueued", "processing"].includes(simulation.status);

// a non json error (expired s3 link answering xml,...) as a readable message
const errorMessageOf = (what, error) => {
  if (error && error.json && error.json.errors) {
    return error.json.errors.map(e => e.detail || e.message).join(", ");
  }
  if (error && error.status) {
    const statusText = error.response && error.response.statusText;
    return `${what} failed (${[error.status, statusText]
      .filter(part => part)
      .join(" ")})`;
  }
  return error ? error.message : undefined;
};

const SimulationContainer = props => {
  const search = props.location.search;
  const simulationSearch = apiSearch(search);
  const { orgUnit, periods } = queryString.parse(search);
  const requested = !!(orgUnit && periods);

  // polls while the job is enqueued, restarts at each new request (url)
  const [polling, setPolling] = useState(requested);
  useEffect(() => {
    setPolling(requested);
  }, [simulationSearch, requested]);

  const simulationQuery = useQuery(
    ["simulationPolling", simulationSearch],
    async () =>
      deserialize(
        await externalApi()
          .errorType("json")
          .url(`/simulation${simulationSearch}`)
          .get()
          .json(),
      ),
    {
      enabled: requested,
      refetchInterval: polling ? 30000 : false,
      onSuccess: response => setPolling(isRunning(response)),
      onError: () => setPolling(false),
    },
  );
  const simulation = simulationQuery.data;

  // fetched once per processing of the job (id + processedAt) with the fresh
  // resultUrl of the job: no refetch with an expired link when coming back
  const resultQuery = useQuery(
    simulationResultKey(simulation),
    async () => {
      const response = await wretch()
        .url(simulation.resultUrl)
        .get()
        .json();
      response["lookups"] = toLookups(response);
      return response;
    },
    {
      enabled: !!(simulation && simulation.resultUrl),
      staleTime: Infinity,
      retry: false,
    },
  );

  const handlePollingChange = () => {
    setPolling(!polling);
  };

  const errorMessage =
    errorMessageOf("simulation", simulationQuery.error) ||
    errorMessageOf("simulation result", resultQuery.error);

  return (
    <Simulation
      errorMessage={errorMessage}
      loading={simulationQuery.isFetching || resultQuery.isFetching}
      simulation={simulation}
      simulationResults={resultQuery.data}
      valuesFromParams={queryString.parse(search)}
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
