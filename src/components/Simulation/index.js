import {
  Grid,
  Dialog,
  Typography,
  Slide,
  Fade,
  makeStyles,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState } from "react";
import PropTypes from "prop-types";
import TopBar from "../Shared/TopBar";
import FiltersToggleBtn from "../FiltersToggleBtn";
import SimulationParts from "./parts";
import SideSheet from "../SideSheet";
import uniqWith from "lodash/uniqWith";
import some from "lodash/some";
import humanize from "string-humanize";
import { withTranslation } from "react-i18next";
import SimulationFilters from "./Filters";

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
  spinner: {
    marginTop: theme.spacing(20),
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

  const { errorMessage, loading, payload, history, simulationData, t } = props;

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

  const handleFilterChange = (collection, selected, setter) => {
    const selectedItems = collection.filter(item =>
      selected.includes(item.key),
    );
    setter(selectedItems);
  };

  const periodsChanged = periodKeys => {
    handleFilterChange(allPeriods, periodKeys, setPeriods);
  };

  const packagesChanged = packageKeys => {
    handleFilterChange(allPackages, packageKeys, setPackages);
  };

  const orgUnitsChanged = orgUnitKeys => {
    handleFilterChange(allOrgUnits, orgUnitKeys, setOrgUnits);
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
        <Grid container alignItems="center" justify="center">
          <CircularProgress className={classes.spinner} />
        </Grid>
      </Fade>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isLoaded && hasError}
        autoHideDuration={6000}
        message={<span id="message-id">Error: {errorMessage}</span>}
      />
      {isSuccess && (
        <>
          <SimulationParts key="parts" simulations={filteredSimulations} />
          <SideSheet
            title={t("simulations.sidesheet.title")}
            open={sideSheetOpen}
            onClose={handleToggleSideSheet}
          >
            <p>SimulationForm will go here!</p>

            <SimulationFilters
              allPeriods={allPeriods}
              periods={periods}
              allOrgUnits={allOrgUnits}
              orgUnits={orgUnits}
              allPackages={allPackages}
              packages={packages}
              onPeriodsChanged={periodsChanged}
              onPackagesChanged={packagesChanged}
              onOrgUnitsChanged={orgUnitsChanged}
            />
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

export default withTranslation("translations")(Simulation);
