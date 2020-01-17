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
import { formattedName } from "../../utils/textUtils";

const styles = theme => ({});

class SimulationForm extends Component {
  state = {};

  periodsChanged = values => {
    this.setState({ selectedPeriods: [{ key: "a", human: "A" }] });
  };

  render() {
    const { t, classes, simulation } = this.props;
    const initialValues = {
      simulation: {
        title: simulation?.title || "",
        content: simulation?.content || "",
        orgUnitId: simulation?.orgUnitId || "",
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
                  {t("simulationForm.projectVersion.legend")}
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
                    label={t("simulationForm.projectVersion.draft")}
                  />
                  <FormControlLabel
                    value="v1"
                    control={<Radio />}
                    label={t("simulationForm.projectVersion.v2")}
                  />
                  <FormControlLabel
                    value="v2"
                    control={<Radio />}
                    label={t("simulationForm.projectVersion.v1")}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  {t("simulationForm.dataSource.legend")}
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
                    label={t("simulationForm.dataSource.dhis")}
                  />
                  <FormControlLabel
                    value="v1"
                    control={<Radio />}
                    label={t("simulationForm.dataSource.mocked")}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  {t("simulationForm.dataSource.legend")}
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
                    label={t("simulationForm.dataSource.dhis")}
                  />
                  <FormControlLabel
                    value="v1"
                    control={<Radio />}
                    label={t("simulationForm.dataSource.mocked")}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl className={classes.formControl}>
                <FormLabel component="legend">
                  {formattedName(t("resources.orgUnit"))}
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
                          label: t("simulationForm.orgUnit.label"),
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
                  {t("simulationForm.orgUnit.help")}
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
