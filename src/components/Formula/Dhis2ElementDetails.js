import React from "react";
import { makeStyles } from "@material-ui/styles";
import humanize from "string-humanize";
import { Grid, Typography } from "@material-ui/core";

const FieldValue = ({ field, value }) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={1}></Grid>
      <Grid item xs={5}>
        <Typography>{humanize(field)}:</Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography>
          <b>{value}</b>
        </Typography>
      </Grid>
    </Grid>
  );
};
const Dhis2ElementDetails = ({ dhis2Object }) => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <b>{dhis2Object && dhis2Object.name}</b>
      </Grid>
      {dhis2Object &&
        dhis2Object.dimensionItemType === "DATA_ELEMENT" && [
          dhis2Object.categoryOptionCombo && (
            <FieldValue
              field="categoryOptionCombo"
              value={dhis2Object.categoryOptionCombo.name}
            />
          ),
          <FieldValue field="id" value={dhis2Object.id} />,
          <FieldValue field="valueType" value={dhis2Object.valueType} />,
          <FieldValue
            field="aggregationType"
            value={dhis2Object.aggregationType}
          />,
        ]}
      {dhis2Object && dhis2Object.dimensionItemType === "INDICATOR" && (
        <FieldValue field="numerator" value={dhis2Object.numerator} />
      )}
    </Grid>
  );
};

export default Dhis2ElementDetails;
