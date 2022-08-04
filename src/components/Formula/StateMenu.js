import React, { useState } from "react";
import { useMutation } from "react-query";
import { useTheme } from "@material-ui/styles";
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

const input = {
  name: "",
  shortName: "",
};

const StateMenu = ({ set }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [newOpen, setNewOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [inputToUse, setInputToUse] = useState(input);
  const [validationErrors, setValidationErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [stateIds, setStateIds] = useState([]);
  const unusedStates = set.unusedProjectInputs;
  const dict = {};
  unusedStates.map(state => (dict[state.name] = false));
  const [statesChecked, setStatesChecked] = useState(dict);
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

  const handleAttributeChange = (value, attribute) => {
    const newInput = { ...inputToUse };
    newInput[attribute] = value;
    setInputToUse(newInput);
    setIsDirty(true);
  };

  const updateInputMutation = useMutation(async () => {
    const payload = {
      data: {
        attributes: {
          stateIds: stateIds,
        },
      },
    };

    console.log("in here");
  });

  const createInputMutation = useMutation(
    async () => {
      const payload = {
        data: {
          attributes: inputToUse,
        },
      };

      let resp = await externalApi()
        .url(`/sets/${set.id}/inputs`)
        .post(payload)
        .json();

      resp = await deserialize(resp);
      return resp;
    },
    {
      onSuccess: resp => {
        setValidationErrors({});
        closeNewInput();
        window.location.reload();
      },
      onError: error => {
        let resp = error.json;
        resp = resp.errors[0];
        const errorDetails = resp.details;
        for (let attribute in errorDetails) {
          validationErrors[attribute] = errorDetails[attribute];
        }
        setValidationErrors({ ...validationErrors });
      },
    },
  );

  const handleStateIds = (value, id) => {
    stateIds.push(id);
    const newStatesChecked = { ...statesChecked };
    newStatesChecked[value] = true;
    setStatesChecked(newStatesChecked);
    setStateIds(stateIds);
    setIsDirty(true);
  };

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
          <Box sx={style}>
            <Grid container>
              <Grid item>
                <Grid container spacing={4} direction="column">
                  <Grid item>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Create new input
                    </Typography>
                  </Grid>
                  <div style={{ color: "red" }}>
                    <b>
                      {inputToUse?.errors &&
                        Object.keys(inputToUse.errors).length > 0 &&
                        Object.values(inputToUse.errors).join("\n")}
                      {validationErrors &&
                        Object.keys(validationErrors).length > 0 &&
                        Object.values(validationErrors).join("\n")}
                    </b>
                  </div>
                  <Grid item>
                    <TextField
                      required
                      id="name"
                      error={validationErrors.name}
                      helperText={validationErrors.name}
                      label={"Name"}
                      variant="outlined"
                      fullWidth
                      value={inputToUse.name}
                      onChange={event =>
                        handleAttributeChange(event.target.value, "name")
                      }
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label={"Short name"}
                      id="shortName"
                      error={validationErrors.short_name}
                      helperText={validationErrors.short_name}
                      variant="outlined"
                      fullWidth
                      value={inputToUse.shortName}
                      onChange={event =>
                        handleAttributeChange(event.target.value, "shortName")
                      }
                    />
                  </Grid>
                  <Grid item xs={10} sm={9}>
                    <Button
                      variant="outlined"
                      disabled={!isDirty}
                      onClick={() => createInputMutation.mutate()}
                    >
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <MenuItem onClick={openAddInput}>Add existing input</MenuItem>
        <Modal
          open={addOpen}
          onClose={closeAddInput}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container>
              <Grid item>
                <Grid container spacing={4} direction="column">
                  <div style={{ color: "red" }}>
                    <b>
                      {validationErrors &&
                        Object.keys(validationErrors).length > 0 &&
                        Object.values(validationErrors).join("\n")}
                    </b>
                  </div>
                  <Grid item>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      {set.unusedProjectInputs.map(input => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={statesChecked[input.name]}
                              name={input.name}
                              onChange={event => {
                                handleStateIds(event.target.name, input.id);
                              }}
                            />
                          }
                          label={input.name}
                        />
                      ))}
                    </FormControl>
                  </Grid>
                  <Grid item xs={10} sm={9}>
                    <Button
                      variant="outlined"
                      disabled={!isDirty}
                      onClick={() => updateInputMutation.mutate()}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Menu>
    </>
  );
};

export default StateMenu;
