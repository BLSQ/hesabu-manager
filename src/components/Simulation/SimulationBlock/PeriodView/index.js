import React from "react";
import { KeyNumberBlock } from "@blsq/manager-ui";
import humanize from "string-humanize";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import Table from "../Table";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(8),
  },
  keyNumbers: {
    margin: theme.spacing(0, 2, 2, 0),
  },
}));

const PeriodView = props => {
  const { periodView, className, setSelectedCell } = props;
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
      <Table periodView={periodView} setSelectedCell={setSelectedCell} />
    </div>
  );
};

PeriodView.propTypes = {
  className: PropTypes.string,
  periodView: PropTypes.object,
  setSelectedCell: PropTypes.func,
};

export default PeriodView;
