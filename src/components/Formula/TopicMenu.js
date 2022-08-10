import React, { useState } from "react";
import { useMutation } from "react-query";
import {
  Button,
  Grid,
  Link,
  Typography,
  Menu,
  MenuItem,
  Modal,
  Box,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { deserialize } from "../../utils/jsonApiUtils";
import { externalApi } from "../../actions/api";
import TopicForm from "./TopicForm";
import ExistingTopicsForm from "./ExistingTopicsForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TopicMenu = ({ set }) => {
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
        <MenuItem onClick={openNewTopic}>New topic</MenuItem>
        <Modal
          open={newTopic}
          onClose={closeNewTopic}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <TopicForm set={set} style={style} closeNewTopic={closeNewTopic} />
        </Modal>
        <MenuItem onClick={openAddTopic}>Add existing topic</MenuItem>
        <Modal
          open={addTopic}
          onClose={closeAddTopic}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ExistingTopicsForm
            set={set}
            style={style}
            closeAddTopic={closeAddTopic}
          />
        </Modal>
      </Menu>
    </>
  );
};

export default TopicMenu;
