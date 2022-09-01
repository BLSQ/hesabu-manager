import { Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { externalApi } from "../../actions/api";
import PageContent from "../../components/Shared/PageContent";
import TopBar from "../../components/Shared/TopBar";
import { deserialize } from "../../utils/jsonApiUtils";
import { formattedName } from "../../utils/textUtils";
import DecisionTableForm from "./DecisionTableForm";

const DecisionTableContainer = props => {
  const { t } = useTranslation();
  const { setId, decisionTableId } = props.match.params;

  const backLinkPath = window.location.hash
    .replace(`/decisions/${decisionTableId}`, "_formulas")
    .slice(1);

  const loadSetQuery = useQuery(
    ["loadSet", setId, decisionTableId],
    async () => {
      let response = await externalApi()
        .errorType("json")
        .url(`/sets/${setId}`)
        .get()
        .json();
      response = await deserialize(response);
      const decisionTable = response.topicDecisionTables.find(
        table => table.id == decisionTableId,
      );
      return { set: response, decisionTable };
    },
    {
      onError: error => {
        console.log(error);
      },
    },
  );

  let decisionTableName = "new";
  let decisionTable = undefined;
  if (loadSetQuery?.data?.decisionTable) {
    decisionTable = loadSetQuery.data.decisionTable;
    decisionTableName = `${decisionTable.name} (${decisionTable.startPeriod} => ${decisionTable.endPeriod})`;
  }
  return (
    <>
      {" "}
      {loadSetQuery.data && (
        <div>
          <TopBar backLinkPath={backLinkPath}>
            <Typography variant="h6" color="inherit">
              {formattedName(t("resources.decisionTable")) +
                `: ${loadSetQuery.data.set.name} > ${decisionTableName} `}
            </Typography>
          </TopBar>
          <PageContent>
            <DecisionTableForm
              decisionTable={loadSetQuery.data.decisionTable}
              set={loadSetQuery.data.set}
            />
          </PageContent>
        </div>
      )}
    </>
  );
};

export default DecisionTableContainer;
