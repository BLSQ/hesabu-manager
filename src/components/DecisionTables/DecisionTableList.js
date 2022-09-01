import React from "react";
import PageContent from "../Shared/PageContent";
import DecisionTableListItem from "./DecisionTableListItem";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  listHolder: {
    width: "100%",
    marginTop: "4rem",
    marginRight: "10rem",
  },
}));

const DecisionTableList = props => {
  const classes = useStyles();
  const setId = props.set.id;

  let decisions = props.set.topicDecisionTables;

  if (decisions) {
    decisions = decisions.sort((a, b) =>
      a.startPeriod === b.startPeriod
        ? a.name - b.name
        : b.startPeriod - a.startPeriod,
    );
  }

  return (
    <div className={classes.listHolder}>
      {decisions && (
        <PageContent>
          {decisions.map((decision, index) => (
            <DecisionTableListItem
              key={index}
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
