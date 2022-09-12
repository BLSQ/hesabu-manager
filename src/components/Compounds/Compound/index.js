import React, { Fragment } from "react";
import { Typography, Dialog, Slide, CircularProgress } from "@material-ui/core";
import { useHistory, withRouter, Link, Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import TopBar from "../../Shared/TopBar";
import PageContent from "../../Shared/PageContent";
import FiltersToggleBtn from "../../FiltersToggleBtn";
import EditCompound from "./EditCompound";
import Tabs from "../../Shared/Tabs";
import CompoundFormulas from "./CompoundFormulas";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Compound = props => {
  const history = useHistory();
  const {
    compound,
    open,
    name,
    formulas,
    loading,
    errorMessage,
    onToggleSideSheet,
    match,
    sideSheetOpen,
    onSideSheetClose,
  } = props;
  const { t } = useTranslation();
  const tabConfigs = [
    {
      label: t("compound.tabs.compoundFormulas.label"),
      title: t("compound.tabs.compoundFormulas.tooltip"),
      to: `/compounds/${match.params.compoundId}/compound_formulas`,
      routeComponent: CompoundFormulas,
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
        <FiltersToggleBtn variant="info" onClick={onToggleSideSheet} />
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

            <Route
              key="formulas"
              path={`/compounds/${match.params.compoundId}/compound_formulas`}
              exact={true}
              component={() => (
                <CompoundFormulas
                  formulas={formulas}
                  compound={compound}
                  sideSheetOpen={sideSheetOpen}
                  onSideSheetClose={onSideSheetClose}
                />
              )}
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
      <PageContent fullscreen>
        {loading && <CircularProgress />}
        {errorMessage && <p>{errorMessage}</p>}
      </PageContent>
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
