import React from "react";
import { makeStyles } from "@material-ui/styles";
import ReactDataSheet from "react-datasheet";
import PropTypes from "prop-types";
import { APPBAR_WITH_TABS_HEIGHT } from "../../constants/ui";
import { getIn } from "formik";
import SectionLoading from "../../components/Shared/SectionLoading";
import {
  fakeColumGenerator,
  fakeRowGenerator,
} from "../../utils/dataGridUtils";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  Chip,
} from "@material-ui/core";
import CloudDownload from "@material-ui/icons/CloudDownload";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Transition from "../../components/Shared/Transition";

const useStyles = makeStyles(theme => ({
  root: props => ({
    marginTop: APPBAR_WITH_TABS_HEIGHT - theme.spacing(2),
    marginLeft: props.loading ? 0 : theme.spacing(-2),
    padding: props.loading ? 0 : theme.spacing(2),
    width: props.loading ? " 100%" : "inherit",
  }),
}));

const DialogEditor = props => {
  console.log("rpops", props);

  return (
    <Dialog open={true} TransitionComponent={Transition}>
      <DialogTitle id="form-dialog-title">
        {props.cell.inputMapping.name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Chip label={props.cell.inputMapping.kind} />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, quia
            natus nesciunt necessitatibus exercitationem inventore autem
            consectetur modi voluptas blanditiis nam incidunt esse debitis
            veniam similique repellat eveniet architecto ullam?
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Cancel</Button>
        <Button color="primary">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

const SetCurrentLevelContainer = props => {
  const classes = useStyles(props);
  const { topics, inputs } = props.set;
  const safeTopics = topics || [];
  const safeInputs = inputs || [];

  const findInputMapping = (input, inputMappings) => {
    return inputMappings.find(
      inputMapping => inputMapping.input.id === input.id,
    );
  };

  const defaultGrid = [
    [
      { value: "", disableEvents: true, readOnly: true },
      ...safeInputs.map(input => ({
        value: input.name,
        disableEvents: true,
        readOnly: true,
      })),
      ...fakeColumGenerator(10, true),
    ],
  ];

  const grid = [
    ...defaultGrid,
    ...safeTopics.map(topic => [
      {
        value: topic.name,
        readOnly: true,
        disableEvents: true,
        noWrap: true,
      },
      ...safeInputs.map(input => {
        const inputMapping = findInputMapping(input, topic.inputMappings);

        return {
          value: getIn(inputMapping, "name"),
          inputMapping,
          valueViewer: inputMapping ? CheckCircle : CloudDownload,
          dataEditor: DialogEditor,
        };
      }),
      ...fakeColumGenerator(10),
    ]),
    ...fakeRowGenerator(
      50,
      fakeColumGenerator(safeInputs.length + 11, false),
      true,
    ),
  ];

  if (grid.length) {
    return (
      <div className={classes.root}>
        {props.loading ? (
          <SectionLoading />
        ) : (
          <ReactDataSheet
            data={grid}
            valueRenderer={cell => cell.value}
            attributesRenderer={cell => ({ "data-nowrap": cell.noWrap || {} })}
          />
        )}
      </div>
    );
  }
  return null;
};

SetCurrentLevelContainer.propTypes = {
  set: PropTypes.object,
};

export default SetCurrentLevelContainer;
