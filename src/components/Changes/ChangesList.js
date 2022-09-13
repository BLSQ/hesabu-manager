import React from "react";
import ChangesListItem from "./ChangesListItem";

const ChangesList = ({ changes }) => {
  return (
    <div>
      {changes.map((change, index) => (
        <ChangesListItem key={index} change={change} />
      ))}
    </div>
  );
};

export default ChangesList;
