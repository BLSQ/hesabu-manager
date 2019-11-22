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
import FiltersToggleBtn from "../components/FiltersToggleBtn";

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

const SimulationsContainer = props => {
  const { classes, simulations } = props;
  const { t } = useTranslation();
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);

  return (
    <Fragment>
      <TopBar>
        <Typography variant="h6" color="inherit">
          {t("drawerItems.simulations")}
        </Typography>
        <FiltersToggleBtn
          variant="filters"
          className={classes.filtersBtn}
          onClick={handleToggleSideSheet}
        />
      </TopBar>
      <PageContent>
        <SimulationList simulations={simulations} />
      </PageContent>
      <SideSheet
        title={t("filtersSheet.title")}
        open={sideSheetOpen}
        onClose={handleToggleSideSheet}
      >
        <p>Here will be content to filter the left side of the screen. Similar to sets.</p>
      </SideSheet>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  simulations: [
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
  ]
});

export default withTranslation("translations")(
  withStyles(styles)(connect(mapStateToProps)(SimulationsContainer)),
);
