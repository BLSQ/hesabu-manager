import React from "react";
import uniqBy from "lodash/uniqBy";
import queryString from "query-string";
import {
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { Formik, FieldArray } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SetsFilters = props => {
  const groups = uniqBy(
    props.sets.flatMap(set => set.orgUnitGroups),
    "id",
  );
  const history = useHistory();
  const { search } = useLocation();
  const parsedSearch = queryString.parse(search);
  const initialValues = {
    orgUnitGroups: (parsedSearch.orgUnitGroups || "").split(",").filter(i => i),
  };
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        const newvalues = {
          ...values,
          orgUnitGroups: values.orgUnitGroups.join(","),
        };

        history.push(`/sets?${queryString.stringify(newvalues)}`);
      }}
    >
      {({ values, handleSubmit }) => (
        <FormControl component="fieldset">
          <FormLabel component="legend">
            {t("resources.orgUnitGroup_plural")}
          </FormLabel>
          <FieldArray
            name="orgUnitGroups"
            render={arrayHelpers => (
              <FormGroup>
                {groups.map(group => (
                  <FormControlLabel
                    key={group.id}
                    control={
                      <Checkbox
                        checked={values.orgUnitGroups.includes(group.id)}
                        onChange={e => {
                          if (e.target.checked) arrayHelpers.push(group.id);
                          else {
                            const idx = values.orgUnitGroups.indexOf(group.id);
                            arrayHelpers.remove(idx);
                          }
                          handleSubmit();
                        }}
                        value={group.id}
                      />
                    }
                    label={group.name}
                  />
                ))}
              </FormGroup>
            )}
          />
        </FormControl>
      )}
    </Formik>
  );
};

export default SetsFilters;
