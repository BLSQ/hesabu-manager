/* globals describe, it, expect */

import { dependencies, formulasToMermaid } from "./utils";

describe("formula utils", () => {
  const formula = {
    id: "1",
    code: "quantity",
    expression: "IF (ABS(difference_percentage) <= 10, verified , 0.0)",
  };

  const formula2 = {
    id: "2",
    code: "difference_percentage",
    expression: "safe_div (claimed - verified , verified ) * 100.0",
  };
  const formulas = [formula, formula2];

  it("dependencies remove if comparison constant", () => {
    expect(
      dependencies(
        "if(baq_trim == 0 AND baq_apply ==1 AND actif_baq !=1,if( is_last_month==1,nombre_baq*valeur_du_baq,0),0)",
      ),
    ).toEqual([
      "baq_trim",
      "baq_apply",
      "actif_baq",
      "is_last_month",
      "nombre_baq",
      "valeur_du_baq",
    ]);
  });

  it("dependencies remove if comparison constant", () => {
    expect(dependencies(formula.expression)).toEqual([
      "difference_percentage",
      "verified",
    ]);
  });

  it("dependencies unique", () => {
    expect(dependencies(formula2.expression)).toEqual(["claimed", "verified"]);
  });

  it("dependencies AND OR", () => {
    expect(
      dependencies(`if(denomination==0,
        if(indicator_parameter_1_is_null ==1 AND indicator_parameter_2_is_null==1,0,1),
        if(indicator_denominator_is_null ==1 OR indicator_parameter_1_is_null ==1,0,1)
        )`),
    ).toEqual([
      "denomination",
      "indicator_parameter_1_is_null",
      "indicator_parameter_2_is_null",
      "indicator_denominator_is_null",
    ]);
  });

  it("dependencies && ||", () => {
    expect(
      dependencies(`IF(ccss_percentage < 90 || ccss_offenses_count == 0,
        IF(ccss_offenses_count == 1, 50,
        IF(ccss_offenses_count >= 2, 100, 0)
        ),IF(ccss_percentage >= 90 && ccss_percentage < 95,IF(ccss_offenses_count == 1, 20,
          IF(ccss_offenses_count == 2, 50,
          IF(ccss_offenses_count == 3, 100, 0)
          )
         ),0))`),
    ).toEqual(["ccss_percentage", "ccss_offenses_count"]);
  });

  it("dependencies eval_array", () => {
    expect(
      dependencies(`
  sum(
    eval_array(
       "exhaustif", array(%{exhaustivity_fosa_values}),
       "category",array(%{med_category_fosa_values}),
       "if(exhaustif == 100 and category ==1, 1, 0)"
     )
 )`),
    ).toEqual([
      "exhaustif",
      "exhaustivity_fosa_values",
      "category",
      "med_category_fosa_values",
    ]);
  });

  it("dependencies eval_array", () => {
    expect(
      dependencies(`
     eval_array('valid_meds',array(%{stock_presence_fosa_validity_check_values}),'presence_values', array(%{stock_presence_fosa_values}),'valid_meds*presence_values')
  `),
    ).toEqual([
      "valid_meds",
      "stock_presence_fosa_validity_check_values",
      "presence_values",
      "stock_presence_fosa_values",
    ]);
  });

  it("formulasToMermaid", () => {
    expect(
      formulasToMermaid(formulas, "url_prefix/parent/id/formulas"),
    ).toEqual(
      `
graph TD
difference_percentage --> quantity
verified --> quantity
claimed --> difference_percentage
verified --> difference_percentage
class quantity current
quantity("quantity <br> IF (ABS(difference_percentage) <= 10, verified , 0.0)")
click quantity "url_prefix/parent/id/formulas/1"
class difference_percentage current
difference_percentage("difference_percentage <br> safe_div (claimed - verified , verified ) * 100.0")
click difference_percentage "url_prefix/parent/id/formulas/2"
classDef current fill:#f96;
`.trim(),
    );
  });
});
