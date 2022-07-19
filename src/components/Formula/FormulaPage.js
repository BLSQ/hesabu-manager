import {
  Grid,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/theme-monokai";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./editor.css";
import languageTools, {
  setCompleters,
  addCompleter,
} from "ace-builds/src-noconflict/ext-language_tools";
import FormulaTester from "./FormulaTester";

const Editor = ({ value, availableVariables }) => {
  useEffect(() => {
    setCompleters([languageTools.snippetCompleter]);
    addCompleter({
      getCompletions(editor, session, pos, prefix, callback) {
        const results = availableVariables.map(availableVariable => {
          return {
            caption: availableVariable,
            value: availableVariable,
            meta: "available variable",
          };
        });
        callback(null, results);
      },
    });
  }, [value, availableVariables]);
  return (
    <AceEditor
      mode="ruby"
      theme="monokai"
      fontSize={16}
      value={value}
      wrapEnabled
      minLines={10}
      width="100%"
      height="200px"
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: false,
      }}
    />
  );
};

const Formulas = ({ label, formulas }) => {
  return (
    <>
      {formulas.length > 0 && (
        <div>
          <Typography>
            <b>Formula used in:</b>
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
            <Grid container spacing={4}>
              <Grid item xs={3}>
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
              </Grid>
              <Grid item xs={3}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="formula-frequency">Exportable if</InputLabel>
                  <Select
                    labelId="formula-frequency-label"
                    id="frequency"
                    value={formula.exportableIf}
                    displayEmpty={true}
                  >
                    {exportableIfs.map(ifcode => (
                      <MenuItem key={ifcode} value={ifcode}>
                        {ifcode}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Editor
              value={formula.expression || ""}
              availableVariables={availableVariables}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={4}>
        <Grid container spacing={4} direction="column">
          <FormulaTester formula={formula} mockValues={mockValues} />
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
