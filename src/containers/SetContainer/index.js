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
    right: sideSheetOpen ? SIDEBAR_WIDTH + theme.spacing(2) : theme.spacing(2),
    transition: "all .1s 100ms ease-in-out",
  }),
}));

const SetContainer = props => {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const [sideSheetOpen, setSideSheetOpen] = useState(true);
  const classes = useStyles(sideSheetOpen);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [set, setSet] = useState({});

  useEffect(() => {
    setLoading(true);
    externalApi()
      .errorType("json")
      .url(`/sets/${props.setId}`)
      .get()
      .json(response => {
        setLoading(false);
        deserialize(response).then(data => {
          setSet(data);
        });

        setErrorMessage(null);
      })
      .catch(e => {
        setErrorMessage(e.message);
        setLoading(false);
        setSet({});
      });
  }, []);

  const { setId, open, match } = props;

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
          {set.name}
        </Typography>
        <FiltersToggleBtn
          variant="info"
          className={classes.filtersBtn}
          onClick={handleToggleSideSheet}
        />
      </TopBar>
      <ActionFab
        to={`/simulation?periods=${props.simulationPeriod}&sets=${setId}`}
        text="Simulation"
        extended
        className={classes.simulationBtn}
      />
      <Switch>
        <Route
          path={`${match.url}/current_level`}
          component={() => <SetCurrentLevelContainer set={set} />}
        />
        <Route
          path={`${match.url}/children`}
          component={SetChildrenContainer}
        />
        <Route
          path={`${match.url}/set_formulas`}
          component={SetFormulasContainer}
        />
      </Switch>
      <SideSheet
        hasTabs
        title={t("set.sidesheet.title")}
        open={sideSheetOpen}
        onClose={handleToggleSideSheet}
      >
        <p>
          <Chip label={formattedName(set.kind)} />
        </p>
        <SidebarBlock title={t("resources.orgUnitGroup_plural")}>
          {(set.orgUnitGroups || []).length && (
            <span>{set.orgUnitGroups.map(group => group.id)}</span>
          )}
        </SidebarBlock>
        <SidebarBlock title={t("resources.orgUnitGroupSet_plural")}>
          {(set.orgUnitGroupSets || []).length && (
            <p>{set.orgUnitGroupSets.map(group => group.id)}</p>
          )}
        </SidebarBlock>
        <SidebarBlock title={t("set.frequency")}>{set.frequency}</SidebarBlock>
      </SideSheet>
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
