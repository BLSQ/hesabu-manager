import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
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
  const openEditUser = () => setEditUser(true);
  const closeEditUser = () => setEditUser(false);
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography className={classes.sectionTitle}>
              {user.email}
            </Typography>
            <Grid container>
              <Grid item>
                {user.dhis2UserRef && (
                  <>DHIS2 user reference: {user.dhis2UserRef}</>
                )}

                {!user.dhis2UserRef && (
                  <>
                    <b>DHIS2 reference not configured for this user</b>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="edit user"
              component="label"
              onClick={openEditUser}
            >
              <EditIcon fontSize="small" />
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
                  afterMutate={closeEditUser}
                  modeCreate={false}
                />
              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default UserListItem;
