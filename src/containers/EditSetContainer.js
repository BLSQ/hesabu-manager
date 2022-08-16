import React, { Fragment } from "react";
import PageContent from "../components/Shared/PageContent";
import SetForm from "../components/Sets/Set/SetForm";

const EditSetContainer = ({ set }) => {
  const setWithStateAndActivities = { ...set };
  if (set.inputs) {
    setWithStateAndActivities.inputs = set.inputs.map(input => input.id);
  }
  if (set.topics) {
    setWithStateAndActivities.topics = set.topics.map(topic => topic.id);
  }
  return (
    <Fragment>
      <>
        <PageContent>
          <SetForm set={setWithStateAndActivities} modeCreate={false} />
        </PageContent>
      </>
    </Fragment>
  );
};

export default EditSetContainer;
