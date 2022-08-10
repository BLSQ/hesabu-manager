import React, { useState } from "react";
import { Button, Link, Menu, MenuItem, Modal } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import InputForm from "./InputForm";
import ExistingInputsForm from "./ExistingInputsForm";

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

const InputsMenu = ({ set }) => {
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
        <MenuItem onClick={openNewInput}>New input</MenuItem>
        <Modal
          open={newOpen}
          onClose={closeNewInput}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <InputForm set={set} style={style} closeNewInput={closeNewInput} />
        </Modal>
        <MenuItem onClick={openAddInput}>Add existing input</MenuItem>
        <Modal
          open={addOpen}
          onClose={closeAddInput}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ExistingInputsForm
            set={set}
            style={style}
            closeAddInput={closeAddInput}
          />
        </Modal>
      </Menu>
    </>
  );
};

export default InputsMenu;
