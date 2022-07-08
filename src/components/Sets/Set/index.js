import React, { Fragment } from "react";
import { useHistory, withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography, Dialog, Chip } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import FiltersToggleBtn from "../../FiltersToggleBtn";
import TopBar from "../../Shared/TopBar";
import SideSheet from "../../SideSheet";
import Tabs from "./Tabs";
import ImportTopicsContainer from "./ImportTopicsContainer";
import SetChildrenContainer from "../../../containers/SetChildrenContainer";
import SetCurrentLevelContainer from "../../../containers/SetCurrentLevelContainer";
import SetFormulasContainer from "../../../containers/SetFormulasContainer";
import SetZoneTopicContainer from "../../../containers/SetZoneTopicContainer";
import SetZoneContainer from "../../../containers/SetZoneContainer";
import { formattedName } from "../../../utils/textUtils";
import SidebarBlock from "../../Shared/SidebarBlock";
import ActionFab from "../../Shared/ActionFab";
import useStyles from "./styles";
import Transition from "../../Shared/Transition";

const Set = props => {
  const {
    match,
    sideSheetOpen,
    open,
    currentTab,
    loading,
    set,
    handleToggleSideSheet,
    simulationParams,
    location,
    onSave,
  } = props;
  const history = useHistory();
  const classes = useStyles(!loading && sideSheetOpen);
  const { t } = useTranslation();
  return (
    <Dialog
      fullScreen
      open={open}
      className={classes.root}
      onClose={() => history.push("/sets")}
      TransitionComponent={Transition}
      classes={{
        paperScrollPaper: classes.dialog,
      }}
    >
      <TopBar
        fullscreen
        backLinkPath="/sets"
        tabs={Tabs}
        activeTab={currentTab}
      >
        <Typography
          variant="h6"
          color="inherit"
          className={classes.appBarHeader}
        >
          {loading ? "…" : set.name}
        </Typography>
        <FiltersToggleBtn
          variant="info"
          className={classes.filtersBtn}
          onClick={handleToggleSideSheet}
        />
      </TopBar>

      {!!set.id && (
        <Fragment>
          <ActionFab
            to={{
              pathname: `/simulation`,
              search: `?${simulationParams}`,
              state: { referrer: location.pathname },
            }}
            text="Simulation"
            extended
            className={classes.simulationBtn}
          />

          <Switch>
            <Route
              path={`${match.url}/topic_formulas`}
              exact={true}
              component={() => (
                <SetCurrentLevelContainer set={set} loading={loading} />
              )}
            />
            <Route
              path={`${match.url}/topic_formulas/import`}
              component={() => (
                <ImportTopicsContainer
                  set={set}
                  loading={loading}
                  onSave={onSave}
                />
              )}
            />
            <Route
              path={`${match.url}/children`}
              component={() => (
                <SetChildrenContainer set={set} loading={loading} />
              )}
            />
            <Route
              path={`${match.url}/zone_topic`}
              component={() => (
                <SetZoneTopicContainer set={set} loading={loading} />
              )}
            />
            <Route
              path={`${match.url}/zone_formulas`}
              component={() => <SetZoneContainer set={set} loading={loading} />}
            />
            <Route
              path={`${match.url}/set_formulas`}
              component={() => (
                <SetFormulasContainer set={set} loading={loading} />
              )}
            />
          </Switch>
          {!props.loading && (
            <SideSheet
              hasTabs
              title={t("set.sidesheet.title")}
              open={sideSheetOpen}
              onClose={handleToggleSideSheet}
            >
              <p>
                <Chip label={formattedName(set.kind)} />
              </p>
              {!!set.orgUnitGroups.length && (
                <SidebarBlock title={t("resources.orgUnitGroup_plural")}>
                  <span>{set.orgUnitGroups.map(group => group.id)}</span>
                </SidebarBlock>
              )}
              {!!set.orgUnitGroupSets.length && (
                <SidebarBlock title={t("resources.orgUnitGroupSet_plural")}>
                  <p>{set.orgUnitGroupSets.map(group => group.id)}</p>
                </SidebarBlock>
              )}
              <SidebarBlock title={t("set.frequency")}>
                {set.frequency}
              </SidebarBlock>
            </SideSheet>
          )}
        </Fragment>
      )}
    </Dialog>
  );
};

Set.propTypes = {
  currentTab: PropTypes.number,
  handleToggleSideSheet: PropTypes.func,
  onSave: PropTypes.func,
  loading: PropTypes.bool,
  location: PropTypes.object,
  match: PropTypes.object,
  open: PropTypes.bool,
  set: PropTypes.object,
  sideSheetOpen: PropTypes.bool,
  simulationParams: PropTypes.object,
};

export default withRouter(Set);
