import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import { toggleDrawer } from "../../actions/ui";
import { DRAWER_WIDTH } from "../../constants/ui";

const drawerWidth = DRAWER_WIDTH;

const useStyles = makeStyles(theme => ({
  root: props => ({
    marginLeft: props.fullscreen ? 0 : drawerWidth,
    zIndex: 999,
    [theme.breakpoints.up("md")]: {
      width: props.fullscreen ? "100%" : `calc(100% - ${drawerWidth}px)`,
    },
  }),
  branding: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  leftBtn: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function TopBar(props) {
  const { project, activeTab } = props;
  const classes = useStyles(props);
  const SectionTabs = props.tabs;
  const { t } = useTranslation();

  return (
    <AppBar className={classes.root} position="fixed">
      <Toolbar>
        {props.backLinkPath ? (
          <IconButton
            edge="start"
            component={Link}
            to={props.backLinkPath}
            color="inherit"
            aria-label={t("buttons.back")}
          >
            <BackIcon />
          </IconButton>
        ) : (
          <IconButton
            edge="start"
            className={classNames(classes.menuButton, classes.leftBtn)}
            color="inherit"
            aria-label="Menu"
            onClick={props.toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        )}
        <div className={classes.branding}>{props.children || project.name}</div>
      </Toolbar>
      {props.tabs && <SectionTabs activeTab={activeTab} {...props} />}
    </AppBar>
  );
}

const mapStateToProps = state => ({
  project: state.project && state.project.project,
});

export default connect(mapStateToProps, { toggleDrawer })(TopBar);
