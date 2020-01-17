import React from "react";
import { makeStyles } from "@material-ui/styles";
import ReactDataSheet from "react-datasheet";
import PropTypes from "prop-types";
import { APPBAR_WITH_TABS_HEIGHT } from "../../constants/ui";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: APPBAR_WITH_TABS_HEIGHT - theme.spacing(2),
    marginLeft: theme.spacing(-2),
    padding: theme.spacing(2),
  },
}));

function fakeColumGenerator(number, readOnly = false) {
  const items = [];
  for (let index = 0; index < number; index++) {
    items.push({
      value: "",
      readOnly,
    });
  }
  return items;
}

function fakeRowGenerator(number, fakeColumn) {
  const items = [];
  for (let index = 0; index < number; index++) {
    items.push(fakeColumn);
  }
  return items;
}

const SetCurrentLevelContainer = props => {
  const classes = useStyles(props);
  const { topics, inputs } = props.set;
  const safeTopics = topics || [];
  const safeInputs = inputs || [];
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
      ...safeInputs.map(() => ({
        value: "",
      })),
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
        <ReactDataSheet
          data={grid}
          valueRenderer={cell => cell.value}
          attributesRenderer={cell => ({ "data-nowrap": cell.noWrap || {} })}
        />
      </div>
    );
  }
  return null;
};

SetCurrentLevelContainer.propTypes = {
  set: PropTypes.object,
};

export default SetCurrentLevelContainer;
