import React, { useState } from "react";
import { useMutation } from "react-query";
import {
  Button,
  Grid,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { deserialize } from "../../utils/jsonApiUtils";
import { externalApi } from "../../actions/api";

const ExistingInputsForm = ({ set, style, closeAddInput }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [inputIds, setInputIds] = useState([]);
  const unusedInputs = set.unusedProjectInputs;
  const dict = {};
  unusedInputs.map(input => (dict[input.name] = false));
  const [inputsChecked, setInputsChecked] = useState(dict);

  const updateInputMutation = useMutation(
    async () => {
      const payload = {
        data: {
          attributes: {
            stateIds: inputIds,
          },
        },
      };

      let resp = await externalApi()
        .url(`/sets/${set.id}`)
        .put(payload)
        .json();

      resp = await deserialize(resp);
      return resp;
    },
    {
      onSuccess: resp => {
        setValidationErrors({});
        closeAddInput();
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

  const handleStateIds = (value, id) => {
    inputIds.push(id);
    const newInputsChecked = { ...inputsChecked };
    newInputsChecked[value] = true;
    setInputsChecked(newInputsChecked);
    setInputIds(inputIds);
    setIsDirty(true);
  };

  return (
    <Box sx={style}>
      <Grid container>
        <Grid item>
          <Grid container spacing={4} direction="column">
            <div style={{ color: "red" }}>
              <b>
                {validationErrors &&
                  Object.keys(validationErrors).length > 0 &&
                  Object.values(validationErrors).join("\n")}
              </b>
            </div>
            <Grid item>
              <FormControl sx={{ m: 1, width: 300 }}>
                {set.unusedProjectInputs.map(input => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={inputsChecked[input.name]}
                        name={input.name}
                        onChange={event => {
                          handleStateIds(event.target.name, input.id);
                        }}
                      />
                    }
                    label={input.name}
                  />
                ))}
              </FormControl>
            </Grid>
            <Grid item xs={10} sm={9}>
              <Button
                variant="outlined"
                disabled={!isDirty}
                onClick={() => updateInputMutation.mutate()}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExistingInputsForm;
