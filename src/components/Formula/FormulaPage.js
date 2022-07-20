import {
  Grid,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./editor.css";
import FormulaTester from "./FormulaTester";
import { update } from "lodash";
import FormulaEditor from "./FormulaEditor";

const Formulas = ({ label, formulas }) => {
  return (
    <>
      {formulas.length > 0 && (
        <div>
          <Typography>
            <b>{label}</b>
          </Typography>
          <ul>
            {formulas.map(formula => (
              <div key={formula.code}>
                <Link
                  to={`/${formula.parentKind}/${formula.parentId}/${formula.kind}/${formula.id}`}
                  style={{ "text-decoration": "none" }}
                  title={`${formula.code} := ${formula.expression}\n\n${formula.description}\n${formula.kind}`}
                >
                  <pre>{formula.code}</pre>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 240,
  },
}));

const FormulaPage = ({
  formula,
  exportableIfs,
  mockValues,
  availableVariables,
}) => {
  const classes = useStyles();
  const [formulaToUse, setFormulaToUse] = useState(formula);

  const updateExpression = newFormula => {
    debugger;
    formulaToUse.expression = newFormula;
    setFormulaToUse({ ...formulaToUse });
  };

  return (
    <Grid container spacing={4} wrap="wrap">
      <Grid item xs={8} sm={6}>
        <Grid container spacing={4} direction="column">
          <Grid item>
            <TextField
              label={"Code"}
              variant="outlined"
              fullWidth
              value={formula.code}
            />
          </Grid>
          <Grid item>
            <TextField
              label={"Short name"}
              variant="outlined"
              fullWidth
              value={formula.shortName}
            />
          </Grid>

          <Grid item>
            <TextField
              label={"Description"}
              variant="outlined"
              fullWidth
              value={formula.description}
            />
          </Grid>
          <Grid item>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel id="formula-frequency">Frequency</InputLabel>
                  <Select
                    labelId="formula-frequency-label"
                    id="frequency"
                    value={formula.frequency}
                  >
                    <MenuItem value={"monthly"}>Monthly</MenuItem>
                    <MenuItem value={"quarterly"}>Quarterly</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel id="formula-frequency">Exportable if</InputLabel>
                  <Select
                    labelId="formula-frequency-label"
                    id="frequency"
                    value={formula.exportableFormulaCode}
                    displayEmpty={true}
                  >
                    {exportableIfs.map(ifcode => (
                      <MenuItem key={ifcode} value={ifcode}>
                        {ifcode}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </Grid>

          <Grid item>
            <FormulaEditor
              value={formulaToUse.expression || ""}
              availableVariables={availableVariables}
              updateExpression={updateExpression}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={4}>
        <Grid container spacing={4} direction="column">
          <FormulaTester
            formula={formulaToUse}
            key={formulaToUse.expression}
            mockValues={mockValues}
          />
          <Grid item>
            <Formulas label="Formulas used:" formulas={formula.usedFormulas} />

            <Formulas
              label="Formula used in:"
              formulas={formula.usedByFormulas}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

FormulaPage.propTypes = {
  formula: PropTypes.object.isRequired,
  exportableIfs: PropTypes.array.isRequired,
  availableVariables: PropTypes.array.isRequired,
  mockValues: PropTypes.object.isRequired,
};

export default FormulaPage;
