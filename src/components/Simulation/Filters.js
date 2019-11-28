import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
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

  const {
    allPeriods,
    periods,
    periodsChanged,
    allOrgUnits,
    orgUnits,
    orgUnitsChanged,
    allPackages,
    packages,
    packagesChanged,
    t,
  } = props;

  return (
    <>
      <MultiSelectDropdown
        name={formattedName(t("resources.period", { count: 2 }))}
        items={allPeriods}
        selected={periods}
        optionsChanged={periodsChanged}
        key="periods"
      />
      <MultiSelectDropdown
        name={formattedName(t("resources.orgUnit", { count: 2 }))}
        items={allOrgUnits}
        selected={orgUnits}
        optionsChanged={orgUnitsChanged}
        key="orgUnits"
      />
      <MultiSelectDropdown
        name={formattedName(t("resources.set", { count: 2 }))}
        items={allPackages}
        selected={packages}
        optionsChanged={packagesChanged}
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
  periodsChanged: PropTypes.func.isRequired,
  orgUnitsChanged: PropTypes.func.isRequired,
  packagesChanged: PropTypes.func.isRequired,
};

export default withTranslation("translations")(SimulationFilters);
