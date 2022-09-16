import React from "react";
import { makeStyles, Grid, Button } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import FormulaCard from "./FormulaCard";
import Mermaid from "../Shared/Mermaid";
import { formulasToMermaid } from "./utils";

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
  const [showGraph, setShowGraph] = React.useState(false);
  const [graphDirection, setGraphDirection] = React.useState("TD");
  const handleChange = event => {
    setShowGraph(event.target.checked);
  };
  const classes = useStyles();

  return (
    <div className={classes.formulaWrapper}>
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
      {!showGraph && (
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
      )}

      {showGraph && (
        <Mermaid
          id={"graph1" + graphDirection}
          key={graphDirection}
          content={formulasToMermaid(
            formulas,
            "./index.html#/" +
              (parent.sets ? "compounds" : "sets") +
              "/" +
              parent.id +
              "/" +
              (parent.sets ? "compound_formulas" : "set_formulas"),
            graphDirection,
          )}
        />
      )}
    </div>
  );
};

export default Formulas;
