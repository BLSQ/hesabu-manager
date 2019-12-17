import React, { useState, useEffect, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
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
        id="google-map-demo"
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
            label="Choose an org unit"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        )}
      />
    </div>
  );
}
