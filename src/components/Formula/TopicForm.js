import React, { useState } from "react";
import { useMutation } from "react-query";
import { Button, Grid, Box, TextField } from "@material-ui/core";
import { deserialize } from "../../utils/jsonApiUtils";
import { externalApi, canEdit } from "../../actions/api";

const topic = {
  name: "",
  shortName: "",
  code: "",
  setId: "",
};

const TopicForm = ({ set, closeNewTopic }) => {
  const userCanEdit = canEdit();
  const [topicToUse, setTopicToUse] = useState(topic);
  const [validationErrors, setValidationErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  const handleAttributeChange = (value, attribute) => {
    const newTopic = { ...topicToUse };
    newTopic[attribute] = value;
    setTopicToUse(newTopic);
    setIsDirty(true);
  };

  const createTopicMutation = useMutation(
    async () => {
      const topicPayload = { ...topicToUse };
      topicPayload["setId"] = set.id;

      const payload = {
        data: {
          attributes: topicPayload,
        },
      };

      let resp = await externalApi()
        .url(`/topics`)
        .post(payload)
        .json();

      resp = await deserialize(resp);
      return resp;
    },
    {
      onSuccess: resp => {
        setValidationErrors({});
        closeNewTopic();
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
                {topicToUse?.errors &&
                  Object.keys(topicToUse.errors).length > 0 &&
                  Object.values(topicToUse.errors).join("\n")}
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
                value={topicToUse.name}
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
                value={topicToUse.shortName}
                onChange={event =>
                  handleAttributeChange(event.target.value, "shortName")
                }
              />
            </Grid>
            <Grid item>
              <TextField
                label={"Code"}
                id="code"
                error={validationErrors.code}
                helperText={validationErrors.code}
                variant="outlined"
                fullWidth
                value={topicToUse.code}
                onChange={event =>
                  handleAttributeChange(event.target.value, "code")
                }
              />
            </Grid>
            <Grid item xs={10} sm={9}>
              <Button
                variant="outlined"
                disabled={!isDirty || !userCanEdit}
                onClick={() => createTopicMutation.mutate()}
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

export default TopicForm;
