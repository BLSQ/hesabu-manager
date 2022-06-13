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
import { useSelector } from "react-redux";
import ExitIcon from "@material-ui/icons/ExitToApp";
import HelpIcon from "@material-ui/icons/HelpOutline";
import SyncIcon from "@material-ui/icons/Sync";
import ReceiptIcon from "@material-ui/icons/Receipt";
import { useTranslation } from "react-i18next";
import { HesabuLogo, NestedAccordionMenu } from "@blsq/manager-ui";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Api from "../../lib/Api";
import { formattedName } from "../../utils/textUtils";

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
      name: formattedName(t("resources.set_plural")),
      to: "/sets",
      Icon: ListIcon,
    },
    {
      name: formattedName(t("resources.compound_plural")),
      to: "/compounds",
      Icon: FunctionsIcon,
    },
    {
      name: formattedName(t("resources.simulation_plural")),
      to: "/simulations",
      Icon: SyncIcon,
    },
    {
      name: formattedName(t("drawerItems.help.main")),
      to: "/help",
      Icon: HelpIcon,
      items: [
        {
          name: formattedName(t("drawerItems.help.shortcuts")),
          to: "/help/shortcuts",
        },
        {
          name: formattedName(t("drawerItems.help.first_setup")),
          to: "/first-setup",
        },
      ],
    },
  ];
  const apiConfig = useSelector(state => state.api);
  const linkToInvoiceApp = `/../../..${apiConfig.invoiceAppPath}`;
  return (
    <Fragment>
      <HesabuLogo className={classes.logo} />
      <NestedAccordionMenu
        items={items}
        currentPath={props.location.pathname}
        link={Link}
      />
      <List>
        <ListItem
          className="invoice-app"
          href={linkToInvoiceApp}
          component="a"
          button
        >
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary={"Invoice App"} />
        </ListItem>
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

DrawerItems.propTypes = {
  location: PropTypes.object,
};

export default withRouter(DrawerItems);
