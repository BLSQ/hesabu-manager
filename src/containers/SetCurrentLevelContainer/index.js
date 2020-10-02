import React from "react";
import { makeStyles } from "@material-ui/styles";
import ReactDataSheet from "react-datasheet";
import PropTypes from "prop-types";
import { APPBAR_WITH_TABS_HEIGHT } from "../../constants/ui";
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
  Grid,
  Typography,
  Tooltip,
} from "@material-ui/core";
import CloudDownload from "@material-ui/icons/CloudDownload";
import CheckCircle from "@material-ui/icons/CheckCircle";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Transition from "../../components/Shared/Transition";
import humanize from "string-humanize";

import { dhis2LookupElement } from "../../lib/dhis2Lookups";

const useStyles = makeStyles(theme => ({
  root: props => ({
    marginTop: APPBAR_WITH_TABS_HEIGHT - theme.spacing(2),
    marginLeft: props.loading ? 0 : theme.spacing(-2),
    padding: props.loading ? 0 : theme.spacing(2),
    width: props.loading ? " 100%" : "inherit",
  }),
}));
const FieldValue = ({ field, value }) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={5}>
        <Typography>{humanize(field)}:</Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography>
          <b>{value}</b>
        </Typography>
      </Grid>
    </Grid>
  );
};
const Dhis2ElementDetails = ({ dhis2Object }) => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>{dhis2Object && dhis2Object.name}</Grid>
      {dhis2Object &&
        dhis2Object.dimensionItemType === "DATA_ELEMENT" && [
          dhis2Object.categoryOptionCombo && (
            <FieldValue
              field="categoryOptionCombo"
              value={dhis2Object.categoryOptionCombo.name}
            />
          ),
          <FieldValue field="valueType" value={dhis2Object.valueType} />,
          <FieldValue
            field="aggregationType"
            value={dhis2Object.aggregationType}
          />,
        ]}
      {dhis2Object && dhis2Object.dimensionItemType === "INDICATOR" && (
        <FieldValue field="numerator" value={dhis2Object.numerator} />
      )}
    </Grid>
  );
};

const FormulaMappingDialogEditor = ({ cell }) => {
  const formulaMapping = cell.value;

  let dhis2Object = formulaMapping
    ? dhis2LookupElement(formulaMapping.externalReference)
    : undefined;

  return (
    <Dialog open={true} TransitionComponent={Transition}>
      <DialogTitle id="form-dialog-title">
        {dhis2Object && dhis2Object.name}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dhis2Object === undefined && <Typography>Nothing mapped</Typography>}
          {dhis2Object && <Dhis2ElementDetails dhis2Object={dhis2Object} />}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Cancel</Button>
        <Button color="primary">Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

const InputMappingDialogEditor = ({ cell }) => {
  const inputMapping = cell.inputMapping;
  let dhis2Object = dhis2LookupElement(inputMapping.externalReference);

  return (
    <Dialog open={true} TransitionComponent={Transition}>
      <DialogTitle id="form-dialog-title">{cell.inputMapping.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container spacing={2}>
            <Grid item>
              <Chip label={cell.inputMapping.kind} />
            </Grid>
            <Grid item>
              <Chip label={cell.inputMapping.origin} />
            </Grid>
            {cell.inputMapping.externalReference && (
              <Grid item>
                <Chip label={cell.inputMapping.externalReference} />
              </Grid>
            )}
          </Grid>
          <Dhis2ElementDetails dhis2Object={dhis2Object} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Cancel</Button>
        <Button color="primary">Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

const userFormulaViewerStyles = makeStyles(theme => ({
  tooltipCustomWidth: {
    width: 1800,
    maxWidth: 1800,
  },
}));

const FormulaViewer = ({ value }) => {
  const formula = value;
  const classes = userFormulaViewerStyles();
  return (
    <Tooltip
      title={
        <div className={classes.tooltipCustomWidth}>
          <pre>
            {formula.code} := {"\n"}
            {"\t"}
            {formula.expression}{" "}
          </pre>
          <br />
          {formula.shortName}
          {formula.description}
          <br />
          {formula.frequency}
          {formula.exportable_formula_code && (
            <span>Exportable if : {formula.exportable_formula_code}</span>
          )}
          <br />
        </div>
      }
    >
      <Typography>{humanize(formula.code)}</Typography>
    </Tooltip>
  );
};

const FormulaMappingViewer = props => {
  const formulaMapping = props.value;
  let dataElement = dhis2LookupElement(formulaMapping.externalReference);

  return formulaMapping ? (
    <Tooltip
      title={
        <div>
          {dataElement && dataElement.name}
          <br></br>
          {formulaMapping.externalReference}
        </div>
      }
    >
      <CloudDownload />
    </Tooltip>
  ) : (
    <RemoveCircleOutlineIcon />
  );
};

const InputMappingViewer = props => {
  const inputMapping = props.value;

  return inputMapping ? (
    <Tooltip
      title={
        <div>
          {inputMapping.name} {inputMapping.origin}
        </div>
      }
    >
      <CheckCircle />
    </Tooltip>
  ) : (
    <RemoveCircleOutlineIcon />
  );
};

const SetCurrentLevelContainer = props => {
  const classes = useStyles(props);
  const { topics, inputs, topicFormulas } = props.set;
  const safeTopics = topics || [];
  const safeInputs = inputs || [];
  const safeTopicFormulas = topicFormulas || [];

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
      ...safeTopicFormulas.map(formula => ({
        value: formula,
        valueViewer: FormulaViewer,
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
          value: inputMapping,
          inputMapping,
          valueViewer: InputMappingViewer,
          dataEditor: InputMappingDialogEditor,
        };
      }),
      ...safeTopicFormulas.map(formula => {
        const formulaMapping = formula.formulaMappings.find(
          mapping => mapping.topicId === topic.id,
        );
        return {
          value: formulaMapping,
          valueViewer: FormulaMappingViewer,
          dataEditor: FormulaMappingDialogEditor,
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
