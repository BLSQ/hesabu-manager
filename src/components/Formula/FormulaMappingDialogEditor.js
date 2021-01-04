import React from "react";
import { makeStyles } from "@material-ui/styles";
import DataElementComboAutocomplete from "../Shared/DataElementComboAutocomplete";
import { dhis2LookupElement } from "../../lib/dhis2Lookups";
import Transition from "../../components/Shared/Transition";
import Dhis2ElementDetails from "./Dhis2ElementDetails";
import { externalApi } from "../../actions/api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@material-ui/core";

const useStylesFormMapping = makeStyles(() => ({
  paper: { minWidth: "500px", minHeight: "500px" },
}));

const FormulaMappingDialogEditor = props => {
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
      classes={{ paper: classes.paper }}
    >
      <DialogTitle id="form-dialog-title">
        <b>Mapping output : </b> {formula.shortName}{" "}
        {topic && " - " + topic.name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <DataElementComboAutocomplete
            onChange={handleDeCocChange}
            defaultInputValue={defaultSearch}
          ></DataElementComboAutocomplete>
          <div>
            {dhis2Object && <Dhis2ElementDetails dhis2Object={dhis2Object} />}
          </div>
        </DialogContentText>
        {formulaMapping && (
          <Button color="secondary" onClick={deleteMapping}>
            Delete
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={justClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={createOrUpdate} disabled={!modified}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormulaMappingDialogEditor;
