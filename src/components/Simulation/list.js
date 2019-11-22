import {
  Grid,
  withStyles,
  Typography,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import humanize from "string-humanize";
import PropTypes from "prop-types";
import some from "lodash/some";
import uniqWith from "lodash/uniqWith";
import MultiSelectDropdown from "../Shared/MultiSelectDropdown";
import { Simulation } from "./index";
import TopBar from "../Shared/TopBar";
import PageContent from "../Shared/PageContent";

const styles = theme => ({
});

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

class SimulationList extends React.Component {
  constructor(props) {
    super(props);
    const periods = mapPeriods(props.simulations);
    const packages = mapPackages(props.simulations);
    const orgunits = mapOrgunits(props.simulations);
    this.state = {
      periods,
      allPeriods: periods,
      packages,
      allPackages: packages,
      orgUnits: [orgunits[0]],
      allOrgUnits: orgunits,
    };
  }

  periodsChanged = periodKeys => {
    const selectedPeriods = this.state.allPeriods.filter(item =>
      periodKeys.includes(item.key),
    );
    this.setState({ periods: selectedPeriods });
  };

  packagesChanged = packageKeys => {
    const selectedPackages = this.state.allPackages.filter(item =>
      packageKeys.includes(item.key),
    );
    this.setState({ packages: selectedPackages });
  };

  orgUnitsChanged = orgUnitKeys => {
    const selectedOrgUnits = this.state.allOrgUnits.filter(item =>
      orgUnitKeys.includes(item.key),
    );
    this.setState({ orgUnits: selectedOrgUnits });
  };

  render() {
    const {
      allPeriods,
      periods,
      allPackages,
      packages,
      allOrgUnits,
      orgUnits,
    } = this.state;

    const { simulations } = this.props;
    const name = simulations[0].code;
    const formatted_date = simulations[0].period;
    const nameWithDate = `${name}-${formatted_date}`;
    const filteredSimulations = simulations.filter(simulation => {
      return (
        some(periods, ["key", simulation.period]) &&
        some(packages, ["key", simulation.code]) &&
        some(orgUnits, ["key", simulation.orgunit_ext_id])
      );
    });
    return (
      <Fragment>
        <TopBar>
          <Typography variant="h6" color="inherit">
            {nameWithDate}
          </Typography>
        </TopBar>
        <PageContent>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              <Grid container key="selection-grid"
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
              >
                <MultiSelectDropdown
                  name="Periods"
                  items={allPeriods}
                  selected={periods}
                  optionsChanged={this.periodsChanged}
                  key="periods"
                />
                <MultiSelectDropdown
                  name="Org Units"
                  items={allOrgUnits}
                  selected={orgUnits}
                  optionsChanged={this.orgUnitsChanged}
                  key="orgUnits"
                />
                <MultiSelectDropdown
                  name="Packages"
                  items={allPackages}
                  selected={packages}
                  optionsChanged={this.packagesChanged}
                  key="packages"
                />
              </Grid>
              {filteredSimulations.map((simulation, i) => {
                const key = [simulation.orgunit_ext_id, simulation.period, simulation.code].join("-");
                return <Simulation key={key} simulation={simulation} />;
              })}
            </Grid>
          </Grid>
        </PageContent>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});
SimulationList.propTypes = {
  simulations: PropTypes.array
};

export default withTranslation("translations")(
  withStyles(styles)(
    connect(mapStateToProps)(SimulationList)
  )
);
