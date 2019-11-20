import React from "react";
import PropTypes from "prop-types";
import SetListItem from "../SetListItem";
import EmptySection from "../../EmptySection";

const SetList = props => {
  if (props.noItems) return <EmptySection />;
  if (!props.sets.length) return <p>No sets found</p>;
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
  noItems: PropTypes.bool,
};

export default SetList;
