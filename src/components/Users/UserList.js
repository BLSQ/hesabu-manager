import React from "react";
import UserListItem from "./UserListItem";

const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user, index) => (
        <UserListItem key={index} user={user} />
      ))}
    </div>
  );
};

export default UserList;
