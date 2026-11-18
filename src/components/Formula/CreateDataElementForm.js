import React from "react";
import PropTypes from "prop-types";
import { Grid, MenuItem, TextField, Typography } from "@material-ui/core";
import {
  AGGREGATION_TYPES,
  DATA_ELEMENT_MAX_LENGTHS,
  VALUE_TYPES,
} from "./dataElementDefaults";

const LABELS = { name: "Name", shortName: "Short name", code: "Code" };

// the data element created in dhis2 (aggregate, default category combo) then mapped
const CreateDataElementForm = ({ dataElement, errors, onChange }) => {
  const change = field => event =>
    onChange({ ...dataElement, [field]: event.target.value });

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography variant="body2" color="textSecondary">
          Creates this aggregate data element (default category combo) in DHIS2
          and maps it; the sync then adds it to the data element groups and data
          sets.
        </Typography>
      </Grid>
      {Object.entries(DATA_ELEMENT_MAX_LENGTHS).map(([field, max]) => {
        const length = (dataElement[field] || "").length;
        return (
          <Grid item key={field}>
            <TextField
              fullWidth
              label={LABELS[field]}
              value={dataElement[field]}
              onChange={change(field)}
              error={!!errors[field]}
              helperText={`${length} / ${max}${
                errors[field] ? ` - ${errors[field]}` : ""
              }`}
              inputProps={{ "data-field": field }}
            />
          </Grid>
        );
      })}
      <Grid item container spacing={2}>
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            label="Value type"
            value={dataElement.valueType}
            onChange={change("valueType")}
          >
            {VALUE_TYPES.map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            label="Aggregation type"
            value={dataElement.aggregationType}
            onChange={change("aggregationType")}
          >
            {AGGREGATION_TYPES.map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
};

CreateDataElementForm.propTypes = {
  dataElement: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CreateDataElementForm;
