import React, { useState } from "react";
import { useMutation } from "react-query";
import {
  Button,
  Grid,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { deserialize } from "../../utils/jsonApiUtils";
import { externalApi } from "../../actions/api";
import { makeStyles } from "@material-ui/styles";
import { canEdit } from "../../actions/api";

const useStyles = makeStyles(theme => ({
  textField: {
    width: "400px",
  },
}));

const ExistingTopicsForm = ({ set, closeAddTopic }) => {
  const classes = useStyles();
  const userCanEdit = canEdit();
  const [isDirty, setIsDirty] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [setToUse, setSetToUse] = useState(set);
  const topicsSelected = [];
  setToUse.projectActivities.map(topic => {
    if (setToUse.topics.includes(topic.id)) {
      topicsSelected.push({ id: topic.id, name: topic.name });
    }
  });
  // const [topicsSelected, setTopicsSelected] = useState(list);

  const handleTopicIds = options => {
    const updatedSet = { ...setToUse };
    const topicIds = options.map(topic => topic.id);
    updatedSet.topics = topicIds;
    setSetToUse(updatedSet);
    setIsDirty(true);
  };

  const updateTopicMutation = useMutation(
    async () => {
      const payload = {
        data: {
          attributes: setToUse,
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
        closeAddTopic();
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
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={set.projectActivities}
                  getOptionLabel={option => option.name}
                  onChange={(event, option) => {
                    handleTopicIds(option);
                  }}
                  defaultValue={topicsSelected}
                  filterSelectedOptions
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Filter and select topics"
                      className={classes.textField}
                      placeholder="Topics"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={10} sm={9}>
              <Button
                variant="outlined"
                disabled={!isDirty || !userCanEdit}
                onClick={() => updateTopicMutation.mutate()}
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

export default ExistingTopicsForm;
