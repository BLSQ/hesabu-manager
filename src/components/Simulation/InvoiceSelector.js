import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { KIND_LABELS } from "./invoiceFilters";

// picks the invoices (packages, payment rules) to display; empty: all of them
const InvoiceSelector = ({ options, selected, onChange }) => {
  const known = new Map(options.map(option => [option.code, option]));
  // codes of the url without invoice for this org unit stay visible (removable)
  const value = selected.map(code => known.get(code) || { code, kind: "?" });

  return (
    <Autocomplete
      multiple
      fullWidth
      size="small"
      options={options}
      value={value}
      groupBy={option => KIND_LABELS[option.kind] || option.kind}
      getOptionLabel={option => option.code}
      getOptionSelected={(option, selectedOption) =>
        option.code === selectedOption.code
      }
      filterSelectedOptions
      onChange={(_event, newValue) =>
        onChange(newValue.map(option => option.code))
      }
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          label="Packages / payment rules"
          placeholder={value.length ? "" : "all"}
        />
      )}
      style={{ marginBottom: 16 }}
    />
  );
};

InvoiceSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({ code: PropTypes.string, kind: PropTypes.string }),
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InvoiceSelector;
