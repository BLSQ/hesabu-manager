import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";
import {connect} from 'react-redux';
import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SimulationList from "../../components/Simulation/list";
import { Dialog, Typography, Slide } from "@material-ui/core";
import {withRouter, matchPath} from "react-router-dom";
import TopBar from "../../components/Shared/TopBar";
import FiltersToggleBtn from "../../components/FiltersToggleBtn";
import { withStyles } from "@material-ui/styles";
import styles from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class SimulationContainer extends Component {
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
    const { classes, history, set, location} = this.props;
    const routeMatch = matchPath(location.pathname, {
      path: "/simulations/:simulationId",
      exact: true,
      strict: false
    });
    const simulationId = routeMatch && (routeMatch.params || {}).simulationId;
    const open = !!simulationId;

    return (
      <Dialog
        fullScreen
        open={open}
        className={classes.root}
        onClose={() => history.push("/simulations")}
        TransitionComponent={Transition}
      >
        <TopBar
          fullscreen
          backLinkPath="/simulations"
        >
          <Typography
            variant="h6"
            color="inherit"
            className={classes.appBarHeader}
          >
            {set.name}
          </Typography>
          <FiltersToggleBtn
            variant="info"
            className={classes.filtersBtn}
          />
        </TopBar>
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
      </Dialog>
    );
  }
}

const mapStateToProps = () => ({
  set: {
    id: "1234",
    name: "SIGL BCZ FOSA Coherence, COSPRO - A.3 - Bureaux Administratifs",
    groupNames: ["BCZs"],
    createdAt: "2019-11-02T18:25:43.511Z",
    buildDuration: 240,
    period: "Q3 - 2019",
  },
})

export default withStyles(styles)(withRouter(connect(mapStateToProps)(SimulationContainer)));