import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTranslation } from "react-i18next";
import { InfoBox } from "@blsq/manager-ui";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";
import EmptySection from "../../EmptySection";

const SimulationResultStatus = props => {
  const { simulation, errorMessage, newSim } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  if (simulation && simulation.attributes.status === "enqueued") {
    return (
      <EmptySection resourceName={t("resources.simulation")}>
        <Typography variant="h6">
          {t("simulationResultStatus.enqueued.title")}
        </Typography>
        <Typography variant="body2">
          {t("simulationResultStatus.enqueued.subtitle")}
        </Typography>
        <CircularProgress className={classes.spaced} />
      </EmptySection>
    );
  }
  if (simulation && simulation.attributes.status === "errored") {
    return (
      <EmptySection resourceName={t("resources.simulation")}>
        <Typography variant="h6">
          {t("simulationResultStatus.errored.title")}
        </Typography>
        <InfoBox
          name="simulation-generation-error-notice"
          dismissable={false}
          className={classes.spaced}
        >
          {simulation.attributes.lastError}
        </InfoBox>
      </EmptySection>
    );
  }
  if (newSim) {
    return (
      <EmptySection resourceName={t("resources.simulation")} variant="happy">
        <Typography variant="h6">
          {t("simulationResultStatus.new.title")}
        </Typography>
      </EmptySection>
    );
  }
  if (!simulation && errorMessage) {
    return (
      <EmptySection resourceName={t("resources.simulation")}>
        <Typography variant="h6">
          {t("simulationResultStatus.errored.title")}
        </Typography>
        <InfoBox
          name="simulation-request-error-notice"
          dismissable={false}
          className={classes.spaced}
        >
          {errorMessage}
        </InfoBox>
      </EmptySection>
    );
  }
  return null;
};

SimulationResultStatus.propTypes = {
  errorMessage: PropTypes.string,
  simulation: PropTypes.object,
};

export default SimulationResultStatus;
