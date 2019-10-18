import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import React, { Component, Fragment } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { receiveProject, requestProject } from "./actions/project";

import DateFnsUtils from "@date-io/date-fns";
import Fade from "@material-ui/core/Fade";
import { I18nextProvider } from "react-i18next";
import Loadable from "react-loadable";
import LoadingScreen from "./components/LoadingScreen";
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
import { setLocaleFromProject } from "./lib/setLocaleFromProject";
import store from "./store";
import registerServiceWorker from "./registerServiceWorker";
import { CookiesProvider } from "react-cookie";

const LoadableHomepageContainer = Loadable({
  loader: () => import("./containers/HomepageContainer"),
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
      visible: true,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (false) {
      this.props.requestProject();
      externalApi()
        .errorType("json")
        .url("/project")
        .get()
        .json(project => {
          setTimeout(() => {
            this.props.receiveProject(project);
            setLocaleFromProject(project);
            this.setState({ visible: true });
          }, 300);
        });
    }
  }

  render() {
    const {
      classes,
      project,
      token,
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
                <Fragment>
                  <SnackBarContainer />
                  <Fade in={this.state.visible}>
                    <div className={classes.root}>
                      <ResponsiveDrawers
                        handleDrawerToggle={() => this.props.toggleDrawer()}
                        open={this.props.drawerOpen}
                      />
                      {pathname === "/" && <Redirect to="/homepage" />}
                      <Switch>
                        <Route
                          path="/homepage"
                          component={LoadableHomepageContainer}
                        />
                      </Switch>
                    </div>
                  </Fade>
                </Fragment>
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
  project: (state.project || {}).project,
  token: (state.api || {}).token,
});

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      { toggleDrawer, requestProject, receiveProject },
    )(App),
  ),
);
