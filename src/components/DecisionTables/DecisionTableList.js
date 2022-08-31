import React from "react";
import { useQuery } from "react-query";
import { Typography } from "@material-ui/core";
import { externalApi } from "../../actions/api";
import TopBar from "../Shared/TopBar";
import PageContent from "../Shared/PageContent";
import { deserialize } from "../../utils/jsonApiUtils";
import DecisionTableListItem from "./DecisionTableListItem";

const DecisionTableList = ({ set }) => {
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

  const decisions = fetchDecisionTablesQuery?.data;

  return (
    <div>
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
