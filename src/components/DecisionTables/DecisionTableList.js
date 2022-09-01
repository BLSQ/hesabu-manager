import React from "react";
import { useQuery } from "react-query";
import { externalApi } from "../../actions/api";
import PageContent from "../Shared/PageContent";
import { deserialize } from "../../utils/jsonApiUtils";
import DecisionTableListItem from "./DecisionTableListItem";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  listHolder: {
    width: "100%",
    marginTop: "4rem",
    marginRight: "10rem",
  },
}));

const DecisionTableList = ({ set }) => {
  const classes = useStyles();
  const setId = set.id;
  const fetchDecisionTablesQuery = useQuery(
    ["fetchDecisionTables", setId],
    async () => {
      let response = await externalApi()
        .errorType("json")
        .url(`/sets/${setId}/topic_decision_tables`)
        .get()
        .json();

      response = await deserialize(response);
      return response;
    },
    {
      onError: error => console.log(error.message),
    },
  );

  let decisions = fetchDecisionTablesQuery?.data;
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
            <DecisionTableListItem key={index} decision={decision} />
          ))}
        </PageContent>
      )}
    </div>
  );
};

export default DecisionTableList;
