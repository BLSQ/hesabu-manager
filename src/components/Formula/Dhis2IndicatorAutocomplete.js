import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Api from "../../lib/Api";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  textWidth: {
    width: "400px",
    marginTop: "1rem",
  },
}));

const Dhis2IndicatorAutocomplete = props => {
  const classes = useStyles();

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const { t } = useTranslation();
  const handleChange = event => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (props.defaultInputValue) {
      setInputValue(props.defaultInputValue);
    }
  }, [props.defaultInputValue]);

  const searchDataElements = async () => {
    const api = await Api.instance();
    const dataElementsResponse = await api.get("dataElements", {
      fields: "id,name,categoryCombo[id,name,categoryOptionCombos[id,name]]",
      filter: "name:ilike:" + inputValue,
    });
    const newOptions = [];
    for (let dataElement of dataElementsResponse.dataElements) {
      if (dataElement.categoryCombo.name === "default") {
        newOptions.push({
          id: dataElement.id,
          name: dataElement.name,
          kind: "data_element",
          dataElement,
        });
      } else {
        for (let coc of dataElement.categoryCombo.categoryOptionCombos) {
          newOptions.push({
            id: dataElement.id + "." + coc.id,
            name: dataElement.name + " - " + coc.name,
            kind: "data_element_coc",
            dataElement,
          });
        }
      }
    }
    setOptions(newOptions);
  };

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions([]);
      return undefined;
    }

    searchDataElements();

    return () => {
      active = false;
    };
  }, [inputValue, props.defaultInputValue]);

  return (
    <div className={classes.root}>
      <Autocomplete
        id="de-cocs-autocomplete"
        filterOptions={x => x}
        getOptionLabel={option =>
          typeof option === "string" ? option : option.name
        }
        options={options}
        autoComplete
        openOnFocus={options.length > 0}
        freeSolo={!options.length}
        defaultValue={props.defaultInputValue}
        includeInputInList
        onChange={props.onChange}
        renderInput={params => (
          <TextField
            {...params}
            className={classes.textWidth}
            label={t("autocomplete.deCoc")}
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        )}
      />
    </div>
  );
};

Dhis2IndicatorAutocomplete.propTypes = {
  defaultInputValue: PropTypes.object,
  onChange: PropTypes.func,
};

export default Dhis2IndicatorAutocomplete;
