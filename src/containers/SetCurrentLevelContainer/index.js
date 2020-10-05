import React from "react";
import PropTypes from "prop-types";

import TopicBasedFormulas from "../../components/Formula/TopicBasedFormulas";

const SetCurrentLevelContainer = props => {
  const { topics, inputs, topicFormulas } = props.set;

  return (
    <TopicBasedFormulas
      topics={topics}
      inputs={inputs}
      formulas={topicFormulas}
    ></TopicBasedFormulas>
  );
};

SetCurrentLevelContainer.propTypes = {
  set: PropTypes.object,
};

export default SetCurrentLevelContainer;
