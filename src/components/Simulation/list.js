import { Grid, withStyles, Typography } from "@material-ui/core";
import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import humanize from "string-humanize";
import PropTypes from "prop-types";
import some from "lodash/some";
import uniqWith from "lodash/uniqWith";
import MultiSelectDropdown from "../Shared/MultiSelectDropdown";
import { SimulationPart } from "./SimulationPart";
import TopBar from "../Shared/TopBar";
import PageContent from "../Shared/PageContent";

const styles = theme => ({});

const mapPeriods = invoices => {
  const all = invoices.map(invoice => ({
    key: invoice.period,
    human: humanize(invoice.period),
  }));
  return uniqWith(all, (a, b) => a.key === b.key);
};

const mapPackages = invoices => {
  const all = invoices.map(invoice => ({
    key: invoice.code,
    human: humanize(invoice.code),
  }));

  return uniqWith(all, (a, b) => a.key === b.key);
};

const mapOrgunits = invoices => {
  const all = invoices.map(invoice => ({
    key: invoice.orgunit_ext_id,
    human: invoice.orgunit_name,
  }));

  return uniqWith(all, (a, b) => a.key === b.key);
};

const SimulationList = props => {
  const { simulations } = props;
  const allPeriods = mapPeriods(simulations);
  const allPackages = mapPackages(simulations);
  const allOrgUnits = mapOrgunits(simulations);

  const [periods, setPeriods] = useState([]);
  const [packages, setPackages] = useState([]);
  const [orgUnits, setOrgUnits] = useState([]);

  // Set default selection
  if (orgUnits.length < 1 && allOrgUnits.length > 0) {
    setOrgUnits([allOrgUnits[0]]);
  }
  if (periods.length < 1 && allPeriods.length > 0) setPeriods(allPeriods);
  if (packages.length < 1 && allPackages.length > 0) setPackages(allPackages);

  const filteredSimulations = simulations.filter(simulation => {
    return (
      some(periods, ["key", simulation.period]) &&
        some(packages, ["key", simulation.code]) &&
        some(orgUnits, ["key", simulation.orgunit_ext_id])
    );
  });

  const periodsChanged = periodKeys => {
    const selectedPeriods = allPeriods.filter(item =>
      periodKeys.includes(item.key),
    );
    setPeriods(selectedPeriods);
  };

  const packagesChanged = packageKeys => {
    const selectedPackages = allPackages.filter(item =>
      packageKeys.includes(item.key),
    );
    setPackages(selectedPackages);
  };

  const orgUnitsChanged = orgUnitKeys => {
    const selectedOrgUnits = allOrgUnits.filter(item =>
      orgUnitKeys.includes(item.key),
    );
    setOrgUnits(selectedOrgUnits);
  };

  return (
      <Fragment>
        <PageContent>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              <Grid
                container
                key="selection-grid"
                direction="row"
                justify="space-between"
                alignItems="flex-start"
              >
                <MultiSelectDropdown
                  name="Periods"
                  items={allPeriods}
                  selected={periods}
                  optionsChanged={periodsChanged}
                  key="periods"
                />
                <MultiSelectDropdown
                  name="Org Units"
                  items={allOrgUnits}
                  selected={orgUnits}
                  optionsChanged={orgUnitsChanged}
                  key="orgUnits"
                />
                <MultiSelectDropdown
                  name="Packages"
                  items={allPackages}
                  selected={packages}
                  optionsChanged={packagesChanged}
                  key="packages"
                />
              </Grid>
              {filteredSimulations.map((simulation, i) => {
                const key = [
                  simulation.orgunit_ext_id,
                  simulation.period,
                  simulation.code,
                ].join("-");
                return <SimulationPart key={key} simulation={simulation} />;
              })}
            </Grid>
          </Grid>
        </PageContent>
      </Fragment>
  );
};

const mapStateToProps = state => ({});
SimulationList.propTypes = {
  simulations: PropTypes.array,
};

export default withTranslation("translations")(
  withStyles(styles)(connect(mapStateToProps)(SimulationList)),
);
