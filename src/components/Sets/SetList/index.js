import React from "react";
import PropTypes from "prop-types";
import SetListItem from "../SetListItem";

const SetList = props => {
  return (
    <div>
      {props.sets.map((set, index) => (
        <SetListItem
          title={set.name}
          key={index}
          groups={set.groupNames}
          description={set.description}
        />
      ))}
    </div>
  );
};

SetList.propTypes = {
  sets: PropTypes.arrayOf(PropTypes.object),
};

export default SetList;
