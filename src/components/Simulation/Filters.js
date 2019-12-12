import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { connect } from "react-redux";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import MultiSelectDropdown from "../Shared/MultiSelectDropdown";
import { formattedName } from "../../utils/textUtils";
import SimpleSelect from "../Shared/SimpleSelect";

export const SimulationFilters = props => {
  const { t } = useTranslation();
  const history = useHistory();
  const { periods, orgUnit, sets } = props.values;

  const initialValues = {
    periods,
    orgUnit,
    set: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        history.push(`/simulation?${queryString.stringify(values)}`);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <SimpleSelect
            name="periods"
            onChange={handleChange}
            value={values.periods}
          >
            {props.availablePeriods.map(period => (
              <MenuItem value={period}>{period}</MenuItem>
            ))}
          </SimpleSelect>
          <FormControl tag="div">
            <Button variant="contained" color="primary" type="submit">
              Primary
            </Button>
          </FormControl>
        </form>
      )}
    </Formik>
  );
};

SimulationFilters.propTypes = {};

// TODO import that from project state
const mapStateToProps = state => ({
  availablePeriods: ["2016Q1", "2018Q1", "2019Q2"],
  orgUnits: [],
  sets: [],
});

export default connect(mapStateToProps)(SimulationFilters);
