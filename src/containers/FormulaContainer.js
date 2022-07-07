import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "react-query";
import FormulaPage from "../components/Formula/FormulaPage";
import PageContent from "../components/Shared/PageContent";
import TopBar from "../components/Shared/TopBar";
import { formattedName } from "../utils/textUtils";
import { externalApi } from "../actions/api";

const FormulaContainer = props => {
  const { t } = useTranslation();
  const { match } = props;
  const loadSetQuery = useQuery(["loadSet"], async () => {
    const response = await externalApi()
      .errorType("json")
      .url(
        `/sets/${match.params.setId}/topic_formulas/${match.params.formulaId}`,
      )
      .get()
      .json();
    const formula = response?.data;
    return formula?.attributes;
  });
  return (
    <Fragment>
      <TopBar>
        <Typography variant="h6" color="inherit">
          {formattedName(t("resources.formula"))}
        </Typography>
      </TopBar>
      <PageContent>
        {loadSetQuery.data && (
          <FormulaPage
            formula={loadSetQuery.data}
            exportableIfs={loadSetQuery.data.exportableIfs}
            availableVariables={loadSetQuery.data.availableVariables}
            mockValues={loadSetQuery.data.mockValues}
          ></FormulaPage>
        )}
      </PageContent>
    </Fragment>
  );
};

export default FormulaContainer;
