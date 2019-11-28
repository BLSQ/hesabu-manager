import { Dialog, Typography, Slide, Fade, makeStyles } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import LinearProgress from "@material-ui/core/LinearProgress";
import React, { useState } from "react";
import PropTypes from "prop-types";
import TopBar from "../Shared/TopBar";
import FiltersToggleBtn from "../FiltersToggleBtn";
import SimulationList from "./list";
import SideSheet from "../SideSheet";

const styles = makeStyles(theme => ({
  infoBox: {
    marginBottom: theme.spacing(4),
  },
  appBarHeader: {
    flex: 1,
  },
  filtersBtn: {
    marginLeft: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Simulation = props => {
  const classes = styles();
  const [sideSheetOpen, setSideSheetOpen] = useState(false);

  const { errorMessage, loading, payload, history, simulationData } = props;

  const isLoaded = !loading;
  const hasError = !!errorMessage;
  const isSuccess = isLoaded && !hasError;
  const open = simulationData && !!simulationData.id;

  const name = simulationData && simulationData.name;
  const formattedDate = simulationData && simulationData.period;
  const nameWithDate = `${name}-${formattedDate}`;

  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);

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
          {nameWithDate}
        </Typography>
        <FiltersToggleBtn
          variant="info"
          className={classes.filtersBtn}
          onClick={handleToggleSideSheet}
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
        <>
          <SimulationList key="list" simulations={payload.invoices} />
          <SideSheet
            title={"Sheeeet"}
            open={sideSheetOpen}
            onClose={handleToggleSideSheet}
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur velit et exercitationem ut ex eveniet in sit aperiam,
              voluptatum laboriosam quam voluptate officiis ullam perspiciatis
              at sint deserunt architecto illo!
            </p>
          </SideSheet>
        </>
      )}
    </Dialog>
  );
};

Simulation.propTypes = {
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  payload: PropTypes.shape({
    invoices: PropTypes.array,
  }),
  simulation: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    period: PropTypes.string,
  }),
};

export default Simulation;
