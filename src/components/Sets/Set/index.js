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
import EditSetContainer from "../../../containers/EditSetContainer";
import DecisionTableList from "../../DecisionTables/DecisionTableList";
import { formattedName } from "../../../utils/textUtils";
import SidebarBlock from "../../Shared/SidebarBlock";
import ActionFab from "../../Shared/ActionFab";
import useStyles from "./styles";
import Transition from "../../Shared/Transition";
import { canEdit } from "../../../actions/api";

const Set = props => {
  const {
    match,
    sideSheetOpen,
    open,
    loading,
    set,
    handleToggleSideSheet,
    simulationParams,
    location,
    onSave,
  } = props;
  const history = useHistory();
  const classes = useStyles(!loading && sideSheetOpen);
  const userCanEdit = canEdit();
  const { t } = useTranslation();

  const tabConfigs = [
    {
      label: t("set.tabs.topicFormulas.label"),
      title: t("set.tabs.topicFormulas.tooltip"),
      to: `${match.url}/topic_formulas`,
      routeComponent: SetCurrentLevelContainer,
    },
    {
      label: t("set.tabs.setFormulas.label"),
      title: t("set.tabs.setFormulas.tooltip"),
      to: `${match.url}/set_formulas`,
      routeComponent: SetFormulasContainer,
    },
    {
      label: t("set.tabs.childrenFormulas.label"),
      title: t("set.tabs.childrenFormulas.tooltip"),
      to: `${match.url}/children_formulas`,
      kinds: ["multi-groupset"],
      routeComponent: SetChildrenContainer,
    },
    {
      label: t("set.tabs.zoneTopicFormulas.label"),
      title: t("set.tabs.zoneTopicFormulas.tooltip"),
      to: `${match.url}/zone_topic_formulas`,
      kinds: ["zone"],
      routeComponent: SetZoneTopicContainer,
    },
    {
      label: t("set.tabs.zoneFormulas.label"),
      title: t("set.tabs.zoneFormulas.tooltip"),
      to: `${match.url}/zone_formulas`,
      kinds: ["zone"],
      routeComponent: SetZoneContainer,
    },
    {
      label: t("set.tabs.decisionTables.label"),
      title: t("set.tabs.decisionTables.tooltip"),
      to: `${match.url}/decisions`,
      routeComponent: DecisionTableList,
    },
    {
      label: t("set.tabs.editSet.label"),
      title: t("set.tabs.editSet.tooltip"),
      to: `${match.url}`,
      routeComponent: EditSetContainer,
    },
  ].filter(c => c.kinds == undefined || c.kinds.includes(set.kind));

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
        location={location}
        set={set}
        tabsProps={{ tabConfigs }}
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
            disabled={!userCanEdit}
            to={{ pathname: `${window.location.href.split("#")[1]}/new` }}
            text="Formula"
            extended
            className={classes.simulationBtn}
          />

          <Switch>
            <Route
              key="import"
              path={`${match.url}/topic/import`}
              exact={true}
              component={() => (
                <ImportTopicsContainer
                  set={set}
                  loading={loading}
                  onSave={onSave}
                />
              )}
            />

            <Route
              key="edit"
              path={`${match.url}`}
              exact={true}
              component={() => (
                <EditSetContainer set={set} loading={loading} onSave={onSave} />
              )}
            />

            {tabConfigs.map(tab => (
              <Route
                key={tab.to}
                path={tab.to}
                exact={true}
                component={() => {
                  const Comp = tab.routeComponent;
                  return <Comp set={set} loading={loading} />;
                }}
              />
            ))}
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
