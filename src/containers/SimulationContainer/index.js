import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";
import React, { Fragment } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SimulationList from "../../components/Simulation/list";

class Loader extends React.Component {

  state = {
    loading: true,
    error: null,
    jsonPayload: { invoices: [] },
  };

  async componentDidMount() {
    const url = "http://localhost:4567/api/simulations/1234";
    this.timer = setInterval(() => this.apiFetch(url), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  async fetchJSON(url) {
    try {
      const response = await fetch(url, {});
      const json = await response.json();
      return { success: true, payload: json };
    } catch (error) {
      return { success: false, payload: error };
    }
  }

  async apiFetch(url) {
    const response = await this.fetchJSON(url);
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
        clearInterval(this.timer);
        if (status === "processed") {
          this.fetchSimulationResult(resultUrl);
        } else {
          this.showError({ message: lastError });
        }
      }
    } else {
      clearInterval(this.timer);
      this.showError(response.payload);
    }
  }

  async fetchSimulationResult(url) {
    const response = await this.fetchJSON(url);
    if (response.success) {
      this.setState({
        loading: false,
        jsonPayload: response.payload,
      });
    } else {
      this.showError(response.payload);
    }
  }

  showError(error) {
    this.setState({
      loading: false,
      errorMessage: error.message,
    });
  }

  render() {
    const { loading, errorMessage, jsonPayload } = this.state;
    const isLoaded = !loading;
    const hasError = !!errorMessage;
    const isSuccess = isLoaded && !hasError;

    return (
      <Fragment>
        <Fade in={loading} unmountOnExit>
          <LinearProgress variant="query" />
        </Fade>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={isLoaded && hasError}
          autoHideDuration={6000}
          message={<span id="message-id">Error: {errorMessage}</span>}
        />
        {isSuccess && (
          <SimulationList key="list" simulations={jsonPayload.invoices} />
        )}
      </Fragment>
    );
  }
}

export default Loader;
