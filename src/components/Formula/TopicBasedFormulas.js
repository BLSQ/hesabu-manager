import React from "react";
import { makeStyles } from "@material-ui/styles";
import Mermaid from "../Shared/Mermaid";
import { formulasToMermaid } from "./utils";
import ReactDataSheet from "react-datasheet";
import PropTypes from "prop-types";
import { APPBAR_WITH_TABS_HEIGHT } from "../../constants/ui";
import SectionLoading from "../../components/Shared/SectionLoading";
import PapaParse from "papaparse";
import DataElementComboAutocomplete from "../Shared/DataElementComboAutocomplete";
import {
  fakeColumGenerator,
  fakeRowGenerator,
} from "../../utils/dataGridUtils";
import {
  Switch,
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
import { externalApi } from "../../actions/api";
import { dhis2LookupElement } from "../../lib/dhis2Lookups";

const useStyles = makeStyles(theme => ({
  root: props => ({
    marginTop: APPBAR_WITH_TABS_HEIGHT - theme.spacing(2),
    marginLeft: props.loading ? 0 : theme.spacing(-2),
    padding: props.loading ? 0 : theme.spacing(2),
    width: props.loading ? " 100%" : "inherit",
  }),
  customWidth: {
    maxWidth: "1500px",
    maxHeight: "100vh",
  },
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

const useStylesFormMapping = makeStyles(() => ({
  paper: { minWidth: "500px", minHeight: "500px" },
}));

const FormulaMappingDialogEditor = props => {
  const classes = useStylesFormMapping();
  const cell = props.cell;
  const formulaMapping = cell.value.formulaMapping;
  const [newExternalReference, setNewExternalReference] = React.useState(
    formulaMapping ? formulaMapping.externalReference : "",
  );
  const [dhis2Object, setDhis2Object] = React.useState(
    formulaMapping ? dhis2LookupElement(newExternalReference) : undefined,
  );

  const [open, setOpen] = React.useState(true);

  const handleChange = (_e, v) => {
    if (v) {
      setNewExternalReference(v.id);
      setDhis2Object(dhis2LookupElement(v.id));
    }
  };

  const handleConfirm = async () => {
    if (cell.value.formulaMapping == undefined) {
      // CREATE
      try {
        const resp = await externalApi()
          .url(`/formula_mappings`)
          .post({
            data: {
              attributes: {
                topicId: cell.value.topic.id,
                formulaId: cell.value.formula.id,
                externalReference: newExternalReference,
              },
            },
          })
          .json();
        setOpen(!open);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      const resp = await externalApi()
        .url(`/formula_mappings/${cell.value.formulaMapping.id}`)
        .put({
          data: {
            attributes: {
              topicId: cell.value.topic.id,
              formulaId: cell.value.formula.id,
              externalReference: newExternalReference,
            },
          },
        })
        .json();

      setOpen(!open);
      window.location.reload();
    }
  };
  const deleteMapping = async () => {
    const resp = await externalApi()
      .url(`/formula_mappings/${cell.value.formulaMapping.id}`)
      .delete()
      .res();
    setOpen(!open);
    window.location.reload();
  };

  const modified = cell.value.formulaMapping
    ? cell.value.formulaMapping.externalReference !== newExternalReference
    : newExternalReference;
  const onClick = () => {
    setOpen(!open);
  };

  return (
    <Dialog
      disableBackdropClick
      open={open}
      TransitionComponent={Transition}
      classes={{ paper: classes.paper }}
    >
      <DialogTitle id="form-dialog-title">
        <b>Mapping out</b>
        <br></br>
        <ul>
          {cell.value.formula.shortName} - {cell.value.topic.name} <br></br>
          {dhis2Object && dhis2Object.name} <br></br>
          {newExternalReference}
        </ul>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <DataElementComboAutocomplete
            onChange={handleChange}
            defaultInputValue={[
              cell.value.formula.shortName,
              cell.value.topic.name,
            ].join(" - ")}
          ></DataElementComboAutocomplete>
          {dhis2Object && <Dhis2ElementDetails dhis2Object={dhis2Object} />}
        </DialogContentText>
        {cell.value.formulaMapping && (
          <Button color="secondary" onClick={deleteMapping}>
            Delete
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClick}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleConfirm} disabled={!modified}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const InputMappingDialogEditor = ({ cell }) => {
  const classes = useStylesFormMapping();
  const inputMapping = cell.inputMapping;
  const [open, setOpen] = React.useState(true);

  const onClick = () => {
    setOpen(!open);
  };

  let dhis2Object = dhis2LookupElement(inputMapping.externalReference);

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
          {cell.inputMapping.name}
        </DialogTitle>
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
          <Button color="primary" onClick={onClick}>
            Cancel
          </Button>
          <Button color="primary" onClick={onClick}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
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
  const mapping = props.value;
  let dataElement = dhis2LookupElement(
    mapping.formulaMapping
      ? mapping.formulaMapping.externalReference
      : undefined,
  );

  return mapping.formulaMapping ? (
    <Tooltip
      title={
        <div>
          {dataElement && dataElement.name}
          <br></br>
          {mapping.formulaMapping.externalReference}
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

const CellRenderer = props => {
  return <td {...props}></td>;
};

const TopicBasedFormulas = props => {
  const classes = useStyles(props);
  const { topics, inputs, formulas, decisionTables } = props;
  const safeTopics = topics || [];
  const safeInputs = inputs;
  const safeTopicFormulas = formulas || [];
  const safeDecisionTables = decisionTables || [];

  safeDecisionTables.forEach(
    decisionTable =>
      (decisionTable.parsedContent = PapaParse.parse(decisionTable.content, {
        header: true,
      })),
  );

  const [showGraph, setShowGraph] = React.useState(false);

  const handleChange = event => {
    setShowGraph(event.target.checked);
  };

  const findInputMapping = (input, inputMappings) => {
    return inputMappings.find(
      inputMapping => inputMapping.input && inputMapping.input.id === input.id,
    );
  };

  const defaultGrid = [
    [
      { value: "", disableEvents: true, readOnly: true },
      ...safeInputs.map(input => ({
        value: input.name,
        disableEvents: true,
        readOnly: true,
        valueViewer: v => (
          <span style={{ fontStyle: "italic" }}>{v.cell.value}</span>
        ),
      })),
      ...safeDecisionTables.flatMap(decisionTable => {
        return decisionTable.outHeaders.map(header => ({
          value: { header, decisionTable },
          disableEvents: true,
          readOnly: true,
          valueViewer: v => (
            <Tooltip
              classes={{ tooltip: classes.customWidth }}
              title={
                <div>
                  IN :{v.cell.value.decisionTable.inHeaders.join(" , ")}{" "}
                  <br></br>
                  OUT : {v.cell.value.decisionTable.outHeaders.join(" , ")}{" "}
                  <br></br>
                  Decision table (
                  {v.cell.value.decisionTable.content.split("\n").length -
                    1}{" "}
                  lines):
                  <pre>{v.cell.value.decisionTable.content}</pre>
                </div>
              }
            >
              <span style={{ fontStyle: "italic" }}>
                {humanize(v.cell.value.header)}*
              </span>
            </Tooltip>
          ),
        }));
      }),
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
        style: { backgroundColor: "yellow" },
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
      ...safeDecisionTables.flatMap(decisionTable => {
        return decisionTable.outHeaders.map(header => ({
          value: { header, decisionTable },
          disableEvents: true,
          readOnly: true,
          valueViewer: v => (
            <Tooltip
              classes={{ tooltip: classes.customWidth }}
              title={
                <div>
                  <pre>
                    {PapaParse.unparse(
                      v.cell.value.decisionTable.parsedContent.data.filter(
                        r =>
                          r["in:activity_code"] === topic.code ||
                          r["in:activity_code"] === "*",
                      ),
                    )}
                  </pre>
                </div>
              }
            >
              <RemoveCircleOutlineIcon />
            </Tooltip>
          ),
        }));
      }),
      ...safeTopicFormulas.map(formula => {
        const formulaMapping = formula.formulaMappings.find(
          mapping => mapping.topicId === topic.id,
        );
        return {
          value: {
            formulaMapping: formulaMapping,
            formula: formula,
            topic: topic,
          },
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
          <div>
            <Switch
              color="primary"
              name="show graph"
              title="show graph"
              checked={showGraph}
              onChange={handleChange}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            {showGraph && (
              <Mermaid
                id="graph1"
                content={formulasToMermaid(formulas, undefined)}
              />
            )}
            {!showGraph && (
              <ReactDataSheet
                disablePageClick={true}
                data={grid}
                cellRenderer={CellRenderer}
                valueRenderer={cell => cell.value}
                attributesRenderer={cell => ({
                  "data-nowrap": cell.noWrap || {},
                })}
              />
            )}
          </div>
        )}
      </div>
    );
  }
  return null;
};

TopicBasedFormulas.propTypes = {
  topics: PropTypes.array,
  inputs: PropTypes.array,
};

export default TopicBasedFormulas;
