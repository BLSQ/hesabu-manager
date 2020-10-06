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
