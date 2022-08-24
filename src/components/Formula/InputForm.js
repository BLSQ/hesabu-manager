import React, { useState } from "react";
import { useMutation } from "react-query";
import { Button, Grid, Typography, Box, TextField } from "@material-ui/core";
import { deserialize } from "../../utils/jsonApiUtils";
import { externalApi } from "../../actions/api";
import { canEdit } from "../../actions/api";

const input = {
  name: "",
  shortName: "",
};

const InputForm = ({ set, closeNewInput }) => {
  const userCanEdit = canEdit();
  const [inputToUse, setInputToUse] = useState(input);
  const [validationErrors, setValidationErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  const handleAttributeChange = (value, attribute) => {
    const newInput = { ...inputToUse };
    newInput[attribute] = value;
    setInputToUse(newInput);
    setIsDirty(true);
  };

  const createInputMutation = useMutation(
    async () => {
      const payload = {
        data: {
          attributes: inputToUse,
        },
      };

      let resp = await externalApi()
        .url(`/sets/${set.id}/inputs`)
        .post(payload)
        .json();

      resp = await deserialize(resp);
      return resp;
    },
    {
      onSuccess: resp => {
        setValidationErrors({});
        closeNewInput();
        window.location.reload();
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

  return (
    <Box>
      <Grid container>
        <Grid item>
          <Grid container spacing={2} direction="column">
            <div style={{ color: "red" }}>
              <b>
                {inputToUse?.errors &&
                  Object.keys(inputToUse.errors).length > 0 &&
                  Object.values(inputToUse.errors).join("\n")}
                {validationErrors &&
                  Object.keys(validationErrors).length > 0 &&
                  Object.values(validationErrors).join("\n")}
              </b>
            </div>
            <Grid item>
              <TextField
                required
                id="name"
                error={validationErrors.name}
                helperText={validationErrors.name}
                label={"Name"}
                variant="outlined"
                fullWidth
                value={inputToUse.name}
                onChange={event =>
                  handleAttributeChange(event.target.value, "name")
                }
              />
            </Grid>
            <Grid item>
              <TextField
                label={"Short name"}
                id="shortName"
                error={validationErrors.short_name}
                helperText={validationErrors.short_name}
                variant="outlined"
                fullWidth
                value={inputToUse.shortName}
                onChange={event =>
                  handleAttributeChange(event.target.value, "shortName")
                }
              />
            </Grid>
            <Grid item xs={10} sm={9}>
              <Button
                variant="outlined"
                disabled={!isDirty || !userCanEdit}
                onClick={() => createInputMutation.mutate()}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputForm;
