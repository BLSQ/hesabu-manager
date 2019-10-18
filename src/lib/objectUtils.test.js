/* globals describe, it, expect */

import { safe } from "./objectUtils";

describe("safe", () => {
  it("should return the object given if not null", () => {
    const givenObject = {
      test: "foo",
    };

    expect(safe(givenObject)).toEqual(givenObject);
  });

  it("should return a empty object if null given", () => {
    expect(safe(null)).toEqual({});
  });
});
