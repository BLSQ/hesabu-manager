import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { connect } from "react-redux";
import { FormControl, MenuItem, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import SimpleSelect from "../Shared/SimpleSelect";

export const SimulationFilters = props => {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    values: { periods, orgUnit },
    loading,
  } = props;

  const initialValues = {
    periods,
    orgUnit,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        history.push(`/simulation?${queryString.stringify(values)}`);
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <SimpleSelect
              name="periods"
              onChange={handleChange}
              value={values.periods}
            >
              {props.availablePeriods.map(period => (
                <MenuItem key={`filers-item-${period}`} value={period}>
                  {period}
                </MenuItem>
              ))}
            </SimpleSelect>
          </div>
          <FormControl tag="div">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? t("buttons.loading") : t("buttons.submit")}
            </Button>
          </FormControl>
        </form>
      )}
    </Formik>
  );
};

SimulationFilters.propTypes = {
  availablePeriods: PropTypes.array,
  loading: PropTypes.bool,
  values: PropTypes.object,
};

// TODO import that from project state
const mapStateToProps = () => ({
  availablePeriods: ["2016Q1", "2018Q1", "2018Q3", "2019Q2"],
  orgUnits: [],
  sets: [],
});

export default connect(mapStateToProps)(SimulationFilters);
