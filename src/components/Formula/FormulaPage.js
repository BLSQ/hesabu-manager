import {
  Button,
  Grid,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./editor.css";
import FormulaTester from "./FormulaTester";
import { update } from "lodash";
import FormulaEditor from "./FormulaEditor";

import { externalApi, canEdit } from "../../actions/api";
import { deserialize } from "../../utils/jsonApiUtils";

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
  match,
}) => {
  const classes = useStyles();

  const [formulaToUse, setFormulaToUse] = useState(formula);
  const [attributesToUpdate, setAttributesToUpdate] = useState({
    shortName: formulaToUse.shortName,
    description: formulaToUse.description,
    expression: formulaToUse.expression,
  });
  const [editingAttributes, setEditingAttributes] = useState(false);

  const userCanEdit = canEdit();
  const formulaType = match.path.split("/")[3];
  const parent = match.path.split("/")[1];
  const parentId =
    parent === "sets" ? match.params.setId : match.params.compoundId;

  const handleUpdateMutation = useMutation(
    async () => {
      const payload = {
        data: {
          id: formula.id,
          attributes: attributesToUpdate,
        },
      };

      let resp = await externalApi()
        .url(`/${parent}/${parentId}/${formulaType}/${match.params.formulaId}`)
        .put(payload)
        .json();

      resp = await deserialize(resp);
      return resp;
    },
    {
      onSuccess: resp => {
        setFormulaToUse(resp);
      },
      // onError: (error) => {
      //   console.log("error");
      //   const deserializedError = await deserialize(error)
      //   console.log(deserializedError);
      // },
    },
  );

  const handleAttributeChange = (value, attribute) => {
    attributesToUpdate[attribute] = value;
    formulaToUse[attribute] = value;
    setAttributesToUpdate({ ...attributesToUpdate });
    setFormulaToUse({ ...formulaToUse });
    setEditingAttributes(true);
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
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label={"Short name"}
              variant="outlined"
              fullWidth
              value={formulaToUse.shortName}
              onChange={event =>
                handleAttributeChange(event.target.value, "shortName")
              }
            />
          </Grid>

          <Grid item>
            <TextField
              label={"Description"}
              variant="outlined"
              fullWidth
              value={formulaToUse.description}
              onChange={event =>
                handleAttributeChange(event.target.value, "description")
              }
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
                    value={formulaToUse.frequency}
                    onChange={event =>
                      handleAttributeChange(event.target.value, "frequency")
                    }
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
                    value={formulaToUse.exportableFormulaCode}
                    displayEmpty={true}
                    onChange={event =>
                      handleAttributeChange(
                        event.target.value,
                        "exportableFormulaCode",
                      )
                    }
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
              handleAttributeChange={handleAttributeChange}
            />
          </Grid>
        </Grid>
        <br></br>
        <br></br>
        {userCanEdit && (
          <Button
            variant="outlined"
            disabled={!editingAttributes}
            onClick={() => handleUpdateMutation.mutate()}
          >
            Save
          </Button>
        )}
        {userCanEdit && handleUpdateMutation?.isSuccess && <CheckIcon />}
        {userCanEdit && handleUpdateMutation?.isError && <ErrorIcon />}
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
