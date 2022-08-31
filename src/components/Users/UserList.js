import React from "react";
import { makeStyles } from "@material-ui/core";
import UserListItem from "./UserListItem";
import ActionFab from "../Shared/ActionFab";
import { canEdit } from "../../actions/api";

const useStyles = makeStyles(theme => ({
  simulationBtn: {
    right: theme.spacing(4) + 100,
    transition: "all .1s 100ms ease-in-out",
  },
}));

const UserList = ({ users }) => {
  const classes = useStyles();
  const userCanEdit = canEdit();
  return (
    <div>
      {users.map((user, index) => (
        <UserListItem key={index} user={user} />
      ))}
      <ActionFab
        disabled={!userCanEdit}
        to={{ pathname: `${window.location.href.split("#")[1]}/new` }}
        text="User"
        className={classes.simulationBtn}
        extended
      />
    </div>
  );
};

export default UserList;
