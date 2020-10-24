import React, { useEffect, useState, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import uniqBy from "lodash/uniqBy";
import groupBy from "lodash/groupBy";
import PropTypes from "prop-types";
import wretch from "wretch";
import {
  CircularProgress,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { InfoBox } from "@blsq/manager-ui";
import { useTranslation } from "react-i18next";
import matchSorter from "match-sorter";
import SimulationBlock from "./SimulationBlock";
import EmptySection from "../EmptySection";
import { fade } from "@material-ui/core/styles/colorManipulator";
import yellow from "@material-ui/core/colors/yellow";
const useStyles = makeStyles(theme => ({
  spaced: {
    marginTop: theme.spacing(4),
  },
  selected: {
    backgroundColor: fade(yellow[100], 0.5),
  },
  displayableOrgUnits: {
    marginBottom: "10px",
  },
}));

const SimulationBlocks = props => {
  let location = useLocation();
  let history = useHistory();

  const displayedOrgUnitInput =
    props.searchQuery.displayedOrgUnit || props.searchQuery.orgUnit || "";

  const [displayedOrgUnit, setDisplayedOrgUnit] = useState(
    displayedOrgUnitInput,
  );

  const [displayableOrgUnits, setDisplayableOrgUnits] = useState([]);
  const sets = (props.simulationResults || {}).invoices || [];

  // Placeholder to only display the selected org unit, in the future
  // the backend should do this filtering for us.
  const setsForOrgUnit = useMemo(() => {
    return sets.filter(
      ({ orgunit_ext_id }) => orgunit_ext_id === displayedOrgUnit,
    );
  }, [sets, displayedOrgUnit]);

  const setsByCode = groupBy(setsForOrgUnit, "code");

  const classes = useStyles();
  const { t } = useTranslation();
  useEffect(() => {
    if (props.simulationResults) {
      const orgunits = props.simulationResults.invoices.map(invoice => {
        return {
          id: invoice.orgunit_ext_id,
          name: invoice.orgunit_name,
        };
      });
      setDisplayableOrgUnits(uniqBy(orgunits, "id"));
    }
  }, [props.simulationResults]);

  // Placeholder before future split async fetch of Periodviews
  // At least now the list can be filtered by code from url params
  // Which mean we can link to that url from the set edit page
  // Ex:
  // ?sets=gestion_manuel,reduction_des_frais
  function getSetName(setKey) {
    return setKey.split("__")[setKey.split("__").length - 1];
  }

  const displayedSetCodes = (props.searchQuery.sets || "")
    .split(",")
    .filter(i => i);

  const setCodes = Object.keys(setsByCode);

  const filteredSets = useMemo(() => {
    if (!displayedSetCodes.length) return setCodes;
    return setCodes.filter(setKey => {
      return matchSorter(displayedSetCodes, getSetName(setKey), {
        threshold: matchSorter.rankings.CONTAINS,
      }).length;
    });
  }, [setCodes, displayedSetCodes, props.simulationResults]);

  if (!filteredSets.length && props.simulationResults) {
    return (
      <EmptySection>
        <Typography variant="h6">{t("simulation.ohNo")}</Typography>
        <InfoBox
          name="simulation-noSimulationForOrgUnit-warning"
          text={t("simulation.noSimulationForOrgUnit")}
          className={classes.spaced}
        />
        <Typography>
          {props.simulationResults.request.warnings} <br></br>
          {props.simulationResults.invoices.length == 0 &&
            "The org unit doesn't match the package groups"}
        </Typography>
      </EmptySection>
    );
  }
  return (
    <div>
      {displayableOrgUnits && displayableOrgUnits.length > 1 && (
        <Grid
          container
          className={classes.displayableOrgUnits}
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={2}
        >
          {displayableOrgUnits.map(ou => (
            <Grid
              item
              key={"selector-" + ou.id}
              className={ou.id === displayedOrgUnit ? classes.selected : ""}
            >
              <Typography
                onClick={() => {
                  setDisplayedOrgUnit(ou.id);
                  let searchParams = new URLSearchParams(location.search);
                  searchParams.set("displayedOrgUnit", displayedOrgUnit);
                  history.push({
                    search: searchParams.toString(),
                    location: location.location,
                  });
                }}
              >
                {ou.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
      {filteredSets.map(key => (
        <SimulationBlock key={key} title={key} periodViews={setsByCode[key]} />
      ))}
    </div>
  );
};

SimulationBlocks.propTypes = {
  periodViews: PropTypes.array,
  resultUrl: PropTypes.string,
  simulationResults: PropTypes.object,
  searchQuery: PropTypes.any,
};

export default SimulationBlocks;
