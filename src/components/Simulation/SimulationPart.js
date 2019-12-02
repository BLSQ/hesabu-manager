import { withStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Table from "./Table/table";
import SimulationHeader from "./Header";
import { KeyNumberBlock } from "@blsq/manager-ui";
import humanize from "string-humanize";
import { makeStyles } from "@material-ui/styles";

const styles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(6),
  },
  keyNumbers: {
    margin: theme.spacing(0, 2, 2, 0),
  },
}));

export const SimulationPart = props => {
  const { simulation } = props;
  const classes = styles();
  return (
    <div className={classes.root}>
      <SimulationHeader invoice={simulation} />
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

const mapStateToProps = state => ({});

export default withTranslation("translations")(
  withStyles(styles)(connect(mapStateToProps)(SimulationPart)),
);
