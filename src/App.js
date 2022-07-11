import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import React, { Component, Fragment } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { receiveProject, requestProject } from "./actions/project";
import PropTypes from "prop-types";
import DateFnsUtils from "@date-io/date-fns";
import Fade from "@material-ui/core/Fade";
import { I18nextProvider } from "react-i18next";
import Loadable from "react-loadable";
import SnackBarContainer from "./components/SnackBar/SnackBarContainer";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import ResponsiveDrawers from "./components/Drawers/ResponsiveDrawers";
import RouteLoading from "./components/Shared/RouteLoading";
import { SnackbarProvider } from "notistack";
import { connect } from "react-redux";
import { externalApi } from "./actions/api";
import i18n from "./lib/i18n";
import theme from "./utils/theme";
import { toggleDrawer } from "./actions/ui";
import store from "./store";
import registerServiceWorker from "./registerServiceWorker";
import { CookiesProvider } from "react-cookie";
import keymap from "./lib/shortcuts";
import { ShortcutManager, Shortcuts } from "react-shortcuts";
import HomeTour from "./components/HomeTour";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const shortcutManager = new ShortcutManager(keymap);

const LoadableSetsContainer = Loadable({
  loader: () => import("./containers/SetsContainer"),
  loading: RouteLoading,
});

const LoadableCompoundsContainer = Loadable({
  loader: () => import("./containers/CompoundsContainer"),
  loading: RouteLoading,
});

const LoadableSimulationContainer = Loadable({
  loader: () => import("./containers/SimulationContainer"),
  loading: RouteLoading,
});

const LoadableSimulationsContainer = Loadable({
  loader: () => import("./containers/SimulationsContainer"),
  loading: RouteLoading,
});

const LoadableHelpContainer = Loadable({
  loader: () => import("./containers/HelpContainer"),
  loading: RouteLoading,
});

const LoadableFormulaContainer = Loadable({
  loader: () => import("./containers/FormulaContainer"),
  loading: RouteLoading,
});

const LoadableFirstSetupContainer = Loadable({
  loader: () => import("./containers/FirstSetupContainer"),
  loading: RouteLoading,
});

const styles = () => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    minHeight: "100vh",
  },
});

const queryClient = new QueryClient();

class App extends Component {
  constructor(props) {
    super(props);
    registerServiceWorker(store);
    this.state = {
      visible: false,
    };
  }

  getChildContext() {
    return { shortcuts: shortcutManager };
  }

  handleShortcuts = action => {
    const { history } = this.props;

    switch (action) {
      case "GO_TO_SETS":
        history.push("/sets");
        break;
      case "GO_TO_SETS_GROUPS":
        history.push("/compounds");
        break;
      case "GO_TO_SIMULATIONS":
        history.push("/simulations");
        break;
      case "GO_TO_SIMULATION":
        history.push("/simulation");
        break;
      default:
        return false;
    }
  };

  componentDidMount() {
    if (!this.props.project.id) {
      this.props.requestProject();
      externalApi()
        .errorType("json")
        .url("/project")
        .get()
        .json(response => {
          const attrs = response.data.attributes;
          delete response.data.attributes;
          this.props.receiveProject({
            ...response.data,
            ...attrs,
          });
          this.setState({ visible: true });
        });
    }
  }

  render() {
    const {
      classes,
      location: { pathname },
    } = this.props;

    return (
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <CookiesProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <MuiThemeProvider theme={theme}>
                <SnackbarProvider
                  dense
                  maxSnack={2}
                  autoHideDuration={3000}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                >
                  <Shortcuts
                    name="APP"
                    global
                    handler={this.handleShortcuts}
                    targetNodeSelector="body"
                  >
                    {this.props.project.id && (
                      <Fragment>
                        <SnackBarContainer />
                        <HomeTour />
                        <Fade in={this.state.visible}>
                          <div className={classes.root}>
                            <ResponsiveDrawers
                              handleDrawerToggle={() =>
                                this.props.toggleDrawer()
                              }
                              open={this.props.drawerOpen}
                            />
                            {pathname === "/" && <Redirect to="/sets" />}
                            {/* AB: Make this relate to drawer items? */}
                            <Switch>
                              <Route
                                exact
                                path="/sets/:setId/zone_topic_formulas/:formulaId"
                                component={LoadableFormulaContainer}
                              />
                              <Route
                                exact
                                path="/sets/:setId/children_formulas/:formulaId"
                                component={LoadableFormulaContainer}
                              />
                              <Route
                                exact
                                path="/sets/:setId/topic_formulas/:formulaId"
                                component={LoadableFormulaContainer}
                              />
                              <Route
                                exact
                                path="/sets/:setId/zone_formulas/:formulaId"
                                component={LoadableFormulaContainer}
                              />
                              <Route
                                exact
                                path="/sets/:setId/set_formulas/:formulaId"
                                component={LoadableFormulaContainer}
                              />
                              <Route
                                exact
                                path="/sets"
                                component={LoadableSetsContainer}
                              />
                              <Route
                                path="/sets/:setId"
                                component={LoadableSetsContainer}
                              />
                              <Route
                                exact
                                path="/compounds"
                                component={LoadableCompoundsContainer}
                              />
                              <Route
                                path="/compounds/:compoundId/compound_formulas/:formulaId"
                                component={LoadableFormulaContainer}
                              />
                              <Route
                                path="/compounds/:compoundId/compound_formulas"
                                component={LoadableCompoundsContainer}
                              />
                              <Route
                                exact
                                path="/simulations"
                                component={LoadableSimulationsContainer}
                              />
                              <Route
                                path="/simulation"
                                component={LoadableSimulationContainer}
                              />
                              <Route
                                path="/first-setup"
                                component={LoadableFirstSetupContainer}
                              />
                              <Route
                                path="/help"
                                component={LoadableHelpContainer}
                              />
                            </Switch>
                          </div>
                        </Fade>
                      </Fragment>
                    )}
                  </Shortcuts>
                </SnackbarProvider>
              </MuiThemeProvider>
            </MuiPickersUtilsProvider>
          </CookiesProvider>
        </I18nextProvider>
      </QueryClientProvider>
    );
  }
}

App.childContextTypes = {
  shortcuts: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  drawerOpen: (state.ui || {}).drawerOpen,
  project: state.project,
  token: (state.api || {}).token,
});

export default withRouter(
  withStyles(styles)(
    connect(mapStateToProps, { toggleDrawer, requestProject, receiveProject })(
      App,
    ),
  ),
);
