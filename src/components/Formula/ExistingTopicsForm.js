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

const ExistingTopicsForm = ({ set, style, closeAddTopic }) => {
  const [isDirty, setIsDirty] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [topicIds, setTopicIds] = useState([]);
  const unusedTopics = set.projectActivities;
  const dict = {};
  unusedTopics.map(topic => (dict[topic.name] = false));
  const [topicsChecked, setTopicsChecked] = useState(dict);

  const handleTopicIds = (value, id) => {
    topicIds.push(id);
    const newTopicsChecked = { ...topicsChecked };
    newTopicsChecked[value] = true;
    setTopicsChecked(newTopicsChecked);
    setTopicIds(topicIds);
    setIsDirty(true);
  };

  const updateTopicMutation = useMutation(
    async () => {
      const payload = {
        data: {
          attributes: {
            topicIds: topicIds,
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
                {set.projectActivities.map(topic => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={topicsChecked[topic.name]}
                        name={topic.name}
                        onChange={event => {
                          handleTopicIds(event.target.name, topic.id);
                        }}
                      />
                    }
                    label={topic.name}
                  />
                ))}
              </FormControl>
            </Grid>
            <Grid item xs={10} sm={9}>
              <Button
                variant="outlined"
                disabled={!isDirty}
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