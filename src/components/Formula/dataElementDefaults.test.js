import { describe, it, expect } from "vitest";
import {
  dataElementDefaults,
  dataElementErrors,
  fitWithSuffix,
} from "./dataElementDefaults";

const declared = { id: "i1", code: "declaree", name: "Déclarée" };
const rate = { id: "i2", code: "taux_validation", name: "Taux validation" };

const mapped = (input, externalReference) => ({
  input: { id: input.id },
  kind: "data_element",
  externalReference,
});

const topic = {
  id: "t1",
  code: "quant98",
  name: "Consultation externe (nvx cas) - 0 à 1 mois - indigent",
  shortName: "Cons externe nvx cas - 0-1ms - indigent",
  inputMappings: [],
};

const dataElements = {
  de1: {
    name: "Consultation curative - dec",
    valueType: "NUMBER",
    aggregationType: "SUM",
  },
  de2: {
    name: "Accouchement assisté - dec",
    valueType: "INTEGER_ZERO_OR_POSITIVE",
    aggregationType: "SUM",
  },
  de3: {
    name: "CPN 1 - dec",
    valueType: "INTEGER_ZERO_OR_POSITIVE",
    aggregationType: "SUM",
  },
  tv1: {
    name: "Consultation curative - taux validation",
    valueType: "UNIT_INTERVAL",
    aggregationType: "AVERAGE",
  },
};
const lookup = id => dataElements[id];

describe("dataElementDefaults", () => {
  it("follows the naming and types used for the state on the other topics", () => {
    const topics = [
      topic,
      {
        id: "t2",
        inputMappings: [mapped(declared, "de1"), mapped(rate, "tv1")],
      },
      { id: "t3", inputMappings: [mapped(declared, "de2")] },
      { id: "t4", inputMappings: [mapped(declared, "de3")] },
    ];

    expect(
      dataElementDefaults({ topic, input: declared, topics, lookup }),
    ).toEqual({
      name: "Consultation externe (nvx cas) - 0 à 1 mois - indigent - dec",
      shortName: "Cons externe nvx cas - 0-1ms - indigent - dec",
      code: "quant98_declaree",
      valueType: "INTEGER_ZERO_OR_POSITIVE",
      aggregationType: "SUM",
    });
  });

  it("uses the state name and number/sum without other mapped topics", () => {
    const defaults = dataElementDefaults({
      topic,
      input: declared,
      topics: [topic],
      lookup,
    });

    expect(defaults.name).toBe(`${topic.name} - Déclarée`);
    expect(defaults.valueType).toBe("NUMBER");
    expect(defaults.aggregationType).toBe("SUM");
  });

  it("defaults a rate to a unit interval averaged", () => {
    const defaults = dataElementDefaults({
      topic,
      input: rate,
      topics: [topic],
      lookup,
    });

    expect(defaults.valueType).toBe("UNIT_INTERVAL");
    expect(defaults.aggregationType).toBe("AVERAGE");
  });

  it("ignores the topic itself, other states, indicators and unknown data elements", () => {
    const topics = [
      { ...topic, inputMappings: [mapped(declared, "de2")] },
      {
        id: "t2",
        inputMappings: [
          mapped(rate, "tv1"),
          { ...mapped(declared, "de2"), kind: "indicator" },
          mapped(declared, "unknown"),
          { kind: "data_element", externalReference: "de2", input: null },
        ],
      },
    ];

    expect(
      dataElementDefaults({ topic, input: declared, topics, lookup }),
    ).toMatchObject({
      name: `${topic.name} - Déclarée`,
      valueType: "NUMBER",
    });
  });

  it("falls back on the name without short name and fits the lengths", () => {
    const long = { id: "t9", code: "c".repeat(60), name: "n".repeat(300) };

    const defaults = dataElementDefaults({
      topic: long,
      input: declared,
      topics: [],
      lookup,
    });

    expect(defaults.name).toHaveLength(230);
    expect(defaults.name.endsWith(" - Déclarée")).toBe(true);
    expect(defaults.shortName).toBe(`${"n".repeat(39)} - Déclarée`);
    expect(defaults.code).toHaveLength(50);
  });
});

describe("fitWithSuffix", () => {
  it("keeps the suffix and shortens the prefix", () => {
    expect(fitWithSuffix("abcdef", "dec", 10)).toBe("abcd - dec");
    expect(fitWithSuffix("ab", "dec", 10)).toBe("ab - dec");
  });

  it("trims the cut prefix", () => {
    expect(fitWithSuffix("abc defgh", "dec", 10)).toBe("abc - dec");
  });

  it("cuts the whole when the suffix alone is too long", () => {
    expect(fitWithSuffix("abc", "0123456789", 8)).toBe("abc - 01");
  });
});

describe("dataElementErrors", () => {
  const valid = { name: "n", shortName: "s", code: "c" };

  it("has no error for a valid data element", () => {
    expect(dataElementErrors(valid)).toEqual({});
  });

  it("requires the name, short name and code", () => {
    expect(dataElementErrors({ name: " ", shortName: "" })).toEqual({
      name: "required",
      shortName: "required",
      code: "required",
    });
  });

  it("checks the dhis2 lengths, the maximum being allowed", () => {
    expect(
      dataElementErrors({
        name: "n".repeat(230),
        shortName: "s".repeat(51),
        code: "c".repeat(50),
      }),
    ).toEqual({ shortName: "too long (51, max 50)" });
  });

  it("refuses the name of an existing data element", () => {
    expect(
      dataElementErrors({ ...valid, name: "taken " }, new Set(["taken"])),
    ).toEqual({
      name: "a data element with this name already exists",
    });
  });
});
