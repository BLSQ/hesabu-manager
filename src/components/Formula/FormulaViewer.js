import React from "react";
import { Link, Tooltip, Typography } from "@material-ui/core";
import humanize from "string-humanize";

const FormulaViewer = ({ formula, index, classes }) => {
  const { value } = formula;
  return (
    <Tooltip
      title={
        <div className={classes.tooltipCustomWidth}>
          <pre>
            {value.code} := {"\n"}
            {"\t"}
            {value.expression}{" "}
          </pre>
          <br />
          {value.shortName}
          {value.description}
          <br />
          {value.frequency}
          {value.exportable_formula_code && (
            <span>Exportable if : {value.exportable_formula_code}</span>
          )}
          <br />
        </div>
      }
    >
      <Link href={`${window.location}/${value.id}`}>
        <Typography>{humanize(value.code)}</Typography>
      </Link>
    </Tooltip>
  );
};

export default FormulaViewer;
