import {
  Divider,
  Grid,
  makeStyles,
  withStyles,
  Typography,
} from "@material-ui/core";

import React, { Fragment } from "react";
import PageContent from "../components/Shared/PageContent";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import TopBar from "../components/Shared/TopBar";
import InfoBox from "../components/Shared/InfoBox";
import SetList from "../components/Sets/SetList";

import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
}));

const sets = [
  {
    name: "SIGL BCZ FOSA Coherence",
    groupNames: ["BCZs", "FOSAs"],
    description: "Quantity consumed FOSA BCZ, Quantity lost adjusted FOSA Bcz",
  },
  {
    name: "SIGL BCZ FOSA Coherence",
    groupNames: ["BCZs", "FOSAs"],
  },
  {
    name: "SIGL BCZ FOSA Coherence",
    groupNames: ["FOSAs"],
    description: "Small",
  },
];

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
            <InfoBox>
              Sets are the blocks of your final report. Each set will output <strong>one or two tables</strong> depending on the type.

              If you want to make computations with data from multiple sets, create project formulas and they will appear at the end of your report. At any moment, you can see a representation of the report in the <strong>simulations page</strong>.
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
  connect(mapStateToProps)(SetsContainer)
);
