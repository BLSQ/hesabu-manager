import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  makeStyles,
  withStyles,
  Typography,
} from "@material-ui/core";

import React, { Fragment, useState } from "react";
import PageContent from "../components/Shared/PageContent";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import TopBar from "../components/Shared/TopBar";
import InfoBox from "../components/Shared/InfoBox";
import SimulationList from "../components/Simulations/SimulationList";
import SimulationForm from "../components/Simulations/SimulationForm";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import SideSheet from "../components/SideSheet";

const styles = theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: 999,
  },
  drawer: {
    width: "200px",
    flexShrink: 0,
  },
  drawerPaper: {
    zIndex: 100,
    width: "200px",
    paddingLeft: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbarExtra: {
    marginBottom: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
});

const simulations = [
  {
    name: "SIGL BCZ FOSA Coherence, COSPRO - A.3 - Bureaux Administratifs",
    groupNames: ["BCZs"],
    createdAt: "2019-11-02T18:25:43.511Z",
    buildDuration: 240,
    period: "Q3 - 2019",
  },
  {
    name: "SIGL BCZ FOSA Coherence",
    groupNames: ["BCZs", "FOSAs"],
    createdAt: "2019-10-02T18:25:43.511Z",
    buildDuration: 108,
    period: "Q2 - 2019",
  },
  {
    name: "SIGL BCZ FOSA Coherence",
    groupNames: ["BCZs", "FOSAs"],
    createdAt: "2019-10-06T18:25:43.511Z",
    buildDuration: 53,
    period: "Q1 - 2018",
  },
];

const SimulationsContainer = props => {
  const { classes } = props;
  const { t } = useTranslation();
  const [sideSheetOpen, setSideSheetOpen] = useState(true);
  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
  };

  return (
    <Fragment>
      <TopBar>
        <Typography variant="h6" color="inherit">
          {t("drawerItems.simulations")}
        </Typography>
      </TopBar>
      <PageContent>
        <SimulationList simulations={simulations} />
      </PageContent>
      <SideSheet
        title={t("filtersSheet.title")}
        open={sideSheetOpen}
        onClose={handleToggleSideSheet}
      >
        <SimulationForm simulation={simulations[0]} />
      </SideSheet>
    </Fragment>
  );
};

const mapStateToProps = state => ({});

export default withTranslation("translations")(
  withStyles(styles)(connect(mapStateToProps)(SimulationsContainer)),
);
