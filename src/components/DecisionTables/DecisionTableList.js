import React, { useState } from "react";
import { makeStyles, TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import sortBy from "lodash/sortBy";
import PageContent from "../Shared/PageContent";
import DecisionTableListItem from "./DecisionTableListItem";
import { filterDecisionTables } from "./utils";

const useStyles = makeStyles(theme => ({
  listHolder: {
    width: "100%",
    marginTop: "4rem",
    marginRight: "10rem",
  },
  filter: {
    width: 500,
    maxWidth: "100%",
    marginBottom: theme.spacing(3),
  },
}));

const DecisionTableList = props => {
  const classes = useStyles();
  const setId = props.set.id;
  const [filter, setFilter] = useState("");

  let decisions = props.set.topicDecisionTables;

  if (decisions) {
    decisions = sortBy(decisions, ["name", "startDate"]);
  }
  const filteredDecisions =
    decisions && filterDecisionTables(decisions, filter);

  return (
    <div className={classes.listHolder}>
      {decisions && (
        <PageContent>
          <TextField
            className={classes.filter}
            size="small"
            variant="outlined"
            placeholder="Filter by name or period (e.g. 202206, 2022Q2)"
            value={filter}
            onChange={event => setFilter(event.target.value)}
            helperText={
              filter
                ? `${filteredDecisions.length} / ${decisions.length} decision tables`
                : "a period also shows the tables without periods"
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          {filteredDecisions.map(decision => (
            <DecisionTableListItem
              key={decision.id}
              setId={setId}
              decision={decision}
            />
          ))}
        </PageContent>
      )}
    </div>
  );
};

export default DecisionTableList;
