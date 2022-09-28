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
  idStyle: {
    fontWeight: "lighter",
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

  const searchIndicators = async () => {
    const api = await Api.instance();
    const indicatorsResponse = await api.get("indicators", {
      fields: "id,name",
      filter: "name:ilike:" + inputValue,
    });
    const newOptions = [];
    for (let indicator of indicatorsResponse.indicators) {
      newOptions.push({
        id: indicator.id,
        name: indicator.name,
        kind: "indicator",
        indicator,
      });
    }
    setOptions(newOptions);
  };

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions([]);
      return undefined;
    }

    searchIndicators();

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
        renderOption={option => (
          <>
            {typeof option === "string" && <>{option}</>}
            {typeof option !== "string" && (
              <div>
                <div>{option.name}</div>
                <div>
                  <span className={classes.idStyle}>{option.id}</span>
                </div>
              </div>
            )}
          </>
        )}
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
            label={t("autocomplete.indicator")}
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
