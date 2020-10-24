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
      }, 2000);
    }

    if (
      !this.state.forcePolling &&
      this.state.polling &&
      !this.state.loading &&
      this.state.loading !== prevState.loading
    ) {
      setTimeout(() => {
        this.fetchSimulation();
      }, 2000);
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

    if (simulationResults) {
      debugger;
    }
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
