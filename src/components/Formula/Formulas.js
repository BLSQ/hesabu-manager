import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import FormulaCard from "./FormulaCard";

const useStyles = makeStyles(theme => ({
  formulaWrapper: {
    display: "flex",
    flexWrap: "wrap",
    "& > div": {
      margin: theme.spacing(0, 2, 2, 0),
    },
  },
}));

const Formulas = ({ formulas, parent }) => {
  const classes = useStyles();
  return (
    <div className={classes.formulaWrapper}>
      <Grid
        container
        spacing={5}
        justifyContent="flex-start"
        justify="space-evenly"
        flexWrap="wrap"
        alignItems="stretch"
        alignContent="space-evenly"
      >
        {(formulas || []).map((formula, i) => (
          <Grid
            item
            justify="space-between"
            style={{ width: "550px", heigth: "100%" }}
            alignItems="stretch"
          >
            <FormulaCard
              key={`formula-${i}`}
              formula={formula}
              parent={parent}
            ></FormulaCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Formulas;
