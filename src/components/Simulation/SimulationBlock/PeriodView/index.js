import React from "react";
import { KeyNumberBlock } from "@blsq/manager-ui";
import humanize from "string-humanize";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fade } from "@material-ui/core";
import Table from "../Table";
import { setSelectedCell } from "../../../../actions/ui";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(8),
  },
  keyNumbers: {
    margin: theme.spacing(0, 2, 2, 0),
    padding: 0,
    background: "none",
    border: "none",
    textAlign: "left",
    "& > div": {
      minWidth: 150,
    },
    cursor: "pointer",
    "&:focus, &:active": {
      outlineColor: fade(theme.palette.primary.main, 0.1),
      color: theme.palette.text.primary,
      outlineWidth: 5,
      outlineStyle: "solid",
    },
  },
}));

const PeriodView = props => {
  const { periodView, className } = props;
  const classes = useStyles();
  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.keyNumbersContainer}>
        {periodView.totalItems.map((item, index) => (
          <button
            onClick={() => props.setSelectedCell(item)}
            key={`key-number-${item.solution}-${index}`}
            className={classes.keyNumbers}
          >
            <KeyNumberBlock
              text={humanize(item.formula)}
              value={item.solution}
            />
          </button>
        ))}
      </div>
      <Table periodView={periodView} />
    </div>
  );
};

PeriodView.propTypes = {
  className: PropTypes.string,
  periodView: PropTypes.object,
  setSelectedCell: PropTypes.func,
};

const mapStateToProps = state => ({
  selectedCell: state.ui.selectedCell,
});

export default connect(mapStateToProps, { setSelectedCell })(PeriodView);
