import React from "react";
import PropTypes from "prop-types";
import { useQuery, useQueryClient } from "react-query";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { externalApi } from "../../actions/api";
import { deserialize } from "../../utils/jsonApiUtils";
import TopicForm from "./TopicForm";
import { otherSetsUsingTopic } from "./utils";

// edits the name / short name of a topic, warning when other sets use it
const EditTopicDialog = ({ topic, set, onClose }) => {
  const queryClient = useQueryClient();
  // same query as the sets list (SetsContainer), shares its cache
  const loadSetsQuery = useQuery("loadSets", async () =>
    deserialize(
      await externalApi()
        .errorType("json")
        .url(`/sets`)
        .get()
        .json(),
    ),
  );
  const otherSets = otherSetsUsingTopic(loadSetsQuery.data, topic.id, set.id);

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Edit topic <code style={{ color: "#666" }}>{topic.code}</code>
      </DialogTitle>
      <DialogContent>
        {loadSetsQuery.isLoading && (
          <Alert severity="info">Looking for the other sets using it...</Alert>
        )}
        {otherSets.length > 0 && (
          <Alert severity="warning">
            Also used in {otherSets.length} other set
            {otherSets.length > 1 ? "s" : ""}: the new name applies there too
            <ul style={{ margin: 0 }}>
              {otherSets.map(other => (
                <li key={other.id}>
                  <a href={`./index.html#/sets/${other.id}/topic_formulas`}>
                    {other.name}
                  </a>
                </li>
              ))}
            </ul>
          </Alert>
        )}
        <TopicForm
          set={set}
          existingTopic={topic}
          closeNewTopic={onClose}
          queryClient={queryClient}
        />
      </DialogContent>
    </Dialog>
  );
};

EditTopicDialog.propTypes = {
  topic: PropTypes.object.isRequired,
  set: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditTopicDialog;
