import React from "react";
import {
  Grid,
  Chip,
  Typography,
  Tooltip,
  CardHeader,
  Link,
} from "@material-ui/core";

import humanize from "string-humanize";
import CloudDownload from "@material-ui/icons/CloudDownload";
import EditIcon from "@material-ui/icons/Edit";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import FlatCard from "../Shared/FlatCard";
import { dhis2LookupElement } from "../../lib/dhis2Lookups";
import FormulaMappingDialogEditor from "./FormulaMappingDialogEditor";

const FormulaCard = ({ formula, parent }) => {
  const dhis2Element =
    formula.formulaMappings && formula.formulaMappings[0]
      ? dhis2LookupElement(formula.formulaMappings[0].externalReference)
      : undefined;
  const [editMapping, setEditMapping] = React.useState(false);
  const cell = {
    value: {
      formula,
      formulaMapping: formula.formulaMappings && formula.formulaMappings[0],
    },
  };
  return (
    <FlatCard key={formula.code} to={`/formulas/${formula.id}`}>
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
              <CloudDownload onClick={() => setEditMapping(!editMapping)} />
            </Tooltip>
          ) : (
            <div>
              <RemoveCircleOutlineIcon
                onClick={() => setEditMapping(!editMapping)}
              />
            </div>
          )}
        </Grid>
      </Grid>
      {editMapping && (
        <FormulaMappingDialogEditor cell={cell}></FormulaMappingDialogEditor>
      )}
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
      <Grid container spacing={4} justify="space-between">
        <Grid item>
          <Typography>{formula.description}</Typography>
        </Grid>
        <Grid item>
          {/* probably need click to make sure page is reloaded */}
          <Link href={`${window.location}/${formula.id}`}>
            <EditIcon />
          </Link>
        </Grid>
      </Grid>
      {formula.exportableFormulaCode && (
        <span>
          Exportable if : <code>{formula.exportableFormulaCode}</code>
        </span>
      )}
    </FlatCard>
  );
};
export default FormulaCard;
