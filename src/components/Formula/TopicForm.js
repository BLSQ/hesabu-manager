import React, { useState } from "react";
import { useMutation } from "react-query";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { deserialize } from "../../utils/jsonApiUtils";
import { externalApi, canEdit } from "../../actions/api";

// keep in sync with orbf2 app/models/activity.rb validations
export const SHORT_NAME_MAX_LENGTH = 40;
const CODE_FORMAT = /^[a-z_0-9]*$/;

const FIELD_ERROR_KEYS = {
  name: "name",
  shortName: "short_name",
  code: "code",
};

const topic = {
  name: "",
  shortName: "",
  code: "",
  setId: "",
};

export const shortNameHint = shortName => {
  const length = shortName.length;
  const tooMany = length - SHORT_NAME_MAX_LENGTH;
  return {
    error: tooMany > 0,
    text: `${length}/${SHORT_NAME_MAX_LENGTH} characters${
      tooMany > 0 ? ` (${tooMany} too many)` : ""
    }`,
  };
};

export const codeHint = code => ({
  error: !CODE_FORMAT.test(code),
  text:
    "lowercase letters, digits and _ only, e.g. 'assisted_deliveries'. Generated from the name when left empty.",
});

// creates a topic in the set, or edits existingTopic (name and short name: its
// code is used by the formulas and decision tables, it stays as is)
const TopicForm = ({ set, closeNewTopic, queryClient, existingTopic }) => {
  const userCanEdit = canEdit();
  const [topicToUse, setTopicToUse] = useState(
    existingTopic
      ? {
          name: existingTopic.name || "",
          shortName: existingTopic.shortName || "",
          code: existingTopic.code,
        }
      : topic,
  );
  const [validationErrors, setValidationErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  const handleAttributeChange = (value, attribute) => {
    setTopicToUse({ ...topicToUse, [attribute]: value });
    setIsDirty(true);
    // the server error no longer applies once the field is edited
    const errorKey = FIELD_ERROR_KEYS[attribute];
    if (validationErrors[errorKey]) {
      const { [errorKey]: _removed, ...otherErrors } = validationErrors;
      setValidationErrors(otherErrors);
    }
  };

  const createTopicMutation = useMutation(
    async () => {
      if (existingTopic) {
        // without the code orbf2 would generate a new one from the name
        const updated = await externalApi()
          .url(`/topics/${existingTopic.id}`)
          .put({
            data: {
              attributes: {
                name: topicToUse.name,
                shortName: topicToUse.shortName,
                code: existingTopic.code,
              },
            },
          })
          .json();
        return deserialize(updated);
      }
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
      onSuccess: () => {
        setValidationErrors({});
        closeNewTopic();
        queryClient.invalidateQueries("loadSet");
        queryClient.invalidateQueries("loadSets");
      },
      onError: error => {
        const errorDetails = error.json?.errors?.[0]?.details || {
          base: error.message,
        };
        setValidationErrors({ ...errorDetails });
      },
    },
  );

  const shortName = shortNameHint(topicToUse.shortName);
  const code = codeHint(topicToUse.code);
  // errors not attached to one of the fields below
  const otherErrors = Object.entries(validationErrors)
    .filter(([key]) => !Object.values(FIELD_ERROR_KEYS).includes(key))
    .map(([, message]) => message);

  return (
    <Box p={1.5}>
      <Grid container spacing={3} direction="column">
        {otherErrors.length > 0 && (
          <Grid item style={{ color: "red" }}>
            {otherErrors.join("\n")}
          </Grid>
        )}
        <Grid item>
          <TextField
            required
            autoFocus
            id="name"
            error={Boolean(validationErrors.name)}
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
            error={Boolean(validationErrors.short_name) || shortName.error}
            helperText={
              validationErrors.short_name
                ? `${validationErrors.short_name} - ${shortName.text}`
                : shortName.text
            }
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
            disabled={Boolean(existingTopic)}
            error={Boolean(validationErrors.code) || code.error}
            helperText={
              validationErrors.code ||
              (existingTopic
                ? "used by the formulas and decision tables, can't be changed here"
                : code.text)
            }
            variant="outlined"
            fullWidth
            value={topicToUse.code}
            onChange={event =>
              handleAttributeChange(event.target.value, "code")
            }
          />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            disabled={
              !isDirty ||
              !userCanEdit ||
              shortName.error ||
              code.error ||
              createTopicMutation.isLoading
            }
            onClick={() => createTopicMutation.mutate()}
          >
            {existingTopic ? "Save" : "Create"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopicForm;
