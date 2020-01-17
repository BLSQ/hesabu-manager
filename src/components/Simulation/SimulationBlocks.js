import React, { useEffect, useState } from "react";
import groupBy from "lodash/groupBy";
import PropTypes from "prop-types";
import wretch from "wretch";
import { CircularProgress, Typography, makeStyles } from "@material-ui/core";
import { InfoBox } from "@blsq/manager-ui";
import { useTranslation } from "react-i18next";
import SimulationBlock from "./SimulationBlock";
import EmptySection from "../EmptySection";

const useStyles = makeStyles(theme => ({
  spaced: {
    marginTop: theme.spacing(4),
  },
}));

const SimulationBlocks = props => {
  const [data, setData] = useState(undefined);
  // #TODO add some loading states
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const setsByCode = groupBy((data || {}).invoices, "code");

  const classes = useStyles();
  const { t } = useTranslation();
  useEffect(() => {
    setLoading(true);
    wretch()
      .errorType("json")
      .options({ encoding: "same-origin" }, false)
      .url(props.resultUrl)
      .get()
      .json(response => {
        setLoading(false);
        setData(response);
        setError(null);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
        setData(undefined);
      });
  }, [props.resultUrl]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Placeholder before future split async fetch of Periodviews
  // At least now the list can be filtered by code from url params
  // Which mean we can link to that url from the set edit page
  // Ex:
  // ?sets=gestion_manuel,reduction_des_frais
  function getSetName(setKey) {
    return setKey.split("__")[setKey.split("__").length - 1];
  }
  const displayedSetCodes = props.searchQuery.sets || [];

  const sets = Object.keys(setsByCode);

  const filteredSets = displayedSetCodes.length
    ? sets.filter(setKey => displayedSetCodes.includes(getSetName(setKey)))
    : sets;

  if (!filteredSets.length) {
    return (
      <EmptySection>
        <Typography variant="h6">{t("simulation.ohNo")}</Typography>
        <InfoBox
          text={t("simulation.noSimulationForOrgUnit")}
          className={classes.spaced}
        />
      </EmptySection>
    );
  }
  return (
    <div>
      {filteredSets.map(key => (
        <SimulationBlock key={key} title={key} periodViews={setsByCode[key]} />
      ))}
    </div>
  );
};

SimulationBlocks.propTypes = {
  periodViews: PropTypes.array,
};

export default SimulationBlocks;
