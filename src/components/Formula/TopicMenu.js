import React, { useState } from "react";
import {
  Button,
  Link,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TopicForm from "./TopicForm";
import ExistingTopicsForm from "./ExistingTopicsForm";
import { canEdit } from "../../actions/api";

const TopicMenu = ({ set }) => {
  const userCanEdit = canEdit();
  const [anchorEl, setAnchorEl] = useState(null);
  const [newTopic, setNewTopic] = useState(false);
  const [addTopic, setAddTopic] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openNewTopic = () => {
    setNewTopic(true);
  };

  const closeNewTopic = () => setNewTopic(false);

  const openAddTopic = () => {
    setAddTopic(true);
  };

  const closeAddTopic = () => setAddTopic(false);

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        disabled={!userCanEdit}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AddIcon></AddIcon>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link
            href={`./index.html#/sets/${set.id}/topic/import`}
            underline="none"
          >
            Import CSV
          </Link>
        </MenuItem>
        {userCanEdit && (
          <>
            <MenuItem onClick={openNewTopic}>New topic</MenuItem>
            <Dialog
              open={newTopic}
              onClose={closeNewTopic}
              fullWidth
              maxWidth="md"
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <DialogTitle>Create new topic</DialogTitle>
              <DialogContent style={{ height: "300px" }}>
                <TopicForm set={set} closeNewTopic={closeNewTopic} />
              </DialogContent>
            </Dialog>
            <MenuItem onClick={openAddTopic}>Add existing topic</MenuItem>
            <Dialog
              open={addTopic}
              onClose={closeAddTopic}
              fullWidth
              maxWidth="md"
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <DialogTitle>Add existing topic</DialogTitle>
              <DialogContent style={{ height: "300px" }}>
                <ExistingTopicsForm set={set} closeAddTopic={closeAddTopic} />
              </DialogContent>
            </Dialog>
          </>
        )}
      </Menu>
    </>
  );
};

export default TopicMenu;
