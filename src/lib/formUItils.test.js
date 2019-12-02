/* globals describe, it, expect */

import { handleFilterChange } from "./formUtils";

describe("handleFilterChange", () => {
  const collection = [
    { key: "A", value: "A" },
    { key: "B", value: "B" },
    { key: "C", value: "C" },
  ];
  const selected = ["B"];

  it("returns a filtered collection by key", () => {
    const actual = handleFilterChange(collection, selected);
    expect([{ key: "B", value: "B" }]).toEqual(actual);
  });

  it("handles empty selection", () => {
    const actual = handleFilterChange(collection, []);
    expect([]).toEqual(actual);
  });

  it("handles null selection", () => {
    const actual = handleFilterChange(collection, null);
    expect([]).toEqual(actual);
  });
});
