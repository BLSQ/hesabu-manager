import { Grid, Dialog, Typography, Slide, Fade } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import uniqWith from "lodash/uniqWith";
import some from "lodash/some";
import humanize from "string-humanize";
import { withTranslation } from "react-i18next";
import TopBar from "../Shared/TopBar";
import FiltersToggleBtn from "../FiltersToggleBtn";
import SimulationParts from "./parts";
import SideSheet from "../SideSheet";
import SimulationFilters from "./Filters";
import { handleFilterChange } from "../../lib/formUtils";
import PageContent from "../Shared/PageContent";
import useStyles from "./styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const mapPeriods = invoices => {
  const all = invoices.map(set => ({
    key: set.period,
    human: humanize(set.period),
  }));
  return uniqWith(all, (a, b) => a.key === b.key);
};

const mapPackages = invoices => {
  const all = invoices.map(set => ({
    key: set.code,
    human: humanize(set.code),
  }));

  return uniqWith(all, (a, b) => a.key === b.key);
};

const mapOrgunits = invoices => {
  const all = invoices.map(set => ({
    key: set.orgunit_ext_id,
    human: set.orgunit_name,
  }));

  return uniqWith(all, (a, b) => a.key === b.key);
};

export const Simulation = props => {
  const classes = useStyles();
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [periods, setPeriods] = useState([]);
  const [packages, setPackages] = useState([]);
  const [orgUnits, setOrgUnits] = useState([]);

  const { errorMessage, loading, invoices, request, history, t, open } = props;

  const isLoaded = !loading;
  const hasError = !!errorMessage;
  const isSuccess = isLoaded && !hasError;

  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);

  let nameWithDate = "…";
  let allPeriods = [];
  let allPackages = [];
  let allOrgUnits = [];

  if (request) {
    nameWithDate = `${request.organisation_unit.name}-${request.period}`;
    allPeriods = mapPeriods(invoices);
    allPackages = mapPackages(invoices);
    allOrgUnits = mapOrgunits(invoices);
  }

  useEffect(() => {
    if (allPeriods.length && !periods.length) {
      setPeriods([allPeriods[0]]);
    }
    if (allPackages.length && !packages.length) {
      setPackages([allPackages[0]]);
    }
    if (allOrgUnits.length && !orgUnits.length) {
      setOrgUnits([allOrgUnits[0]]);
    }
  }, [allPeriods, periods, allPackages, packages, allOrgUnits, orgUnits]);

  const filteredSimulations = invoices
    ? invoices.filter(simulation => {
        return (
          some(periods, ["key", simulation.period]) &&
          some(packages, ["key", simulation.code]) &&
          some(orgUnits, ["key", simulation.orgunit_ext_id])
        );
      })
    : [];

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
          variant="filters"
          className={classes.filtersBtn}
          onClick={handleToggleSideSheet}
        />
      </TopBar>
      <PageContent fullscreen>
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
        {isSuccess && <SimulationParts simulations={filteredSimulations} />}
      </PageContent>
      {isSuccess && (
        <SideSheet
          title={t("simulations.sidesheet.title")}
          open={sideSheetOpen}
          onClose={handleToggleSideSheet}
          variant="big"
        >
          <SimulationFilters
            allPeriods={allPeriods}
            periods={periods}
            allOrgUnits={allOrgUnits}
            orgUnits={orgUnits}
            allPackages={allPackages}
            packages={packages}
            onPeriodsChanged={periodKeys => {
              setPeriods(handleFilterChange(allPeriods, periodKeys));
            }}
            onPackagesChanged={packageKeys =>
              setPackages(handleFilterChange(allPackages, packageKeys))
            }
            onOrgUnitsChanged={orgUnitKeys =>
              setOrgUnits(handleFilterChange(allOrgUnits, orgUnitKeys))
            }
          />
        </SideSheet>
      )}
    </Dialog>
  );
};

Simulation.propTypes = {
  errorMessage: PropTypes.string,
  history: PropTypes.object,
  id: PropTypes.string,
  invoices: PropTypes.array,
  loading: PropTypes.bool,
  name: PropTypes.string,
  open: PropTypes.bool,
  payload: PropTypes.shape({
    invoices: PropTypes.array,
  }),
  period: PropTypes.string,
  request: PropTypes.object,
  simulation: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    period: PropTypes.string,
  }),
  t: PropTypes.func,
};

export default withTranslation("translations")(Simulation);
