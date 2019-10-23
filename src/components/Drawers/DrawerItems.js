import {
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  makeStyles,
  ListItem,
} from "@material-ui/core";
import React, { Fragment } from "react";
import ListIcon from "@material-ui/icons/List";
import FunctionsIcon from "@material-ui/icons/Functions";
import ExitIcon from "@material-ui/icons/ExitToApp";
import HelpIcon from "@material-ui/icons/HelpOutline";
import HomeIcon from "@material-ui/icons/Home";
import SyncIcon from "@material-ui/icons/Sync";
import MaintenanceIcon from "@material-ui/icons/Settings";
import ThemeIcon from "@material-ui/icons/Palette";
import ProjectIcon from "@material-ui/icons/SettingsInputComponent";
import PublicationsIcon from "@material-ui/icons/SpeakerNotes";
import SectionIcon from "@material-ui/icons/ViewDay";
import { useTranslation } from "react-i18next";
import logoUrl from "../../images/logo-hesabu.svg";
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
  // AB: Can I make this into constants?
  const items = [
    {
      title: t("drawerItems.sets"),
      route: "/sets",
      icon: <ListIcon />,
      class: "menu-sets"
    },
    {
      title: t("drawerItems.sets_groups"),
      route: "/sets_groups",
      icon: <FunctionsIcon />,
      class: "menu-sets-groups"
    },
    {
      title: t("drawerItems.simulations"),
      route: "/simulations",
      icon: <SyncIcon />,
      class: "menu-simulations"
    },
    {
      title: t("drawerItems.help"),
      route: "/help",
      icon: <HelpIcon />,
      class: "menu-help"
    },
  ];
  return (
    <Fragment>
      <object
        type="image/svg+xml"
        data={logoUrl}
        className={classes.logo}
        aria-label="Hesabu logo"
      />
      <List>
        {items.map( (object,i) => (
          <DrawerItem to={object.route} className={object.class}>
            <ListItemIcon>
              {object.icon}
            </ListItemIcon>
            <ListItemText primary={object.title} />
          </DrawerItem>
        ))}
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
