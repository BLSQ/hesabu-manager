import React, { Component } from "react";
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

class SimulationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulationResults: undefined,
      loading: false,
      forcePolling: false,
      errorMessage: undefined,
      simulation: undefined,
      polling: false,
    };
  }

  componentDidMount() {
    this.fetchSimulation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.forcePolling && !this.state.loading) {
      setTimeout(() => {
        this.fetchSimulation();
      }, 30000);
    }

    if (
      !this.state.forcePolling &&
      this.state.polling &&
      !this.state.loading &&
      this.state.loading !== prevState.loading
    ) {
      setTimeout(() => {
        this.fetchSimulation();
      }, 30000);
    }

    const search = queryString.parse(this.props.location.search);
    const previousSearch = queryString.parse(prevProps.location.search);

    if (
      previousSearch.periods !== search.periods ||
      previousSearch.orgUnit !== search.orgUnit
    ) {
      this.fetchSimulation();
    }
  }

  fetchSimulation() {
    this.setState({ loading: true });
    externalApi()
      .errorType("json")
      .url(`/simulation${this.props.location.search}`)
      .get()
      .json(response => {
        const newstatus = response.data.attributes.status;
        let newState = {
          loading: false,
          polling: newstatus === "enqueued",
          errorMessage: undefined,
          status: newstatus,
        };
        deserialize(response).then(data => {
          if (newstatus !== this.state.status) {
            newState["simulation"] = data;
          }
          this.setState(newState);
          if (newState.simulation && newState.simulation.resultUrl) {
            let loadingState = {
              ...this.state,
              loading: true,
            };
            this.setState(loadingState);
            wretch()
              .errorType("json")
              .options({ encoding: "same-origin" }, false)
              .url(newState.simulation.resultUrl)
              .get()
              .json(response => {
                response["lookups"] = toLookups(response);

                let newState = {
                  ...this.state,
                  loading: false,

                  simulationResults: response,
                };
                this.setState(newState);
              })
              .catch(e => {
                let newState = {
                  loading: false,
                  polling: false,
                  errorMessage: e.message,
                  status: undefined,
                };
                this.setState(newState);
              });
          }
        });
      })
      .catch(e => {
        this.setState({
          loading: false,
          simulation: undefined,
          polling: false,
          errorMessage: e.message,
        });
      });
  }

  handlePollingChange = () => {
    this.setState({ forcePolling: !this.state.forcePolling });
  };

  render() {
    const {
      loading,
      simulation,
      errorMessage,
      forcePolling,
      simulationResults,
    } = this.state;
    const valuesFromParams = queryString.parse(this.props.location.search);

    return (
      <Simulation
        errorMessage={errorMessage}
        loading={loading}
        simulation={simulation}
        simulationResults={simulationResults}
        valuesFromParams={valuesFromParams}
        polling={this.state.polling || forcePolling}
        onPollingChange={this.handlePollingChange}
        open={true}
      />
    );
  }
}

SimulationContainer.propTypes = {
  location: PropTypes.object,
};

export default withRouter(withStyles(styles)(SimulationContainer));
