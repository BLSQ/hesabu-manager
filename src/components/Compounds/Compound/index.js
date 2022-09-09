import React, { Fragment } from "react";
import {
  Typography,
  Dialog,
  Slide,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { useHistory, withRouter, Link, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import TopBar from "../../Shared/TopBar";
import PageContent from "../../Shared/PageContent";
import SideSheet from "../../SideSheet";
import SidebarBlock from "../../Shared/SidebarBlock";
import { formattedName } from "../../../utils/textUtils";
import FiltersToggleBtn from "../../FiltersToggleBtn";
import Formulas from "../../Formula/Formulas";
import ActionFab from "../../Shared/ActionFab";
import { canEdit } from "../../../actions/api";
import CompoundContainer from "../../../containers/CompoundContainer";
import EditCompound from "./EditCompound";
import Tabs from "./Tabs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  formulaWrapper: {
    display: "flex",
    flexWrap: "wrap",
    "& > div": {
      margin: theme.spacing(0, 2, 2, 0),
    },
  },
  simulationBtn: {
    right: theme.spacing(4) + 450,
    transition: "all .1s 100ms ease-in-out",
  },
}));

const Compound = props => {
  const history = useHistory();
  const classes = useStyles();
  const {
    compound,
    open,
    name,
    formulas,
    loading,
    errorMessage,
    frequency,
    sideSheetOpen,
    onSideSheetClose,
    onToggleSideSheet,
    sets,
    match,
  } = props;
  const { t } = useTranslation();
  const userCanEdit = canEdit();
  const tabConfigs = [
    {
      label: t("compound.tabs.compoundFormulas.label"),
      title: t("compound.tabs.compoundFormulas.tooltip"),
      to: `/compounds/${match.params.compoundId}/compound_formulas`,
      routeComponent: CompoundContainer,
    },
    {
      label: t("compound.tabs.editCompound.label"),
      title: t("compound.tabs.editCompound.tooltip"),
      to: `/compounds/${match.params.compoundId}`,
      routeComponent: EditCompound,
    },
  ];
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => history.push("/compounds")}
      TransitionComponent={Transition}
    >
      <TopBar
        fullscreen
        backLinkPath="/compounds"
        tabs={Tabs}
        tabsProps={{ tabConfigs }}
        compound={compound}
      >
        <Typography variant="h6" color="inherit">
          {loading ? "…" : name}
        </Typography>
        <FiltersToggleBtn
          variant="info"
          className={classes.filtersBtn}
          onClick={onToggleSideSheet}
        />
      </TopBar>

      {!!compound.id && (
        <Fragment>
          <Switch>
            <Route
              key="edit"
              path={`/compounds/${match.params.compoundId}`}
              exact={true}
              component={() => <EditCompound compound={compound} />}
            />

            {tabConfigs.map(tab => (
              <Route
                key={tab.to}
                path={tab.to}
                exact={true}
                component={() => {
                  const Comp = tab.routeComponent;
                  return <Comp compound={compound} loading={loading} />;
                }}
              />
            ))}
          </Switch>
        </Fragment>
      )}
      <div style={{ marginTop: "2.5rem", display: "flex" }}>
        <PageContent fullscreen>
          {loading && <CircularProgress />}
          {errorMessage && <p>{errorMessage}</p>}
          <Formulas formulas={formulas} parent={compound} />

          <ActionFab
            disabled={!userCanEdit}
            to={{ pathname: `${window.location.href.split("#")[1]}/new` }}
            text="Formula"
            extended
            className={classes.simulationBtn}
          />
        </PageContent>
        <SideSheet
          variant="big"
          title={t("compound.sidesheet.title")}
          open={sideSheetOpen}
          onClose={onSideSheetClose}
        >
          {frequency && (
            <SidebarBlock title={formattedName(t(`compound.frequency`))}>
              {t(`periodicity.${frequency}`)}
            </SidebarBlock>
          )}
          {sets && (
            <SidebarBlock title={formattedName(t(`compound.sets`))}>
              {sets
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(set => (
                  <div key={`set-${set.id}`}>
                    <Typography
                      component={Link}
                      to={`/sets/${set.id}`}
                      color="inherit"
                      title={set.frequency}
                    >
                      {set.name}
                    </Typography>
                  </div>
                ))}
            </SidebarBlock>
          )}
        </SideSheet>
      </div>
    </Dialog>
  );
};

Compound.propTypes = {
  errorMessage: PropTypes.string,
  formulas: PropTypes.array,
  frequency: PropTypes.string,
  loading: PropTypes.bool,
  match: PropTypes.object,
  name: PropTypes.string,
  onSideSheetClose: PropTypes.func,
  onToggleSideSheet: PropTypes.func,
  open: PropTypes.bool,
  sets: PropTypes.array,
  sideSheetOpen: PropTypes.bool,
};

export default withRouter(Compound);
