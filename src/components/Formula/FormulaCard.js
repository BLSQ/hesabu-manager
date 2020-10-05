import React from "react";
import { Grid, Chip, Typography, Tooltip, CardHeader } from "@material-ui/core";

import humanize from "string-humanize";
import CloudDownload from "@material-ui/icons/CloudDownload";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import FlatCard from "../Shared/FlatCard";
import { dhis2LookupElement } from "../../lib/dhis2Lookups";

const FormulaCard = ({ formula, parent }) => {
  debugger;
  const dhis2Element =
    formula.formulaMappings && formula.formulaMappings[0]
      ? dhis2LookupElement(formula.formulaMappings[0].externalReference)
      : undefined;
  return (
    <FlatCard key={formula.code}>
      <CardHeader title={humanize(formula.code)}>
        <Typography variant="h4">{}</Typography>
      </CardHeader>
      <Grid container spacing={4} justify="space-between">
        <Grid item>
          <Chip label={formula.frequency || parent.frequency}></Chip>
        </Grid>
        <Grid item>
          {dhis2Element ? (
            <Tooltip
              title={
                <div>
                  {dhis2Element.name}
                  <br></br> {dhis2Element.id}
                </div>
              }
            >
              <CloudDownload />
            </Tooltip>
          ) : (
            <div>
              <RemoveCircleOutlineIcon />
            </div>
          )}
        </Grid>
      </Grid>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          backgroundColor: "lightgrey",
          fontSize: "11px",
          padding: "10px",
        }}
      >
        {formula.code} := {"\n"}
        {"\t"}
        {formula.expression}{" "}
      </pre>
      <Typography>{formula.description}</Typography>
      {formula.exportableFormulaCode && (
        <span>
          Exportable if : <code>{formula.exportableFormulaCode}</code>
        </span>
      )}
    </FlatCard>
  );
};
export default FormulaCard;
