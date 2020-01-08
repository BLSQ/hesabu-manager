import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import React, { Component, Fragment } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { receiveProject, requestProject } from "./actions/project";

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

const LoadableSetsContainer = Loadable({
  loader: () => import("./containers/SetsContainer"),
  loading: RouteLoading,
});

const LoadableSetsGroupsContainer = Loadable({
  loader: () => import("./containers/SetsGroupsContainer"),
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

class App extends Component {
  constructor(props) {
    super(props);
    registerServiceWorker(store);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    if (!this.props.project.id) {
      this.props.requestProject();
      externalApi()
        .errorType("json")
        .url("/project")
        .get()
        .json(response => {
          setTimeout(() => {
            const attrs = response.data.attributes;
            delete response.data.attributes;
            this.props.receiveProject({
              ...response.data,
              ...attrs,
            });
            this.setState({ visible: true });
          }, 300);
        });
    }
  }

  render() {
    const {
      classes,
      location: { pathname },
    } = this.props;

    return (
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
                {this.props.project.id && (
                  <Fragment>
                    <SnackBarContainer />
                    <Fade in={this.state.visible}>
                      <div className={classes.root}>
                        <ResponsiveDrawers
                          handleDrawerToggle={() => this.props.toggleDrawer()}
                          open={this.props.drawerOpen}
                        />
                        {pathname === "/" && <Redirect to="/sets" />}
                        {/* AB: Make this relate to drawer items? */}
                        <Switch>
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
                            path="/sets_groups"
                            component={LoadableSetsGroupsContainer}
                          />
                          <Route
                            path="/sets_groups/:setsGroupId"
                            component={LoadableSetsGroupsContainer}
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
                            path="/help"
                            component={LoadableSetsContainer}
                          />
                        </Switch>
                      </div>
                    </Fade>
                  </Fragment>
                )}
              </SnackbarProvider>
            </MuiThemeProvider>
          </MuiPickersUtilsProvider>
        </CookiesProvider>
      </I18nextProvider>
    );
  }
}

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
