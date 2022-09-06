import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import { useMutation, useQueryClient } from "react-query";
import { externalApi } from "../../../actions/api";
import { deserialize } from "../../../utils/jsonApiUtils";
import { canEdit } from "../../../actions/api";
import { useHistory } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";
import PageContent from "../../Shared/PageContent";
import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  textField: {
    width: "400px",
  },
}));

const CompoundForm = ({ compound, modeCreate }) => {
  const userCanEdit = canEdit();
  const queryClient = useQueryClient();
  const classes = useStyles();
  const history = useHistory();
  const [isDirty, setIsDirty] = useState(false);

  const [compoundToUse, setCompoundToUse] = useState(compound);
  const [validationErrors, setValidationErrors] = useState({});

  const handleMutation = useMutation(
    async () => {
      const payload = {
        data: {
          attributes: compoundToUse,
        },
      };

      let resp;

      if (modeCreate) {
        resp = await externalApi()
          .url(`/compounds`)
          .post(payload)
          .json();
      } else {
        resp = await externalApi()
          .url(`/compound/${compound.id}`)
          .put(payload)
          .json();
      }

      resp = await deserialize(resp);
      return resp;
    },
    {
      onSuccess: resp => {
        setValidationErrors({});
        const path = modeCreate ? `/compounds` : `/compound/${compound.id}`;
        history.push(path);
        // queryClient.invalidateQueries("fetchCompound");
        // queryClient.invalidateQueries("fetchCompounds");
      },
      onError: error => {
        let resp = error.json;
        resp = resp.errors[0];
        const errorDetails = resp.details;
        for (let attribute in errorDetails) {
          validationErrors[attribute] = errorDetails[attribute];
        }
        setValidationErrors({ ...validationErrors });
      },
    },
  );

  const handleAttributeChange = (value, attribute) => {
    const newCompound = { ...compoundToUse };
    newCompound[attribute] = value;
    setCompoundToUse(newCompound);
    setIsDirty(true);
  };

  const handleSetsChange = options => {
    const newCompound = { ...compoundToUse };
    const setIds = options.map(set => set.id);
    newCompound.sets = setIds;
    setCompoundToUse(newCompound);
    setIsDirty(true);
  };

  return (
    <Fragment>
      <PageContent>
        <Grid container spacing={4} wrap="wrap">
          <Grid item xs={8} sm={6}>
            <Grid container spacing={4} direction="column">
              <div style={{ color: "red" }}>
                <b>
                  {compoundToUse?.errors &&
                    Object.keys(compoundToUse.errors).length > 0 &&
                    Object.values(compoundToUse.errors).join("\n")}
                  {validationErrors &&
                    Object.keys(validationErrors).length > 0 &&
                    Object.values(validationErrors).join("\n")}
                </b>
              </div>
              <Grid item>
                <TextField
                  required
                  id="name"
                  error={validationErrors["name"]}
                  helperText={validationErrors["name"]}
                  label={"Name"}
                  variant="outlined"
                  fullWidth
                  value={compoundToUse.name}
                  className={classes.textField}
                  onChange={event =>
                    handleAttributeChange(event.target.value, "name")
                  }
                />
              </Grid>
              <Grid item>
                {/* project sets */}
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={compoundToUse.projectSets}
                  getOptionLabel={option => option.name}
                  defaultValue={compoundToUse.sets}
                  filterSelectedOptions
                  onChange={(event, option) => handleSetsChange(option)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Sets"
                      className={classes.textField}
                      placeholder="Sets for compound"
                    />
                  )}
                />
              </Grid>

              <Grid item>
                <FormControl>
                  <TextField
                    required
                    select
                    error={validationErrors["frequency"]}
                    helperText={validationErrors["frequency"]}
                    label="Frequency"
                    labelId="formula-frequency-label"
                    id="frequency"
                    className={classes.textField}
                    value={compoundToUse.frequency}
                    onChange={event =>
                      handleAttributeChange(event.target.value, "frequency")
                    }
                  >
                    <MenuItem value={"monthly"}>Monthly</MenuItem>
                    <MenuItem value={"quarterly"}>Quarterly</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item xs={10} sm={9}>
                <Button
                  variant="outlined"
                  disabled={!isDirty || !userCanEdit}
                  onClick={() => handleMutation.mutate()}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PageContent>
    </Fragment>
  );
};

export default CompoundForm;
