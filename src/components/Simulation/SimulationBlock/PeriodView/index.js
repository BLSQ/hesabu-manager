import React from "react";
import { KeyNumberBlock } from "@blsq/manager-ui";
import humanize from "string-humanize";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import Table from "../Table";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(6),
  },
  keyNumbers: {
    margin: theme.spacing(0, 2, 2, 0),
  },
}));

const PeriodView = props => {
  const { periodView, className } = props;
  const classes = useStyles();
  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.keyNumbersContainer}>
        {periodView.total_items.map((item, index) => (
          <KeyNumberBlock
            key={`key-number-${item.solution}-${index}`}
            text={humanize(item.formula)}
            value={item.solution}
            className={classes.keyNumbers}
          />
        ))}
      </div>
      <Table periodView={periodView} />
    </div>
  );
};

export default PeriodView;