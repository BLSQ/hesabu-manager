import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { connect } from "react-redux";
import {
  FormControl,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import SimpleSelect from "../Shared/SimpleSelect";
import OrgUnitAsyncAutocomplete from "../Shared/OrgUnitAsyncAutocomplete";

const useStyles = makeStyles(theme => ({
  formControl: theme.formControl,
}));

export const SimulationFilters = props => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const {
    values: { periods, orgUnit, sets, mockedValues, force },
    loading,
  } = props;

  const initialValues = {
    periods,
    orgUnit,
    sets,
    mockedValues,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        const queryParams = queryString.stringify(values);
        history.push(`/simulation?${queryParams}`);
      }}
    >
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <FormControlLabel
            className={classes.formControl}
            control={
              <Checkbox
                inputProps={{ name: "mockedValues" }}
                checked={values.mockedValues}
                onChange={handleChange}
                value={"true"}
              />
            }
            label={t("filters.mockedValues")}
          />
          <div>
            <SimpleSelect
              name="periods"
              onChange={handleChange}
              defaultValue="2022Q2"
              value={values.periods}
            >
              {props.availablePeriods.map(period => (
                <MenuItem key={`filers-item-${period}`} value={period}>
                  {period}
                </MenuItem>
              ))}
            </SimpleSelect>
          </div>
          <div>
            <OrgUnitAsyncAutocomplete
              onChange={(_e, v) => v && setFieldValue("orgUnit", v.id)}
              defaultValue={values.orgUnit}
            />
          </div>
          {/*
          <FormControlLabel
            className={classes.formControl}
            control={
              <Checkbox
                inputProps={{ name: "force" }}
                checked={values.force}
                onChange={handleChange}
                value={"strong"}
              />
            }
            label={t("filters.force")}
          />
          */}
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
const mapStateToProps = state => ({
  availablePeriods: state.project.periods || [],
  orgUnits: [],
  sets: [],
});

export default connect(mapStateToProps)(SimulationFilters);
