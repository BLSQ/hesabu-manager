import React from "react";
import ChangesListItem from "./ChangesListItem";

const ChangesList = ({ changes, usersById }) => {
  const translateToUser = dhis2UserId => {
    const user = usersById[dhis2UserId];
    if (user) {
      return user.displayName;
    }
    return dhis2UserId || "System";
  };
  return (
    <div>
      {changes.map((change, index) => (
        <ChangesListItem
          key={index}
          change={change}
          translateToUser={translateToUser}
        />
      ))}
    </div>
  );
};

export default ChangesList;
