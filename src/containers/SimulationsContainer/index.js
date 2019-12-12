import { Typography } from "@material-ui/core";

import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PageContent from "../../components/Shared/PageContent";
import { withTranslation, useTranslation } from "react-i18next";
import TopBar from "../../components/Shared/TopBar";
import SimulationList from "../../components/Simulations/SimulationList";
import { useParams } from "react-router-dom";
import SideSheet from "../../components/SideSheet";
import FiltersToggleBtn from "../../components/FiltersToggleBtn";
import useStyles from "./styles";
import { formattedName } from "../../utils/textUtils";

const SimulationsContainer = props => {
  const { simulations } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const handleToggleSideSheet = () => setSideSheetOpen(!sideSheetOpen);

  return (
    <Fragment>
      <TopBar>
        <Typography variant="h6" color="inherit">
          {formattedName(t("resources.simulation_plural"))}
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
        <p>
          Here will be content to filter the left side of the screen. Similar to
          sets.
        </p>
      </SideSheet>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  simulations: [
    {
      id: "1",
      type: "invoicingJob",
      attributes: {
        orgUnit: "AOsKyLAjVWH",
        dhis2Period: "2016Q1",
        user: null,
        createdAt: "2019-11-21T08:51:41.010Z",
        processedAt: "2019-11-21T08:51:43.922Z",
        erroredAt: null,
        durationMs: 2872,
        status: "processed",
        lastError: null,
        sidekiqJobRef: null,
        isAlive: false,
        resultUrl: "http://localhost:4567/s3/results/1.json",
      },
    },
    {
      id: "2",
      type: "invoicingJob",
      attributes: {
        orgUnit: "BOsKyLAjVWH",
        dhis2Period: "2019Q2",
        user: null,
        createdAt: "2019-11-21T08:51:41.010Z",
        processedAt: "2019-11-21T08:51:43.922Z",
        erroredAt: null,
        durationMs: 2872,
        status: "processed",
        lastError: null,
        sidekiqJobRef: null,
        isAlive: false,
        resultUrl: "http://localhost:4567/s3/results/2.json",
      },
    },
    {
      id: "3",
      type: "invoicingJob",
      attributes: {
        orgUnit: "COsKyLAjVWH",
        dhis2Period: "2018Q1",
        user: null,
        createdAt: "2019-11-21T08:51:41.010Z",
        processedAt: null,
        erroredAt: "2019-11-21T08:51:43.922Z",
        durationMs: 2872,
        status: "processed",
        lastError:
          "Failed to open TCP connection to dhis.example.com:80 (getaddrinfo: nodename nor servname provided, or not known)",
        sidekiqJobRef: null,
        isAlive: false,
        resultUrl: null,
      },
    },
  ],
});

export default withTranslation("translations")(
  connect(mapStateToProps)(SimulationsContainer),
);
