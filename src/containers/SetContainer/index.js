import React, { useState, useEffect } from "react";
import { Typography, Dialog, Slide, Chip } from "@material-ui/core";
import {
  useHistory,
  useLocation,
  withRouter,
  Route,
  Switch,
} from "react-router-dom";

import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import snakeCase from "lodash/snakeCase";
import TopBar from "../../components/Shared/TopBar";
import SideSheet from "../../components/SideSheet";
import FiltersToggleBtn from "../../components/FiltersToggleBtn";
import Tabs from "../../components/Sets/Set/Tabs";
import { activeTab } from "../../lib/setHelpers";
import SetChildrenContainer from "../SetChildrenContainer";
import SetCurrentLevelContainer from "../SetCurrentLevelContainer";
import SetFormulasContainer from "../SetFormulasContainer";
import { externalApi } from "../../actions/api";
import { deserialize } from "../../utils/jsonApiUtils";
import { formattedName } from "../../utils/textUtils";
import SidebarBlock from "../../components/Shared/SidebarBlock";
import ActionFab from "../../components/Shared/ActionFab";
import { SIDEBAR_WIDTH } from "../../constants/ui";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  appBarHeader: {
    flex: 1,
  },
  dialog: {
    flexDirection: "row",
  },
  simulationBtn: sideSheetOpen => ({
    right: sideSheetOpen ? SIDEBAR_WIDTH + theme.spacing(4) : theme.spacing(4),
    transition: "all .1s 100ms ease-in-out",
  }),
}));

const SetContainer = props => {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const classes = useStyles(sideSheetOpen);
  const [loading, setLoading] = useState(false);
  const [set, setSet] = useState({});
  const { setId, open, match } = props;

  function simulationParams() {
    const prms = new URLSearchParams();
    if (props.simulationPeriod) prms.append("periods", props.simulationPeriod);
    if (set) prms.append("sets", snakeCase(set.name));
    if (!!set?.simulationOrgUnit?.id)
      prms.append("orgUnit", set.simulationOrgUnit.id);
    return prms.toString();
  }

  useEffect(() => {
    if (open) {
      setLoading(true);
      externalApi()
        .errorType("json")
        .url(`/sets/${props.setId}`)
        .get()
        .json(response => {
          setLoading(false);
          deserialize(response, {
            simulationOrgUnit: {
              valueForRelationship(relationship) {
                return {
                  id: relationship.id,
                  type: relationship.type,
                };
              },
            },
          }).then(data => {
            setSet(data);
          });
        })
        .catch(e => {
          setLoading(false);
          setSet({});
          console.log(e);
        });
    }
  }, [props.setId, open]);

  const currentTab = activeTab(setId, location.pathname);
  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);

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
        <>
          <ActionFab
            to={{
              pathname: `/simulation`,
              search: `?${simulationParams()}`,
              state: { referrer: location.pathname },
            }}
            text="Simulation"
            extended
            className={classes.simulationBtn}
          />

          <Switch>
            <Route
              path={`${match.url}/current_level`}
              component={() => (
                <SetCurrentLevelContainer set={set} loading={loading} />
              )}
            />
            <Route
              path={`${match.url}/children`}
              component={() => (
                <SetChildrenContainer set={set} loading={loading} />
              )}
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
        </>
      )}
    </Dialog>
  );
};

SetContainer.propTypes = {
  match: PropTypes.object,
  open: PropTypes.bool,
  setId: PropTypes.string,
  simulationPeriod: PropTypes.string,
};

// #TODO: Replace Fake sim period with first from project
const mapStateToProps = () => ({
  simulationPeriod: "2016Q1",
});

export default connect(mapStateToProps)(withRouter(SetContainer));
