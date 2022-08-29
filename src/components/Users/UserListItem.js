import React, { useState } from "react";
import { useQueryClient } from "react-query";
import {
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import EditIcon from "@material-ui/icons/Edit";
import UserForm from "./UserForm";

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    borderBottom: "1px solid #efefef",
    position: "relative",
  },
  sectionTitle: {
    ...theme.link,
    marginBottom: theme.spacing(2),
  },
  header: {
    display: "flex",
    alignItems: "top",
  },
}));

const UserListItem = ({ user }) => {
  const classes = useStyles();
  const [editUser, setEditUser] = useState(false);
  const queryClient = useQueryClient();
  const openEditUser = () => setEditUser(true);
  const closeEditUser = () => setEditUser(false);
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.sectionTitle}>{user.email}</Typography>
        <div>
          <IconButton
            aria-label="edit user"
            component="label"
            onClick={openEditUser}
          >
            <EditIcon />
          </IconButton>
          <Dialog
            open={editUser}
            onClose={closeEditUser}
            fullWidth
            maxWidth="md"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DialogTitle>Edit user</DialogTitle>
            <DialogContent style={{ height: "300px" }}>
              <UserForm
                user={user}
                queryClient={queryClient}
                closeEditUser={closeEditUser}
                modeCreate={false}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
