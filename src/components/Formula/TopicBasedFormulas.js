import React, { useState } from "react";
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
import { Switch, Button, Tooltip, Link } from "@material-ui/core";
import CloudDownload from "@material-ui/icons/CloudDownload";
import CheckCircle from "@material-ui/icons/CheckCircle";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Transition from "../../components/Shared/Transition";
import humanize from "string-humanize";

import { dhis2LookupElement } from "../../lib/dhis2Lookups";
import Dhis2ElementDetails from "./Dhis2ElementDetails";
import FormulaMappingDialogEditor from "./FormulaMappingDialogEditor";
import FormulaViewer from "./FormulaViewer";
import InputsMenu from "./InputsMenu";
import TopicMenu from "./TopicMenu";
import InputMappingDialogEditor from "./InputMappingDialogEditor";

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
  const inputMapping = props.value.inputMapping;

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
  const { topics, inputs, formulas, decisionTables, set, kind } = props;
  const setToUse = { ...set };
  setToUse.topics = setToUse.topics.map(topic => topic.id);
  setToUse.inputs = setToUse.inputs.map(input => input.id);
  const safeTopics = topics || [];
  const safeInputs = inputs;
  const safeTopicFormulas = formulas || [];
  const safeDecisionTables = decisionTables || [];

  const [graphDirection, setGraphDirection] = useState("TD");

  safeDecisionTables.forEach(
    decisionTable =>
      (decisionTable.parsedContent = decisionTable.content
        ? PapaParse.parse(decisionTable.content, {
            header: true,
          })
        : { data: [], meta: { fields: [] } }),
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
                    {decisionTable.name || ""} <br></br>
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
                  <Link
                    href={`./index.html#/sets/${set.id}/${kind.replace(
                      "_formulas",
                      "",
                    )}/decisions/${decisionTable.id}`}
                    underline="none"
                  >
                    {humanize(v.cell.value.header)}*
                  </Link>
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
      {
        value: "ADD",
        valueViewer: v => (
          <>{setToUse && <InputsMenu set={setToUse} kind={kind} />}</>
        ),

        readOnly: true,
      },
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
          value: {
            inputMapping: inputMapping,
            input: input,
            topic: topic,
            set: setToUse,
          },
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
        valueViewer: v => <>{setToUse && <TopicMenu set={setToUse} />}</>,

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
                <Button
                  name="Toggle direction"
                  title="Toggle direction"
                  onClick={() =>
                    setGraphDirection(graphDirection === "TD" ? "LR" : "TD")
                  }
                >
                  Toggle Direction
                </Button>
              )}
            </div>
            {showGraph && (
              <Mermaid
                id={"graph1" + graphDirection}
                key={"graph1" + graphDirection}
                content={formulasToMermaid(
                  formulas,
                  "./index.html#/sets/" + setToUse.id + "/topic_formulas",
                  graphDirection,
                )}
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
