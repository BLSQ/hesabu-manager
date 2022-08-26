import React from "react";
import PropTypes from "prop-types";

import TopicBasedFormulas from "../../components/Formula/TopicBasedFormulas";

const SetChildrenContainer = props => {
  const { topics, multiEntitiesFormulas } = props.set;

  return (
    <TopicBasedFormulas
      topics={topics}
      inputs={[]}
      formulas={multiEntitiesFormulas}
      kind="children_formulas"
    ></TopicBasedFormulas>
  );
};

SetChildrenContainer.propTypes = {
  set: PropTypes.object,
};

export default SetChildrenContainer;
