import React, { useState } from "react";
import {
  Button,
  Link,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import InputForm from "./InputForm";
import ExistingInputsForm from "./ExistingInputsForm";
import { canEdit } from "../../actions/api";

const InputsMenu = ({ set }) => {
  const userCanEdit = canEdit();
  const [anchorEl, setAnchorEl] = useState(null);
  const [newOpen, setNewOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openNewInput = () => {
    setNewOpen(true);
  };

  const closeNewInput = () => setNewOpen(false);

  const openAddInput = () => {
    setAddOpen(true);
  };

  const closeAddInput = () => setAddOpen(false);

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disabled={!userCanEdit}
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
            href={`./index.html#/sets/${set.id}/topic_formulas/new`}
            underline="none"
          >
            New formula
          </Link>
        </MenuItem>
        {userCanEdit && (
          <>
            <MenuItem onClick={openNewInput}>New input</MenuItem>
            <Dialog
              open={newOpen}
              onClose={closeNewInput}
              fullWidth
              maxWidth="md"
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <DialogTitle>Create new Input</DialogTitle>
              <DialogContent style={{ height: "300px" }}>
                <InputForm set={set} closeNewInput={closeNewInput} />
              </DialogContent>
            </Dialog>
            <MenuItem onClick={openAddInput}>Add existing input</MenuItem>
            <Dialog
              open={addOpen}
              onClose={closeAddInput}
              fullWidth
              maxWidth="md"
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <DialogTitle>Create new Input</DialogTitle>
              <DialogContent style={{ height: "300px" }}>
                <ExistingInputsForm set={set} closeAddInput={closeAddInput} />
              </DialogContent>
            </Dialog>
          </>
        )}
      </Menu>
    </>
  );
};

export default InputsMenu;
