import React from "react";
import { makeStyles } from "@material-ui/styles";
import humanize from "string-humanize";
import { Grid, Typography, Link } from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Api from "../../lib/Api";
import { standaloneConfig } from "../../lib/standalone";
import { dhis2MaintenanceUrl } from "../../lib/dhis2Urls";

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
// served by orbf2: the project dhis2, as a dhis2 app: the dhis2 it runs in
const dhis2Url = () =>
  standaloneConfig() ? standaloneConfig().dhis2Url : Api.baseUrl;

const Dhis2ElementDetails = ({ dhis2Object }) => {
  const maintenanceUrl = dhis2MaintenanceUrl(dhis2Object, dhis2Url());
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <b>{dhis2Object && dhis2Object.name}</b>
        {maintenanceUrl && (
          <Link
            href={maintenanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: 8, whiteSpace: "nowrap" }}
          >
            DHIS2 maintenance{" "}
            <OpenInNewIcon
              fontSize="inherit"
              style={{ verticalAlign: "middle" }}
            />
          </Link>
        )}
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
