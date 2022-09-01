import React, { useState } from "react";
import { useQueryClient } from "react-query";
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

const InputsMenu = ({ set, kind }) => {
  const userCanEdit = canEdit();
  const queryClient = useQueryClient();
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
            href={`./index.html#/sets/${set.id}/${kind}/new`}
            underline="none"
          >
            New formula
          </Link>
        </MenuItem>
        {userCanEdit && kind === "topic_formulas" && (
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
                <InputForm
                  set={set}
                  queryClient={queryClient}
                  closeNewInput={closeNewInput}
                />
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
                <ExistingInputsForm
                  set={set}
                  closeAddInput={closeAddInput}
                  queryClient={queryClient}
                />
              </DialogContent>
            </Dialog>
            <MenuItem onClick={handleClose}>
              <Link
                href={`./index.html#/sets/${set.id}/topic/decisions/new`}
                style={{ color: "black" }}
                underline="none"
              >
                New Decision Table
              </Link>
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default InputsMenu;
