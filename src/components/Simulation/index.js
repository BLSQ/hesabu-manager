import { Dialog, Typography, Slide } from "@material-ui/core";
import { ExpandableBottomSheet } from "@blsq/manager-ui";
import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { withTranslation } from "react-i18next";
import TopBar from "../Shared/TopBar";
import FiltersToggleBtn from "../FiltersToggleBtn";
import SimulationBlocks from "./SimulationBlocks";
import SideSheet from "../SideSheet";
import SimulationFilters from "./Filters";
import PageContent from "../Shared/PageContent";
import useStyles from "./styles";
import ExpandableCellContent from "./ExpandableCellContent";

import SimulationResultStatus from "./SimulationResultStatus";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Simulation = props => {
  const classes = useStyles();
  const history = useHistory();
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  const { errorMessage, t, open, simulation, loading } = props;
  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);
  const openBottomSheet = () => setBottomSheetOpen(true);
  const closeBottomSheet = () => setBottomSheetOpen(false);

  let title;

  useEffect(() => {
    if (selectedCell && !bottomSheetOpen) {
      setBottomSheetOpen(true);
    }
    // eslint-disable-next-line
  }, [selectedCell]);

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
          {title} {(simulation || {}).status}
        </Typography>
        <FiltersToggleBtn
          variant="filters"
          className={classes.filtersBtn}
          onClick={handleToggleSideSheet}
        />
      </TopBar>
      <PageContent fullscreen>
        {simulation && simulation.attributes.status === "processed" && (
          <Fragment>
            <SimulationBlocks
              resultUrl={simulation.attributes.resultUrl}
              setSelectedCell={setSelectedCell}
            />
            <ExpandableBottomSheet
              open={bottomSheetOpen}
              onOpen={openBottomSheet}
              onClose={closeBottomSheet}
            >
              <ExpandableCellContent cell={selectedCell} />
            </ExpandableBottomSheet>
          </Fragment>
        )}
        <SimulationResultStatus
          simulation={simulation}
          errorMessage={errorMessage}
        />
      </PageContent>
      <SideSheet
        title={t("simulation.sidesheet.title")}
        open={!simulation || !simulation.attributes.resultUrl || sideSheetOpen}
        onClose={handleToggleSideSheet}
        variant="big"
      >
        <SimulationFilters loading={loading} values={props.valuesFromParams} />
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
