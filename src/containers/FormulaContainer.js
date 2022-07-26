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

const emptyFormula = {
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

const FormulaContainer = props => {
  const { t } = useTranslation();
  const [formula, setFormula] = useState(null);
  const [modeCreate, setModeCreate] = useState(false);
  const { match } = props;
  const formulaType = match.path.split("/")[3];
  const parent = match.path.split("/")[1];
  const parentId =
    parent === "sets" ? match.params.setId : match.params.compoundId;
  const formulaId = match.params.formulaId;

  const loadFormulaQuery = useQuery(
    ["loadFormula", match.params.formulaId],
    async () => {
      const response = await externalApi()
        .errorType("json")
        .url(`/${parent}/${parentId}/${formulaType}/${formulaId}`)
        .get()
        .json();
      const formula = await deserialize(response);
      return formula;
    },
    {
      onSuccess: resp => {
        setFormula(resp);
      },
      onError: error => {
        setFormula(emptyFormula);
        setModeCreate(true);
      },
    },
  );

  const backLinkPath = `/${parent}/${parentId}/${formulaType}`;
  return (
    <Fragment>
      {formula && (
        <>
          <TopBar backLinkPath={backLinkPath}>
            <Typography variant="h6" color="inherit">
              {formattedName(t("resources.formula"))} {": " + formula.code}
            </Typography>
          </TopBar>
          <PageContent>
            <FormulaPage
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
