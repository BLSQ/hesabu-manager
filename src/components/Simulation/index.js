import {
  Dialog,
  Typography,
  Slide,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@material-ui/core";
import { ExpandableBottomSheet } from "@blsq/manager-ui";
import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { withTranslation } from "react-i18next";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import TopBar from "../Shared/TopBar";
import FiltersToggleBtn from "../FiltersToggleBtn";
import SimulationBlocks from "./SimulationBlocks";
import SideSheet from "../SideSheet";
import Filters from "./Filters";
import PageContent from "../Shared/PageContent";
import useStyles from "./styles";
import ExpandableCellContent from "./ExpandableCellContent";
import SimulationResultStatus from "./SimulationResultStatus";
import Dhis2DataElementsProvider from "../../containers/Dhis2DataElementsProvider";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Simulation = props => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const {
    errorMessage,
    t,
    open,
    simulation,
    simulationResults,
    loading,
    selectedCell,
    polling,
  } = props;

  const handleToggleSideSheet = () => {
    if (sideSheetOpen) {
      if (selectedCell) {
        setBottomSheetOpen(true);
      }
      setSideSheetOpen(false);
    } else {
      setBottomSheetOpen(false);
      setSideSheetOpen(true);
    }
  };
  const openBottomSheet = () => setBottomSheetOpen(true);
  const closeBottomSheet = () => setBottomSheetOpen(false);

  let title = simulation
    ? `${simulation.orgUnitName} @ ${simulation.dhis2Period}`
    : "...";

  useEffect(() => {
    if (selectedCell && !bottomSheetOpen) {
      setBottomSheetOpen(true);
    }

    // eslint-disable-next-line
  }, [selectedCell, simulation]);

  const backLinkPath = (location.state || {}).referrer
    ? location.state.referrer
    : "/simulations";

  let usedBy = undefined;
  if (selectedCell) {
    usedBy = simulationResults.lookups.reverseDependencies[selectedCell.key];
  }

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
      <TopBar fullscreen backLinkPath={backLinkPath}>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.appBarHeader}
        >
          {title} {(simulation || {}).status}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={polling}
              onChange={props.onPollingChange}
              value={"polling"}
            />
          }
          label={t("buttons.autoreload")}
        />
        <FiltersToggleBtn
          variant="filters"
          className={classes.filtersBtn}
          onClick={handleToggleSideSheet}
        />
      </TopBar>
      <PageContent fullscreen className={classes.content}>
        {loading && <span>Loading...</span>}
        {errorMessage}
        {simulation && simulation.status === "processed" && (
          <Dhis2DataElementsProvider>
            <SimulationBlocks
              resultUrl={simulation.resultUrl}
              searchQuery={props.valuesFromParams}
              simulationResults={simulationResults}
            />
            <ExpandableBottomSheet
              open={bottomSheetOpen}
              onOpen={openBottomSheet}
              onClose={closeBottomSheet}
            >
              <ExpandableCellContent cell={selectedCell} usedBy={usedBy} />
            </ExpandableBottomSheet>
          </Dhis2DataElementsProvider>
        )}
        <SimulationResultStatus
          newSim={isEmpty(props.valuesFromParams)}
          simulation={simulation}
          errorMessage={errorMessage}
        />
      </PageContent>
      <SideSheet
        title={t("simulation.sidesheet.title")}
        open={
          (!loading && !simulation) ||
          (simulation && !simulation.resultUrl) ||
          sideSheetOpen
        }
        onClose={handleToggleSideSheet}
        variant="big"
      >
        <Filters loading={loading} values={props.valuesFromParams} />
      </SideSheet>
    </Dialog>
  );
};

Simulation.propTypes = {
  errorMessage: PropTypes.string,
  history: PropTypes.object,
  id: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string,
  open: PropTypes.bool,
  payload: PropTypes.shape({
    sets: PropTypes.array,
  }),
  period: PropTypes.string,
  request: PropTypes.object,
  sets: PropTypes.array,
  simulation: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    period: PropTypes.string,
  }),
  t: PropTypes.func,
  valuesFromParams: PropTypes.object,
};

const mapStateToProps = state => ({
  selectedCell: state.ui.selectedCell,
});

export default connect(mapStateToProps)(
  withTranslation("translations")(Simulation),
);
