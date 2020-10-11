import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import FormulaPage from "../components/Formula/FormulaPage";
import PageContent from "../components/Shared/PageContent";
import TopBar from "../components/Shared/TopBar";
import { formattedName } from "../utils/textUtils";

const FormulaContainer = props => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <TopBar>
        <Typography variant="h6" color="inherit">
          {formattedName(t("resources.formula"))}
        </Typography>
      </TopBar>
      <PageContent>
        <FormulaPage
          formula={{
            code: "Payment",
            shortName: "pay",
            expression:
              "quantity_subsidies + ((quality_score/100) * quantity_subsidies)",
            frequency: "monthly",
            description:
              "Pma payment monthly quantity plus a prorata of the quality score",
            exportableIf: null,
          }}
          exportableIfs={["exportable_quality_and_quantity"]}
          availableVariables={[
            "%{eczs_cas_current_quarter_values}",
            "%{eczs_temoins_current_quarter_values}",
            "%{subsides_trimestriels_current_cycle_values}",
            "%{subsides_trimestriels_current_quarter_quarterly_values}",
            "%{subsides_trimestriels_eczs_cas_current_quarter_values}",
            "%{subsides_trimestriels_eczs_temoins_current_quarter_values}",
            "%{subsides_trimestriels_is_null_last_1_quarters_exclusive_window_values}",
            "%{subsides_trimestriels_is_null_last_1_quarters_window_values}",
            "%{subsides_trimestriels_is_null_last_2_quarters_exclusive_window_values}",
            "%{subsides_trimestriels_is_null_last_2_quarters_window_values}",
            "%{subsides_trimestriels_is_null_last_3_quarters_exclusive_window_values}",
            "%{subsides_trimestriels_is_null_last_3_quarters_window_values}",
            "%{subsides_trimestriels_is_null_last_4_quarters_exclusive_window_values}",
            "%{subsides_trimestriels_is_null_last_4_quarters_window_values}",
            "%{subsides_trimestriels_last_1_quarters_exclusive_window_values}",
            "%{subsides_trimestriels_last_1_quarters_window_values}",
            "%{subsides_trimestriels_last_2_quarters_exclusive_window_values}",
            "%{subsides_trimestriels_last_2_quarters_window_values}",
            "%{subsides_trimestriels_last_3_quarters_exclusive_window_values}",
            "%{subsides_trimestriels_last_3_quarters_window_values}",
            "%{subsides_trimestriels_last_4_quarters_exclusive_window_values}",
            "%{subsides_trimestriels_last_4_quarters_window_values}",
            "%{subsides_trimestriels_previous_year_same_quarter_values}",
            "%{subsides_trimestriels_previous_year_values}",
            "eczs_cas",
            "eczs_temoins",
            "eczs_type",
            "month_of_quarter",
            "month_of_year",
            "quarter_of_year",
            "subsides_trimestriels",
            "subsides_trimestriels_eczs_cas",
            "subsides_trimestriels_eczs_temoins",
            "subsides_trimestriels_is_null",
            "subsides_trimestriels_level_1",
            "subsides_trimestriels_level_1_quarterly",
            "subsides_trimestriels_level_2",
            "subsides_trimestriels_level_2_quarterly",
            "subsides_trimestriels_level_3",
            "subsides_trimestriels_level_3_quarterly",
            "subsides_trimestriels_level_4",
            "subsides_trimestriels_level_4_quarterly",
            "subsides_trimestriels_level_5",
            "subsides_trimestriels_level_5_quarterly",
            "subsides_trimestriels_zone_main_orgunit",
            "year",
          ]}
          mockValues={{ quantity_subsidies: "45105", quality_score: "12.5" }}
        ></FormulaPage>
      </PageContent>
    </Fragment>
  );
};

export default FormulaContainer;
