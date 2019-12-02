import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MultiSelectDropdown from "../Shared/MultiSelectDropdown";
import { formattedName } from "../../utils/textUtils";

export const SimulationFilters = props => {
  // Renders the Filters of a simulation, a Simulation exists out of
  // multiple parts, this component will allow us to filter
  // those. Each part is identified by the combination:
  //
  //       - orgUnit
  //       - package
  //       - period
  //
  // It accepts callbacks for the `change` event, so the actual
  // hiding/showing is handled in a higher component.
  const { t } = useTranslation();

  return (
    <>
      <MultiSelectDropdown
        name={formattedName(t("resources.period", { count: 2 }))}
        items={props.allPeriods}
        selected={props.periods}
        optionsChanged={props.onPeriodsChanged}
        key="periods"
      />
      <MultiSelectDropdown
        name={formattedName(t("resources.orgUnit", { count: 2 }))}
        items={props.allOrgUnits}
        selected={props.orgUnits}
        optionsChanged={props.onOrgUnitsChanged}
        key="orgUnits"
      />
      <MultiSelectDropdown
        name={formattedName(t("resources.set", { count: 2 }))}
        items={props.allPackages}
        selected={props.packages}
        optionsChanged={props.onPackagesChanged}
        key="packages"
      />
    </>
  );
};

SimulationFilters.propTypes = {
  allPeriods: PropTypes.array.isRequired,
  allOrgUnits: PropTypes.array.isRequired,
  allPackages: PropTypes.array.isRequired,
  periods: PropTypes.array.isRequired,
  orgUnits: PropTypes.array.isRequired,
  packages: PropTypes.array.isRequired,
  onPeriodsChanged: PropTypes.func.isRequired,
  onOrgUnitsChanged: PropTypes.func.isRequired,
  onPackagesChanged: PropTypes.func.isRequired,
};

export default SimulationFilters;
