import React from "react";
import { makeStyles } from "@material-ui/styles";
import Mermaid from "../Shared/Mermaid";
import { formulasToMermaid } from "./utils";
import ReactDataSheet from "react-datasheet";
import PropTypes from "prop-types";
import { APPBAR_WITH_TABS_HEIGHT } from "../../constants/ui";
import SectionLoading from "../../components/Shared/SectionLoading";
import PapaParse from "papaparse";
import AddIcon from "@material-ui/icons/Add";
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
  Link,
  Typography,
  Tooltip,
} from "@material-ui/core";
import CloudDownload from "@material-ui/icons/CloudDownload";
import CheckCircle from "@material-ui/icons/CheckCircle";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Transition from "../../components/Shared/Transition";
import humanize from "string-humanize";

import { dhis2LookupElement } from "../../lib/dhis2Lookups";
import Dhis2ElementDetails from "./Dhis2ElementDetails";
import FormulaMappingDialogEditor from "./FormulaMappingDialogEditor";
import FormulaViewer from "./FormulaViewer";

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

const useStylesFormMapping = makeStyles(() => ({
  paper: { minWidth: "500px", minHeight: "500px" },
}));

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
  const { topics, inputs, formulas, decisionTables, set } = props;
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
          valueViewer: v => {
            return (
              <Tooltip
                classes={{ tooltip: classes.customWidth }}
                title={
                  <div>
                    {decisionTable.startPeriod || "?"} {" -> "}
                    {decisionTable.endPeriod || "?"}
                    <br></br>
                    IN :{v.cell.value.decisionTable.inHeaders.join(" , ")}{" "}
                    <br></br>
                    OUT : {v.cell.value.decisionTable.outHeaders.join(
                      " , ",
                    )}{" "}
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
            );
          },
        }));
      }),
      ...safeTopicFormulas.map((formula, index) => ({
        value: formula,
        readOnly: true,
        disableEvents: true,
        valueViewer: formula => {
          return (
            <FormulaViewer
              formula={formula}
              index={index}
              classes={userFormulaViewerStyles()}
            />
          );
        },
      })),
      ...fakeColumGenerator(10, true),
    ],
  ];
  const grid = [
    ...defaultGrid,
    ...safeTopics.map(topic => [
      {
        value: topic,
        readOnly: true,
        disableEvents: true,
        noWrap: true,
        style: { backgroundColor: "yellow" },
        valueViewer: topic => {
          return <span title={topic.value.code}>{topic.value.name}</span>;
        },
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
                  {decisionTable.startPeriod || "?"} {" -> "}
                  {decisionTable.endPeriod || "?"}
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
    [
      {
        value: "ADD",
        valueViewer: v => (
          <Button
            href={"./index.html#/sets/" + set.id + "/topic_formulas/import"}
          >
            <AddIcon></AddIcon>
          </Button>
        ),

        readOnly: true,
      },
    ],
    ,
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
