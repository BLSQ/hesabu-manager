import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { externalApi } from "../../actions/api";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4),
  },
}));

export default function OrgUnitAsyncAutocomplete(props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [defaultValue, setDefaultValue] = useState(undefined);
  const { t } = useTranslation();
  const handleChange = event => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (props.defaultValue) {
      externalApi()
        .errorType("json")
        .url(`/org_units`)
        .query({ id: props.defaultValue })
        .get()
        .json(response => {
          setDefaultValue(response.data[0] || undefined);
        });
    }
  }, [props.defaultValue]);

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions([]);
      return undefined;
    }

    externalApi()
      .errorType("json")
      .url(`/org_units`)
      .query({ term: inputValue })
      .get()
      .json(response => {
        if (active) {
          setOptions(response.data || []);
        }
      });

    return () => {
      active = false;
    };
  }, [inputValue]);

  return (
    <div className={classes.root}>
      {defaultValue && <p>{defaultValue.attributes.displayName}</p>}
      <Autocomplete
        id="org-unit-autocomplete"
        filterOptions={x => x}
        getOptionLabel={option => option.attributes.displayName}
        options={options}
        autoComplete
        freeSolo={!options.length}
        includeInputInList
        disableOpenOnFocus
        onChange={props.onChange}
        renderInput={params => (
          <TextField
            {...params}
            label={t("autocomplete.orgUnits")}
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        )}
      />
    </div>
  );
}

OrgUnitAsyncAutocomplete.propTypes = {
  defaultValue: PropTypes.object,
  onChange: PropTypes.func,
};
