import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useMutation, useQueryClient } from "react-query";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  Chip,
  DialogActions,
  Button,
  FormControl,
  TextField,
  MenuItem,
} from "@material-ui/core";
import Dhis2ElementDetails from "./Dhis2ElementDetails";
import Transition from "../../components/Shared/Transition";
import { dhis2LookupElement } from "../../lib/dhis2Lookups";
import { externalApi, canEdit } from "../../actions/api";
import { deserialize } from "../../utils/jsonApiUtils";
import Dhis2ComboAutocomplete from "./Dhis2ComboAutocomplete";
import Dhis2IndicatorAutocomplete from "./Dhis2IndicatorAutocomplete";

const useStylesFormMapping = makeStyles(() => ({
  paper: { minWidth: "500px", minHeight: "500px" },
  mappingTypeSelect: { marginLeft: "0.3rem", marginTop: "1rem", width: "3rem" },
  comboAutocomplete: { marginTop: "1rem" },
  dhis2Details: {
    marginTop: "1rem",
    marginBottom: "2rem",
    marginLeft: "0.5rem",
  },
  editMappings: { marginTop: "1rem", marginLeft: "0.5rem" },
  buttonMargin: { marginLeft: "1rem" },
  textField: { width: "400px" },
}));

const InputMappingDialogEditor = ({ cell, match }) => {
  const classes = useStylesFormMapping();
  const userCanEdit = canEdit();
  const {
    value: { inputMapping },
  } = cell;
  const {
    value: { topic },
  } = cell;
  const {
    value: { input },
  } = cell;
  const {
    value: { set },
  } = cell;
  const [open, setOpen] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [newExternalReference, setNewExternalReference] = useState(
    inputMapping ? inputMapping.externalReference : "",
  );
  const [dhis2Object, setDhis2Object] = useState(
    inputMapping ? dhis2LookupElement(newExternalReference) : undefined,
  );
  const [selectedDataElement, setSelectedDataElement] = useState(null);
  const [mappingType, setMappingType] = useState("dataElement");
  const [mappingOrigin, setMappingOrigin] = useState("dataValueSets");
  const [validationErrors, setValidationErrors] = useState({});
  const modeCreate = inputMapping === undefined;
  const queryClient = useQueryClient();

  const onClick = () => {
    setOpen(!open);
  };

  const handleDeCocChange = (_e, v) => {
    if (v) {
      setIsDirty(true);
      setSelectedDataElement(v);
      setNewExternalReference(v.id);
      setDhis2Object(dhis2LookupElement(v.id));
    }
  };

  const handleMappingTypeChange = event => {
    setMappingType(event.target.value);
  };

  const handleMappingOriginChange = event => {
    setMappingOrigin(event.target.value);
  };

  const handleMutation = useMutation(
    async () => {
      const payload = {
        data: {
          attributes: {
            code: input ? input.code : "",
            name: input ? input.name + "_label" : "",
            origin: "dataValueSets",
            kind: selectedDataElement.kind,
            externalReference: selectedDataElement.id,
          },
        },
      };

      let resp;

      if (modeCreate) {
        resp = await externalApi()
          .url(`/topics/${topic.id}/input_mappings`)
          .post(payload)
          .json();
      } else {
        resp = await externalApi()
          .url(`/topics/${topic.id}/input_mappings/${inputMapping.id}`)
          .put(payload)
          .json();
      }

      resp = await deserialize(resp);
      return resp;
    },
    {
      onSuccess: () => {
        setOpen(!open);
        queryClient.invalidateQueries(["loadSet", set.id]);
      },
      onError: error => {
        let resp = error.json;
        resp = resp.errors[0];
        const errorDetails = resp.details;
        for (let attribute in errorDetails) {
          let message = attribute + " " + errorDetails[attribute];
          if (attribute === "external_reference") {
            message =
              message + ", please choose a different data element or indicator";
          }
          validationErrors[attribute] = message;
        }
        setValidationErrors({ ...validationErrors });
      },
    },
  );

  const handleDelete = useMutation(
    async () => {
      let resp;
      resp = await externalApi()
        .url(`/topics/${topic.id}/input_mappings/${inputMapping.id}`)
        .delete()
        .json();
      resp = await deserialize(resp);
      return resp;
    },
    {
      onSuccess: () => {
        setOpen(!open);
        queryClient.invalidateQueries(["loadSet", set.id]);
      },
      onError: error => console.log(error.message),
    },
  );

  const handleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete);
  };

  const defaultSearch = topic ? topic.name : input.name;

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
        classes={{ paper: classes.paper }}
      >
        <div>
          <DialogTitle id="form-dialog-title">
            {inputMapping && inputMapping.name}
          </DialogTitle>
        </div>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
              <div style={{ color: "red" }}>
                <b>
                  {validationErrors &&
                    Object.keys(validationErrors).length > 0 &&
                    Object.values(validationErrors).join("\n")}
                </b>
              </div>
              {inputMapping && (
                <>
                  <Grid item>
                    <Chip label={inputMapping.kind} />
                  </Grid>
                  <Grid item>
                    <Chip label={inputMapping.origin} />
                  </Grid>
                  {inputMapping.externalReference && (
                    <Grid item>
                      <Chip label={inputMapping.externalReference} />
                    </Grid>
                  )}
                  <div className={classes.dhis2Details}>
                    <Dhis2ElementDetails dhis2Object={dhis2Object} />
                  </div>
                </>
              )}
              {userCanEdit && (
                <div className={classes.editMappings}>
                  <FormControl>
                    <div className={classes.mappingTypeSelect}>
                      <FormControl>
                        <TextField
                          select
                          label="Mapping type"
                          labelId="mapping-type-label"
                          id="kind"
                          value={mappingType}
                          onChange={handleMappingTypeChange}
                          className={classes.textField}
                        >
                          <MenuItem value={"dataElement"}>
                            Data element
                          </MenuItem>
                          <MenuItem value={"indicator"}>Indicator</MenuItem>
                        </TextField>
                      </FormControl>
                    </div>
                    <div className={classes.mappingTypeSelect}>
                      <TextField
                        select
                        label="Origin"
                        labelId="mapping-origin-label"
                        id="origin"
                        value={mappingOrigin}
                        onChange={handleMappingOriginChange}
                        className={classes.textField}
                      >
                        <MenuItem value={"dataValueSets"}>
                          Data value sets
                        </MenuItem>
                        <MenuItem value={"analytics"}>Analytics</MenuItem>
                      </TextField>
                    </div>
                    {mappingType === "dataElement" && (
                      <div className={classes.comboAutocomplete}>
                        <Dhis2ComboAutocomplete
                          onChange={handleDeCocChange}
                          defaultInputValue={defaultSearch}
                        ></Dhis2ComboAutocomplete>
                      </div>
                    )}
                    {mappingType === "indicator" && (
                      <div className={classes.comboAutocomplete}>
                        <Dhis2IndicatorAutocomplete
                          onChange={handleDeCocChange}
                          defaultInputValue={defaultSearch}
                        ></Dhis2IndicatorAutocomplete>
                      </div>
                    )}
                  </FormControl>
                </div>
              )}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent="space-between">
            {userCanEdit && (
              <Grid className={classes.buttonMargin} item>
                {!confirmDelete && (
                  <Button
                    color="primary"
                    disabled={modeCreate}
                    onClick={handleConfirmDelete}
                  >
                    Delete
                  </Button>
                )}
                {confirmDelete && (
                  <>
                    <small>Are you sure?</small>
                    <Button
                      color="primary"
                      onClick={() => handleDelete.mutate()}
                    >
                      Confirm delete
                    </Button>
                  </>
                )}
              </Grid>
            )}
            <Grid item>
              <Button color="primary" onClick={onClick}>
                Cancel
              </Button>
              <Button
                color="primary"
                disabled={!isDirty}
                onClick={() => handleMutation.mutate()}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InputMappingDialogEditor;
