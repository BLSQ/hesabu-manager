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

const topic = {
  name: "",
  shortName: "",
  code: "",
};

const TopicMenu = ({ set }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [newTopic, setNewTopic] = useState(false);
  const [addTopic, setAddTopic] = useState(false);
  const [topicToUse, setTopicToUse] = useState(topic);
  const [validationErrors, setValidationErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [topicIds, setTopicIds] = useState([]);
  // const unusedStates = set.unusedProjectInputs;
  const dict = {};
  // unusedStates.map(state => (dict[state.name] = false));
  const [topicsChecked, setTopicsChecked] = useState(dict);
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

  const handleAttributeChange = (value, attribute) => {
    const newTopic = { ...topicToUse };
    newTopic[attribute] = value;
    setTopicToUse(newTopic);
    setIsDirty(true);
  };

  const updateTopicMutation = useMutation(
    async () => {
      const payload = {
        data: {
          attributes: {
            topicIds: topicIds,
          },
        },
      };

      let resp = await externalApi()
        .url(``)
        .put(payload)
        .json();

      resp = await deserialize(resp);
      return resp;
    },
    {
      onSuccess: resp => {
        setValidationErrors({});
        closeAddTopic();
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

  const createTopicMutation = useMutation(
    async () => {
      const payload = {
        data: {
          attributes: topicToUse,
        },
      };

      let resp = await externalApi()
        .url(``)
        .post(payload)
        .json();

      resp = await deserialize(resp);
      return resp;
    },
    {
      onSuccess: resp => {
        setValidationErrors({});
        closeNewTopic();
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

  const handleTopicIds = (value, id) => {
    topicIds.push(id);
    const newTopicsChecked = { ...topicsChecked };
    newTopicsChecked[value] = true;
    setTopicsChecked(newTopicsChecked);
    setTopicIds(topicIds);
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
                      Create new topic
                    </Typography>
                  </Grid>
                  <div style={{ color: "red" }}>
                    <b>
                      {topicToUse?.errors &&
                        Object.keys(topicToUse.errors).length > 0 &&
                        Object.values(topicToUse.errors).join("\n")}
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
                      value={topicToUse.name}
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
                      value={topicToUse.shortName}
                      onChange={event =>
                        handleAttributeChange(event.target.value, "shortName")
                      }
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label={"Code"}
                      id="code"
                      error={validationErrors.code}
                      helperText={validationErrors.code}
                      variant="outlined"
                      fullWidth
                      value={topicToUse.code}
                      onChange={event =>
                        handleAttributeChange(event.target.value, "code")
                      }
                    />
                  </Grid>
                  <Grid item xs={10} sm={9}>
                    <Button
                      variant="outlined"
                      disabled={!isDirty}
                      onClick={() => createTopicMutation.mutate()}
                    >
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <MenuItem onClick={openAddTopic}>Add existing topic</MenuItem>
        <Modal
          open={addTopic}
          onClose={closeAddTopic}
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
                      {/* {set.unusedProjectInputs.map(input => (
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
                      ))} */}
                    </FormControl>
                  </Grid>
                  <Grid item xs={10} sm={9}>
                    <Button
                      variant="outlined"
                      disabled={!isDirty}
                      onClick={() => updateTopicMutation.mutate()}
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

export default TopicMenu;
