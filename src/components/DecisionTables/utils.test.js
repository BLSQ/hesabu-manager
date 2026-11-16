import { describe, it, expect } from "vitest";
import { filterDecisionTables, periodToMonthRange } from "./utils";

describe("periodToMonthRange", () => {
  it.each([
    ["2022", { from: 202201, to: 202212 }],
    ["202206", { from: 202206, to: 202206 }],
    ["20220615", { from: 202206, to: 202206 }],
    ["2022Q1", { from: 202201, to: 202203 }],
    ["2022q4", { from: 202210, to: 202212 }],
    ["2022July", { from: 202207, to: 202306 }],
  ])("converts %j", (period, expected) => {
    expect(periodToMonthRange(period)).toEqual(expected);
  });

  it.each(["", undefined, "202213", "202200", "2022Q5", "pma", "22"])(
    "returns null for %j",
    period => {
      expect(periodToMonthRange(period)).toBeNull();
    },
  );
});

describe("filterDecisionTables", () => {
  const decisions = [
    { name: "Prix unitaires", startPeriod: "202201", endPeriod: "202212" },
    { name: "Prix unitaires", startPeriod: "202301", endPeriod: "202312" },
    { name: "Équité CS", startPeriod: "2022Q3", endPeriod: "2023Q2" },
    { name: "Bonus qualité", startPeriod: null, endPeriod: null },
  ];
  const labels = result =>
    result.map(d => `${d.name} ${d.startPeriod}-${d.endPeriod}`);

  it("returns all tables for an empty filter", () => {
    expect(filterDecisionTables(decisions, " ")).toBe(decisions);
  });

  it("matches the name case and accent insensitive", () => {
    expect(labels(filterDecisionTables(decisions, "equite"))).toEqual([
      "Équité CS 2022Q3-2023Q2",
    ]);
  });

  it("keeps the tables whose periods cover a month, plus tables without periods", () => {
    expect(labels(filterDecisionTables(decisions, "202206"))).toEqual([
      "Prix unitaires 202201-202212",
      "Bonus qualité null-null",
    ]);
  });

  it("includes the start and end months", () => {
    expect(labels(filterDecisionTables(decisions, "202301 prix"))).toEqual([
      "Prix unitaires 202301-202312",
    ]);
    expect(labels(filterDecisionTables(decisions, "202212 prix"))).toEqual([
      "Prix unitaires 202201-202212",
    ]);
  });

  it("matches overlapping quarters and years", () => {
    expect(labels(filterDecisionTables(decisions, "2023Q1"))).toEqual([
      "Prix unitaires 202301-202312",
      "Équité CS 2022Q3-2023Q2",
      "Bonus qualité null-null",
    ]);
    expect(labels(filterDecisionTables(decisions, "2024"))).toEqual([
      "Bonus qualité null-null",
    ]);
  });

  it("requires every word to match", () => {
    expect(labels(filterDecisionTables(decisions, "prix 2023"))).toEqual([
      "Prix unitaires 202301-202312",
    ]);
  });
});
