import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SimulationList from "../../components/Simulation/list";
import { Dialog, Typography, Slide } from "@material-ui/core";
import { withRouter, matchPath } from "react-router-dom";
import TopBar from "../../components/Shared/TopBar";
import FiltersToggleBtn from "../../components/FiltersToggleBtn";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SimulationContainer = props => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [jsonPayload, setJsonPayload] = useState({ invoices: [] });
  const timer = useRef(null);

  const isLoaded = !loading;
  const hasError = !!errorMessage;
  const isSuccess = isLoaded && !hasError;
  const { classes, history, set, location } = props;
  const routeMatch = matchPath(location.pathname, {
    path: "/simulations/:simulationId",
    exact: true,
    strict: false,
  });
  const simulationId = routeMatch && (routeMatch.params || {}).simulationId;
  const open = !!simulationId;

  useEffect(() => {
    const url = "http://localhost:4567/api/simulations/1234";
    if (!timer.current) {
      timer.current = setInterval(() => apiFetch(url), 1000);
    }

    return function cleanup() {
      clearInterval(timer.current);
    };
  });

  const fetchJSON = async (url) => {
    try {
      const response = await fetch(url, {});
      const json = await response.json();
      return { success: true, payload: json };
    } catch (error) {
      return { success: false, payload: error };
    }
  };

  const apiFetch = async (url) =>  {
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

  const fetchSimulationResult = async (url) => {
    const response = await fetchJSON(url);
    if (response.success) {
      setLoading(false);
      setJsonPayload(response.payload);
    } else {
      showError(response.payload);
    }
  };

  const showError = error => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      className={classes.root}
      onClose={() => history.push("/simulations")}
      TransitionComponent={Transition}
    >
      <TopBar fullscreen backLinkPath="/simulations">
        <Typography
          variant="h6"
          color="inherit"
          className={classes.appBarHeader}
        >
          {set.name}
        </Typography>
        <FiltersToggleBtn variant="info" className={classes.filtersBtn} />
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
};

const mapStateToProps = () => ({
  set: {
    id: "1234",
    name: "SIGL BCZ FOSA Coherence, COSPRO - A.3 - Bureaux Administratifs",
    groupNames: ["BCZs"],
    createdAt: "2019-11-02T18:25:43.511Z",
    buildDuration: 240,
    period: "Q3 - 2019",
  },
});

export default withStyles(styles)(
  withRouter(connect(mapStateToProps)(SimulationContainer)),
);
