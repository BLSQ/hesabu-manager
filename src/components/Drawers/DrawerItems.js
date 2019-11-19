import {
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
import SyncIcon from "@material-ui/icons/Sync";
import { useTranslation } from "react-i18next";
import { HesabuLogo } from "@blsq/manager-ui";
import DrawerItem from "./DrawerItem";

const useStyles = makeStyles(theme => ({
  logo: {
    height: 40,
    margin: theme.spacing(2),
    alignSelf: "flex-start",
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
  // TODO: Move this to separate file, and use them into the props here.
  const items = [
    {
      title: t("drawerItems.sets"),
      route: "/sets",
      icon: <ListIcon />,
      class: "menu-sets",
    },
    {
      title: t("drawerItems.setsGroups"),
      route: "/sets_groups",
      icon: <FunctionsIcon />,
      class: "menu-sets-groups",
    },
    {
      title: t("drawerItems.simulations"),
      route: "/simulations",
      icon: <SyncIcon />,
      class: "menu-simulations",
    },
    {
      title: t("drawerItems.help"),
      route: "/help",
      icon: <HelpIcon />,
      class: "menu-help",
    },
  ];
  return (
    <Fragment>
      <HesabuLogo className={classes.logo} />
      <List>
        {items.map((item, i) => (
          <DrawerItem
            key={`${i}-drawer-item`}
            to={item.route}
            className={item.class}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
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
