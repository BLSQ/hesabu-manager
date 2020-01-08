import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import queryString from "query-string";
import PropTypes from "prop-types";
import styles from "./styles";
import Simulation from "../../components/Simulation";
import { externalApi } from "../../actions/api";

class SimulationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      errorMessage: undefined,
      simulation: undefined,
      polling: false,
    };
  }

  componentDidMount() {
    this.fetchSimulation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.polling &&
      !this.state.loading &&
      this.state.loading !== prevState.loading
    ) {
      setTimeout(() => {
        this.fetchSimulation();
      }, 2000);
    }

    if (this.props.location.search !== prevProps.location.search) {
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
        this.setState({
          loading: false,
          simulation: response.data,
          polling: response.data.attributes.status === "enqueued",
          errorMessage: undefined,
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

  render() {
    const { loading, simulation, errorMessage } = this.state;
    const valuesFromParams = queryString.parse(this.props.location.search);

    return (
      <Simulation
        errorMessage={errorMessage}
        loading={loading}
        simulation={simulation}
        valuesFromParams={valuesFromParams}
        open={true}
      />
    );
  }
}

SimulationContainer.propTypes = {
  location: PropTypes.object,
};

export default withRouter(withStyles(styles)(SimulationContainer));
