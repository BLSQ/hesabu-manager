/* globals describe, it, expect */

import {
  dependencies,
  filterTopics,
  formulasToMermaid,
  onlyMapped,
  otherSetsUsingTopic,
} from "./utils";

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

describe("filterTopics", () => {
  const topics = [
    {
      name: "Consultation externe (nvx cas) - 0 à 1 mois",
      shortName: "Consult ext 0-1m",
      code: "quant01",
    },
    {
      name: "Accouchement assisté",
      shortName: "Accouchement",
      code: "assisted_deliveries",
    },
    { name: "Vaccination", shortName: null, code: "vaccination_under_one" },
  ];
  const names = result => result.map(topic => topic.code);

  it("returns all topics for an empty or blank filter", () => {
    expect(filterTopics(topics, "")).toBe(topics);
    expect(filterTopics(topics, "   ")).toBe(topics);
    expect(filterTopics(topics, undefined)).toBe(topics);
  });

  it("matches the name case and accent insensitive", () => {
    expect(names(filterTopics(topics, "ACCOUCHEMENT ASSISTE"))).toEqual([
      "assisted_deliveries",
    ]);
    expect(names(filterTopics(topics, "assiste "))).toEqual([
      "assisted_deliveries",
    ]);
    expect(names(filterTopics(topics, "a 1 mois"))).toEqual(["quant01"]);
  });

  it("matches the code and the short name", () => {
    expect(names(filterTopics(topics, "under_one"))).toEqual([
      "vaccination_under_one",
    ]);
    expect(names(filterTopics(topics, "0-1m"))).toEqual(["quant01"]);
  });

  it("requires every word to match, in any order", () => {
    expect(names(filterTopics(topics, "externe consultation"))).toEqual([
      "quant01",
    ]);
    expect(names(filterTopics(topics, "consultation vaccination"))).toEqual([]);
  });
});

describe("filterTopics accents", () => {
  it("matches an accented name without typing the accents", () => {
    const topics = [{ name: "Référence évacuée", shortName: "", code: "ref" }];
    expect(filterTopics(topics, "reference evacuee")).toEqual(topics);
    expect(filterTopics(topics, "RÉFÉRENCE")).toEqual(topics);
  });
});

describe("onlyMapped", () => {
  const declared = { id: "i1", name: "declared" };
  const verified = { id: "i2", name: "verified" };
  const unusedInput = { id: "i3", name: "unused" };
  const inputs = [declared, verified, unusedInput];

  const viaInput = {
    id: "t1",
    code: "via_input",
    inputMappings: [{ input: { id: "i1" } }, { input: { id: "i2" } }],
  };
  const viaFormula = { id: "t2", code: "via_formula", inputMappings: [] };
  const unmapped = { id: "t3", code: "unmapped", inputMappings: [] };
  const brokenMapping = {
    id: "t4",
    code: "broken_mapping",
    inputMappings: [{ input: null }],
  };
  const topics = [viaInput, viaFormula, unmapped, brokenMapping];

  const amount = {
    id: "f1",
    code: "amount",
    formulaMappings: [{ topicId: "t2" }],
  };
  const unusedFormula = { id: "f2", code: "unused", formulaMappings: [] };
  const formulas = [amount, unusedFormula];

  const codes = items => items.map(item => item.code || item.name);

  it("keeps topics with at least one input or formula mapping", () => {
    expect(codes(onlyMapped(topics, inputs, formulas).topics)).toEqual([
      "via_input",
      "via_formula",
    ]);
  });

  it("drops the inputs and formulas mapped for none of the topics", () => {
    const result = onlyMapped(topics, inputs, formulas);
    expect(codes(result.inputs)).toEqual(["declared", "verified"]);
    expect(codes(result.formulas)).toEqual(["amount"]);
  });

  it("drops the decision table columns, they have no mapping", () => {
    expect(onlyMapped(topics, inputs, formulas).decisionTables).toEqual([]);
  });

  it("only counts the mappings of the given topics", () => {
    const result = onlyMapped([viaFormula, unmapped], inputs, formulas);
    expect(codes(result.topics)).toEqual(["via_formula"]);
    expect(result.inputs).toEqual([]);
    expect(codes(result.formulas)).toEqual(["amount"]);
  });

  it("ignores mappings to inputs that are not columns of the grid", () => {
    const result = onlyMapped([viaInput], [unusedInput], []);
    expect(result.topics).toEqual([]);
    expect(result.inputs).toEqual([]);
  });

  it("tolerates topics and formulas without mapping lists", () => {
    const bare = { id: "t5", code: "bare" };
    const result = onlyMapped([bare], inputs, [{ id: "f3", code: "bare_f" }]);
    expect(result).toEqual({
      topics: [],
      inputs: [],
      formulas: [],
      decisionTables: [],
    });
  });
});

describe("otherSetsUsingTopic", () => {
  const sets = [
    {
      id: "1241",
      name: "Quantité PMA PMNS",
      topics: [{ id: "7791" }, { id: "3781" }],
    },
    { id: "1240", name: "Quantité PCA PMNS", topics: [{ id: "3781" }] },
    { id: "999", name: "Qualité", topics: [] },
    { id: "998", name: "Sans topics" },
  ];
  const names = result => result.map(set => set.name);

  it("lists the other sets containing the topic", () => {
    expect(names(otherSetsUsingTopic(sets, "3781", "1241"))).toEqual([
      "Quantité PCA PMNS",
    ]);
  });

  it("is empty for a topic only in the current set", () => {
    expect(otherSetsUsingTopic(sets, "7791", "1241")).toEqual([]);
  });

  it("compares ids whatever their type", () => {
    expect(names(otherSetsUsingTopic(sets, 3781, 1240))).toEqual([
      "Quantité PMA PMNS",
    ]);
  });

  it("tolerates sets not loaded yet", () => {
    expect(otherSetsUsingTopic(undefined, "3781", "1241")).toEqual([]);
  });
});
