import { reorderItems } from "./dragAndDropUtils";

/* globals describe, it, expect */

describe("reorderItems", () => {
  it("returns an array of items with new positions", () => {
    const items = [{ id: 1, position: 0 }, { id: 2, position: 1 }];
    const dragAndDropResults = {
      source: { index: 1 },
      destination: { index: 0 },
    };
    const expectedResuls = [{ id: 2, position: 0 }, { id: 1, position: 1 }];
    expect(reorderItems(items, dragAndDropResults)).toEqual(expectedResuls);
  });
});
