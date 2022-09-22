import React, { Fragment, useState } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import FormulaPage from "../components/Formula/FormulaPage";
import PageContent from "../components/Shared/PageContent";
import TopBar from "../components/Shared/TopBar";
import { formattedName } from "../utils/textUtils";
import { externalApi } from "../actions/api";
import { deserialize } from "../utils/jsonApiUtils";

const FormulaContainer = props => {
  const { t } = useTranslation();
  console.log(props);
  const { match } = props;
  const formulaId = match.params.formulaId;

  const modeCreate = formulaId == "new";
  const formulaType = match.path.split("/")[3];
  const parent = match.path.split("/")[1];
  const parentId =
    parent === "sets" ? match.params.setId : match.params.compoundId;

  const loadFormulaQuery = useQuery(["loadFormula", formulaId], async () => {
    if (formulaId == "new") {
      return {
        code: "new_formula",
        shortName: "",
        description: "",
        expression: "1",
        availableVariables: [],
        mockValues: {},
        exportableIfs: [],
        usedFormulas: [],
        usedByFormulas: [],
      };
    } else {
      const response = await externalApi()
        .errorType("json")
        .url(`/${parent}/${parentId}/${formulaType}/${formulaId}`)
        .get()
        .json();
      const formula = await deserialize(response);
      return formula;
    }
  });
  const formula = loadFormulaQuery?.data;
  console.log(formula);

  const backLinkPath = `/${parent}/${parentId}/${formulaType}`;
  return (
    <Fragment>
      {formula && (
        <>
          <TopBar backLinkPath={backLinkPath}>
            <Typography variant="h6" color="inherit">
              {formattedName(t("resources.formula"))} {": " + formula.code}{" "}
              {" - Set : " + formula.setName}
            </Typography>
          </TopBar>
          <PageContent>
            <FormulaPage
              key={formulaId}
              formula={formula}
              exportableIfs={formula.exportableIfs}
              availableVariables={formula.availableVariables}
              mockValues={formula.mockValues}
              match={match}
              modeCreate={modeCreate}
            ></FormulaPage>
          </PageContent>
        </>
      )}
    </Fragment>
  );
};

export default FormulaContainer;
