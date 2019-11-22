import {
  Button,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  TextField,
  withStyles,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
} from "@material-ui/core";
import { Field, Formik, getIn } from "formik";
import React, { Component, Fragment } from "react";
import FormActions from "../../components/Shared/FormActions";
import MagicSelect from "../../components/Shared/MagicSelect";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { errorsForAttr } from "../../lib/formErrors";
import MultiSelectDropdown from "../../components/Shared/MultiSelectDropdown";

const styles = theme => ({});

class SimulationForm extends Component {
  state = {};

  createSimulation(values) {
    console.log(values);
    return null;
  }

  updatePublication = values => {
    console.log(values);
    return null;
  };

  periodsChanged = values => {
    console.log(values);
    this.setState({ selectedPeriods: [{ key: "a", human: "A" }] });
  };

  render() {
    const { t, classes, simulation } = this.props;
    const initialValues = {
      simulation: {
        title: getIn(simulation, "title") || "",
        content: getIn(simulation, "content") || "",
        orgUnitId: getIn(simulation, "orgUnitId") || "",
      },
    };

    return (
      <Paper elevation={0} className={classes.paper}>
        <Formik
          initialValues={initialValues}
          onSubmit={this.createOrUpdatePublication}
          render={({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  {t("simulation_form.project_version.legend")}
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={"draft"}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="draft"
                    control={<Radio />}
                    label={t("simulation_form.project_version.draft")}
                  />
                  <FormControlLabel
                    value="v1"
                    control={<Radio />}
                    label={t("simulation_form.project_version.v2")}
                  />
                  <FormControlLabel
                    value="v2"
                    control={<Radio />}
                    label={t("simulation_form.project_version.v1")}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  {t("simulation_form.data_source.legend")}
                </FormLabel>
                <RadioGroup
                  aria-label="data-source"
                  name="data-source"
                  value={"dhis"}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="dhis"
                    control={<Radio />}
                    label={t("simulation_form.data_source.dhis")}
                  />
                  <FormControlLabel
                    value="v1"
                    control={<Radio />}
                    label={t("simulation_form.data_source.mocked")}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  {t("simulation_form.data_source.legend")}
                </FormLabel>
                <RadioGroup
                  aria-label="data-source"
                  name="data-source"
                  value={"dhis"}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="dhis"
                    control={<Radio />}
                    label={t("simulation_form.data_source.dhis")}
                  />
                  <FormControlLabel
                    value="v1"
                    control={<Radio />}
                    label={t("simulation_form.data_source.mocked")}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl className={classes.formControl}>
                <FormLabel component="legend">
                  {t("simulation_form.org_unit.legend")}
                </FormLabel>
                <Field
                  name="simulation.orgUnitId"
                  render={({ field, _form }) => {
                    const { value, ...rest } = field;
                    return (
                      <MagicSelect
                        fieldValue={values.orgUnitId}
                        resourceType="organisationUnit"
                        dhis2Url={(this.props.project || {}).dhis2_url}
                        autocompleteResourceType="organisationUnits"
                        onChange={value =>
                          setFieldValue("simulation.orgUnitId", value)
                        }
                        textFieldProps={{
                          fullWidth: true,
                          margin: "normal",
                          onChange: handleChange,
                          onBlur: handleBlur,
                          error: !!errorsForAttr(errors.pyramid, "orgUnitId"),
                          label: "simulation_form.org_unit.label",
                          helperText: errorsForAttr(
                            errors.pyramid,
                            "orgUnitId",
                          ),
                          ...rest,
                        }}
                      />
                    );
                  }}
                />
                <FormHelperText>
                  {t("simulation_form.org_unit.help")}
                </FormHelperText>
              </FormControl>
              <MultiSelectDropdown
                name="Periods"
                items={[{ key: "Q12019", human: "Q1 - 2019" }]}
                selected={this.state.selectedPeriods || []}
                optionsChanged={this.periodsChanged}
                key="periods"
              />

              <FormActions>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!!isSubmitting}
                >
                  {isSubmitting ? t("buttons.submitting") : t("buttons.save")}
                </Button>
              </FormActions>
            </form>
          )}
        />
      </Paper>
    );
  }
}

const mapStateToProps = (state, props) => ({});

export default withStyles(styles)(
  withRouter(
    connect(mapStateToProps)(withTranslation("translations")(SimulationForm)),
  ),
);
