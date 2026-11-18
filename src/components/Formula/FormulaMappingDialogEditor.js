import React from "react";
import { makeStyles } from "@material-ui/styles";
import DataElementComboAutocomplete from "../Shared/DataElementComboAutocomplete";
import {
  dhis2LookupElement,
  dhis2LookupDataElement,
  dhis2DataElementNames,
} from "../../lib/dhis2Lookups";
import Transition from "../../components/Shared/Transition";
import Dhis2ElementDetails from "./Dhis2ElementDetails";
import MappingDialogTitle from "./MappingDialogTitle";
import CreateDataElementForm from "./CreateDataElementForm";
import {
  outputDataElementDefaults,
  dataElementErrors,
} from "./dataElementDefaults";
import { externalApi, canEdit } from "../../actions/api";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  MenuItem,
  TextField,
} from "@material-ui/core";

const useStylesFormMapping = makeStyles(() => ({
  paper: { minHeight: "500px" },
}));

const FormulaMappingDialogEditor = props => {
  const userCanEdit = canEdit();
  const classes = useStylesFormMapping();
  const cell = props.cell;
  const formulaMapping = cell.value.formulaMapping;
  const formula = cell.value.formula;
  const topic = cell.value.topic;
  const [newExternalReference, setNewExternalReference] = React.useState(
    formulaMapping ? formulaMapping.externalReference : "",
  );
  const [dhis2Object, setDhis2Object] = React.useState(
    formulaMapping ? dhis2LookupElement(newExternalReference) : undefined,
  );

  const [open, setOpen] = React.useState(true);
  // an unmapped output can be mapped to a new data element, created in dhis2
  const [creatingDataElement, setCreatingDataElement] = React.useState(false);
  const [newDataElement, setNewDataElement] = React.useState(() =>
    outputDataElementDefaults({
      topic,
      formula,
      lookup: dhis2LookupDataElement,
    }),
  );
  const [requestError, setRequestError] = React.useState(undefined);
  const [creating, setCreating] = React.useState(false);
  const newDataElementErrors = creatingDataElement
    ? dataElementErrors(newDataElement, dhis2DataElementNames())
    : {};

  const createDataElement = async () => {
    setCreating(true);
    setRequestError(undefined);
    try {
      await externalApi()
        .url("/formula_mappings/create_data_element")
        .post({
          data: {
            attributes: {
              topicId: topic ? topic.id : null,
              formulaId: formula.id,
              dataElement: newDataElement,
            },
          },
        })
        .json();
      setOpen(false);
      window.location.reload();
    } catch (error) {
      // bad_request of the api (dhis2 refusal,...)
      const errors = error.json && error.json.errors;
      setRequestError(
        errors && errors[0]
          ? errors[0].detail || errors[0].message
          : error.message,
      );
      setCreating(false);
    }
  };

  const handleDeCocChange = (_e, v) => {
    if (v) {
      setNewExternalReference(v.id);
      setDhis2Object(dhis2LookupElement(v.id));
    }
  };

  const createOrUpdate = async () => {
    const payload = {
      data: {
        attributes: {
          topicId: topic ? topic.id : null,
          formulaId: formula.id,
          externalReference: newExternalReference,
        },
      },
    };
    if (formulaMapping == undefined) {
      const resp = await externalApi()
        .url("/formula_mappings")
        .post(payload)
        .json();
    } else {
      const resp = await externalApi()
        .url(`/formula_mappings/${formulaMapping.id}`)
        .put(payload)
        .json();
    }

    setOpen(!open);
    window.location.reload();
  };
  const deleteMapping = async () => {
    const resp = await externalApi()
      .url(`/formula_mappings/${formulaMapping.id}`)
      .delete()
      .res();
    setOpen(!open);
    window.location.reload();
  };

  const modified = cell.value.formulaMapping
    ? cell.value.formulaMapping.externalReference !== newExternalReference
    : newExternalReference;
  const justClose = () => {
    setOpen(!open);
  };
  const defaultSearch = topic
    ? [formula.shortName, topic.name].join(" - ")
    : formula.shortName;

  return (
    <Dialog
      disableBackdropClick
      open={open}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="md"
      classes={{ paper: classes.paper }}
    >
      <MappingDialogTitle
        kind="Output"
        mapped={{ name: formula.shortName, code: formula.code }}
        topic={topic}
      />
      <DialogContent>
        <DialogContentText>
          {requestError && (
            <div style={{ color: "red" }}>
              <b>{requestError}</b>
            </div>
          )}
          {userCanEdit && !formulaMapping && (
            <TextField
              select
              fullWidth
              label="Mapping"
              value={creatingDataElement ? "new" : "existing"}
              onChange={event =>
                setCreatingDataElement(event.target.value === "new")
              }
              style={{ marginBottom: "1rem" }}
            >
              <MenuItem value="existing">Existing data element</MenuItem>
              <MenuItem value="new">
                New data element (created in DHIS2)
              </MenuItem>
            </TextField>
          )}
          {userCanEdit && creatingDataElement && (
            <CreateDataElementForm
              dataElement={newDataElement}
              errors={newDataElementErrors}
              onChange={setNewDataElement}
            />
          )}
          {userCanEdit && !creatingDataElement && (
            <DataElementComboAutocomplete
              onChange={handleDeCocChange}
              defaultInputValue={defaultSearch}
            ></DataElementComboAutocomplete>
          )}
          <div>
            {dhis2Object && <Dhis2ElementDetails dhis2Object={dhis2Object} />}
          </div>
        </DialogContentText>
        {formulaMapping && userCanEdit && (
          <Button color="secondary" onClick={deleteMapping}>
            Delete
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={justClose}>
          Cancel
        </Button>
        {userCanEdit && creatingDataElement && (
          <Button
            color="primary"
            onClick={createDataElement}
            disabled={creating || Object.keys(newDataElementErrors).length > 0}
          >
            Create in DHIS2 and map
          </Button>
        )}
        {userCanEdit && !creatingDataElement && (
          <Button color="primary" onClick={createOrUpdate} disabled={!modified}>
            Ok
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default FormulaMappingDialogEditor;
