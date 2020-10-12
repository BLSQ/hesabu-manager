/* globals describe, it, expect */

import { dependencies, formulasToMermaid } from "./utils";

describe("formula utils", () => {
  const formula = {
    code: "quantity",
    expression: "IF (ABS(difference_percentage) <= 10, verified , 0.0)",
  };

  const formula2 = {
    code: "difference_percentage",
    expression: "safe_div (claimed - verified , verified ) * 100.0",
  };
  const formulas = [formula, formula2];

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

  it("formulasToMermaid", () => {
    expect(formulasToMermaid(formulas, undefined)).toEqual(
      `
graph TD
quantity --> difference_percentage
quantity --> verified
difference_percentage --> claimed
difference_percentage --> verified
class quantity current
quantity("quantity <br> IF (ABS(difference_percentage) <= 10, verified , 0.0)")
class difference_percentage current
difference_percentage("difference_percentage <br> safe_div (claimed - verified , verified ) * 100.0")
classDef current fill:#f96;
`.trim(),
    );
  });
});
