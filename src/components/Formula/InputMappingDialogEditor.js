import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { useMutation } from "react-query";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  Chip,
  DialogActions,
  Button,
} from "@material-ui/core";
import Dhis2ElementDetails from "./Dhis2ElementDetails";
import Transition from "../../components/Shared/Transition";
import { dhis2LookupElement } from "../../lib/dhis2Lookups";
import { externalApi, canEdit } from "../../actions/api";
import { deserialize } from "../../utils/jsonApiUtils";
import Dhis2ComboAutocomplete from "./Dhis2ComboAutocomplete";

const useStylesFormMapping = makeStyles(() => ({
  paper: { minWidth: "500px", minHeight: "500px" },
}));

const InputMappingDialogEditor = ({ cell }) => {
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
  const [open, setOpen] = useState(true);
  const [newExternalReference, setNewExternalReference] = useState(
    inputMapping ? inputMapping.externalReference : "",
  );
  const [dhis2Object, setDhis2Object] = useState(
    inputMapping ? dhis2LookupElement(newExternalReference) : undefined,
  );
  const [selectedDataElement, setSelectedDataElement] = useState(null);
  const modeCreate = inputMapping === undefined;

  const onClick = () => {
    setOpen(!open);
  };

  const handleDeCocChange = (_e, v) => {
    if (v) {
      setSelectedDataElement(v);
      setNewExternalReference(v.id);
      setDhis2Object(dhis2LookupElement(v.id));
    }
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
          .url(`/topics/${topic.id}/input_mappings`)
          .put(payload)
          .json();
      }

      resp = await deserialize(resp);
      return resp;
    },
    {
      onSuccess: () => {
        setOpen(!open);
        window.location.reload();
      },
      onError: error => console.log(error.message),
    },
  );

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
        <DialogTitle id="form-dialog-title">
          {inputMapping && inputMapping.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
              {inputMapping === undefined && userCanEdit && (
                <Dhis2ComboAutocomplete
                  onChange={handleDeCocChange}
                  defaultInputValue={defaultSearch}
                ></Dhis2ComboAutocomplete>
              )}
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

                  <Dhis2ElementDetails dhis2Object={dhis2Object} />
                </>
              )}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClick}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleMutation.mutate()}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InputMappingDialogEditor;
