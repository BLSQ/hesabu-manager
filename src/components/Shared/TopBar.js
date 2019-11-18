import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  withStyles,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import PreviewIcon from "@material-ui/icons/RemoveRedEye";
import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { toggleDrawer } from "../../actions/ui";
import { DRAWER_WIDTH } from "../../constants/ui";

const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
  root: {
    marginLeft: drawerWidth,
    zIndex: 999,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  branding: {
    flexGrow: 1,
    display: "flex",
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});

function TopBar(props) {
  const { classes, project, activeTab, t } = props;
  const SectionTabs = props.tabs;
  return (
    <AppBar className={classes.root} position="fixed">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={props.toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.branding}>{props.children || project.name}</div>

        <Tooltip title={t("tooltips.viewPortal")}>
          <IconButton
            className="view-portal-button"
            color="inherit"
            aria-label={t("tooltips.viewPortal")}
            onClick={() => window.open(`http://${project.domain}`)}
          >
            <PreviewIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      {props.tabs && <SectionTabs activeTab={activeTab} />}
    </AppBar>
  );
}

const mapStateToProps = state => ({
  project: state.project && state.project.project,
});
export default withTranslation("translations")(
  withStyles(styles)(
    connect(
      mapStateToProps,
      { toggleDrawer },
    )(TopBar),
  ),
);
