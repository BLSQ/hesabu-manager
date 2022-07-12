import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import FormulaPage from "../components/Formula/FormulaPage";
import PageContent from "../components/Shared/PageContent";
import TopBar from "../components/Shared/TopBar";
import { formattedName } from "../utils/textUtils";
import { externalApi } from "../actions/api";

const FormulaContainer = props => {
  const { t } = useTranslation();
  const { match } = props;
  const formulaType = match.path.split("/")[3];
  const parent = match.path.split("/")[1];
  const parentId =
    parent === "sets" ? match.params.setId : match.params.compoundId;
  const loadFormulaQuery = useQuery(["loadFormula"], async () => {
    const response = await externalApi()
      .errorType("json")
      .url(`/${parent}/${parentId}/${formulaType}/${match.params.formulaId}`)
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
        {loadFormulaQuery.data && (
          <FormulaPage
            formula={loadFormulaQuery.data}
            exportableIfs={loadFormulaQuery.data.exportableIfs}
            availableVariables={loadFormulaQuery.data.availableVariables}
            mockValues={loadFormulaQuery.data.mockValues}
          ></FormulaPage>
        )}
      </PageContent>
    </Fragment>
  );
};

export default FormulaContainer;
