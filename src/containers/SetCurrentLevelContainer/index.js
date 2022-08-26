import React from "react";
import PropTypes from "prop-types";

import TopicBasedFormulas from "../../components/Formula/TopicBasedFormulas";

const SetCurrentLevelContainer = props => {
  const { topics, inputs, topicFormulas, topicDecisionTables } = props.set;
  return (
    <TopicBasedFormulas
      set={props.set}
      topics={topics}
      inputs={inputs}
      formulas={topicFormulas}
      decisionTables={topicDecisionTables}
      kind="topic_formulas"
    ></TopicBasedFormulas>
  );
};

SetCurrentLevelContainer.propTypes = {
  set: PropTypes.object,
};

export default SetCurrentLevelContainer;
