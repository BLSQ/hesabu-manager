import {
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  makeStyles,
  ListItem,
} from "@material-ui/core";
import React, { Fragment } from "react";
import ExitIcon from "@material-ui/icons/ExitToApp";
import HelpIcon from "@material-ui/icons/HelpOutline";
import HomeIcon from "@material-ui/icons/Home";
import MaintenanceIcon from "@material-ui/icons/Settings";
import MapIcon from "@material-ui/icons/Layers";
import ThemeIcon from "@material-ui/icons/Palette";
import ProjectIcon from "@material-ui/icons/SettingsInputComponent";
import PublicationsIcon from "@material-ui/icons/SpeakerNotes";
import SectionIcon from "@material-ui/icons/ViewDay";
import { useTranslation } from "react-i18next";
import logoUrl from "../../images/logo-animated.svg";
import DrawerItem from "./DrawerItem";

const useStyles = makeStyles(theme => ({
  logo: {
    padding: `${theme.spacing(3)}px 0`,
    display: "flex",
    alignSelf: "flex-start",
    marginLeft: theme.spacing(3),
    height: 50,
  },
  exitBtn: {
    display: "flex",
    alignItems: "flex-end",
    flex: 1,
  },
}));

function DrawerItems() {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Fragment>
      <object
        type="image/svg+xml"
        data={logoUrl}
        className={classes.logo}
        aria-label="Dataviz logo"
      />
      <List>
        <DrawerItem to="/homepage" className="menu-homepage">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={t("drawerItems.homepage")} />
        </DrawerItem>
      </List>
      <List className={classes.exitBtn}>
        <ListItem
          className="back-to-dhis2"
          onClick={() => (window.location = "/")}
          href="/"
          component="a"
          button
        >
          <ListItemIcon>
            <ExitIcon />
          </ListItemIcon>
          <ListItemText primary={t("tooltips.backToDhis2")} />
        </ListItem>
      </List>
    </Fragment>
  );
}

export default DrawerItems;
