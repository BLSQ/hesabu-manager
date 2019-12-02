import React from "react";
import { KeyNumberBlock } from "@blsq/manager-ui";
import humanize from "string-humanize";
import { makeStyles } from "@material-ui/styles";
import Table from "./Table/table";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(6),
  },
  keyNumbers: {
    margin: theme.spacing(0, 2, 2, 0),
  },
}));

const SimulationPart = props => {
  const { simulation } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.keyNumbersContainer}>
        {simulation.total_items.map((item, index) => (
          <KeyNumberBlock
            key={`key-number-${item.solution}-index`}
            text={humanize(item.formula)}
            value={item.solution}
            className={classes.keyNumbers}
          />
        ))}
      </div>
      <Table invoice={simulation} />
    </div>
  );
};

export default SimulationPart;
