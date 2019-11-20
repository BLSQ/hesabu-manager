import {
  Grid,
  Typography,
} from "@material-ui/core";

import React, { Fragment } from "react";
import { connect } from "react-redux";
import PageContent from "../components/Shared/PageContent";
import { withTranslation , useTranslation } from "react-i18next";
import TopBar from "../components/Shared/TopBar";
import SetList from "../components/Sets/SetList";
import { InfoBox } from '@blsq/manager-ui'
import { classes } from "istanbul-lib-coverage";
import { makeStyles } from "@material-ui/styles";

// #TODO: Fetch via Api
const sets = [
  {
    name: "SIGL BCZ FOSA Coherence",
    groupNames: ["BCZs", "FOSAs"],
    description: "Quantity consumed FOSA BCZ, Quantity lost adjusted FOSA Bcz",
  },
  {
    name: "SIGL BCZ FOSA Coherence",
    groupNames: ["BCZs", "FOSAs"],
    description: "Quantity consumed FOSA BCZ, Quantity lost adjusted FOSA Bcz",
  },
  {
    name: "SIGL BCZ FOSA Coherence",
    groupNames: ["FOSAs"],
    description: "Quantity consumed FOSA BCZ, Quantity lost adjusted FOSA Bcz",
  },
];

const useStyles = makeStyles(theme => ({
  infoBox: {
    marginBottom: theme.spacing(4)
  }
}))

const SetsContainer = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Fragment>
      <TopBar>
        <Typography variant="h6" color="inherit">
          {t("drawerItems.sets")}
        </Typography>
      </TopBar>
      <PageContent>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <InfoBox className={classes.infoBox}>
              Sets are the blocks of your final report. Each set will output{" "}
              <strong>one or two tables</strong> depending on the type. If you
              want to make computations with data from multiple sets, create
              project formulas and they will appear at the end of your report.
              At any moment, you can see a representation of the report in the{" "}
              <strong>simulations page</strong>.
            </InfoBox>
            <SetList sets={sets} />
          </Grid>
        </Grid>
      </PageContent>
    </Fragment>
  );
};

const mapStateToProps = state => ({});

export default withTranslation("translations")(
  connect(mapStateToProps)(SetsContainer),
);
