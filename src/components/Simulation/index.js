import { Grid, Dialog, Typography, Slide, Fade } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ExpandableBottomSheet } from "@blsq/manager-ui";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import uniqWith from "lodash/uniqWith";
import some from "lodash/some";
import { withTranslation } from "react-i18next";
import groupBy from "lodash/groupBy";
import { useHistory } from "react-router-dom";
import TopBar from "../Shared/TopBar";
import FiltersToggleBtn from "../FiltersToggleBtn";
import SimulationBlocks from "./SimulationBlocks";
import SideSheet from "../SideSheet";
import SimulationFilters from "./Filters";
import PageContent from "../Shared/PageContent";
import useStyles from "./styles";
import ExpandableCellContent from "./ExpandableCellContent";
import EmptySection from "../EmptySection";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// const mapSimulationResources = (resources, attr) => {
//   const all = resources.map(resource => ({
//     key: resource[attr.key],
//     human: humanize(resource[attr.name || attr.key]),
//   }));
//   return uniqWith(all, (a, b) => a.key === b.key);
// };

export const Simulation = props => {
  const classes = useStyles();
  const history = useHistory();
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  console.log("valuesFromParams", props.valuesFromParams);

  const {
    errorMessage,
    loading,
    invoices: sets,
    request,
    t,
    open,
    simulation,
  } = props;

  const hasError = !!errorMessage;
  const showSimulation = !loading && !hasError && !!simulation;

  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);
  const openBottomSheet = () => setBottomSheetOpen(true);
  const closeBottomSheet = () => setBottomSheetOpen(false);

  let title;
  // const allPeriods = [];
  // const allPackages = [];
  // const allOrgUnits = [];

  // if (request) {
  //   title = `${request.organisation_unit.name}-${request.period}`;
  //   allPeriods = mapSimulationResources(sets, { key: "period" });
  //   allPackages = mapSimulationResources(sets, { key: "code" });
  //   allOrgUnits = mapSimulationResources(sets, {
  //     key: "orgunit_ext_id",
  //     name: "orgunit_name",
  //   });
  // }

  useEffect(() => {
    if (selectedCell && !bottomSheetOpen) {
      setBottomSheetOpen(true);
    }
    // eslint-disable-next-line
  }, [selectedCell]);

  // Should be already filtered
  // ----
  // const filteredBlocks = sets
  //   ? sets.filter(sim => {
  //       return (
  //         some(periods, ["key", sim.period]) &&
  //         some(packages, ["key", sim.code]) &&
  //         some(orgUnits, ["key", sim.orgunit_ext_id])
  //       );
  //     })
  //   : [];

  const setsByCode = groupBy(simulation, "code");

  return (
    <Dialog
      fullScreen
      open={open}
      className={classes.root}
      onClose={() => history.push("/simulations")}
      TransitionComponent={Transition}
      classes={{
        paperScrollPaper: classes.dialog,
      }}
    >
      <TopBar fullscreen backLinkPath="/simulations">
        <Typography
          variant="h6"
          color="inherit"
          className={classes.appBarHeader}
        >
          {title}
        </Typography>
        <FiltersToggleBtn
          variant="filters"
          className={classes.filtersBtn}
          onClick={handleToggleSideSheet}
        />
      </TopBar>
      <PageContent fullscreen>
        {showSimulation ? (
          <>
            <SimulationBlocks
              setsByCode={setsByCode}
              setSelectedCell={setSelectedCell}
            />
            <ExpandableBottomSheet
              open={bottomSheetOpen}
              onOpen={openBottomSheet}
              onClose={closeBottomSheet}
            >
              <ExpandableCellContent cell={selectedCell} />
            </ExpandableBottomSheet>
          </>
        ) : (
          <EmptySection resourceName={t("resources.simulation")} />
        )}
      </PageContent>
      <SideSheet
        title={t("simulations.sidesheet.title")}
        open={!simulation || sideSheetOpen}
        onClose={handleToggleSideSheet}
        variant="big"
      >
        <SimulationFilters values={props.valuesFromParams} />
      </SideSheet>
    </Dialog>
  );
};

Simulation.propTypes = {
  errorMessage: PropTypes.string,
  history: PropTypes.object,
  id: PropTypes.string,
  sets: PropTypes.array,
  loading: PropTypes.bool,
  name: PropTypes.string,
  open: PropTypes.bool,
  payload: PropTypes.shape({
    sets: PropTypes.array,
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
