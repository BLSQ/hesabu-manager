import { Dialog, Typography, Slide, Fade, makeStyles } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import LinearProgress from "@material-ui/core/LinearProgress";
import React, { useState } from "react";
import PropTypes from "prop-types";
import TopBar from "../Shared/TopBar";
import FiltersToggleBtn from "../FiltersToggleBtn";
import SimulationList from "./list";
import SideSheet from "../SideSheet";
import uniqWith from "lodash/uniqWith";
import some from "lodash/some";
import humanize from "string-humanize";

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

const mapPeriods = invoices => {
  const all = invoices.map(invoice => ({
    key: invoice.period,
    human: humanize(invoice.period),
  }));
  return uniqWith(all, (a, b) => a.key === b.key);
};

const mapPackages = invoices => {
  const all = invoices.map(invoice => ({
    key: invoice.code,
    human: humanize(invoice.code),
  }));

  return uniqWith(all, (a, b) => a.key === b.key);
};

const mapOrgunits = invoices => {
  const all = invoices.map(invoice => ({
    key: invoice.orgunit_ext_id,
    human: invoice.orgunit_name,
  }));

  return uniqWith(all, (a, b) => a.key === b.key);
};

export const Simulation = props => {
  const classes = styles();
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [periods, setPeriods] = useState([]);
  const [packages, setPackages] = useState([]);
  const [orgUnits, setOrgUnits] = useState([]);

  const { errorMessage, loading, payload, history, simulationData } = props;

  const simulations = payload.invoices;
  const isLoaded = !loading;
  const hasError = !!errorMessage;
  const isSuccess = isLoaded && !hasError;
  const open = simulationData && !!simulationData.id;

  const name = simulationData && simulationData.name;
  const formattedDate = simulationData && simulationData.period;
  const nameWithDate = `${name}-${formattedDate}`;

  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);

  const allPeriods = mapPeriods(simulations);
  const allPackages = mapPackages(simulations);
  const allOrgUnits = mapOrgunits(simulations);

  // Set default selection
  if (orgUnits.length < 1 && allOrgUnits.length > 0) {
    setOrgUnits([allOrgUnits[0]]);
  }
  if (periods.length < 1 && allPeriods.length > 0) setPeriods(allPeriods);
  if (packages.length < 1 && allPackages.length > 0) setPackages(allPackages);

  const filteredSimulations = simulations.filter(simulation => {
    return (
      some(periods, ["key", simulation.period]) &&
      some(packages, ["key", simulation.code]) &&
      some(orgUnits, ["key", simulation.orgunit_ext_id])
    );
  });

  const periodsChanged = periodKeys => {
    const selectedPeriods = allPeriods.filter(item =>
      periodKeys.includes(item.key),
    );
    setPeriods(selectedPeriods);
  };

  const packagesChanged = packageKeys => {
    const selectedPackages = allPackages.filter(item =>
      packageKeys.includes(item.key),
    );
    setPackages(selectedPackages);
  };

  const orgUnitsChanged = orgUnitKeys => {
    const selectedOrgUnits = allOrgUnits.filter(item =>
      orgUnitKeys.includes(item.key),
    );
    setOrgUnits(selectedOrgUnits);
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
          <SimulationList key="list" simulations={filteredSimulations} />
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
