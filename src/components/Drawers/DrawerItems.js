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
import { HesabuLogo, NestedAccordionMenu } from "@blsq/manager-ui";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

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

function DrawerItems(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  // TODO: Move this to separate file, and use them into the props here.
  const items = [
    {
      name: t("drawerItems.sets"),
      to: "/sets",
      Icon: ListIcon,
    },
    {
      name: t("drawerItems.setsGroups"),
      to: "/sets_groups",
      Icon: FunctionsIcon,
    },
    {
      name: t("drawerItems.simulations"),
      to: "/simulations",
      Icon: SyncIcon,
    },
    {
      name: t("drawerItems.help"),
      to: "/help",
      Icon: HelpIcon,
    },
  ];
  return (
    <Fragment>
      <HesabuLogo className={classes.logo} />
      <NestedAccordionMenu
        items={items}
        currentPath={props.location.pathname}
        link={Link}
      />
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

DrawerItems.propTypes = {
  location: PropTypes.object,
};

export default withRouter(DrawerItems);
